'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PostCard } from './PostCard';

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Understanding React Server Components',
    excerpt:
      'Dive into the new React Server Components paradigm and learn how it changes the way we build React applications.',
    author: 'Alex Chen',
    date: 'May 28, 2023',
    tags: ['React', 'Server Components', 'Next.js'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'understanding-react-server-components',
  },
  {
    id: 2,
    title: 'Mastering TypeScript Generics',
    excerpt:
      'Learn how to leverage TypeScript generics to write more flexible and reusable code in your applications.',
    author: 'Maria Garcia',
    date: 'June 5, 2023',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'mastering-typescript-generics',
  },
  {
    id: 3,
    title: 'Building a Design System with Tailwind CSS',
    excerpt:
      'Create a consistent and maintainable design system for your projects using Tailwind CSS and shadcn/ui.',
    author: 'David Kim',
    date: 'June 10, 2023',
    tags: ['CSS', 'Tailwind', 'Design Systems'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'building-design-system-tailwind',
  },
  {
    id: 4,
    title: 'State Management in 2023',
    excerpt:
      'Explore the current state management landscape in React and which solutions make sense for different project types.',
    author: 'Emily Johnson',
    date: 'June 15, 2023',
    tags: ['React', 'State Management', 'Redux', 'Zustand'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'state-management-2023',
  },
  {
    id: 5,
    title: 'Optimizing Next.js Applications',
    excerpt:
      'Learn advanced techniques to optimize your Next.js applications for performance and SEO.',
    author: 'Michael Brown',
    date: 'June 20, 2023',
    tags: ['Next.js', 'Performance', 'SEO'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'optimizing-nextjs-applications',
  },
  {
    id: 6,
    title: 'Building a Full-Stack App with tRPC',
    excerpt:
      'Create end-to-end type-safe applications with tRPC, Next.js, and Prisma for a seamless development experience.',
    author: 'Sophie Taylor',
    date: 'June 25, 2023',
    tags: ['tRPC', 'TypeScript', 'Full-Stack'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'building-full-stack-app-trpc',
  },
];

export function PostGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(BLOG_POSTS.length / postsPerPage);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const visiblePosts = BLOG_POSTS.slice(0, page * postsPerPage);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
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
        <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
      </div>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {visiblePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
      {page < totalPages && (
        <div className="flex justify-center pt-8">
          <Button size="lg" className="px-8" onClick={()=> handleLoadMore()}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
