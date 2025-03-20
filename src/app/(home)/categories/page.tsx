import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


// Mock data for categories
const CATEGORIES = [
  { id: "react", name: "React", count: 12, description: "Modern UI development with React" },
  { id: "nextjs", name: "Next.js", count: 8, description: "The React framework for production" },
  { id: "typescript", name: "TypeScript", count: 10, description: "Strongly typed JavaScript" },
  { id: "javascript", name: "JavaScript", count: 15, description: "Core web programming language" },
  { id: "css", name: "CSS", count: 7, description: "Styling and layout for the web" },
  { id: "tailwind", name: "Tailwind", count: 5, description: "Utility-first CSS framework" },
  { id: "api", name: "API Development", count: 4, description: "Building and consuming APIs" },
  { id: "performance", name: "Performance", count: 3, description: "Optimizing web applications" },
  { id: "seo", name: "SEO", count: 2, description: "Search engine optimization techniques" },
  { id: "accessibility", name: "Accessibility", count: 3, description: "Building inclusive web applications" },
  { id: "testing", name: "Testing", count: 6, description: "Testing frameworks and methodologies" },
  { id: "devops", name: "DevOps", count: 4, description: "Deployment and infrastructure" },
]

export default function CategoriesPage() {
  return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Categories</span>
          </nav>

          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Category</h1>
            <p className="text-muted-foreground">
              Explore our content organized by topics to find exactly what youre looking for.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{category.name}</CardTitle>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="px-0" asChild>
                      <span className="flex items-center gap-1">
                        Browse articles
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
  )
}

