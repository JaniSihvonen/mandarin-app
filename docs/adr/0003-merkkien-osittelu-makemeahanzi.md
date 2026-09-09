# ADR 0003 — Merkkien osittelu ja komponenttien roolit: Make Me a Hanzi

**Tila:** hyväksytty varauksella
**Päivä:** 7.9.2026
**Liittyy:** v0-Roadmap askel 0 ja 11, v0-Maarittely F5. **Sulkee MEMORY.md:n avoimen kysymyksen 2.**

## Ongelma

F5 (merkkien osittelunäkymä) vaatii kaksi asiaa, ja vain toinen on helppo:

1. **Osittelu** — mistä osista merkki koostuu. Tätä on avoimesti saatavilla runsaasti.
2. **Komponentin rooli** — onko osa merkitysvihje vai äänivihje. **Tämä on se vaikea osa.** Ilman roolitietoa näkymä on pelkkä palasten luettelo, eikä se selitä mitään.

MEMORY.md:hen kirjattiin riski: _"Outlierin aineisto on maksullinen"_. Kysymys oli, onko roolitietoa saatavilla avoimena.

## Vaihtoehdot

| Vaihtoehto                            | Osittelu                      | Rooli                | Lisenssi                                 |
| ------------------------------------- | ----------------------------- | -------------------- | ---------------------------------------- |
| **Make Me a Hanzi**, `dictionary.txt` | kyllä (IDS)                   | **kyllä**            | LGPL v3+                                 |
| CHISE IDS                             | kyllä (IDS)                   | ei suoraan           | GPL                                      |
| Unihan                                | osin (kIRG-kentät, radikaali) | ei                   | Unicode License                          |
| Outlier Linguistics                   | kyllä                         | kyllä, laadukkaimmin | **maksullinen, ei uudelleenjaettavissa** |
| Wiktionary glyph origin               | vaihtelevasti                 | vaihtelevasti        | CC BY-SA, mutta jäsentämätöntä proosaa   |

## Päätös

**Make Me a Hanzi**, tiedosto `dictionary.txt`.

- Lähde: https://github.com/skishore/makemeahanzi
- Muoto: rivi per merkki, kukin rivi itsenäinen JSON-objekti
- Kentät: `character`, `definition`, `pinyin`, `decomposition` (IDS-muotoinen), `radical`, `etymology`

**Roolitieto löytyy `etymology`-objektista.** Sillä on `type`, joka on `pictographic`, `ideographic` tai `pictophonetic`. Kun tyyppi on `pictophonetic`, mukana on kolme lisäkenttää: `semantic` (merkitysvihje), `phonetic` (äänivihje) ja `hint` (sanallinen selitys). **Tämä on tasan se tieto jota F5 tarvitsee**, eikä siitä tarvitse maksaa.

## Lisenssi

Projektissa on kaksi eri lisenssiä eri tiedostoille, ja ero on tässä olennainen:

- **`dictionary.txt` → LGPL v3 tai uudempi.** Pohjautuu Unihaniin ja CJKlibiin. Tämä on ainoa tiedosto jota v0 tarvitsee.
- `graphics.txt` ja `svgs.tar.gz` → **Arphic Public License**, koska ne on johdettu Arphicin fonteista (PL KaitiM GB, PL UKai). Nämä ovat piirtoanimaatioita varten. **v0 ei käytä näitä.** Jos merkkien piirtojärjestys joskus lisätään, tämä lisenssi on käytävä erikseen läpi.

**Mitä LGPL velvoittaa datatiedostona.** LGPL on kirjoitettu ohjelmakirjastoille, ei datalle, joten sen soveltaminen tähän on hieman kömpelöä. Turvallinen tulkinta:

- Sovellus saa käyttää aineistoa ilman että sovelluksen oma koodi muuttuu LGPL-lisensoiduksi. Tämä on nimenomaan se mitä LGPL:n "lesser" tarkoittaa.
- Jos `dictionary.txt`-aineistoa **muokataan**, muokattu versio on jaettava LGPL:llä.
- Lähde ja lisenssi on mainittava, ja alkuperäisen aineiston on oltava saatavilla.

Lähdemerkintä READMEen:

> Merkkien osittelu ja komponenttien roolit: Make Me a Hanzi (skishore/makemeahanzi), tiedosto dictionary.txt, lisenssi LGPL v3+. Pohjautuu Unihaniin ja CJKlibiin.

## Mitä maksaa

0 €.

## Varaus jota ei saa ohittaa käyttöliittymässä

Tämä on jo kirjattu v0-Maarittelyn F5:een, mutta se toistetaan tässä, koska aineiston valinta ei muuta sitä:

Noin 80–90 % merkeistä on foneettis-semanttisia yhdisteitä, mutta vain noin neljäsosa foneettisista komponenteista antaa luotettavan vihjeen ääntämyksestä — ja ne ennustavat **huonommin juuri yleisiä merkkejä**, eli aloituspakan merkkejä. Näyttö saa siis sanoa _"tämä osa liittyy usein ääneen yáng"_, ei _"arvaa ääntämys tästä"_.

Lisäksi: `etymology`-kenttä **puuttuu osalta merkeistä**, ja `decomposition` voi sisältää kokoleveän kysymysmerkin (`？`) tunnistamattoman komponentin kohdalla. Käyttöliittymän on kestettävä molemmat — F5:n valmiuskriteeri sanoo jo _"tuntematon merkki: kerro se, älä hajoa"_. Aineiston kattavuus aloituspakan merkeille on **mitattava askeleessa 11**: jos roolitieto puuttuu yli kolmasosalta, näkymän arvo on eri kuin oletettiin.
