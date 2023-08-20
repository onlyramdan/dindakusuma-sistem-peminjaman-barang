import { db } from "@/lib/db";
import { ApiStatusesRequestValidator } from "@/lib/validator/dashboard/statuses/api";
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
      const body = await req.json();
      const { keterangan } = ApiStatusesRequestValidator.parse(body);
      const statuses = await db.statuses.update({
        where: {
          id: id,
        },
        data: {
          keterangan,
        },
      });

      return NextResponse.json(
        {
          error: null,
          data: statuses,
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
