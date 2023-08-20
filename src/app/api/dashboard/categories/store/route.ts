import { db } from "@/lib/db";
import { ApiCategoriesRequestValidator } from "@/lib/validator/dashboard/categories/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  const body = await req.json();
  if (role === "admin") {
    try {
      const { name } = ApiCategoriesRequestValidator.parse(body);
      const isExistCategory = await db.category.findFirst({
        where: {
          name,
        },
      });

      if (isExistCategory) {
        return NextResponse.json("Duplicate entry", { status: 409 });
      }

      const categories = await db.category.create({
        data: {
          name,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: categories,
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
