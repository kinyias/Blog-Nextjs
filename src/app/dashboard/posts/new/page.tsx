import type { Metadata } from "next"
import { PostForm } from "@/components/posts/PostForm"

export const metadata: Metadata = {
  title: "Tạo tin tức mới",
  description: "Tạo tin tức mới",
}

export default function NewPostPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tạo tin tức mới</h1>
        <p className="text-muted-foreground">Tạo tin tức mới cho website.</p>
      </div>
      <PostForm />
    </div>
  )
}

