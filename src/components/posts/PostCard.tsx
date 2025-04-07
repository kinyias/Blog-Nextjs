import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { TinType } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Eye } from 'lucide-react';

interface PostCardProps {
  post: TinType;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id_tin}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.hinhdaidien || '/placeholder.svg'}
            alt={post.tieude}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {post.tinhot && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              Tin hot
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold line-clamp-2 mb-2 hover:text-blue-500 transition-all duration-200">{post.tieude}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{post.tacgia}</span>
            <span>•</span>
            <span>{format(new Date(post.ngaydangtin), 'dd MMM, yyyy', { locale: vi })}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.mota}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-2 p-0 pt-5">
        <Badge key={post.loai_tin?.id_loaitin} variant="secondary">
          {post.loai_tin?.ten_loaitin}
        </Badge>
        </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground pt-5">
            <Eye className="h-4 w-4" />
            <span>{(post.solanxem || 0).toLocaleString()} lượt xem</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
