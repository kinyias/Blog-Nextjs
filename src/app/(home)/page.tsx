
import { Sidebar } from "@/components/home/SideBar";
import { PostGrid } from "@/components/posts/PostGrid";
import { FeaturedPost } from "@/components/posts/FeaturePost";

export default function Home() {
  return (
      <main className="flex-1">
        <FeaturedPost />
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
            <div className="col-span-1 lg:col-span-2 xl:col-span-3">
              <PostGrid />
            </div>
            <div className="col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
  );
}
