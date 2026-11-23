# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Artemijs Stanko
**Izmantotais(-ie) MI rīks(-i):** OpenCode (Big Pickle aģents) un ChatGPT

## Kam es izmantoju mākslīgo intelektu?

- Kontrolētās formas `AddProjectForm` un `Field` komponentes izveidei.
- `validation.ts` validācijas funkcijas un `FormValues` tipu pārnešanai no 3. nedēļas.
- `useLocalStorage<T>` hook izstrādei un `isProjectList` pārbaudes pievienošanai.
- Kļūdu meklēšanai, pārbaudēm pārlūkā un dokumentācijas sagatavošanai.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- `src/components/AddProjectForm.tsx`, `src/components/Field.tsx` un `src/validation.ts`.
- `src/hooks/useLocalStorage.ts` un izmaiņas `App.tsx` datu plūsmā.
- `README.md`, `AI_USAGE.md` un `REFLECTION.md` melnrakstus.

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- Pārbaudīju, ka `types.ts` un `api.ts` ir tie paši faili kā `week04-react`.
- Pārbaudīju, ka `guards.ts` ir tikai papildināts ar `isProjectList`, bet vecās funkcijas
  nav mainītas.
- Salīdzināju formas izskatu ar 3. nedēļu un pārbaudīju to 375, 768, 1024 un 1280 pikseļu
  platumā.
- Sakārtoju commit vēsturi pa kontrolpunktiem un palaidu `npm run build` un `npm run lint`.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

MI ieteica `useLocalStorage` iekšā izmantot `useEffect`, lai saglabātu vērtību pēc katras
izmaiņas. Es to noraidīju, jo uzdevumā `useEffect` šonedēļ ir aizliegts. Tā vietā hook
sākuma vērtību nolasa vienreiz `useState` funkcijā un raksta tikai savā setterī. Tāpat
noraidīju `FormEvent` un `as Project[]` pēc `JSON.parse` — formas notikumam izmantoju
`SubmitEvent` no `react`, bet krātuves datiem — `isProjectList`.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Pārbaudīju visus 11 jaunos gadījumus no uzdevuma 9. sadaļas. Jo īpaši pārbaudīju bojātu
`localStorage` ar vērtību `{bad`: lapa turpināja strādāt, rādīja tikai API projektus un
konsolē nebija kļūdu. Atsevišķi pārbaudīju arī to, ka ielādes laikā poga *Add project* ir
atspējota un ka ierakstītais teksts paliek pēc laikapstākļu datu atnākšanas.
