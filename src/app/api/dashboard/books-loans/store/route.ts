import { db } from "@/lib/db";
import { ApiBooksLoansRequestValidator } from "@/lib/validator/dashboard/book-loans/api";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  try {
    const { bookId, quantity, tanggalPinjam, tanggalKembali } =
      ApiBooksLoansRequestValidator.parse(body);

    const bookStock = await db.book.findFirst({
      where: {
        id: parseInt(bookId),
      },
    });

    const stock = bookStock?.stok ?? 0;
    const quantityInt = parseInt(quantity);
    const quantityOverStock = stock < quantityInt || stock - quantityInt < 0;
    const bookNotInStock = stock === 0;

    if (quantityOverStock) {
      return NextResponse.json("Quantity is over stock", { status: 422 });
    }

    if (bookNotInStock) {
      return NextResponse.json("Book is not available", { status: 422 });
    }

    const booksLoans = await db.loanBook.create({
      data: {
        userId,
        bookId: parseInt(bookId),
        quantity: quantityInt,
        start: tanggalPinjam,
        end: tanggalKembali,
      },
    });
    await db.book.update({
      where: { id: parseInt(bookId) },
      data: { stok: stock - quantityInt },
    });

    return NextResponse.json(
      {
        error: null,
        data: booksLoans,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
