# ADR 0009 — TypeScript-tyypit kirjoitetaan tietokannan muodossa (`snake_case`)

**Tila:** hyväksytty
**Päivä:** 9.9.2026
**Liittyy:** v0-Roadmap askel 3, v0-Maarittely luku 6 (tietomalli)

## Ongelma

Askeleessa 3 syntyi ensimmäinen oma tyyppi, `Word`. Se vastaa `words`-taulua, joka on `CLAUDE.md`:n säännön mukaan `snake_case`-englantia (`tone_pattern_surface`, `frequency_rank`).

TypeScriptin vakiintunut tapa on `camelCase`. Kysymys on siis: noudatetaanko kielen tapaa vai kannan muotoa?

Tämä ei ole tyyliseikka, koska Supabase palauttaa rivit sarakkeiden omilla nimillä. Valinta ratkaisee, tarvitaanko koodiin muunnoskerros.

## Vaihtoehdot

|                                            | `snake_case` (kannan muoto) | `camelCase` (TypeScriptin tapa)                |
| ------------------------------------------ | --------------------------- | ---------------------------------------------- |
| Muunnoskerros                              | Ei tarvita                  | Tarvitaan jokaiseen lukuun ja kirjoitukseen    |
| Kentän unohtaminen muunnoksessa            | Mahdotonta                  | Mahdollista, ja tyyppitarkistus ei aina huomaa |
| Kyselyn ja tyypin vertaaminen silmällä     | Suoraa                      | Vaatii nimien kääntämistä päässä               |
| Yhdenmukaisuus TS-ekosysteemin kanssa      | Poikkeaa                    | Noudattaa                                      |
| Automaattinen tyyppigenerointi Supabasesta | Toimii sellaisenaan         | Vaatii lisäaskeleen                            |

## Päätös

**Tietokantaa vastaavat tyypit kirjoitetaan `snake_case`-muodossa, yksi yhteen taulun kanssa.**

Muunnoskerros olisi ylimääräinen paikka, jossa kenttä voi kadota tai vaihtua toiseksi hiljaa. Tässä projektissa se on erityisen huono kauppa, koska tietomalli on Janille se osa jota hän ei ole aiemmin tehnyt — silloin vähemmän liikkuvia osia on arvokkaampaa kuin konvention noudattaminen.

Supabase osaa lisäksi generoida tyypit skeemasta suoraan. Jos joskus otetaan käyttöön, generoitu tyyppi on `snake_case` ja sopii yhteen ilman sovittelua.

**Rajaus:** sääntö koskee **vain tietokantaa vastaavia tyyppejä**. Komponenttien propsit, apufunktioiden parametrit ja muu sovelluslogiikka noudattavat normaalia `camelCase`-tapaa (`CardProps`, `revealed`, `handleKeyDown`).

## Seuraukset

- `Word` on kirjoitettu **täytenä** jo askeleessa 3, vaikka v0 käyttää siitä vain osaa. Silloin askel 5 ei joudu muuttamaan sitä
- Sekakäytäntö on tunnustettava: tiedostossa voi olla `word.tone_pattern_surface` ja `handleKeyDown` vierekkäin. Se näyttää epäjohdonmukaiselta kunnes tietää säännön, ja siksi sääntö on kirjattu myös `src/types.ts`:n kommenttiin
- oxlint ei valvo nimeämistyyliä, joten tämä ei vaadi konfiguraatiota

## Miksi tämä päätetään nyt

Askeleen 6 jälkeen kentät esiintyvät seed-skriptissä, kyselyissä ja jokaisessa komponentissa. Muutos tarkoittaisi silloin nimien vaihtoa läpi koodikannan. Nyt se on yksi tiedosto.

## Mitä maksaa

0 €. Poikkeama yleisestä TypeScript-tavasta on ainoa hinta.
