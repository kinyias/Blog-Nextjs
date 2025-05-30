import { CommentsManagement } from "@/components/dashboard/comment/CommentMangement"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comments Management",
  description: "Manage comments on your blog posts",
}

export default function CommentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bình luận</h1>
        <p className="text-muted-foreground">Quản lý bình luận cho tin tức.</p>
      </div>
      <CommentsManagement />
    </div>
  )
}

