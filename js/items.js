'use strict';

const Items = (function () {
  function getAll() {
    return Storage.getItems().map(function (item) {
      return Object.assign({ category: '', optional: false, userAdded: false }, item);
    });
  }

  function add(name, category, tripTypes, note, optional) {
    const all = getAll();
    all.push(Schema.createItem(name, category, tripTypes, note, optional, true));
    Storage.saveItems(all);
  }

  function update(id, name, category, tripTypes, note, optional) {
    const all = getAll().map(function (item) {
      return item.id === id
        ? { id: item.id, name: name, category: category, note: note || '', tripTypes: tripTypes, optional: optional || false, userAdded: item.userAdded || false }
        : item;
    });
    Storage.saveItems(all);
  }

  function remove(id) {
    Storage.saveItems(getAll().filter(function (item) {
      return item.id !== id;
    }));
  }

  return { getAll, add, update, remove };
})();
