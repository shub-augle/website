import { NextRequest, NextResponse } from "next/server";
import { appendSubmission, isValidEmail } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !isValidEmail(body.email) || typeof body.name !== "string" || !body.name.trim() || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ ok: false, error: "Name, a valid email, and a message are required." }, { status: 400 });
  }

  await appendSubmission("contact.jsonl", {
    name: body.name,
    email: body.email,
    org: typeof body.org === "string" ? body.org : undefined,
    subject: typeof body.subject === "string" ? body.subject : undefined,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
