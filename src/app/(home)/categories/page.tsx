import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


// Mock data for categories
const CATEGORIES = [
  { id: "chandung", name: "Chân dung", count: 12 },
  { id: "nextjs", name: "Tuyển sinh", count: 8 },
  { id: "typescript", name: "AI", count: 10 },
  { id: "javascript", name: "Chuyển đổi số", count: 15 },
  { id: "css", name: "Kinh tế", count: 7},
  { id: "tailwind", name: "Chính trị", count: 5},
  { id: "api", name: "Doanh nhân", count: 4 },
  { id: "performance", name: "Du lịch", count: 3 },
  { id: "seo", name: "Tuyển sinh", count: 2},
  { id: "accessibility", name: "Du học", count: 3 },
  { id: "testing", name: "Quốc tế", count: 6 },
  { id: "devops", name: "Phim", count: 4},
]

export default function CategoriesPage() {
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
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{category.name}</CardTitle>
                      <Badge variant="secondary">{category.count}</Badge>
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
        </div>
      </main>
  )
}

