import Books from "@/components/dashboard/books";
import { Button } from "@/ui/button";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Buku",
};

const page: FC = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  if (!role || role !== "admin") {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Master Buku</h2>
          <p className="text-gray-500">
            Fitur ini digunakan untuk mengelola buku.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/books/create">
              <PlusIcon className="w-4 h-4 mr-2" />
              Tambah Buku
            </Link>
          </Button>
        </div>
      </div>
      <Suspense>
        <Books />
      </Suspense>
    </>
  );
};

export default page;
