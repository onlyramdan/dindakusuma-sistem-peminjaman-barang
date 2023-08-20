import BooksLoans from "@/components/dashboard/books-loans";
import AddModal from "@/components/dashboard/books-loans/add-modal";
import { Button } from "@/ui/button";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Peminjaman Buku",
};

const page: FC = async () => {
  const user = await currentUser();
  const isProfileComplete =
    user?.publicMetadata.phoneNumber || user?.publicMetadata.address;
  const role = user?.publicMetadata.role;

  if (!user) {
    return notFound();
  }

  if (!isProfileComplete && role !== "admin") {
    redirect("/dashboard/account/settings");
  }

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Peminjaman Buku</h2>
          <p className="text-gray-500">
            Fitur ini digunakan untuk mengelola peminjaman buku.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AddModal>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Pinjam Buku
            </Button>
          </AddModal>
        </div>
      </div>
      <Suspense>
        <BooksLoans />
      </Suspense>
    </>
  );
};

export default page;
