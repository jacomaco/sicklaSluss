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
├── .pages.yml                # Pages CMS (innehållshantering i webbläsaren)
├── eleventy.config.js       # Eleventy-konfiguration + bildgenerering
├── package.json             # npm-skript (dev/build)
├── templates/
│   ├── nyhet-mall.md        # Mall att kopiera när du lägger till en nyhet
│   ├── bildreportage-mall.md# Mall för ett nytt bildalbum
│   └── artikel-mall.md      # Mall för artiklar till artiklar-arkivet
└── src/
    ├── _data/site.json      # Webbplatsuppgifter, meny, telefonnummer, sponsorer
    ├── _includes/           # Layout och partials (header/nav/sidebar/footer)
    ├── assets/              # CSS + JS (ljuslåda för bildalbum)
    ├── images/bildreportage/# Originalfoton per album (byggs ned av eleventy-img)
    ├── static/images/       # Alla övriga bilder (logga, slussbilder, sponsorer)
    ├── static/pdf/          # PDF:er läggs här
    ├── static/artiklar/     # Artiklars PDF/htm-filer
    ├── *.md                 # Sidorna (index, att-slussa, historik …)
    ├── nyheter/*.md         # Varje nyhet är en egen Markdown-fil
    ├── historik/*.md        # Undersidor (t.ex. Ångslupar)
    ├── artiklar/*.md        # Metadata-filer för artiklarna (ej publika)
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
2. Kopiera `templates/bildreportage-mall.md` till `src/bildreportage/YYYY-MM-DD-kort-titel.md` och fyll i `title`, `date` och `folder`.
3. Se till att `folder`-värdet är exakt samma som mappnamnet i steg 1.
4. Spara – bygget genererar automatiskt tumnaglar och fullstora webboptimerade bilder (webp/jpeg), och albumet dyker upp på **Bildreportage**.

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
---
```

Bildlistan behövs inte längre – galleriet byggs automatiskt utifrån mappen `src/images/bildreportage/<folder>/`.

## Så här lägger du till en artikel

Artiklarna i arkivet är metadata-filer i `src/artiklar/` som renderas på sidan **Artiklar**. Varje fil pekar på en PDF/htm i `src/static/artiklar/`.

1. Lägg filen (pdf/htm) i `src/static/artiklar/`.
2. Kopiera `templates/artikel-mall.md` till `src/artiklar/` med ett kort, unikt filnamn.
3. Fyll i `title`, `label` (datum som visas), `date` (sortering), `type` (A/I/N), `group` (ny/ark) och lämplig `file`/`pdf`/`link`/`attr`.

Framtida datum i `date` sorterar högst upp; skriv `group: ark` för äldre material.

## Så lägger du till en PDF

1. Lägg filen i `src/static/pdf/...`
2. Länka till den med `[länktext](/static/pdf/filnamn.pdf)` – även undersidor (t.ex. `src/historik/*.md`) kan länka pdf:er på samma sätt.

Artikelfilerna (PDF + äldre htm-sidor) ligger under `src/static/artiklar/` och metadata-filerna i `src/artiklar/` pekar på dem.

## Innehållshantering med Pages CMS

Repot är anslutet till [Pages CMS](https://app.pagescms.org) via konfigurationen i `.pages.yml`. Redaktionen kan då redigera nyheter, bildreportage, artiklar, sidorna och webbplatsinställningarna direkt i webbläsaren utan att röra git.

1. En administratör för repots GitHub-konto installerar Pages CMS GitHub App och bjuder in redaktionen (Settings → Collaborators).
2. Öppna `https://app.pagescms.org/<ägare>/sicklaSluss` och logga in.
3. Ändringar som görs skickas automatiskt som commits till repot → GitHub Actions bygger om och publicerar sajten.

Notera:
- `settings.content.merge: true` i `.pages.yml` gör att CMS:et bevarar front matter som `layout`/`tags` när en fil sparas.
- För att ett nytt album ska visa bilder måste mappen `src/images/bildreportage/<folder>/` finnas med samma namn som `folder`-fältet. Ladda upp bilder via mediabiblioteket "Bildreportagebilder" i CMS:et.
- Förstasidan (`src/index.md`) innehåller loopar och tas därför inte fram som ett vanligt CMS-fält – den redigeras i filen direkt.

## Så här publicerar du (deploy)

Servern publikläggs med: 

- **Lokalt:** `npm run build` och ladda upp innehållet i `_site/` 
- **Automatiskt:** se GitHub Actions (`deploy.yml`) som bygger och publicerar till GitHub Pages vid push till `main`.

> **OBS (tillfälligt):** `pathPrefix` är satt till `"sicklaSluss"` i `eleventy.config.js` eftersom sidan just nu testas på `jacomaco.github.io/sicklaSluss/`. Alla interna länkar använder `url`-filtret och funkar därför automatiskt på vilken sökväg som helst. När sajten ska driftsättas på riktiga domänen `sicklasluss.se` ändrar man bara `pathPrefix` till `"/"` (eller tar bort raden) och lägger tillbaka `src/CNAME` med innehållet `sicklasluss.se`.

Peka `sicklasluss.se` mot GitHub Pages (A-records) och behåll MX för e-post (Simply.com).

## Meny, telefonnummer och sponsorer

Allt finns i `src/_data/site.json` – justera där om telefonnummer, meny eller sponsorer ändras.