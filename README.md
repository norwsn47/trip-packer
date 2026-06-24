# trip-packer

A personal packing list app for trips from Scotland. Mobile-first, no login, no backend.

## What it does

One screen. Filter your master packing list by trip type, tick items as you pack, clear the ticks when you're home.

- 16 item categories in a fixed packing order
- 5 trip types: winter hiking (single/multi day), summer hiking (single/multi day), cycle camping
- Each item is assigned to one or more trip types — filter to see only what's relevant
- Circular checkboxes, persisted in localStorage across sessions
- Add, edit, and delete items from the master list

## Tech

Vanilla HTML, CSS, and JS. No framework, no build step. Hosted on GitHub Pages.

## Local dev

```
python3 -m http.server 8080
```

Open `http://localhost:8080`.
