import { db } from "@/lib/db";
import { ApiRoomsLoansRequestValidator } from "@/lib/validator/dashboard/rooms-loans/api";
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
    const body = await req.json();
    const { tanggalKembali, keterangan } =
      ApiRoomsLoansRequestValidator.parse(body);

    await db.loanRoom.findFirst({
      where: {
        id: id,
        Status: {
          keterangan: "Pending",
        },
      },
      include: {
        room: true,
      },
    });

    const updateRoomLoans = await db.loanRoom.update({
      where: {
        id: id,
      },
      data: {
        end: tanggalKembali,
        keterangan: keterangan,
      },
    });

    return NextResponse.json({
      error: null,
      data: updateRoomLoans,
    });
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
