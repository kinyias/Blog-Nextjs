'use client';
import React from 'react';
import Link from 'next/link';
import { cn, generateSlug } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getAllNhomTin, getAllLoaiTin } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function SubHeader() {
  const [activeMenu, setActiveMenu] = React.useState<number | null>(null);

  // Fetch nhóm tin data
  const { data: nhomTinList, isLoading: isLoadingNhomTin } = useQuery({
    queryKey: ['nhomTin'],
    queryFn: getAllNhomTin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch loại tin data
  const { data: loaiTinList, isLoading: isLoadingLoaiTin } = useQuery({
    queryKey: ['loaiTin'],
    queryFn: getAllLoaiTin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Group loại tin by nhóm tin
  const groupedCategories = React.useMemo(() => {
    if (!nhomTinList || !loaiTinList) return [];

    return nhomTinList
      .filter(nhomTin => nhomTin.trangthai) // Only show active nhóm tin
      .map(nhomTin => ({
        id: nhomTin.id_nhomtin,
        name: nhomTin.ten_nhomtin,
        categories: loaiTinList
          .filter(loaiTin => loaiTin.id_nhomtin === nhomTin.id_nhomtin && loaiTin.trangthai)
          .map(loaiTin => ({
            id: loaiTin.id_loaitin,
            name: loaiTin.ten_loaitin,
          })),
      }))
      .filter(group => group.categories.length > 0); // Only show groups with categories
  }, [nhomTinList, loaiTinList]);

  if (isLoadingNhomTin || isLoadingLoaiTin) {
    return (
      <nav className="relative py-1">
        <ul className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i}>
              <Skeleton className="h-8 w-24" />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="relative py-1">
      <ul className="flex flex-wrap">
        {groupedCategories.map((group) => (
          <li key={group.id} className="relative">
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
              <Link href={`/groups/${group.id}`} className="text-sm font-medium transition-colors hover:text-primary relative group">
                {group.name}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </button>

            {activeMenu === group.id && group.categories.length > 0 && (
              <div
                className="absolute left-0 top-full z-50 mt-1 w-[220px] rounded-md border bg-popover p-2 shadow-md"
                onMouseEnter={() => setActiveMenu(group.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <ul>
                  {group.categories.map((category) => (
                    <li key={category.id} className="px-2 py-1">
                      <Link
                        href={`/categories/${generateSlug(category.name)}-${category.id}`}
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
  );
}
