# Lanjut — Design System

**Lanjut** is a product of **EDILAKSO GROUP** (trading as *edilakso — IT Agent Solution*). It helps Indonesian SMK students in kelas 12 who plan to continue to university understand the TKA / SNBP / SNBT timeline and choose the right mapel. It ships as a **web app (PWA)** plus a set of **presentation materials** used in school sessions.

The design system covers both surfaces: the app UI and the slide deck.

## Sources

Everything here was built from the brand materials supplied directly in this project — no codebase, Figma file or repository was attached.

- `uploads/1.png` – `uploads/8.png`, `uploads/13.png` — Lanjut mascot and wordmark artwork (copied into `assets/`)
- `uploads/9.png` – `uploads/12.png` — parent-brand edilakso marks (copied into `assets/logo/`)
- Written brand direction supplied in the brief: palette, typeface, tone, mascot usage rules, wordmark variants

No production code or Figma link was provided. If either exists, attach it and this system should be re-verified against it — particularly component paddings, radii and the real screen inventory.

## Brands in play

| Mark | Use |
|---|---|
| **Lanjut** (blue, rabbit + wordmark) | The student-facing product. Everything in this system is Lanjut unless stated otherwise. |
| **edilakso** (blue `e` + cursor arrow, black wordmark) | The parent company. Appears only in credits, footers and the closing slide. Its royal blue `#4B6FFF` is **not** part of the Lanjut palette and must not be mixed into product UI. |

---

## CONTENT FUNDAMENTALS

**Language.** Bahasa Indonesia, everyday register — the way a supportive older sibling talks, not the way a school circular is written. English words that students actually use stay in English (`deadline`, `checklist`, `upload`); institutional acronyms stay as-is and are always uppercase: TKA, SNBP, SNBT, UTBK, SNPMB, PTN, PDSS.

**Person.** Address the student as **kamu**, never *Anda* (too formal, sounds like a bank) and never *kalian* (lectures a crowd). The product speaks as *Lanjut* or as a plain "kita" when describing shared work. Avoid *saya*.

- Yes: "Kamu punya waktu 92 hari sebelum pendaftaran SNBP ditutup."
- No: "Anda memiliki waktu 92 hari sebelum pendaftaran SNBP ditutup."

**Casing.** Sentence case everywhere — headings, buttons, tabs, badges. The only uppercase is the small letter-spaced eyebrow label (`--fs-label`, tracking `.08em`) and acronyms. No Title Case, no ALL-CAPS headlines, no exclamation marks in UI copy (at most one per deck, in the closing slide).

**Length.** One idea per screen and per slide. Headline ≤ 8 words; supporting sentence ≤ 20 words; body block ≤ 3 lines. If it needs a fourth line, it is a second card.

**Verbs.** Buttons and links start with a verb and name the object: "Lihat linimasa", "Pilih mapel", "Simpan pilihan", "Atur pengingat". Never "Klik di sini", "Submit", "OK" alone.

**Tone in stressful moments.** Deadlines are stated as facts plus a next step, never as alarm. The system has no red or orange precisely so a due date cannot shout.

- Yes: "Pendaftaran tutup 18 Februari. Sisa 2 langkah di checklist kamu."
- No: "Awas! Deadline hampir habis!!!"

**Numbers and dates.** Indonesian long form in body copy — "4 – 18 Februari 2027". Short form in badges — "4 Feb". Counts are written out under ten in prose ("dua pilihan"), numerals in UI ("2 pilihan").

**Empty and error states.** Say what happened and what to do, in that order, with no blame on the student: "Belum ada target kampus. Tambahkan satu untuk melihat linimasa kamu." Error text is deep blue, phrased as a correction, not a rejection: "Format email belum tepat."

**Emoji.** Not used. Status is carried by the StatusPill dot and by the mascot, which appears only at openings and closings.

**Mascot voice.** The rabbit never speaks in first person and has no name in copy. It is a visual reassurance ("belajar bisa terasa gampang"), not a character with dialogue.

---

## VISUAL FOUNDATIONS

### Colour

Three brand blues, plus white and a soft-black ink. That is the whole palette.

| Token | Value | Role |
|---|---|---|
| `--blue-200` | `#B4E1EB` | biru muda — soft fills, secondary buttons, gradient top |
| `--blue-300` | `#95BDD7` | biru sedang — gradient mid, borders, brand bar |
| `--blue-400` | `#78A4CB` | biru tua — primary buttons, active states, gradient bottom |
| `--white` | `#FFFFFF` | cards, app background over tint |
| `--ink-900` | `#1A1A1A` | all body text — **never** pure `#000` |

