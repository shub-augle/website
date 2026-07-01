import { appendFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function appendSubmission(file: string, record: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ ...record, receivedAt: new Date().toISOString() }) + "\n";
  await appendFile(path.join(DATA_DIR, file), line, "utf8");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && EMAIL_RE.test(email);
}
