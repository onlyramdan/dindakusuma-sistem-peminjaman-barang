import Metrics from "@/components/dashboard/metrics";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Button } from "@/ui/button";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page: FC = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;
  const phoneNumber = user?.publicMetadata.phoneNumbers;
  const address = user?.publicMetadata.address;

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-500">
            Selamat datang kembali, {user?.firstName}
            {(user?.lastName || user?.lastName !== "") && ` ${user?.lastName}`}!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {role === "admin" && (
            <>
              <Button asChild>
                <Link href="/dashboard/books">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Tambah Buku
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/rooms">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Tambah Ruangan
                </Link>
              </Button>
            </>
          )}

          {role !== "admin" && (
            <>
              <Button asChild>
                <Link href="/dashboard/books-data">Pinjam Buku</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/rooms-loan">Pinjam Ruangan</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {!phoneNumber && !address && role !== "admin" && (
        <Alert
          className={cn(
            "bg-yellow-500 dark:bg-yellow-900 text-zinc-50 dark:text-zinc-50 border-yellow-500 dark:border-yellow-900"
          )}
        >
          <AlertTitle>
            Ayo Selesaikan Misi! <span className="sr-only">Informasi</span>
          </AlertTitle>
          <AlertDescription>
            Silahkan lengkapi informasi akun anda terlebih dahulu{" "}
            <Link
              className={cn("underline")}
              href="/dashboard/account/settings"
            >
              di sini
            </Link>
          </AlertDescription>
        </Alert>
      )}
      <Suspense>
        <Metrics role={role} />
      </Suspense>
    </>
  );
};

export default page;
