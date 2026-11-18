# Sicklaslussen – webbplats

Hemsida för föreningen/locken Sicklaslussen, byggd med **Eleventy** (statisk webbplats).
Sidan är även tillgänglig på engelska och deployas till GitHub Pages.

## Teknisk översikt

| Del                | Verktyg                                          |
|--------------------|--------------------------------------------------|
| Statisk byggare     | [Eleventy](https://www.11ty.dev) (npm)           |
| Innehåll            | Markdown i `src/`                                |
| Innehållshantering  | [Pages CMS](https://app.pagescms.org) (i webbläsaren) |
| Sökfunktion         | [Pagefind](https://pagefind.app/) (statiskt index) |
| Bildoptimering      | [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/) + sharp |
| Språk/teckenkoder  | `src/_includes/base.njk` + `src/assets/css/`     |
| Byggresultat        | `_site/`                                         |
| Hosting            | GitHub Pages (statiskt) – domän pekas via DNS     |

## Kom igång lokalt

```bash
npm install
npm run dev          # bygger, indexerar sökningen och startar utvecklingsservern
npm run build        # bygger sidan till _site/ (inkl. sökindex)
npm run clean        # rensar _site/ om bilder känns inaktuella
npm run check:links  # kontrollerar alla interna länkar i _site/
```

Första bygget bearbetar alla ~1 000 albumfoton och tar därför någon minut.
Därefter återanvänds filerna i `_site/static/images/` (filnamnen innehåller en
hash av källbilden), så ombyggnationer tar bara några sekunder.

## Projektets struktur

```
sicklaSluss/
├── .pages.yml                # Pages CMS (innehållshantering i webbläsaren)
├── eleventy.config.mjs      # Eleventy-konfiguration + bildgenerering
├── package.json             # npm-skript (dev/build/clean/check:links)
├── scripts/check-links.mjs  # Länkkontroll av byggda sidor
├── docs/                    # Guider (CMS, DNS/överlämning, förslag till styrelsen)
├── templates/
│   ├── nyhet-mall.md        # Mall att kopiera när du lägger till en nyhet
│   ├── bildreportage-mall.md# Mall för ett nytt bildalbum
│   └── artikel-mall.md      # Mall för artiklar till artiklar-arkivet
└── src/
    ├── _data/site.json      # Webbplatsuppgifter, meny, telefonnummer, sponsorer
    ├── _data/kalendarium.json # Öppettider och slussdagar (år, datum, evenemang)
    ├── _includes/           # Layout och partials (header/nav/sidebar/footer)
    ├── assets/              # CSS + JS (meny och ljuslåda för bildalbum)
    ├── images/bildreportage/# Originalfoton per album (byggs ned av eleventy-img)
    ├── static/images/       # Alla övriga bilder (logga, slussbilder, sponsorer)
    ├── static/pdf/          # PDF:er läggs här
    ├── static/artiklar/     # Artiklars PDF/htm-filer
    ├── *.md                 # Sidorna (index, att-slussa, historik …)
    ├── sok.njk              # Söksida (Pagefind)
    ├── sitemap.njk          # /sitemap.xml
    ├── robots.njk           # /robots.txt
    ├── feed.njk             # /nyheter/feed.xml (RSS/Atom)
    ├── 404.md               # Egen 404-sida
    ├── nyheter/*.md         # Varje nyhet är en egen Markdown-fil
    ├── historik/*.md        # Undersidor (t.ex. Ångslupar)
    ├── artiklar/*.md        # Metadata-filer för artiklarna (ej publika)
    └── bildreportage/*.md   # Varje album är en egen Markdown-fil
```

## Så här lägger du till en nyhet (viktigast för redaktionen)

**Enklast via CMS:et:** öppna `https://app.pagescms.org/<ägare>/sicklaSluss` → **Nyheter** → **Ny nyhet** → fyll i rubrik, datum, sammanfattning och text → **Spara**. Publiceringen sker automatiskt.

Vill du hellre jobba direkt i arkivet (t.ex. för en längre text med bilder):

1. Gå till `src/nyheter/` i repot.
2. Kopiera mallen från `templates/nyhet-mall.md`.
3. Döp den nya filen till `YYYY-MM-DD-kort-om-nyheten.md` (t.ex. `2026-06-01-slussdagen.md`).
4. Fyll i `date`, `title` och `summary` i front matter (upptill i filen).
5. Spara och lägg upp ändringen – nyheten dyker automatiskt upp på **startsidan** och under **Nyheter**.

`layout` och `tags` behöver inte fyllas i för hand – de tilldelas automatiskt via `src/nyheter/nyheter.11tydata.json`.

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

**Enklast via CMS:et:** **Bildreportage** → **Nytt album** → fyll i rubrik, datum, `folder`-namn och vid behov **Omslagsbild**/**Period**. Ladda sedan upp bilderna via mediabiblioteket **Bildreportagebilder** (i en mapp med exakt samma namn som `folder`-fältet) och spara. Galleriet byggs automatiskt.

Direkt i arkivet:

1. Skapa en mapp `src/images/bildreportage/YYYY-MM-DD-kort-titel/` och lägg in fotona där (jpeg/png).
2. Kopiera `templates/bildreportage-mall.md` till `src/bildreportage/YYYY-MM-DD-kort-titel.md` och fyll i `title`, `date`, `folder` samt vid behov `cover` och `period`.
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
# cover: "01_slussdag.jpg"   # valfri omslagsbild; annars används första bilden
# period: historiskt        # endast äldre material – sorteras sist, datum döljs
---
```

Bildlistan behövs inte längre – galleriet byggs automatiskt utifrån mappen `src/images/bildreportage/<folder>/`. Första bilden i mappen blir omslag om du inte anger `cover` med ett exakt filnamn.

## Så här lägger du till en artikel

Artiklarna i arkivet är metadata-filer i `src/artiklar/` som renderas på sidan **Artiklar**. Varje artikel pekar på en PDF/htm i `src/static/artiklar/`.

**Enklast via CMS:et:** **Artiklar** → **Ny artikel** → välj rubrik, `label`, datum, `type` (A/I/N) och `group` (ny/ark), lägg till filen via mediabiblioteket **Dokument** om den inte redan ligger där, och spara.

Direkt i arkivet:

1. Lägg filen (pdf/htm) i `src/static/artiklar/`.
2. Kopiera `templates/artikel-mall.md` till `src/artiklar/` med ett kort, unikt filnamn.
3. Fyll i `title`, `label` (datum som visas), `date` (sortering), `type` (A/I/N), `group` (ny/ark) och lämplig `file`/`pdf`/`link`/`attr`.

Framtida datum i `date` sorterar högst upp; skriv `group: ark` för äldre material.

## Så lägger du till en PDF

1. Lägg filen i `src/static/pdf/...`
2. Länka till den med `[länktext](/static/pdf/filnamn.pdf)` – även undersidor (t.ex. `src/historik/*.md`) kan länka pdf:er på samma sätt.

Artikelfilerna (PDF + äldre htm-sidor) ligger under `src/static/artiklar/` och metadata-filerna i `src/artiklar/` pekar på dem.

## Innehållshantering med Pages CMS

Repot är anslutet till [Pages CMS](https://app.pagescms.org) via konfigurationen i `.pages.yml`. Redaktionen kan då redigera nyheter, bildreportage, artiklar, sidorna och webbplatsinställningarna direkt i webbläsaren utan att röra git. Funktionen är testad och verifierad mot sajten.

Hur du som medlem skapar ett GitHub-konto, blir medarbetare i repot och ansluter till CMS:et finns utförligt beskrivet i [docs/guide-anslut-cms.md](docs/guide-anslut-cms.md). Hur du sedan uppdaterar sidor, nyheter, kalender, album och bilder beskrivs i [docs/guide-innehall-och-bilder.md](docs/guide-innehall-och-bilder.md).

1. En administratör för repots GitHub-konto installerar Pages CMS GitHub App och bjuder in redaktionen (Settings → Collaborators).
2. Öppna `https://app.pagescms.org/<ägare>/sicklaSluss` och logga in.
3. Ändringar som görs skickas automatiskt som commits till repot → GitHub Actions bygger om och publicerar sajten.

Notera:
- `settings.content.merge: true` i `.pages.yml` gör att CMS:et bevarar front matter som `layout`/`tags` när en fil sparas.
- För att ett nytt album ska visa bilder måste mappen `src/images/bildreportage/<folder>/` finnas med samma namn som `folder`-fältet. Ladda upp bilder via mediabiblioteket "Bildreportagebilder" i CMS:et. Ange gärna `cover` för att välja omslagsbild; annars används första bilden i mappen.
- Förstasidan (`src/index.md`) innehåller loopar och tas därför inte fram som ett vanligt CMS-fält – den redigeras i filen direkt.

## Dokumentation (docs/)

- [docs/guide-anslut-cms.md](docs/guide-anslut-cms.md) – skapa GitHub-konto, bli medarbetare och ansluta till Pages CMS (riktad till redaktörer).
- [docs/guide-innehall-och-bilder.md](docs/guide-innehall-och-bilder.md) – uppdatera sidor, nyheter, kalendarium, album och bilder i vardagen (riktad till redaktörer och intressenter).
- [docs/guide-dns-och-github.md](docs/guide-dns-och-github.md) – domän (DNS), GitHub-samarbete och överlämning.
- [docs/forslag-till-styrelsen.md](docs/forslag-till-styrelsen.md) – bakgrund/förslag till styrelsen inför flytten till GitHub Pages.

## Så här publicerar du (deploy)

Servern publikläggs med: 

- **Lokalt:** `npm run build` och ladda upp innehållet i `_site/` 
- **Automatiskt:** se GitHub Actions (`deploy.yml`) som bygger och publicerar till GitHub Pages vid push till `main`.

> **OBS (tillfälligt):** Sidan körs just nu på `jacomaco.github.io/sicklaSluss/` och är därför satt till att inte indexeras av sökmotorer (`"noindex": true` i `src/_data/site.json`). `PATH_PREFIX` i `eleventy.config.mjs` är satt till `"sicklaSluss"`. Alla interna länkar använder `url`-filtret (och rot-relativa länkar i CMS-innehåll anpassas automatiskt) och funkar därför på vilken sökväg som helst.
>
> **Vid lansering på `sicklasluss.se`:**
> 1. Ändra `PATH_PREFIX` till `""` i `eleventy.config.mjs`.
> 2. Sätt `"noindex": false` i `src/_data/site.json` (då aktiveras även canonical-URL:er, `sitemap.xml` och `robots.txt`).
> 3. Kontrollera att domänen är angiven under **Settings → Pages** i GitHub (en `CNAME`-fil i repot behövs inte när publiceringen sker via Actions).

Peka `sicklasluss.se` mot GitHub Pages (A-records) och behåll MX för e-post (Simply.com).

## Meny, telefonnummer och sponsorer

Allt finns i `src/_data/site.json` – justera där om telefonnummer, meny eller sponsorer ändras.

## Sök, kalendarium och sökmotorer

- **Sök:** `src/sok.njk` använder Pagefind. Indexet byggs automatiskt av `npm run build` (och av `npm run dev`) till `_site/pagefind/`. Sidan nås via menyn eller `/sok/`.
- **Kalendarium:** öppettider och slussdagar ligger i `src/_data/kalendarium.json` och redigeras i Pages CMS under **Kalendarium**. Samma uppgifter används på Nyheter-sidan och In English.
- **Sökmotorer:** `src/sitemap.njk`, `src/robots.njk` och canonical/Open Graph-taggarna i `base.njk` styrs av `url` och `noindex` i `site.json`. Under testperioden är `noindex: true`.
- **RSS:** nyhetsflödet publiceras på `/nyheter/feed.xml` och länkas automatiskt i `<head>`.
- **404:** `src/404.md` blir `_site/404.html`, som GitHub Pages använder för okända adresser.
