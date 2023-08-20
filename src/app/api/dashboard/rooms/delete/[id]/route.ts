import { db } from "@/lib/db";
import { ApiRoomsDeleteResponseValidator } from "@/lib/validator/dashboard/rooms/api";
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
      await db.room.delete({
        where: {
          id: id,
        },
      });

      const response = ApiRoomsDeleteResponseValidator.parse({
        error: null,
        data: "Ruangan berhasil dihapus",
      });

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
