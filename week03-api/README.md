# CampusFlow — dati no API

CampusFlow projekta 3. nedēļas versija. Projekti un termiņi vairs nav ierakstīti kodā: lapa tos
ielādē ar `fetch` no JSON failiem `public/api/`, pārbauda ar type guard funkcijām un parāda
lietotājam ielādes, kļūdas un tukšo stāvokli. Lapā ir arī pašreizējie laikapstākļi Rīgā no
Open-Meteo API.

## Tehnoloģijas

- **Vite 8** (Vanilla TypeScript)
- **TypeScript 6** ar ieslēgtu `strict` režīmu
- **Tailwind CSS 4** ar `@tailwindcss/vite` spraudni (bez CDN)
- **Open-Meteo** laikapstākļu API

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
week03-api/
├── index.html          # lapas struktūra un tukši konteineri datiem
├── public/api/
│   ├── projects.json   # 4 projekti, ko lapa ielādē ar fetch
│   └── deadlines.json  # 3 termiņi, ko lapa ielādē ar fetch
├── src/
│   ├── main.ts         # ieejas punkts, LoadState stāvokļi un notikumu piesaiste
│   ├── api.ts          # vienīgā vieta ar fetch; ielāde, pārbaude un kļūdu apraksti
│   ├── guards.ts       # isProject / isDeadline type guard funkcijas
│   ├── types.ts        # Project, Deadline, CurrentWeather, LoadState
│   ├── render.ts       # renderProjects / renderDeadlines ar LoadState
│   ├── weather.ts      # WMO koda pārvēršana tekstā
│   ├── form.ts         # formas validācija
│   ├── storage.ts      # tikai lietotāja projektu saglabāšana
│   ├── ui.ts           # mobilā navigācija un paziņojums
│   └── style.css       # @import "tailwindcss" un @theme tokeni
├── public/favicon.svg
├── vite.config.ts
├── tsconfig.json
├── AI_USAGE.md
└── REFLECTION.md
```

## Funkcionalitāte

- Projekti un termiņi tiek ielādēti no `public/api/*.json` ar `fetch`.
- Katrai sadaļai ir savs `LoadState<T>`: `loading`, `error` vai `success`.
- Ielādes laikā redzams *"Loading projects…"* / *"Loading deadlines…"*.
- Kļūdas gadījumā redzams saprotams ziņojums un poga **Try again**, kas atkārtoti ielādē tikai
  savu sadaļu.
- Tukša saraksta gadījumā redzams paskaidrojums; termiņiem — *"No upcoming deadlines."*.
- Statistikas kartīte *Active projects* rāda `…` ielādes laikā un `–` kļūdas gadījumā.
- Poga **Add project** ir atspējota, kamēr projekti nav veiksmīgi ielādēti.
- `localStorage` glabā tikai lietotāja pievienotos projektus ar atslēgu
  `campusflow.week03.localProjects`. Lapā redzami API projekti + pievienotie projekti.
- Dzēst var tikai paša pievienotos projektus; API projektus dzēst nevar.
- Forma *Add a project* ar validāciju: nosaukums ≥ 3 simboli, apraksts ≥ 10 simboli, izvēlēta
  kategorija, norādīts termiņš, progress — vesels skaitlis 0–100.
- Filtri **All / Active / Done** darbojas gan ar API, gan lokālajiem projektiem.
- Kartīte *Rīga now* rāda noapaļotu temperatūru (°C), vēja ātrumu (km/h) un laikapstākļu aprakstu
  no WMO koda. Ja laikapstākļi neielādējas, redzams *"Weather unavailable"*.
- Ja serveris neatbild 8 sekunžu laikā, pieprasījums tiek pārtraukts ar `AbortSignal.timeout`.
- Mobilā navigācija: atvēršana, aizvēršana ar Escape un `aria-expanded` atjaunināšana.

## Tipu drošība

- `strict: true`, bez `any` un bez `@ts-ignore` / `@ts-expect-error`.
- Statusiem un filtriem izmantoti union tipi (`ProjectStatus`, `ProjectFilter`, `LoadState`),
  nevis `enum`.
- `response.json()` rezultāts tiek saglabāts kā `unknown`, nevis `any`.
- API dati tiek pārbaudīti ar type guard funkcijām `isProject` un `isDeadline`; `as` API datiem
  netiek izmantots.
- Open-Meteo atbilde tiek pārveidota savā tipā `CurrentWeather`, tāpēc pārējā lietotne nezina
  API lauku nosaukumus (`temperature_2m`, `wind_speed_10m`).
- `fetch` tiek izsaukts tikai `src/api.ts` failā.
- Lietotāja teksts tiek ievietots lapā tikai ar `document.createElement` un `textContent`.

## Kontrolpunktu vēsture

1. `Copy week02 as week03-api`
2. `Move projects and deadlines to JSON API files`
3. `Add typed API layer with type guards`
4. `Add loading, error and empty states`
5. `Add weather from Open-Meteo`
6. Dokumentācija un papildu uzdevumi

## Autors

Artemijs Stanko
