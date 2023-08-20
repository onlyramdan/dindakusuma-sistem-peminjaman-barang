import { db } from "@/lib/db";
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

  const id = parseInt(params.id.toString());
  const role = user?.publicMetadata.role;

  if (role === "admin") {
    try {
      const deleteRoomsLoans = await db.loanRoom.delete({
        where: {
          id,
        },
      });

      if (!deleteRoomsLoans) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const roomId = deleteRoomsLoans.roomId;

      const findRoom = await db.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!findRoom) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const roomAvailability = findRoom.tersedia;

      if (roomAvailability) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      await db.room.update({
        where: {
          id: roomId,
        },
        data: {
          tersedia: true,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: deleteRoomsLoans,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
};
