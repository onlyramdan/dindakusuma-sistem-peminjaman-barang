import Statuses from "@/components/dashboard/statuses";
import AddButton from "@/components/dashboard/statuses/add-button";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Status",
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
          <h2 className="text-3xl font-bold tracking-tight">Master Status</h2>
          <p className="text-gray-500">
            Daftar status peminjaman yang terdaftar di sistem.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AddButton />
        </div>
      </div>
      <Suspense>
        <Statuses />
      </Suspense>
    </>
  );
};

export default page;
