import { NextResponse } from "next/server";
import { LeadSchema } from "@/lib/leadSchema";
import { insertLead, listLeads } from "@/lib/db";
import { notifyTelegram } from "@/lib/telegram";

function adminOk(req: Request) {
  const url = new URL(req.url);
  const pass = url.searchParams.get("password") ?? "";
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return expected.length > 0 && pass === expected;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
    const userAgent = req.headers.get("user-agent") ?? undefined;

    const lead = insertLead(parsed.data, { ip, userAgent });
    // dispara notificação (Telegram) — se não tiver env, não faz nada
    await notifyTelegram(lead);

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Erro inesperado" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  if (!adminOk(req)) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, leads: listLeads() });
}
