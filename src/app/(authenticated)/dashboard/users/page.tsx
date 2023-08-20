import Users from "@/components/dashboard/users";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard List Users",
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
          <h2 className="text-3xl font-bold tracking-tight">
            Data List Pengguna
          </h2>
          <p className="text-gray-500">
            Daftar pengguna yang terdaftar di sistem.
          </p>
        </div>
      </div>
      <Suspense>
        <Users />
      </Suspense>
    </>
  );
};

export default page;
