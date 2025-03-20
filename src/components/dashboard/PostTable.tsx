"use client"

import { useState } from "react"
import Link from "next/link"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, EyeOff, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { toast } from "sonner"

// Sample data
const data = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    author: "Admin",
    date: "2023-10-15",
    status: "published",
    category: "Development",
  },
  {
    id: "2",
    title: "Introduction to Tailwind CSS",
    excerpt: "A comprehensive guide to using Tailwind CSS in your projects",
    author: "Admin",
    date: "2023-10-12",
    status: "published",
    category: "Design",
  },
  {
    id: "3",
    title: "Building a CMS with Next.js",
    excerpt: "Step-by-step guide to creating your own content management system",
    author: "Admin",
    date: "2023-10-08",
    status: "draft",
    category: "Development",
  },
  {
    id: "4",
    title: "Advanced React Patterns",
    excerpt: "Explore advanced patterns and techniques in React development",
    author: "Admin",
    date: "2023-10-05",
    status: "published",
    category: "Development",
  },
  {
    id: "5",
    title: "SEO Best Practices for Blogs",
    excerpt: "Learn how to optimize your blog for search engines",
    author: "Admin",
    date: "2023-10-01",
    status: "published",
    category: "Marketing",
  },
]

export function PostsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
   const [hiddenPosts, setHiddenPosts] = useState<string[]>([])
  
    const toggleVisibility = (id: string) => {
      setHiddenPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]))
  
      const post = data.find((cat) => cat.id === id)
      toast.success(`Tin tức "${post?.title}" đã được ${hiddenPosts.includes(id) ? "hiện" : "ẩn"}`,  {
          style: {
            backgroundColor: "#16a34a", // Màu nền
            color: "#ffffff", // Màu chữ
          }})
    }
  const columns: ColumnDef<(typeof data)[0]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tiêu đề
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "category",
        header: "Loại tin tức",
    },
    {
      accessorKey: "author",
      header: "Tác giả",
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Ngày đăng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
        return (
            <div>
            {new Date(row.getValue("date")).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const post = row.original
          const isHidden = hiddenPosts.includes(post.id)
        return   <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleVisibility(post.id)}
        className={isHidden ? "text-muted-foreground" : "text-primary"}
      >
        {isHidden ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
        {isHidden ? "Ẩn" : "Hiện"}
      </Button>
        
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const post = row.original

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
                <Link href={`/dashboard/posts/${post.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/posts/${post.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast(
                  "The post has been deleted successfully."
                  )
                }}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter posts..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        {Object.keys(rowSelection).length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              toast(`${Object.keys(rowSelection).length} posts have been deleted.`)
              setRowSelection({})
            }}
          >
            Xoá
          </Button>
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
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

