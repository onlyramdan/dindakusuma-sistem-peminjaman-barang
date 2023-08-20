import { db } from "@/lib/db";
import { ApiBookLocationsDeleteResponseValidator } from "@/lib/validator/dashboard/book-locations/api";
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
      await db.bookLocation.delete({
        where: {
          id: id,
        },
      });

      const response = ApiBookLocationsDeleteResponseValidator.parse({
        error: null,
        data: "Lokasi buku berhasil dihapus",
      });

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
};
