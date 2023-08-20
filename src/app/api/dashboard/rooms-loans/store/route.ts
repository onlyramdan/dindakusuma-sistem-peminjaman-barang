import { db } from "@/lib/db";
import { ApiRoomsLoansRequestValidator } from "@/lib/validator/dashboard/rooms-loans/api";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  try {
    const { roomId, tanggalPinjam, tanggalKembali, keterangan } =
      ApiRoomsLoansRequestValidator.parse(body);

    const isRoomTersedia = await db.room.findFirst({
      where: {
        tersedia: true,
      },
    });

    if (!isRoomTersedia) {
      return NextResponse.json("Room is not available", { status: 422 });
    }

    const roomsLoans = await db.loanRoom.create({
      data: {
        userId,
        roomId: parseInt(roomId),
        start: tanggalPinjam,
        end: tanggalKembali,
        keterangan,
      },
    });
    await db.room.update({
      where: { id: parseInt(roomId) },
      data: { tersedia: false },
    });

    return NextResponse.json(
      {
        error: null,
        data: roomsLoans,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
