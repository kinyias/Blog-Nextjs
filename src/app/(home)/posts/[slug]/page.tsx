'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PostComments } from '@/components/posts/PostComment';

// Mock data for blog posts - in a real app, this would come from a database or CMS
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Nhiều tỉnh, thành đề xuất thi tốt nghiệp THPT sớm ba tuần',
    content: `
     Hà Nội, TP HCM, Nghệ An và Ninh Bình đề xuất thi tốt nghiệp THPT 2025 vào đầu tháng 6, sớm ba tuần so với kế hoạch của Bộ do cả nước đang sắp xếp, sáp nhập tỉnh, thành.`,
    excerpt:
      'Hà Nội, TP HCM, Nghệ An và Ninh Bình đề xuất thi tốt nghiệp THPT 2025 vào đầu tháng 6, sớm ba tuần so với kế hoạch của Bộ do cả nước đang sắp xếp, sáp nhập tỉnh, thành.',
    author: 'admin',
    authorImage: '/placeholder.svg?height=100&width=100',
    date: '05 thg 05, 2025',
    readTime: '15 min read',
    tags: ['Tuyển sinh'],
    image: 'https://i1-vnexpress.vnecdn.net/2025/03/17/cc549938ea995bc70288-174218868-8512-4541-1742189388.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=tF0i6PJqWQFvMRBmdp48cg',
    slug: 'nhieu-tinh-thanh-de-xuat-thi-tot-nghiep-THPT-som-ba-tuan-1',
    related: [2, 3, 5],
  },
  {
    id: 2,
    title: 'Understanding React Server Components',
    content: `<p>React Server Components represent a paradigm shift in how we build React applications...</p>`,
    excerpt:
      'Dive into the new React Server Components paradigm and learn how it changes the way we build React applications.',
    author: 'Alex Chen',
    authorImage: '/placeholder.svg?height=100&width=100',
    date: 'May 28, 2023',
    readTime: '12 min read',
    tags: ['React', 'Server Components', 'Next.js'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'understanding-react-server-components',
    related: [1, 3, 5],
  },
  {
    id: 3,
    title: 'Mastering TypeScript Generics',
    content: `<p>TypeScript generics provide a way to create reusable components...</p>`,
    excerpt:
      'Learn how to leverage TypeScript generics to write more flexible and reusable code in your applications.',
    author: 'Maria Garcia',
    authorImage: '/placeholder.svg?height=100&width=100',
    date: 'June 5, 2023',
    readTime: '10 min read',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'mastering-typescript-generics',
    related: [1, 2, 6],
  },
  {
    id: 5,
    title: 'Optimizing Next.js Applications',
    content: `<p>Performance optimization is crucial for providing a good user experience...</p>`,
    excerpt:
      'Learn advanced techniques to optimize your Next.js applications for performance and SEO.',
    author: 'Michael Brown',
    authorImage: '/placeholder.svg?height=100&width=100',
    date: 'June 20, 2023',
    readTime: '14 min read',
    tags: ['Next.js', 'Performance', 'SEO'],
    image: '/placeholder.svg?height=400&width=600',
    slug: 'optimizing-nextjs-applications',
    related: [1, 2, 6],
  },
];

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((post) => post.slug === params.slug);
  if (!post) {
    notFound();
  }

  //   const relatedPosts = post.related ? post.related.map((id) => BLOG_POSTS.find((p) => p.id === id)).filter(Boolean) : []

  return (
    <main className="flex-1">
      <article className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={post.image || '/placeholder.svg'}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article content */}
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
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

          {/* Post navigation */}
          {/* <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 transition-colors hover:bg-muted">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Article</span>
              </div>
              <Link href="#" className="font-medium hover:underline">
                10 Tips for Writing Clean React Code
              </Link>
            </div>
            <div className="rounded-lg border p-4 text-right transition-colors hover:bg-muted">
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                <span>Next Article</span>
                <ArrowRight className="h-4 w-4" />
              </div>
              <Link href="#" className="font-medium hover:underline">
                The Future of Web Development: What to Expect in 2024
              </Link>
            </div>
          </div> */}

          {/* Related posts */}
          {/* {relatedPosts.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
                <RelatedPosts posts={relatedPosts} />
              </div>
            )} */}

          {/* Comments section */}
          <div className="mb-10">
            <h2 className="mb-6 text-2xl font-bold">Bình luận</h2>
            <PostComments postSlug={post.slug} />
          </div>
        </div>
      </article>
    </main>
  );
}
