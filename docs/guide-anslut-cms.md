# Guide – skapa GitHub-konto, bli medarbetare och ansluta till Pages CMS

Den här guiden är till för **redaktörer** – medlemmar som ska uppdatera
webbplatsen (nyheter, bildreportage, artiklar eller sidor) via webbredigeraren
**Pages CMS**. Du behöver inte kunna programmering. Det enda du behöver är en
e-postadress.

Du gör tre saker, i ordning:

1. **Skapa ett GitHub-konto** (cirka fem minuter).
2. **Bli medarbetare (collaborator)** i webbplatsens GitHub-projekt – en
   administratör måste först skicka en inbjudan till dig.
3. **Ansluta till Pages CMS** och logga in – därifrån gör du alla redigeringar.

> **Vad är GitHub och Pages CMS?** GitHub är ett arkiv (repository) där
> webbplatsens alla filer ligger. Pages CMS är ett webbgränssnitt som låter dig
> redigera innehållet i det arkivet direkt i webbläsaren – utan att röra filerna
> för hand. Varje gång du sparar skickas ändringen automatiskt till webbplatsen.

---

## Del 1 – Skapa ett GitHub-konto

Om du redan har ett GitHub-konto hoppar du över den här delen och går direkt till
[Del 2](#del-2--bli-medarbetare-i-projektet).

1. Öppna **https://github.com** i din webbläsare.
2. Klicka på den gröna knappen **Sign up** (längst upp till höger).
3. Fyll i formuläret:
   - **Email** – en e-postadress du har tillgång till (arbets- eller privatadress
     spelar ingen roll).
   - **Password** – välj ett starkt lösenord. Tips: använd en lösenordshanterare.
   - **Username** – välj ett användarnamn, t.ex. `fornamn-efternamn`.
4. Klicka **Continue** och godkänn att GitHub skickar e-post till dig.
5. GitHub skickar en **bekräftelsekod** till din e-post – fyll i koden på sidan.
6. Välj plan: välj **Free** (gratis) – du behöver aldrig betala något.
7. Du kan hoppa över alla guider som dyker upp första gången.

**Klart!** Du har nu ett GitHub-konto. Lämna sidan öppen eller kom ihåg
användarnamnet och lösenordet.

> **Bra att veta:** ett GitHub-konto är gratis och används bara för att logga
> in och godkänna ändringar. Ingen annan kan se ditt lösenord.

---

## Del 2 – Bli medarbetare i projektet

För att kunna redigera webbplatsen måste du vara **medarbetare (collaborator)**
i projektet `sicklaSluss`. Det gör en administratör genom att skicka dig en
inbjudan. När inbjudan finns gör du så här:

1. **Kontrollera din e-post** – GitHub skickar ett brev från `notifications@github.com`
   med rubriken *"Invitation to join sicklaSluss"*.
2. Klicka på knappen **View invitation** i brevet, eller gå direkt till
   **https://github.com/notifications** (du måste vara inloggad).
3. Klicka på **Accept invitation**.
4. Du kan bli ombedd att välja om du vill ha "notifications" (e-postuppdateringar)
   från projektet – det är valfritt.
5. När du accepterat ser du projektet `sicklaSluss` i listan på
   **https://github.com** (eller du kan öppna
   `https://github.com/<ägare>/sicklaSluss` direkt).

> **Varför behöver man vara medarbetare?** Enbart att ha ett GitHub-konto räcker
> inte – inbjudan är det som ger dig rätt att göra ändringar i projektet.
> Utan den kan du bara titta, inte redigera.

---

## Del 3 – Anslut till Pages CMS

Om det är **första gången** webbplatsen ansluts till Pages CMS måste en
administratör först installera **Pages CMS GitHub App** på kontot (det görs en
gång per projekt, se bilaga). Därefter gör varje redaktör så här:

1. Öppna **https://app.pagescms.org/<ägare>/sicklaSluss**
   (ersätt `<ägare>` med namnet på kontot som äger projektet, t.ex. `jacomaco`).
2. Klicka på **Log in with GitHub** och logga in med ditt GitHub-konto
   (samma konto som du accepterade inbjudan med).
3. Pages CMS frågar om du har inbjudan till appen – godkänn vilken åtkomst som
   efterfrågas (åtkomsten gäller bara `sicklaSluss`-projektet).
