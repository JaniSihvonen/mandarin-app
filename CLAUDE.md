# CLAUDE.md

Ohjeet Claude Codelle tässä repossa. Ladataan joka istunnossa — pidä lyhyenä.

## Mikä tämä on

Mandariinikiinan oppimissovellus yhdelle käyttäjälle (Jani). Välitavoite: ~300 sanan sanavarasto, jonka jälkeen omien lauseiden louhinta aidosta materiaalista alkaa toimia.

**Painopiste on paras mahdollinen oppimistyökalu, ei nopein portfolio.** Portfolio on sivutuote eikä ohjaa tuotepäätöksiä.

Suunnitteludokumentit ovat erillisessä Obsidian-vaultissa `C:\Users\Jani\Desktop\Projekti`:
`Konsepti.md` (miksi), `v0-Maarittely.md` (mitä ja miten, sis. tietomalli), `v0-Roadmap.md` (askeleet), `MEMORY.md` (päätöshistoria). **Lue niitä kun tarvitset kontekstia — älä arvaa.**

Päätösten perustelut ovat tässä repossa: `docs/adr/`.

## Ajaminen

```
npm install      # riippuvuudet
npm run dev      # kehityspalvelin
npm run build    # tuotantokäännös -> dist/
npm run lint     # oxlint
npm run format   # prettier --write .
```

## Kriittinen sääntö — kiinan validointi

**Kiinaa ei koskaan näytetä käyttäjälle ilman että se on validoitu sanakirjaa vasten.**

Syy: Jani ei osaa kiinaa eikä voi havaita mallin virhettä. Väärä merkki tai väärä pinyin opettaa väärin huomaamatta, ja virhe jää muistiin kuukausiksi.

Kun kielimalli tuottaa lauseen, validointi on pakollinen:

1. **Segmentointi** pisimmän osuman menetelmällä `words`-taulua vasten. Osumaton kohta → hylkää
2. **Sanakirjatarkistus:** jokaisen sanan löydyttävä `words`-taulusta. Pysäyttää keksityt sanat
3. **Sanastotarkistus:** jokaisen sanan oltava sallitussa sanastossa
4. **Pinyin haetaan aina sanakirjasta**, ei koskaan mallilta
5. **Pituusraja:** enintään ~12 sanaa

Hylkäys → yksi uusi yritys → sitten kortti ilman lausetta, merkitään uudelleenyritettäväksi.

**Mitä ei validoida:** muistisäännöt ja merkkien taustat ovat suomeksi tai englanniksi. Ne saavat olla värikkäitä ja jopa etymologisesti epätarkkoja — niiden tehtävä on tarttua mieleen. Tämä on kerrottava käyttöliittymässä näkyvästi.

## Kieli

- **Koodi ja commitit englanniksi.** Muuttujat, funktiot, kommentit, tiedostonimet
- **Tietokantataulut ja -kentät `snake_case`-englantia** (`user_words`, `tone_pattern_surface`)
- **Suunnitteludokumentit ja ADR:t suomeksi.** `README.md` on englanniksi, koska se on repon julkinen kasvo
- Sama asia kahdella nimellä on siedettävä hinta siitä että kumpikin konteksti pysyy luettavana

## Commit-käytäntö

**Conventional commits.** Jokainen viesti alkaa tyypillä:

```
feat:     uusi ominaisuus
fix:      bugikorjaus
docs:     dokumentaatio
refactor: rakenteen muutos ilman toiminnallista muutosta
chore:    työkalut, riippuvuudet, konfiguraatio
```

Pieni ja looginen commit on parempi kuin iso. Historia on tämän projektin kehityspäiväkirja ja osa portfoliota.

## Työtapa

- **WIP-raja 1:** yksi tehtävä työn alla kerrallaan. Yksi roadmap-askel = yksi GitHub Issue
- Askel on valmis vasta kun sen "Valmis kun" -kohta toteutuu, ei kun koodi on kirjoitettu
- **Kerro mitä git-komento tekee ennen kuin Jani hyväksyy sen.** Se on sovittu oppimistapa, ei kohteliaisuus
- Isot muutokset plan modessa

## Rajaukset v0:ssa

Nämä on **päätetty jättää pois**. Älä ehdota niitä takaisin ilman että Jani nostaa asian:

- Ei kuullunymmärtämistä, ei kuuntelukortteja, ei toonipariharjoitusta
- Ei puheentunnistusta eikä ääntämispalautetta
- Ei PWA:ta, ei offline-tilaa, ei puhelinta — v0 on työpöytäsovellus
- Ei pinyin-järjestelmän opettamista (Jani osaa sen jo)
- Yksi korttityyppi (`recognition`) ja kaksi arvostelunappia

Arvostelu tallennetaan silti **FSRS:n neliportaisella asteikolla** (arvot 1 ja 3), ei nappinumerona — jotta kolmas nappi voidaan lisätä myöhemmin ilman että vanha data on virheellistä.

## Aineistot ja lisenssit

Kaikki avoimia, ks. `docs/adr/`:

| Aineisto                                         | Lisenssi          | ADR  |
| ------------------------------------------------ | ----------------- | ---- |
| CC-CEDICT (sanakirja)                            | CC BY-SA 4.0      | 0001 |
| SUBTLEX-CH (taajuudet)                           | CC BY             | 0002 |
| Make Me a Hanzi (osittelu, komponenttien roolit) | LGPL v3+          | 0003 |
| HSK 3.0 -listat                                  | ks. ADR           | 0004 |
| Global Symbols -piktogrammit                     | CC BY-SA 4.0 / PD | 0005 |

**Sääntö:** yhtään aineistoa ei oteta käyttöön ennen kuin sen lisenssi on luettu ja kirjattu ADR:ksi. Lähdemaininnat kuuluvat `README.md`:hen.
