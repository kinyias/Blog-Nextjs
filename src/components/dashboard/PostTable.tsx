'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { ArrowUpDown, Eye, EyeOff, Loader2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { TinType, TinQueryParams, deleteTin, updateTinStatus } from '@/lib/api';
import { useTinPagination } from '@/hooks/usePagination';
import { formatDate } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function PostsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState<TinQueryParams>({
    page: 1,
    limit: 5,
    sortBy: 'ngaydangtin',
    sortOrder: 'desc',
  });
  // Add this state for bulk delete dialog
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<TinType | null>(null);

  const queryClient = useQueryClient();
  
  // Add this state to track refetching state
  const [isRefetching, setIsRefetching] = useState(false);
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTin(id),
    onSuccess: () => {
      // Set refetching state to true before invalidating queries
      setIsRefetching(true);
      // Invalidate and refetch the tin list query to update the UI
      queryClient.invalidateQueries({ queryKey: ['tin'] })
        .then(() => {
          // Set a small timeout to ensure the UI shows the refetching state
          setTimeout(() => {
            setIsRefetching(false);
          }, 800);
        });
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast.error('Có lỗi xảy ra khi xóa tin tức. Vui lòng thử lại sau.');
    }
  });
  
  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: number[]) => Promise.all(ids.map(id => deleteTin(id))),
    onSuccess: () => {
      setIsRefetching(true);
      queryClient.invalidateQueries({ queryKey: ['tin'] })
        .then(() => {
          setTimeout(() => {
            setIsRefetching(false);
          }, 800);
        });
      setRowSelection({});
    },
    onError: (error) => {
      console.error('Error deleting multiple posts:', error);
      toast.error('Có lỗi xảy ra khi xóa tin tức. Vui lòng thử lại sau.');
    }
  });

  const handleDeletePost = (post: TinType) => {
    deleteMutation.mutate(post.id_tin, {
      onSuccess: () => {
        toast.success(`Tin tức "${post.tieude}" đã được xóa thành công.`, {
          style: {
            backgroundColor: '#16a34a',
            color: '#ffffff',
          },
        });
        setOpen(false);
      }
    });
  };
  
  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(Number);
    
    bulkDeleteMutation.mutate(selectedIds, {
      onSuccess: () => {
        toast.success(`${selectedIds.length} tin tức đã được xóa thành công.`, {
          style: {
            backgroundColor: '#16a34a',
            color: '#ffffff',
          },
        });
        setBulkDeleteOpen(false);
      }
    });
  };
  // Update search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams(prev => ({ ...prev, search: searchTerm, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update sorting
  useEffect(() => {
    if (sorting.length > 0) {
      setQueryParams(prev => ({
        ...prev,
        sortBy: sorting[0].id,
        sortOrder: sorting[0].desc ? 'desc' : 'asc',
        page: 1,
      }));
    }
  }, [sorting]);

  const { data, isLoading } = useTinPagination(queryParams);
  
  const posts = data?.data || [];
  const pagination = data?.meta || {
    currentPage: 1,
    perPage: 5,
    totalItems: 0,
    lastPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const toggleVisibility = (post: TinType) => {
    const newStatus = !post.trangthai;
    
    updateStatusMutation.mutate(
      { id: post.id_tin, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            `Tin tức "${post.tieude}" đã được ${newStatus ? 'hiện' : 'ẩn'}.`,
            {
              style: {
                backgroundColor: '#16a34a',
                color: '#ffffff',
              },
            }
          );
        }
      }
    );
  };
  // Add status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: boolean }) => 
      updateTinStatus(id, { trangthai: status }),
    onSuccess: () => {
      setIsRefetching(true);
      queryClient.invalidateQueries({ queryKey: ['tin'] })
        .then(() => {
          setTimeout(() => {
            setIsRefetching(false);
          }, 800);
        });
    },
    onError: (error) => {
      console.error('Error updating post status:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại sau.');
    }
  });

  const columns: ColumnDef<TinType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'tieude',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tiêu đề
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('tieude')}</div>
      ),
    },
    {
      accessorKey: 'loai_tin',
      header: 'Loại tin tức',
      cell: ({ row }) => {
        console.log('Row data:', row.original);
        const loaiTin = row.original.loai_tin;
        console.log('Loai tin:', loaiTin);
        return <div>{loaiTin?.ten_loaitin || 'N/A'}</div>;
      },
    },
    {
      accessorKey: 'tacgia',
      header: 'Tác giả',
    },
    {
      accessorKey: 'ngaydangtin',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ngày đăng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            {formatDate(row.getValue('ngaydangtin'))}
            {/* {new Date(row.getValue('ngaydangtin')).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })} */}
          </div>
        );
      },
    },
    {
      accessorKey: 'trangthai',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const post = row.original;
        const isHidden = !post.trangthai;
        const isPending = updateStatusMutation.isPending && 
                         updateStatusMutation.variables?.id === post.id_tin;
        
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleVisibility(post)}
            disabled={isPending}
            className={isHidden ? 'text-muted-foreground' : 'text-primary'}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : isHidden ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {isPending ? 'Đang cập nhật...' : isHidden ? 'Ẩn' : 'Hiện'}
          </Button>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const post = row.original;

        return (
          <Dialog open={open && postToDelete?.id_tin === post.id_tin} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/posts/${post.id_tin}`}>Xem</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/posts/${post.id_tin}/edit`}>Sửa</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setPostToDelete(post);
                  setOpen(true);
                }}
                className="text-destructive focus:text-destructive className='cursor-pointer'"
              >
                Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận xóa</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa tin tức &quot;{post.tieude}&quot;? Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className='cursor-pointer' variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button className='cursor-pointer' variant="destructive" onClick={() => handleDeletePost(post)}>
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {deleteMutation.isPending ? 'Đang xoá...' : 'Xoá'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        );
      },
    },
  ];

  const table = useReactTable<TinType>({
    data: posts,
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: pagination.lastPage,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination: {
        pageIndex: pagination.currentPage - 1,
        pageSize: pagination.perPage,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Tìm bài viết..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
        {Object.keys(rowSelection).length > 0 && (
          <Dialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Xoá
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận xóa hàng loạt</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn xóa {Object.keys(rowSelection).length} tin tức đã chọn? Hành động này không thể
                  hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBulkDeleteOpen(false)}>
                  Hủy
                </Button>
                <Button variant="destructive" onClick={handleBulkDelete}>
                  Xóa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading || isRefetching ? (
              Array.from({ length: pagination.perPage }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array.from({ length: columns.length }).map((_, cellIndex) => (
                    <TableCell key={`skeleton-cell-${cellIndex}`}>
                      <Skeleton className={
                        cellIndex === 0 ? "h-4 w-4" : 
                        cellIndex === 1 ? "h-4 w-[250px]" : 
                        cellIndex === 2 ? "h-4 w-[120px]" : 
                        cellIndex === 3 ? "h-4 w-[100px]" : 
                        cellIndex === 4 ? "h-4 w-[100px]" : 
                        cellIndex === 5 ? "h-8 w-[80px]" : "h-8 w-8"
                      } />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                 Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
          {isLoading || isRefetching ? (
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
                  (Tổng {pagination.totalItems} bài viết)
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
  );
}
