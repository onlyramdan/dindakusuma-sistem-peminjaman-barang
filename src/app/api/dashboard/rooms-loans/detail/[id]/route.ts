import { db } from "@/lib/db";
import { ApiBooksLoansDetailResponseValidator } from "@/lib/validator/dashboard/book-loans/api";
import { ApiRoomsLoansDetailResponseValidator } from "@/lib/validator/dashboard/rooms-loans/api";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (
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
    const roomsLoans = await db.loanRoom.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
        start: true,
        end: true,
        keterangan: true,
        Status: {
          select: {
            id: true,
            keterangan: true,
          },
        },
      },
    });

    if (!roomsLoans) {
      return NextResponse.json(
        { error: "Data tidak ditemukan", data: null },
        { status: 404 }
      );
    }

    const response = ApiRoomsLoansDetailResponseValidator.parse({
      error: null,
      data: {
        id: roomsLoans.id,
        namaRuangan: roomsLoans.room.name,
        tanggalPinjam: new Date(roomsLoans.start).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        tanggalKembali: new Date(roomsLoans.end).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        keterangan: roomsLoans.keterangan,
        namaPeminjam: `${roomsLoans.user.firstName}${
          roomsLoans.user.lastName && ` ${roomsLoans.user.lastName}`
        }`,
        status: roomsLoans.Status?.keterangan,
      },
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
};
