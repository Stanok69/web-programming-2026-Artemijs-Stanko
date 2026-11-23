# CampusFlow — 6. nedēļa: maršrutēšana un lietotnes struktūra

CampusFlow 6. nedēļas versija turpina 5. nedēļas darbu: API dati joprojām ienāk caur props
no `main.tsx`, pievienotie projekti glabājas `App` stāvoklī un `localStorage`. Šonedēļ viena
garā lapa ir sadalīta atsevišķās lapās ar īstām adresēm, izmantojot **React Router**
deklaratīvo režīmu.

## Tehnoloģijas

- Vite, React 19, TypeScript (`strict`), Tailwind CSS 4, Oxlint
- **React Router 8** — pakotne `react-router`, nevis `react-router-dom`
- Open-Meteo laikapstākļu API

## Palaišana

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Maršruti

| Adrese | Lapa |
|---|---|
| `/` | Dashboard: Hero, statistika, 3 tuvākie termiņi, Resources |
| `/projects` | Visi projekti, filtrs, forma *Add a project* |
| `/projects/:projectId` | Viena projekta detaļas; id ir adresē |
| `/deadlines` | Visi termiņi |
| jebkura cita | 404 lapa |

`App.tsx` atgriež `Routes`/`Route`. Maršruts bez `path` ir kopīgais `Layout` ar `Header`,
`Outlet` un `Footer`. `index` ir lapa vecāka adresē (`/`), `:projectId` ir mainīga adreses
daļa, bet `*` ir viss pārējais. `main.tsx` aptin `App` ar `BrowserRouter`.

## Struktūra

```text
week06-router/
├── public/api/projects.json       # 4 API projekti
├── public/api/deadlines.json      # 5 termiņi
├── src/
│   ├── main.tsx                   # BrowserRouter, LoadState un root.render
│   ├── App.tsx                    # localProjects, withLocalProjects un Routes
│   ├── format.ts                  # formatDate, daysUntil, splitDate
│   ├── projectStyles.ts           # kopīgas krāsu un tekstu kartes
│   ├── validation.ts, api.ts, guards.ts, types.ts, weather.ts
│   ├── hooks/useLocalStorage.ts
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetailsPage.tsx
│   │   ├── DeadlinesPage.tsx
│   │   └── NotFoundPage.tsx
│   └── components/
│       ├── Layout.tsx un pārējie 5. nedēļas komponenti
│       ├── Header.tsx (NavLink)
│       ├── Hero.tsx, ProjectCard.tsx, DeadlineSection.tsx
│       └── DeadlineItem.tsx
├── AI_USAGE.md
└── REFLECTION.md
```

## Datu plūsma

- `App` saņem `projects`, `deadlines` un `weather` kā `LoadState<...>`, kā arī abas
  `onRetry...` funkcijas.
- `useLocalStorage<Project[]>("campusflow.week06.localProjects", [], isProjectList)` glabā
  pievienotos projektus; `withLocalProjects()` tos sapludina ar API projektiem.
- `DashboardPage` iegūst gatavu *Active projects* skaitli kā tekstu, rāda Hero, četras
  kartītes, `DeadlineSection` ar `limit={3}` un Resources.
- `ProjectsPage` rāda `ProjectSection` ar filtru un kontrolēto formu.
- `DeadlinesPage` rāda `DeadlineSection` bez limita — visi 5 termiņi, virsraksts
  *All deadlines*, nav saites *See all*.
- `ProjectDetailsPage` saņem `projects` un `onRetry`, nolasa `projectId` ar `useParams()`
  un projektu atrod ar `find()`.

## Saites

Galvenē ir tikai trīs `NavLink` saites: *Dashboard* (`/`, ar `end`), *Projects*
(`/projects`) un *Deadlines* (`/deadlines`). *Projects* paliek aktīva arī detaļu lapā.
Logotips ir `Link to="/"` un aizver mobilo izvēlni. Hero *View projects* veda uz
`/projects`, bet *Open resources* paliek `<a href="#resources">` — tas ir enkurs tajā pašā
lapā. `ProjectCard` ved uz `/projects/${project.id}`, `DeadlineSection` saite *See all*
ved uz `/deadlines`. Citas CampusFlow lapas netiek atvērtas ar `<a href="/...">`, tāpēc
pāreja notiek bez pārlādes un API pieprasījumi neatkārtojas.

## Projekta detaļas

Secība: atpakaļ saite `← All projects`, pēc tam:

1. `loading` → `LoadingBox text="Loading project…"`;
2. `error` → `ErrorBox` ar *Try again*;
3. `success`, bet nav atrasts → `EmptyBox` *Project not found* ar meklēto id;
4. detaļas: kategorija, statuss, nosaukums, apraksts, termiņš, progress.

Termiņa teksts nāk no `format.ts`: `Submitted Nov 9`, `Due Nov 18 — in 16 days` vai
`Overdue since ...`. `projectId` ir `string | undefined`, salīdzināšanai ar `===` tas
netraucē, un `as` netiek lietots.

## 404 lapa

`NotFoundPage` izmanto `useLocation()`, parāda nepareizo `pathname` kā tekstu un piedāvā
`Link to="/"`. Tā atrodas `Layout` iekšpusē, tāpēc galvene un kājene ir redzamas.

## Tipu drošība un pārbaudes

- Nav `any`, `@ts-ignore`, `useEffect`, `createBrowserRouter`, `loader`, `useLoaderData`,
  `react-router-dom`, `innerHTML`, `dangerouslySetInnerHTML` vai `querySelector`.
- `as` nav izmantots ne API, ne localStorage, ne adreses parametru datiem.
- `fetch` ir tikai `api.ts`, `localStorage` — tikai `hooks/useLocalStorage.ts`.
- `src/types.ts`, `src/api.ts` un `src/guards.ts` ir tādi paši kā `week05-state`.
- Pārbaudīti visi 5. nedēļas gadījumi un visi 15 jaunie 6. nedēļas gadījumi, tostarp
  tiešās adreses ar F5, navigācija bez pārlādes, back/forward, aktīvā saite, 3/5 termiņi,
  projekta detaļas un nezināms id, ielādes/kļūdas stāvokļi, pašu projekts pēc pārlādes,
  skaitītājs, 404, HTML kā teksts, 390 px izvēlne un teksta saglabāšana pēc atkārtotas
  `main.tsx` zīmēšanas.

## Kontrolpunktu vēsture

1. `Create week06-router from week05-state`
2. `Add React Router and a shared Layout`
3. `Split the dashboard into pages`
4. `Add project details with a URL parameter`
5. `Add the 404 page and connect all links`
6. Dokumentācija

## Autors

Artemijs Stanko
