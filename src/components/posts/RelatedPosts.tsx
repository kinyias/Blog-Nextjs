import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

interface RelatedPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  slug: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              <h3 className="mb-2 font-bold leading-tight">{post.title}</h3>
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

