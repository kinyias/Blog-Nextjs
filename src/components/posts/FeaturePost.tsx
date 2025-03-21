"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedPost() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
                Nổi bật
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Chốt quy chế tuyển sinh đại học 2025
              </h1>
              <p className="text-muted-foreground md:text-xl">
              Các đại học không còn được xét tuyển sớm, phải quy đổi điểm ở mọi phương thức về thang chung theo nguyên tắc do Bộ Giáo dục đưa ra.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Bởi Admin</span>
              <span>•</span>
              <span>12 thg 6, 2024</span>
            </div>
            <div>
              <Button asChild>
                <Link href="/blog/building-scalable-apis">Đọc thêm</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="https://i1-vnexpress.vnecdn.net/2025/02/26/z5577640597163-977ca2342d673db-3531-5615-1740555638.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=HtkOfyaJu-NBicrYABpzlw"
              alt="Building Scalable APIs with Next.js"
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

