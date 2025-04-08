
import { Sidebar } from '@/components/home/SideBar';
import { Suspense } from 'react';
import { SearchResults } from '@/components/home/SearchResults';

export default function SearchPage() {

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          <div className="col-span-1">
          <Suspense fallback={<div>Loading sidebar...</div>}>
              <Sidebar />
            </Suspense>
          </div>
          <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <Suspense fallback={<div>Loading sidebar...</div>}>
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
