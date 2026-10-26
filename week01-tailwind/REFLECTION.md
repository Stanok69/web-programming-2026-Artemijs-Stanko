# Individuālā refleksija

## 1. Utility-first CSS pieeja

Utility-first CSS nozīmē, ka vizuālo noformējumu veido no mazām, vienu īpašību apzīmējošām
klasēm tieši HTML elementā, nevis raksta atsevišķus semantiskus selektorus lielā CSS failā.
Piemēram, `flex`, `items-center`, `rounded-xl` un `bg-brand` uzreiz apraksta izkārtojumu, formu
un krāsu. Pēc pārejas uz Tailwind CSS stili vairs nav atsevišķā `styles.css` failā ar
`.site-header` vai `.project-card` noteikumiem — tie atrodas blakus elementam `class` atribūtā.
`style.css` palicis tikai Tailwind imports un dizaina tokeni (`@theme`), tāpēc konkrētās
sadaļas izskatu var redzēt, lasot HTML.

## 2. Divi migrācijas piemēri

**Galvene un navigācija.** Sākotnēji `.site-header` noteica sticky pozīciju, baltu fonu ar
caurspīdīgumu, blur efektu un apakšējo apmali, bet `.header-inner` izmantoja Flexbox ar 72 px
minimālo augstumu. Tailwind versijā to pašu nodrošina `sticky top-0 z-50`, `bg-white/90`,
`backdrop-blur-md`, `border-b border-line/90` un `flex min-h-[72px] items-center gap-7`.
Utilītklases ir tiešs šo CSS īpašību tulkojums, tāpēc rezultāts paliek tāds pats, bet stils
vairs nav jāmeklē citā failā.

**Projektu kartītes.** Oriģinālajā CSS `.project-card` apvienoja padding, apmali, rādiusu, fonu
un pārejas, bet `:hover` pievienoja pacelšanu un ēnu. Tagad kartīte izmanto
`rounded-[18px] border border-line bg-white p-[22px]`, bet hover stāvokli veido
`hover:-translate-y-1 hover:border-[#d5d9e6] hover:shadow-card`. Papildus `md:grid-cols-2
lg:grid-cols-3` nodrošina 1/2/3 kolonnu izkārtojumu, ko iepriekš darīja media queries. Šīs
klases ir ērtas, jo visas kartītes stāvokļa izmaiņas redzamas vienā vietā.

## 3. Jūsu vērtējums

Tailwind ir ērtāks, veidojot atkārtotus komponentus un responsīvu izkārtojumu: piemēram,
projektu režģa pāreja no vienas uz divām un trim kolonnām ir viena klases rinda, nevis vairāki
media query bloki. Savukārt sarežģītām animācijām, ļoti specifiskiem selektoriem vai lielam
skaitam vienādu stāvokļu es dotu priekšroku individuāli rakstītam CSS, jo garas utilītklešu
virknes HTML padara grūtāk lasāmu.
