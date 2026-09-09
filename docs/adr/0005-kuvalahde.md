# ADR 0005 — Kuvat: avoimet AAC-piktogrammit Global Symbols -rajapinnasta

**Tila:** hyväksytty
**Päivä:** 9.9.2026
**Liittyy:** v0-Roadmap askel 6 ja 10, v0-Maarittely F7. **Sulkee MEMORY.md:n avoimen kysymyksen 3.**

## Ongelma

Jokaisessa kortissa on kuva, ja sen tehtävä on kytkeä sana suoraan asiaan eikä englannin käännökseen. Aloituspakka on ~300 sanaa, kolme ehdokasta kussakin. Mistä kuvat tulevat, millä lisenssillä ja mitä ne maksavat?

## Päätöksen historia — kaksi hylättyä ehdotusta

Tämä ADR on kirjoitettu kolme kertaa. Molemmat hylätyt versiot on säilytetty tähän, koska perustelu on ADR-materiaalia.

**1. Alkuperäinen määrittely: kuvahaku konkreettisille, generointi abstrakteille.** Hylättiin 7.9.2026 kahdesta syystä. Se maksoi 5–40 $ pystytyksessä ja juoksi jokaisesta uudesta sanasta, ja se rikkoi määrittelyn oman tyyliyhtenäisyysvaatimuksen — avoin kuvahaku palauttaa valokuvia, generointi viivapiirroksia.

**2. Käyttäjä etsii kuvan itse ja pudottaa sen sovellukseen.** Janin päätös 7.9.2026, hylättiin 9.9.2026 kun parempi vaihtoehto löytyi. Perustelu oli hyvä ja pysyy totena: kuvan **etsiminen** on syvempää semanttista käsittelyä kuin valmiiden ehdokkaiden arviointi. Hinta oli kuitenkin **4–8 minuuttia käsityötä joka päivä**, ja se oli v0:n valmiuskriteerin (14 päivää peräkkäistä käyttöä) suurin yksittäinen uhka. Lisäksi verkosta poimitut kuvat olisivat vaatineet yksityisen ämpärin tekijänoikeussyistä.

## Löydös joka muutti tilanteen

Hain aiemmin väärällä käsitteellä: "kuvahaku" ja "kuvageneraattori". Oikea käsite on **AAC** — augmentative and alternative communication.

AAC-piktogrammikirjastot on tehty puhevammaisille: jokaiselle sanalle on kuvasymboli, jotta ihminen joka ei pysty puhumaan voi rakentaa lauseita osoittamalla kuvia. **Se on tasan sama ongelma kuin tässä sovelluksessa** — miten esittää sana kuvana niin että merkitys välittyy ilman kieltä. Kirjastot ovat lisäksi lähtökohtaisesti avoimesti lisensoituja, koska ne on tuotettu julkisrahoitteisesti tai järjestövetoisesti.

**Global Symbols** tarjoaa yhden rajapinnan 37 piktogrammisetin yli ja kertoo lisenssin setti kerrallaan.

## Päätös

**Kolme piktogrammiehdokasta haetaan automaattisesti Global Symbols -rajapinnasta, ja käyttäjä valitsee niistä yhden sanan esittelyhetkellä.**

- Rajapinta: `https://globalsymbols.com/api/v1/labels/search?query={sana}&language=eng&symbolset={setti}`
- Hakusana: englanninkielinen merkitys CC-CEDICTistä
- **Vain kaupallisesti turvalliset setit:** CC BY-SA 4.0 ja Public Domain. Ks. alla
- Ehdokkaat haetaan **seed-ajossa**, ei esittelyhetkellä — esittely ei saa odottaa verkkoa
- Kuvatiedostot tallennetaan Supabase Storageen, ei linkkeinä ulkopuolisiin osoitteisiin

## Alipäätös: ARASAAC jätetään pois, vaikka se on paras setti

ARASAAC on selvästi laajin ja laadukkain (13 000–18 000 piktogrammia), mutta se on **CC BY-NC-SA** — ei kaupallista käyttöä. Mittasin mitä sen poisjättäminen maksaa.

**Kattavuusmittaus 9.9.2026, 60 aloituspakan tyyppistä sanaa:**

| Lähde                                             | Sanoja joilla ≥3 ehdokasta |
| ------------------------------------------------- | -------------------------- |
| Vain kaupallisesti turvalliset setit (BY-SA + PD) | **49 / 60 = 82 %**         |
| Samat + ARASAAC (NC)                              | noin 55 / 60 = 92 %        |

Puuttuvat 11 olivat **poikkeuksetta kieliopillisia sanoja:** some, many, why, how, can, will, must, if, more, only, always. ARASAAC täytti niistä kuusi kunnolla, loput ohuesti.

**Johtopäätös: fallback tarvitaan joka tapauksessa**, koska ARASAAC ei nosta kattavuutta sataan. Kun fallback on olemassa, NC-lisenssi ostaa enää noin kymmenen prosenttiyksikköä — ja maksaa siitä sen että kuvat pitäisi pitää yksityisessä ämpärissä, sovellusta ei voisi koskaan tuotteistaa, ja portfoliossa olisi selitettävä lisenssirajoite.

**ARASAAC jätetään pois.** Jos kattavuus osoittautuu käytössä liian ohueksi, tämä on halpa avata uudelleen: yksi setti lisää hakuun.

## Fallback puuttuville sanoille

Kolmiportainen, ylhäältä alas:

