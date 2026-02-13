"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, CardContent, CardHeader, Input } from "@/components/ui";

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  const brand = useMemo(() => process.env.NEXT_PUBLIC_BRAND_NAME ?? "Sua Agência", []);

  useEffect(() => {
    const p = localStorage.getItem("admin_password");
    if (p) {
      setPassword(p);
      setSaved(p);
    }
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const pass = password.trim();
      if (!pass) {
        setError("Digite a senha do painel.");
        return;
      }
      const res = await fetch(`/api/leads?password=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Não autorizado");
        setLeads([]);
        return;
      }
      setLeads(data.leads ?? []);
      localStorage.setItem("admin_password", pass);
      setSaved(pass);
    } catch {
      setError("Falha de rede.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Painel de leads — {brand}</h1>
        <p className="text-zinc-400 mt-1">Lista local de leads captados (armazenados em <code>data/leads.json</code>).</p>
      </div>

      <Card>
        <CardHeader title="Acesso" subtitle="Proteção simples por senha (ADMIN_PASSWORD no .env)" />
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="text-sm text-zinc-300">Senha do painel</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a senha" />
              {saved ? <div className="text-xs text-zinc-500 mt-1">Senha salva no navegador.</div> : null}
            </div>
            <Button disabled={loading} onClick={load}>
              {loading ? "Carregando..." : "Carregar leads"}
            </Button>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-700/60 bg-red-900/20 px-4 py-3 text-sm text-red-200">{error}</div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title={`Leads (${leads.length})`} subtitle="Clique para copiar email/telefone rapidamente." />
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-sm text-zinc-500">Nenhum lead carregado (ou senha incorreta).</div>
          ) : (
            <div className="grid gap-3">
              {leads.map((l) => (
                <div key={l.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="font-semibold">{l.name}</div>
                      <div className="text-xs text-zinc-500">{new Date(l.createdAt).toLocaleString("pt-BR")} • Origem: {l.source || "-"}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button
                        className="rounded-xl border border-zinc-800 px-3 py-1 hover:border-zinc-600"
                        onClick={() => navigator.clipboard.writeText(l.email)}
                        title="Copiar email"
                      >
                        📧 {l.email}
                      </button>
                      {l.phone ? (
                        <button
                          className="rounded-xl border border-zinc-800 px-3 py-1 hover:border-zinc-600"
                          onClick={() => navigator.clipboard.writeText(l.phone || "")}
                          title="Copiar telefone"
                        >
                          📱 {l.phone}
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                    <div className="text-zinc-300">
                      <div className="text-xs text-zinc-500">Empresa</div>
                      <div>{l.company || "-"}</div>
                    </div>
                    <div className="text-zinc-300">
                      <div className="text-xs text-zinc-500">Mensagem</div>
                      <div className="whitespace-pre-wrap">{l.message}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
