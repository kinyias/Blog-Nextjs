"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock data
const CATEGORIES = [
  { id: "chandung", label: "Chân dung", count: 12 },
  { id: "tuyensinh", label: "Tuyển sinh", count: 8 },
  { id: "duhoc", label: "Du học", count: 10 },
  { id: "ai", label: "AI", count: 15 },
  { id: "chuyendoiso", label: "Chuyển đổi số", count: 7 },
  { id: "chinhtri", label: "Chính trị", count: 5 },
]

const RECENT_POSTS = [
  {
    id: 1,
    title: "Nhiều tỉnh, thành đề xuất thi tốt nghiệp THPT sớm ba tuần",
    slug: "building-scalable-apis",
    date: "June 12, 2023",
  },
  {
    id: 2,
    title: "Nữ sinh thành thủ khoa thi đánh giá năng lực sau hơn một tháng ôn luyện",
    slug: "understanding-react-server-components",
    date: "May 28, 2023",
  },
  { id: 3, title: "Yêu cầu học sinh giỏi mới được học bán dẫn sẽ gây thiếu nhân lực", slug: "mastering-typescript-generics", date: "June 5, 2023" },
  {
    id: 4,
    title: "Hàng loạt sinh viên rút đơn xin visa du học Australia",
    slug: "building-design-system-tailwind",
    date: "June 10, 2023",
  },
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
          <CardTitle>Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Tìm bài viết..." />
            <Button>Tìm</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loại tin tức</CardTitle>
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
          <CardTitle>Tin tức hot nhất</CardTitle>
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
    </div>
  )
}

