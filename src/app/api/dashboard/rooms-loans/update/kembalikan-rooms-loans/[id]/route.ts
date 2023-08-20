import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const id = parseInt(params.id.toString());

  try {
    const kembalikanRoomsLoans = await db.loanRoom.update({
      where: {
        id,
        Status: {
          keterangan: "Diterima",
        },
      },
      data: {
        isDone: true,
      },
    });

    if (!kembalikanRoomsLoans) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }

    const roomId = kembalikanRoomsLoans.roomId;

    const findRoom = await db.room.findFirst({
      where: {
        id: roomId,
      },
    });

    if (!roomId) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }

    const roomAvailability = findRoom?.tersedia;

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
        data: kembalikanRoomsLoans,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
