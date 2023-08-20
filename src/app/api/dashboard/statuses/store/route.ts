import { db } from "@/lib/db";
import { ApiStatusesRequestValidator } from "@/lib/validator/dashboard/statuses/api";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  const body = await req.json();
  if (role === "admin") {
    try {
      const { keterangan } = ApiStatusesRequestValidator.parse(body);
      const statuses = await db.statuses.create({
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
