import { db } from "@/lib/db";
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
      const findStatus = await db.statuses.findFirst({
        where: {
          keterangan: "Ditolak",
        },
      });

      if (!findStatus) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const statusId = findStatus?.id;
      const updateRoomsLoansStatusDitolak = await db.loanRoom.update({
        where: { id },
        data: {
          isDone: true,
          statusId,
        },
      });

      const roomId = updateRoomsLoansStatusDitolak.roomId;

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
        where: { id: roomId },
        data: {
          tersedia: true,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: updateRoomsLoansStatusDitolak,
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
