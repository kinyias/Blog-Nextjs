"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart, Reply } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// Mock data for comments
const COMMENTS = [
  {
    id: 1,
    author: "Jane Cooper",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "June 15, 2023",
    content:
      "This article was incredibly helpful! I've been struggling with setting up proper API routes in Next.js, and your explanation of route handlers cleared up a lot of my confusion.",
    likes: 12,
    replies: [
      {
        id: 101,
        author: "Sarah Johnson",
        authorImage: "/placeholder.svg?height=40&width=40",
        date: "June 15, 2023",
        content: "Thanks Jane! I'm glad you found it helpful. Let me know if you have any other questions.",
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    author: "Alex Morgan",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "June 14, 2023",
    content:
      "Great article! I especially appreciated the section on TypeScript integration. One question though - how would you handle file uploads with this approach?",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "June 13, 2023",
    content:
      "The middleware example was exactly what I needed. I've implemented it in my project and it works perfectly. Thanks for sharing!",
    likes: 5,
    replies: [],
  },
]

interface CommentProps {
  comment: {
    id: number
    author: string
    authorImage: string
    date: string
    content: string
    likes: number
    replies?: CommentProps["comment"][]
  }
  isReply?: boolean
}

function Comment({ comment, isReply = false }: CommentProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className={`${isReply ? "ml-12 mt-4" : "mb-6"}`}>
      <div className="flex gap-4">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          <Image src={comment.authorImage || "/placeholder.svg"} alt={comment.author} fill className="object-cover" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{comment.author}</h4>
              <p className="text-xs text-muted-foreground">{comment.date}</p>
            </div>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2" onClick={handleLike}>
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-xs">{likes}</span>
            </Button>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 px-2"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply className="h-4 w-4" />
                <span className="text-xs">Reply</span>
              </Button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-4 space-y-2">
              <Textarea placeholder="Write a reply..." className="min-h-[100px]" />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowReplyForm(false)}>
                  Cancel
                </Button>
                <Button size="sm">Reply</Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function PostComments({ postSlug }: { postSlug: string }) {
  const [commentText, setCommentText] = useState("")

  console.log(postSlug);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the comment to your API
    console.log("Submitting comment:", commentText)
    setCommentText("")
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!commentText.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{COMMENTS.length} Comments</h3>
          <select className="rounded-md border bg-background px-2 py-1 text-sm">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        <div className="space-y-6">
          {COMMENTS.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

