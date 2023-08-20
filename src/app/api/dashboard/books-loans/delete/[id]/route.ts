import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
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

  const id = parseInt(params.id.toString());
  const role = user?.publicMetadata.role;

  if (role === "admin") {
    try {
      const deleteBooksLoans = await db.loanBook.delete({
        where: {
          id,
        },
      });

      if (!deleteBooksLoans) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const bookId = deleteBooksLoans.bookId;
      const bookQuantityBorrowed = deleteBooksLoans.quantity ?? 0;

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
          data: deleteBooksLoans,
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
