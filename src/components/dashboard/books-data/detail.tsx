"use client";

import { getBookById } from "@/helpers/dashboard/books-data/get-book-by-id";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/ui/table";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import AddModal from "../books-loans/add-modal";

type TBookDataDetail = {
  id: string;
};

const BookDataDetail = ({ id }: TBookDataDetail): JSX.Element => {
  const { data, isLoading, error } = getBookById(id);
  const [isShowMore, setIsShowMore] = React.useState<boolean>(false);

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
        <>
          <div className="grid w-full grid-flow-row gap-4 mt-8 lg:justify-between lg:grid-cols-5 lg:grid-flow-col">
            <div className="flex flex-row justify-center w-full h-full col-span-5 lg:col-span-1">
              <div className="max-w-[176px] lg:sticky lg:top-32">
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
                <div className="flex flex-col gap-2 py-2">
                  <AddModal idBuku={id}>
                    <Button
                      className={cn(
                        "w-full",
                        data.stok === 0 && "cursor-not-allowed"
                      )}
                      variant="default"
                      disabled={data.stok === 0}
                    >
                      Pinjam Buku
                    </Button>
                  </AddModal>
                </div>
              </div>
            </div>
            <div className="w-full col-span-4 px-6 overflow-auto rounded-md">
              <h2 className="text-2xl font-bold">{data.judul}</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead>Penulis</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.penulis}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Tahun Terbit</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.tahun}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Penerbit</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.penerbit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Stok Tersedia</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.stok}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Jumlah Pinjaman</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>
                      {data.LoanBook
                        ? `${data.LoanBook?.length} dari ${
                            data.stok + data.LoanBook?.length
                          } buku`
                        : data.stok}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Lokasi</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.location.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Kategori</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.category.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Tanggal Posting</TableHead>
                    <TableCell>:</TableCell>
                    <TableCell>{data.createdAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6">
                <h3 className="text-xl font-bold">Sinopsis</h3>
                <p
                  className={`mt-2 text-justify transition-all ${
                    isShowMore ? "" : "line-clamp-5"
                  }`}
                >
                  {data.sinopsis}
                </p>
                {data.sinopsis.length > 300 && (
                  <Button
                    className={cn("mt-4")}
                    variant="default"
                    onClick={() => setIsShowMore((prev) => !prev)}
                  >
                    {isShowMore ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookDataDetail;
