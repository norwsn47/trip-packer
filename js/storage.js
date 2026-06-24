'use strict';

const Storage = (function () {
  const KEYS = {
    ITEMS: 'packlist_items',
    TRIPS: 'packlist_trips',
  };

  function _read(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  function _write(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getItems() { return _read(KEYS.ITEMS); }
  function saveItems(items) { _write(KEYS.ITEMS, items); }
  function getTrips() { return _read(KEYS.TRIPS); }
  function saveTrips(trips) { _write(KEYS.TRIPS, trips); }

  return { getItems, saveItems, getTrips, saveTrips };
})();

const Schema = (function () {
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function createItem(name, tripTypes, note) {
    return {
      id: generateId(),
      name: name,
      note: note || '',
      tripTypes: tripTypes,
    };
  }

  function createTrip(name, tripType, date) {
    return {
      id: generateId(),
      name: name,
      date: date || '',
      tripType: tripType,
      items: [],
    };
  }

  function createTripItem(itemId, name, oneOff) {
    return {
      itemId: oneOff ? null : itemId,
      name: name,
      checked: false,
      oneOff: oneOff || false,
    };
  }

  return { generateId, createItem, createTrip, createTripItem };
})();
