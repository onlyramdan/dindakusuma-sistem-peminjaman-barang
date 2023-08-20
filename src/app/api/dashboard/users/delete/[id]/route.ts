import { db } from "@/lib/db";
import { APIUserDeleteResponseValidator } from "@/lib/validator/dashboard/users/api";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const role = user?.publicMetadata.role;
  const id = params.id;

  if (role === "admin") {
    if (id === user.id) {
      return NextResponse.json("Unprocessable entity", { status: 422 });
    } else {
      try {
        await clerkClient.users.deleteUser(id);
        await db.user.delete({
          where: {
            externalId: id,
          },
        });

        const response = APIUserDeleteResponseValidator.parse({
          error: null,
          data: "User berhasil dihapus",
        });

        return NextResponse.json(response, { status: 201 });
      } catch (error) {
        return NextResponse.json("Unprocessable entity", { status: 422 });
      }
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
