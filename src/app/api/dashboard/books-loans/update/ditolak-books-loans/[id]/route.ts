import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: number;
    };
  }
) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  const id = parseInt(params.id.toString());

  if (role === "admin") {
    try {
      const findStatus = await db.statuses.findFirst({
        where: {
          keterangan: "Ditolak",
        },
      });

      if (!findStatus) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const statusId = findStatus?.id;
      const updateBooksLoansStatusDitolak = await db.loanBook.update({
        where: { id },
        data: {
          isDone: true,
          statusId,
        },
      });

      const bookId = updateBooksLoansStatusDitolak.bookId;
      const bookQuantityBorrowed = updateBooksLoansStatusDitolak.quantity ?? 0;

      if (bookQuantityBorrowed <= 0) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const findBook = await db.book.findFirst({
        where: {
          id: bookId,
        },
      });

      if (!findBook) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const bookQuantity = findBook.stok;
      const bookQuantityUpdated = bookQuantity + bookQuantityBorrowed;

      await db.book.update({
        where: {
          id: bookId,
        },
        data: {
          stok: bookQuantityUpdated,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: updateBooksLoansStatusDitolak,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
};
