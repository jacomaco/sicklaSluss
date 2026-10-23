# Guide – uppdatera innehåll och bilder

Den här guiden är till för **redaktörer, styrelsemedlemmar och andra intressenter**
som behöver förstå hur webbplatsen sköts och hur man uppdaterar text, nyheter,
bilder och kalender. Du behöver inte kunna programmering.

Om du ännu inte har ett konto eller inte har anslutit till Pages CMS, börja med
[guide-anslut-cms.md](guide-anslut-cms.md).

---

## 1. Så publiceras en ändring

Webbplatsen redigeras i **Pages CMS** och publiceras automatiskt:

1. Du loggar in på Pages CMS och ändrar t.ex. en nyhet eller ett album.
2. Du klickar **Spara**.
3. Ändringen sparas som en commit i GitHub-projektet.
4. GitHub Actions bygger om hela webbplatsen (inklusive bilder och sökindex).
5. Efter ungefär **1–2 minuter** finns ändringen på webbplatsen.

Du behöver alltså inte ladda upp något separat eller starta om någon server.

> **Under testperioden** ligger sajten på `jacomaco.github.io/sicklaSluss/` och
> är satt att inte indexeras av sökmotorer (`noindex`). Det är avsiktligt och
> ändras först vid lansering på den riktiga domänen.

---

## 2. Vad finns var?

| Innehåll | Redigeras i CMS under | Källa i projektet | Kommentar |
|---|---|---|---|
| Nyheter | **Nyheter** | `src/nyheter/*.md` | Visas på startsidan, `/nyheter/` och i RSS-flödet |
| Bildreportage | **Bildreportage** | `src/bildreportage/*.md` + `src/images/bildreportage/<mapp>/` | Albumen hittar bilderna automatiskt |
| Artiklar | **Artiklar** | `src/artiklar/*.md` + filer i `src/static/artiklar/` | Metadata + PDF/htm-länk |
| Vanliga sidor | **Sidorna** | `src/*.md` | T.ex. Att slussa, Historik, Om föreningen |
| Kalendarium | **Kalendarium** | `src/_data/kalendarium.json` | Används på Nyheter och In English |
| Meny, telefon, sponsorer | **Webbplatsinställningar** | `src/_data/site.json` | Gäller hela sajten |
| Sökindex | – | byggs automatiskt | Pagefind, inget att redigera |
| Sitemap, robots, RSS | – | byggs automatiskt | Kräver ingen åtgärd |

---

## 3. Uppdatera en sida eller en nyhet

### Vanliga sidor

1. Välj **Sidorna** i CMS-menyn.
2. Öppna sidan du vill ändra.
3. Redigera texten i textfältet.
4. Kontrollera att rubrik och beskrivning stämmer.
5. Klicka **Spara** och vänta en minut.

Sidorna använder vanlig text med enkel formatering (fet stil, kursiv, listor och
länkar). Undvik att klistra in färdig formatering från Word – klistra hellre in
texten som oformaterad text och formatera om i CMS:et.

### Nyheter

1. Välj **Nyheter** → **Ny nyhet**.
2. Fyll i:
   - **Rubrik** – det som syns på startsidan och i nyhetslistan.
   - **Datum** – styr sorteringen. Nyast först.
   - **Sammanfattning** – kort text som visas på startsidan.
   - **Text** – själva nyheten.
3. Klicka **Spara**.

Nyheten dyker automatiskt upp på startsidan, under **Nyheter** och i RSS-flödet
`/nyheter/feed.xml`.

**Bilder i en nyhet:** ladda upp bilden via bildikonen i textredigeraren och
infoga den. Bilder som infogas med sökväg som börjar med `/static/...` fungerar
både på testadressen och på den slutliga domänen.

### Toppbilder

Vissa sidor har en toppbild. På **In English** finns ett eget fält för
**Toppbild** och **Beskrivning av toppbilden**. På övriga sidor ligger toppbilden
i själva texten.

Om du byter en toppbild mot en bild med en annan form (t.ex. från liggande till
stående) kan sidan behöva justeras. Hör i så fall av dig till utvecklaren.

---

## 4. Kalendarium och öppettider

Kalendariet finns under **Kalendarium** i CMS-menyn och används på två ställen:

- **Nyheter** – aktuell säsong och slussdagar.
- **In English** – samma information på engelska.

Fälten är:

- **År** – används i rubriken ”Kalendarium 2026”.
- **Säsongen börjar / slutar** – skrivs som text, t.ex. `10 maj` och `27 sep`.
- **Drop-in-tider** – t.ex. `lördagar kl 10:30–11:30 och kl 16:00–17:00`.
- **Slussdagar** – en lista med datum och beskrivning.
- **English** – samma uppgifter på engelska.

Uppdatera **både svenska och engelska** när säsongen eller slussdagarna ändras.
Datumfälten är avsiktligt vanlig text, eftersom de bland annat innehåller
formuleringar som ”23 maj & 30 aug”.

