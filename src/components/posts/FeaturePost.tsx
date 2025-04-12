"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useFeatureTin } from "@/hooks/usePagination"
import { formatDate, generateSlug } from "@/lib/utils"

export function FeaturedPost() {
  const { data, isLoading } = useFeatureTin()
  const featuredPost = data?.data[0]
  
  if (isLoading) {
    return (
      <div className="relative w-full bg-muted/40">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="aspect-video h-full w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }
  if (!featuredPost) return null
  
  return (
    <motion.div
      className="relative w-full bg-muted/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
              {featuredPost.loai_tin?.ten_loaitin}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {featuredPost.tieude}
              </h1>
              <p className="text-muted-foreground md:text-xl">
              {featuredPost.mota}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Bởi {featuredPost.tacgia}</span>
              <span>•</span>
              <span>{formatDate(featuredPost.ngaydangtin)}</span>
              <span>•</span>
              <span>{featuredPost.solanxem.toLocaleString()} lượt xem</span>
            </div>
            <div>
              <Button asChild>
              <Link href={`/posts/${generateSlug(featuredPost.tieude)}-${featuredPost.id_tin}`}>
                  Đọc thêm
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={featuredPost.hinhdaidien || "/placeholder.svg"}
              alt={featuredPost.tieude}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

