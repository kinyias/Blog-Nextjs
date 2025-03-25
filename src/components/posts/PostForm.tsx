"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from "@/components/posts/ImageUpload"
import {toast} from "sonner"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  excerpt: z
    .string()
    .min(10, {
      message: "Excerpt must be at least 10 characters.",
    })
    .max(300, {
      message: "Excerpt must not exceed 300 characters.",
    }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  featuredImage: z.string().optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  publishDate: z.date({
    required_error: "Please select a publish date.",
  }),
  status: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

// Sample categories data
const categories = [
  { id: "development", name: "AI" },
  { id: "design", name: "Chính trị" },
  { id: "marketing", name: "Kinh tế" },
  { id: "business", name: "Kỹ thuật số" },
  { id: "technology", name: "Công nghệ" },
  { id: "lifestyle", name: "Đời sống" },
]
interface IPost {
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string;
    publishDate: Date; // Converted to Date for form handling
    status: boolean;
    isFeatured: boolean;
  }
export function PostForm({ post }: { post?: IPost }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      category: post?.category || "",
      publishDate: post?.publishDate ? new Date(post.publishDate) : new Date(),
      status: post?.status,
      isFeatured: post?.isFeatured || false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Here you would normally save the post to your backend
      console.log(values)

      // Simulate saving
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast(
      `Tin tức "${values.title}" đã được ${values.status}.`
      )

      router.push("/dashboard/posts")
    } catch (error) {
      console.error("Error saving post:", error)
      toast("Có lỗi xảy ra. Vui lòng thử lại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Tiêu đề tin tức" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tóm tắt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả tóm tắt cho tin tức" className="resize-none h-24" {...field} />
                  </FormControl>
                  <FormDescription>Mô tả tóm tắt(Tối đa 300 từ).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung bài viết</FormLabel>
                      <FormControl>
                      <Textarea placeholder="Nội dung bài viết" className="h-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Trạng thái</FormLabel>
                          <FormDescription>Hiển thị tin tức.</FormDescription>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại tin tức</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại tin tức" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh đại diện</FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value ?? ""} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Tin hot</FormLabel>
                          <FormDescription>Hiển thị tin hot ở trang chủ.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Đang lưu..." : "Lưu"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/posts")}>
            Huỷ
          </Button>
        </div>
      </form>
    </Form>
  )
}

