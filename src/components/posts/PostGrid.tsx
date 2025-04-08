'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PostCard } from './PostCard';
import { getTinWithPagination, TinQueryParams, TinType } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export function PostGrid() {
  const [queryParams, setQueryParams] = useState<TinQueryParams>({
    page: 1,
    limit: 6,
    sortBy: 'ngaydangtin',
    sortOrder: 'desc',
    trangthai: true,
  });
  
  // Store all loaded posts
  const [allPosts, setAllPosts] = useState<TinType[]>([]);

  // Fetch posts with pagination
  const { 
    data, 
    isLoading, 
    isFetching,
  } = useQuery({
    queryKey: ['posts', queryParams],
    queryFn: () => getTinWithPagination(queryParams),
    staleTime: 60 * 1000, // 1 minute
  });

  // Update allPosts when new data is fetched
  useEffect(() => {
    if (data?.data) {
      if (queryParams.page === 1) {
        // Reset posts if we're on the first page
        setAllPosts(data.data);
      } else {
        // Append new posts to existing ones
        setAllPosts(prev => [...prev, ...data.data]);
      }
    }
  }, [data, queryParams.page]);

  const pagination = data?.meta;

  const handleLoadMore = () => {
    if (pagination && pagination.currentPage < pagination.lastPage) {
      setQueryParams(prev => ({
        ...prev,
        page: prev.page ? prev.page + 1 : 2
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Tin tức mới nhất
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tin tức mới nhất</h2>
      </div>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {allPosts.map((post, index) => (
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
      
      {pagination && pagination.hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button 
            size="lg" 
            className="px-8" 
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tải...
              </>
            ) : (
              'Tải thêm'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
