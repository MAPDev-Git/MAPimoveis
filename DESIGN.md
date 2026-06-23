---
version: "1.0"
name: "MAP Real Estate — Warm Editorial"
description: "Anthropic-style warm slate-on-ivory editorial system, adapted for MAP Real Estate. Ivory paper canvas, slate-dark light-mode CTA, MAP bordô brand accent (from the logo), Anthropic Serif body/display, Anthropic Sans UI/headings, alpha borders, 8px radius."
defaultMode: "light"
supportsDark: true
archetype: "Warm Editorial · Slate-on-Ivory · MAP Bordô"
brand: "Marco Antonio Prat · MAP Real Estate"
chips:
  - "Serif body"
  - "Slate CTA #141413"
  - "MAP Bordô #9B0E0E"
  - "Clay #d97757"
  - "Radius 8px"

# ---------------------------------------------------------------------------
# 1. CORES — Anthropic base + cores extraídas da logo MAP Real Estate
# ---------------------------------------------------------------------------

colors:
  # --- Semantic UI color slots (Anthropic base, mantido) ---
  primary: "#141413"            # slate-dark — light-mode primary CTA
  primary-foreground: "#faf9f5" # ivory-light
  secondary: "#f0eee6"          # ivory-medium — secondary surface
  secondary-foreground: "#141413"
  tertiary: "#788c5d"           # olive — third accent
  neutral: "#5e5d59"            # slate-light
  background: "#faf9f5"         # ivory-light
  foreground: "#141413"         # slate-dark
  surface: "#faf9f5"
  surface-foreground: "#141413"
  card: "#ffffff"
  card-foreground: "#141413"
  muted: "#f0eee6"
  muted-foreground: "#5e5d59"
  accent: "#9B0E0E"             # MAP Bordô — brand accent (substitui clay como identidade da MAP)
  accent-foreground: "#faf9f5"
  destructive: "#b43232"
  destructive-foreground: "#ffffff"
  border: "#1414131a"           # slate at 10% opacity (alpha)
  input: "#e8e6dc"
  ring: "#9B0E0E"               # MAP Bordô — focus ring
  success: "#2f7613"
  warning: "#865a07"
  info: "#6a9bcc"

  # --- MAP Real Estate brand swatches (extraídas da logo) ---
  map-bordo: "#9B0E0E"          # tom médio do gradiente do "map" — cor primária da marca
  map-bordo-deep: "#7B0A0A"     # topo do gradiente — bordô profundo, hover/emphasis
  map-bordo-bright: "#C00000"   # base do gradiente — vermelho vivo, highlights raros
  map-ink: "#1A1A1A"            # cor do "p" e do texto "RealEstate" — quase preto
  map-bordo-soft: "#f4d9d9"     # wash claro de bordô — fundos suaves, badges

  # --- Clay (Anthropic) — mantida como acento secundário cálido ---
  clay: "#d97757"
  clay-deep: "#c6613f"
  clay-soft: "#f2d9ce"

  # --- M3 surface ladder ---
  surface-container-low: "#faf9f5"
  surface-container: "#f0eee6"
  surface-container-high: "#e8e6dc"
  surface-container-highest: "#d1cfc5"
  surface-bright: "#9B0E0E"     # MAP Bordô — painel editorial de marca
  surface-dim: "#b0aea5"
  surface-inverse: "#141413"
  surface-inverse-foreground: "#faf9f5"

  # --- Aliases semânticos ---
  primary-deep: "#3d3d3a"       # slate-medium (hover do CTA primário)
  paper: "#f0eee6"
  paper-deep: "#e8e6dc"
  ink: "#141413"
  ink-soft: "#3d3d3a"
  ink-muted: "#5e5d59"

  # --- Anthropic editorial extras (mantidos) ---
  ivory-light: "#faf9f5"
  ivory-medium: "#f0eee6"
  ivory-dark: "#e8e6dc"
  slate-dark: "#141413"
  slate-medium: "#3d3d3a"
  slate-light: "#5e5d59"
  cloud-dark: "#87867f"
  cloud-medium: "#b0aea5"
  cloud-light: "#d1cfc5"
  olive: "#788c5d"
  sky: "#6a9bcc"
  kraft: "#d4a27f"
  manilla: "#ebdbbc"
  oat: "#e3dacc"
  white: "#ffffff"

# ---------------------------------------------------------------------------
# 2. DARK MODE
# ---------------------------------------------------------------------------

