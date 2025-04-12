'use client';
import { FileText, Eye, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import { getTinSummary } from "@/lib/api";
import { formatNumberWithCommas } from "@/lib/utils";

export function DashboardStats() {
  const { data } = useQuery({
    queryKey: ['tin-summay'],
    queryFn: getTinSummary,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
  const summary = data?.data;
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng số tin tức</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumberWithCommas(summary?.total_posts || 0)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumberWithCommas(summary?.total_views ||0)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lượt bình luận</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumberWithCommas(summary?.total_comments || 0)}</div>
        </CardContent>
      </Card>
    </>
  )
}

