import { db } from "@/lib/db";
import { ApiCategoriesDeleteResponseValidator } from "@/lib/validator/dashboard/categories/api";
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
      await db.category.delete({
        where: {
          id: id,
        },
      });

      const response = ApiCategoriesDeleteResponseValidator.parse({
        error: null,
        data: "Kategori berhasil dihapus",
      });

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
