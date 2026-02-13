import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { LeadInput } from "./leadSchema";

export type Lead = LeadInput & {
  id: string;
  createdAt: string;
  ip?: string;
  userAgent?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ leads: [] }, null, 2), "utf-8");
}

export function insertLead(input: LeadInput, meta?: { ip?: string; userAgent?: string }): Lead {
  ensureStore();
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as { leads: Lead[] };
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ip: meta?.ip,
    userAgent: meta?.userAgent,
  };
  raw.leads.unshift(lead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(raw, null, 2), "utf-8");
  return lead;
}

export function listLeads(): Lead[] {
  ensureStore();
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as { leads: Lead[] };
  return raw.leads ?? [];
}
