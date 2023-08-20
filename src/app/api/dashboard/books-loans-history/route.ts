import { db } from "@/lib/db";
import { ApiBooksLoansHistoryResponseValidator } from "@/lib/validator/dashboard/books-loans-history/api";
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
      const booksLoansHistory = await db.loanBook.findMany({
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
        },
        where: {
          isDone: true,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiBooksLoansHistoryResponseValidator.parse({
        error: null,
        data: booksLoansHistory.map((loanBook) => ({
          id: loanBook.id,
          judul: loanBook.book.judul,
          jumlah: loanBook.quantity,
          tanggalPinjam: new Date(loanBook.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(loanBook.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${loanBook.user.firstName}${
            loanBook.user.lastName && ` ${loanBook.user.lastName}`
          }`,
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
  } else if (!role || role !== "admin") {
    try {
      const booksLoansHistory = await db.loanBook.findMany({
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
        },
        where: {
          isDone: true,
          userId: user.id,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiBooksLoansHistoryResponseValidator.parse({
        error: null,
        data: booksLoansHistory.map((loanBook) => ({
          id: loanBook.id,
          judul: loanBook.book.judul,
          jumlah: loanBook.quantity,
          tanggalPinjam: new Date(loanBook.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(loanBook.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${loanBook.user.firstName}${
            loanBook.user.lastName && ` ${loanBook.user.lastName}`
          }`,
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
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
