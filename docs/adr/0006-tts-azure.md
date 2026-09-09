# ADR 0006 — Puhesynteesi: Azure AI Speech

**Tila:** hyväksytty
**Päivä:** 7.9.2026
**Liittyy:** v0-Roadmap askel 0 ja 8, v0-Maarittely F4

## Ongelma

Sanoille ja esimerkkilauseille tarvitaan esigeneroitu neuroniääni tiedostoina. Vaatimukset: laadukas mandariiniääni, ohjelmallinen rajapinta eräajoon, ja hinta joka ei estä kokeilua.

Määrittelyssä on lisäksi tunnistettu rajoite: **TTS mokaa toisinaan tone sandhin sekä 一- ja 不-sääntöjen toonimuutokset.** Jani ei osaa kiinaa eikä voi havaita virhettä kuulemalla — tämä on sama ongelma kuin generoidun kiinan validointi, ja se on otettava vakavasti.

## Vaihtoehdot

| Palvelu                 | Ilmaistaso                                   | Hinta sen jälkeen  | Pinyin-ohjaus                                                            |
| ----------------------- | -------------------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| **Azure AI Speech**     | **500 000 merkkiä / kk**                     | 16 $ / 1 M merkkiä | **Kyllä, SSML**                                                          |
| Google Cloud TTS        | 1 M merkkiä / kk (vaihtelee äänityypeittäin) | vertailukelpoinen  | Rajallisemmin                                                            |
| ElevenLabs              | pieni ilmaistaso                             | selvästi kalliimpi | Ei                                                                       |
| Selaimen Web Speech API | ilmainen                                     | —                  | **Hylätty jo 4.9.2026:** laatu vaihtelee koneittain, ei voi esigeneroida |

## Päätös

**Azure AI Speech**, ilmaistaso F0, yksi kiinalainen neuroniääni (zh-CN).

Ratkaiseva syy ei ole hinta — kaikki mahtuvat ilmaistasolle — vaan **SSML-pinyin-tuki**.

## Sandhi-ongelman ratkaisu

Azure tukee zh-CN-lokaalissa `<phoneme>`-elementtiä `sapi`-aakkostolla, jolla ääntämyksen voi pakottaa pinyinillä. Tämä on suora ratkaisu määrittelyssä tunnistettuun rajoitteeseen:

- **CC-CEDICT antaa pinyinin numeromuodossa** (ADR 0001).
- Askel 6 laskee `tone_pattern_surface`-kentän, jossa 3–3-sandhi sekä 一- ja 不-säännöt on jo sovellettu. Määrittelyssä tämä kenttä oli merkitty _"ei käytetä v0:ssa, lasketaan varastoon v1:tä varten"_.
- **Nyt sille on käyttö jo v0:ssa:** syötä TTS:lle pinyin `tone_pattern_surface`-kentästä sen sijaan että luotat mallin omaan sandhi-päättelyyn.

Tämä muuttaa askeleen 8 tehtävän _"kuuntele kaikki läpi ja toivo parasta"_ tehtäväksi _"syötä oikea ääntämys ja kuuntele varmistukseksi"_. Kuuntelutarkistus tehdään silti — sitä ei korvata tällä.

**Huom:** tämä on toteutuksen yksityiskohta, joka on todennettava askeleessa 8 ennen kuin siihen luotetaan. Azuren zh-CN-sapi-aakkoston tarkka syntaksi on tarkistettava dokumentaatiosta silloin, ei nyt.

## Mitä maksaa

Aloituspakan äänisynteesin kokonaismäärä:

- 300 sanaa × noin 2,5 merkkiä = **750 merkkiä**
- 300 esimerkkilausetta × noin 15 merkkiä = **4 500 merkkiä**
- Yhteensä noin **5 250 merkkiä**

Ilmaistaso on 500 000 merkkiä kuukaudessa. Käyttö on siis **noin yksi prosentti ilmaistasosta**. Vaikka koko pakka generoitaisiin uudelleen sata kertaa, se pysyisi ilmaisena.

**Kertameno: 0 €. Jatkuva meno: 0 €.**

Tallennustila: noin 600 lyhyttä mp3-tiedostoa à 15 kt ≈ **9 MB**. Supabasen ilmaistaso riittää moninkertaisesti.

## Riskit

- **Azure-tili vaatii luottokortin**, vaikka F0-taso ei veloita. Tämä on hyvä tietää etukäteen.
- **F0-tasolla on samanaikaisuus- ja nopeusrajoituksia.** Eräajo 600 tiedostolle voi olla hidas. Ratkaisu: aja skripti kärsivällisesti taustalla, älä rinnakkaista aggressiivisesti.
- **Yksi ääni riittää v0:ssa**, mutta `word_audio` on oma taulunsa, joten toisen äänen lisääminen on datan lisäys eikä skeeman muutos. Perustelu on kirjattu määrittelyn F4:ään (HVPT-tutkimus).
