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
import { ArrowUpDown, Eye, EyeOff, MoreHorizontal } from "lucide-react"
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
import { NhomTinType, NhomTinQueryParams, updateNhomTin } from "@/lib/api"
import { usePaginatedNhomTin } from "@/hooks/usePagination"

export function GroupsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [hiddenGroups, setHiddenGroups] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [queryParams, setQueryParams] = useState<NhomTinQueryParams>({
    page: 1,
    limit: 5,
    sortBy: 'ten_nhomtin',
    sortOrder: 'asc',
  })

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
      console.log({
   
        sortBy: sorting[0].id === "name" ? "ten_nhomtin" : 
                sorting[0].id === "postCount" ? "loaitin_count" : sorting[0].id,
        sortOrder: sorting[0].desc ? 'desc' : 'asc',
        page: 1,
      })
      setQueryParams(prev => ({
        ...prev,
        sortBy: sorting[0].id === "name" ? "ten_nhomtin" : 
                sorting[0].id === "postCount" ? "loaitin_count" : sorting[0].id,
        sortOrder: sorting[0].desc ? 'desc' : 'asc',
        page: 1,
      }))
    }
  }, [sorting])

  const { data, isLoading, refetch } = usePaginatedNhomTin(queryParams)
  
  const groups = data?.data || []
  const pagination = data?.meta || {
    currentPage: 1,
    perPage: 5,
    totalItems: 0,
    lastPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const toggleVisibility = async (id: number) => {
    try {
      // Find the group to toggle
      const group = groups.find((g) => g.id_nhomtin === id)
      if (!group) return

      // Toggle visibility in UI
      setHiddenGroups((prev) =>
        prev.includes(id) ? prev.filter((groupId) => groupId !== id) : [...prev, id]
      )

      // Update the visibility in the database
      const newStatus = hiddenGroups.includes(id) ? "active" : "hidden"
      await updateNhomTin(id, { trangthai: newStatus })
      
      // Show success message
      toast.success(`Nhóm tin tức "${group.ten_nhomtin}" đã được ${
        hiddenGroups.includes(id) ? "hiện" : "ẩn"
      }`, {
        style: {
          backgroundColor: "#16a34a",
          color: "#ffffff",
        }
      })
      
      // Refetch data
      refetch()
    } catch (error) {
      console.error("Error toggling group visibility:", error)
      toast.error("Không thể thay đổi trạng thái nhóm tin tức")
    }
  }

  const columns: ColumnDef<NhomTinType>[] = [
    {
      accessorKey: "ten_nhomtin",
      id: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.original.ten_nhomtin}</div>,
    },
    {
      id: "postCount",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
           Số loại tin
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const loaiTinCount = row.original.loai_tin?.length || 0
        return <div className="max-w-[80px] text-center">{loaiTinCount}</div>
      },
    },
    {
      id: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const group = row.original
        const isHidden = group.trangthai === "hidden" || hiddenGroups.includes(group.id_nhomtin)

        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleVisibility(group.id_nhomtin)}
            className={isHidden ? "text-muted-foreground" : "text-primary"}
          >
            {isHidden ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {isHidden ? "Ẩn" : "Hiện"}
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const group = row.original

        return (
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
                <Link href={`/dashboard/groups/${group.id_nhomtin}/edit`}>Sửa</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast.success(
                    `Nhóm tin tức "${group.ten_nhomtin}" đã được xoá thành công.`
                  )
                }}
                className="text-destructive focus:text-destructive"
              >
                Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable<NhomTinType>({
    data: groups,
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
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: pagination.currentPage - 1,
        pageSize: pagination.perPage,
      },
    },
  })

  return (
    <div className="space-y-4">
      <Input
        placeholder="Tìm nhóm tin tức..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
            (Tổng {pagination.totalItems} nhóm tin)
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

