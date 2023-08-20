"use client";

import { getBooksData } from "@/helpers/dashboard/books-data/get-books-data";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const BookItem = ({ data }: { data: any }) => {
  return (
    <>
      <Link href={`/dashboard/books-data/detail/${data.id}`}>
        <div className="max-w-[176px]">
          <Image
            className={cn(
              "rounded-lg flex items-center justify-center bg-cover"
            )}
            src={data.coverImage}
            style={{
              backgroundImage: `url(${data.coverImage})`,
            }}
            width={176}
            height={208}
            loader={({ src }) => src}
            alt="cover image"
          />
          <div className="mt-2">
            <h2 className="text-sm font-bold line-clamp-1">{data.judul}</h2>
            <p className="text-xs line-clamp-1">{data.penulis}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

const BooksData: FC = (): JSX.Element => {
  const { data, isLoading, error } = getBooksData();

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-96">
          <ReloadIcon className="w-8 h-8 animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center w-full h-96">
          <p>Terjadi kesalahan saat memuat data.</p>
        </div>
      )}

      {data && !isLoading && !error && (
        <div className="flex flex-row flex-wrap justify-center gap-4 lg:justify-normal">
          {data.map((book: any, index: number) => (
            <BookItem key={index} data={book} />
          ))}
        </div>
      )}
    </>
  );
};

export default BooksData;
