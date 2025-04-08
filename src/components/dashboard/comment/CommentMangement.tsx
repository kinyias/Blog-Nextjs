"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { CommentStats } from "./CommentsStats"
import { CommentFilters } from "./CommentsFilter"
import { CommentsTable } from "./CommentsTable"
import { usePaginatedBinhLuan } from "@/hooks/usePagination"
import { BinhLuanQueryParams, getBinhLuanStatistics, updateBinhLuan } from "@/lib/api"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

// Comment status types for UI
export type CommentStatus = "approved" | "pending";

export function CommentsManagement() {
  const [activeTab, setActiveTab] = useState<CommentStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  
  // Helper function to map tab value to trangthai parameter
  const getTransgthaiValue = (tab: CommentStatus | "all"): boolean | undefined => {
    if (tab === "approved") return true;
    if (tab === "pending") return false;
    return undefined; // For "all" tab
  }
  
  // Create query params for the API
  const [queryParams, setQueryParams] = useState<BinhLuanQueryParams>({
    page: 1,
    limit: 5,
    sortBy: 'thoigian',
    sortOrder: 'desc',
    trangthai: getTransgthaiValue(activeTab),
  })

  // Update query params when filters change
  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      trangthai: getTransgthaiValue(activeTab),
      page: 1,
    }))
  }, [activeTab])

  // Update search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams(prev => ({ ...prev, search: searchQuery, page: 1 }))
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update post filter
  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      id_tin: selectedPostId ? parseInt(selectedPostId) : undefined,
      page: 1,
    }))
  }, [selectedPostId])

  // Fetch comments with pagination
  const { data:statistics } = useQuery({
    queryKey: ['binh-luan-statistics'],
    queryFn: getBinhLuanStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
  const { data, isLoading, refetch } = usePaginatedBinhLuan(queryParams)
  // Get pagination metadata
  const pagination = data?.meta || {
    currentPage: 1,
    perPage: 5,
    totalItems: 0,
    lastPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  // Calculate comment counts
  const commentCounts = {
    all: statistics?.total || 0,
    approved: statistics?.approved || 0, 
    pending: statistics?.pending || 0,
  }

  // Handle comment status change
  const handleStatusChange = async (commentId: number, newStatus: boolean) => {
    try {
      // Update the comment status in the database
      await updateBinhLuan(commentId, { trangthai: newStatus })
      
      // Refetch the data after status change
      refetch()
      
    } catch (error) {
      console.error('Error updating comment status:', error)
      toast.error('Không thể cập nhật trạng thái bình luận')
    }
  }

  return (
    <div className="space-y-6">
      <CommentStats counts={commentCounts} />

      <Card>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as CommentStatus | "all")}
        >
          <div className="p-4 border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Tất cả ({commentCounts.all})</TabsTrigger>
              <TabsTrigger value="approved">Đã duyệt ({commentCounts.approved})</TabsTrigger>
              <TabsTrigger value="pending">Đang chờ ({commentCounts.pending})</TabsTrigger>
            </TabsList>
          </div>

          <CommentFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedPostId={selectedPostId}
            onPostChange={setSelectedPostId}
          />

          <TabsContent value="all" className="m-0">
            <CommentsTable 
              comments={data?.data || []} 
              isLoading={isLoading}
              pagination={pagination}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              onStatusChange={handleStatusChange} 
            />
          </TabsContent>
          <TabsContent value="approved" className="m-0">
            <CommentsTable 
              comments={data?.data || []} 
              isLoading={isLoading}
              pagination={pagination}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              onStatusChange={handleStatusChange} 
            />
          </TabsContent>
          <TabsContent value="pending" className="m-0">
            <CommentsTable 
              comments={data?.data || []} 
              isLoading={isLoading}
              pagination={pagination}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              onStatusChange={handleStatusChange} 
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

