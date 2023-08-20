import { db } from "@/lib/db";
import { ApiBooksDeleteResponseValidator } from "@/lib/validator/dashboard/books/api";
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

  const role = user?.publicMetadata.role;
  const id = parseInt(params.id.toString());

  if (role === "admin") {
    try {
      await db.book.delete({
        where: {
          id: id,
        },
      });

      const response = ApiBooksDeleteResponseValidator.parse({
        error: null,
        data: "Buku berhasil dihapus",
      });

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