**Rutin:** kontrollera kalendariet i god tid före säsongsstart och efter att
styrelsen beslutat om årets slussdagar.

---

## 5. Bildreportage – album

### Skapa ett nytt album

1. Välj **Bildreportage** → **Nytt album**.
2. Fyll i:
   - **Rubrik** – t.ex. `2026-08-30 Slussdag`.
   - **Datum** – evenemangets datum.
   - **Mappnamn för bilderna** – t.ex. `2026-08-30_slussdag`.
     Använd helst **gemener, siffror, bindestreck och understreck** – inga
     mellanslag eller å/ä/ö.
   - **Omslagsbild** – valfritt. Lämna tomt för att använda första bilden.
   - **Period** – `Nutida` eller `Historiskt`.
3. Spara albumet.
4. Ladda upp bilderna i mediabiblioteket **Bildreportagebilder**, i en mapp
   med **exakt samma namn** som mappnamnet ovan.
5. Kontrollera albumet på `/bildreportage/`.

Mappnamnet i CMS och mappnamnet i mediabiblioteket måste vara identiska. Det är
det vanligaste felet när ett album blir tomt.

### Bildordning

Bilderna sorteras automatiskt efter filnamn, med ”naturlig” sortering (2 kommer
före 10). Vill du styra ordningen, döp bilderna till:

```text
01_slussdag.jpg
02_besokare.jpg
03_baten.jpg
```

### Omslagsbild

Som standard används **första bilden i mappen** som omslag. Vill du välja en
annan bild:

1. Öppna albumet i CMS:et.
2. Fyll i **Omslagsbild** med bildens exakta filnamn, t.ex. `IMG_2675.JPG`.
3. Spara.

Filnamnet måste matcha exakt, inklusive versaler/gemener. Om filen inte hittas
används första bilden i mappen i stället, så albumet blir aldrig utan omslag.

### Historiska album

Sätt **Period** till `Historiskt` för äldre material (t.ex. kartor och vykort).
Då:

- hamnar albumet sist i listan under rubriken **Historiskt**,
- döljs det konstgjorda datumet på albumets sida.

### Lägga till, byta eller ta bort bilder

- **Lägga till:** ladda upp bilden i rätt mapp i **Bildreportagebilder**.
  Den dyker upp automatiskt i albumet vid nästa publicering.
- **Byta ut:** ladda upp den nya bilden med **samma filnamn** som den gamla.
  Bygget skapar nya optimerade versioner automatiskt.
- **Ta bort:** ta bort bilden från mappen. Om den var omslagsbild, välj en ny
  omslagsbild eller lämna fältet tomt.
- **Byta mappnamn:** flytta bilderna och ändra **Mappnamn för bilderna** i
  albumet. Kontakta gärna utvecklaren om du är osäker.

Originalbilderna ligger kvar i projektet och publiceras inte direkt till
besökarna. Det som skickas till webbläsaren är webboptimerade versioner i
WebP och JPEG.

### Bildråd

- Använd helst **JPEG** i sRGB.
- Långsidan bör vara cirka **1600–2200 pixlar**; undvik bilder direkt från
  kameran om de är mycket stora.
- Liggande bilder (4:3) passar bäst som omslag.
- Undvik filnamn med mellanslag. Använd `01_beskrivning.jpg`.
- Bilder med människor: kontrollera att föreningen har rätt att publicera dem.

---

## 6. Artiklar

Artiklarna är äldre material som ligger i artikelarkivet.

1. Välj **Artiklar** → **Ny artikel**.
2. Fyll i rubrik, datum, typ (A/I/N), sektion (ny/ark) och eventuell källa.
3. Ladda upp PDF/htm-filen via mediabiblioteket **Dokument** om den inte redan
   finns där.
4. Koppla filen till fältet **Länk till artikel** eller **Pdf-kopia**.
5. Spara.

Om artikeln finns på en extern webbplats kan **Extern länk** användas i stället.

---

## 7. Webbplatsinställningar

Under **Webbplatsinställningar** ändras:

- webbplatsens namn och beskrivning,
- telefonnummer och e-post,
- menyn,
- sponsorer,
- `noindex` (endast för testversionen).

### Sponsorer

När en sponsorlogotyp byts ut, fyll även i **Bildens bredd** och **höjd** i
pixlar. Det gör att sidan inte ”hoppar till” när bilden laddas.

### noindex

`noindex` ska vara **på** under testperioden och stängas av först när sajten
ligger på den riktiga domänen. Ändra inte detta utan att vara överens med
ansvarig utvecklare.

---

## 8. Varför hade flera album samma omslag?

Det här undersöktes i oktober 2026. Slutsatsen:

- Ett albums omslag valdes automatiskt som **första bilden i albummappen**
  (alfabetiskt/numeriskt).