Derived steps `--blue-100` (`#E4F3F7`), `--blue-500` (`#5E88AF`) and `--blue-600` (`#456A8C`) exist only for hover, press and text-on-light-blue contrast; they are extensions of the three cores, not new brand colours.

**Banned:** red and orange in any role, including errors, alerts and charts. They contradict the calm/trustworthy tone. Urgency is expressed as *deep blue* (`--status-attention`), completion as a muted green (`--status-ok` `#4E9C87`), inactivity as grey.

### Gradient

One gradient shape only: **vertical, light to deep**, `--gradient-cover` (`blue-200 → blue-300 → blue-400`, top to bottom). It is the splash, onboarding, app tile and slide cover background. Never diagonal on covers, never inverted (deep at top), never two-hue. `--gradient-tile` (160°) is the tighter version used on small brand tiles and the brand-tone AppBar.

### Typography

**Poppins only** — one family for display and body, weights 300–700, sizes 12–64px. No second typeface, no serif accent, no monospace.

| Role | Size / line-height / weight |
|---|---|
| Display (slide covers) | 64 / 1.05 / 600, `-0.02em` |
| H1 | 44 / 1.12 / 600 |
| H2 | 32 / 1.18 / 600 |
| H3 | 24 / 1.25 / 600 |
| Title (card head, app bar) | 20 / 1.35 / 500 |
| Body large | 18 / 1.6 / 400 |
| Body | 16 / 1.6 / 400 |
| Body small | 14 / 1.55 / 400 |
| Caption / eyebrow | 12 / 1.45 / 400 (eyebrow: 500, uppercase, `.08em`) |

Poppins is geometric and wide; headings get negative tracking so they don't feel airy, body stays at 0. Measure caps at `--max-measure` (62ch). Left-aligned by default; centred only on splash, empty states and slide covers.

### Spacing and layout

4px base, exposed as `--space-1` … `--space-24`. Mobile page gutter is 20px; slide margin is 88px on a 1280×720 canvas. Cards stack at 16px, sections separate at 32px. The PWA is a fixed-width column (390px design width) with the AppBar pinned top and the TabBar pinned bottom; everything between scrolls.

### Corner radii

Rounded, never square, never fully circular except for dots and icon buttons.

`--radius-xs` 8 (checkbox) · `--radius-sm` 12 · `--radius-md` 16 (inputs, small cards) · `--radius-lg` 24 (default card) · `--radius-xl` 32 (cover panel, bottom sheet) · `--radius-pill` 999 (buttons, chips, badges) · `--radius-tile` 22.5% (app icon squircle, matching the supplied mascot tiles).

### Cards

White fill, 1px `--border-hairline` (`#E6E9ED`), 24px radius, `--shadow-1`. Soft cards swap the fill for `--blue-100` and the border for `--border-soft`. Brand cards use `--gradient-tile` with white text and no border. **No coloured left-border accent cards** — that pattern is not part of this brand.

### Shadows

All shadows are blue-tinted (`rgba(69,106,140,…)`), never neutral grey, so depth reads as part of the palette.

`--shadow-1` resting card · `--shadow-2` primary button, raised card · `--shadow-3` hover lift · `--shadow-4` bottom sheet · `--shadow-inset-press` pressed tiles · `--focus-ring` 3px `rgba(120,164,203,.45)` halo.

### Borders

1px hairlines only. `--border-hairline` on neutral surfaces, `--border-soft` (`#D6E5EE`) on blue-tinted ones, `--border-brand` (`--blue-300`) for outline buttons and selected states. No 2px+ borders, no dashed borders except the file-drop target.

### Interaction states

- **Hover** — fills go one step deeper (`blue-400 → blue-500`); transparent controls pick up a `--blue-100` wash; interactive cards lift 2px and gain one shadow step. Opacity is never used to signal hover.
- **Press** — `scale(0.97)` over 120ms; large tiles additionally take `--shadow-inset-press`.
- **Focus** — 3px soft blue ring, never removed.
- **Disabled** — 45% opacity, pointer events off. No grey-out recolour.
- **Selected** — solid `--blue-400` fill with white text (chips, tabs, calendar days).

### Motion

Short and soft. 120ms for state changes, 200ms default, 320ms for sheets and progress fills, 420ms for page transitions. Easing is `cubic-bezier(.4,0,.2,1)` for most things and `cubic-bezier(.16,.84,.44,1)` for anything entering the screen. Sheets slide up 16px with a fade; lists fade in with a 30ms stagger. **No bounce, no spring overshoot, no attention-seeking loops** — the mascot never animates in the app chrome. All durations collapse to 0 under `prefers-reduced-motion`.

### Transparency and blur

