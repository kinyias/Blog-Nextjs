import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GroupsTable } from "@/components/dashboard/GroupTable"

export default function GroupsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nhóm tin tức</h1>
        <Button variant={'success'} asChild>
          <Link href="/dashboard/groups/new">Thêm Nhóm tin mới</Link>
        </Button>
      </div>
      <GroupsTable />
    </div>
  )
}

