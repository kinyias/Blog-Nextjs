"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useAllLoaiTin, useHotTin } from "@/hooks/usePagination"
import { formatDate, generateSlug } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('loaitin')?.split(',').filter(Boolean) || []
  )
  
  // Fetch hot news and categories
  const { data: hotNews, isLoading: isLoadingHotNews } = useHotTin()
  const { data: categories, isLoading: isLoadingCategories } = useAllLoaiTin()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (searchQuery) {
      params.set('q', searchQuery)
    }
    
    if (selectedCategories.length > 0) {
      params.set('loaitin', selectedCategories.join(','))
    }
    
    router.push(`/search?${params.toString()}`)
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
      
      const params = new URLSearchParams(searchParams)
      if (newCategories.length > 0) {
        params.set('loaitin', newCategories.join(','))
      } else {
        params.delete('loaitin')
      }
      
      // router.push(`/search?${params.toString()}`)
      return newCategories
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Tìm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="cursor-pointer">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loại tin tức</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoadingCategories ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : categories?.map((category) => (
            <div key={category.id_loaitin} className="flex items-center space-x-2">
              <Checkbox
                className="cursor-pointer"
                id={`category-${category.id_loaitin}`}
                checked={selectedCategories.includes(category.id_loaitin)}
                onCheckedChange={() => toggleCategory(category.id_loaitin)}
              />
              <label
                htmlFor={`category-${category.id_loaitin}`}
                className="flex w-full cursor-pointer items-center justify-between text-sm font-medium"
              >
                <span>{category.ten_loaitin}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {category.tin?.length || 0}
                </span>
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
          {isLoadingHotNews ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
                <Separator />
              </div>
            ))
          ) : hotNews?.data.map((post) => (
            <div key={post.id_tin} className="space-y-1">
              <Link 
                href={`/posts/${generateSlug(post.tieude)}-${post.id_tin}`} 
                className="line-clamp-2 text-sm font-medium hover:underline"
              >
                {post.tieude}
              </Link>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.ngaydangtin)}
              </p>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

