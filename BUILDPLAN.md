# BUILDPLAN.md — Scotland Trip Packer

Each chunk is built and tested independently before moving to the next.
No chunk depends on unverified work from a previous one.

---

## Chunk 1 — Project scaffold & data layer

**What:** Empty app shell with data storage wired up. No UI features yet.

- Set up project (vanilla HTML/CSS/JS or lightweight framework — TBD in Phase 02)
- Define the data schema for items and trips (see below)
- Wire up localStorage read/write helpers
- Verify data persists across page refreshes
- Set up basic mobile-first CSS reset and layout shell

**Data schema:**

```json
// Master item
{
  "id": "uuid",
  "name": "Tent",
  "note": "2-person, 3-season",
  "tripTypes": ["winter-hiking-multi", "summer-hiking-multi", "cycle-camping"]
}

// Trip
{
  "id": "uuid",
  "name": "Cairngorms April",
  "date": "2025-04-12",
  "tripType": "summer-hiking-multi",
  "items": [
    { "itemId": "uuid", "name": "Tent", "checked": false, "oneOff": false },
    { "itemId": null, "name": "Birthday cake", "checked": false, "oneOff": true }
  ]
}
```

**Done when:** Data can be written and read from localStorage without errors.

---

## Chunk 2 — Master item list (manage items)

**What:** Screen to view, add, edit, and delete items from the master list.

- List view of all master items
- Each item shows its name, optional note, and which trip types it belongs to
- Add new item form: name, note (optional), trip type checkboxes (select one or more)
- Edit existing item (same form, pre-populated)
- Delete item (with confirmation)
- Empty state ("No items yet — add your first item")

**Done when:** Items can be created, edited, deleted, and correctly saved to localStorage.

---

## Chunk 3 — Trip builder

**What:** Create a new trip by selecting a trip type and generating a packing list.

- "New trip" screen: enter trip name, date (optional), select trip type
- On confirm: pull all master items assigned to that trip type
- Generate a trip-specific copy of those items (editing the trip list never affects master)
- Allow adding one-off items to this trip only
- Allow removing items from this trip's list

**Done when:** A trip is created, its list is generated correctly from master items, and one-offs can be added/removed.

---

## Chunk 4 — Trip checklist

**What:** The packing checklist view for an active trip.

- List all items for the trip, with a checkbox per item
- Tap to check/uncheck — state persists
- Progress indicator: "X / Y packed"
- Visual distinction between checked and unchecked items
- Checked items move to bottom (or are visually de-emphasised)

**Done when:** Items can be checked off, progress updates correctly, and state persists on refresh.

---

## Chunk 5 — Trip history

**What:** View and revisit past trips.

- List of saved trips (name, date, trip type)
- Tap a trip to view its final item list (read-only)
- Delete a past trip
- Empty state ("No trips yet")

**Done when:** Past trips are listed, viewable, and deletable.

---

## Chunk 6 — Export / import

**What:** Backup and restore the master item list as JSON.

- Export button: downloads master items as a `.json` file
- Import button: upload a `.json` file to restore or merge items
- Warn before overwriting existing data
- Validate the imported file format before applying

**Done when:** Master list can be exported, cleared, and restored from the exported file without data loss.

---

## Chunk 7 — Polish & mobile UX

**What:** Final pass on usability, layout, and feel on a phone.

- Test all flows on a real phone browser
- Fix any tap target sizing, spacing, or scroll issues
- Add loading/empty states everywhere they're missing
- Confirm no data loss edge cases (e.g. closing mid-edit)
- Pre-launch checklist (see Phase 04 step 4.5)

**Done when:** All flows work smoothly on a phone. Pre-launch checklist passes.

---

## Build order rationale

```
Chunk 1 (data layer)
  └─ Chunk 2 (manage items)
       └─ Chunk 3 (trip builder — needs items to exist)
            └─ Chunk 4 (checklist — needs trips to exist)
                 └─ Chunk 5 (history — needs completed trips)
                      └─ Chunk 6 (export/import — needs full data model)
                           └─ Chunk 7 (polish — needs everything built)
```

Each chunk is a safe commit point. If something breaks, roll back to the last green chunk.

---

## Trip type reference (for consistent naming in code)

| Display name | Code key |
|---|---|
| Winter hiking — single day | `winter-hiking-single` |
| Winter hiking — multi day | `winter-hiking-multi` |
| Summer hiking — single day | `summer-hiking-single` |
| Summer hiking — multi day | `summer-hiking-multi` |
| Cycle camping | `cycle-camping` |

---

*Version 1 · Created after PRD sign-off*
