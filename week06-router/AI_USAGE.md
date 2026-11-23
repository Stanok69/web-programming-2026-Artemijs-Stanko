# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Artemijs Stanko  
**Izmantotie MI rīki:** OpenCode (Big Pickle aģents) un ChatGPT

## Kam izmantoju MI

- Maršrutēšanas struktūras plānošanai un `react-router` deklaratīvā režīma lietojumam.
- `Layout`, `Outlet`, `Routes`/`Route`, `NavLink`, `Link`, `useParams` un `useLocation` ieviešanai.
- Lapu sadalei (`DashboardPage`, `ProjectsPage`, `ProjectDetailsPage`, `DeadlinesPage`, `NotFoundPage`).
- `ProjectDetailsPage` stāvokļu secības pārskatīšanai un `format.ts` / `projectStyles.ts` organizēšanai.
- Kļūdu meklēšanai, pārlūka pārbaudēm un dokumentācijas melnrakstiem.

## Kuru kodu būtiskā apjomā ģenerēja MI

- `src/components/Layout.tsx`; visi faili mapē `src/pages/`.
- `src/format.ts` un `src/projectStyles.ts`.
- Izmaiņas `src/App.tsx`, `src/main.tsx`, `src/components/Header.tsx`, `Hero.tsx`,
  `ProjectCard.tsx`, `DeadlineSection.tsx`, `DeadlineItem.tsx`.
- `README.md`, `AI_USAGE.md` un `REFLECTION.md` melnraksti.

## Ko pārbaudīju un pārveidoju pats

- Pārliecinājos, ka `src/types.ts`, `src/api.ts` un `src/guards.ts` nav mainīti.
- Pārbaudīju, ka nav `react-router-dom`, ka viss importēts no `react-router` un ka
  `main.tsx` izmanto `BrowserRouter`.
- Pārbaudīju, ka *Projects* ir aktīva arī uz `/projects/:projectId`, ka *Resources* nav
  galvenē un ka *Open resources* paliek `<a href="#resources">`.
- Sakārtoju commit vēsturi pa kontrolpunktiem, palaidu `npm run build` un `npm run lint`
  un veicu pārbaudes pārlūkā.

## Viens MI ieteikums, kuru noraidīju

MI ieteica izmantot `createBrowserRouter`, `loader` un `useLoaderData`, lai datus ielādētu
lapās. Noraidīju, jo uzdevumā noteikts: dati lapām ienāk caur props no `App`/`main.tsx`,
un `createBrowserRouter` šonedēļ nav jālieto. Tāpat noraidīju ieteikumu visu stāvokli
pārcelt uz adreses parametriem — tas ir tikai izvēles uzdevums.

## Ko pārbaudīju pats, neuzticoties MI atbildei

Uz brīdi pievienoju `setTimeout` `fetchProjects` un pārliecinājos, ka `/projects/p1`
vispirms rāda *Loading project…*, nevis *Project not found*. Pārbaudīju arī kļūdas stāvokli
ar bloķētu `projects.json`, projekta saglabāšanos pēc F5 un *Active projects* skaitli.
Papildus pārbaudīju, ka `Link/NavLink` navigācija neizraisa jaunus API pieprasījumus un
ka atkārtota `main.tsx` zīmēšana nepazaudē formā ierakstīto tekstu.
