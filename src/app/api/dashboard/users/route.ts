import { ApiUserListResponseValidator } from "@/lib/validator/dashboard/users/api";
import { clerkClient, currentUser } from "@clerk/nextjs";
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
      const listUser = await clerkClient.users.getUserList();
      const response = ApiUserListResponseValidator.parse({
        error: null,
        data: listUser.map((user) => ({
          id: user.id,
          fullName:
            user.firstName +
            (user.lastName || user.lastName !== "" ? " " + user.lastName : ""),
          email: user.emailAddresses[0].emailAddress,
          role: user.publicMetadata.role ? user.publicMetadata.role : "member",
          lastSignInAt: user.lastSignInAt
            ? new Date(user.lastSignInAt).toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              }) + " WIB"
            : null,
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
