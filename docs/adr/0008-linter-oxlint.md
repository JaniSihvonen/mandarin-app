# ADR 0008 — Linteriksi oxlint eikä ESLint

**Tila:** hyväksytty
**Päivä:** 9.9.2026
**Liittyy:** v0-Roadmap askel 1, `Aloitusvalmistelut.md` luku A

## Ongelma

Roadmapin askel 1 määrää "ESLint + Prettier". Kun projektirunko luotiin komennolla `npm create vite@latest -- --template react-ts` (create-vite 9.2.0), kävi ilmi että **Vite ei tuo enää ESLintiä** vaan `oxlint`in. Mukana tuli `.oxlintrc.json` ja `package.json`-skripti `"lint": "oxlint"`.

Päätös oli siis tehtävä: pysyäkö kirjatussa valinnassa vai templaten mukana.

## Vaihtoehdot

|                         | oxlint (templaten valinta)                  | ESLint (dokumentin valinta)                                           |
| ----------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Asennus                 | Tulee valmiina                              | Poistettava oxlint, asennettava ESLint + typescript-eslint + pluginit |
| Riippuvuudet            | 1 paketti                                   | Kymmeniä                                                              |
| Nopeus                  | Rust-pohjainen, kertaluokkaa nopeampi       | Hitaampi                                                              |
| Tunnettuus              | Uusi                                        | Alan vakiotyökalu                                                     |
| Tyyppitietoiset säännöt | Vaatii erillisen `oxlint-tsgolint`-lisäosan | Sisäänrakennettu                                                      |
| Prettier-yhteensopivuus | Ei tarvitse sovituskerrosta                 | Vaatii `eslint-config-prettier`                                       |

## Päätös

**Pidetään oxlint.** Prettier lisätään sen rinnalle erikseen.

Perustelu:

1. **Templatea vastaan taisteleminen maksaa enemmän kuin se tuottaa.** ESLintiin vaihtaminen tarkoittaisi kymmenen riippuvuuden lisäämistä ja oman konfiguraation ylläpitoa, ja se hankaloittaisi Viten päivittämistä myöhemmin.
2. **`eslint-config-prettier`-sovituskerrosta ei tarvita**, koska oxlint ei valvo muotoilusääntöjä lainkaan — se keskittyy virheisiin. Prettier ja oxlint eivät riitele.
3. **Linterin tunnettuus on tässä projektissa pieni tekijä.** Portfolion lukija on todennäköisemmin kiinnostunut validointiputkesta ja ADR:istä kuin siitä kumpi linter on käytössä.
4. Vaihtaminen jälkikäteen on halpaa, jos syy ilmenee.

## Seuraukset

- `npm run lint` ajaa oxlintin. Konfiguraatio on `.oxlintrc.json`
- `npm run format` ja `npm run format:check` ajavat Prettierin. Konfiguraatio on `.prettierrc`
- **Tyyppitietoiset säännöt ovat pois päältä.** Ne saa käyttöön asentamalla `oxlint-tsgolint` ja lisäämällä `"options": { "typeAware": true }`. **Harkittava uudelleen viimeistään askeleessa 6**, jossa seed-skripti käsittelee isoa datamäärää ja tyyppivirheet ovat kalliimpia kuin käyttöliittymäkoodissa
- `v0-Roadmap.md`:n askeleen 1 kohta "ESLint + Prettier" on vanhentunut ja korvattu tällä

## Mitä maksaa

0 €. Kumpikin työkalu on ilmainen ja avoin.
