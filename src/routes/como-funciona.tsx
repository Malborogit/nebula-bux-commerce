import { createFileRoute, Link } from "@tanstack/react-router";
import { MousePointerClick, UserSearch, Package, QrCode, Ticket, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como Funciona a compra de Robux — NebulaBux" },
      { name: "description", content: "Entenda as 5 etapas: método, identificação, pacote, pagamento Pix e entrega via Gamepass." },
      { property: "og:title", content: "Como Funciona — NebulaBux" },
      { property: "og:description", content: "Compre Robux em 5 etapas simples via Gamepass." },
    ],
  }),
  component: Como,
});

const STEPS = [
  [MousePointerClick, "Método", "Escolha receber via Gamepass — seguro e rápido."],
  [UserSearch, "Identificação", "Informe apenas seu nick público do Roblox."],
  [Package, "Pacote", "Escolha a quantidade e aplique seu cupom."],
  [QrCode, "Pagamento", "Pague com Pix e tenha aprovação imediata."],
  [Ticket, "Entrega", "Crie a Gamepass com o preço indicado e receba seus Robux."],
];

function Como() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold md:text-4xl">Como <span className="text-gradient">Funciona</span></h1>
      <div className="mt-10 space-y-4">
        {STEPS.map(([I, t, d]: any, i) => (
          <div key={t} className="card-neon flex items-start gap-4 p-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary"><I className="h-6 w-6" /></div>
            <div><p className="font-mono text-xs text-primary">ETAPA {i + 1}</p><h3 className="font-semibold">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/robux" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-semibold shadow-button">Começar agora <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
