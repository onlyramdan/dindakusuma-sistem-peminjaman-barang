import { db } from "@/lib/db";
import { ApiBookLocationsRequestValidator } from "@/lib/validator/dashboard/book-locations/api";
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
      const { name } = ApiBookLocationsRequestValidator.parse(body);
      const isExistLocations = await db.bookLocation.findFirst({
        where: {
          name,
        },
      });

      if (isExistLocations) {
        return NextResponse.json("Duplicate entry", { status: 409 });
      }

      const bookLocations = await db.bookLocation.create({
        data: {
          name,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: bookLocations,
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
};
