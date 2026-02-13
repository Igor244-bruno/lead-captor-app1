"use client";

import { useMemo, useState } from "react";
import { Button, Card, CardContent, CardHeader, Input, Textarea } from "@/components/ui";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  source: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  source: "",
};

export default function Page() {
  const brand = useMemo(() => process.env.NEXT_PUBLIC_BRAND_NAME ?? "Sua Agência", []);
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  async function submit() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          data?.errors?.fieldErrors
            ? Object.entries(data.errors.fieldErrors)
                .map(([k, v]: any) => `${k}: ${(v ?? []).join(", ")}`)
                .join("\n")
            : data?.error ?? "Erro ao enviar";
        setResult({ ok: false, msg });
      } else {
        setResult({ ok: true, msg: "Lead enviado! ✅ Você vai receber notificação no celular." });
        setForm(initial);
      }
    } catch {
      setResult({ ok: false, msg: "Falha de rede. Verifique se o servidor está rodando." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Captação de leads — {brand}</h1>
        <p className="text-zinc-400 mt-1">
          Formulário simples para captar leads e notificar instantaneamente no celular (via Telegram).
        </p>
      </div>

      <Card>
        <CardHeader
          title="Quero um orçamento"
          subtitle="Preencha abaixo. Assim que você enviar, o time é avisado automaticamente."
        />
        <CardContent>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">Nome *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome" />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Email *</label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="voce@empresa.com" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">Telefone</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(xx) xxxxx-xxxx" />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Empresa</label>
                <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Nome da empresa" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">Origem do lead</label>
                <Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="Instagram / Anúncio / Site / Indicação..." />
              </div>
              <div className="text-sm text-zinc-500 md:pt-6">
                Dica: você pode colocar hidden fields (utm_source, utm_campaign, etc.) quando embutir esse form.
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-300">Mensagem *</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Me conte o que você precisa..." />
            </div>

            {result ? (
              <div className={"rounded-xl border px-4 py-3 text-sm " + (result.ok ? "border-emerald-700/60 bg-emerald-900/20 text-emerald-200" : "border-red-700/60 bg-red-900/20 text-red-200")}>
                {result.msg.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <Button disabled={loading} onClick={submit}>
                {loading ? "Enviando..." : "Enviar lead"}
              </Button>
              <div className="text-xs text-zinc-500">* campos obrigatórios</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Como isso vira notificação no celular?" subtitle="Você conecta um bot do Telegram e recebe alerta instantâneo." />
        <CardContent>
          <ol className="list-decimal pl-5 text-sm text-zinc-300 grid gap-2">
            <li>Crie um bot no Telegram (BotFather) e pegue o <b>token</b>.</li>
            <li>Abra o chat com o bot e envie qualquer mensagem.</li>
            <li>Descubra seu <b>chat_id</b> (há sites/requests simples para isso).</li>
            <li>Preencha <code className="text-zinc-200">TELEGRAM_BOT_TOKEN</code> e <code className="text-zinc-200">TELEGRAM_CHAT_ID</code> no arquivo <code className="text-zinc-200">.env</code>.</li>
            <li>Pronto: a cada lead novo, o backend dispara uma mensagem.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
