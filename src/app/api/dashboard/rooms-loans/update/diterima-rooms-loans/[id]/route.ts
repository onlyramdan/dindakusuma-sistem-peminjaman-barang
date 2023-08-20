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
          keterangan: "Diterima",
        },
      });

      if (!findStatus) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }

      const statusId = findStatus?.id;
      const updateRoomsLoansStatusDiterima = await db.loanRoom.update({
        where: { id },
        data: {
          statusId,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: updateRoomsLoansStatusDiterima,
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
