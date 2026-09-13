# Guide – sätta upp domän (DNS) och GitHub-samarbete

Denna guide beskriver steg för steg hur du:

1. kopplar domänen `sicklasluss.se` till det nya webbhotellet (GitHub Pages),
2. lägger till Föreningen Sicklaslussens nya GitHub-konto som medarbetare,
3. säkrar en smidig överlämning av projektet.

> **Förutsättning:** Repot `jacomaco/sicklaSluss` på GitHub är redan byggt och
> publicerat med GitHub Pages (Actions). Innehållet (sidor, nyheter, artiklar
> och bilder) ligger i repot.

---

## Del 1 – Föreberedelser i själva repot (görs tillsammans med utvecklaren)

Innan DNS:en pekas om ska två saker vara klara i koden:

- `pathPrefix` i `eleventy.config.js` ska vara borttagen (sid-loggarna ska peka på domänens rot).
- Custom domain ska vara ifylld i GitHub Pages-inställningarna (se Del 2).

> **Viktigt:** Eftersom sidan publiceras via **GitHub Actions** räknas inte en
> `CNAME`-fil i repot – domänen måste anges i GitHub Pages-inställningarna.

---

## Del 2 – Ange domänen i GitHub Pages

1. Logga in på GitHub med kontot som äger repot (`jacomaco`).
2. Öppna repot `jacomaco/sicklaSluss`.
3. Gå till **Settings** → **Pages** (i menyn till vänster).
4. Under **Custom domain** skriver du `sicklasluss.se` och klickar **Save**.
5. Klicka på **Verify** bredvid domänen om GitHub erbjuder det (domänverifiering
   gör att bara ni kan använda domänen på GitHub). Följ instruktionerna som dyker
   upp (TXT-post hos Simply).

När domänen är ifylld visar GitHub om DNS-pekingen fungerar – den blir grön först
efter Del 3.

---

## Del 3 – Ändra DNS hos Simply.com

Jobba på en dator där du är inloggad på Simply.com-kontot som förvaltar
`sicklasluss.se`.

1. Logga in på **Simply.com-kontrollpanelen**.
2. Gå till **Domains** och öppna `sicklasluss.se`.
3. Klicka på fliken/en **DNS** (ibland kallad "DNS-poster").
4. Nu gäller det att:

   **a) Lägga till A-poster för domänen (rot):**
   | Typ | Värd `@` | Värde |
   |---|---:|---|
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |

   **b) Lägga till CNAME för www:**
   | Typ | Värd | Värde |
   |---|---:|---|
   | CNAME | `www` | `jacomaco.github.io` |

   (Värdet för `www` får INTE innehålla reponamnet – bara `jacomaco.github.io`.)

   **c) Ta bort de gamla A-poster/CNAME som pekar på nuvarande webbhotell**
   (den gamla webbplatsen). Lämna kvar alla poster som rör **e-post**.

   **d) Rör INTE e-post-poster:**
   - **MX** (e-postservrar) – ska vara orörda så `@sicklasluss.se` fortsätter fungera
   - **TXT** med SPF / DKIM / DMARC
   - ev. andra TXT för domänverifiering

5. Spara. DNS spridning kan ta allt från minuter till ett par timmar.

> **Tips:** Om Simply i förväg lägger ut A-posten automatiskt åt oss och du ser
> konstiga dubbla CNAME-poster – be Simply-supporten att rensa till ett "rent"
> läge med bara de poster ovan plus e-post-poster.

---

## Del 4 – Verifiera att allt fungerar

1. Vänta ~1–2 timmar, eller kolla med ett DNS-verktyg:
   `nslookup sicklasluss.se` / `dig +short sicklasluss.se`
2. Öppna **https://sicklasluss.se** i en ny flik (ev. "tvinga" om via `Ctrl+Shift+R`).
   Du bör nu se den nya sajten.
