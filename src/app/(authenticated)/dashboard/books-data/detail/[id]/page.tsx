import BookDataDetail from "@/components/dashboard/books-data/detail";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Detail Data Buku",
};

const page = async ({ params }: { params: { id: string } }) => {
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
          <h2 className="text-3xl font-bold tracking-tight">
            Detail Data Buku
          </h2>
          <p className="text-gray-500">Tentang detail buku yang dipilih.</p>
        </div>
      </div>
      <Suspense>
        <BookDataDetail id={params.id} />
      </Suspense>
    </>
  );
};

export default page;
