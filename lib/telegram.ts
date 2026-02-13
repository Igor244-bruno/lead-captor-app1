import type { Lead } from "./db";

function fmt(v?: string) {
  const s = (v ?? "").trim();
  return s.length ? s : "-";
}

export async function notifyTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // notificações desativadas

  const text =
`🚨 Novo lead chegou!
👤 Nome: ${fmt(lead.name)}
📧 Email: ${fmt(lead.email)}
📱 Telefone: ${fmt(lead.phone)}
🏢 Empresa: ${fmt(lead.company)}
🌐 Origem: ${fmt(lead.source)}
🕒 ${new Date(lead.createdAt).toLocaleString("pt-BR")}

📝 Mensagem:
${fmt(lead.message)}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    // Não quebra a criação do lead por causa de notificação
    console.error("Falha ao notificar Telegram:", await res.text());
  }
}
