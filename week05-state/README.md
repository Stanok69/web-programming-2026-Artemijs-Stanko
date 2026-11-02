# CampusFlow — 5. nedēļa: stāvoklis un formas

CampusFlow projekta 5. nedēļas versija. Tā turpina 4. nedēļas React versiju: lapa joprojām
tiek salikta no komponentēm, un API dati ienāk caur props no `main.tsx`. Šonedēļ atgriežas
forma *Add a project* — tagad kā **kontrolēta React forma** — un pievienotie projekti
saglabājas `localStorage` caur pašu uzrakstītu hook `useLocalStorage<T>`.

## Tehnoloģijas

- **Vite** ar React un TypeScript
- **React 19**
- **TypeScript** ar ieslēgtu `strict` režīmu
- **Tailwind CSS 4** ar `@tailwindcss/vite` spraudni
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
week05-state/
├── index.html
├── public/api/
│   ├── projects.json       # 4 API projekti
│   └── deadlines.json      # 3 termiņi
├── src/
│   ├── main.tsx            # LoadState vērtības, load funkcijas un root.render
│   ├── App.tsx             # AppProps, localProjects un lapas salikšana
│   ├── validation.ts       # FormValues, FormErrors, validate()
│   ├── api.ts              # vienīgā vieta ar fetch (bez izmaiņām)
│   ├── guards.ts           # isProject / isDeadline / isProjectList
│   ├── types.ts            # Project, Deadline, CurrentWeather, LoadState (bez izmaiņām)
│   ├── weather.ts          # WMO koda pārvēršana tekstā (bez izmaiņām)
│   ├── date.ts             # datuma sadalīšana dienā un mēnesī
│   ├── index.css           # @import "tailwindcss" un @theme tokeni
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   └── components/
│       ├── AddProjectForm.tsx
│       ├── Field.tsx
│       ├── Announcement.tsx
│       ├── DeadlineItem.tsx
│       ├── DeadlineSection.tsx
│       ├── EmptyBox.tsx
│       ├── ErrorBox.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── LoadingBox.tsx
│       ├── ProjectCard.tsx
│       ├── ProjectFilters.tsx
│       ├── ProjectList.tsx
│       ├── ProjectSection.tsx
│       ├── Resources.tsx
│       ├── SectionHeading.tsx
│       ├── StatCard.tsx
│       └── WeatherCard.tsx
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── AI_USAGE.md
└── REFLECTION.md
```

## Stāvoklis un props

- `App` saņem `projects`, `deadlines` un `weather` kā `LoadState<...>`, kā arī
  `onRetryProjects` un `onRetryDeadlines`.
- `App` glabā pievienotos projektus ar
  `useLocalStorage<Project[]>("campusflow.week05.localProjects", [], isProjectList)`.
- `withLocalProjects()` sapludina API projektus ar pievienotajiem; sapludināto rezultātu
  saņem gan `ProjectSection`, gan *Active projects* kartīte.
- `ProjectSection` glabā filtru (`useState<ProjectFilter>`), saņem `onAdd` un pēc
  pievienošanas pārslēdz filtru uz **All**.
- `ProjectList` saņem `state`, `filter` un `onRetry`; tas pārvalda `loading`, `error` un
  `success` stāvokļus ar pilnu `switch` un `never` pārbaudi.
- `AddProjectForm` saņem `disabled` un `onAdd`. Forma pati projektu neglabā — tā izsauc
  `onAdd`, un lēmumu par glabāšanu pieņem `App`.
- `Field` saņem `label`, `htmlFor`, `error`, neobligātu `hint` un `children`.
- `WeatherCard` saņem `weather: LoadState<CurrentWeather>` un izmanto `StatCard`.

## Forma un validācija

`src/validation.ts` satur `FormValues`, `FormErrors`, `EMPTY_FORM` un tīro funkciju
`validate(values)`. Tā atgriež `ValidationResult` ar lauku `ok`, kas sašaurina tipu:

- nosaukums pēc `trim()` vismaz 3 simboli;
- apraksts pēc `trim()` no 10 līdz 200 simboliem;
- kategorija no `categories` saraksta;
- datums formātā `YYYY-MM-DD`;
- progress vesels skaitlis no 0 līdz 100; ja 100, statuss ir `"done"`.

Visi pieci lauki ir kontrolēti: katram ir `value` un `onChange`. Kļūdas parādās zem sava
lauka, laukam ir `aria-invalid`, bet ziņa par pievienošanu atrodas elementā ar
`role="status"`. Apraksta simbolu skaitītājs tiek aprēķināts katrā zīmēšanā no
`values.description` — tam nav sava `useState`.

## `useLocalStorage<T>`

Hook atgriež `readonly [T, (next: T) => void]`. Sākuma vērtību tas nolasa vienreiz ar
`useState` funkciju, pārbauda ar `isValid` (mūsu gadījumā `isProjectList`) un bojātu vai
nepareizu saturu aizstāj ar `initialValue`. Setter vispirms izsauc `setValue(next)` un pēc
tam ieraksta `localStorage.setItem(key, JSON.stringify(next))`. Abas darbības ir `try/catch`
iekšā, tāpēc bloķēta vai pilna krātuve lapu nesalauž. `useEffect` šim hook nav vajadzīgs.

## Tipu drošība

- `strict: true`, bez `any` un bez `@ts-ignore` / `@ts-expect-error`.
- API un `localStorage` dati tiek pārbaudīti ar type guard funkcijām; `as` netiek lietots.
- `fetch` tiek izsaukts tikai `src/api.ts`, `localStorage` — tikai `src/hooks/useLocalStorage.ts`.
- Nav `useEffect`, `document.querySelector`, `createElement`, `innerHTML` vai
  `dangerouslySetInnerHTML`.
- Stāvoklis netiek mainīts uz vietas: tiek veidoti jauni objekti un masīvi.
- Katram saraksta elementam ir stabils `key`.

## Pārbaudes

Pārbaudīti 4. nedēļas gadījumi un 11 jaunie 5. nedēļas gadījumi:

- tukša forma rāda piecas kļūdas un neko nepievieno;
- atstarpes nosaukumā un `50.5` / `-1` progresā tiek noraidīti;
- derīgs projekts parādās saraksta beigās, *Active projects* skaits mainās, ziņa parādās;
- pēc pārlādes projekts paliek, un `localStorage` ir atslēga
  `campusflow.week05.localProjects`;
- projekts ar progresu 100 kļūst par *Done* un aktīvo skaitu nepalielina;
- filtrs **Active** pēc pievienošanas pārslēdzas uz **All**;
- ielādes un kļūdas laikā poga *Add project* ir atspējota;
- bojāts `localStorage` (`{bad`) netraucē lapai un konsolē nav kļūdu;
- ievadītais teksts paliek pēc laikapstākļu pārzīmēšanas;
- `<img src=x onerror=alert(1)>` kartītē redzams kā teksts;
- 201 simbols aprakstā iekrāso skaitītāju sarkanu un dod kļūdu.

## Kontrolpunktu vēsture

1. `Create week05-state from week04-react`
2. `Add controlled Add a project form`
3. `Validate the form and show field errors`
4. `Keep added projects in App state`
5. `Persist added projects with useLocalStorage`
6. Dokumentācija

## Autors

Artemijs Stanko
