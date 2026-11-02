# Individuālā refleksija

## 1. Kontrolēts lauks

Kad *Title* laukam atstāju `value` bez `onChange`, lauks kļuva faktiski tikai lasāms.
Mēģinot ierakstīt tekstu, laukā nekas neparādījās, un konsolē bija kļūda: *"You provided a
`value` prop to a form field without an `onChange` handler. This will render a read-only
field."* Iemesls ir tāds, ka kontrolēta lauka vērtību nosaka React stāvoklis. Bez
`onChange` stāvoklis nemainās, tāpēc React pēc katra ievades atgriež laukā veco vērtību.

## 2. Stāvoklis nav parasts mainīgais

Kad `values.description` mainīju uz vietas un izsaucu `setValues(values)`, laukā, rakstot
`hello`, joprojām bija tukšs. Tikai pēc tam, kad ierakstīju burtu *Title* laukā, parādījās
`hello`. Iemesls: `setValues` saņēma to pašu objekta atsauci, tāpēc React nedomāja, ka
stāvoklis ir mainījies, un nezīmēja komponenti no jauna. Tikai cita lauka izmaiņa izraisīja
jaunu zīmēšanu, un tajā jau bija redzama mutētā vērtība.

`console.log(values.progress)` uzreiz pēc `update(...)` rādīja veco vērtību: rakstot `42`,
konsolē parādījās vispirms tukša rinda, tad `4`. Tas nozīmē, ka `setValues` tikai ieplāno
stāvokļa maiņu, bet pašreizējā zīmēšanā `values` joprojām ir vecais.

## 3. Kur dzīvo stāvoklis

Pievienotos projektus nevarēja glabāt `AddProjectForm`, jo tos vajag divām vietām:
projektu sarakstam un *Active projects* kartītei. Abām kopīgs vecāks ir `App`, tāpēc
stāvoklis tiek pacelts uz augšu. Forma tikai nolasa laukus un izsauc `onAdd`. Filtru gan
nevajag celt uz `App`, jo to izmanto tikai `ProjectSection`; ja tas būtu augstāk, rastos
lieki props un lieka saistība starp komponentēm.

## 4. Pašu hook

`localStorage` var atrasties jebkas — nepareizs JSON, cits tips vai masīvs ar bojātu
projektu. Tāpēc `useLocalStorage` saturu pārbauda ar `isProjectList`, nevis uzticas tam.
8. pārbaudē ar vērtību `{bad` lapa strādāja, rādīja tikai API projektus un konsolē nebija
kļūdu. `useEffect` nav vajadzīgs: hook lasa krātuvi vienreiz, kad `useState` izsauc savu
funkciju, un raksta tikai tad, kad tiek izsaukts tā setteris.
