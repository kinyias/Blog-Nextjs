"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Code, Menu, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "../theme-toggle"
import SubHeader from "./SubHeader"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll detection for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center transition-all duration-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex flex-col w-full items-center justify-between">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex items-center mt-2 mb-6">
                  <Code className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-bold text-xl">Nhóm 17</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-primary hover:translate-x-1 transition-transform"
                  >
                    Trang chủ
                  </Link>
                  <Link
                    href="/categories"
                    className="text-sm font-medium transition-colors hover:text-primary hover:translate-x-1 transition-transform"
                  >
                    Loại tin tức
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium transition-colors hover:text-primary hover:translate-x-1 transition-transform"
                  >
                    Về chúng tôi
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md transition-transform group-hover:scale-110">
                <Code className="h-5 w-5" />
              </div>
              <span className="inline-block font-bold text-lg tracking-tight">Nhóm 17</span>
            </Link>
            <nav className="hidden md:flex md:items-center md:gap-8 ml-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary relative group">
                Trang chủ
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Loại tin tức
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary relative group">
                Về chúng tôi
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <Input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="h-9 w-[200px] md:w-[300px] lg:w-[400px] pr-9 border-primary/50 focus-visible:ring-primary/30"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 hover:bg-transparent"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close search</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-primary/10 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Tìm kiếm</span>
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
        <div className="container border-t border-border/40 w-full">
          <SubHeader />
        </div>
      </div>
    </header>
  )
}

