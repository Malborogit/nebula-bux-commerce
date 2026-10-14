import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { RANKING, avatarFor, brl } from "@/lib/data";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking Global de Compradores — NebulaBux" },
      { name: "description", content: "Veja os maiores compradores da NebulaBux no pódio do mês." },
      { property: "og:title", content: "Ranking Global — NebulaBux" },
      { property: "og:description", content: "Pódio Top 3 e ranking dos maiores compradores." },
    ],
  }),
  component: Ranking,
});

function Ranking() {
  const [a, b, c] = RANKING as [typeof RANKING[0], typeof RANKING[0], typeof RANKING[0]];
  const podium = [{ r: b, pos: 2, h: "h-28" }, { r: a, pos: 1, h: "h-40" }, { r: c, pos: 3, h: "h-20" }];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold md:text-4xl">Ranking <span className="text-gradient">Global</span></h1>
      <p className="mt-2 text-center text-muted-foreground">Os maiores compradores do mês.</p>
      <div className="mt-12 grid grid-cols-3 items-end gap-3">
        {podium.map(({ r, pos, h }, i) => (
          <motion.div key={r.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="flex flex-col items-center">
            {pos === 1 && <Crown className="mb-1 h-7 w-7 text-warning" />}
            <img src={avatarFor(r.name)} alt="" className={`rounded-full border-4 bg-accent ${pos === 1 ? "h-24 w-24 border-warning shadow-glow" : "h-16 w-16 border-primary"}`} />
            <p className="mt-2 truncate text-sm font-semibold">{r.name}</p>
            <p className="font-mono text-xs text-primary">{brl(r.spent)}</p>
            <div className={`mt-3 grid w-full place-items-center rounded-t-2xl bg-gradient-primary font-display text-3xl font-extrabold ${h}`}>{pos}</div>
          </motion.div>
        ))}
      </div>
      <div className="card-neon mt-10 divide-y divide-border">
        {RANKING.slice(3).map((r, i) => (
          <div key={r.name} className="flex items-center gap-4 p-4">
            <span className="w-6 font-mono text-subtle">#{i + 4}</span>
            <img src={avatarFor(r.name)} alt="" className="h-9 w-9 rounded-full bg-accent" />
            <span className="flex-1 font-medium">{r.name}</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">{r.orders} pedidos</span>
            <span className="font-mono font-bold">{brl(r.spent)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
