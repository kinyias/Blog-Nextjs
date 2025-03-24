"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostsTable } from "@/components/dashboard/PostTable"
import { useQuery } from "@tanstack/react-query";
import { getAllTin } from "@/lib/api";

export default function PostsPage() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllTin,
    staleTime: Infinity,
  });
  console.log(data);
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

