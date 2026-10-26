# CampusFlow — TypeScript un datu vadīta lapa

CampusFlow projekta 2. nedēļas versija. Lapa vairs nav statiska: projekti un termiņi tiek
glabāti tipizētos datos, saturs tiek ģenerēts ar TypeScript, un lietotājs var pievienot jaunu
projektu, kas saglabājas pārlūkā.

## Tehnoloģijas

- **Vite 8** (Vanilla TypeScript)
- **TypeScript 6** ar ieslēgtu `strict` režīmu
- **Tailwind CSS 4** ar `@tailwindcss/vite` spraudni (bez CDN)

## Palaišana

```bash
npm install
npm run dev
```

Produkcijas būvējums un tipu pārbaude:

```bash
npm run build
npm run preview
```

## Struktūra

```text
week02-typescript/
├── index.html          # lapas struktūra un tukši konteineri datiem
├── src/
│   ├── main.ts         # ieejas punkts, stāvoklis un notikumu piesaiste
│   ├── types.ts        # Project, Deadline, Category, type guard
│   ├── data.ts         # sākotnējie 3 projekti un 3 termiņi
│   ├── render.ts       # renderProjects / renderDeadlines
│   ├── form.ts         # formas validācija
│   ├── storage.ts      # localStorage lasīšana un saglabāšana
│   ├── ui.ts           # mobilā navigācija un paziņojums
│   └── style.css       # @import "tailwindcss" un @theme tokeni
├── public/favicon.svg
├── vite.config.ts
├── tsconfig.json
├── AI_USAGE.md
└── REFLECTION.md
```

## Funkcionalitāte

- Projektu un termiņu saraksts tiek zīmēts no datiem (`src/data.ts`), nevis rakstīts HTML.
- Kategoriju krāsas glabājas `Record<Category, string>` objektos — jauna kategorija bez krāsas
  izraisīs tipa kļūdu.
- Filtri **All / Active / Done** filtrē datus ar `Array.filter` un pārzīmē sarakstu.
- Mobilā navigācija: atvēršana, aizvēršana ar Escape un `aria-expanded` atjaunināšana.
- Forma *Add a project* ar laukiem: nosaukums, apraksts, kategorija, termiņš, progress.
- Validācija: nosaukums ≥ 3 simboli, apraksts ≥ 10 simboli, izvēlēta kategorija, norādīts
  termiņš, progress — vesels skaitlis 0–100. Kļūda parādās pie attiecīgā lauka.
- Jauns projekts iegūst `crypto.randomUUID()` ID un statusu `done`, ja progress ir 100.
- Projekti tiek saglabāti `localStorage` un paliek pēc lapas pārlādes.
- Bojāti vai neatbilstoši `localStorage` dati netiek izmantoti — lapa atgriežas pie sākotnējiem
  datiem (`try/catch` + `isProject` pārbaude).
- Statistikas kartīte *Active projects* rāda skaitu, kas aprēķināts no datiem.
- Tukšā stāvokļa paziņojums, ja izvēlētajā filtrā nav neviena projekta.
- Projektu dzēšana ar pogu *Delete* (izmaiņas arī saglabājas).

## Tipu drošība

- `strict: true`, bez `any` un bez `@ts-ignore` / `@ts-expect-error`.
- Statusiem un filtriem izmantoti union tipi (`ProjectStatus`, `ProjectFilter`), nevis `enum`.
- `localStorage` dati tiek pārbaudīti ar `isProject(value: unknown): value is Project`.
- Lietotāja teksts tiek ievietots lapā tikai ar `document.createElement` un `textContent`.

## Kontrolpunktu vēsture

1. `Set up Vite, TypeScript and Tailwind`
2. `Add types and project data`
3. `Render projects and deadlines from data`
4. `Add typed filters and navigation`
5. `Add project form with validation and localStorage`
6. Dokumentācija un papildu uzdevumi

## Autors

Artemijs Stanko
