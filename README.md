# Nebula Bux Commerce

{

  "meta": {

    "project_name": "NebulaBux (Inspirado em EclipseBuxx - Versão Anti-Copy para Lovable)",

    "target_platform": "Lovable.dev (React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion + Lucide Icons)",

    "reference_url": "https://eclipsebuxx.com/robux",

    "version": "2.0.0",

    "language": "pt-BR",

    "how_to_use_in_lovable": [

      "OPÇÃO 1 (Recomendada): Abra o Lovable.dev, crie um novo projeto e cole o conteúdo do campo 'lovable_master_prompt' abaixo, anexando também este arquivo JSON no chat do Lovable com a instrução: 'Construa a aplicação completa seguindo 100% da especificação deste arquivo JSON.'",

      "OPÇÃO 2 (Por Etapas): Envie primeiro a estrutura global + rota /robux (o Wizard de 5 etapas) e em seguida peça para o Lovable implementar as rotas complementares (/produtos, /perfil e /ranking) usando os dados exatos deste JSON."

    ]

  },

  "lovable_master_prompt": "Crie uma aplicação web completa, moderna e ultra-responsiva em React + TypeScript + Tailwind CSS + Framer Motion + Lucide Icons para uma loja de Robux e itens digitais do Roblox chamada 'NebulaBux' (identidade visual original inspirada na estrutura e fluxo da EclipseBuxx, porém com nome, copywriting e ativos adaptados para evitar direitos autorais).\n\nDIRETRIZES VISUAIS GERAIS:\n- Tema Dark Cosmic Neon: fundo principal #050507, cards em #0E0E14 com bordas sutis #1F1F2B e hover/focus em roxo/magenta vibrante (#A855F7 a #D946EF) com glow suave (box-shadow: 0 0 25px rgba(168, 85, 247, 0.35)).\n- Tipografia: 'Plus Jakarta Sans' ou 'Inter' para títulos/corpo e 'JetBrains Mono' para IDs de pedido, códigos Pix e valores numéricos.\n- Navbar fixa no topo com backdrop-blur: Logo 3D Lua/Nebulosa + texto 'Nebula' (branco) 'Bux' (gradiente roxo #A855F7 -> #EC4899), links ('Início', 'Robux', 'Produtos', 'Ranking', 'Como Funciona'), botão de Carrinho com contador e botão 'Fazer Login' (abre modal de login estilo Discord OAuth) que alterna para o menu do usuário logado ('Minhas Compras', 'Meu Perfil', 'Sair da Conta').\n\nPÁGINA PRINCIPAL DO FLUXO (/robux) — WIZARD INTERATIVO DE 5 ETAPAS:\nConstrua uma barra de progresso horizontal com 5 segmentos nomeados: 1. MÉTODO | 2. IDENTIFICAÇÃO | 3. PACOTE | 4. PAGAMENTO | 5. ENTREGA.\n1. Etapa MÉTODO:\n   - Título: 'Como deseja receber?' / Subtítulo: 'Escolha o método de entrega mais conveniente para você.'\n   - Dois cards lado a lado:\n     a) 'Gamepass' (Badge verde/roxo 'RECOMENDADO'): 'Crie uma passe no seu jogo e nós compramos.' Bullets com ícone verde: 'Mais seguro', 'Entrega rápida', 'Taxa de 30% coberta por nós'. Botão 'Selecionar ->'.\n     b) 'Grupo VIP' (Badge cinza 'EM DESENVOLVIMENTO', desabilitado): 'Você entra em nosso grupo oficial e transferimos os fundos.' Bullets: 'Entrar no grupo', '14 dias de espera do Roblox', 'Sem taxas adicionais'.\n   - Sub-etapa Termos ('Antes de continuarmos...'): mostra 2 cards informativos ('Prazo de Entrega: média de 10 minutos a 24h' e 'Segurança Total: nunca pedimos sua senha, apenas o nick') + checkbox obrigatório 'Li e concordo com os Termos de Serviço (Entendo que o reembolso só é possível antes do envio dos Robux)' + botões 'Cancelar' e 'Continuar ->'.\n2. Etapa IDENTIFICAÇÃO:\n   - Sub-etapa Busca ('Qual seu nick?'): Input com ícone de usuário, placeholder 'Ex: RobloxPlayer123' e botão de lupa roxo. Aviso inferior com cadeado: 'Não pedimos sua senha. Apenas o nick público.'\n   - Ao pesquisar, consulte a API pública de avatares/usuários (ou fallback inteligente realista) e exiba a Sub-etapa 'Confirme sua conta': avatar circular grande (120x120) com borda roxa e selo verde de check, Display Name, @username, badge 'ID: [id]' e dois botões: 'Não é essa conta' (volta para busca) e 'Sim, sou eu' (avança).\n3. Etapa PACOTE ('Selecione o Pacote'):\n   - Layout dividido em 2 colunas dentro do container:\n   - Coluna Esquerda ('Selecione o valor'): Grid 2x2 com pacotes pré-definidos ('1.000 ROBUX', '5.000 ROBUX' com badge 'POPULAR', '10.000 ROBUX', '25.000 ROBUX'). Divisor 'OU PERSONALIZE'. Controle 'QUANTIDADE PERSONALIZADA' com botões '-' e '+' e input numérico grande (mínimo 100, máximo 100.000 Robux). Campo 'Cupom de desconto' com botão 'APLICAR' (suporte aos cupons: NEBULA10 = 10% OFF, VIP5 = 5% OFF, PROMO15 = 15% OFF).\n   - Coluna Direita ('Resumo do pedido'): exibe Pacote selecionado, Método ('Gamepass'), Desconto (se houver), 'Total a pagar: R$ XX,XX' (taxa base: R$ 0,046 por Robux, ou R$ 46,00 para 1.000 Robux), botão largo 'Ir para Pagamento ->' e caixa de alerta destacada abaixo: 'Sua Gamepass deve custar X Robux (Taxa de 30% coberta)', onde X = Math.ceil(robuxDesejados / 0.70) (ex: 1.000 Robux -> 1.429 Robux; 186 Robux -> 266 Robux; 200 Robux -> 286 Robux).\n4. Etapa PAGAMENTO:\n   - Sub-etapa Seleção ('Como deseja pagar?'): Grid 2x2 com 'Pix' (Badge verde 'RECOMENDADO' - 'Aprovação imediata. O mais rápido.'), 'Boleto' ('EM BREVE' - 'Pode levar até 3 dias úteis.'), 'Cartão' ('EM BREVE' - 'Crédito ou Débito em até 12x.') e 'Cripto' ('EM BREVE' - 'Bitcoin, ETH, USDT.').\n   - Sub-etapa QR Code Pix ('Concluir pagamento'): exibe imagem real de QR Code dinâmico, campo 'Ou use o copia e cola:' com código Pix EMV e botão 'Copiar' (com feedback 'Copiado!'), valor 'TOTAL A PAGAR' e botão 'Confirmar pagamento'.\n   - Sub-etapa Confirmação ('Pagamento Confirmado!'): dispara animação de confetes, ícone de check verde, Status 'Aprovado', Valor pago, 'ID do Pedido' gerado automaticamente, aviso amarelo 'IMPORTANTE: Não feche a página até configurar sua Gamepass!' e botão 'Enviar Link da Gamepass ->'.\n5. Etapa ENTREGA:\n   - Sub-etapa Configuração da Gamepass: guia visual passo a passo ensinando a criar o Passe no Roblox Creator Dashboard, definir o preço exato com a taxa de 30% coberta (Math.ceil(robux / 0.70)) e DESATIVAR os 'Preços Regionais' (com alerta visual). Campo para colar o Link ou ID da Gamepass + botão 'Verificar e Confirmar Gamepass'.\n   - Sub-etapa Detalhes do Pedido + Chat ao Vivo: ao confirmar a Gamepass, exibe a tela final com 'Resumo do Pedido' na coluna esquerda (Tipo, Quantidade, Preço da Gamepass, Usuário Roblox, Data/Hora, Total) e 'Suporte ao Cliente (Em atendimento)' na coluna direita com mensagens automáticas do sistema e chat interativo em tempo real.\n\nPÁGINAS ADICIONAIS COMPLETAS:\n- Home (/): Hero Section com lua/nebulosa 3D flutuante, Carrossel 'Produtos em Destaque', seção interativa 'Entrega Rápida', seção 'Suporte Humanizado 24/7' com simulação de chat ao vivo e '+5 Staffs Disponíveis agora', FAQ e Rodapé com selo 'SISTEMAS OPERACIONAIS'.\n- Catálogo de Produtos (/produtos): filtro lateral por categoria ('Todos', 'Blox Fruits', 'Dress to Impress', 'Murder Mystery 2', 'Contas Minecraft'), busca por nome, ordenação ('Em Destaque', 'Menor preço', 'Maior preço') e carrinho lateral.\n- Painel do Usuário (/perfil) e Ranking Global (/ranking): histórico de pedidos com filtros de status, KPIs de fidelidade e pódio Top 3 compradores.",

  "anti_copyright_strategy": {

    "explanation": "Para evitar qualquer problema de direitos autorais (DMCA / copy) mantendo 100% da estrutura de alta conversão, usabilidade e riqueza visual da EclipseBuxx, os elementos proprietários foram substituídos por equivalentes originais:",

    "changes_mapped": [

      {

        "element": "Nome da Marca e Logo",

        "original_reference": "EclipSeBuxx (Lua crescente roxa com estrela de 4 pontas)",

        "safe_adaptation": "NebulaBux / AstraBux (Lua crescente cósmica neon com anéis orbitais duplos em gradiente violeta-magenta #A855F7 -> #EC4899)"

      },

      {

        "element": "Textos e Micro-copy",

        "original_reference": "Textos literais da landing page e termos",

        "safe_adaptation": "Reescrita persuasiva equivalente mantendo os mesmos gatilhos mentais (Sem banimentos, Entrega Rápida via Gamepass com 30% coberto, Suporte Humanizado 24/7)"

      },

      {

        "element": "Paleta de Cores",

        "original_reference": "#050507 background + #C026D3 / #A855F7 purple",

        "safe_adaptation": "#06060A background + #A855F7 (Purple 500) + #D946EF (Fuchsia 500) + #10B981 (Emerald 500 para badges de aprovação)"

      }

    ]

  },

  "design_system": {

    "colors": {

      "background_primary": "#06060A",

      "background_secondary": "#0E0E14",

      "surface_card": "#12121A",

      "surface_card_hover": "#181824",

      "border_subtle": "#1F1F2E",

      "border_active": "#A855F7",

      "primary_accent": "#A855F7",

      "secondary_accent": "#D946EF",

      "gradient_primary": "linear-gradient(135deg, #A855F7 0%, #D946EF 100%)",

      "gradient_glow": "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.22) 0%, rgba(6, 6, 10, 0) 70%)",

      "text_primary": "#FFFFFF",

      "text_secondary": "#A1A1AA",

      "text_muted": "#71717A",

      "status_success": "#10B981",

      "status_warning": "#F59E0B",

      "status_danger": "#EF4444",

      "discord_blurple": "#5865F2"

    },

    "typography": {

      "heading_font": "Plus Jakarta Sans, Inter, sans-serif",

      "body_font": "Inter, sans-serif",

      "mono_font": "JetBrains Mono, monospace",

      "sizes": {

        "hero_h1": "text-4xl md:text-6xl font-extrabold tracking-tight",

        "wizard_title": "text-2xl md:text-3xl font-bold text-white",

        "wizard_subtitle": "text-sm md:text-base text-zinc-400",

        "card_title": "text-lg font-semibold text-white",

        "badge": "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"

      }

    },

    "effects": {

      "card_radius": "rounded-2xl",

      "button_radius": "rounded-xl",

      "primary_button_shadow": "0 0 24px -4px rgba(192, 38, 211, 0.55)",

      "glassmorphism": "bg-[#0E0E14]/90 backdrop-blur-xl border border-white/10"

    }

  },

  "business_logic_and_formulas": {

    "robux_pricing": {

      "base_rate_brl_per_robux": 0.046,

      "promo_rate_brl_per_robux": 0.041,

      "min_custom_robux": 100,

      "max_custom_robux": 100000,

      "step_increment": 50,

      "preset_packages": [

        {

          "id": "pkg_1000",

          "robux": 1000,

          "label": "1.000",

          "sublabel": "ROBUX",

          "price_brl": 46.0,

          "promo_price_brl": 41.0,

          "gamepass_required_robux": 1429,

          "popular": false

        },

        {

          "id": "pkg_5000",

          "robux": 5000,

          "label": "5.000",

          "sublabel": "ROBUX",

          "price_brl": 230.0,

          "promo_price_brl": 205.0,

          "gamepass_required_robux": 7143,

          "popular": true,

          "badge": "POPULAR"

        },

        {

          "id": "pkg_10000",

          "robux": 10000,

          "label": "10.000",

          "sublabel": "ROBUX",

          "price_brl": 460.0,

          "promo_price_brl": 410.0,

          "gamepass_required_robux": 14286,

          "popular": false

        },

        {

          "id": "pkg_25000",

          "robux": 25000,

          "label": "25.000",

          "sublabel": "ROBUX",

          "price_brl": 1150.0,

          "promo_price_brl": 1025.0,

          "gamepass_required_robux": 35715,

          "popular": false

        }

      ],

      "formulas_js": {

        "calculateTotalBrl": "const totalBrl = Number((robuxAmount * 0.046 * (1 - discountPercent / 100)).toFixed(2));",

        "calculateGamepassPriceWithTax": "const gamepassPrice = Math.ceil(robuxAmount / 0.70); // Cobre exatamente a taxa de 30% do Roblox (ex: 1000 -> 1429, 186 -> 266, 200 -> 286)",

        "calculateInstallment12x": "const installment = Number((priceBrl / 12).toFixed(2));"

      }

    },

    "coupons": [

      {

        "code": "NEBULA10",

        "discount_percent": 10,

        "description": "10% de desconto em qualquer pacote"

      },

      {

        "code": "INSTAGRAM5",

        "discount_percent": 5,

        "description": "5% de desconto oficial do Instagram"

      },

      {

        "code": "UNI",

        "discount_percent": 5,

        "description": "Cupom de parceiro 5%"

      },

      {

        "code": "RREZE",

        "discount_percent": 5,

        "description": "Cupom de criador 5%"

      },

      {

        "code": "PROMO15",

        "discount_percent": 15,

        "description": "15% de desconto especial"

      }

    ]

  },

  "assets_and_images": {

    "brand_visuals": {

      "hero_3d_moon_svg_prompt": "Renderize um componente SVG/Canvas 3D de alta definição com uma lua crescente roxa brilhante (#A855F7 -> #D946EF) envolvida por dois anéis orbitais brancos/lilás luminosos e uma estrela cintilante de 4 pontas no centro, com animação float suave (translateY -12px em 4s infinite ease-in-out).",

      "roblox_coin_icon": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Robux_2019_Logo_gold.svg",

      "gamepass_ticket_preview": "https://tr.rbxcdn.com/180DAY-6e9c1b8d6c9dd473b888749fe8e57dc8/420/420/BackAccessory/Png/noFilter"

    },

    "dynamic_apis_for_lovable": {

      "roblox_avatar_lookup_explanation": "Para buscar o avatar real do jogador no Passo 2 (Identificação), use um proxy CORS ou fallback inteligente com avatares reais do CDN do Roblox (tr.rbxcdn.com).",

      "sample_verified_accounts": [

        {

          "username": "LarahUny",

          "displayName": "UniGirlBlox",

          "userId": "1165056396",

          "avatarUrl": "https://api.dicebear.com/9.x/adventurer/svg?seed=UniGirlBlox&backgroundColor=2e1065"

        },

        {

          "username": "RobloxPlayer123",

          "displayName": "PlayerPro_BR",

          "userId": "2849104821",

          "avatarUrl": "https://api.dicebear.com/9.x/adventurer/svg?seed=RobloxPlayer123&backgroundColor=3b0764"

        },

        {

          "username": "decency1otus",

          "displayName": "decency1otus",

          "userId": "4918273645",

          "avatarUrl": "https://api.dicebear.com/9.x/adventurer/svg?seed=decency1otus&backgroundColor=4c1d95"

        }

      ],

      "pix_qr_code_generator_url": "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=00020101021226830014BR.GOV.BCB.PIX2561qrcodes-pix.nebulabux.com/v2/cob/nebula-robux-instant5204000053039865802BR5913NEBULABUX_LTD6009SAO_PAULO62070503***6304E2A1"

    },

    "catalog_products": [

      {

        "id": "prod_fruit_notifier",

        "category": "BLOXFRUITS",

        "category_badge": "⚡ BLOXFRUITS",

        "title": "Fruit Notifier",

        "price_brl": 97.2,

        "installment_text": "12x de R$ 8,10",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#A855F7"

      },

      {

        "id": "prod_custom_makeup",

        "category": "DRESS TO IMPRESS",

        "category_badge": "👗 DRESS TO IMPRESS",

        "title": "Maquiagem Personalizada",

        "price_brl": 17.9,

        "installment_text": "12x de R$ 1,49",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#EC4899"

      },

      {

        "id": "prod_quake",

        "category": "BLOXFRUITS",

        "category_badge": "⚡ BLOXFRUITS",

        "title": "Quake Permanente",

        "price_brl": 54.0,

        "installment_text": "12x de R$ 4,50",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#3B82F6"

      },

      {

        "id": "prod_dragon",

        "category": "BLOXFRUITS",

        "category_badge": "⚡ BLOXFRUITS",

        "title": "Dragon Permanente",

        "price_brl": 180.0,

        "installment_text": "12x de R$ 15,00",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#F59E0B"

      },

      {

        "id": "prod_vip_dti",

        "category": "DRESS TO IMPRESS",

        "category_badge": "👗 DRESS TO IMPRESS",

        "title": "VIP Mensal e Permanente",

        "price_brl": 16.9,

        "installment_text": "12x de R$ 1,41",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#EAB308"

      },

      {

        "id": "prod_2x_money",

        "category": "BLOXFRUITS",

        "category_badge": "⚡ BLOXFRUITS",

        "title": "2x Money",

        "price_brl": 16.2,

        "installment_text": "12x de R$ 1,35",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#10B981"

      },

      {

        "id": "prod_fast_walk",

        "category": "DRESS TO IMPRESS",

        "category_badge": "👗 DRESS TO IMPRESS",

        "title": "Correr Rápido (Run Faster)",

        "price_brl": 7.5,

        "installment_text": "12x de R$ 0,63",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#D946EF"

      },

      {

        "id": "prod_item_limit",

        "category": "DRESS TO IMPRESS",

        "category_badge": "👗 DRESS TO IMPRESS",

        "title": "Limite de Itens (+6 Itens)",

        "price_brl": 6.5,

        "installment_text": "12x de R$ 0,54",

        "pix_label": "à vista no Pix",

        "featured": true,

        "image_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#A855F7"

      },

      {

        "id": "prod_dark_blade",

        "category": "BLOXFRUITS",

        "category_badge": "⚡ BLOXFRUITS",

        "title": "Dark Blade",

        "price_brl": 43.2,

        "installment_text": "12x de R$ 3,60",

        "pix_label": "à vista no Pix",

        "featured": false,

        "image_url": "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#9333EA"

      },

      {

        "id": "prod_mm2_borealis",

        "category": "MURDER MYSTERY 2",

        "category_badge": "🔪 MURDER MYSTERY 2",

        "title": "Set - Borealis Godly",

        "price_brl": 17.0,

        "installment_text": "12x de R$ 1,42",

        "pix_label": "à vista no Pix",

        "featured": false,

        "image_url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#06B6D4"

      },

      {

        "id": "prod_mm2_harvester",

        "category": "MURDER MYSTERY 2",

        "category_badge": "🔪 MURDER MYSTERY 2",

        "title": "Godly - Harvester",

        "price_brl": 21.0,

        "installment_text": "12x de R$ 1,75",

        "pix_label": "à vista no Pix",

        "featured": false,

        "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#10B981"

      },

      {

        "id": "prod_french_luxury",

        "category": "DRESS TO IMPRESS",

        "category_badge": "👗 DRESS TO IMPRESS",

        "title": "French Luxury Set",

        "price_brl": 11.72,

        "installment_text": "12x de R$ 0,98",

        "pix_label": "à vista no Pix",

        "featured": false,

        "image_url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=80",

        "glow_color": "#EC4899"

      }

    ],

    "ready_to_use_svg_components": {

      "cosmic_moon_hero_svg": "<svg viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'><defs><radialGradient id='nebulaGlow' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='#D946EF' stop-opacity='0.45'/><stop offset='60%' stop-color='#

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0d7279e1-85b1-42f8-a1c0-e29c12e963bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
