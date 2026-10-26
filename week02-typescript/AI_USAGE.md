# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Artemijs Stanko
**Izmantotais(-ie) MI rīks(-i):** OpenCode (Big Pickle aģents) un ChatGPT

## Kam es izmantoju mākslīgo intelektu?

- Vite + TypeScript projekta uzstādīšanai un Tailwind CSS pievienošanai.
- Tipu (`Project`, `Deadline`, `Category`) un sākotnējo datu sagatavošanai.
- rendering funkciju, filtru un mobilās navigācijas pārrakstīšanai TypeScript.
- Formas validācijas un `localStorage` loģikas izstrādei.
- Kļūdu meklēšanai un dokumentācijas sagatavošanai.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- `src/types.ts`, `src/data.ts`, `src/render.ts`, `src/form.ts`, `src/storage.ts` un `src/ui.ts`
  lielākā daļa koda.
- Formas HTML struktūra `index.html` failā.
- `README.md`, `AI_USAGE.md` un `REFLECTION.md` melnraksti.

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- Pielāgoju formulējumus un klašu nosaukumus, lai izskats paliktu tāds pats kā 1. nedēļā.
- Pārbaudīju datu formātu (`YYYY-MM-DD`) un to, ka termiņu nozīmītes paliek kā iepriekš.
- Pārbaudīju responsīvo izkārtojumu 375 px, 768 px un 1280 px platumā.
- Sakārtoju commit vēsturi pa kontrolpunktiem.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

MI ieteica projektu kartītes veidot ar `innerHTML` un garu HTML virkni, jo tā kods ir īsāks.
Es to noraidīju, jo lietotāja ievadītais nosaukums un apraksts nedrīkst nonākt lapā kā HTML.
Tāpēc kartītes tiek veidotas ar `document.createElement` un `textContent`.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Pārbaudīju drošību un saglabāšanu pārlūkā: pievienoju projektu ar nosaukumu `<b>test</b>` un
pārliecinājos, ka kartītē redzams teksts, nevis trekns vārds. Pēc tam DevTools izmainīju
`localStorage` vērtību uz nederīgu tekstu un pārlādēju lapu — lapa nesalūza un parādīja
sākotnējos trīs projektus.
