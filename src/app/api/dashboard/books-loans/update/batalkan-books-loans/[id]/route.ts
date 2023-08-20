import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const id = parseInt(params.id.toString());

  try {
    const batalkanBooksLoans = await db.loanBook.delete({
      where: {
        id,
        status: {
          keterangan: "Pending",
        },
      },
    });

    if (!batalkanBooksLoans) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }

    const bookId = batalkanBooksLoans.bookId;
    const bookQuantityBorrowed = batalkanBooksLoans.quantity ?? 0;

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
        data: batalkanBooksLoans,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
