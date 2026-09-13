# Förslag till styrelsen – flytta webbplatsen till gratis hosting

**Författare:** Jacob Johansson, medlem i Föreningen Sicklaslussen
**Datum:** september 2026

---

## Sammanfattning

Sicklaslussen behöver en modern, mobilanpassad och lättskött hemsida utan dyr och
krånglig teknik i bakgrunden. En sådan sida är **redan byggd och testad**. Förslaget
är att lägga den på **GitHub Pages**, som är **helt gratis och utan underhåll**.
Domänen `sicklasluss.se` och e-posten behålls som i dag.

---

## Bakgrund

- Dagens webbplats ligger som en gammaldags statisk HTML-sajt på ett webbhotell
  hos Simply.com. Den är inte mobilanpassad och är krånglig att uppdatera.
- Oavsett om man i framtiden skulle välja WordPress eller något annat så tillkommer
  uppdateringar, säkerhetspatchar och löpande underhåll – allt det försvinner med
  GitHub Pages.
- En helt ny sajt är redan byggd: mobilanpassad, med nyheter, historik,
  artikelarkiv (PDF:er nedladdade lokalt), bildreportage och en engelsk version.
  Den är publicerad på en provdomän och fungerar.

## Vad föreningen får

| Punkt | Vad föreningen får |
|---|---|
| **Enkelhet** | Nyhet publiceras genom att klistra in text i webbredigeraren **Pages CMS** (ingen FTP, inga teman, inga plugins – bara ett GitHub-konto) |
| **Underhållsrisk** | Inget server- eller programvaruunderhåll. Inga "uppdatera WordPress" att tänka på. Allt publiceras automatiskt vid varje ändring |
| **Säkerhet** | Gratis SSL/HTTPS, säkert system som hanteras av Microsoft (GitHub) |
| **Stabilitet** | Alla ändringar sparas och kan återställas (versionshistorik). Sajten funkar även om personen som byggde den slutar – allt är dokumenterat |
| **Mobilanpassad** | Sidan anpassar sig till mobil, surfplatta och dator |
| **Kostnad** | 0 kr/år för själva webbplatsen (se kalkyl nedan) |

## Kostnad – idag och med förslaget

Siffrorna nedan gäller Simply.com:s priser vid förnyelse (intropriserna är endast
första året). Se gärna över vad föreningen faktiskt betalar i kontrollpanelen.

| Post | Idag (Simply.com) | Med förslaget |
|---|---|---|
| Webbhotell | från ca 1 300 kr/år (109,95 kr/mån vid förnyelse) | **0 kr** (GitHub Pages är gratis) |
| Domän sicklasluss.se | ca 100–200 kr/år | Samma (domänen behålls) |
| E-post | Ingår i webbhotellet | Alternativ A **eller** B, se nedan |
| Risk för prishöjning | Har höjts 4 gånger sedan 2018 | Ingen (GitHub Pages är gratis för alltid) |

**Poäng om e-posten:** E-posten (exempelvis `webmaster@sicklasluss.se`) ligger i dag i
samma webbhotell-abonnemang. Vill man ha en riktig kostnadsbesparing behöver man
också se över hur e-posten hamnar, se nästa avsnitt.

## E-post – tre alternativ

1. **Behåll e-posten hos Simply.com (rekommenderas).** DNS ändras bara så att
   *webben* pekar på GitHub Pages medan e-post-uppgifterna (MX) är orörda. Enklast
   för alla och brevlådorna fungerar som i dag. Besparingen blir då dock mindre –
   vi får se om webbhotellplanen kan bytas till en billigare variant som bara
   täcker e-post.
2. **Gratis e-post-vidarebefordran (0 kr).** Med exempelvis ImprovMX eller
   Cloudflare Email Routing sätts e-posten att *vidarebefordras* till valfria
   brevlådor (t.ex. den breda medlemmens privata Gmail/Outlook). Kostnad 0 kr.
   Begränsning: man kan bara vidarebefordra inkommande – att *svara* sker från den
   privata adressen om man inte ställer in "skicka som".
3. **Hybrid:** behåll en bilig e-postlåda hos Simply för föreningens officiella
   adress (_webmaster@_) och vidarebefordra resten.

## Vad som behöver göras (när styrelsen godkänt)

1. Ändra DNS för `sicklasluss.se` i Simply.coms kontrollpanel:
   - **A-poster** (webb): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** för `www` → `jacomaco.github.io`
   - **MX-poster** (e-post): orörda
2. Sajten publiceras automatiskt (bygger och lanseras via GitHub Actions).
3. Ger inga mer att ta beslut om: **vem ska äga GitHub-repot på sikt** (förslag:
   föreningen själv) och **vilka artiklar från gamla arkivet som ska behållas**.

## Framtida utveckling

Sajten är statisk och har i dag inga formulär (t.ex. "Enkät vid slussning" är en
PDF). Vill föreningen senare samla in svar i enkäter, intresseanmälningar eller
liknande kan ett webbformulär implementeras utan att byta plattform – t.ex. med
en formulärtjänst (Google Forms/Formspree) eller ett publikt formulär via
GitHub Issues. Detta kan vara värt att utreda i ett senare skede.

## Sammanfattning för beslut

Föreslå att styrelsen godkänner: *"Webbplatsen flyttas till GitHub Pages
(0 kr/år, gratis och automatisk publicering). Domän och e-post enligt punkt 1
ovan, med möjlighet att senare välja en billigare e-postlösning."*