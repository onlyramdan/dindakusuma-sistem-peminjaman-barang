import BooksData from "@/components/dashboard/books-data";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Data Buku",
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
          <h2 className="text-3xl font-bold tracking-tight">Data Buku</h2>
          <p className="text-gray-500">Daftar buku yang terdaftar di sistem.</p>
        </div>
      </div>
      <Suspense>
        <BooksData />
      </Suspense>
    </>
  );
};

export default page;
