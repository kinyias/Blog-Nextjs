"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createBinhLuan, BinhLuanType, BinhLuanQueryParams, getBinhLuanByTinId } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Define the form schema with validation
const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  noidung: z.string().min(3, { message: "Bình luận phải có ít nhất 3 ký tự" }),
  captcha: z.string().refine((val) => val !== "", {
    message: "Vui lòng nhập kết quả",
  }),
})

// Function to generate a simple math captcha
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return {
    question: `${num1} + ${num2} = ?`,
    answer: String(num1 + num2)
  };
}

interface CommentProps {
  comment: BinhLuanType
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{comment.email}</h4>
              <p className="text-xs text-muted-foreground">{formatDate(comment.thoigian)}</p>
            </div>
          </div>
          <p className="text-sm">{comment.noidung}</p>
        </div>
      </div>
    </div>
  )
}

export function PostComments({ postId }: { postId: number }) {
  const queryClient = useQueryClient()
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [page, setPage] = useState(1)
  const limit = 5 // Comments per page
  
  // Captcha state
  const [captcha, setCaptcha] = useState(generateCaptcha())
  
  // Form setup with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      noidung: "",
      captcha: "",
    },
  })

  // Refresh captcha when form is reset
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, [form.formState.isSubmitSuccessful]);

  // Fetch comments for this post with pagination
  const { data, isLoading: isLoadingComments } = useQuery({
    queryKey: ['comments', postId, sortOrder, page, limit],
    queryFn: async () => {
      const params: BinhLuanQueryParams = {
        sortBy: 'thoigian',
        sortOrder: sortOrder,
        trangthai: true,
        page,
        limit,
      }
      const response = await getBinhLuanByTinId(params, postId)
      return response
    },
  })
  
  const comments = data?.data || []
  const pagination = data?.meta || {
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: (data: { email: string; noidung: string; captcha: string }) => {
     
      
      const commentData: Omit<BinhLuanType, 'id_binhluan'> = {
        email: data.email,
        noidung: data.noidung,
        id_tin: postId,
        thoigian: new Date(),
        trangthai: false, // Comments start as pending
      }
      return createBinhLuan(commentData)
    },
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      
      // Reset form
      form.reset()
      
      // Generate new captcha
      setCaptcha(generateCaptcha())
      
      // Show success message
      toast.success("Bình luận của bạn đã được gửi và đang chờ duyệt", {
        style: {
          backgroundColor: '#16a34a',
          color: '#ffffff',
        },
      })
    },
    onError: (error: Error) => {
      console.error("Error creating comment:", error)
      
      if (error.message === "Mã xác nhận không đúng") {
        toast.error("Mã xác nhận không đúng. Vui lòng thử lại.")
        // Generate new captcha
        setCaptcha(generateCaptcha())
        form.setValue("captcha", "")
      } else {
        toast.error("Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại sau.")
      }
    }
  })

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
     // Verify captcha before submitting
     if (values.captcha !== captcha.answer) {
      toast.error("Mã xác nhận không đúng. Vui lòng thử lại.",{
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff',
        },
      });
        return; // Dừng xử lý nếu mã xác nhận không điề
    }
    createCommentMutation.mutate(values)
  }

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'desc' | 'asc')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">Bình luận</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="noidung"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Chia sẻ cảm nghĩ của bạn..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="captcha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận bạn không phải robot</FormLabel>
                  <div className="flex items-center gap-3">
                    <div className="rounded bg-muted px-3 py-2 font-medium">
                      {captcha.question}
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="Nhập kết quả" 
                        className="w-32" 
                        {...field} 
                      />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setCaptcha(generateCaptcha());
                        form.setValue("captcha", "");
                      }}
                    >
                      Làm mới
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="cursor-pointer"
                disabled={createCommentMutation.isPending}
              >
                {createCommentMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {createCommentMutation.isPending ? "Đang gửi..." : "Gửi bình luận"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {pagination.totalItems} Bình luận đã được duyệt
          </h3>
          <select 
            className="rounded-md border bg-background px-2 py-1 text-sm"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
        </div>

        <div className="space-y-6">
          {isLoadingComments ? (
            <p className="text-center text-muted-foreground">Đang tải bình luận...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-muted-foreground">Chưa có bình luận nào</p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id_binhluan} comment={comment} />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {pagination.lastPage > 1 && (
          <div className="flex items-center justify-between">
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
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

