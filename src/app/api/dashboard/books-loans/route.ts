import { db } from "@/lib/db";
import { ApiBooksLoansResponseValidator } from "@/lib/validator/dashboard/book-loans/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;

  if (role === "admin") {
    try {
      const booksLoans = await db.loanBook.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          book: {
            select: {
              id: true,
              judul: true,
            },
          },
          quantity: true,
          start: true,
          end: true,
          status: {
            select: {
              id: true,
              keterangan: true,
            },
          },
        },
        where: {
          isDone: false,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiBooksLoansResponseValidator.parse({
        error: null,
        data: booksLoans.map((book) => ({
          id: book.id,
          namaBuku: book.book.judul,
          jumlah: book.quantity,
          tanggalPinjam: new Date(book.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(book.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${book.user.firstName}${
            book.user.lastName && ` ${book.user.lastName}`
          }`,
          status: book.status?.keterangan,
        })),
      });

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: error.issues,
            data: null,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Internal server error", data: null },
        { status: 500 }
      );
    }
  } else {
    try {
      const booksLoans = await db.loanBook.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          book: {
            select: {
              id: true,
              judul: true,
            },
          },
          quantity: true,
          start: true,
          end: true,
          status: {
            select: {
              id: true,
              keterangan: true,
            },
          },
        },
        where: {
          isDone: false,
          userId: user.id,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiBooksLoansResponseValidator.parse({
        error: null,
        data: booksLoans.map((book) => ({
          id: book.id,
          namaBuku: book.book.judul,
          jumlah: book.quantity,
          tanggalPinjam: new Date(book.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(book.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${book.user.firstName}${
            book.user.lastName && ` ${book.user.lastName}`
          }`,
          status: book.status?.keterangan,
        })),
      });

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: error.issues,
            data: null,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Internal server error", data: null },
        { status: 500 }
      );
    }
  }
};
