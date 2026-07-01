import { NextRequest, NextResponse } from "next/server";
import { appendSubmission, isValidEmail } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }

  await appendSubmission("waitlist.jsonl", {
    email: body.email,
    name: typeof body.name === "string" ? body.name : undefined,
    org: typeof body.org === "string" ? body.org : undefined,
    useCase: typeof body.useCase === "string" ? body.useCase : undefined,
    source: typeof body.source === "string" ? body.source : "unknown",
  });

  return NextResponse.json({ ok: true });
}
