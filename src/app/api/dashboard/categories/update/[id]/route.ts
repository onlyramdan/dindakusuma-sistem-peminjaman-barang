import { db } from "@/lib/db";
import { ApiCategoriesRequestValidator } from "@/lib/validator/dashboard/categories/api";
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
      const body = await req.json();
      const { name } = ApiCategoriesRequestValidator.parse(body);
      const isExistCategory = await db.category.findFirst({
        where: {
          name,
        },
      });

      if (isExistCategory) {
        return NextResponse.json("Duplicate entry", { status: 409 });
      }

      const category = await db.category.update({
        where: {
          id: id,
        },
        data: {
          name,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: category,
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
