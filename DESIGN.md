# DESIGN.md — Visual Direction

Use this brief when writing any CSS or UI. Do not default to generic styles.
Follow these decisions throughout all chunks.

---

## Colour palette

```css
--bg:           #F2F0EC;   /* warm off-white — main background */
--surface:      #FFFFFF;   /* card / list item background */
--surface-alt:  #F7F6F3;   /* subtle alternative surface (grouped sections) */
--border:       #E4E2DC;   /* dividers and outlines */
--ink:          #1C1C1E;   /* primary text */
--ink-muted:    #8A8880;   /* secondary text, labels, metadata */
--accent:       #2d6a4f;   /* primary action — forest green (matches Munro Tracker) */
--accent-light: #d8f3dc;   /* accent background tint — mint (matches Munro Tracker) */
--danger:       #C0392B;   /* destructive actions only */
--checked:      #8A8880;   /* checked-off item text colour */
```

---

## Typography

- **Font:** Inter — `'Inter', system-ui, sans-serif` — load from Google Fonts (weights 300, 400, 500, 600). Matches Munro Tracker exactly.
- **Base size:** 16px on html element
- **Scale:**
  - Screen title: 28px, weight 700, letter-spacing -0.02em
  - Section label: 11px, weight 600, letter-spacing 0.08em, uppercase, `--ink-muted`
  - List item primary: 16px, weight 500
  - List item secondary / note: 13px, weight 400, `--ink-muted`
  - Button / action text: 15px, weight 600

---

## Spacing

- Base unit: 8px
- List item padding: 14px 16px
- Screen padding (horizontal): 16px
- Section gap: 24px
- Card border-radius: 12px
- Button border-radius: 99px (pill shaped — matches Munro Tracker)
- Small element border-radius (tags, pills): 99px

---

## List items

- White surface (`--surface`) on warm background (`--bg`)
- Thin bottom border (`1px solid --border`) between items, not around the group
- First item: rounded top corners. Last item: rounded bottom corners.
- No border on last item in group
- Left accent border (3px, `--accent`) for active/selected group headers
- Circular checkbox: 24px diameter, border `2px solid --border`, no fill when unchecked
- When checked: filled circle in `--accent`, white tick, item text colour shifts to `--checked`

---

## Checkboxes

- Style: circular (not square)
- Unchecked: white fill, `2px solid --border`
- Checked: `--accent` fill, white checkmark SVG
- Tap target: minimum 44x44px

---

## Navigation

- Bottom tab bar (mobile-first)
- 3 tabs: **Items** (master list) · **Trips** (builder + history) · **Pack** (active checklist)
- Active tab: `--accent` icon and label
- Inactive: `--ink-muted`
- Background: `--surface`, top border `1px solid --border`
- Height: 56px + safe area inset

---

## Buttons

- Primary: `--accent` background, white text, full-width on mobile, 48px height
- Secondary: white background, `--border` border, `--ink` text
- Destructive: `--danger` text, no background (text button only)
- No box shadows on buttons

---

## Category order (master item list + checklists)

Categories always appear in this fixed order — not alphabetical, not random:

1. Base Layers
2. Mid Layers
3. Outer Layers
4. Gloves
5. Footwear
6. Clothing (non-walking)
7. Navigation
8. First Aid
9. Cycle Kit
10. Electronics / Lighting
11. Toiletries
12. Sleep
13. Cooking
14. Food & Condiments
15. Essentials

This order reflects how you'd pack: what you wear first at the top, camp setup and food at the bottom.

---

## Category groups (master item list)

- Category name as a section header: 11px, weight 600, uppercase, letter-spacing 0.08em, `--ink-muted`
- 3px left border in `--accent` on the group header row
- 16px gap between groups
- Items within a group: white surface cards, thin `--border` divider between items
- First item in group: rounded top corners (8px). Last item: rounded bottom corners.
- Category header is NOT a card — it sits above the card group as a plain label
- On the master list, show item count per category in muted text next to the label (e.g. "COOKING · 8 items")

---

## Empty states

- Centred in the available space
- Icon (simple SVG or emoji): 40px
- Heading: 17px, weight 600
- Subtext: 14px, `--ink-muted`
- CTA button below

---

## Forms & inputs

- **All input fields, textareas, and selects must have `font-size: 16px` minimum** — this is non-negotiable on iOS Safari. Anything below 16px causes the page to auto-zoom on focus, which is jarring on a mobile tool.
- Input padding: 14px 12px
- Border: `1px solid --border`, border-radius 10px
- Focus state: border colour shifts to `--accent`, no outline
- Background: `--surface`
- Never style inputs smaller to "look neater" — the zoom behaviour overrides any aesthetic gain

---

## General rules

- No drop shadows anywhere (use borders instead)
- **Exception — cards and list groups:** `box-shadow: 0 4px 24px rgba(0,0,0,0.07)` — matches Munro Tracker's soft lifted card feel
- Bottom sheet shadow: `0 -4px 16px rgba(0,0,0,0.08)`
- No gradients
- No decorative elements — every pixel earns its place
- Transitions: 150ms ease for interactive state changes only
- Do not use blue as an accent — green (`--accent`) is the only accent colour
- Checked items move to the bottom of their list section, not hidden

---

## Tone

Calm, functional, outdoors-adjacent. Feels like a well-designed trail guide —
confident typography, warm neutrals, purposeful use of green. Not sporty or
loud. Quiet and reliable.

---

*Feed this file to Claude Code at the start of every chunk that involves UI.*
