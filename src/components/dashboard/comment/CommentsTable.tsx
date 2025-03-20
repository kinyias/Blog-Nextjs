"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { CheckCircle, Clock, AlertTriangle, Trash2, MoreHorizontal, MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Comment, CommentStatus } from "@/components/dashboard/comment/CommentMangement"
import {toast} from 'sonner';

interface CommentsTableProps {
  comments: Comment[]
  onStatusChange: (commentId: string, newStatus: CommentStatus) => void
}

export function CommentsTable({ comments, onStatusChange }: CommentsTableProps) {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const handleStatusChange = (commentId: string, newStatus: CommentStatus) => {
    onStatusChange(commentId, newStatus)
    toast(`The comment has been marked as ${newStatus}.`,)
  }

//   const getStatusIcon = (status: CommentStatus) => {
//     switch (status) {
//       case "approved":
//         return <CheckCircle className="h-4 w-4 text-green-500" />
//       case "pending":
//         return <Clock className="h-4 w-4 text-yellow-500" />
//       case "spam":
//         return <AlertTriangle className="h-4 w-4 text-red-500" />
//       case "trash":
//         return <Trash2 className="h-4 w-4 text-gray-500" />
//     }
//   }

  const getStatusBadge = (status: CommentStatus) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "spam":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Spam
          </Badge>
        )
      case "trash":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Trash
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy 'at' h:mm a")
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Author</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>In Response To</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[180px]">Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No comments found.
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow key={comment.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {comment.author.avatar ? (
                        <Image
                          src={comment.author.avatar || "/placeholder.svg"}
                          alt={comment.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs font-medium">{comment.author.name.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-xs text-muted-foreground">{comment.author.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 text-sm">
                      {comment.replies && comment.replies.length > 0 && (
                        <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {comment.replies.length}
                        </Badge>
                      )}
                      {comment.content}
                    </div>
                    <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs"
                        onClick={() => setSelectedComment(comment)}
                      >
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/posts/${comment.post.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {comment.post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{getStatusBadge(comment.status)}</TableCell>
                  <TableCell className="text-sm">{formatDate(comment.date)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedComment(comment)}>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {comment.status !== "approved" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(comment.id, "approved")}>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {comment.status !== "pending" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(comment.id, "pending")}>
                            <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                            Mark as Pending
                          </DropdownMenuItem>
                        )}
                        {comment.status !== "spam" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(comment.id, "spam")}>
                            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                            Mark as Spam
                          </DropdownMenuItem>
                        )}
                        {comment.status !== "trash" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(comment.id, "trash")}>
                            <Trash2 className="h-4 w-4 mr-2 text-gray-500" />
                            Move to Trash
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedComment} onOpenChange={(open) => !open && setSelectedComment(null)}>
        {selectedComment && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Comment Details</DialogTitle>
              <DialogDescription>Submitted on {formatDate(selectedComment.date)}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {selectedComment.author.avatar ? (
                    <Image
                      src={selectedComment.author.avatar || "/placeholder.svg"}
                      alt={selectedComment.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-medium">{selectedComment.author.name.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{selectedComment.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedComment.author.email}</p>
                      {selectedComment.author.ip && (
                        <p className="text-xs text-muted-foreground">IP: {selectedComment.author.ip}</p>
                      )}
                    </div>
                    <div>{getStatusBadge(selectedComment.status)}</div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">{selectedComment.content}</p>
                  </div>

                  <div className="mt-4 text-sm">
                    <p>
                      In response to:{" "}
                      <Link
                        href={`/dashboard/posts/${selectedComment.post.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedComment.post.title}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {selectedComment.replies && selectedComment.replies.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-4">Replies ({selectedComment.replies.length})</h4>
                  <div className="space-y-4">
                    {selectedComment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-4 ml-8">
                        <div className="flex-shrink-0">
                          {reply.author.avatar ? (
                            <Image
                              src={reply.author.avatar || "/placeholder.svg"}
                              alt={reply.author.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-sm font-medium">{reply.author.name.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{reply.author.name}</h3>
                              <p className="text-xs text-muted-foreground">{formatDate(reply.date)}</p>
                            </div>
                          </div>

                          <div className="mt-2 p-3 bg-muted rounded-md">
                            <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <div className="space-x-2">
                  {selectedComment.status !== "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600"
                      onClick={() => {
                        handleStatusChange(selectedComment.id, "approved")
                        setSelectedComment(null)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {selectedComment.status !== "spam" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => {
                        handleStatusChange(selectedComment.id, "spam")
                        setSelectedComment(null)
                      }}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Spam
                    </Button>
                  )}
                  {selectedComment.status !== "trash" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-600"
                      onClick={() => {
                        handleStatusChange(selectedComment.id, "trash")
                        setSelectedComment(null)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Trash
                    </Button>
                  )}
                </div>
                <Button size="sm" variant="default" onClick={() => setSelectedComment(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

