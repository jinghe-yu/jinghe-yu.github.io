---
name: Affective Modernist
colors:
  surface: '#f9f9fa'
  surface-dim: '#dadadb'
  surface-bright: '#f9f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeef'
  surface-container-high: '#e8e8e9'
  surface-container-highest: '#e2e2e3'
  on-surface: '#1a1c1d'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#72575e'
  on-secondary: '#ffffff'
  secondary-container: '#fed9e1'
  on-secondary-container: '#795d64'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#30111c'
  on-tertiary-container: '#a57784'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#fed9e1'
  secondary-fixed-dim: '#e0bec6'
  on-secondary-fixed: '#2a161c'
  on-secondary-fixed-variant: '#594047'
  tertiary-fixed: '#ffd9e2'
  tertiary-fixed-dim: '#edb9c7'
  on-tertiary-fixed: '#30111c'
  on-tertiary-fixed-variant: '#623c47'
  background: '#f9f9fa'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e3'
typography:
  display-hero:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-mono-lg:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-mono-sm:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system expresses the intersection of computational rigor and visceral human emotion. Designed specifically for an academic portfolio in Human-Centered AI (HCAI), Human-Computer Interaction (HCI), and Affective Computing, the design language reflects both scientific discipline and emotional sensitivity.

The visual style synthesizes Swiss Modernist structure—strict typographical grids, stark contrasts, and uncompromising legibility—with the tactile intimacy of affective computing. Neo-grotesque structural typography anchors scholarly authority, while subtle retro-computational monospaced details evoke early biosignal analysis and cybernetic instrumentation. A palette anchored by deep obsidian and warm paper off-white is softened by humanistic rose tones, transforming a traditional academic dossier into an avant-garde editorial artifact that feels alive, rigorous, and deeply human.

## Colors

The palette establishes an immediate academic baseline elevated by tactile warmth:

- **Primary (`#141414`) — Obsidian:** Dense, authoritative, and ink-like. Used for principal typography, hairline geometric boundaries, and commanding display elements. Replaces digital pure black with a grounded editorial darkness.
- **Secondary (`#F8D4DC`) — Rose Mist:** A soft, desaturated flesh/affective tone symbolizing human emotion, skin conductance, and visceral response. Employed in interactive callouts, hover fills, publication metadata badges, and signal wave representations.
- **Tertiary (`#F2BDCB`) — Blush:** A deeper emotional accent used for active states, selected pill tokens, interactive data plots, and research focus areas.
- **Neutral (`#F7F7F8`) — Paper Off-White:** A calibrated archival substrate that reduces the glare of modern displays, providing the texture of unbleached archival paper.

### Functional Roles
- **Canvas Base:** `#F7F7F8` for light readability.
- **Surface Elevation:** Pure White `#FFFFFF` for paper cards and data readouts.
- **Muted Text / Metadata:** `#59595C` for publication citations, co-author lists, and timestamps.
- **Rule Lines & Structural Grids:** `#E2E2E5` with sharp 1px hairline rendering.
- **Affective Signal Accent:** `#D46A85` for data visualization highlights, affective peaks, and critical links.

## Typography

The typographic hierarchy juxtaposes two distinct visual paradigms:
1. **Neo-Grotesque Structural Purity (`Hanken Grotesk`):** Echoing Akzidenz-Grotesk's dense, high-impact forms, this typeface commands all display headings, project titles, and section titles with high weights and tight tracking.
2. **Neutral Reading Fluidity (`Inter`):** Selected for abstracts, research statements, and biographical narratives to guarantee effortless reading velocity across prolonged academic reading sessions.
3. **Biosignal / Cybernetic Monospace (`Space Mono`):** Applied strictly to metadata tags, conference indicators (e.g., `CHI '25`, `Affective Computing Lab`), telemetry metrics, and code snippets to evoke lab equipment, bio-sensors, and computational research artifacts.

## Layout & Spacing

The layout is built on a disciplined 12-column Swiss modernist grid, maintaining structural clarity and asymmetric editorial balance.

