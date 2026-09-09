# ADR 0007 — Pystytyksen kertameno ja kattoraja

**Tila:** hyväksytty. Kattoraja 50 $, päätetty 7.9.2026
**Päivitetty:** 9.9.2026 ADR 0005:n lopullisen version jälkeen — kuvat tulevat ilmaisesta piktogrammikirjastosta
**Päivä:** 7.9.2026
**Liittyy:** v0-Roadmap askel 0, viimeinen tehtävä. **Sulkee MEMORY.md:n avoimen kysymyksen 4.**

## Ongelma

v0 vaatii kertaluontoisen sisällöntuotannon: ~300 sanan aloituspakka äänineen, kuvineen ja lauseineen. Roadmapin askel 0 vaatii laskemaan mitä se maksaa ja päättämään katon, jotta kokeilu ei karkaa käsistä huomaamatta.

## Laskelma

Aloituspakka: **300 sanaa**.

| Erä                      | Määrä                                        | Hinta                       | Lähde      |
| ------------------------ | -------------------------------------------- | --------------------------- | ---------- |
| CC-CEDICT                | 125 009 hakusanaa                            | **0 €**                     | ADR 0001   |
| SUBTLEX-CH taajuudet     | ~100 000 sanaa                               | **0 €**                     | ADR 0002   |
| Osittelu ja roolit       | koko merkistö                                | **0 €**                     | ADR 0003   |
| HSK-tasot                | 1–9                                          | **0 €**                     | ADR 0004   |
| **Kuvat**                | 900 (3 × 300) AAC-piktogrammia               | **0 €**                     | ADR 0005   |
| **Äänet**                | ~5 250 merkkiä                               | **0 €** (1 % ilmaistasosta) | ADR 0006   |
| **Lauseiden generointi** | ~300 lausetta + hylkäysten uusinnat          | **muutama euro**            | alla       |
| Supabase                 | ~25 MB (kuvat 14 MB + äänet 9 MB), alle 1 GB | **0 €**                     | ilmaistaso |
| Netlify                  | staattinen sivu + funktio                    | **0 €**                     | ilmaistaso |
| GitHub                   | julkinen repo                                | **0 €**                     | ilmaistaso |

### Lauseiden generointi

Volyymi on pieni mutta kehote on iso, koska sallittu sanasto lähetetään mukana joka pyynnössä:

- Syöte: sallittu sanasto (kasvaa nollasta ~300 sanaan) + ohjeistus ≈ **1,5 M syötetokenia** koko pakalle
- Tuotos: rakenteinen JSON ≈ **60 000 tokenia**
- Hylkäykset: validointi hylkää osan, arviolta 40 % lisää

**Hintaa ei lyödä lukkoon tässä.** Malli on määrittelyn avoin kysymys 5 (_"halvin joka läpäisee lausevalidoinnin luotettavasti — mitataan, ei arvata"_), ja hinnasto tarkistetaan askeleessa 9 kun malli valitaan. Suuruusluokka on **yksittäisiä euroja, ei kymmeniä**.

Kustannusta voi pienentää olennaisesti myös rakenteella: sallittu sanasto on lähes sama peräkkäisillä sanoilla, joten kehotteen välimuistitus (prompt caching) leikkaa syötetokenit murto-osaan. Tämä arvioidaan askeleessa 9.

## Yhteenveto

**Kertameno koko v0:n pystytykselle: muutamia euroja.** Ainoa erä joka maksaa on lauseiden generointi. Kaikki muu on joko avointa dataa tai mahtuu ilmaistasoille.

_Alkuperäinen arvio oli 10–50 $, ja siitä lähes kaikki oli kuvia. Kun kuvat päätettiin hakea käsin (ADR 0005), se erä katosi kokonaan._

**Jatkuva meno: käytännössä 0 €.** Uusi sana maksaa murto-osan sentistä (ääni + lause; kuva on ilmainen mutta maksaa aikaa). 8 uutta sanaa päivässä on suuruusluokkaa **muutamia kymmeniä senttejä kuukaudessa**.

Tämä on selvästi halvempi kuin suunnitteluvaiheessa pelättiin. Kaikki kolme pelättyä kuluerää ratkesivat ilmaisiksi: data-aineistot ovat avoimia, TTS mahtuu ilmaistasolle, ja kuvat tulevat avoimesti lisensoidusta piktogrammikirjastosta.

**Raha ei ole tämän projektin rajoite.** Se ei ole myöskään aika: ADR 0005:n lopullinen versio (piktogrammikirjasto) poisti sen käsityövaiheen joka olisi maksanut 4–8 minuuttia päivässä. Jäljelle jäävä riski on laadullinen — sekoittuvatko piktogrammit keskenään — eikä sitä ratkaista rahalla.

## Kattoraja — päätetty

**50 $ v0:n pystytykselle.** Päätetty 7.9.2026.

Kuvapäätöksen jälkeen katossa on runsaasti väljyyttä: ainoa palvelu jossa kuluja voi kertyä on **kielimalli**. Väljyys on hyvä asia — se antaa tilaa mitata kahta mallia askeleessa 9 ja generoida lauseet tarvittaessa uudelleen ilman että katto tulee vastaan.

**Kaksi käytännön suojaa, jotka maksavat vähemmän kuin kattoraja itse:**

1. Aseta **kululimiitti tai -hälytys kielimallin tilille** heti kun se luodaan (askel 9). Katto on paperilla, limiitti pysäyttää oikeasti.
2. Aja lauseputki **ensin kymmenen sanan otoksella** ja katso tulos ennen kuin ajat kaikki 300. Tämä on jo kirjattu askeleeseen 9.

## Mitä tämä tarkoittaa aikataululle

Kustannus ei ole este millekään askeleelle. **Askel 0 on valmis 9.9.2026** — myös git-este poistui.
