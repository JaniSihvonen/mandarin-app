# ADR 0004 — HSK-tasot datakenttänä

**Tila:** hyväksytty
**Päivä:** 7.9.2026
**Liittyy:** v0-Maarittely luku 7 (`hsk_level`)

## Ongelma

`words`-taulussa on kenttä `hsk_level`. Se ei ohjaa v0:ssa mitään — aloituspakan järjestys tulee OCLO-periaatteesta ja taajuudesta — mutta se on hyödyllinen suodatin ja vertailukohta myöhemmin. Mistä tieto otetaan ja saako sitä käyttää?

## Päätös

**HSK 3.0** (Kiinan opetusministeriön standardi, maaliskuu 2021), tasot 1–9, GitHubin avoimista koosteista. Esimerkiksi `drkameleon/complete-hsk-vocabulary` (JSON, sisältää sekä HSK 2.0:n että 3.0:n) tai `elkmovie/hsk30`.

Konkreettinen repo valitaan askeleessa 6, kun nähdään mikä liittyy siisteimmin CC-CEDICTiin. Tämä ADR päättää **että HSK 3.0 ja avoin kooste**, ei mikä repo.

## Lisenssi

Alkuperäinen lähde on Kiinan opetusministeriön julkaisema standardi. GitHub-koosteet ovat OCR- tai jäsennysajoja siitä PDF:stä.

**Tulkinta:** sanalista on luettelo faktoja (mikä sana kuuluu mille tasolle), eikä sellaisenaan yleensä yllä teoskynnykseen. Käyttö datakenttänä lähdemaininnalla on perusteltua.

**Tämä on kuitenkin heikoin lisenssipohja kaikista v0:n aineistoista**, koska ehtoja ei ole kirjattu mihinkään yksiselitteisesti. Siksi:

- Valitusta reposta on **luettava sen oma LICENSE-tiedosto** ennen käyttöä askeleessa 6, ja se kirjataan tähän ADR:ään.
- `hsk_level` pidetään tarkoituksella **irrallisena kenttänä**, joka ei ohjaa mitään logiikkaa. Jos se jouduttaisiin poistamaan, mikään ei hajoa.

## Mitä maksaa

0 €.
