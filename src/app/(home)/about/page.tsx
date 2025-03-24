import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for team members
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Thái Tín Khang',
    role: 'Front End',
    bio: 'Code front-end UI/UX',
    image: '/placeholder.svg?height=400&width=400',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 2,
    name: 'Hồ Đăng Khoa',
    role: 'Thiết kế figma',
    bio: 'Thiết kế giao diện figma',
    image: '/placeholder.svg?height=400&width=400',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 3,
    name: 'Phạm Hữu Chí',
    role: 'Database',
    bio: 'Cài đặt database',
    image: '/placeholder.svg?height=400&width=400',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 4,
    name: 'Nguyễn Quốc Yên',
    role: 'Back End',
    bio: 'Code back-end restful API',
    image: '/placeholder.svg?height=400&width=400',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 5,
    name: 'Phạm Hồng Phong',
    role: 'Kiểm thử',
    bio: 'Báo cáo kiếm thử và viết mô tả cho api',
    image: '/placeholder.svg?height=400&width=400',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero section */}
      <section className="bg-muted/40 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Về nhóm 17
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
            Nhóm 17 là đồ án thực tập tốt nghiệp của nhóm 17 khoa CNTT Trường
            Đại học Công Nghệ Sài Gòn.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Mô tả nghiệp vụ
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Việc chuyển tải các tin tức quan trọng tới độc giả một cách
                nhanh nhất và nhận phản hồi tích cực dễ dàng từ độc giả đọc báo
                là một việc làm cần thiết trong thời đại công nghệ thông tin
                phát triển như hiện nay.
              </p>
              <p>
                Hiện nay, hệ thống mạng internet nói riêng và công nghệ thông
                tin nói chung đang phát triển mạnh mẽ. Các điện thoại thông minh
                có khả năng truy cập internet ngày càng trở nên gần gũi với mọi
                người. Do vậy cần tìm cách đưa thông tin tới độc giả một cách
                nhanh chóng và tiện lợi nhất thay các phương pháp truyền thống.
              </p>
              <p>
                Xây dựng website tin tức là giải pháp tốt để đạt được các mục
                tiêu trên. Độc giả có thể vào xem các thông tin mới theo các
                chuyên mục, phản hồi ý kiến của mình ngay khi xem hoặc có thể
                tìm kiếm các nội dung cũ theo nhiều tiêu chí: nội dung, loại
                danh mục, ngày đăng, tác giả,…
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Thành viên
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 font-bold">{member.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mb-4 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Các chức năng chính
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold">Quản lý nhóm tin</h3>
              <p className="text-card-foreground">
                Cho phép tạo, chỉnh sửa và xóa nhóm tin, giúp phân loại các tin
                tức theo danh mục cụ thể.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold">Quản lý loại tin</h3>
              <p className="text-card-foreground">
                Hỗ trợ quản lý các loại tin tức thuộc từng nhóm tin, giúp tổ
                chức nội dung hiệu quả hơn.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold">Quản lý tin tức</h3>
              <p className="text-card-foreground">
                Chức năng tạo, chỉnh sửa, xuất bản và xóa tin tức, đảm bảo nội
                dung luôn được cập nhật.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold">Quản lý bình luận</h3>
              <p className="text-card-foreground">
                Kiểm soát các bình luận của người dùng, bao gồm duyệt, xóa hoặc
                ẩn bình luận không phù hợp.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold">Tìm kiếm & Lọc tin</h3>
              <p className="text-card-foreground">
                Cho phép người dùng tìm kiếm và lọc tin tức theo nhóm tin, loại
                tin hoặc từ khóa cụ thể.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