dark:
  background: "#1A1A1A"         # MAP ink — alinhado com a logo
  foreground: "#faf9f5"
  card: "#242322"
  card-foreground: "#faf9f5"
  primary: "#9B0E0E"            # MAP Bordô assume o CTA no dark
  primary-foreground: "#faf9f5"
  secondary: "#1f1e1d"
  secondary-foreground: "#faf9f5"
  muted: "#141413"
  muted-foreground: "#9a9790"
  accent: "#9B0E0E"
  accent-foreground: "#faf9f5"
  border: "#d1cfc5"             # cloud-light hairline em dark
  ring: "#9B0E0E"
  surface-inverse: "#faf9f5"
  surface-inverse-foreground: "#1A1A1A"

# ---------------------------------------------------------------------------
# 3. TIPOGRAFIA
# ---------------------------------------------------------------------------

fonts:
  display: "'Anthropic Serif', 'Source Serif 4', Georgia, serif"
  body: "'Anthropic Serif', 'Source Serif 4', Georgia, serif"
  eyebrow: "'Anthropic Sans', 'Inter', Arial, sans-serif"
  mono: "'Anthropic Mono', 'JetBrains Mono', ui-monospace, monospace"
  sans: "'Anthropic Sans', 'Inter', Arial, sans-serif"

typography:
  display:    { family: serif, size: 72px, weight: 400, lh: 1.1,  tracking: "-0.02em" }
  heading:    { family: sans,  size: 48px, weight: 700, lh: 1.1,  tracking: "-0.02em" }
  title:     { family: sans,  size: 32px, weight: 700, lh: 1.1,  tracking: "-0.015em" }
  subtitle:  { family: sans,  size: 24px, weight: 600, lh: 1.2,  tracking: "-0.01em" }
  body-lg:    { family: serif, size: 20px, weight: 400, lh: 1.4,  tracking: "0em" }
  body:       { family: serif, size: 18px, weight: 400, lh: 1.55, tracking: "0em" }
  body-sm:    { family: serif, size: 16px, weight: 400, lh: 1.4,  tracking: "0em" }
  label:      { family: sans,  size: 14px, weight: 500, lh: 1.4,  tracking: "-0.005em" }
  caption:    { family: sans,  size: 12px, weight: 400, lh: 1.4,  tracking: "0em" }

case-rule: "Sentence case everywhere. No uppercase transformations."

# ---------------------------------------------------------------------------
# 4. ESPAÇAMENTO, RAIOS, SOMBRAS
# ---------------------------------------------------------------------------

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "128px"
  site-margin: "80px"
  site-gutter: "24px"
  container-max: "1400px"

rounded:
  none: "0px"
  sm: "4px"      # buttons, chips, inputs
  md: "6px"
  lg: "8px"      # cards, avatars, panels (default)
  xl: "16px"     # alerts and featured blocks only
  full: "9999px"

shadows:
  paper: "0 1px 0 rgba(20, 20, 19, 0.12)"
  soft:  "0 8px 24px -12px rgba(20, 20, 19, 0.12)"
  bordo: "0 16px 40px -16px rgba(155, 14, 14, 0.35)"   # bordô elevation (substitui clay-shadow)
  raised:    "0 1px 6px rgba(0, 0, 0, 0.10)"
  floating:  "0 2px 2px rgba(0,0,0,0.012), 0 4px 4px rgba(0,0,0,0.02), 0 16px 24px rgba(0,0,0,0.04)"
  overlay:   "0 16px 40px rgba(20, 20, 19, 0.14)"
  modal:     "0 24px 64px rgba(20, 20, 19, 0.18)"

motion:
  duration-fast: "150ms"
  duration-normal: "200ms"
  duration-gentle: "350ms"
  ease-out: "cubic-bezier(0, 0, 0.2, 1)"
  ease-in-out: "cubic-bezier(0.4, 0, 0.2, 1)"
  press: "none"           # SEM scale press
  hover-opacity: "1"

# ---------------------------------------------------------------------------
# 5. COMPONENTES
# ---------------------------------------------------------------------------

