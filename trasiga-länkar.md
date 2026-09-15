# Trasiga länkar – Granskning 2026-09-15

Granskning av www.sicklasluss.se (gamla original-sajten) och den nya Eleventy-sajten.
Alla interna länkar (PDF, HTM, bildreportage) på Artiklar-sidan fungerar (200).
Problem finns på **externa länkar** och vissa sidor på den nya sajten.

---

## Artiklar – trasiga externa länkar

### 1. Issuu-länk (död)

| | |
|---|---|
| **Länk** | `https://issuu.com/newsfactory/docs/nacka2-2016` |
| **Status** | 404 – inte heller i Wayback Machine |
| **Artiklar (gamla)** | `2016-04-01 Så länge skutan kan gå` (Artiklar.htm) |
| **Nya repot** | `src/artiklar/2016-04-01-så-länge-skutan-kan-gå.md` (rad 9: `link:`) |
| **Föreslaget** | Ta bort issuu-länken. Det finns redan en fungerande PDF: `/Artiklar/2016-04-01/Sa_lange_skutan_kan_ga.pdf` (rad 8: `pdf:`). |
| **Kundfråga** | Ska `link:` tas bort helt eller ersättas med PDF-länken? |

### 2. Stockholms Läns Museum (död domän)

| | |
|---|---|
| **Länk** | `http://old.stockholmslansmuseum.se/site_media/upload/2008_39_Jarla.pdf` |
| **Status** | 000 – domänen är död |
| **Artiklar (gamla)** | `2008:39 Utgrävning vikingagrav ekudden Järla Gård` (Artiklar.htm) |
| **Nya repot** | `src/artiklar/2008-39-utgrävning-vikingagrav-ekudden-järla-gård.md` (rad 9: `link:`) |
| **Föreslaget** | Ersätt med Wayback Machine-URL: `https://web.archive.org/web/20220616232040/http://old.stockholmslansmuseum.se/site_media/upload/2008_39_Jarla.pdf` |
| **Kundfråga** | Ersätt med arkivlänk eller ta bort? |

---

## Övriga sidor – trasiga externa länkar

### Nyheter-sidan (ny repo)

Dessa länkar finns i den nya sajten, men sidan har byggts om så de gamla nyhetslänkarna (jarlasjodagen, räddajärlasjön.nu etc.) finns ej i det nya repot. Kontrollera om gamla nyhetssidan fortfarande är live separat.

### Att slussa – `src/att-slussa.md`

| Rad | Länk | Status | Föreslaget |
|-----|-------|--------|------------|
| 38–39 | `http://kartor.eniro.se/m/92LlB` och `/m/92LoY` | 403 (bot-block, fungerar i webbläsare) | **OK** – behåll |
| 41 | `http://www.jarlasjo.se` | 200 (funkar) | **OK** |
| 42 | `http://www.hammarbysjostad.se` | 200 (funkar) | **OK** |

### Sicklaslussens vänner – `src/vanner.md`

| Rad | Länk | Status | Föreslaget |
|-----|-------|--------|------------|
| 30 | `http://www.onnesluss.se` | 000 – domänen död | **TA BORT** eller hitta ny URL |
| 33 | `http://www.klubbmaritim.com/Sidor/lankar.html` | 404 | **TA BORT** eller hitta ny URL |
| 36 | `http://www.sjostadenskanotklubb.info.se/` | 000 – domänen död | **TA BORT** eller hitta ny URL |

### Omgivning – `src/omgivning.md`

| Rad | Länk | Status | Föreslaget |
|-----|-------|--------|------------|
| 23, 45, 48 | `http://www.sbk.stockholm.se/DP-PLAN/Nackareservatet` | 000 – timeout/död | **ERSÄTT** – sök ny URL hos Stockholm Stad |
| 24 | `http://www.hembygd.se/index.asp?DocID=20612` (Lilla Sicklas Vänner) | 404 | **TA BORT** eller sök ny URL |
| 27 | `http://www.nysatravilla.se/` | 000 – domänen död | **TA BORT** eller sök ny URL |
| 39, 42 | `http://stvf.abc.villaagarforening.se/` | 000 – domänen död | **TA BORT** eller sök ny URL |

---

## Länkar som Funktionen Nyheter (gamla sajten) hade

Dessa länkar fanns på gamla Nyheter.htm men finns INTE i det nya repot (nyhetssidan
byggdes om). Bifogas om kunden vill veta:

| Länk | Status | Notering |
|------|--------|----------|
| `http://www.jarlasjo.se/jarlasjodagen.htm` | 404 | Sida borttagen |
| `http://www.hammarbysjostad.se/frameset.asp?...ID=599` | 404 | Sida borttagen |
| `https://www.räddajärlasjön.nu/` | DNS-fel | Domänen död |
| `https://www.facebook.com/Raddajarlasjon/` | 400 (bot-block) | Kan fungera i webbläsare |
| `http://www.facebook.com/ForeningenSicklaslussen` | 400 (bot-block) | Kan fungera i webbläsare |

---

## Sammanfattning

| Typ | Antal |
|-----|-------|
| Trasiga interna länkar | **0** |
| Trasiga externa länkar (nya sajten) | **6** (onnesluss, klubbmaritim, sjostadenskanotklubb, sbk.stockholm.se, hembygd.se, nysatravilla.se) + 1 tveksam (stvf) |
| Trasiga externa länkar (artiklar) | **2** (issuu, old.stockholmslansmuseum) |
| Oklara/bot-blockade (kan fungera) | **3** (eniro kartor, Facebook ×2) |
| Trasiga (gamla Nyheter, ej i ny repo) | **4** (jarlasjodagen, hammarbysjostad frameset, räddajärlasjön.nu, hembygd) |
