import { db } from "@/lib/db";
import { ApiBookLocationsResponseValidator } from "@/lib/validator/dashboard/book-locations/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  if (role === "admin") {
    try {
      const bookLocations = await db.bookLocation.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
      const response = ApiBookLocationsResponseValidator.parse({
        error: null,
        data: bookLocations,
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
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
};
