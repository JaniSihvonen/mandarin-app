# mandarin-app

A spaced-repetition app for learning Mandarin Chinese, built for a single learner.

**Live:** <https://mandarin-appjs.netlify.app> — deployed automatically from `main`.

**Status:** early development. The application is not usable yet — see [Roadmap](#roadmap).

## What it is

Most vocabulary apps hand you a deck and hope it sticks. This one has a narrower goal: get one learner to roughly **300 words**, the threshold where _sentence mining_ — pulling your own example sentences out of real material — starts to work. Below that threshold every authentic sentence is too hard to be useful.

Design principles that follow from that goal:

- **Data is the source of truth, AI is the explainer.** Characters, pronunciation and word frequencies come from open dictionaries and corpora. A language model never invents them.
- **Generated Chinese is always validated against the dictionary** before it reaches the screen. The learner does not speak Chinese and cannot catch a model's mistake, so the system has to.
- **Every card carries an image, audio and an example sentence** built from words the learner already knows, so meaning is bound to the thing rather than to an English translation.
- **Scheduling is not hand-rolled.** FSRS handles the intervals.

## Stack

| Layer      | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Frontend   | React 19 + TypeScript, built with Vite 8                     |
| Scheduling | [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) |
| Backend    | Supabase (Postgres, auth, storage)                           |
| Serverless | Netlify Functions — keeps API keys off the client            |
| Hosting    | Netlify                                                      |
| Tooling    | oxlint, Prettier                                             |

## Getting started

Requires Node 20.19+ or 22.12+ (Vite 8). Developed on Node 24.

```bash
npm install
npm run dev
```

| Script                 | Does                               |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Development server                 |
| `npm run build`        | Type-check and build to `dist/`    |
| `npm run preview`      | Serve the production build locally |
| `npm run lint`         | oxlint                             |
| `npm run format`       | Prettier, write                    |
| `npm run format:check` | Prettier, check only               |

Copy `.env.example` to `.env` and fill it in as the relevant features land. `.env` is git-ignored and must stay that way.

## Roadmap

Fifteen steps from an empty repo to a daily-use app. The real completion criterion is **14 consecutive days of actual use**, not a feature list.

Current position: **step 1 of 15** — repository and project skeleton.

Planning documents (in Finnish) live outside this repository. Decision records live in [`docs/adr/`](docs/adr/) and explain _why_ each choice was made — including the ones that were later reversed.

## Data sources and licenses

This project would not exist without openly licensed data. Every dataset below was license-checked before use; the reasoning is recorded in `docs/adr/`.

**CC-CEDICT** — Chinese-English dictionary. Published by MDBG, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Based on CEDICT, © 1997, 1998 Paul Andrew Denisowski. <https://www.mdbg.net/chinese/dictionary?page=cc-cedict>

**SUBTLEX-CH** — word frequencies from film subtitles. Cai Q, Brysbaert M (2010) _SUBTLEX-CH: Chinese Word and Character Frequencies Based on Film Subtitles._ PLoS ONE 5(6): e10729. Licensed CC BY.

**Make Me a Hanzi** — character decomposition and component roles (`dictionary.txt`). Licensed LGPL v3+. Derived from Unihan and CJKlib. <https://github.com/skishore/makemeahanzi>

**Global Symbols** — AAC pictograms used as word illustrations. Only sets under CC BY-SA 4.0 or in the public domain are used (Mulberry, OpenMoji, Tawasol, Blissymbolics, PiCom and others). Per-image attribution is stored with each image and shown in the app. <https://globalsymbols.com>

**HSK 3.0 word lists** — stored as a data field only. Source: Chinese Ministry of Education standard (2021), via open community compilations.

## License

Not yet decided; until a license file is added, all rights are reserved. This is separate from the datasets above, which keep their own licenses.
