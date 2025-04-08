'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PostComments } from '@/components/posts/PostComment';
import { getTinById } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  
  // Extract the post ID from the slug (format: title-id)
  const postId = params.slug.split('-').pop();
  
  // Fetch post data using React Query
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getTinById(Number(postId)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!postId && !isNaN(Number(postId)),
  });

  // Handle loading state
  if (isLoading) {
    return (
      <main className="flex-1">
        <article className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 space-y-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-full" />
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="mt-10 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </article>
      </main>
    );
  }

  // Handle error or post not found
  if (error || !post) {
    notFound();
  }

  // Update view count (optional)
  // You could implement a function to increment the view count here

  return (
    <main className="flex-1">
      <article className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.loai_tin && (
                <Badge variant="secondary">
                  {post.loai_tin.ten_loaitin}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.tieude}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>{post.tacgia}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.ngaydangtin)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{(post.solanxem || 0).toLocaleString()} lượt xem</span>
              </div>
            </div>
          </div>

          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={post.hinhdaidien || '/placeholder.svg'}
              alt={post.tieude}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article content */}
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.noidung }} />
          </div>

          {/* Share buttons */}
          <div className="my-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Trở về
                </Link>
              </Button>
            </div>
          </div>

          <Separator className="my-10" />
          {/* Comments section */}
          <div className="mb-10">
            <h2 className="mb-6 text-2xl font-bold">Bình luận</h2>
            <PostComments postSlug={params.slug} />
          </div>
        </div>
      </article>
    </main>
  );
}
