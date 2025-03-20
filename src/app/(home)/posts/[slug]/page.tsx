"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PostComments } from "@/components/posts/PostComment"

// Mock data for blog posts - in a real app, this would come from a database or CMS
const BLOG_POSTS = [
  {
    id: 1,
    title: "Building Scalable APIs with Next.js and TypeScript",
    content: `
      <p>Next.js has become the go-to framework for building React applications, and with the introduction of the App Router, building APIs has never been more straightforward. In this comprehensive guide, we'll explore how to build scalable, type-safe APIs using Next.js and TypeScript.</p>
      
      <h2>Understanding Route Handlers</h2>
      <p>Route Handlers are a powerful feature in Next.js that allow you to create API endpoints directly within your application. They're defined in the app directory and use the same file-based routing system as pages.</p>
      
      <pre><code>// app/api/posts/route.ts
export async function GET() {
  const posts = await fetchPosts();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newPost = await createPost(body);
  return Response.json(newPost, { status: 201 });
}</code></pre>
      
      <p>This simple example demonstrates how to create a route handler for fetching and creating posts. The GET function handles GET requests, while the POST function handles POST requests.</p>
      
      <h2>Type Safety with TypeScript</h2>
      <p>TypeScript adds an extra layer of safety to your APIs. By defining interfaces for your data models, you can ensure that your API endpoints are handling the correct data types.</p>
      
      <pre><code>// types/post.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// app/api/posts/route.ts
import { Post } from '@/types/post';

export async function POST(request: Request) {
  const body = await request.json() as Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
  
  // Validate the body
  if (!body.title || !body.content || !body.authorId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  const newPost = await createPost(body);
  return Response.json(newPost, { status: 201 });
}</code></pre>
      
      <h2>Middleware for Authentication</h2>
      <p>Middleware in Next.js allows you to run code before a request is completed. This is perfect for implementing authentication and authorization for your API endpoints.</p>
      
      <pre><code>// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify the token
  try {
    // Verify token logic here
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: '/api/:path*',
};</code></pre>
      
      <h2>Error Handling</h2>
      <p>Proper error handling is crucial for building robust APIs. Next.js makes it easy to handle errors in a consistent way.</p>
      
      <pre><code>// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await fetchPostById(params.id);
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}</code></pre>
      
      <h2>Rate Limiting</h2>
      <p>To protect your API from abuse, you can implement rate limiting. There are several libraries available for this, but here's a simple example using a custom solution.</p>
      
      <pre><code>// lib/rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.',
  store: new Map(),
};

export function rateLimiter(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const now = Date.now();
  const windowStart = now - rateLimit.windowMs;
  
  // Clean up old requests
  rateLimit.store.forEach((timestamp, key) => {
    if (timestamp < windowStart) {
      rateLimit.store.delete(key);
    }
  });
  
  // Get current count for this IP
  const requests = [...rateLimit.store.entries()]
    .filter(([key]) => key.startsWith(ip))
    .filter(([, timestamp]) => timestamp > windowStart)
    .length;
  
  // If too many requests, return error
  if (requests >= rateLimit.max) {
    return NextResponse.json({ error: rateLimit.message }, { status: 429 });
  }
  
  // Store this request
  rateLimit.store.set(\`\${ip}:\${now}\`, now);
  
  return null;
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Building scalable APIs with Next.js and TypeScript is a powerful combination that allows you to create robust, type-safe APIs with minimal boilerplate. By leveraging route handlers, middleware, and proper error handling, you can build APIs that are both performant and maintainable.</p>
      
      <p>In the next part of this series, we'll explore how to integrate these APIs with a database using Prisma, and how to implement more advanced features like pagination, filtering, and sorting.</p>
    `,
    excerpt:
      "Learn how to build robust, type-safe APIs using Next.js App Router, Prisma, and TypeScript for your next project.",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "June 12, 2023",
    readTime: "15 min read",
    tags: ["Next.js", "TypeScript", "API", "Web Development"],
    image: "/placeholder.svg?height=720&width=1280",
    slug: "building-scalable-apis",
    related: [2, 3, 5],
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    content: `<p>React Server Components represent a paradigm shift in how we build React applications...</p>`,
    excerpt:
      "Dive into the new React Server Components paradigm and learn how it changes the way we build React applications.",
    author: "Alex Chen",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "May 28, 2023",
    readTime: "12 min read",
    tags: ["React", "Server Components", "Next.js"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "understanding-react-server-components",
    related: [1, 3, 5],
  },
  {
    id: 3,
    title: "Mastering TypeScript Generics",
    content: `<p>TypeScript generics provide a way to create reusable components...</p>`,
    excerpt: "Learn how to leverage TypeScript generics to write more flexible and reusable code in your applications.",
    author: "Maria Garcia",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "June 5, 2023",
    readTime: "10 min read",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "mastering-typescript-generics",
    related: [1, 2, 6],
  },
  {
    id: 5,
    title: "Optimizing Next.js Applications",
    content: `<p>Performance optimization is crucial for providing a good user experience...</p>`,
    excerpt: "Learn advanced techniques to optimize your Next.js applications for performance and SEO.",
    author: "Michael Brown",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "June 20, 2023",
    readTime: "14 min read",
    tags: ["Next.js", "Performance", "SEO"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "optimizing-nextjs-applications",
    related: [1, 2, 6],
  },
]

export default function BlogPost() {
    const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
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
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>

            {/* Article content */}
            <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Share buttons */}
            <div className="my-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Share this article:</span>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </div>

            <Separator className="my-10" />

            {/* Post navigation */}
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>

            {/* Related posts */}
            {/* {relatedPosts.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
                <RelatedPosts posts={relatedPosts} />
              </div>
            )} */}

            {/* Comments section */}
            <div className="mb-10">
              <h2 className="mb-6 text-2xl font-bold">Comments</h2>
              <PostComments postSlug={post.slug} />
            </div>
          </div>
        </article>
      </main>
  )
}

