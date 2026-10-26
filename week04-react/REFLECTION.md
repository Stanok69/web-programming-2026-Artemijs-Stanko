# Individuālā refleksija

## 1. Props tipi

Kad izdzēsu `note` un ierakstīju `tone="green"`, kļūda parādījās nevis pārlūkā, bet
`npm run build` laikā, jo būvējums sākas ar `tsc -b`. TypeScript teica
`TS2741: Property 'note' is missing ... but required in type 'StatCardProps'` un
`TS2322: Type '"green"' is not assignable to type 'StatTone | undefined'`. Pārlūkā lapa
šajā brīdī nemaz netika atjaunināta, jo jauns būvējums neizdevās. JavaScript React
projektā šādas kļūdas nebūtu: komponente saņemtu `undefined`, un lapā vienkārši parādītos
tukša vieta vai nepareizs teksts. Kļūdu pamanītu tikai vēlāk, apskatot lapu.

## 2. Kas pārnāca, kas pazuda

`types.ts`, `guards.ts` un `api.ts` varēja pārnest bez izmaiņām, jo tajos nav nekā no DOM —
tikai tipi, pārbaudes funkcijas un `fetch`. Tie nezināja, kā lapa tiek zīmēta. `render.ts`
bija pretējais: tajā bija `document.createElement` un `replaceChildren`, tāpēc tas bija
cieši saistīts ar vienu konkrētu HTML struktūru. React to aizstāj ar JSX, un veco
renderēšanas kodu pārnest vairs nebija jēgas.

## 3. Funkcija kā prop

`ErrorBox` neizsauc `fetchProjects()` pati, jo tad tā būtu saistīta ar vienu konkrētu datu
avotu un nevarētu rādīt citu sadaļu kļūdas. Vecākkomponente zina, ko ielādēt, un padod
tikai funkciju. `onClick={onRetry}` nodod funkciju, ko React izsauks klikšķa laikā.
`onClick={onRetry()}` izsauc funkciju uzreiz renderēšanas laikā un pogai nodod tās
rezultātu, tāpēc poga vairs neko nedarītu.

## 4. `key` un stāvoklis

`project.id` ir stabils, tāpēc React atpazīst vienu un to pašu kartīti arī pēc filtrēšanas.
Masīva indekss mainās, un React var sajaukt elementus. Kad izņēmu `key`, konsolē parādījās
brīdinājums *Each child in a list should have a unique "key" prop*, bet `npm run build`
klusēja, jo `key` nav komponentes props. Filtrs glabājas `ProjectSection` `useState`, un
jauni `App` props to neizdzēš, jo komponente paliek tajā pašā vietā un netiek izveidota no
jauna.
