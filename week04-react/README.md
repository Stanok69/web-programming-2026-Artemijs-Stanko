# CampusFlow — React komponentes ar tipizētiem props

CampusFlow projekta 4. nedēļas versija. Lapa ir pārnesta uz **React + TypeScript**: visa
saskarne ir salikta no komponentēm, un katrai komponentei, kas saņem datus, ir aprakstīts
`interface ...Props`. Datu slānis no 3. nedēļas (`types.ts`, `guards.ts`, `api.ts`) pārnests
bez izmaiņām, bet `render.ts` vairs nav — tā vietā ir JSX. Šonedēļ lapā nav formas
*Add a project*.

## Tehnoloģijas

- **Vite 8** ar React un TypeScript
- **React 19**
- **TypeScript 6** ar ieslēgtu `strict` režīmu
- **Tailwind CSS 4** ar `@tailwindcss/vite` spraudni (bez CDN)
- **Oxlint** ar React noteikumiem
- **Open-Meteo** laikapstākļu API

## Palaišana

```bash
npm install
npm run dev
```

Produkcijas būvējums, tipu pārbaude un lint:

```bash
npm run build
npm run lint
npm run preview
```

## Struktūra

```text
week04-react/
├── index.html              # tikai #root un body klases
├── public/api/
│   ├── projects.json       # 4 projekti (tie paši kā 3. nedēļā)
│   └── deadlines.json      # 3 termiņi
├── src/
│   ├── main.tsx            # LoadState vērtības, load funkcijas un root.render
│   ├── App.tsx             # AppProps un lapas salikšana
│   ├── api.ts              # vienīgā vieta ar fetch (bez izmaiņām)
│   ├── guards.ts           # isProject / isDeadline (bez izmaiņām)
│   ├── types.ts            # Project, Deadline, CurrentWeather, LoadState (bez izmaiņām)
│   ├── weather.ts          # WMO koda pārvēršana tekstā (bez izmaiņām)
│   ├── date.ts             # datuma sadalīšana dienā un mēnesī
│   ├── index.css           # @import "tailwindcss" un @theme tokeni
│   └── components/
│       ├── Announcement.tsx
│       ├── DeadlineItem.tsx
│       ├── DeadlineSection.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── ProjectCard.tsx
│       ├── ProjectFilters.tsx
│       ├── ProjectList.tsx
│       ├── ProjectSection.tsx
│       ├── Resources.tsx
│       ├── SectionHeading.tsx
│       ├── StatCard.tsx
│       ├── StateBox.tsx
│       └── WeatherCard.tsx
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── AI_USAGE.md
└── REFLECTION.md
```

## Komponentes un props

- `App` saņem `projects`, `deadlines` un `weather` kā `LoadState<...>`, kā arī
  `onRetryProjects` un `onRetryDeadlines`.
- `ProjectSection` saņem projektu stāvokli un pati glabā filtru ar `useState<ProjectFilter>`.
- `ProjectFilters` saņem `current` un `onChange`, bet pati filtru nemaina.
- `ProjectList` saņem `state`, `filter` un `onRetry`; tas pārslēdz `loading`, `error` un
  `success` stāvokļus ar pilnu `switch` un `never` pārbaudi `default` zarā.
- `ProjectCard` saņem vienu `project: Project`, `DeadlineItem` — vienu `deadline: Deadline`.
- `DeadlineSection` saņem termiņu stāvokli un `onRetry`; saraksts tiek kārtots pēc datuma un
  laika.
- `WeatherCard` saņem `weather: LoadState<CurrentWeather>` un izmanto `StatCard`.
- `StatCard` saņem `index`, `label`, `value`, `note` un neobligātu `tone`.
- `Header` saņem lietotāja datus un glabā tikai mobilās izvēlnes atvērto/aizvērto stāvokli.
- `ErrorBox` saņem `message` un `onRetry: () => void`, bet pati neko neielādē.

## Datu plūsma

`main.tsx` glabā trīs `LoadState` vērtības un pēc katra pieprasījuma izsauc `render()`, kas
`App` komponentei padod svaigu props objektu. `useEffect` netiek izmantots vispār.
`useState` ir tikai lokālai saskarnes loģikai:

- `ProjectSection` — izvēlētais filtrs;
- `Header` — mobilā izvēlne;
- `Announcement` — paziņojuma redzamība.

Tāpēc, kad `main.tsx` pārzīmē lapu pēc termiņu atkārtotas ielādes, filtrs paliek
izvēlētajā vērtībā: `ProjectSection` netiek izveidots no jauna, un tā `useState` vērtība
saglabājas.

## Stāvokļi

- Ielādes laikā redzams *"Loading projects…"*, *"Loading deadlines…"* un
  *"Loading weather…"*.
- Kļūdas gadījumā katra sadaļa rāda savu ziņojumu un pogu **Try again**, kas atkārtoti
  ielādē tikai attiecīgo sadaļu.
- Tukšs projektu saraksts rāda *"No projects here yet"*, tukšs termiņu saraksts —
  *"No upcoming deadlines."*.
- Ja laikapstākļi neielādējas, kartīte rāda *"Weather unavailable"*, bet pārējā lapa strādā.
- Filtri **All / Active / Done** darbojas bez papildu pieprasījumiem.
- Mobilā izvēlne atveras ar pogu, aizveras pēc saites noklikšķināšanas, un pogai tiek
  atjaunināts `aria-expanded`.

## Tipu drošība

- `strict: true` abos tsconfig failos, bez `any` un bez `@ts-ignore` / `@ts-expect-error`.
- API dati tiek pārbaudīti ar type guard funkcijām; `as` API datiem netiek izmantots.
- `fetch` tiek izsaukts tikai `src/api.ts`.
- Sarakstos `key` ir `id` no datiem, nevis masīva indekss.
- Nav `document.querySelector`, `createElement`, `innerHTML` vai
  `dangerouslySetInnerHTML` — lietotāja teksts nonāk lapā tikai caur JSX `{...}`.

## Pārbaudes

Pārbaudīti visi 8 gadījumi no uzdevuma 11. sadaļas: lēns tīkls ar trim ielādes tekstiem,
bloķēts `projects.json` ar **Try again**, `"progress": "50"`, tukšs `[]`, bloķēti
laikapstākļi, `<b>test</b>` kā teksts, filtrs **Done** pēc termiņu atkārtotas ielādes un
tīra konsole bez React brīdinājumiem par `key`.

## Kontrolpunktu vēsture

1. `Create week04-react with Vite react-ts and Tailwind`
2. `Move static layout to React components`
3. `Pass API data to App as typed props`
4. `Render projects and deadlines from LoadState props`
5. `Add weather card, filter and mobile menu`
6. Dokumentācija

## Autors

Artemijs Stanko
