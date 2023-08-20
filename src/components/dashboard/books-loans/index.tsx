"use client";

import { columns } from "@/components/dashboard/books-loans/columns";
import { DataTable } from "@/components/dashboard/books-loans/data-table";
import { getBooksLoans } from "@/helpers/dashboard/books-loans/get-books-loans";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Card, CardContent } from "@/ui/card";
import { CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

const BooksLoans = () => {
  const { data, isLoading, error } = getBooksLoans();

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
        <Card>
          <CardContent className={cn("p-6")}>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BooksLoans;
