import { db } from "@/lib/db";
import { ApiRoomsLoansGetResponseValidator } from "@/lib/validator/dashboard/rooms-loans/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;

  if (role === "admin") {
    try {
      const roomsLoans = await db.loanRoom.findMany({
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
          Status: {
            select: {
              id: true,
              keterangan: true,
            },
          },
        },
        where: {
          isDone: false,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiRoomsLoansGetResponseValidator.parse({
        error: null,
        data: roomsLoans.map((room) => ({
          id: room.id,
          namaRuangan: room.room.name,
          tanggalPinjam: new Date(room.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(room.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${room.user.firstName}${
            room.user.lastName && ` ${room.user.lastName}`
          }`,
          status: room.Status?.keterangan,
        })),
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
  } else {
    try {
      const roomsLoans = await db.loanRoom.findMany({
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
          Status: {
            select: {
              id: true,
              keterangan: true,
            },
          },
        },
        where: {
          isDone: false,
          userId: user.id,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiRoomsLoansGetResponseValidator.parse({
        error: null,
        data: roomsLoans.map((room) => ({
          id: room.id,
          namaRuangan: room.room.name,
          tanggalPinjam: new Date(room.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(room.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${room.user.firstName}${
            room.user.lastName && ` ${room.user.lastName}`
          }`,
          status: room.Status?.keterangan,
        })),
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
  }
};
