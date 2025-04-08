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
import { NhomTinType, createNhomTin, updateNhomTin } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

const formSchema = z.object({
  ten_nhomtin: z.string().min(2, {
    message: 'Tên nhóm tin phải có ít nhất 2 ký tự.',
  }),
  trangthai: z.boolean().default(true),
});

export function GroupForm({ nhomTin }: { nhomTin?: NhomTinType }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Create mutation for creating a new NhomTin
  const createMutation = useMutation({
    mutationFn: (data: Omit<NhomTinType, 'id_nhomtin'>) => createNhomTin(data),
    onSuccess: () => {
      // Invalidate and refetch the nhomTin list query
      queryClient.invalidateQueries({ queryKey: ['paginated-nhom-tin'] });
    },
  });

  // Update mutation for updating an existing NhomTin
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NhomTinType> }) => 
      updateNhomTin(id, data),
    onSuccess: () => {
      // Invalidate and refetch the nhomTin list query
      queryClient.invalidateQueries({ queryKey: ['paginated-nhom-tin'] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ten_nhomtin: nhomTin?.ten_nhomtin || '',
      trangthai: nhomTin?.trangthai ?? true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const nhomTinData = {
        ten_nhomtin: values.ten_nhomtin,
        trangthai: values.trangthai,
      };

      if (nhomTin?.id_nhomtin) {
        // Update existing group
        await updateMutation.mutateAsync({ 
          id: nhomTin.id_nhomtin, 
          data: nhomTinData
        });
        toast.success(
          `Nhóm tin "${values.ten_nhomtin}" đã được cập nhật thành công.`,
          {
            style: {
              backgroundColor: '#16a34a',
              color: '#ffffff',
            },
          }
        );
      } else {
        // Create new group
        await createMutation.mutateAsync(nhomTinData as unknown as Omit<NhomTinType, 'id_nhomtin'>);
        toast.success(
          `Nhóm tin "${values.ten_nhomtin}" đã được tạo thành công.`,
          {
            style: {
              backgroundColor: '#16a34a',
              color: '#ffffff',
            },
          }
        );
      }

      // Redirect to groups page
      router.push('/dashboard/groups');
    } catch (error) {
      console.error('Error saving group:', error);
      toast.error('Đã xảy ra lỗi khi lưu nhóm tin. Vui lòng thử lại sau.');
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
              name="ten_nhomtin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên nhóm tin</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên nhóm tin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tên nhóm tin tức xuất hiện trên website.
                  </FormDescription>
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
                      <FormDescription>Ẩn/hiện nhóm tin tức</FormDescription>
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
          <Button className='cursor-pointer' variant={'success'} type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Đang lưu...' : 'Lưu'}
          </Button>
              <Link href="/dashboard/groups">
          <Button
            className='cursor-pointer'
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
