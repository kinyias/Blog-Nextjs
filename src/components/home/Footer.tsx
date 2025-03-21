import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Nhóm 17</h3>
            <p className="text-sm text-muted-foreground">
              Website tin tức giao diện hiện đại, thân thiện với người dùng. Website đồ án thực tập tốt nghiệp của nhóm 17 khoa CNTT Trường Đại học Công Nghệ Sài Gòn
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Điều hướng</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:underline">
                  Loại tin tức
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Thông tin</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:underline cursor-pointer">
                  Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP Hồ Chí Minh
                </span>
              </li>
              <li>
                <span className="hover:underline cursor-pointer">
                  Số điện thoại: 0912345678
                </span>
              </li>
              <li>
                <span className="hover:underline cursor-pointer">
                  Email: 123@gmail.com
                </span>
              </li>

            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Kết nối</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Toàn bộ bản quyền thuộc</p>
        </div>
      </div>
    </footer>
  )
}

