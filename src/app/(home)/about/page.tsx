import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for team members
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder & Lead Editor",
    bio: "Sarah has over 10 years of experience in web development and technical writing. She founded CodeBlog to share practical insights with the developer community.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Senior Developer & Writer",
    bio: "Alex specializes in React and modern JavaScript frameworks. He loves exploring new technologies and sharing his findings through detailed tutorials.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "TypeScript Expert",
    bio: "Maria is passionate about type safety and scalable architecture. She contributes articles on TypeScript, design patterns, and best practices.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "David Kim",
    role: "UI/UX Specialist",
    bio: "David bridges the gap between design and development. His articles focus on CSS, design systems, and creating beautiful user experiences.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 5,
    name: "David Kim",
    role: "UI/UX Specialist",
    bio: "David bridges the gap between design and development. His articles focus on CSS, design systems, and creating beautiful user experiences.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
]


export default function AboutPage() {
  return (
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-muted/40 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Về CodeBlog</h1>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
                CodeBlog là đồ án thực tập tốt nghiệp của nhóm 17 khoa CNTT Trường Đại học Công Nghệ Sài Gòn.
            </p>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">Mô tả nghiệp vụ</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                Việc chuyển tải các tin tức quan trọng tới độc giả một cách nhanh nhất và nhận phản hồi tích cực dễ dàng từ độc giả đọc báo là một việc làm cần thiết trong thời đại công nghệ thông tin phát triển như hiện nay.
                </p>
                <p>
                Hiện nay, hệ thống mạng internet nói riêng và công nghệ thông tin nói chung đang phát triển mạnh mẽ. Các điện thoại thông minh có khả năng truy cập internet ngày càng trở nên gần gũi với mọi người. Do vậy cần tìm cách đưa thông tin tới độc giả một cách nhanh chóng và tiện lợi nhất thay các phương pháp truyền thống.
                </p>
                <p>
                Xây dựng website tin tức là giải pháp tốt để đạt được các mục tiêu trên. Độc giả có thể vào xem các thông tin mới theo các chuyên mục, phản hồi ý kiến của mình ngay khi xem hoặc có thể tìm kiếm các nội dung cũ theo nhiều tiêu chí: nội dung, loại danh mục, ngày đăng, tác giả,… 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">Thành viên</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {TEAM_MEMBERS.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-1 font-bold">{member.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{member.role}</p>
                    <p className="mb-4 text-sm">{member.bio}</p>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">Các chức năng chính</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">Quality</h3>
                <p className="text-card-foreground">
                  We prioritize depth and accuracy in our content. Every article undergoes thorough research and review
                  to ensure it provides genuine value.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">Practicality</h3>
                <p className="text-card-foreground">
                  We focus on real-world applications and practical solutions that developers can immediately implement
                  in their projects.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">Community</h3>
                <p className="text-card-foreground">
                  We believe in fostering a supportive community where developers can learn from each other and grow
                  together.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">Innovation</h3>
                <p className="text-card-foreground">
                  We stay at the forefront of technological advancements, exploring new tools and methodologies to keep
                  our readers ahead of the curve.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">Inclusivity</h3>
                <p className="text-card-foreground">
                  We create content for developers at all levels, ensuring that our articles are accessible regardless
                  of experience or background.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">Continuous Learning</h3>
                <p className="text-card-foreground">
                  We embrace a mindset of continuous improvement, constantly refining our content and expanding our
                  knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Join Our Community</h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter to receive the latest articles, tutorials, and updates directly in your
                inbox.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

