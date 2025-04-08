'use client';
import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronRightIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLoaiTinByNhomTin, useNhomTin } from '@/hooks/usePagination';
import { generateSlug } from '@/lib/utils';

export default function GroupPage() {
  const [page, setPage] = useState(1);
  const limit = 9; // 3x3 grid

  const params = useParams<{ id: string }>();
  const groupId = params.id;

  // Fetch nhom tin and its loai tin
  const { data: nhomTin, isLoading: isLoadingNhomTin } = useNhomTin(groupId);
  const { data: loaiTinData, isLoading: isLoadingLoaiTin } = useLoaiTinByNhomTin(groupId, {
    page,
    limit,
    sortBy: 'ten_loaitin',
    sortOrder: 'asc',
  });

  const loaiTinList = loaiTinData?.data || [];
  const pagination = loaiTinData?.meta;

  if (!isLoadingNhomTin && !nhomTin) {
    notFound();
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/groups" className="hover:text-foreground">
            Nhóm tin tức
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {isLoadingLoaiTin ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              nhomTin?.ten_nhomtin
            )}
          </span>
        </nav>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isLoadingNhomTin ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                nhomTin?.ten_nhomtin
              )}
            </h1>
            <Badge variant="secondary">
              {pagination?.totalItems || 0} loại tin
            </Badge>
          </div>
        </div>

        {isLoadingLoaiTin ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: limit }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : loaiTinList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loaiTinList.map((loaiTin) => (
              <Link
                key={loaiTin.id_loaitin}
                href={`/categories/${generateSlug(loaiTin.ten_loaitin)}-${loaiTin.id_loaitin}`}
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{loaiTin.ten_loaitin}</CardTitle>
                      <Badge variant="secondary">{loaiTin.tin?.length || 0}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="px-0" asChild>
                      <span className="flex items-center gap-1">
                        Xem bài viết
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h2 className="mb-2 text-xl font-medium">
              Không tìm thấy loại tin
            </h2>
            <p className="text-muted-foreground">
              Không tìm thấy loại tin nào trong nhóm này
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.lastPage > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Trang {pagination.currentPage} / {pagination.lastPage}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={!pagination.hasPreviousPage}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Trang trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!pagination.hasNextPage}
              >
                Trang sau
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
