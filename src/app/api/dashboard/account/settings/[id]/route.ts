import { ApiSettingsRequestValidator } from "@/lib/validator/dashboard/account/settings/api";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const id = params.id;

  const body = await req.json();
  try {
    const { firstName, lastName, phoneNumber, address } =
      ApiSettingsRequestValidator.parse(body);
    const users = await clerkClient.users.updateUser(id, {
      firstName,
      lastName,
      publicMetadata: {
        phoneNumber,
        address,
      },
    });

    return NextResponse.json(
      {
        error: null,
        data: users,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Unprocessable entity", { status: 422 });
  }
};
