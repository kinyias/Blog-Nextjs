'use client';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/posts/PostCard';

// Mock data for categories
const CATEGORIES = [
  {
    id: 'chandung',
    name: 'Chân dung',
    description: 'Modern UI development with React',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'The React framework for production',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Strongly typed JavaScript',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Core web programming language',
  },
  { id: 'css', name: 'CSS', description: 'Styling and layout for the web' },
  {
    id: 'tailwind',
    name: 'Tailwind',
    description: 'Utility-first CSS framework',
  },
];

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: 1,
    views: 5,
    title: 'Nhiều tỉnh, thành đề xuất thi tốt nghiệp THPT sớm ba tuần',
    excerpt:
      'Hà Nội, TP HCM, Nghệ An và Ninh Bình đề xuất thi tốt nghiệp THPT 2025 vào đầu tháng 6, sớm ba tuần so với kế hoạch của Bộ do cả nước đang sắp xếp, sáp nhập tỉnh, thành.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    tags: ['React', 'Server Components', 'Next.js'],
    image:
      'https://i1-vnexpress.vnecdn.net/2025/03/17/233a7831-1742225518-1742225528-1262-5018-1742225666.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=oPv0by699PoIlJNDpK2mlQ',
    slug: 'understanding-react-server-components',
    category: 'chandung',
  },
  {
    id: 2,
    views: 5,
    title:
      'Nữ sinh thành thủ khoa thi đánh giá năng lực sau hơn một tháng ôn luyện',
    excerpt:
      'Nguyễn Phương Thảo đạt 126/150 điểm thi đánh giá năng lực Đại học Quốc gia Hà Nội nhờ nền tảng tốt, tập trung ôn luyện trong hơn một tháng trước kỳ thi.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    tags: ['React', 'Hooks', 'Authentication'],
    image:
      'https://i1-vnexpress.vnecdn.net/2025/03/17/cc549938ea995bc70288-174218868-8512-4541-1742189388.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=tF0i6PJqWQFvMRBmdp48cg',
    slug: 'custom-react-hook-authentication',
    category: 'chandung',
  },
  {
    id: 3,
    views: 5,
    title: 'Hàng loạt sinh viên rút đơn xin visa du học Australia',
    excerpt:
      'Trang tin của tổ chức xếp hạng THE tuần trước dẫn báo cáo từ Andrew Norton, chuyên gia chính sách tại Đại học Monash, Australia, về tình trạng rút đơn xin thị thực của sinh viên quốc tế. Theo Norton, dữ liệu do Bộ Nội vụ Australia cung cấp, sau đề nghị của ông.',
    author: 'David Kim',
    date: '28 thg 5, 2023',
    tags: ['React', 'Performance', 'Optimization'],
    image:
      'https://i1-vnexpress.vnecdn.net/2025/03/16/480775191-1045845160911812-597-4776-1676-1742091243.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=yaibB_9wpsm26k88aneZaA',
    slug: 'react-performance-optimization',
    category: 'chandung',
  },
  
];

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = CATEGORIES.find((cat) => cat.id === params.category);
  if (!category) {
    notFound();
  }

  const posts = BLOG_POSTS.filter((post) => post.category === params.category);

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-foreground">
            Loại tin tức
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Chân dung</span>
        </nav>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Chân dung
            </h1>
            <Badge variant="secondary">{posts.length} bài viết</Badge>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h2 className="mb-2 text-xl font-medium">
              Không tìm thấy bài viết
            </h2>
            <p className="text-muted-foreground">
              Không tìm thấy bài viết nào vui lòng quay lại sau
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
