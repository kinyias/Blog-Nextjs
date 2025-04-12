'use client';
import { useTinPagination } from '@/hooks/usePagination';
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { formatDate, generateSlug } from '@/lib/utils';

export default function PopularPosts() {
    const { data, isLoading } = useTinPagination({
        page: 1,
        limit: 3,
        sortBy: 'solanxem',
        sortOrder: 'desc',
       });
       const recentPosts = data?.data || []
      
      if (isLoading) {
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="mt-2 h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-1 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-1/4" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-9 w-16" />
                  <Skeleton className="h-9 w-16" />
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      }
    
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Card key={post.id_tin}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="line-clamp-1">{post.tieude}</CardTitle>
                  <Badge variant={post.trangthai ? "default" : "secondary"}>{post.trangthai? 'Hiện' : 'Ẩn'}</Badge>
                </div>
                <CardDescription>
                  {formatDate(post.ngaydangtin)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.mota}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.loai_tin?.ten_loaitin}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/posts/${generateSlug(post.tieude)}-${post.id_tin}`}>Xem</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/posts/${post.id_tin}`}>Sửa</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )
}
