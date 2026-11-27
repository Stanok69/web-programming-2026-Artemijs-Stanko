# Darba žurnāls — CampusFlow

**Vārds, uzvārds:** Artemijs Stanko  
**Kurss:** Web Programming  
**Repozitorijs:** https://github.com/Stanok69/web-programming-2026-Artemijs-Stanko

## Vispārējie termiņi

| Posms | Sākums | Pabeigts |
|---|---|---|
| Visu darbu kopā (1.–6. nedēļa) | 14.09.2026 | 27.11.2026 |
| 6. nedēļa (`week06-router`) | 02.11.2026 | 23.11.2026 |
| Gala dokumentācija un šis žurnāls | 27.11.2026 | 27.11.2026 |

## Darbību apraksts pa datumiem

| Datums | Mape / nedēļa | Īss veikto darbību apraksts |
|---|---|---|
| 14.09.2026 | `week01-tailwind` (sākotnējais mēģinājums) | Vite un Tailwind CSS iestatīšana, pamata stili, dashboard un mijiedarbības. Versija vēlāk saglabāta arhīvā kā `archive/week01-tailwind-v1`. |
| 26.10.2026 | `week01-tailwind` – `week04-react` | Tailwind migrācijas pabeigšana; TypeScript tipu un datu ieviešana; JSON API slānis ar `LoadState`, kļūdu un ielādes stāvokļiem; Open-Meteo laikapstākļi; pāreja uz React komponentēm ar tipizētiem props. |
| 02.11.2026 | `week05-state` | Kontrolēta *Add a project* forma, lauku validācija, pievienoto projektu glabāšana `App` stāvoklī un `useLocalStorage<T>` hook. Pārbaudes pārlūkā un dokumentācija. |
| 02.11.2026 | `week06-router` (darba sākums) | Uzdevuma TASK izlasīšana; `week05-state` nokopēts kā `week06-router`; JSON datumi atjaunoti nākotnē un pievienoti vēl divi termiņi; uzstādīta pakotne `react-router`. |
| 23.11.2026 | `week06-router` (izstrādes pabeigšana) | Pēc vides restarta projekts atjaunots tīrā Git klonā. Izveidots `BrowserRouter`, kopīgs `Layout` ar `Outlet` un maršruti `App.tsx`. Dashboard sadalīts lapās, pievienots `limit={3}` termiņiem. Izveidota projekta detaļu lapa ar `useParams`, `format.ts` un `projectStyles.ts`. Pievienota 404 lapa ar `useLocation`; visas iekšējās saites pārvestas uz `Link`/`NavLink`. Veiktas 5. nedēļas un visas 15 jaunās pārbaudes, `npm run build` un `npm run lint`. Visi 6 kommiti publicēti GitHub `main`. |
| 27.11.2026 | Dokumentācija | Pārskatīts `README.md`, `AI_USAGE.md` un `REFLECTION.md`; izveidots šis darba žurnāls ar datumiem un īsu darbību aprakstu. |

## Kontrolpunktu hronoloģija (`week06-router`)

| Nr. | Datums | Kommits |
|---|---|---|
| 1 | 23.11.2026 | `Create week06-router from week05-state` |
| 2 | 23.11.2026 | `Add React Router and a shared Layout` |
| 3 | 23.11.2026 | `Split the dashboard into pages` |
| 4 | 23.11.2026 | `Add project details with a URL parameter` |
| 5 | 23.11.2026 | `Add the 404 page and connect all links` |
| 6 | 23.11.2026 | `Document the week 6 routing work` |

## Kopsavilkums

Darbs sāks 14.09.2026 ar sākotnējo Tailwind versiju un pabeigts 27.11.2026 ar 6. nedēļas
maršrutēšanas projektu un gala dokumentāciju. Galīgā versija atrodas mapē `week06-router`
un ir publiskota GitHub repozitorijā uz `main` zaras.
