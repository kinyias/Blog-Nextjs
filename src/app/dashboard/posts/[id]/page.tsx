'use client';

import { useState, useEffect, use } from 'react';
import { getTinById } from "@/lib/api";
import { PostForm } from "@/components/posts/PostForm";
import { Skeleton } from "@/components/ui/skeleton";
import { TinType } from '@/lib/api';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);
  const postId = id;
  const isNewPost = postId === "new";
  
  const [post, setPost] = useState<TinType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(!isNewPost);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch post data using Axios directly
  useEffect(() => {
    if (isNewPost) return;
    
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const data = await getTinById(Number(postId));
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch post'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [postId, isNewPost]);

  if (!isNewPost && isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="space-y-4 mt-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  if (!isNewPost && error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Lỗi</h1>
          <p className="text-destructive">
            Không thể tải thông tin tin tức. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {isNewPost ? "Tạo tin tức mới" : "Chỉnh sửa tin tức"}
        </h1>
        <p className="text-muted-foreground">
          {isNewPost ? "Tạo tin tức mới cho website." : "Chỉnh sửa thông tin tin tức."}
        </p>
      </div>
      <PostForm post={!isNewPost ? post : undefined} />
    </div>
  );
}