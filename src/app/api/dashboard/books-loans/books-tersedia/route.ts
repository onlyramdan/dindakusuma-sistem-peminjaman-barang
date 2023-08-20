import { db } from "@/lib/db";
import { ApiBooksTersediaResponseValidator } from "@/lib/validator/dashboard/books/api";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const books = await db.book.findMany({
      where: {
        stok: {
          gt: 0,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const response = ApiBooksTersediaResponseValidator.parse({
      error: null,
      data: books,
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
};
