# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Artemijs Stanko
**Izmantotais(-ie) MI rīks(-i):** OpenCode (Big Pickle aģents) un ChatGPT

## Kam es izmantoju mākslīgo intelektu?

- 3. nedēļas statiskā izkārtojuma pārnešanai uz React komponentēm (`Header`, `Hero`,
  `StatCard`, `ProjectCard`, `DeadlineItem` u.c.).
- Tipizētu props interfeisu izveidei un `App` datu plūsmas pārveidei uz `LoadState` props.
- Filtrēšanas, mobilās izvēlnes un laikapstākļu kartītes stāvokļu izstrādei.
- Kļūdu meklēšanai, pārbaudēm ar DevTools un dokumentācijas sagatavošanai.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- `src/components/` mapes komponentes un `src/App.tsx` struktūru.
- `src/main.tsx` datu ielādes un `render()` loģiku.
- `README.md`, `AI_USAGE.md` un `REFLECTION.md` melnrakstus.

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- Pārbaudīju, ka `types.ts`, `guards.ts` un `api.ts` ir burtiski tie paši faili kā
  `week03-api`, un ka `render.ts` nav pārnests.
- Pārbaudīju, ka izskats paliek tāds pats kā 3. nedēļā: salīdzināju kartīšu izmērus,
  atstarpes un krāsas ar DevTools.
- Pārbaudīju, ka forma *Add a project* šonedēļ tiešām nav pievienota.
- Sakārtoju commit vēsturi pa kontrolpunktiem un pārbaudīju `npm run build` un
  `npm run lint`.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

MI ieteica datu ielādei izmantot `useEffect` un turēt `LoadState` vērtības `App` iekšpusē.
Es to noraidīju, jo uzdevumā teikts, ka `useEffect` šonedēļ nav atļauts un ka datus
`App` jāsaņem kā props. Tāpēc ielāde palika `main.tsx`, kas pēc katra pieprasījuma izsauc
`render()` un padod `App` jaunu props objektu. `useState` palika tikai filtram, mobilajai
izvēlnei un paziņojumam.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Pārbaudīju visus 8 gadījumus no uzdevuma 11. sadaļas: lēnu tīklu ar trim ielādes tekstiem,
bloķētu `projects.json`, `"progress": "50"`, tukšu `[]`, bloķētus laikapstākļus,
`<b>test</b>` kā tekstu, filtru **Done** pēc termiņu atkārtotas ielādes un konsoli bez React
brīdinājumiem. Atsevišķi pārbaudīju arī izkārtojumu 375, 768, 1024 un 1280 pikseļu platumā:
projektu režģim jābūt attiecīgi 1, 2, 3 un 3 kolonnām.
