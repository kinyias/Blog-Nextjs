import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    author: "John Doe",
    date: "2023-10-15",
    status: true,
    category: "Development",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: "2",
    title: "Introduction to Tailwind CSS",
    excerpt: "A comprehensive guide to using Tailwind CSS in your projects",
    author: "Jane Smith",
    date: "2023-10-12",
    status: true,
    category: "Design",
    tags: ["CSS", "Tailwind", "Frontend"],
  },
  {
    id: "3",
    title: "Building a CMS with Next.js",
    excerpt: "Step-by-step guide to creating your own content management system",
    author: "Alex Johnson",
    date: "2023-10-08",
    status: false,
    category: "Development",
    tags: ["CMS", "Next.js", "Full Stack"],
  },
]

export function RecentPosts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recentPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
              <Badge variant={post.status ? "default" : "secondary"}>{post.status? 'Hiện' : 'Ẩn'}</Badge>
            </div>
            <CardDescription>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/posts/${post.id}`}>Xem</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/posts/${post.id}/edit`}>Sửa</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

