# PRD.md — Scotland Trip Packer

## Overview

A personal, single-user packing list app for planning trips from Scotland.
No login, no accounts — a mobile-first tool for building smart packing lists
based on a fixed set of trip types, with shared items across overlapping categories.

---

## The problem

Packing lists currently live as duplicated notes on a phone. Every trip means
copying a previous note and manually adapting it — adding winter gear, removing
summer stuff, remembering the bike kit. The same decisions get made over and over
with no system behind them.

---

## Goals

- Maintain a **master list** of all possible packing items
- Assign each item to one or more **trip types**
- When planning a trip, select the type and get a suggested list instantly
- Review, adjust, and check off items for that specific trip
- Never start from scratch again

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

No freeform tags — trip types are the fixed dimensions. Custom trip types can be
added later if needed (log in backlog).

---

## Core features

### 1. Master item list
- Add, edit, and delete packing items
- Assign each item to one or more trip types
- Items can have an optional note (e.g. "merino base layer" or "3-season sleeping bag")

### 2. Trip builder
- Tap to select a trip type from the fixed list
- App instantly generates a suggested packing list from all items assigned to that trip type
- Manually add one-off items to a specific trip without touching the master list

### 3. Trip checklist
- Generated list becomes a checklist — tick items off as you pack
- Visual progress indicator (e.g. "14 / 22 packed")
- Remove items from this trip's list without affecting the master list

### 4. Trip history (lightweight)
- Save past trips with a name, date, and final list
- Reference what you took on previous trips ("what did I bring on that Cairngorms trip?")

---

## Data storage

- **Browser storage (localStorage)** — no server, no hosting costs, no backend needed
- Data lives on the device; fast and simple
- **Export / import as JSON** — lets you back up your master list and restore it if
  you clear the browser or switch devices
- No sync between devices (acceptable for personal use — export/import covers it)

---

## Platform

- **Mobile-first** — designed primarily for phone use
- Should work fine on desktop too, but phone layout takes priority
- Web app accessed via browser (no app store, no install required)

---

## Out of scope (v1)

- User accounts or login
- Weather API integration (backlog)
- Native mobile app / PWA install prompt (backlog)
- Sharing or collaboration
- Multiple users

---

## Success metrics (personal)

- Stop duplicating notes on your phone
- Building a packing list for a new trip takes under 2 minutes
- Don't forget gear — the trip type system surfaces it automatically

---

## Open questions resolved

| Question | Decision |
|---|---|
| Tag logic | Fixed trip types, not freeform tags. Items belong to multiple trip types. |
| Cycle camping duration | Always multi-day / overnight |
| Platform priority | Mobile-first |
| Data storage | localStorage + JSON export/import |

---

*Version 2 · Updated after requirements review*
