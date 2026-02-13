import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Captor",
  description: "Captura de leads com notificação no celular",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-zinc-800">
            <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-zinc-800 grid place-items-center font-bold">LC</div>
                <div>
                  <div className="font-semibold leading-tight">Lead Captor</div>
                  <div className="text-xs text-zinc-400 leading-tight">capte leads e receba alerta no celular</div>
                </div>
              </div>
              <nav className="text-sm text-zinc-300 flex gap-4">
                <a className="hover:text-white" href="/">Formulário</a>
                <a className="hover:text-white" href="/admin">Painel</a>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          <footer className="border-t border-zinc-800">
            <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} Lead Captor. Feito para captura rápida de leads.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
