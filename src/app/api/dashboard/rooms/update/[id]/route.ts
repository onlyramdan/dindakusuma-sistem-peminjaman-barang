import { db } from "@/lib/db";
import { ApiRoomsRequestValidator } from "@/lib/validator/dashboard/rooms/api";
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
      const { name } = ApiRoomsRequestValidator.parse(body);
      const rooms = await db.room.update({
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
          data: rooms,
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