- **Desktop (1200px+):** 12 columns with `gutter: 1.5rem` and outer canvas margins of `3rem`. Elements snap deliberately to structural columns (e.g., 4 columns for sticky contextual metadata/navigation, 8 columns for core research narrative and paper feed).
- **Tablet (768px - 1199px):** 8 columns with `gutter: 1.25rem` and margins of `2rem`.
- **Mobile (< 768px):** 4 columns with `gutter-sm: 1rem` and `margin-mobile: 1.25rem`. Complex academic tables and multi-column comparison cards collapse into continuous vertical stacks.

Vertical rhythm is governed by multiples of 8px, paired with full-bleed 1px horizontal hairline borders that segment discrete paper entries, CV chapters, and experimental prototypes.

## Elevation & Depth

In alignment with Swiss modernist and flat academic aesthetics, elevation is achieved without heavy, diffused dropshadows. Depth is articulated purely through tonal layers, high-contrast borders, and tactile plane displacement:

- **Surface Tiers:**
  - Base Layer: `#F7F7F8` (Archival Canvas)
  - Surface Raised: `#FFFFFF` (Research Paper Index & Dossier Container)
  - Interactive Accent Layer: `#F8D4DC` (Active/Hovered states)
- **Low-Contrast Outlines & Hairlines:** Crisp `1px solid #E2E2E5` boundaries provide structural definition for cards, toolbars, and metadata slots.
- **Active State Shadow (Tactile Shift):** Only when hovering or focusing interactive research modules (e.g., interactive signal visualizers or paper demo launchpad), an offset shadow of `2px 2px 0px #141414` renders, referencing retro-digital physical switches and academic catalog index cards.

## Shapes

The geometric framework is crisp, structured, and disciplined. A subtle roundedness factor of `1` provides microscopic 4px (`0.25rem`) corners on interactive triggers and cards, softening harsh brutalist edges into an approachable humanistic interface while maintaining architectural rigor.

- **Primary Badges & Metadata Chips:** 2px to 4px slight roundness or square-cut corners to maintain the aesthetic of lab data printouts.
- **Images & Video Documentation:** Strictly 4px corner radius bordered with `1px solid #E2E2E5`.
- **Interactive Modals & Paper Viewers:** 4px radius, preserving the feel of printed conference folios.

## Components

### Buttons
- **Primary (Action/Download CV/Paper PDF):** Filled `#141414` with `#FFFFFF` text in `label-mono-lg`. Minimal padding (`0.625rem 1.25rem`), `rounded-xs` (2px), transitioning to `#F8D4DC` fill with `#141414` text on hover.
- **Secondary / Code Repository Link:** 1px solid `#141414` outline, transparent background, shifting to a solid `#141414` with white text on hover.
- **Tertiary / Citation Copy:** Borderless `Space Mono` link with an underline hover animation in `#D46A85`.

### Chips & Research Badges
- **Status/Venue Chip:** Compact containers formatted in `label-mono-sm`. Background `#F8D4DC` with text `#141414` for published papers (e.g., `[CHI 2025]`, `[NeurIPS Workshop]`), or `#E2E2E5` with `#59595C` text for work currently under review.

### Research Publication List Items
- Structured row-based layout separated by 1px rules (`#E2E2E5`).
- Left column (desktop): Monospaced year and project identifier.
- Center column: Publication title in bold `headline-sm`, followed by co-author listings with the author's name highlighted in obsidian bold.
- Right column: Quick-access pills for `[PDF]`, `[Code]`, `[BibTeX]`, and `[Interactive Abstract]`.

### Interactive Paper Summary Drawer
- Expandable inline drawer sliding down beneath paper listings with a paper-white (`#FFFFFF`) surface and a 1px border. Contains an interactive biosignal readout (e.g., simulated GSR/EEG curves or participant latency plots), 3-sentence TL;DR, and key research takeaway bullets.

### Input Fields & Search Filter
- Flat baseline or boxed inputs with `1px solid #141414`. Placeholder in muted mono type. Focused state highlights the container background to `#F8D4DC` with 20% opacity.

### Selection Controls (Filter Checkboxes & Radios)
- Sharp, square controls (checkboxes) and octagonal/circular rings with 1px obsidian outlines. Selected state fills with solid obsidian `#141414` containing a high-contrast tick.