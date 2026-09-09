# ADR 0001 — Sanakirja-aineisto: CC-CEDICT

**Tila:** hyväksytty
**Päivä:** 7.9.2026
**Liittyy:** v0-Roadmap askel 0 ja 6, v0-Maarittely luku 7

## Ongelma

Sovellus tarvitsee kiinan sanakirjan, josta saadaan merkit (yksinkertaistetut ja perinteiset), pinyin ja englanninkielinen merkitys. Sanakirja ei ole vain sisältöä: se on myös **validointiväline**, koska kaikki tekoälyn generoima kiina tarkistetaan sitä vasten (v0-Maarittely luku 7). Ilman sanakirjaa lauseiden generointia ei voi ottaa käyttöön lainkaan.

Aineisto upotetaan julkaistuun sovellukseen, joten pelkkä "saa käyttää" ei riitä — lisenssin on sallittava levitys.

## Vaihtoehdot

| Vaihtoehto                | Lisenssi            | Miksi ei                                                          |
| ------------------------- | ------------------- | ----------------------------------------------------------------- |
| **CC-CEDICT**             | CC BY-SA 4.0        | —                                                                 |
| Unihan (Unicode)          | Unicode License     | Merkkitason data, ei sanoja eikä käyttökelpoisia merkityksiä      |
| Kaupallinen sanakirja-API | maksullinen, ehtoja | Maksaa, vaatii verkkoyhteyden joka kyselyyn, ei kelpaa seed-ajoon |

## Päätös

**CC-CEDICT**, ladattuna MDBG:ltä.

- Lähde: https://www.mdbg.net/chinese/dictionary?page=cc-cedict
- Tiedosto: `cedict_1_0_ts_utf-8_mdbg.zip` → `cedict_ts.u8`
- Lisenssi: **Creative Commons Attribution-ShareAlike 4.0 International** (CC BY-SA 4.0)

## Todennettu 7.9.2026

Tiedosto ladattiin ja tarkistettiin, ei luotettu dokumentaatioon:

- **125 009 hakusanaa**, versio 1.0, päivitetty 7.9.2026
- Koko purettuna 9,8 MB, UTF-8
- Rivimuoto: `PERINTEINEN YKSINKERTAISTETTU [pin1 yin1] /merkitys/merkitys/`
- Esimerkki: `你好 你好 [ni3 hao3] /hello/hi/how are you?/`
- Kommenttirivit alkavat `#`, metatiedot `#!`
- Lisenssi lukee tiedoston omassa otsakkeessa, ei pelkästään verkkosivulla

Muoto on suoraviivainen jäsentää rivi kerrallaan säännöllisellä lausekkeella. Pinyin on numeromuodossa (`hao3`), joten toonimerkit ja `tone_pattern` lasketaan siitä itse — tämä on askeleen 6 tehtävä.

## Mitä lisenssi velvoittaa

**Attribuutio (BY).** Lähde on mainittava. Merkintä READMEen ja sovelluksen tietoihin:

> Sanakirja-aineisto: CC-CEDICT, julkaisija MDBG, lisenssi CC BY-SA 4.0. Pohjautuu teokseen CEDICT, © 1997, 1998 Paul Andrew Denisowski. https://www.mdbg.net/chinese/dictionary?page=cc-cedict

**Share-alike (SA).** Jos aineistoa muokataan tai täydennetään, muutokset on jaettava samalla lisenssillä. Käytännön seuraus tälle projektille:

- Seed-skripti johtaa CC-CEDICTistä `words`-taulun ja laskee siihen omia kenttiä (`tone_pattern`, `frequency_rank`). Tämä on **muokattu aineisto** ja kuuluu BY-SA:n piiriin.
- **Sovelluksen koodi ei kuulu** BY-SA:n piiriin. Koodi on erillinen teos joka käyttää aineistoa, ei aineistosta johdettu teos. Repo voi siis olla MIT-lisensoitu ja aineisto BY-SA-lisensoitu rinnakkain, kunhan jako on kirjattu näkyviin.
- **Käytännön sääntö:** jos johdettu sanakirjadata viedään repoon tiedostona, sen viereen tulee `LICENSE`-tiedosto ja maininta alkuperästä. Jos vain seed-skripti on repossa ja data ladataan ajossa, velvoite koskee vain attribuutiota.

Suositus: pidä data poissa reposta, lataa se seed-ajossa. Repo pysyy kevyenä ja lisenssitilanne yksinkertaisena.

## Mitä maksaa

0 €. Sekä ei-kaupallinen että kaupallinen käyttö on sallittu.

## Riskit

- **Aineisto elää.** Tiedostoa päivitetään jatkuvasti (tämä versio on samalta päivältä). Seed-ajon tulos ei ole bittitarkasti toistettava eri päivinä. Ratkaisu: tallenna ladatun tiedoston versio ja päiväys `words`-tauluun tai seed-lokiin, jotta tiedät mitä ajettiin.
- **Merkitykset ovat englanniksi ja toisinaan runsaita.** Yhdellä sanalla voi olla kymmenen määritelmää. Kortille valitaan lyhyin tai ensimmäinen — sääntö päätetään askeleessa 6, ei tässä.
