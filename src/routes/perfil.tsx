import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Wallet, Star, Trophy } from "lucide-react";
import { useStore } from "@/lib/store";
import { brl } from "@/lib/data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu Perfil e Compras — NebulaBux" },
      { name: "description", content: "Acompanhe seus pedidos, status de entrega e pontos de fidelidade." },
      { property: "og:title", content: "Meu Perfil e Compras — NebulaBux" },
      { property: "og:description", content: "Histórico de pedidos e fidelidade NebulaBux." },
    ],
  }),
  component: Perfil,
});

const FILTERS = ["Todos", "Aprovado", "Entregue", "Pendente"] as const;

function Perfil() {
  const { user, orders, setLoginOpen } = useStore();
  const [f, setF] = useState<(typeof FILTERS)[number]>("Todos");
  if (!user) return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Entre para ver seu perfil</h1>
      <p className="mt-2 text-muted-foreground">Faça login para acompanhar suas compras.</p>
      <button onClick={() => setLoginOpen(true)} className="mt-6 rounded-xl bg-gradient-primary px-6 py-3 font-semibold shadow-button">Fazer Login</button>
    </div>
  );
  const spent = orders.reduce((s, o) => s + o.total, 0);
  const points = Math.floor(spent * 10);
  const level = spent > 500 ? "Galáctico" : spent > 100 ? "Estelar" : "Novato";
  const list = orders.filter((o) => f === "Todos" || o.status === f);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt="" className="h-16 w-16 rounded-2xl border-2 border-primary" />
        <div><h1 className="text-2xl font-bold">{user.name}</h1><p className="text-sm text-muted-foreground">Nível {level}</p></div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[[Package, "Pedidos", String(orders.length)], [Wallet, "Total gasto", brl(spent)], [Star, "Pontos", points.toLocaleString("pt-BR")], [Trophy, "Nível", level]].map(([I, l, v]: any) => (
          <div key={l} className="card-neon p-5"><I className="h-5 w-5 text-primary" /><p className="mt-3 text-xs text-muted-foreground">{l}</p><p className="font-mono text-xl font-bold">{v}</p></div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Minhas Compras</h2>
        <div className="flex gap-2">{FILTERS.map((x) => <button key={x} onClick={() => setF(x)} className={`rounded-full px-3 py-1 text-xs ${f === x ? "bg-gradient-primary font-semibold" : "border border-border bg-card text-muted-foreground"}`}>{x}</button>)}</div>
      </div>
      <div className="mt-4 space-y-3">
        {list.length === 0 && <div className="card-neon p-10 text-center text-muted-foreground">Nenhum pedido ainda. <Link to="/robux" className="text-primary underline">Comprar Robux</Link></div>}
        {list.map((o) => (
          <div key={o.id} className="card-neon flex flex-wrap items-center justify-between gap-3 p-4">
            <div><p className="font-semibold">{o.description}</p><p className="font-mono text-xs text-subtle">{o.id} · {new Date(o.date).toLocaleString("pt-BR")}</p></div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-success/40 bg-success/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-success">{o.status}</span>
              <span className="font-mono font-bold">{brl(o.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
