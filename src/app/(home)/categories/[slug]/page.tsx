'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Calendar, ChevronLeft, ChevronRight, ChevronRightIcon, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {useTinByLoaiTin } from '@/hooks/usePagination';
import { formatDate, generateSlug } from '@/lib/utils';

export default function CategoryPage() {
  const [page, setPage] = useState(1);
  const limit = 9; // 3x3 grid

  const params = useParams<{ slug: string }>();
  // Extract the category ID from the slug (format: title-id)
  const categoryId = params.slug.split('-').pop();

  // Fetch category and its posts
  // const { data: category, isLoading: isLoadingCategory } = useLoaiTin(categoryId || '');
  const { data: postsData, isLoading: isLoadingPosts } = useTinByLoaiTin(categoryId || '', {
    page,
    limit,
    sortBy: 'ngaydangtin',
    sortOrder: 'desc',
  });

  const posts = postsData?.data || [];
  const pagination = postsData?.meta;

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-foreground">
            Loại tin tức
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">
          {isLoadingPosts ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                posts[0].loai_tin?.ten_loaitin
              )}
          </span>
        </nav>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isLoadingPosts ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                posts[0].loai_tin?.ten_loaitin
              )}
            </h1>
            <Badge variant="secondary">
              {pagination?.totalItems || 0} bài viết
            </Badge>
          </div>
        </div>

        {isLoadingPosts ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: limit }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="p-0">
                  <Skeleton className="aspect-video h-48 w-full" />
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id_tin}
                href={`/posts/${generateSlug(post.tieude)}-${post.id_tin}`}
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative">
                      <Image
                        src={post.hinhdaidien || '/placeholder.svg'}
                        alt={post.tieude}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 p-4">
                    <h2 className="line-clamp-2 text-xl font-semibold hover:text-sky-500 duration-200 transition-all">
                      {post.tieude}
                    </h2>
                    <p className="line-clamp-2 text-muted-foreground">
                      {post.mota}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.ngaydangtin)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.solanxem.toLocaleString()} lượt xem</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h2 className="mb-2 text-xl font-medium">
              Không tìm thấy bài viết
            </h2>
            <p className="text-muted-foreground">
              Không tìm thấy bài viết nào vui lòng quay lại sau
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
