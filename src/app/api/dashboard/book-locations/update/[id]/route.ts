import { db } from "@/lib/db";
import { ApiBookLocationsRequestValidator } from "@/lib/validator/dashboard/book-locations/api";
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
      const { name } = ApiBookLocationsRequestValidator.parse(body);
      const isExistBookLocations = await db.bookLocation.findFirst({
        where: {
          name,
        },
      });

      if (isExistBookLocations) {
        return NextResponse.json("Duplicate entry", { status: 409 });
      }

      const bookLocations = await db.bookLocation.update({
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
