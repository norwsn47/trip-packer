# PRD.md — Scotland Trip Packer

## Overview

A personal, single-user packing list app for planning trips from Scotland.
No login, no accounts — a mobile-first tool for filtering and ticking off gear
based on trip type.

---

## The problem

Packing lists currently live as duplicated notes on a phone. Every trip means
copying a previous note and manually adapting it — adding winter gear, removing
summer stuff, remembering the bike kit. The same decisions get made over and over
with no system behind them.

---

## Goals

- Maintain a **master list** of all possible packing items, grouped by category
- Assign each item to one or more **trip types**
- Filter the list by trip type to see only what's relevant
- Tick items off as you pack — clear ticks when you're home
- Add, edit, and delete items over time

---

## Users

Just you. No auth, no accounts, no sharing. Personal tool, mobile-first.

---

## Trip types (fixed set)

| # | Trip type |
|---|---|
| 1 | Winter hiking — single day |
| 2 | Winter hiking — multi day |
| 3 | Summer hiking — single day |
| 4 | Summer hiking — multi day |
| 5 | Cycle camping (always multi-day) |

Items can belong to multiple trip types. For example:
- A base layer appears on all winter trips (1 + 2)
- A tent appears on multi-day trips only (2 + 4 + 5)
- Bike repair kit appears on cycle camping only (5)

---

## Core features

### 1. Filterable master list
- View all packing items grouped by category (14 fixed categories in a fixed order)
- Filter by trip type to see only relevant items
- "All" filter shows everything

**Category structure (fixed order):**

| # | Category | Notes |
|---|---|---|
| 1 | Base Layers | |
| 2 | Mid Layers | |
| 3 | Outer Layers | |
| 4 | Gloves | |
| 5 | Footwear | |
| 6 | Clothing (non-walking) | |
| 7 | First Aid | Includes compass |
| 8 | Cycle Kit | |
| 9 | Electronics | Formerly "Electronics / Lighting" |
| 10 | Toiletries | |
| 11 | Sleep | Includes AirPods / ear plugs |
| 12 | Cooking | Includes food items (salt & pepper, olive oil) and lighter |
| 13 | Essentials | |
| 14 | Optional | Items flagged optional appear on all trip types |

Navigation and Food & Condiments were removed as standalone categories. Their items were merged into First Aid and Cooking respectively.

### 2. Tick items off
- Circular checkbox on each item — tap to tick as you pack
- Checked items visually de-emphasised (muted text)
- "Clear all" button resets all ticks at once (with inline confirmation)
- Tick state persists across sessions via localStorage

### 3. Item management
- Add new items: name, category, trip type assignment
- Edit existing items (same form, pre-populated)
- Delete items (with confirmation)
- Empty state for first-time use

---

## Data storage

- **Browser storage (localStorage)** — no server, no hosting costs, no backend needed
- Data lives on the device; fast and simple
- **Export / import as JSON** — backup and restore the master list if you clear
  the browser or switch devices

---

## Platform

- **Mobile-first** — designed primarily for phone use
- Should work fine on desktop too, but phone layout takes priority
- Hosted on GitHub Pages — open in browser, no install required

---

## Out of scope

- Trip history / saved trips
- One-off items per trip
- User accounts or login
- Sync between devices (export/import covers it)
- Weather API integration
- Native app / PWA install prompt

---

## The core loop

1. Select a trip type filter
2. See relevant items for that trip
3. Tick items as you pack
4. Clear ticks when you're home

---

## Success metrics (personal)

- Stop duplicating notes on your phone
- Building a packing list for a new trip takes under 2 minutes
- Don't forget gear — the trip type filter surfaces it automatically

---

*Version 4 · Category structure finalised — 14 categories, Navigation and Food & Condiments removed*
