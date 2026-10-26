# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Artemijs Stanko
**Izmantotais(-ie) MI rīks(-i):** OpenCode (Big Pickle aģents) un ChatGPT

## Kam es izmantoju mākslīgo intelektu?

- Projektu un termiņu pārcelšanai no `data.ts` uz JSON failiem `public/api/`.
- Tipizētas API kārtas (`src/api.ts`) un type guard funkciju (`src/guards.ts`) izveidei.
- `LoadState<T>` stāvokļu un ielādes/kļūdas/tukšā stāvokļa attēlošanas izstrādei.
- Open-Meteo laikapstākļu pievienošanai un WMO kodu pārvēršanai tekstā.
- Kļūdu meklēšanai, pārbaudēm ar DevTools un dokumentācijas sagatavošanai.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- `src/api.ts`, `src/guards.ts`, `src/weather.ts` un lielākā daļa `src/render.ts` un `src/main.ts`
  koda.
- `public/api/projects.json` un `public/api/deadlines.json` sākotnējie dati.
- `README.md`, `AI_USAGE.md` un `REFLECTION.md` melnraksti.

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- Pārbaudīju, ka izskats paliek tāds pats kā 2. nedēļā, un pielāgoju statistikas kartītes tekstu.
- Pārbaudīju datu formātu un termiņu datumus, lai tie būtu nākotnē.
- Pārbaudīju, ka `localStorage` atslēga ir jauna un vecie 2. nedēļas dati netiek izmantoti.
- Sakārtoju commit vēsturi pa kontrolpunktiem.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

MI ieteica pēc `response.json()` uzreiz rakstīt `const projects = data as Project[]`, jo tā kods
ir īsāks. Es to noraidīju, jo `as` tikai apklusina TypeScript, bet dati joprojām var būt
nepareizi. Tāpēc rezultāts tiek saglabāts kā `unknown` un pārbaudīts ar `isProject` type guard.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Pārbaudīju visus piecus DevTools gadījumus: lēnu tīklu, bloķētu `projects.json`, izdzēstu
failu (Vite atgriež `index.html` ar statusu 200), `"progress": "50"` un tukšu `[]`. Katrā
gadījumā lapa parādīja saprotamu stāvokli. Atsevišķi pārbaudīju arī bloķētu Open-Meteo
pieprasījumu — parādījās *"Weather unavailable"*, bet projekti un termiņi turpināja strādāt.
