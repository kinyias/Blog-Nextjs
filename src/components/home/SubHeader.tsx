import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const postsGroups = [
  {
    id: 1,
    name: "Thời sự",
    categories: [
      { id: 101, name: "Chính trị" },
      { id: 102, name: "Nhân sinh" },
      { id: 103, name: "Kỹ nguyên mới" },
      { id: 104, name: "Việc làm" },
    ],
  },
  {
    id: 2,
    name: "Thế giới",
    categories: [
      { id: 201, name: "Tư liệu" },
      { id: 202, name: "Phân tích" },
      { id: 203, name: "Người Việt 5 châu" },
    ],
  },
  {
    id: 3,
    name: "Kinh doanh",
    categories: [
      { id: 301, name: "Quốc tế" },
      { id: 302, name: "Doanh nghiệp" },
      { id: 303, name: "Chứng khoán" },
    ],
  },
  {
    id: 4,
    name: "Công nghệ",
    categories: [
      { id: 401, name: "AI" },
      { id: 402, name: "Chuyển đổi số" },
      { id: 403, name: "Thiết bị" },
    ],
  },
  {
    id: 5,
    name: "Khoa học",
    categories: [
      { id: 501, name: "Đổi mới" },
      { id: 502, name: "Sáng tạo" },
      { id: 503, name: "Nhân vật" },
    ],
  },
  {
    id: 6,
    name: "Giải trí",
    categories: [
      { id: 601, name: "Sách" },
      { id: 602, name: "Video" },
      { id: 603, name: "Phim" },
    ],
  },
]
export default function SubHeader() {
    const [activeMenu, setActiveMenu] = React.useState<number | null>(null)

    return (
      <nav className="relative py-1">
        <ul className="flex flex-wrap">
          {postsGroups.map((group) => (
            <li key={group.id} className="relative" >
              <button
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none",
                  activeMenu === group.id && "bg-accent/50",
                )}
                onClick={() => setActiveMenu(activeMenu === group.id ? null : group.id)}
                onMouseEnter={() => setActiveMenu(group.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className='absolute left-0 top-5 z-50 mt-1 w-[220px] h-full'></div>
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary relative group">
                {group.name}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
               
              </button>
  
              {activeMenu === group.id && (
                <div
                  className="absolute left-0 top-full z-50 mt-1 w-[220px] rounded-md border bg-popover p-2 shadow-md"
                  onMouseEnter={() => setActiveMenu(group.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <ul>
                    {group.categories.map((category) => (
                      <li key={category.id} className="px-2 py-1">
                        <Link
                          href={`/categories/${group.name.toLowerCase()}/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block rounded-md p-2 text-sm leading-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
}
