import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { RecentPosts } from "@/components/dashboard/RecentPosts"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardStats />
      </div>
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Tin tức gần đây</TabsTrigger>
          <TabsTrigger value="popular">Tin tức phổ biến</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <RecentPosts />
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tin tức phổ biến</CardTitle>
              <CardDescription>Tin tức nhiều lượt xem nhất 30 ngày gần đây.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Tin tức phổ biến.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

