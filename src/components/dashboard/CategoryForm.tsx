'use client';

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
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  LoaiTinType,
  createLoaiTin,
  updateLoaiTin,
  getAllNhomTin,
} from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

const formSchema = z.object({
  id_loaitin: z
    .string({
      required_error: 'Id loại tin là bắt buộc.',
    })
    .max(5, {
      message: 'Id loại tin phải có tối đa 5 ký tự.',
    }),
  ten_loaitin: z.string().min(2, {
    message: 'Tên loại tin phải có ít nhất 2 ký tự.',
  }),
  trangthai: z.boolean().default(true),
  id_nhomtin: z.number({
    required_error: 'Vui lòng chọn nhóm tin.',
  }),
});

export function CategoryForm({ loaiTin }: { loaiTin?: LoaiTinType }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch nhóm tin data using React Query
  const { data: nhomTinList, isLoading: isLoadingNhomTin } = useQuery({
    queryKey: ['nhomTin'],
    queryFn: getAllNhomTin,
    staleTime: Infinity,
  });

  // Create mutation for creating a new LoaiTin
  const createMutation = useMutation({
    mutationFn: (data: LoaiTinType) => createLoaiTin(data),
    onSuccess: () => {
      // Invalidate and refetch the loaiTin list query
      queryClient.invalidateQueries({ queryKey: ['loaiTin'] });
      queryClient.invalidateQueries({ queryKey: ['paginated-loai-tin'] });
    },
  });

  // Update mutation for updating an existing LoaiTin
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LoaiTinType> }) =>
      updateLoaiTin(id, data),
    onSuccess: () => {
      // Invalidate and refetch the loaiTin list query
      queryClient.invalidateQueries({ queryKey: ['loaiTin'] });
      queryClient.invalidateQueries({ queryKey: ['paginated-loai-tin'] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_loaitin: loaiTin?.id_loaitin || '',
      ten_loaitin: loaiTin?.ten_loaitin || '',
      trangthai: loaiTin?.trangthai ?? true,
      id_nhomtin: loaiTin?.id_nhomtin || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const loaiTinData = {
        id_loaitin: values.id_loaitin,
        ten_loaitin: values.ten_loaitin,
        trangthai: values.trangthai,
        id_nhomtin: values.id_nhomtin,
      };

      if (loaiTin?.id_loaitin) {
        // Update existing category
        await updateMutation.mutateAsync({
          id: loaiTin.id_loaitin,
          data: loaiTinData,
        });
        toast.success(
          `Loại tin "${values.ten_loaitin}" đã được cập nhật thành công.`,
          {
            style: {
              backgroundColor: '#16a34a',
              color: '#ffffff',
            },
          }
        );
      } else {
        // Create new category
        await createMutation.mutateAsync(loaiTinData as unknown as LoaiTinType);
        toast.success(
          `Loại tin "${values.ten_loaitin}" đã được tạo thành công.`,
          {
            style: {
              backgroundColor: '#16a34a',
              color: '#ffffff',
            },
          }
        );
      }

      // Redirect to categories page
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Đã xảy ra lỗi khi lưu loại tin. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-6 space-y-6">
          <FormField
              control={form.control}
              name="id_loaitin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id loại tin</FormLabel>
                  <FormControl>
                    <Input placeholder="Id loại tin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Id loại tin tức xuất hiện trên website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ten_loaitin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên loại tin</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên loại tin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tên loại tin tức xuất hiện trên website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_nhomtin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhóm tin tức</FormLabel>
                  {isLoadingNhomTin ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ) : (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={
                        field.value ? field.value.toString() : undefined
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhóm tin tức" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nhomTinList?.map((nhomTin) => (
                          <SelectItem
                            key={nhomTin.id_nhomtin}
                            value={nhomTin.id_nhomtin.toString()}
                          >
                            {nhomTin.ten_nhomtin}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormDescription>Chọn nhóm tin tức.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 w-50">
              <FormField
                control={form.control}
                name="trangthai"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Trạng thái</FormLabel>
                      <FormDescription>Ẩn/hiện loại tin tức</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            variant={'success'}
            type="submit"
            disabled={isLoading || isLoadingNhomTin}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Đang lưu...' : 'Lưu'}
          </Button>
          <Link href="/dashboard/categories">
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
          >
            Huỷ
          </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