1. **1–2 ehdokasta** → näytetään ne, ei pakoteta kolmea
2. **0 ehdokasta** → **käyttäjä voi pudottaa oman kuvan** (drag & drop tai Ctrl+V). Tämä on ainoa jäänne hylätystä ehdotuksesta 2, ja se on tässä roolissa oikea: käsityötä tehdään vain siellä missä automatiikka ei yllä, ei joka sanasta
3. **Puhtaat kieliopilliset partikkelit** (的, 了, 个) → **kortti ilman kuvaa on sallittu**. Tämä on muutos F7:ään, joka oletti kuvan jokaiseen korttiin. Oletus ei kestä: 的:lle ei ole kuvaa, ei kirjastossa eikä netissä

## Lisenssi

Käytettävät setit ja niiden lisenssit (Global Symbolsin oman rajapinnan ilmoittamia, ei päättelyä):

| Setti                                                    | Lisenssi      |
| -------------------------------------------------------- | ------------- |
| Mulberry Symbols (+ Additional, + Plus)                  | CC BY-SA 4.0  |
| OpenMoji                                                 | CC BY-SA 4.0  |
| Tawasol                                                  | CC BY-SA 4.0  |
| Blissymbolics                                            | CC BY-SA 4.0  |
| Stellar Symbols                                          | CC BY-SA 4.0  |
| PiCom-setit (Auxiliary Verb, Curriculum, AI Cartoon ym.) | CC BY-SA 4.0  |
| Adam Urdu Symbols, Otsimo                                | CC BY-SA 4.0  |
| OCHA Humanitarian Icons, PiCom Unicode                   | Public Domain |

**Velvoitteet:** attribuutio per kuva (tekijä, setti, lisenssi) tallennetaan `word_images`-riville ja näytetään sanastonäkymässä. Lähdemaininta READMEen. Share-alike ei sido sovelluksen koodia eikä muuta dataa, koska kuvia ei muokata — ne käytetään sellaisenaan.

**Ämpäri voi olla julkinen.** Tämä on koko päätöksen paras sivuhyöty: yksityistä ämpäriä, RLS:ää ja allekirjoitettuja osoitteita ei tarvita kuville lainkaan.

## Mitä maksaa

**0 €.** Rajapinta on ilmainen eikä vaadi tunnuksia. Testattu 9.9.2026: haku toimii ilman avainta ja kuvatiedostot latautuvat suoraan (PNG ~12 kt, osa seteistä SVG).

Tallennustila: 900 piktogrammia à ~15 kt ≈ **14 MB**. Supabasen ilmaistason 1 GB riittää moninkertaisesti.

**Kitka: käytännössä nolla.** Esittelyssä valitaan kolmesta valmiista kuvasta, mikä vie sekunteja. Hylätyn ehdotuksen 4–8 min/pv katoaa, ja sen mukana v0:n suurin yksittäinen riski.

## Riski joka jää — ja se on aito

**Piktogrammikirjaston koko suunnittelutavoite on yhdenmukaisuus ja yksiselitteisyys.** Kaikki kuvat on piirretty samaan tyyliin, jotta ne olisivat mahdollisimman selkeitä ja kulttuurineutraaleja.

Muistamisen kannalta se on ongelma. Muistijälki syntyy **erottuvuudesta**, ja `Oppimismenetelmat.md`:n tavoitekuvana pitämä Mandarin Blueprintin mnemoniikka nojaa siihen että mielikuva on henkilökohtainen, outo ja elävä. Kliininen symboli on juuri päinvastainen.

**Tämä on tietoinen vaihtokauppa:** kitkaton ja ilmainen kuvaputki, hinnalla joka on todennäköisesti heikompi muistiteho per kortti kuin itse etsityllä kuvalla.

Se on oikea vaihtokauppa, koska v0:n valmiuskriteeri on **14 päivää peräkkäistä käyttöä**, ei paras mahdollinen muistijälki per kortti. Sovellus jota ei käytetä ei opeta mitään. Mutta tämä on **arvioitava uudelleen ensimmäisen käyttöviikon jälkeen**: jos huomaat että piktogrammit sekoittuvat keskenään etkä muista kumpi kuva kuului mihin sanaan, se on merkki siitä että erottuvuus on oikeasti ongelma eikä teoreettinen huoli. Silloin fallbackin oma kuva kannattaa nostaa oletukseksi vaikeille sanoille.

## Vaikutus tietomalliin

`word_images` **palaa jaetuksi sanakohtaiseksi dataksi**, koska piktogrammi ei ole käyttäjäkohtainen. Tämä kumoaa 7.9.2026 tehdyn käyttäjäkohtaistamisen.

| Kenttä           | Selitys                                             |
| ---------------- | --------------------------------------------------- |
| `id`, `word_id`  |                                                     |
| `url`            | Supabase Storage, julkinen ämpäri                   |
| `symbol_set`     | esim. `mulberry`                                    |
| `license`        | esim. `CC BY-SA 4.0`                                |
| `attribution`    | tekijä ja setti, näytetään sanastonäkymässä         |
| `source_url`     | alkuperäinen osoite                                 |
| `is_user_upload` | tosi vain fallback-tapauksessa (käyttäjän oma kuva) |

Käyttäjän oma fallback-kuva on **poikkeus**, ei sääntö: se tallennetaan samaan tauluun lipulla, ja **vain nämä rivit** vaativat yksityisen tallennuksen. `user_words.chosen_image_id` säilyy ennallaan.
