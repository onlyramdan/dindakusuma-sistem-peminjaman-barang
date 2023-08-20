import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (
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
    const booksLoans = await db.loanBook.findFirst({
      where: {
        id: id,
      },
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
    });

    if (!booksLoans) {
      return NextResponse.json(
        { error: "Data tidak ditemukan", data: null },
        { status: 404 }
      );
    }

    const response = {
      error: null,
      data: booksLoans,
    };

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
};
