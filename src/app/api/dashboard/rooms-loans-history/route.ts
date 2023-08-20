import { db } from "@/lib/db";
import { ApiRoomsLoansHistoryResponseValidator } from "@/lib/validator/dashboard/rooms-loans-history/api";
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
      const roomsLoansHistory = await db.loanRoom.findMany({
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
        },
        where: {
          isDone: true,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiRoomsLoansHistoryResponseValidator.parse({
        error: null,
        data: roomsLoansHistory.map((loanRoom) => ({
          id: loanRoom.id,
          namaRuangan: loanRoom.room.name,
          tanggalPinjam: new Date(loanRoom.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(loanRoom.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${loanRoom.user.firstName}${
            loanRoom.user.lastName && ` ${loanRoom.user.lastName}`
          }`,
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
  } else if (!role || role !== "admin") {
    try {
      const roomsLoansHistory = await db.loanRoom.findMany({
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
        },
        where: {
          isDone: true,
          userId: user.id,
        },
        orderBy: {
          start: "asc",
        },
      });

      const response = ApiRoomsLoansHistoryResponseValidator.parse({
        error: null,
        data: roomsLoansHistory.map((loanRoom) => ({
          id: loanRoom.id,
          namaRuangan: loanRoom.room.name,
          tanggalPinjam: new Date(loanRoom.start).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          tanggalKembali: new Date(loanRoom.end).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          namaPeminjam: `${loanRoom.user.firstName}${
            loanRoom.user.lastName && ` ${loanRoom.user.lastName}`
          }`,
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
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
