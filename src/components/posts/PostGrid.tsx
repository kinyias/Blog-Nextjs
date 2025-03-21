'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PostCard } from './PostCard';

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Nhiều tỉnh, thành đề xuất thi tốt nghiệp THPT sớm ba tuần',
    excerpt:
      'Hà Nội, TP HCM, Nghệ An và Ninh Bình đề xuất thi tốt nghiệp THPT 2025 vào đầu tháng 6, sớm ba tuần so với kế hoạch của Bộ do cả nước đang sắp xếp, sáp nhập tỉnh, thành.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'Tuyển sinh',
    image: 'https://i1-vnexpress.vnecdn.net/2025/03/17/233a7831-1742225518-1742225528-1262-5018-1742225666.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=oPv0by699PoIlJNDpK2mlQ',
    slug: 'understanding-react-server-components',
  },
  {
    id: 2,
    title: 'Nữ sinh thành thủ khoa thi đánh giá năng lực sau hơn một tháng ôn luyện',
    excerpt:
      'Nguyễn Phương Thảo đạt 126/150 điểm thi đánh giá năng lực Đại học Quốc gia Hà Nội nhờ nền tảng tốt, tập trung ôn luyện trong hơn một tháng trước kỳ thi.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'Chân dung',
    image: 'https://i1-vnexpress.vnecdn.net/2025/03/17/cc549938ea995bc70288-174218868-8512-4541-1742189388.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=tF0i6PJqWQFvMRBmdp48cg',
    slug: 'mastering-typescript-generics',
  },
  {
    id: 3,
    title: 'Hàng loạt sinh viên rút đơn xin visa du học Australia',
    excerpt:
      'Trang tin của tổ chức xếp hạng THE tuần trước dẫn báo cáo từ Andrew Norton, chuyên gia chính sách tại Đại học Monash, Australia, về tình trạng rút đơn xin thị thực của sinh viên quốc tế. Theo Norton, dữ liệu do Bộ Nội vụ Australia cung cấp, sau đề nghị của ông.',
    author: 'David Kim',
    date: '28 thg 5, 2023',
    category: 'Du học',
    image: 'https://i1-vnexpress.vnecdn.net/2025/03/16/480775191-1045845160911812-597-4776-1676-1742091243.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=yaibB_9wpsm26k88aneZaA',
    slug: 'building-design-system-tailwind',
  },
  {
    id: 4,
    title: 'Học sinh lo âu trước thay đổi xét tuyển đại học',
    excerpt:
      'Khoảng 20.000 học sinh, phụ huynh đổ về Hà Nội nghe tư vấn tuyển sinh đại học, không ít nói lo lắng vì chưa rõ phương án của các trường, sau dự kiến thay đổi của Bộ Giáo dục.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'Tuyển sinh',
    image: 'https://i1-vnexpress.vnecdn.net/2025/03/16/Tu-van-TS-1742089891-7895-1742094674.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=AtS3Bck7H8LVni5eOKyiAg',
    slug: 'state-management-2023',
  },
  {
    id: 5,
    title: 'Yêu cầu học sinh giỏi mới được học bán dẫn sẽ gây thiếu nhân lực',
    excerpt:
      'Nếu yêu cầu học sinh đạt 8/10 điểm Toán, Lý, Hóa trở lên mới được học ngành bán dẫn sẽ gây thiếu nhân lực, thay vào đó nên mở đầu vào, thắt đầu ra, theo TS Lê Trường Tùng.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'Tuyển sinh',
    image: 'https://i1-vnexpress.vnecdn.net/2025/03/15/LeTruongTung-8-1742028397-6243-1742028621.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=W2qXnYtspeB2prmeL_iHmw',
    slug: 'optimizing-nextjs-applications',
  },
  {
    id: 6,
    title: 'Bác sĩ robot và trợ lý AI thay máu y tế Trung Quốc',
    excerpt:
      'Từ Thượng Hải, bác sĩ phẫu thuật Youness Ahallal điều khiển cánh tay robot ở Maroc, cách Trung Quốc 12.000 km, để phẫu thuật cắt bỏ khối u cho bệnh nhân.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'AI',
    image: 'https://i1-suckhoe.vnecdn.net/2025/03/20/719d709a-1352-4fd3-b6c6-1e8c47-8072-7557-1742456456.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=57IixFk1a2_SLnd1DkTvyg',
    slug: 'building-full-stack-app-trpc',
  },
  {
    id: 7,
    title: 'Bác sĩ robot và trợ lý AI thay máu y tế Trung Quốc',
    excerpt:
      'Từ Thượng Hải, bác sĩ phẫu thuật Youness Ahallal điều khiển cánh tay robot ở Maroc, cách Trung Quốc 12.000 km, để phẫu thuật cắt bỏ khối u cho bệnh nhân.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'AI',
    image: 'https://i1-suckhoe.vnecdn.net/2025/03/20/719d709a-1352-4fd3-b6c6-1e8c47-8072-7557-1742456456.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=57IixFk1a2_SLnd1DkTvyg',
    slug: 'building-full-stack-app-trpc',
  },
  {
    id: 8,
    title: 'Bác sĩ robot và trợ lý AI thay máu y tế Trung Quốc',
    excerpt:
      'Từ Thượng Hải, bác sĩ phẫu thuật Youness Ahallal điều khiển cánh tay robot ở Maroc, cách Trung Quốc 12.000 km, để phẫu thuật cắt bỏ khối u cho bệnh nhân.',
    author: 'Admin',
    date: '28 thg 5, 2023',
    category: 'AI',
    image: 'https://i1-suckhoe.vnecdn.net/2025/03/20/719d709a-1352-4fd3-b6c6-1e8c47-8072-7557-1742456456.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=57IixFk1a2_SLnd1DkTvyg',
    slug: 'building-full-stack-app-trpc',
  },
];

export function PostGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(BLOG_POSTS.length / postsPerPage);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const visiblePosts = BLOG_POSTS.slice(0, page * postsPerPage);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Tin tức mới nhất</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tin tức mới nhất</h2>
      </div>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {visiblePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
      {page < totalPages && (
        <div className="flex justify-center pt-8">
          <Button size="lg" className="px-8" onClick={()=> handleLoadMore()}>
            Tải thêm
          </Button>
        </div>
      )}
    </div>
  );
}
