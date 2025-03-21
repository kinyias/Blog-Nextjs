import { CategoryForm } from "@/components/dashboard/CategoryForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tạo loại tin mới",
  description: "Tạo loại tin mới",
}

export default function NewCategoryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tạo loại tin mới</h1>
        <p className="text-muted-foreground">Tạo loai tin mới cho tin tức.</p>
      </div>
      <CategoryForm />
    </div>
  )
}

