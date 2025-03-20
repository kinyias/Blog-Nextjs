import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex min-h-screen flex-col">
           <Header />
           {children}
           <Footer />
         </div>
  )
}