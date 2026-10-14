import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Zap, ShieldCheck, Headphones, ArrowRight, ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";
import { MoonHero } from "@/components/Moon";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NebulaBux — Robux baratos com entrega rápida" },
      { name: "description", content: "Robux via Gamepass com taxa de 30% coberta, itens Blox Fruits, DTI e MM2. Pix instantâneo e suporte 24/7." },
      { property: "og:title", content: "NebulaBux — Robux baratos com entrega rápida" },
      { property: "og:description", content: "Robux via Gamepass com taxa coberta, Pix instantâneo e suporte 24/7." },
    ],
  }),
  component: Home,
});

const FAQ = [
  ["É seguro comprar Robux aqui?", "Sim. Usamos o método Gamepass oficial do Roblox. Nunca pedimos sua senha — apenas o nick público."],
  ["Quanto tempo demora a entrega?", "Em média 10 minutos, podendo levar até 24h em horários de pico."],
  ["Posso ser banido?", "Não. A compra de Gamepass é um recurso nativo do Roblox, sem violar os termos."],
  ["Quais formas de pagamento?", "Pix com aprovação imediata. Boleto, cartão e cripto chegam em breve."],
];

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="rounded-full border border-primary/40 bg-accent px-3 py-1 text-xs font-semibold text-primary">✦ +12.000 pedidos entregues</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">Robux na velocidade da <span className="text-gradient">luz</span>.</h1>
            <p className="mt-5 max-w-md text-muted-foreground">Sem banimentos, sem senha e com a taxa de 30% do Roblox coberta por nós. Pague no Pix e receba em minutos.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/robux" className="flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-semibold shadow-button">Comprar Robux <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/produtos" className="rounded-xl border border-border bg-card px-6 py-3 font-semibold hover:border-primary">Ver produtos</Link>
            </div>
          </motion.div>
          <MoonHero className="mx-auto h-72 w-72 md:h-[420px] md:w-[420px]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Produtos em Destaque</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="rounded-xl border border-border bg-card p-2"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => scroll(1)} className="rounded-xl border border-border bg-card p-2"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div ref={track} className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {featured.map((p) => <div key={p.id} className="w-64 shrink-0 snap-start"><ProductCard p={p} /></div>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {[
          [Zap, "Entrega Rápida", "Média de 10 minutos após a confirmação da Gamepass."],
          [ShieldCheck, "100% Seguro", "Método oficial. Sem senha, sem risco de banimento."],
          [Clock, "Taxa coberta", "Cobrimos os 30% do Roblox: você recebe o valor cheio."],
        ].map(([Icon, t, d]: any) => (
          <motion.div key={t} whileHover={{ y: -6 }} className="card-neon p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary"><Icon className="h-6 w-6" /></div>
            <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </motion.div>
        ))}
      </section>

      <SupportSection />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="card-neon border-b-0 px-5">
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

const SCRIPT = [
  { me: false, t: "Oi! Fiz o pagamento, quanto tempo demora?" },
  { me: true, t: "Olá! Já confirmamos seu Pix 💜 Só envie o link da sua Gamepass." },
  { me: false, t: "Pronto, mandei!" },
  { me: true, t: "Robux enviados! Qualquer coisa estamos aqui 24/7 ✨" },
];
function SupportSection() {
  const [n, setN] = useState(1);
  useEffect(() => { const i = setInterval(() => setN((x) => (x >= SCRIPT.length ? 1 : x + 1)), 2200); return () => clearInterval(i); }, []);
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary"><Headphones className="h-6 w-6" /></div>
        <h2 className="mt-4 text-2xl font-bold md:text-4xl">Suporte Humanizado 24/7</h2>
        <p className="mt-3 text-muted-foreground">Pessoas reais, prontas para ajudar em qualquer etapa do seu pedido.</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-sm text-success">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> +5 Staffs Disponíveis agora
        </span>
      </div>
      <div className="card-neon space-y-3 p-5">
        {SCRIPT.slice(0, n).map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.me ? "bg-gradient-primary" : "ml-auto bg-muted"}`}>{m.t}</motion.div>
        ))}
        <p className="flex items-center gap-1 pt-2 text-xs text-subtle"><Check className="h-3 w-3" /> Tempo médio de resposta: 2 min</p>
      </div>
    </section>
  );
}
