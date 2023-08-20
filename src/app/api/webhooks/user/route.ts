import { db } from "@/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

async function handler(request: NextRequest) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id") || "",
    "svix-timestamp": headersList.get("svix-timestamp") || "",
    "svix-signature": headersList.get("svix-signature") || "",
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      public_metadata,
    } = evt.data;

    let email: any = email_addresses;

    await db.user.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        email: email[0].email_address as string,
        firstName: first_name as string,
        lastName: last_name as string,
        imageURL: image_url as string,
        metadata: public_metadata as string,
        loanBook: {
          create: [],
        },
        LoanRoom: {
          create: [],
        },
      },
      update: {
        email: email[0].email_address as string,
        firstName: first_name as string,
        lastName: last_name as string,
        imageURL: image_url as string,
        metadata: public_metadata as string,
      },
    });

    return NextResponse.json({}, { status: 200 });
  }

  return NextResponse.json({}, { status: 400 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
