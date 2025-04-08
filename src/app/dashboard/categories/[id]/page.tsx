'use client';

import { useState, useEffect, use } from 'react';
import { getLoaiTinById } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryForm } from '@/components/dashboard/CategoryForm';
import { LoaiTinType } from '@/lib/api';

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);
  const categoryId = id;
  const isNewCategory = categoryId === "new";
  
  const [category, setCategory] = useState<LoaiTinType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(!isNewCategory);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch category data using Axios directly
  useEffect(() => {
    if (isNewCategory) return;
    
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const data = await getLoaiTinById(categoryId);
        setCategory(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch category'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategory();
  }, [categoryId, isNewCategory]);

  if (!isNewCategory && isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="space-y-4 mt-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!isNewCategory && error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Lỗi</h1>
          <p className="text-destructive">
            Không thể tải thông tin loại tin. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {isNewCategory ? "Tạo loại tin mới" : "Chỉnh sửa loại tin"}
        </h1>
        <p className="text-muted-foreground">
          {isNewCategory ? "Tạo loại tin mới cho website." : "Chỉnh sửa thông tin loại tin."}
        </p>
      </div>
      <CategoryForm loaiTin={!isNewCategory ? category : undefined} />
    </div>
  );
}

