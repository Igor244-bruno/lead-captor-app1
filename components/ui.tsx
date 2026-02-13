export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-sm">{children}</div>;
}
export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="p-5 border-b border-zinc-800">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle ? <div className="text-sm text-zinc-400 mt-1">{subtitle}</div> : null}
    </div>
  );
}
export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-5">{children}</div>;
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 outline-none " +
        "focus:border-zinc-600 placeholder:text-zinc-600 " +
        (props.className ?? "")
      }
    />
  );
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 outline-none min-h-[110px] " +
        "focus:border-zinc-600 placeholder:text-zinc-600 " +
        (props.className ?? "")
      }
    />
  );
}
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "rounded-xl px-4 py-2 bg-white text-black font-medium hover:opacity-90 disabled:opacity-50 " +
        (props.className ?? "")
      }
    />
  );
}
