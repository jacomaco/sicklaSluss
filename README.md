# Sicklaslussen – webbplats

Hemsida för föreningen/locken Sicklaslussen, byggd med **Eleventy** (statisk webbplats).
Sidan är även tillgänglig på engelska och deployas till GitHub Pages.

## Teknisk översikt

| Del                | Verktyg                                          |
|--------------------|--------------------------------------------------|
| Statisk byggare     | [Eleventy](https://www.11ty.dev) (npm)           |
| Innehåll            | Markdown i `src/`                                |
| Språk/teckenkoder  | `src/_includes/base.njk` + `src/assets/css/`     |
| Byggresultat        | `_site/`                                         |
| Hosting            | GitHub Pages (statiskt) – domän pekas via DNS     |

## Kom igång lokalt

```bash
npm install
npm run dev      # startar utvecklingsserver med live-uppdatering
npm run build    # bygger sidan till _site/
```

## Projektets struktur

```
sicklaSluss/
├── eleventy.config.js       # Eleventy-konfiguration
├── package.json             # npm-skript (dev/build)
├── templates/
│   └── nyhet-mall.md        # Mall att kopiera när du lägger till en nyhet
└── src/
    ├── _data/site.json      # Webbplatsuppgifter, meny, telefonnummer, sponsorer
    ├── _includes/           # Layout och partials (header/nav/sidebar/footer)
    ├── assets/css/main.css  # All styling
    ├── static/images/       # Alla bilder (logga, slussbilder, sponsorer)
    ├── static/pdf/          # PDF:er läggs här
    ├── *.md                 # Sidorna (index, att-slussa, historik …)
    └── nyheter/*.md         # Varje nyhet är en egen Markdown-fil
```

## Så här lägger du till en nyhet (viktigast för redaktionen)

1. Gå till `src/nyheter/` i repot.
2. Kopiera mallen från `templates/nyhet-mall.md`.
3. Döp den nya filen till `YYYY-MM-DD-kort-om-nyheten.md` (t.ex. `2026-06-01-slussdagen.md`).
4. Fyll i `date`, `title` och `summary` i front matter (upptill i filen).
5. Spara och lägg upp ändringen – nyheten dyker automatiskt upp på **startsidan** och under **Nyheter**.

Front matter i en nyhetsfil ser ut så här:

```yaml
---
layout: base.njk
title: Här är rubriken
date: 2026-06-01
tags: news
summary: Här är en kort sammanfattning som visas på startsidan.
---
```

## Så här lägger du till ett bildreportage

1. Skapa mappen `src/bildreportage/YYYY-MM-DD-kort-titel/`.
2. Lägg bilderna i `src/static/images/bildreportage/YYYY-MM-DD-kort-titel/`.
3. Skapa `src/bildreportage/YYYY-MM-DD-kort-titel.md` med front matter:

```yaml
---
layout: base.njk
title: Min rubrik
date: 2026-06-01
tags: album
---
```

4. Skriv in bilderna i filen med `![alt](/static/images/bildreportage/…​)` – du får en automatisk lista under »Bildreportage«.

## Så lägger du till en PDF

1. Lägg filen i `src/static/pdf/...`
2. Länka till den med `[länktext](/static/pdf/filnamn.pdf)`.

OBS: Äldre artiklar på `artiklar.md` länkar tills vidare till den befintliga sajten – byt ut när filerna flyttats in lokalt.

## Så här publicerar du (deploy)

Servern publikläggs med: 

- **Lokalt:** `npm run build` och ladda upp innehållet i `_site/` 
- **Automatiskt:** se GitHub Actions (`deploy.yml`) som bygger och publicerar till GitHub Pages vid push till `main`.

Peka `sicklasluss.se` mot GitHub Pages (A-records) och behåll MX för e-post (Simply.com).

## Meny, telefonnummer och sponsorer

Allt finns i `src/_data/site.json` – justera där om telefonnummer, meny eller sponsorer ändras.