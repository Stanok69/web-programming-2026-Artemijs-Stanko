# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Artemijs Stanko
**Izmantotais(-ie) MI rīks(-i):** OpenCode (Big Pickle aģents) un ChatGPT

## Kam es izmantoju mākslīgo intelektu?

- Vite + Tailwind CSS projekta sākotnējai uzstādīšanai un `vite.config.js` konfigurācijai.
- `index.html` pārveidei no tradicionālā CSS uz Tailwind utilītklasēm.
- Mobilās navigācijas un projektu filtru JavaScript pielāgošanai.
- Kļūdu meklēšanai, responsīvā izkārtojuma pārbaudei un dokumentācijas sagatavošanai.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- `vite.config.js`, `src/style.css` `@theme` tokeni, lielākā daļa `index.html` utilītklešu un
  `src/app.js` loģikas.
- `README.md`, `AI_USAGE.md` un `REFLECTION.md` melnraksti.

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- Pārbaudīju un pielāgoju krāsu, atstarpju un tipogrāfijas vērtības, lai tās atbilstu
  oriģinālajam `styles.css`.
- Pārbaudīju responsīvo izkārtojumu 375 px, 768 px un 1280 px platumā.
- Pārbaudīju mobilās navigācijas atvēršanu un aizvēršanu, kā arī projektu filtrēšanu pārlūkā.
- Sakārtoju commit vēsturi pa pieciem kontrolpunktiem.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

MI ieteica saglabāt oriģinālo noteikumu `project-card:last-child { grid-column: span 2; }`.
Es to noraidīju, jo uzdevumā prasīts vienmērīgs 1/2/3 kolonnu izkārtojums — pēdējai kartītei
nevajadzētu izstiepties divās kolonnās.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Pārbaudīju mobilās navigācijas darbību: 375 px platumā nospiedu hamburgera pogu un
pārliecinājos, ka izvēlne atveras virs satura, `aria-expanded` maina vērtību un Escape taustiņš
to aizver. Tāpat pārbaudīju, ka filtri “All / Active / Done” paslēpj tikai atbilstošās kartītes.
