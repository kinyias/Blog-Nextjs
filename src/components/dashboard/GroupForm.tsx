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

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  isVisible: z.boolean().default(true),
});

// Sample parent categories data
const parentCategories = [
  { id: 'technology', name: 'Technology' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'business', name: 'Business' },
];

interface Category {
  name: string;
  isVisible: boolean;
  parentCategory: string;
}

export function GroupForm({ category }: { category?: Category }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
      isVisible: category?.isVisible !== false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Here you would normally save the category to your backend
      console.log(values);

      // Simulate saving
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        `Your category "${values.name}" has been saved successfully.`,
        {
          style: {
            backgroundColor: '#16a34a', // Màu nền
            color: '#ffffff', // Màu chữ
          },
        }
      );

      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('There was an error saving your category. Please try again.');
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
              name="name"
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
                name="isVisible"
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
            {isLoading ? 'Saving...' : 'Lưu'}
          </Button>
          <Button
            className='cursor-pointer'
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/groups')}
          >
            Huỷ
          </Button>
        </div>
      </form>
    </Form>
  );
}
