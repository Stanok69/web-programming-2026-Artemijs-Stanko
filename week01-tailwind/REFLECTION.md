# Individuālā refleksija

## 1. Utility-first CSS pieeja

Utility-first CSS nozīmē, ka izskatu veido ar mazām gatavām klasēm tieši HTML failā. Viena klase
parasti dara vienu lietu: maina krāsu, atstarpi, izmēru vai novietojumu. Agrāk stils bija
atsevišķā `styles.css` failā, un HTML bija īss. Tagad lielākā daļa stila ir `index.html` failā.
Tāpēc HTML ir garāks, bet uzreiz redzams, kā izskatās konkrētā sadaļa. Man tas šķita ērti, jo nav
jālec starp diviem failiem.

## 2. Divi migrācijas piemēri

**Galvene.** Vecajā CSS galvenei bija sticky novietojums, balts fons, blur efekts un apakšējā
līnija. Es to pašu uzrakstīju ar klasēm `sticky top-0`, `bg-white/90`, `backdrop-blur-md` un
`border-b`. Rezultāts izskatās tāpat kā agrāk. Man patika, ka vairs nav jāmeklē `.site-header`
citā failā.

**Projektu kartītes.** Vecajā CSS kartītei bija padding, rāmis, noapaļoti stūri un ēna uz hover.
Tagad to dara klases `rounded-[18px]`, `border`, `p-[22px]`, `hover:-translate-y-1` un
`hover:shadow-card`. Pievienoju arī `md:grid-cols-2` un `lg:grid-cols-3`, tāpēc kartītes ir 1, 2
vai 3 kolonnās atkarībā no ekrāna. Tas ir vienkārši un saprotami.

## 3. Mans viedoklis

Man Tailwind ir ērtāks, kad jātaisa vienkāršs un atkārtojošs izkārtojums. Piemēram, mainīt
kolonnu skaitu ir viena rinda. Bet, ja vajag sarežģītu animāciju vai ļoti specifisku stilu, es
labāk rakstītu parasto CSS. Tad HTML nav tik pārblīvēts ar garām klašu rindām.
