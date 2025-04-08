"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostCard } from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import { useAdvancedSearch } from "@/hooks/usePagination";

export function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const category = searchParams.get('loaitin') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = 9;
    const router = useRouter()
    const { data, isLoading, isFetching } = useAdvancedSearch({
      query,
      loaitin: category,
      page,
      limit,
      sortBy: 'ngaydangtin',
      sortOrder: 'desc',
    });
  
    const posts = data?.data || [];
    const pagination = data?.meta;

  return (
    <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">
        {query ? (
          `Kết quả tìm kiếm cho "${query}"`
        ) : category ? (
          `Tìm kiếm trong ${category}`
        ) : (
          'Tất cả bài viết'
        )}
        {pagination && (
          <span className="ml-2 text-base font-normal text-muted-foreground">
            ({pagination.totalItems} kết quả)
          </span>
        )}
      </h2>
    </div>

    {isLoading ? (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {/* {Array.from({ length: limit }).map((_, i) => (
          <PostCard.Skeleton key={i} />
        ))} */}
      </div>
    ) : posts.length > 0 ? (
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id_tin}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h2 className="mb-2 text-xl font-medium">
          Không tìm thấy kết quả
        </h2>
        <p className="text-muted-foreground">
          Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
        </p>
      </div>
    )}

    {pagination && pagination.lastPage > 1 && (
      <div className="flex items-center justify-center gap-2 pt-8">
        <Button
          variant="outline"
          size="sm"
           className='cursor-pointer'
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', String(page - 1));
            router.push(`/search?${params.toString()}`);
          }}
          disabled={!pagination.hasPreviousPage || isFetching}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((pageNumber) => (
            <Button
             className='cursor-pointer'
              key={pageNumber}
              variant={pageNumber === page ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set('page', String(pageNumber));
                router.push(`/search?${params.toString()}`);
              }}
              disabled={isFetching}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className='cursor-pointer'
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', String(page + 1));
            router.push(`/search?${params.toString()}`);
          }}
          disabled={!pagination.hasNextPage || isFetching}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )}
  </div>
  );
}