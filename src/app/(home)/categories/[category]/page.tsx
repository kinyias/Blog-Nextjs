"use client"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/posts/PostCard"


// Mock data for categories
const CATEGORIES = [
  { id: "react", name: "React", description: "Modern UI development with React" },
  { id: "nextjs", name: "Next.js", description: "The React framework for production" },
  { id: "typescript", name: "TypeScript", description: "Strongly typed JavaScript" },
  { id: "javascript", name: "JavaScript", description: "Core web programming language" },
  { id: "css", name: "CSS", description: "Styling and layout for the web" },
  { id: "tailwind", name: "Tailwind", description: "Utility-first CSS framework" },
]

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding React Server Components",
    excerpt:
      "Dive into the new React Server Components paradigm and learn how it changes the way we build React applications.",
    author: "Alex Chen",
    date: "May 28, 2023",
    tags: ["React", "Server Components", "Next.js"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "understanding-react-server-components",
    category: "react",
  },
  {
    id: 2,
    title: "Building a Custom React Hook for Authentication",
    excerpt: "Learn how to create a reusable authentication hook for your React applications.",
    author: "Sarah Johnson",
    date: "June 2, 2023",
    tags: ["React", "Hooks", "Authentication"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "custom-react-hook-authentication",
    category: "react",
  },
  {
    id: 3,
    title: "React Performance Optimization Techniques",
    excerpt: "Discover practical strategies to improve the performance of your React applications.",
    author: "Michael Brown",
    date: "June 10, 2023",
    tags: ["React", "Performance", "Optimization"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "react-performance-optimization",
    category: "react",
  },
  {
    id: 4,
    title: "Getting Started with Next.js App Router",
    excerpt: "A comprehensive guide to using the new App Router in Next.js 13 and beyond.",
    author: "Emily Johnson",
    date: "June 15, 2023",
    tags: ["Next.js", "App Router", "React"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "nextjs-app-router-guide",
    category: "nextjs",
  },
  {
    id: 5,
    title: "Building a Blog with Next.js and MDX",
    excerpt: "Learn how to create a markdown-powered blog using Next.js and MDX.",
    author: "David Kim",
    date: "June 20, 2023",
    tags: ["Next.js", "MDX", "Blog"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "nextjs-mdx-blog",
    category: "nextjs",
  },
  {
    id: 6,
    title: "Advanced TypeScript Patterns",
    excerpt: "Explore advanced TypeScript patterns to make your code more robust and maintainable.",
    author: "Maria Garcia",
    date: "June 5, 2023",
    tags: ["TypeScript", "Patterns", "Advanced"],
    image: "/placeholder.svg?height=400&width=600",
    slug: "advanced-typescript-patterns",
    category: "typescript",
  },
]

export default function CategoryPage() {
  const category = CATEGORIES.find((cat) => cat.id === params.category)
  const params = useParams<{ category: string }>();
  if (!category) {
    notFound()
  }

  const posts = BLOG_POSTS.filter((post) => post.category === params.category)

  return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">{category.name}</span>
          </nav>

          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
              <Badge variant="secondary">{posts.length} articles</Badge>
            </div>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h2 className="mb-2 text-xl font-medium">No articles found</h2>
              <p className="text-muted-foreground">
                We couldnt find any articles in this category yet. Check back later!
              </p>
            </div>
          )}
        </div>
      </main>
  )
}