components:
  button-primary:
    bg: "#141413"                # slate-dark (CTA no light mode — regra Anthropic)
    text: "#faf9f5"
    border: "#141413"
    rounded: "4px"
    height: "48px"
    padding: "14px 24px"
    shadow: "0 4px 4px rgba(8,8,8,0.08), 0 1px 2px rgba(8,8,8,0.20), inset 0 6px 12px rgba(255,255,255,0.12), inset 0 1px 1px rgba(255,255,255,0.19)"
    hover-bg: "#3d3d3a"

  button-bordo:                  # CTA opcional de marca — usar em dark/inverse ou momento de identidade MAP
    bg: "#9B0E0E"
    text: "#faf9f5"
    border: "#9B0E0E"
    rounded: "4px"
    height: "48px"
    padding: "14px 24px"
    shadow: "0 4px 4px rgba(8,8,8,0.08), 0 1px 2px rgba(8,8,8,0.20), inset 0 6px 12px rgba(255,255,255,0.12), inset 0 1px 1px rgba(255,255,255,0.19)"
    hover-bg: "#7B0A0A"

  button-secondary:
    bg: "transparent"
    text: "#141413"
    border: "#141413"
    rounded: "4px"
    height: "48px"
    hover-bg: "#141413"
    hover-text: "#faf9f5"

  button-ghost:
    bg: "transparent"
    text: "#141413"
    border: "rgba(20,20,19,0.12)"
    rounded: "4px"

  card:
    bg: "#ffffff"
    rounded: "8px"
    padding: "24px"
    border: "#1414131a"
    shadow: "0 1px 6px rgba(0, 0, 0, 0.10)"
    hover-bg: "#1414130a"
    hover-shadow: "0 2px 2px rgba(0,0,0,0.012), 0 4px 4px rgba(0,0,0,0.02), 0 16px 24px rgba(0,0,0,0.04)"

  input:
    bg: "#faf9f5"
    border: "#1414131a"
    rounded: "4px"
    padding: "12px 14px"
    focus-ring: "#9B0E0E"        # MAP Bordô focus

  badge:
    bg: "#f0eee6"
    text: "#5e5d59"
    border: "#1414131a"
    rounded: "9999px"
    padding: "4px 10px"

  badge-bordo:
    bg: "#f4d9d9"
    text: "#7B0A0A"
    border: "#9B0E0E33"
    rounded: "9999px"

  nav-header:
    bg: "#faf9f5"
    text: "#141413"
    border-bottom: "#1414131a"
    height: "64px"

  inverse-section:
    bg: "#141413"
    text: "#faf9f5"
    padding: "96px 64px"

# ---------------------------------------------------------------------------
# 6. REGRAS DA MARCA MAP (do-and-don't)
# ---------------------------------------------------------------------------

do:
  - "Ivory canvas (#faf9f5), slate-dark CTA, MAP bordô como acento de identidade."
  - "Body em Serif (Anthropic Serif / Source Serif 4 fallback)."
  - "Headings em Sans (Anthropic Sans / Inter fallback)."
  - "Sentence case em tudo. text-transform: none."
  - "Bordas em alpha (rgba(20,20,19,0.10)), nunca cinza sólido."
  - "Cards brancos (#ffffff), 8px de raio."
  - "Botão primário: slate-dark com inset highlight."
  - "MAP Bordô (#9B0E0E) em: focus rings, links hover, brand mark, badges de destaque, painéis editoriais inversos."
  - "Em dark mode ou seção inversa: MAP Bordô pode ser CTA primário."

dont:
  - "NÃO usar bordô como fill do CTA primário no light mode (slate domina o light)."
  - "NÃO usar raio 16px em cards padrão (só em alerts/featured)."
  - "NÃO usar uppercase / letter-spacing exagerado."
  - "NÃO adicionar scale press em botões."
  - "NÃO usar bordas sólidas cinza (#e8e6dc) — use sempre alpha."
  - "NÃO usar bordô e clay no mesmo bloco sem hierarquia — bordô é a identidade da MAP, clay é apenas acento cálido secundário."

# ---------------------------------------------------------------------------
# 7. SNIPPET CSS DE REFERÊNCIA
# ---------------------------------------------------------------------------

css-snippet: |
  :root {
    /* Surface & ink */
    --background: #faf9f5;
    --foreground: #141413;
    --card: #ffffff;
    --card-foreground: #141413;
    --muted: #f0eee6;
    --muted-foreground: #5e5d59;
    --border: rgba(20, 20, 19, 0.10);

    /* CTA */
    --primary: #141413;
    --primary-foreground: #faf9f5;
    --primary-hover: #3d3d3a;

    /* MAP brand */
    --brand: #9B0E0E;
    --brand-deep: #7B0A0A;
    --brand-bright: #C00000;
    --brand-soft: #f4d9d9;
    --ring: var(--brand);

    /* Radii */
    --radius-sm: 4px;
    --radius-lg: 8px;
    --radius-xl: 16px;
  }

# ---------------------------------------------------------------------------
# 8. CHECKLIST DE APLICAÇÃO NESTE SITE
# ---------------------------------------------------------------------------

applied-changes:
  - "Removido item 'Depoimentos' do menu de navegação."
  - "Removidas as estatísticas (250+ imóveis, 15 anos, 98% clientes) da hero section."
  - "Seção 'Serviços completos' renomeada para 'Serviços'."
  - "Item 'Locação' substituído por 'Avaliação de Imóveis'."
  - "Logo do topo trocada por assets/logo-map.png."
  - "Foto do corretor substituída por assets/marco.png."
  - "Paleta convertida do antigo gold+navy para Anthropic warm editorial + MAP bordô."
