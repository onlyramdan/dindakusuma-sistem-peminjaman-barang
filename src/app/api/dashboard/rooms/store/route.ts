import { db } from "@/lib/db";
import { ApiRoomsRequestValidator } from "@/lib/validator/dashboard/rooms/api";
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
      const { name } = ApiRoomsRequestValidator.parse(body);
      const rooms = await db.room.create({
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
