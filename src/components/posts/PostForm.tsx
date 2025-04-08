'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import { TinType, getAllLoaiTin, createTin, updateTin } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

const formSchema = z.object({
  tieude: z.string().min(5, {
    message: 'Tiêu đề phải có ít nhất 5 kí tự.',
  }),
  mota: z
    .string()
    .min(10, {
      message: 'Mô tả phải có ít nhất 10 kí tự.',
    })
    .max(300, {
      message: 'Mô tả tối đa 300 kí tự.',
    }),
  noidung: z.string().min(10, {
    message: 'Nội dung phải có ít nhất 10 kí tự.',
  }),
  hinhdaidien: z.string().optional(),
  loaitin: z.string({
    required_error: 'Vui lòng chọn loại tin.',
  }),
  ngaydangtin: z.date(),
  trangthai: z.boolean().default(true),
  tinhot: z.boolean().default(false),
});

export function PostForm({ post }: { post?: TinType }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {user} = useUser();
  // Fetch loại tin data using React Query
  const { data: loaiTinList, isLoading: isLoadingLoaiTin } = useQuery({
    queryKey: ['loaiTin'],
    queryFn: getAllLoaiTin,
    staleTime: Infinity, 
  });

  // Create mutation for creating a new Tin
  const createMutation = useMutation({
    mutationFn: (data: Omit<TinType, 'id_tin'>) => createTin(data),
    onSuccess: () => {
      // Invalidate and refetch the tin list query
      queryClient.invalidateQueries({ queryKey: ['tin'] });
    },
  });

  // Update mutation for updating an existing Tin
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TinType> }) => 
      updateTin(id, data),
    onSuccess: () => {
      // Invalidate and refetch the tin list query
      queryClient.invalidateQueries({ queryKey: ['tin'] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tieude: post?.tieude || '',
      mota: post?.mota || '',
      noidung: post?.noidung || '',
      hinhdaidien: post?.hinhdaidien || '',
      loaitin: post?.id_loaitin?.toString() || '',
      ngaydangtin: post?.ngaydangtin ? new Date(post.ngaydangtin) : new Date(),
      trangthai: post?.trangthai ?? true,
      tinhot: post?.tinhot || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const tinData = {
        tieude: values.tieude,
        mota: values.mota,
        noidung: values.noidung,
        hinhdaidien: values.hinhdaidien || '',
        id_loaitin: values.loaitin,
        ngaydangtin: values.ngaydangtin,
        trangthai: values.trangthai,
        tinhot: values.tinhot,
        tacgia: user?.fullName ?? 'Admin', 
        solanxem: post?.solanxem || 0
      };
      if (post?.id_tin) {
        // Update existing post
        await updateMutation.mutateAsync({ 
          id: post.id_tin, 
          data: tinData
        });
        toast.success(`Tin tức "${values.tieude}" đã được cập nhật thành công.`);
      } else {
        // Create new post - fix the type conversion issue
        await createMutation.mutateAsync(tinData as unknown as Omit<TinType, 'id_tin'>);
        toast.success(`Tin tức "${values.tieude}" đã được tạo thành công.`);
      }

      // Redirect to posts page
      router.push('/dashboard/posts');
    } catch {
      // Error handling remains the same
      toast.error('Đã xảy ra lỗi khi tạo tin tức.');
    }
  }
  
  const handleImageDelete = (image: string) => {
    const imageKey = image.substring(image.lastIndexOf('/') + 1);

    axios
      .post('/api/uploadthing/delete', { imageKey })
      .then((res) => {
        if (res.data.success) {
          form.setValue('hinhdaidien', '');
          toast.success('Hình ảnh đã được xoá');
        }
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi khi xoá hình ảnh');
      })
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="tieude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Tiêu đề tin tức" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tóm tắt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả tóm tắt cho tin tức"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mô tả tóm tắt(Tối đa 300 từ).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noidung"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung bài viết</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nội dung bài viết"
                      className="h-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="trangthai"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Trạng thái</FormLabel>
                        <FormDescription>Hiển thị tin tức.</FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loaitin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại tin tức</FormLabel>
                      {isLoadingLoaiTin ? (
                        <div className="space-y-2">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ) : (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại tin tức" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {loaiTinList?.map((loaiTin) => (
                              <SelectItem 
                                key={loaiTin.id_loaitin} 
                                value={loaiTin.id_loaitin}
                              >
                                {loaiTin.ten_loaitin}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hinhdaidien"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh đại diện</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {field.value && (
                            <div className="relative w-full h-full overflow-hidden rounded-md">
                              <Image 
                                src={field.value} 
                                alt="Featured image preview" 
                                className="object-cover w-full h-full"
                                width={500}
                                height={300}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={() => field.value && handleImageDelete(field.value)}
                              >
                                Xóa
                              </Button>
                            </div>
                          )}
                          
                          {!field.value && (
                            <div className="flex flex-col items-center h-full max-w-[500px] p-6 border-2 border-dashed border-primary/50 rounded">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Update the form field with the uploaded image URL
                                  field.onChange(res[0].url);
                                  
                                  // Show success toast
                                  toast.success("Tải ảnh lên thành công", {
                                    style: {
                                      backgroundColor: "#16a34a",
                                      color: "#ffffff",
                                    }
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Show error toast
                                  toast.error(`Lỗi tải ảnh: ${error.message}`, {
                                    style: {
                                      backgroundColor: "#ef4444",
                                      color: "#ffffff",
                                    }
                                  });
                                }}
                                onUploadBegin={() => {
                                  // Optional: Show loading toast or state
                                  toast.info("Đang tải ảnh lên...");
                                }}
                                appearance={{
                                  button: "bg-blue-500 text-primary-foreground hover:bg-primary/90 px-5",
                                  allowedContent: "text-sm text-muted-foreground",
                                }}
                                content={{
                                  button({ ready }) {
                                    return ready ? "Chọn ảnh" : "Đang tải...";
                                  },
                                  allowedContent({ ready, fileTypes }) {
                                    return ready 
                                      ? `Chấp nhận: ${fileTypes?.join(", ")}`
                                      : "Đang kiểm tra...";
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Tải lên ảnh đại diện cho bài viết (JPG, PNG, WebP)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tinhot"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Tin hot</FormLabel>
                          <FormDescription>
                            Hiển thị tin hot ở trang chủ.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading || isLoadingLoaiTin}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Đang lưu...' : 'Lưu'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/posts')}
          >
            Huỷ
          </Button>
        </div>
      </form>
    </Form>
  );
}