Used in exactly two places: the bottom-sheet scrim (`rgba(26,26,26,.38)` + 2px blur) and `onDark` badges over the cover gradient (`rgba(255,255,255,.22)`). Nothing else is translucent — no frosted headers, no glass cards.

### Backgrounds and imagery

The app background is `--ink-050`, a near-white with a cool cast; brand moments switch to the vertical gradient. There are no photographs in the supplied materials and no repeating patterns or textures. When photography is introduced it should be **cool-toned, natural light, real students, no heavy filter or grain**, and it always carries `--scrim-bottom` under white type. Illustration is limited to the supplied mascot artwork — do not draw new illustrations in this style.

### Protection

Type over the gradient or over imagery uses the bottom scrim, not a capsule. Capsules (`onDark` badge) are for short labels only. The wordmark badge already carries its own background and needs no further protection; the standalone wordmark requires a deep-blue or dark image behind it.

---

## ICONOGRAPHY

No icon set was supplied with the brand materials.

**Substitution — please confirm:** the system uses **Lucide** (`https://unpkg.com/lucide@latest`) as its icon set. Lucide's 2px round-cap outline style matches the mascot artwork, which is itself a single-weight rounded outline drawing — that consistency is the reason for the choice. If Lanjut already has an icon library, send it and this section should be replaced.

Rules:

- **Outline only**, 2px stroke, round caps and joins, `currentColor`. No filled or duotone glyphs, no mixed icon families.
- Sizes: 20px inline with body text, 24px in list rows and app bars, 28px in the TabBar.
- Icons never carry colour of their own: they inherit `--ink-500` at rest, `--blue-600` when active, white on brand fills.
- Icons are always paired with a label in navigation. Icon-only controls exist only in the AppBar and must pass an `aria-label` (see `IconButton`).
- **No emoji as icons**, ever. **No unicode dingbats** in production — the specimen cards use a few (`⌂ ◷ ‹`) purely so the cards stay dependency-free.
- The mascot is not an icon. It never appears inside a button, list row, tab or notification.

Brand imagery lives in `assets/`:

- `assets/logo/lanjut-wordmark-badge.png` — wordmark in a rounded blue box (headers, covers)
- `assets/logo/lanjut-wordmark-standalone.png` — white wordmark, no background (over photos / deep blue)
- `assets/mascot/mascot-blue.png` · `mascot-dark.png` · `mascot-white.png` — the rabbit alone
- `assets/mascot/mascot-tile-primary.png` · `mascot-tile-light.png` · `mascot-tile-dark-on-blue.png` · `mascot-tile-inset.png` — app-icon lockups
- `assets/logo/edilakso-*.png` — parent-company marks, for credits only

---

## Components

Reusable primitives, grouped by concern. Every component is a `.jsx` with a sibling `.d.ts` and `.prompt.md`; each directory carries one specimen card.

**`components/core/`** — `Button`, `IconButton`, `Card`, `Badge`, `Chip`
**`components/forms/`** — `Field`, `Input`, `Select`, `Checkbox`, `Switch`
**`components/feedback/`** — `StatusPill`, `ProgressBar`, `EmptyState`, `Dialog`
**`components/navigation/`** — `AppBar`, `TabBar`, `SegmentedControl`
**`components/brand/`** — `Wordmark`, `Mascot`, `CoverPanel`, `TimelineStep`

### Intentional additions

No source defined a component inventory, so this is an authored standard set sized to the product. Two entries are Lanjut-specific rather than generic:

- **`TimelineStep`** — the TKA/SNBP/SNBT timeline is the product's core screen; it needs a first-class row primitive.
- **`Mascot` / `Wordmark` / `CoverPanel`** — wrappers that enforce the supplied artwork and the "openers and closers only" mascot rule, so the mark is never re-typeset or over-used.

---

## Index

```
styles.css              single entry point — @import list only
tokens/                 colors, typography, spacing, radius, elevation, motion, fonts, base
components/             core · forms · feedback · navigation · brand
guidelines/             foundation specimen cards (Design System tab)
ui_kits/lanjut-pwa/     full app screens, click-through
slides/                 1280x720 deck slide types
templates/              copyable starting artifacts (deck sosialisasi, layar app)
assets/logo/            Lanjut + edilakso marks
assets/mascot/          graduate-rabbit artwork
SKILL.md                agent entry point
readme.md               this file
```

## Open questions

1. **Fonts** — Poppins is loaded from Google Fonts. Send licensed binaries if the app must self-host.
2. **Icons** — Lucide is a substitution (see ICONOGRAPHY). Confirm or replace.
3. **Photography** — none supplied. The rules above are a proposal.
4. **Real product screens** — the UI kit is built from the brand direction, not from live code or Figma. Attach either and the kit should be re-checked against it.