4. Efter inloggningen öppnas redigeringsvyn med en meny till vänster:
   - **Nyheter** – skapa/ändra nyhetsinlägg.
   - **Bildreportage** – skapa/ändra fotoalbum.
   - **Artiklar** – hantera artikelarkivet.
   - **Sidorna** (Att slussa, Historik, Om föreningen, In English, …).
   - **Webbplatsinställningar** – meny, telefonnummer, e-post, sponsorer.

   > Se [Del 4](#del-4--testa-att-det-fungerar) för exakt hur en redigering går till.

> **Varför e-post?** Pages CMS använder ditt GitHub-konto som inloggning – bara
> medarbetare i projektet kan komma in och redigera. Det gör att utomstående
> inte kan ändra sajten.

---

## Del 4 – Testa att det fungerar

Gör en första provändring så att du är säker på att allt fungerar:

1. Öppna **https://app.pagescms.org/<ägare>/sicklaSluss** och logga in.
2. Klicka på **Sidorna** i menyn till vänster och välj sidan **In English**.
3. Lägg till någon testtext i texten, t.ex. raden `CMS-test`.
4. Klicka på **Spara** (uppe till höger eller längst ner i formuläret).
5. Vänta cirka en minut medan sajten byggs om automatiskt, och öppna sedan
   **https://jacomaco.github.io/sicklaSluss/in-english/** (eller motsvarande
   domän när sajten är flyttad) – texten ska vara synlig.
6. Ta bort testtexten och spara igen, så är sajten tillbaka som förut.

> **Hur publicering går till:** varje "Spara" i CMS:et skapar en teknisk
> ändring (en "commit") i projektet. GitHub bygger då automatiskt om sajten
> och publicerar den – inget krävs av dig efteråt. Det kan ta en minut eller två
> innan ändringen syns ute på nätet.

---

## Del 5 – Daglig användning i korthet

| Vad du vill göra | Så gör du i CMS:et |
|---|---|
| **Publicera en nyhet** | Nyheter → **Ny nyhet** → fyll i rubrik, datum, sammanfattning och text → Spara |
| **Lägga upp ett bildalbum** | Bildreportage → **Nytt album** → rubrik, datum och mappnamn, ladda sedan upp bilderna i mediabiblioteket **Bildreportagebilder** (i samma mappnamn) → Spara |
| **Lägga till en artikel** | Artiklar → **Ny artikel** → fält för rubrik, datum, typ (A/I/N), sektion (ny/ark) och eventuell fil via mediabiblioteket **Dokument** → Spara |
| **Ändra en sida** | hitta sidan under **Sidorna** och redigera texten direkt |
| **Lägga upp en bild** | I redigeraren finns ett mediabibliotek (bildikonen) – ladda upp och infoga |
| **Ändra telefonnummer/meny** | **Webbplatsinställningar** |

---

## Del 6 – Säkerhet och bra vanor

- **Aktivera tvåstegsinloggning (2FA)** på ditt GitHub-konto:
  GitHub → **Settings** → **Password and authentication** → **Enable 2FA**.
  Det skyddar ditt konto även om lösenordet skulle läcka.
- **Dela inte ditt lösenord** med andra. Varje redaktör ska ha ett eget konto –
  det gör att man kan se vem som ändrade vad, och kan återställa fel.
- **Säkerhetskopia:** se till att föreningen har en kopia av inloggningen för
  minst en administratör (förvara den t.ex. hos styrelsen).
- Alla ändringar hamnar i projektets historik – ett misstag går alltid att
  återställa. Du behöver inte vara orolig för att "förstöra" sajten.

---

## Bilaga – för administratören: installera Pages CMS en gång

Det här gör en person med **admin-rättigheter** på kontot som äger projektet,
en enda gång:

1. Öppna GitHub → **Settings** → **Applications** (på kontot som äger projektet).
2. Under **Authorized OAuth Apps** (eller på pagescms.org) välj att installera
   **Pages CMS** på projektet.
   Alternativt: på github.com → projektets **Settings** → **Install GitHub Apps**
   (eller via [app.pagescms.org](https://app.pagescms.org) när du loggar in
   första gången).
3. Välj installation endast för repot `sicklaSluss` och ge appen **Read and
   write**-behörighet.
4. Klart – nu kan alla medarbetare logga in enligt Del 3.

---

## Felsökning

| Problem | Lösning |
|---|---|
| Jag får ingen inbjudan | Be administratören skicka inbjudan igen (Settings → **Collaborators** → **Add people**). Kontrollera att de stavat rätt och att du är inloggad med rätt GitHub-konto. |
| "Access denied" i Pages CMS | Du har inte accepterat inbjudan, eller så är du inloggad med fel GitHub-konto. Kontrollera GitHub-avsnittet och öppna `https://github.com/notifications`. |
| Jag har glömt GitHub-lösenordet | På github.com klickar du på "Forgot password" – GitHub skickar återställning till din e-post. |
| Ändringen syns inte direkt | Vänta 1–2 minuter (sajten byggs om automatiskt) och uppdatera sidan med `Ctrl+Shift+R`. |
| Jag ser inte "Sidorna" eller "Artiklar" | Menyerna kommer från konfigurationsfilen `.pages.yml` i projektet. Saknas något, kontakta utvecklaren. |