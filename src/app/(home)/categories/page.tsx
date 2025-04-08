'use client'

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { usePaginatedLoaiTin } from "@/hooks/usePagination"
import { generateSlug } from "@/lib/utils"

export default function CategoriesPage() {
  const [page, setPage] = useState(1)
  const limit = 9 // 3x3 grid

  const { data, isLoading } = usePaginatedLoaiTin({
    page,
    limit,
    sortBy: 'ten_loaitin',
    sortOrder: 'asc',
    trangthai: true,
  })

  const categories = data?.data || []
  const pagination = data?.meta

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Loại tin tức</span>
        </nav>

        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Loại tin tức</h1>
          {pagination && (
            <p className="text-muted-foreground">
              Hiển thị {categories.length} trong tổng số {pagination.totalItems} loại tin
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: limit }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link 
                key={category.id_loaitin} 
                href={`/categories/${generateSlug(category.ten_loaitin)}-${category.id_loaitin}`}
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{category.ten_loaitin}</CardTitle>
                      <Badge variant="secondary">{category.tin?.length || 0}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="px-0" asChild>
                      <span className="flex items-center gap-1">
                        Xem bài viết
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.lastPage > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Trang {pagination.currentPage} / {pagination.lastPage}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                 className="cursor-pointer"
                onClick={() => setPage(prev => prev - 1)}
                disabled={!pagination.hasPreviousPage}
              >
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                Trang trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => setPage(prev => prev + 1)}
                disabled={!pagination.hasNextPage}
              >
                Trang sau
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

