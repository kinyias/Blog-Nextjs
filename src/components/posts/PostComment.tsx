"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// Mock data for comments
const COMMENTS = [
  {
    id: 1,
    author: "user@gmail.com",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "05 thg 05, 2024",
    content:
      "Bình luận 1.",
    likes: 12,
  },
  {
    id: 2,
    author: "user@gmail.com",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "05 thg 05, 2024",
    content:
      "Bình luận 2.",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    author: "user@gmail.com",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "05 thg 05, 2024",
    content:
      "Bình luận 3.",
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


  return (
    <div className={`${isReply ? "ml-12 mt-4" : "mb-6"}`}>
      <div className="flex gap-4">

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{comment.author}</h4>
              <p className="text-xs text-muted-foreground">{comment.date}</p>
            </div>
          </div>
          <p className="text-sm">{comment.content}</p>


        

         
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
        <h3 className="mb-4 text-lg font-medium">Bình luận</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Chia sẻ cảm nghĩ..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!commentText.trim()}>
              Đăng bình luận
            </Button>
          </div>
        </form>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{COMMENTS.length} Bình luận</h3>
          <select className="rounded-md border bg-background px-2 py-1 text-sm">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
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

