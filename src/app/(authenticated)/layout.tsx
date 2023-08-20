import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  const { userId } = auth();

  if (!userId) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />

      <div className="flex-1">
        <div className="container flex-1 items-start lg:grid md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 lg:pl-0">
          <Suspense>
            <Sidebar />
          </Suspense>
          <main className="py-6 space-y-4 sm:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default layout;
