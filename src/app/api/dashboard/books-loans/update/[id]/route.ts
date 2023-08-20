import { db } from "@/lib/db";
import { ApiBooksLoansRequestValidator } from "@/lib/validator/dashboard/book-loans/api";
import { auth } from "@clerk/nextjs";
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
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const id = parseInt(params.id.toString());

  try {
    const body = await req.json();
    const { quantity, tanggalKembali } =
      ApiBooksLoansRequestValidator.parse(body);

    const findBookLoans = await db.loanBook.findFirst({
      where: {
        id: id,
        status: {
          keterangan: "Pending",
        },
      },
      include: {
        book: true,
      },
    });

    if (!findBookLoans) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }

    const bookId = findBookLoans.bookId;
    const quantityBefore = findBookLoans.quantity ?? 0;
    const quantityUpdated = parseInt(quantity.toString());
    const totalStockBook = findBookLoans.book.stok + quantityBefore;

    const stockBookUpdated = totalStockBook - quantityUpdated;
    if (stockBookUpdated < 0) {
      return NextResponse.json("Quantity is over stock", { status: 422 });
    }

    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        stok: stockBookUpdated,
      },
    });

    const updateBookLoans = await db.loanBook.update({
      where: {
        id: id,
      },
      data: {
        quantity: quantityUpdated,
        end: tanggalKembali,
      },
    });

    return NextResponse.json({
      error: null,
      data: updateBookLoans,
    });
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
