# Individuālā refleksija

## 1. `<a>` pret `Link`

Sākumā galvenē bija parastās `<a href="/...">` saites. Pēc klikšķa uz *Deadlines* notika
pilna lapas pārlāde: tīkla panelī atkal parādījās `projects.json`, `deadlines.json` un
laikapstākļu pieprasījums, un lapa uz brīdi pazuda. Ar `NavLink` jauni API pieprasījumi
neparādījās vispār — mainījās tikai adrese un skats. Tas ir galvenais ieguvums: `Link`
neļauj pārlūkam ielādēt dokumentu no jauna un ļauj React Router pārzīmēt tikai mainīto
daļu. Tomēr arī ar `Link` ierakstītais teksts pazuda, jo `/projects` komponente tika
nomontēta — pati maršrutēšana neglābj lokālo stāvokli.

## 2. Kas pazūd, mainot lapu

Kad `/projects` ieslēdzu filtru **Done** un ierakstīju tekstu *Title* laukā, pēc pārejas uz
*Deadlines* un atgriešanās ar *Atpakaļ* filtrs bija atkal **All**, bet lauks tukšs.
Pievienotais projekts palika, jo tas glabājas `App` stāvoklī un `localStorage`.
Redzēju atšķirību starp lokālo stāvokli, kas dzīvo tikai līdz nomontēšanai, un
koplietoto stāvokli, kurš pārdzīvo navigāciju.

## 3. Secība detaļu lapā

Ar `setTimeout` funkcijā `fetchProjects` lapā `/projects/p1` pirmās trīs sekundes bija
redzams *Loading project…*. Kad `loading` pārbaudi izņēmu, tajā pašā laikā parādījās
*Project not found*, lai gan projekts vēl nebija ienācis. Tas ir maldinoši: tukšs
meklēšanas rezultāts nav tas pats, kas nezināms id. Tāpēc kārtība `loading` → `error` →
`not found` → detaļas ir būtiska.

## 4. Secinājums

Maršrutēšana nav tikai adrešu saraksts. Tā ietekmē to, kad komponentes tiek nomontētas,
kur jāglabā stāvoklis un kā lietotājs saprot, kas ar lapu notiek.
