# Lead Captor (site/app) — captura leads e notifica no celular

Projeto pronto para abrir no **VS Code** e rodar localmente (Next.js).

## O que ele faz
- Página pública com **formulário de lead** (`/`)
- API (`/api/leads`) salva os leads em `data/leads.json`
- Ao criar um lead novo, envia **notificação no celular via Telegram**
- Painel simples para listar leads (`/admin`) protegido por senha (`ADMIN_PASSWORD`)

## Como rodar
1) Instale Node.js 18+  
2) No VS Code, abra a pasta do projeto e rode:

```bash
npm install
cp .env.example .env
npm run dev
```

Acesse:
- Form: http://localhost:3000
- Admin: http://localhost:3000/admin

## Configurar notificação no Telegram (celular)
1) No Telegram, procure **@BotFather** e crie um bot (/newbot).  
2) Copie o token e coloque no `.env`:
   - `TELEGRAM_BOT_TOKEN=...`
3) Abra o chat com o bot e envie "oi".
4) Pegue o `chat_id` (o jeito mais fácil é usar algum "getUpdates" do Telegram, ou bots/serviços que mostram seu id)
5) Coloque no `.env`:
   - `TELEGRAM_CHAT_ID=...`

> Se você não configurar Telegram, o sistema funciona igual, só não notifica.

## Onde ficam os leads?
- `data/leads.json` (criado automaticamente)

## Produção
Para produção, o ideal é trocar o armazenamento local por banco (Postgres/Supabase) e usar um provedor HTTPS.
Mas para uso rápido e funcionar 100% no PC/servidor próprio, esse JSON resolve.

