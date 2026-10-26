# Individuālā refleksija

## 1. Ko deva tipi?

JavaScript kļūdas parasti redz tikai tad, kad lapa jau strādā nepareizi. TypeScript pārbauda
kodu pirms palaišanas. Man tas palīdzēja ar datiem: projektam ir noteikti lauki, un, ja kaut ko
aizmirstu vai uzrakstu nepareizi, `npm run build` uzreiz parāda kļūdu.

Konkrēta kļūda: formas pārbaudē kategorija sākumā bija vienkārši `string`, bet `Project` gaidīja
tipu `Category`. TypeScript neļāva šo vērtību piešķirt. Es izlaboju ar funkciju `isCategory`,
kas pārbauda, vai teksts tiešām ir viena no atļautajām kategorijām. Pēc tam TypeScript saprata,
ka vērtība ir droša.

## 2. `null` un `querySelector`

`document.querySelector(...)` var atrast elementu, bet var arī neatrast neko. Tāpēc TypeScript
saka, ka rezultāts var būt `null`, un neļauj uzreiz izsaukt metodes. Manā kodā katram galvenajam
elementam ir pārbaude. Piemēram, ja lapā nav `#projectGrid` vai `#deadlineList`, programma
apstājas ar saprotamu kļūdu. Formā es rakstīju `if (form === null) return;`, jo bez formas lapa
var vienkārši turpināt darbu. Tā kods nekrīt, ja HTML mainās.

## 3. Dati no ārpuses

`JSON.parse` atgriež jebko. Ja es uzrakstu `as Project[]`, tas tikai nomierina TypeScript, bet
dati joprojām var būt nejēdzīgi. Tāpēc es izmantoju `try/catch`, pārbaudu, vai rezultāts ir
masīvs, un katru ierakstu pārbaudu ar `isProject`. Ja kaut kas nav kārtībā, lapa izmanto
sākotnējos datus no `data.ts`.

Lietotāja tekstu nedrīkst likt ar `innerHTML`, jo tad teksts kļūst par HTML kodu. Ja kāds ievada
`<img onerror=...>`, pārlūks to izpilda. Es izmantoju `textContent`, tāpēc `<b>test</b>` parādās
kā vienkāršs teksts.

## 4. Mans vērtējums

TypeScript šķiet lieks mazai vienas lapas vietnei, kur datu nav daudz. Bet tur, kur ir formas,
saraksti un saglabāšana, tas ļoti palīdz. Es noteikti izmantošu to arī turpmāk.
