# ADR 0002 — Taajuuslista: SUBTLEX-CH

**Tila:** hyväksytty
**Päivä:** 7.9.2026
**Liittyy:** v0-Roadmap askel 0 ja 6. **Sulkee MEMORY.md:n avoimen kysymyksen 1.**

## Ongelma

Aloituspakan (~300 sanaa) valinta tarvitsee taajuusjärjestyksen. MEMORY.md:hen kirjattiin 4.9.2026 riski: _"akateemisten taajuuslistojen lisenssi on usein rajattu tutkimuskäyttöön — tarkistettava ennen upottamista"_. Tämä ADR ratkaisee sen.

Vaatimus on tekstityspohjainen lista, ei kirjapohjainen: matkailutavoite tarkoittaa puhuttua kieltä, ja kirjakorpus painottaa kirjallista sanastoa väärin.

## Vaihtoehdot

| Vaihtoehto                             | Pohja                                    | Lisenssi                      | Arvio                                                                                       |
| -------------------------------------- | ---------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| **SUBTLEX-CH**                         | 33,5 M sanaa elokuva- ja tv-tekstityksiä | **CC BY** (PLOS ONE)          | Valittu                                                                                     |
| BCC-korpuksen taajuuslista             | sekakorpus                               | epäselvä                      | Ehtoja ei löydy kirjattuna                                                                  |
| Google Books Ngrams                    | kirjat                                   | avoin                         | Väärä rekisteri — kirjakieli                                                                |
| wordfreq (Python)                      | monilähteinen                            | CC BY-SA 4.0                  | Toimisi, mutta on Python-paketti ja sekoittaa lähteet; huonompi kuin puhdas tekstityskorpus |
| Oma laskenta OpenSubtitles-korpuksesta | tekstitykset                             | tekijänoikeustilanne epäselvä | Enemmän työtä ja huonompi lisenssitilanne kuin valmis lista                                 |

## Päätös

**SUBTLEX-CH** (Cai & Brysbaert 2010), sanataajuustiedosto SUBTLEX-CH-WF.

- Artikkeli: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0010729
- Data: artikkelin liiteaineisto (Files S1), DOI https://doi.org/10.1371/journal.pone.0010729.s002
- Sisältö: noin 100 000 yksinkertaistettua sanaa, ei pinyiniä eikä merkityksiä → liitetään CC-CEDICTiin merkkijonon perusteella

## Lisenssi — riski osoittautui aiheettomaksi

Aineisto ei ole erillinen tutkimusaineisto rajoittavine ehtoineen, vaan **PLOS ONE -artikkelin liitetiedosto**. Artikkelin lisenssiteksti kuuluu:

> "© 2010 Cai, Brysbaert. This is an open-access article distributed under the terms of the Creative Commons Attribution License, which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited."

Lisenssi kattaa artikkelin liiteaineiston. **Creative Commons Attribution** ei rajaa käyttöä tutkimukseen eikä estä kaupallista käyttöä, eikä siinä ole share-alike-ehtoa. Julkaistuun sovellukseen upottaminen on sallittu, kun lähde mainitaan.

Lähdemerkintä READMEen:

> Sanataajuudet: Cai Q, Brysbaert M (2010) SUBTLEX-CH: Chinese Word and Character Frequencies Based on Film Subtitles. PLoS ONE 5(6): e10729. Lisenssi CC BY.

## Mitä maksaa

0 €.

## Seuraukset

- **Askeleen 6 este poistuu.** Aloituspakan valinta voidaan toteuttaa suunnitellusti.
- Liitos tehdään yksinkertaistetun merkkijonon perusteella CC-CEDICTiin. Osumatta jääneet rivit (harvinaisia sanoja, tekstitysten kirjoitusvirheitä) pudotetaan pois — tämä on odotettua eikä virhe.
- SUBTLEX-CH on vuodelta 2010. Sanasto on 16 vuotta vanhaa: internet- ja puhelinaiheiset sanat ovat aliedustettuja. Aloituspakan tasolla (~300 yleisintä sanaa: minä, sinä, olla, mennä, syödä) tällä ei ole merkitystä — nämä sanat eivät ole muuttuneet.
- Lista on **vain yksinkertaistettuina merkkeinä**. v0 käyttää yksinkertaistettuja, joten tämä sopii.

## Riski joka jää

Taajuus on aloituspakassa vain **painotustekijä**, ei valintaperuste — OCLO-periaate (komponentit avaavat merkkejä, merkit avaavat sanoja) on ensisijainen. Tämän ADR:n valinta ei siis yksin ratkaise aloituspakan laatua; valintafunktio ratkaisee. Se on askeleen 6 tehtävä ja määrittelyn mukaan testattava omana funktionaan.
