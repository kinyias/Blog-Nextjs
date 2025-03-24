import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentPosts = [
  {
    id: "1",
    title: "Nhiều tỉnh, thành đề xuất thi tốt nghiệp THPT sớm ba tuần",
    excerpt: "Hà Nội, TP HCM, Nghệ An và Ninh Bình đề xuất thi tốt nghiệp THPT 2025 vào đầu tháng 6, sớm ba tuần so với kế hoạch của Bộ do cả nước đang sắp xếp, sáp nhập tỉnh, thành.",
    author: "Admin",
    date: "2023-10-15",
    status: true,
    category: "Development",
    tags: ["Tuyển sinh"],
  },
  {
    id: "2",
    title: "Hàng loạt sinh viên rút đơn xin visa du học Australia ",
    excerpt: "Trang tin của tổ chức xếp hạng THE tuần trước dẫn báo cáo từ Andrew Norton, chuyên gia chính sách tại Đại học Monash, Australia, về tình trạng rút đơn xin thị thực của sinh viên quốc tế. Theo Norton, dữ liệu do Bộ Nội vụ Australia cung cấp, sau đề nghị của ông.",
    author: "Admin",
    date: "2023-10-12",
    status: true,
    category: "Design",
    tags: ["Tuyển sinh"],
  },
  {
    id: "3",
    title: "Học sinh chuyên Bắc Ninh tiếp tục dẫn đầu kỳ thi của Bách khoa Hà Nội ",
    excerpt: "Khoảng 20.000 học sinh, phụ huynh đổ về Hà Nội nghe tư vấn tuyển sinh đại học, không ít nói lo lắng vì chưa rõ phương án của các trường, sau dự kiến thay đổi của Bộ Giáo dục.",
    author: "Admin",
    date: "2023-10-08",
    status: false,
    category: "Development",
    tags: ["Tuyển sinh"],
  },
]

export function RecentPosts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recentPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
              <Badge variant={post.status ? "default" : "secondary"}>{post.status? 'Hiện' : 'Ẩn'}</Badge>
            </div>
            <CardDescription>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/posts/${post.id}`}>Xem</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/posts/${post.id}/edit`}>Sửa</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

