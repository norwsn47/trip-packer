# BUILDPLAN.md — Scotland Trip Packer

Each chunk is built and tested independently before moving to the next.
No chunk depends on unverified work from a previous one.

---

## Chunk 1 — Project scaffold & data layer ✅

**What:** Empty app shell with data storage wired up.

- Vanilla HTML/CSS/JS, no framework, no build tools
- Data schema for master items and checkbox state
- localStorage read/write helpers
- Mobile-first CSS reset and layout shell, CSS tokens from DESIGN.md

**Data schema:**

```json
// Master item
{
  "id": "uuid",
  "name": "Tent",
  "category": "Sleep",
  "note": "",
  "tripTypes": ["winter-hiking-multi", "summer-hiking-multi", "cycle-camping"],
  "optional": false
}

// Checkbox state (separate key)
{ "item-id-abc": true, "item-id-def": true }
```

**Done:** Data persists across page refreshes. ✅

---

## Chunk 2 — Master item list (in progress)

**What:** The single app screen — a filterable, tickable master packing list with item management.

- List view of all master items, grouped by category in fixed order (16 categories)
- Seed data on first load (real master items from CSV)
- Filter bar — "All" + 5 trip type chips, horizontally scrollable
- Circular checkbox on each item row (hero action, left side, 44px tap target)
- Checked items visually de-emphasised; state persists in localStorage
- "Clear all ticks" button in header with inline confirmation (no `alert()`)
- Add new item: name, category (select from 16), trip type checkboxes
- Edit existing item (same form, pre-populated, opened as bottom-sheet dialog)
- Delete item with confirmation
- Empty state for first-time use

**Done when:** All interactions work on mobile, filter correctly limits items, ticks persist on refresh.

---

## Chunk 3 — Export / import

**What:** Backup and restore the master item list as JSON.

- Export button: downloads master items as a `.json` file
- Import button: upload a `.json` file to restore items
- Warn before overwriting existing data
- Validate the imported file format before applying

**Done when:** Master list can be exported, cleared, and restored from the exported file without data loss.

---

## Chunk 4 — Polish & mobile UX

**What:** Final pass on usability, layout, and feel on a phone.

- Test all flows on a real phone browser
- Fix any tap target sizing, spacing, or scroll issues
- Confirm no data loss edge cases (e.g. closing mid-edit)
- Pre-launch checklist

**Done when:** All flows work smoothly on a phone. Pre-launch checklist passes.

---

## Build order

```
Chunk 1 (data layer) ✅
  └─ Chunk 2 (master list — filter, tick, manage)
       └─ Chunk 3 (export/import)
            └─ Chunk 4 (polish)
```

Each chunk is a safe commit point.

---

## Trip type reference

| Display name | Code key |
|---|---|
| Winter hiking — single day | `winter-hiking-single` |
| Winter hiking — multi day | `winter-hiking-multi` |
| Summer hiking — single day | `summer-hiking-single` |
| Summer hiking — multi day | `summer-hiking-multi` |
| Cycle camping | `cycle-camping` |

---

*Version 2 · Simplified scope — removed trip builder, checklist, and history chunks*
