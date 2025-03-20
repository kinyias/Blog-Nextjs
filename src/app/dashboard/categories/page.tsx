import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CategoriesTable } from "@/components/dashboard/CategoryTable"

export default function CategoriesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Loại tin tức</h1>
        <Button variant={'success'} asChild>
          <Link href="/dashboard/categories/new">Thêm loại tin mới</Link>
        </Button>
      </div>
      <CategoriesTable />
    </div>
  )
}

