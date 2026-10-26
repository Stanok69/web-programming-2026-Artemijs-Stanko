# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200–300 vārdi**.


## 1. Utility-first CSS pieeja

Savā formulējumā paskaidrojiet, ko nozīmē **utility-first CSS** pieeja.

Kā pāreja no `styles.css` uz Tailwind CSS mainīja to, **kur un kā tiek aprakstīts tīmekļa lapas vizuālais noformējums**?


Utility-first pieeja nozīmē, ka dizains tiek veidots ar mazām gatavām klasēm. Katra klase parasti atbild par vienu lietu, piemēram, krāsu, atstarpi, izmēru vai izvietojumu. Tailwind CSS gadījumā šīs klases raksta tieši HTML elementos. Parastajā CSS stilus raksta atsevišķā failā un pēc tam piešķir elementiem klases nosaukumu.

Pārejot no styles.css uz Tailwind CSS, man bija vieglāk redzēt, kā katrs elements tiek noformēts. Tajā pašā laikā HTML kods kļuva garāks, jo tajā ir daudz klašu.

---

## 2. Divi migrācijas piemēri

Izvēlieties **divas tīmekļa vietnes daļas**, kuras jūs pats/pati pārveidojāt no tradicionālā CSS uz Tailwind CSS.

Katram piemēram paskaidrojiet:

- ko darīja sākotnējais CSS kods;
- kuras Tailwind CSS utilītklases jūs izmantojāt;
- kāpēc izvēlētās utilītklases nodrošina nepieciešamo rezultātu.


Pirmais piemērs ir galvene ar navigāciju. Sākotnējā CSS failā tika aprakstīts, kā izvietot logo, navigācijas saites un profilu. Tailwind versijā izmantoju flex, items-center, gap, px, py un border klases. Tās palīdz izveidot vienmērīgu galvenes izkārtojumu.

Otrais piemērs ir projektu kartītes. Tām pievienoju grid, rounded, border, bg-white un hover klases. Ar grid-cols-1, md:grid-cols-2 un lg:grid-cols-3 kartītes pielāgojas dažādiem ekrāna izmēriem.

---

## 3. Jūsu vērtējums

Aprakstiet:

- vienu situāciju, kurā Tailwind CSS, jūsuprāt, ir ērtāks par tradicionālo CSS;
- vienu situāciju, kurā jūs dotu priekšroku individuāli rakstītam CSS.

Pamatojiet savu viedokli.


Tailwind CSS ir ērts, kad ātri jāizveido responsīvs izkārtojums. Nav visu laiku jāmaina atsevišķs CSS fails. Man patika arī tas, ka hover un focus stilus var pievienot ar klasēm.

Individuālu CSS es izmantotu sarežģītām animācijām vai īpašam dizainam, kur daudz Tailwind klašu padarītu kodu grūti saprotamu.
