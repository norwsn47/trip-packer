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
--accent:       #4A7C59;   /* primary action — forest green (outdoors feel) */
--accent-light: #EAF2EC;   /* accent background tint */
--danger:       #C0392B;   /* destructive actions only */
--checked:      #8A8880;   /* checked-off item text colour */
```

---

## Typography

- **Font:** System font stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
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
- Button border-radius: 10px
- Small element border-radius (tags, pills): 6px

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

## Empty states

- Centred in the available space
- Icon (simple SVG or emoji): 40px
- Heading: 17px, weight 600
- Subtext: 14px, `--ink-muted`
- CTA button below

---

## General rules

- No drop shadows anywhere (use borders instead)
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