3. Testa även **https://www.sicklasluss.se** – GitHub skapar själv en redirect
   mellan `sicklasluss.se` och `www.sicklasluss.se` om båda är ifyllda.
4. **Testa e-post:** skicka ett mail till `webmaster@sicklasluss.se` och svara på
   det, så vi vet att MX-poster och brevlådor fungerar som förut.

Om sajten inte syns direkt, dubbelkolla: A-posterna, CNAME för www, och att
domänen är ifylld i GitHub Pages-inställningarna.

---

## Del 5 – Lägg till Föreningens GitHub-konto (kolaboratör)

För att Föreningen ska kunna utveckla och publicera själva lägger du till deras
nya GitHub-konto som medarbetare i repot.

1. Logga in med kontot `jacomaco`.
2. Öppna repot → **Settings** → **Collaborators** (under "Access").
3. Klicka **Add people** (eller "Invite a collaborator").
4. Sök på Föreningens GitHub-användarnamn (eller e-postadress) och välj konto.
5. Välj roll:
   - **Write** – kan göra ändringar och publicera (räcker för drift av sajten).
   - **Admin** – dessutom byte av inställningar, t.ex. Pages, under bör överlämning.
6. Klicka **Add** / **Send invitation**.
7. Föreningen accepterar inbjudan (via e-post eller https://github.com/notifications).

När det är accepterat kan Föreningen:
- göra ändringar direkt i repot (t.ex. skapa nyheter i **webeditor**),
- pusha och därmed utlösa automatisk publicering,
- klona repot till egna datorer.

> För de medlemmar som sedan ska *redigera* webbplatsen (nyheter, bildreportage,
> artiklar) finns en steg-för-steg-guide: `docs/guide-anslut-cms.md` (skapa
> GitHub-konto, bli medarbetare och ansluta till Pages CMS).

> **Tips:** Be Föreningen sätta upp **2FA** på kontot och förvara en säkerhetskopia
> av inloggningen (t.ex. hos styrelsen), så kontot inte är knutet till en enda person.

---

## Del 6 – Överlämning av själva repot (rekommenderas när allt är grönt)

När Föreningen är nöjd och verkar på plats bör repot flyttas över till deras konto.
Då äger Föreningen allt själv – bäst för långsiktig handoff.

1. **Säkerhetskopiera först:** klona repot lokalt:
   `git clone git@github.com:jacomaco/sicklaSluss.git`
2. Öppna repot → **Settings** → **General** → längst ner under **Danger Zone** → **Transfer ownership**.
3. Skriv repots namn och välj ny ägare (Föreningens konto).
4. Bekräfta. Föreningen får en inbjudan att acceptera.
5. **Efter överflyttningen:**
   - GitHub sidans URL blir `foreningensNamn.github.io/sicklaSluss`, men den egna
     domänen `sicklasluss.se` fortsätter fungera automatiskt.
   - Uppdatera CNAME för `www` hos Simply så att den pekar på `foreningensNamn.github.io`.
   - Lägg till den gamla kontot (`jacomaco`) som medarbetare om man vill fortsätta hjälpa till.

---

## Bilaga – de poster som används

| Post | Vad den gör |
|---|---|
| **A** | Peker domänens rot på en IP-adress. GitHub Pages har fyra IP-adresser – lägg alla fyra |
| **CNAME** | Peker ett underdomäne (t.ex. `www`) på en annan domän. `www` → `jacomaco.github.io` |
| **MX** | Peker e-post på e-postservrarna – **rör inte** |
| **TXT/SPF/DKIM** | Regler för vem som får skicka e-post från domänen – **rör inte** |

## Vanliga fallgropar

- Domänen stavad fel eller med `http://` i GitHub-inställningarna.
- CNAME för `www` pekar på `jacomaco.github.io/sicklaSluss` (får inte vara med).
- Man tar bort MX-posten "för säkerhets skull" → e-posten slutar fungera.
- Man glömmer att vänta på DNS-spridning innan man testar.