- I bildarkivet fanns fyra bildfiler som var **fysiskt identiska kopior** i flera
  albummappar. Två av dem låg först i sina mappar och blev därför omslag på
  flera album:
  - `IMG_1194.jpg` – i albumen `2009-05-09` och `2013-04-27`.
  - `IMG_2246.JPG` – i fem album: `2017-08-20`, `2018-05-26`,
    `2018-08-12` (Strömma kanal), `2019-06-01` och `2020-07-14`.
- Det var alltså **inte ett fel i bildhanteringen**, utan dubbletter i
  källmaterialet. Samma bildfil hade kopierats till flera mappar, sannolikt i
  samband med migreringen av det gamla bildarkivet.

**Åtgärd:** albumen har nu stöd för att välja omslagsbild själv, och de sju
berörda albumen har fått nya, unika omslag. Samtliga 49 album har nu varsitt
omslag.

---

## 9. Underhåll och rutiner

### Inför säsongen

- Uppdatera **Kalendarium** (år, säsong, drop-in-tider och slussdagar) på
  svenska och engelska.
- Kontrollera telefonnummer och e-post.
- Kontrollera att sponsorer och länkar fungerar.

### När en nyhet publiceras

- Skriv nyheten, välj datum och sammanfattning.
- Lägg till en bild om det passar.
- Kontrollera att nyheten syns på startsidan och under **Nyheter**.

### Efter ett evenemang

- Skapa ett nytt album och ladda upp bilderna.
- Välj en representativ omslagsbild.
- Kontrollera att omslaget inte redan används av ett annat album.

### En gång per år

- Uppdatera kalendariet.
- Se över sponsorer och externa länkar.
- Kontrollera att alla album har rimliga omslag.
- Säkerhetskopiera inloggningsuppgifter och kontrollera att minst två personer
  har administratörsåtkomst.
- Låt utvecklaren uppdatera Node-paket och köra länkkontroll.

---

## 10. Felsökning

| Problem | Lösning |
|---|---|
| Ändringen syns inte | Vänta 1–2 minuter och ladda om sidan med `Ctrl+Shift+R`. Kontrollera att bygget gick igenom i GitHub Actions. |
| Albumet är tomt | Mappnamnet i albumet och i **Bildreportagebilder** måste vara exakt lika. Kontrollera även att bilderna är jpg/png/gif/webp. |
| Omslaget blev fel | Fyll i **Omslagsbild** med exakt filnamn, eller lämna tomt för första bilden. |
| Bilden syns inte | Kontrollera filnamn, versaler/gemener och mapp. Vänta tills bygget är klart. |
| Nyheten hamnar i fel ordning | Kontrollera datumfältet. Nyast datum visas först. |
| Sökningen hittar inte ny text | Sökindexet byggs om vid publicering. Vänta en minut och prova igen. |
| En länk ger 404 | Kontrollera att sidan finns och att länken inte innehåller `/sicklaSluss/` dubbelt. |
| Något blev helt fel | Alla ändringar finns i GitHub-historiken och kan återställas. Kontakta ansvarig. |

---

## 11. För utvecklare och administratörer

### Kommandon

```bash
npm install
npm run dev          # bygger, indexerar sökningen och startar lokal server
npm run build        # bygger _site/ och sökindex
npm run clean        # rensar _site/ (använd om bilder verkar inaktuella)
npm run check:links  # kontrollerar interna länkar i _site/
npm run check:links -- --external  # även externa länkar
```

Krav: **Node 22 eller senare**.

### Viktiga filer

- `eleventy.config.mjs` – bygge, bildoptimering, omslagsval, sökindex.
- `src/_data/site.json` – webbplatsuppgifter, meny, sponsorer, `noindex`.
- `src/_data/kalendarium.json` – kalendarium på svenska och engelska.
- `src/_includes/album.njk` – albumets sida.
- `src/bildreportage.njk` – albumöversikten.
- `src/nyheter/` – nyheter.
- `src/images/bildreportage/` – originalbilder per album.
- `_site/` – genererad webbplats; redigera aldrig den för hand.

### Bilder och cache

Bildfilnamnen innehåller en hash av bildens innehåll. När en källbild ändras
skapas därför nya optimerade filer automatiskt. Om gamla bilder ligger kvar
lokalt kan `npm run clean && npm run build` användas.

### Publicering

Vid push till huvudgrenen bygger GitHub Actions `_site/`, kör länkkontroll och
publicerar till GitHub Pages. Vid lansering på egen domän:

1. Sätt `PATH_PREFIX` till `""` i `eleventy.config.mjs`.
2. Sätt `"noindex": false` i `src/_data/site.json`.
3. Kontrollera att domänen är angiven under **Settings → Pages** i GitHub.
4. Följ [guide-dns-och-github.md](guide-dns-och-github.md).
