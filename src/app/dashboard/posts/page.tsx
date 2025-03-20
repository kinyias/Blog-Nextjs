import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostsTable } from "@/components/dashboard/PostTable"

export default function PostsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tin tức</h1>
        <Button variant={'success'} asChild>
          <Link href="/dashboard/posts/new">Tạo tin mới</Link>
        </Button>
      </div>
      <PostsTable />
    </div>
  )
}

