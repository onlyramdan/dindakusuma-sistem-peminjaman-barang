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
    const book = await db.book.findUnique({
      where: { id },
      include: {
        location: true,
        category: true,
        LoanBook: true,
      },
    });

    if (!book) {
      return NextResponse.json(
        { error: "Book not found", data: null },
        { status: 404 }
      );
    }

    const response = {
      error: null,
      data: {
        ...book,
        createdAt: new Date(book.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "numeric",
        }),
        updatedAt: new Date(book.updatedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "numeric",
        }),
      },
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
