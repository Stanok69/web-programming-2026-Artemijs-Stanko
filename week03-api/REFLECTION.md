# Individuālā refleksija

## 1. Kad `fetch` nemet kļūdu?

`fetch` nemet kļūdu, ja serveris atbild ar statusu 404 vai 500. Tas tikai nozīmē, ka saziņa
notika. Manā kodā tāpēc ir pārbaude `if (!response.ok) { throw new Error(...) }`. Bez tās lapa
mēģinātu lasīt kļūdas lapu kā JSON un neparādītu saprotamu ziņojumu.

## 2. `any` un `unknown`

`response.json()` atgriež `Promise<any>`. Ar `any` es varu izsaukt jebkuru lauku, un TypeScript
nebrīdinās, pat ja dati ir nepareizi. `const data: unknown = await response.json();` saka, ka
dati vispirms ir jāpārbauda. Atšķirība starp `data as Project[]` un type guard funkciju ir tāda,
ka `as` tikai liek TypeScript noticēt, bet neko nepārbauda. Type guard ir īsta funkcija, kas
apskata katru lauku un atgriež `true` tikai tad, ja dati tiešām ir pareizi.

## 3. Sveša API dati

Open-Meteo atbildi pārveidoju savā tipā `CurrentWeather`, jo pārējai lietotnei nav jāzina sveši
nosaukumi kā `temperature_2m`. Ja Open-Meteo rīt pārdēvētu lauku, mainītos tikai `src/api.ts`.
Ja lauks pazustu, pārbaude to pamanītu un kartītē parādītos *"Weather unavailable"*, nevis
salūztu visa lapa.

## 4. Lietotāja skatījums

DevTools ieslēdzu lēnu tīklu (Slow 4G) un pārlādēju lapu. Pirms ielādes stāvokļiem lapa kādu
laiku izskatījās tukša, un cilvēks nezināja, vai kaut kas notiek. Tagad redzams teksts
*"Loading projects…"*, bet pēc tam kartītes. Ja pieprasījums ir bloķēts, redzams kļūdas
ziņojums un poga **Try again**.
