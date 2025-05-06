"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, EyeOff, Loader2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from 'sonner'
import { LoaiTinType, LoaiTinQueryParams, deleteLoaiTin, updateLoaiTinStatus } from "@/lib/api"
import { usePaginatedLoaiTin } from "@/hooks/usePagination"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function CategoriesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [queryParams, setQueryParams] = useState<LoaiTinQueryParams>({
    page: 1,
    limit: 5,
    sortBy: 'ten_loaitin',
    sortOrder: 'asc',
  })
  // Add states for delete dialogs
  const [open, setOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<LoaiTinType | null>(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)

  const queryClient = useQueryClient()

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteLoaiTin(id),
    onSuccess: () => {
      setIsRefetching(true)
      queryClient.invalidateQueries({ queryKey: ['paginated-loai-tin'] })
        .then(() => {
          setTimeout(() => {
            setIsRefetching(false)
          }, 800)
        })
    },
    onError: (error) => {
      console.error('Error deleting category:', error)
      toast.error('Có lỗi xảy ra khi xóa loại tin. Vui lòng thử lại sau.')
    }
  })

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => Promise.all(ids.map(id => deleteLoaiTin(id))),
    onSuccess: () => {
      setIsRefetching(true)
      queryClient.invalidateQueries({ queryKey: ['paginated-loai-tin'] })
        .then(() => {
          setTimeout(() => {
            setIsRefetching(false)
          }, 800)
        })
      setRowSelection({})
    },
    onError: (error) => {
      console.error('Error deleting multiple categories:', error)
      toast.error('Có lỗi xảy ra khi xóa loại tin. Vui lòng thử lại sau.')
    }
  })

  const handleDeleteCategory = (category: LoaiTinType) => {
    deleteMutation.mutate(category.id_loaitin, {
      onSuccess: () => {
        toast.success(`Loại tin "${category.ten_loaitin}" đã được xóa thành công.`, {
          style: {
            backgroundColor: '#16a34a',
            color: '#ffffff',
          },
        })
        setOpen(false)
      }
    })
  }

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(index => {
      // Convert string index to number and get the corresponding group
      return categories[Number(index)].id_loaitin;
    });
    
    bulkDeleteMutation.mutate(selectedIds, {
      onSuccess: () => {
        toast.success(`${selectedIds.length} loại tin đã được xóa thành công.`, {
          style: {
            backgroundColor: '#16a34a',
            color: '#ffffff',
          },
        })
        setBulkDeleteOpen(false)
      }
    })
  }

  // Update search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams(prev => ({ ...prev, search: searchTerm, page: 1 }))
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Update sorting
  useEffect(() => {
    if (sorting.length > 0) {
      setQueryParams(prev => ({
        ...prev,
        sortBy: sorting[0].id === "name" ? "ten_loaitin" : 
                sorting[0].id === "postCount" ? "tin_count" : sorting[0].id,
        sortOrder: sorting[0].desc ? 'desc' : 'asc',
        page: 1,
      }))
    }
  }, [sorting])

  const { data, isLoading } = usePaginatedLoaiTin(queryParams)
  
  const categories = data?.data || []
  const pagination = data?.meta || {
    currentPage: 1,
    perPage: 5,
    totalItems: 0,
    lastPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const toggleVisibility = (category: LoaiTinType) => {
    const newStatus = !category.trangthai;
    
    updateStatusMutation.mutate(
      { id: category.id_loaitin, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            `Loại tin "${category.ten_loaitin}" đã được ${newStatus ? 'hiện' : 'ẩn'}.`,
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
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      updateLoaiTinStatus(id, { trangthai: status }),
    onSuccess: () => {
      setIsRefetching(true);
      queryClient.invalidateQueries({ queryKey: ['paginated-loai-tin'] })
        .then(() => {
          setTimeout(() => {
            setIsRefetching(false);
          }, 800);
        });
    },
    onError: (error) => {
      console.error('Error updating category status:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại sau.');
    }
  });

  const columns: ColumnDef<LoaiTinType>[] = [
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
      accessorKey: "ten_loaitin",
      id: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.original.ten_loaitin}</div>,
    },
    {
      id: "postCount",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tin tức
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const tinCount = row.original.tin?.length || 0
        return <div className="max-w-[80px] text-center">{tinCount}</div>
      },
    },
    {
      id: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const category = row.original;
        const isHidden = !category.trangthai;
        const isPending = updateStatusMutation.isPending && 
                         updateStatusMutation.variables?.id === category.id_loaitin;
        
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleVisibility(category)}
            disabled={isPending}
            className={isHidden ? "text-muted-foreground" : "text-primary"}
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
      id: "actions",
      cell: ({ row }) => {
        const category = row.original

        return (
          <Dialog open={open && categoryToDelete?.id_loaitin === category.id_loaitin} onOpenChange={setOpen}>
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
                  <Link href={`/dashboard/categories/${category.id_loaitin}`}>Sửa</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setCategoryToDelete(category)
                    setOpen(true)
                  }}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  Xoá
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn xóa loại tin &quot;{category.ten_loaitin}&quot;? Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  className='cursor-pointer' 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  disabled={deleteMutation.isPending}
                >
                  Hủy
                </Button>
                <Button 
                  className='cursor-pointer' 
                  variant="destructive" 
                  onClick={() => handleDeleteCategory(category)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {deleteMutation.isPending ? 'Đang xoá...' : 'Xoá'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      },
    },
  ]

  const table = useReactTable<LoaiTinType>({
    data: categories,
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
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm loại tin tức..."
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
                    Bạn có chắc chắn muốn xóa {Object.keys(rowSelection).length} loại tin đã chọn? Hành động này không thể
                    hoàn tác.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setBulkDeleteOpen(false)}
                    disabled={bulkDeleteMutation.isPending}
                  >
                    Hủy
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleBulkDelete}
                    disabled={bulkDeleteMutation.isPending}
                  >
                    {bulkDeleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {bulkDeleteMutation.isPending ? 'Đang xoá...' : 'Xoá'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        {/* Add refetching indicator */}
        {isRefetching && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang cập nhật dữ liệu...
          </div>
        )}
      </div>
      
      <div className="rounded-md border relative">
        {/* Add overlay when refetching */}
        {isRefetching && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Đang cập nhật dữ liệu...</p>
            </div>
          </div>
        )}
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
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
                        cellIndex === 2 ? "h-4 w-[80px]" : 
                        cellIndex === 3 ? "h-8 w-[80px]" : "h-8 w-8"
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
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
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
            (Tổng {pagination.totalItems} loại tin)
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
      </div>
    </div>
  )
}

