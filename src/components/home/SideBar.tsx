"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data
const CATEGORIES = [
  { id: "react", label: "React", count: 12 },
  { id: "nextjs", label: "Next.js", count: 8 },
  { id: "typescript", label: "TypeScript", count: 10 },
  { id: "javascript", label: "JavaScript", count: 15 },
  { id: "css", label: "CSS", count: 7 },
  { id: "tailwind", label: "Tailwind", count: 5 },
]

const RECENT_POSTS = [
  {
    id: 1,
    title: "Building Scalable APIs with Next.js and TypeScript",
    slug: "building-scalable-apis",
    date: "June 12, 2023",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    slug: "understanding-react-server-components",
    date: "May 28, 2023",
  },
  { id: 3, title: "Mastering TypeScript Generics", slug: "mastering-typescript-generics", date: "June 5, 2023" },
  {
    id: 4,
    title: "Building a Design System with Tailwind CSS",
    slug: "building-design-system-tailwind",
    date: "June 10, 2023",
  },
]

const TAGS = [
  { id: "react", label: "React", count: 12 },
  { id: "nextjs", label: "Next.js", count: 8 },
  { id: "typescript", label: "TypeScript", count: 10 },
  { id: "javascript", label: "JavaScript", count: 15 },
  { id: "css", label: "CSS", count: 7 },
  { id: "tailwind", label: "Tailwind", count: 5 },
  { id: "api", label: "API", count: 4 },
  { id: "performance", label: "Performance", count: 3 },
  { id: "seo", label: "SEO", count: 2 },
  { id: "accessibility", label: "Accessibility", count: 3 },
]

export function Sidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search articles..." />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="flex w-full cursor-pointer items-center justify-between text-sm font-medium"
              >
                <span>{category.label}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{category.count}</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {RECENT_POSTS.map((post) => (
            <div key={post.id} className="space-y-1">
              <Link href={`/blog/${post.slug}`} className="line-clamp-2 text-sm font-medium hover:underline">
                {post.title}
              </Link>
              <p className="text-xs text-muted-foreground">{post.date}</p>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.id}`}>
                <Badge variant="outline" className="hover:bg-muted">
                  {tag.label} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Subscribe to our newsletter to get the latest updates.</p>
          <div className="space-y-2">
            <Input placeholder="Your email address" type="email" />
            <Button className="w-full">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

