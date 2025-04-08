'use client';

import { useState, useEffect, use } from 'react';
import { getNhomTinById } from "@/lib/api";
import { GroupForm } from "@/components/dashboard/GroupForm";
import { Skeleton } from "@/components/ui/skeleton";
import { NhomTinType } from '@/lib/api';

interface GroupPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GroupPage({ params }: GroupPageProps) {
  const { id } = use(params);
  const groupId = id;
  const isNewGroup = groupId === "new";
  
  const [group, setGroup] = useState<NhomTinType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(!isNewGroup);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch group data using Axios directly
  useEffect(() => {
    if (isNewGroup) return;
    
    const fetchGroup = async () => {
      try {
        setIsLoading(true);
        const data = await getNhomTinById(Number(groupId));
        setGroup(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching group:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch group'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGroup();
  }, [groupId, isNewGroup]);

  if (!isNewGroup && isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="space-y-4 mt-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!isNewGroup && error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Lỗi</h1>
          <p className="text-destructive">
            Không thể tải thông tin nhóm tin. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {isNewGroup ? "Tạo nhóm tin mới" : "Chỉnh sửa nhóm tin"}
        </h1>
        <p className="text-muted-foreground">
          {isNewGroup ? "Tạo nhóm tin mới cho website." : "Chỉnh sửa thông tin nhóm tin."}
        </p>
      </div>
      <GroupForm nhomTin={!isNewGroup ? group : undefined} />
    </div>
  );
}

