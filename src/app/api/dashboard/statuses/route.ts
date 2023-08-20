import { db } from "@/lib/db";
import { ApiStatusesListResponseValidator } from "@/lib/validator/dashboard/statuses/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const statuses = await db.statuses.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const response = ApiStatusesListResponseValidator.parse({
      error: null,
      data: statuses.map((status) => ({
        id: status.id,
        keterangan: status.keterangan,
        createdAt: status.createdAt,
        updatedAt: status.updatedAt,
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
};
