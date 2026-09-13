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
├── eleventy.config.js       # Eleventy-konfiguration + bildgenerering
├── package.json             # npm-skript (dev/build)
├── templates/
│   ├── nyhet-mall.md        # Mall att kopiera när du lägger till en nyhet
│   └── bildreportage-mall.md# Mall för ett nytt bildalbum
└── src/
    ├── _data/site.json      # Webbplatsuppgifter, meny, telefonnummer, sponsorer
    ├── _includes/           # Layout och partials (header/nav/sidebar/footer)
    ├── assets/              # CSS + JS (ljuslåda för bildalbum)
    ├── images/bildreportage/# Originalfoton per album (byggs ned av eleventy-img)
    ├── static/images/       # Alla övriga bilder (logga, slussbilder, sponsorer)
    ├── static/pdf/          # PDF:er läggs här
    ├── *.md                 # Sidorna (index, att-slussa, historik …)
    ├── nyheter/*.md         # Varje nyhet är en egen Markdown-fil
    └── bildreportage/*.md   # Varje album är en egen Markdown-fil
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

1. Skapa en mapp `src/images/bildreportage/YYYY-MM-DD-kort-titel/` och lägg in fotona där (jpeg/png).
2. Kopiera `templates/bildreportage-mall.md` till `src/bildreportage/YYYY-MM-DD-kort-titel.md` och fyll i `title`, `date`, `folder` samt listan över bildfiler.
3. Spara – bygget genererar automatiskt tumnaglar och fullstora webboptimerade bilder (webp/jpeg), och albumet dyker upp på **Bildreportage**.

Bilder publiceras endast i webboptimerad form; originalfilerna finns kvar i repot och skickas **inte** till besökarna.

Front matter i en albumfil ser ut så här:

```yaml
---
layout: album.njk
title: 2026-06-01 Slussdagen
date: 2026-06-01
tags:
  - album
folder: 2026-06-01-slussdagen
images:
  - "01_foto.jpg"
  - "02_foto.jpg"
---
```

## Så lägger du till en PDF

1. Lägg filen i `src/static/pdf/...`
2. Länka till den med `[länktext](/static/pdf/filnamn.pdf)`.

Artikelfilerna (PDF + äldre htm-sidor) ligger under `src/static/artiklar/` och artikel-listan i `src/artiklar.md` pekar på dem lokalt.

## Så här publicerar du (deploy)

Servern publikläggs med: 

- **Lokalt:** `npm run build` och ladda upp innehållet i `_site/` 
- **Automatiskt:** se GitHub Actions (`deploy.yml`) som bygger och publicerar till GitHub Pages vid push till `main`.

> **OBS (tillfälligt):** `pathPrefix` är satt till `"sicklaSluss"` i `eleventy.config.js` eftersom sidan just nu testas på `jacomaco.github.io/sicklaSluss/`. Alla interna länkar använder `url`-filtret och funkar därför automatiskt på vilken sökväg som helst. När sajten ska driftsättas på riktiga domänen `sicklasluss.se` ändrar man bara `pathPrefix` till `"/"` (eller tar bort raden) och lägger tillbaka `src/CNAME` med innehållet `sicklasluss.se`.

Peka `sicklasluss.se` mot GitHub Pages (A-records) och behåll MX för e-post (Simply.com).

## Meny, telefonnummer och sponsorer

Allt finns i `src/_data/site.json` – justera där om telefonnummer, meny eller sponsorer ändras.