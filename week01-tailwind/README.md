# CampusFlow — CSS → Tailwind CSS

CampusFlow ir studenta darba telpas panelis ar projektiem, termiņiem un mācību resursiem.
Šajā nedēļā vietne tika pārveidota no tradicionālā CSS uz **Vite + Tailwind CSS**, saglabājot
sākotnējo izskatu, responsīvo uzvedību un JavaScript funkcionalitāti.

## Tehnoloģijas

- **Vite 8** (Vanilla JavaScript)
- **Tailwind CSS 4** ar `@tailwindcss/vite` spraudni
- Nav Tailwind CDN — viss CSS tiek būvēts lokāli

## Palaišana

```bash
npm install
npm run dev
```

Produkcijas būvējums un priekšskatījums:

```bash
npm run build
npm run preview
```

## Struktūra

```text
week01-tailwind/
├── index.html          # visa lapa ar Tailwind utilītklasēm
├── src/
│   ├── main.js         # Vite ieejas punkts
│   ├── app.js          # mobilā navigācija, projektu filtri, paziņojums
│   └── style.css       # @import "tailwindcss" un @theme dizaina tokeni
├── public/favicon.svg
├── vite.config.js
├── AI_USAGE.md
└── REFLECTION.md
```

## Funkcionalitāte

- Sticky galvene ar mobilās navigācijas hamburgera pogu.
- Projektu filtrēšana pēc statusa (**All / Active / Done**).
- Aizverams paziņojuma komponents.
- Responsīvs izkārtojums: projektu kartītes 1 / 2 / 3 kolonnās.
- Piekļūstamība: `aria-expanded`, `aria-pressed`, `aria-label` un redzami `focus-visible` stili.
- Hover efekti projektu kartītēm, pogām un saitēm.

## Dizaina uzlabojumi

- Gradients akcents galvenajā virsrakstā.
- Jauns paziņojuma komponents (`#announcement`), veidots tikai ar Tailwind klasēm.
- Vienmērīgs 1/2/3 kolonnu projektu režģis bez `grid-column: span` izņēmuma.

## Kontrolpunktu vēsture

1. `Set up Vite and Tailwind`
2. `Migrate header and hero`
3. `Migrate dashboard and project cards`
4. `Add responsive Tailwind layout`
5. `Finish Tailwind migration`

## Autors

Artemijs Stanko
