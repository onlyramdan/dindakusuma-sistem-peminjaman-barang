"use client";

import MetricsCard from "@/components/dashboard/metrics/metrics-card";
import { getMetrics } from "@/helpers/dashboard/metrics/get-metrics";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import {
  BackpackIcon,
  Component1Icon,
  CrossCircledIcon,
  FilePlusIcon,
  FileTextIcon,
  HomeIcon,
  LightningBoltIcon,
  PersonIcon,
  ReloadIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";

const Metrics = (role: any) => {
  const { data, isLoading, error } = getMetrics();

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-96">
          <ReloadIcon className="w-8 h-8 animate-spin" />
        </div>
      )}
      {error && (
        <Alert
          className={cn(
            "bg-red-500 dark:bg-red-900 text-zinc-50 dark:text-zinc-50 border-red-500 dark:border-red-900"
          )}
          variant="destructive"
        >
          <CrossCircledIcon color="#fafafa" className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Terjadi kesalahan saat memuat data.
          </AlertDescription>
        </Alert>
      )}
      {data && !isLoading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {role.role === "admin" ? (
            <>
              <MetricsCard
                title="Total Pengguna"
                value={data.user_count}
                Icon={<PersonIcon className="w-4 h-4 text-muted-foreground" />}
              />
              <MetricsCard
                title="Total Kategori"
                value={data.category_count}
                Icon={
                  <Component1Icon className="w-4 h-4 text-muted-foreground" />
                }
              />
              <MetricsCard
                title="Total Lokasi"
                value={data.bookLoc_count}
                Icon={
                  <SewingPinIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
              <MetricsCard
                title="Total Buku"
                value={data.books_count}
                Icon={
                  <FileTextIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
              <MetricsCard
                title="Total Ruangan"
                value={data.rooms_count}
                Icon={<HomeIcon className="w-4 h-4 text-muted-foreground" />}
              />
              <MetricsCard
                title="Total Status"
                value={data.statuses_count}
                Icon={
                  <LightningBoltIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
              <MetricsCard
                title="Total Pinjam Buku"
                value={data.books_loans_count}
                Icon={
                  <FilePlusIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
              <MetricsCard
                title="Total Pinjam Ruangan"
                value={data.rooms_loans_count}
                Icon={
                  <BackpackIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
            </>
          ) : (
            <>
              <MetricsCard
                title="Total Pinjam Buku"
                value={data.books_loans_count}
                Icon={
                  <FilePlusIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
              <MetricsCard
                title="Total Pinjam Ruangan"
                value={data.rooms_loans_count}
                Icon={
                  <BackpackIcon className="w-4 h-4 text-muted-foreground" />
                }
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Metrics;
