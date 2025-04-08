'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Clock,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { BinhLuanQueryParams, BinhLuanType, deleteBinhLuan, updateBinhLuanStatus } from '@/lib/api';
import { formatDate, generateSlug } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CommentsTableProps {
  comments: BinhLuanType[];
  isLoading: boolean;
  pagination: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  queryParams: BinhLuanQueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<BinhLuanQueryParams>>;
  onStatusChange: (commentId: number, newStatus: boolean) => void;
}

export function CommentsTable({
  comments,
  isLoading,
  pagination,
  queryParams,
  setQueryParams,
  onStatusChange,
}: CommentsTableProps) {
  const [selectedComment, setSelectedComment] = useState<BinhLuanType | null>(null);
  const queryClient = useQueryClient();

  // Status change mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: boolean }) => 
      updateBinhLuanStatus(id, { trangthai: status }),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['paginated-binh-luan'] });
      queryClient.invalidateQueries({ queryKey: ['binh-luan-statistics'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBinhLuan(id),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['paginated-binh-luan'] });
      queryClient.invalidateQueries({ queryKey: ['binh-luan-statistics'] });
    },
  });

  const handleStatusChange = async (commentId: number, newStatus: boolean) => {
    try {
      await statusMutation.mutateAsync({ id: commentId, status: newStatus });
      onStatusChange(commentId, newStatus);
      toast.success(
        `Bình luận đã được ${newStatus ? 'duyệt' : 'đánh dấu chưa duyệt'}.`,
        {
          style: {
            backgroundColor: newStatus ? '#16a34a' : '#eab308',
            color: '#ffffff',
          },
        }
      );
      
      // If we're viewing a comment in the dialog, update its status
      if (selectedComment && selectedComment.id_binhluan === commentId) {
        setSelectedComment({
          ...selectedComment,
          trangthai: newStatus,
        });
      }
    } catch (error) {
      console.error('Error updating comment status:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật trạng thái bình luận.');
    }
  };

  const handleDeleteBinhLuan = async (commentId: number) => {
    try {
      await deleteMutation.mutateAsync(commentId);
      toast.success('Bình luận đã được xóa thành công.', {
        style: {
          backgroundColor: '#16a34a',
          color: '#ffffff',
        },
      });
      
      // If we're viewing the deleted comment, close the dialog
      if (selectedComment && selectedComment.id_binhluan === commentId) {
        setSelectedComment(null);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Đã xảy ra lỗi khi xóa bình luận.');
    }
  };

  const getStatusBadge = (status: boolean) => {
    switch (status) {
      case true:
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Đã duyệt
          </Badge>
        );
      case false:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Đang chờ
          </Badge>
        );
    }
  };


  return (
    <>
      <div className="space-y-4">
        <div className="relative overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Người bình luận</TableHead>
                <TableHead>Bình luận</TableHead>
                <TableHead>Bình luận về</TableHead>
                <TableHead className="w-[120px]">Trạng thái</TableHead>
                <TableHead className="w-[180px]">Ngày</TableHead>
                <TableHead className="w-[80px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: pagination.perPage }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="h-3 w-[150px]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full max-w-[300px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[180px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : comments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Không tìm thấy bình luận nào.
                  </TableCell>
                </TableRow>
              ) : (
                comments.map((comment) => (
                  <TableRow key={comment.id_binhluan}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {comment.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                        
                          <div className="text-sm text-muted-foreground">
                            {comment.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="line-clamp-2">{comment.noidung}</div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/posts/${generateSlug(comment.tin?.tieude || "")}-${comment.id_tin}`}
                        className="text-blue-600 hover:underline"
                      >
                        {comment.tin?.tieude || `Bài viết #${comment.id_tin}`}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusBadge(comment.trangthai)}</TableCell>
                    <TableCell>{formatDate(comment.thoigian)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedComment(comment)}
                          >
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {!comment.trangthai && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(comment.id_binhluan, true)
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Duyệt
                            </DropdownMenuItem>
                          )}
                          {comment.trangthai && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(comment.id_binhluan, false)
                              }
                            >
                              <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                              Đánh dấu chưa duyệt
                            </DropdownMenuItem>
                          )}
                          {/* {comment.trangthai !== 'trash' && ( */}
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteBinhLuan(comment.id_binhluan)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2 text-gray-500" />
                              Xoá
                            </DropdownMenuItem>
                          {/* )} */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-2">
          {isLoading ? (
            <div className="flex items-center justify-between w-full">
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-8 w-[250px]" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Số hàng mỗi trang</p>
                <select
                  value={queryParams.limit}
                  onChange={(e) => {
                    const newLimit = Number(e.target.value);
                    setQueryParams(prev => ({ ...prev, limit: newLimit, page: 1 }));
                  }}
                  className="h-8 w-[70px] rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  {[5, 10, 20, 30, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 text-sm text-muted-foreground">
                  Trang {pagination.currentPage} trên {pagination.lastPage} 
                  (Tổng {pagination.totalItems} bình luận)
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQueryParams(prev => ({ ...prev, page: prev.page! - 1 }));
                    }}
                    disabled={!pagination.hasPreviousPage}
                  >
                    Trước
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQueryParams(prev => ({ ...prev, page: prev.page! + 1 }));
                    }}
                    disabled={!pagination.hasNextPage}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Dialog
        open={!!selectedComment}
        onOpenChange={(open) => !open && setSelectedComment(null)}
      >
        {selectedComment && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Chi tiết bình luận</DialogTitle>
              <DialogDescription>
                Đã gửi {formatDate(selectedComment.thoigian)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">
                      {selectedComment.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{selectedComment.email}</h3>
                      
                    </div>
                    <div>{getStatusBadge(selectedComment.trangthai)}</div>
                  </div>
                  <div className="mt-4 p-4 rounded-md bg-muted">
                    <p>{selectedComment.noidung}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">
                      Bình luận về:{' '}
                      <Link
                        href={`/dashboard/posts/${selectedComment.id_tin}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedComment.tin?.tieude || `Bài viết #${selectedComment.id_tin}`}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {!selectedComment.trangthai && (
                  <Button
                    onClick={() =>{
                      handleStatusChange(selectedComment.id_binhluan, true);
                      setSelectedComment(null); 
                    }
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Duyệt
                  </Button>
                )}
                {selectedComment.trangthai && (
                  <Button
                    variant="outline"
                     className='cursor-pointer'
                    onClick={() =>{
                      handleStatusChange(selectedComment.id_binhluan, false)
                      setSelectedComment(null);
                    }
                    }
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Đánh dấu chưa duyệt
                  </Button>
                )}
                {/* {selectedComment.trangthai !== 'trash' && ( */}
                  <Button
                    variant="destructive"
                    className='cursor-pointer'
                    onClick={() =>{
                      handleDeleteBinhLuan(selectedComment.id_binhluan)
                      setSelectedComment(null);
                    }
                     
                    }
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xoá
                  </Button>
                {/* )} */}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
