import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Eye } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  views: number;
}

interface BlogCardProps {
  post: BlogPost;
}

export function PostCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4 pb-0">
        <div className="space-y-2">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            <h3 className="font-bold leading-tight">{post.title}</h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 p-0 pt-5">
        <Badge key={post.category} variant="secondary">
          {post.category}
        </Badge>
        </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground pt-5">
            <Eye className="h-4 w-4" />
            <span>{(post.views || 0).toLocaleString()} lượt xem</span>
          </div>
      </CardContent>
      {/* <CardFooter className="flex flex-wrap gap-2 p-4 pt-0 justify-items-end w-full">
      </CardFooter> */}
    </Card>
  );
}
