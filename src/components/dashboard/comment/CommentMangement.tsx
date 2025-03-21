"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { CommentStats } from "./CommentsStats"
import { CommentFilters } from "./CommentsFilter"
import { CommentsTable } from "./CommentsTable"

// Sample comment data
export type CommentStatus = "approved" | "pending" | "spam" | "trash"

export interface Comment {
  id: string
  author: {
    name: string
    email: string
    avatar?: string
    ip?: string
  }
  content: string
  post: {
    id: string
    title: string
  }
  status: CommentStatus
  date: string
  replies?: Comment[]
}

const sampleComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.1",
    },
    content: "This is a great article! I learned a lot from it.",
    post: {
      id: "101",
      title: "Getting Started with Next.js",
    },
    status: "approved",
    date: "2023-10-15T14:30:00Z",
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.2",
    },
    content: "I have a question about the third point you made. Could you elaborate more on that?",
    post: {
      id: "101",
      title: "Getting Started with Next.js",
    },
    status: "approved",
    date: "2023-10-15T15:45:00Z",
  },
  {
    id: "3",
    author: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.3",
    },
    content: "Check out my website at http://spam-site.com for more info!",
    post: {
      id: "102",
      title: "Introduction to Tailwind CSS",
    },
    status: "spam",
    date: "2023-10-16T09:15:00Z",
  },
  {
    id: "4",
    author: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.4",
    },
    content: "I'm having trouble implementing this. Could you provide more code examples?",
    post: {
      id: "102",
      title: "Introduction to Tailwind CSS",
    },
    status: "pending",
    date: "2023-10-16T10:30:00Z",
  },
  {
    id: "5",
    author: {
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.5",
    },
    content: "Thanks for sharing this knowledge. It's very helpful!",
    post: {
      id: "103",
      title: "Building a CMS with Next.js",
    },
    status: "approved",
    date: "2023-10-17T11:45:00Z",
  },
  {
    id: "6",
    author: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.6",
    },
    content: "I disagree with your approach. There are better ways to do this.",
    post: {
      id: "103",
      title: "Building a CMS with Next.js",
    },
    status: "pending",
    date: "2023-10-17T13:20:00Z",
  },
  {
    id: "7",
    author: {
      name: "David Wilson",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.7",
    },
    content: "Buy cheap products at discount-store.com!",
    post: {
      id: "104",
      title: "Advanced React Patterns",
    },
    status: "spam",
    date: "2023-10-18T09:10:00Z",
  },
  {
    id: "8",
    author: {
      name: "Olivia Martinez",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      ip: "192.168.1.8",
    },
    content: "This post changed how I think about React. Thank you!",
    post: {
      id: "104",
      title: "Advanced React Patterns",
    },
    status: "approved",
    date: "2023-10-18T14:55:00Z",
    replies: [
      {
        id: "8-1",
        author: {
          name: "Admin",
          email: "admin@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "I'm glad you found it helpful, Olivia!",
        post: {
          id: "104",
          title: "Advanced React Patterns",
        },
        status: "approved",
        date: "2023-10-18T16:30:00Z",
      },
    ],
  },
]

export function CommentsManagement() {
  const [activeTab, setActiveTab] = useState<CommentStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  // Filter comments based on active tab and search query
  const filteredComments = sampleComments.filter((comment) => {
    // Filter by status
    if (activeTab !== "all" && comment.status !== activeTab) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        comment.author.name.toLowerCase().includes(query) ||
        comment.author.email.toLowerCase().includes(query) ||
        comment.content.toLowerCase().includes(query) ||
        comment.post.title.toLowerCase().includes(query)
      )
    }

    // Filter by post
    if (selectedPostId && comment.post.id !== selectedPostId) {
      return false
    }

    // Filter by date range
    if (dateRange.from || dateRange.to) {
      const commentDate = new Date(comment.date)
      if (dateRange.from && commentDate < dateRange.from) {
        return false
      }
      if (dateRange.to) {
        const endDate = new Date(dateRange.to)
        endDate.setHours(23, 59, 59, 999) // End of the day
        if (commentDate > endDate) {
          return false
        }
      }
    }

    return true
  })

  // Count comments by status
  const commentCounts = {
    all: sampleComments.length,
    approved: sampleComments.filter((c) => c.status === "approved").length,
    pending: sampleComments.filter((c) => c.status === "pending").length,
    spam: sampleComments.filter((c) => c.status === "spam").length,
    trash: sampleComments.filter((c) => c.status === "trash").length,
  }

  // Handle comment status change
  const handleStatusChange = (commentId: string, newStatus: CommentStatus) => {
    // In a real app, you would update the comment status in your database
    console.log(`Changing comment ${commentId} status to ${newStatus}`)

    // For this demo, we'll just log the action
    alert(`Comment status changed to ${newStatus}`)
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
            <CommentsTable comments={filteredComments} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="approved" className="m-0">
            <CommentsTable comments={filteredComments} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="pending" className="m-0">
            <CommentsTable comments={filteredComments} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="spam" className="m-0">
            <CommentsTable comments={filteredComments} onStatusChange={handleStatusChange} />
          </TabsContent>
          <TabsContent value="trash" className="m-0">
            <CommentsTable comments={filteredComments} onStatusChange={handleStatusChange} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

