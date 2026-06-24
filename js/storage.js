'use strict';

const Storage = (function () {
  const KEYS = {
    ITEMS:        'packlist_items',
    ITEM_CHECKS:  'packlist_item_checks',
    SEED_VERSION: 'packlist_seed_version',
  };

  const CURRENT_SEED_VERSION = 2;

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

  function getItems()              { return _read(KEYS.ITEMS); }
  function saveItems(items)        { _write(KEYS.ITEMS, items); }
  function getItemChecks()         {
    try {
      const raw = localStorage.getItem(KEYS.ITEM_CHECKS);
      return raw ? JSON.parse(raw) : {};
    } catch (_) { return {}; }
  }
  function saveItemChecks(checks)  { _write(KEYS.ITEM_CHECKS, checks); }

  function seedIfNeeded() {
    var storedVersion;
    try {
      var v = localStorage.getItem(KEYS.SEED_VERSION);
      storedVersion = v ? parseInt(v, 10) : 0;
    } catch (_) {
      storedVersion = 0;
    }
    if (storedVersion >= CURRENT_SEED_VERSION) return;

    var userItems = getItems().filter(function (item) { return item.userAdded === true; });

    var W    = ['winter-hiking-single', 'winter-hiking-multi'];
    var WSSH = ['winter-hiking-single', 'winter-hiking-multi', 'summer-hiking-single', 'summer-hiking-multi'];
    var WSMC = ['winter-hiking-single', 'winter-hiking-multi', 'summer-hiking-multi', 'cycle-camping'];
    var WSM  = ['winter-hiking-single', 'winter-hiking-multi', 'summer-hiking-multi'];
    var ALL  = ['winter-hiking-single', 'winter-hiking-multi', 'summer-hiking-single', 'summer-hiking-multi', 'cycle-camping'];
    var SMC  = ['summer-hiking-single', 'summer-hiking-multi', 'cycle-camping'];
    var SM   = ['summer-hiking-single', 'summer-hiking-multi'];
    var SMO  = ['summer-hiking-multi'];
    var SMCY = ['summer-hiking-multi', 'cycle-camping'];
    var CY   = ['cycle-camping'];

    var data = [
      // Base Layers
      { name: 'Merino top',                              category: 'Base Layers',          tripTypes: ALL,  note: '', optional: false },
      { name: 'Thermal leggings',                        category: 'Base Layers',          tripTypes: W,    note: '', optional: false },
      // Mid Layers
      { name: 'Mountain Equipment thin midlayer',        category: 'Mid Layers',           tripTypes: ALL,  note: '', optional: false },
      { name: 'Fleece or synthetic insulated jacket',    category: 'Mid Layers',           tripTypes: SMCY, note: '', optional: false },
      { name: 'Puffer jacket',                           category: 'Mid Layers',           tripTypes: WSMC, note: '', optional: false },
      // Outer Layers
      { name: 'Waterproof jacket (GORE-TEX or similar)', category: 'Outer Layers',         tripTypes: W,    note: '', optional: false },
      { name: 'Light rain jacket',                       category: 'Outer Layers',         tripTypes: SMC,  note: '', optional: false },
      { name: 'Waterproof trousers',                     category: 'Outer Layers',         tripTypes: ALL,  note: '', optional: false },
      { name: 'Windproof hat/beanie',                    category: 'Outer Layers',         tripTypes: W,    note: '', optional: false },
      { name: 'Buff/neck gaiter',                        category: 'Outer Layers',         tripTypes: W,    note: '', optional: false },
      // Gloves
      { name: 'Thin liner gloves',                       category: 'Gloves',               tripTypes: W,    note: '', optional: false },
      { name: 'Insulated waterproof gloves',             category: 'Gloves',               tripTypes: W,    note: '', optional: false },
      { name: 'Craighoppers windproof gloves',           category: 'Gloves',               tripTypes: W,    note: '', optional: false },
      // Footwear
      { name: 'Waterproof hiking boots',                 category: 'Footwear',             tripTypes: WSSH, note: '', optional: false },
      { name: 'Warm wicking socks',                      category: 'Footwear',             tripTypes: ALL,  note: '', optional: false },
      { name: 'Spare socks',                             category: 'Footwear',             tripTypes: ALL,  note: '', optional: false },
      { name: 'Gaiters',                                 category: 'Footwear',             tripTypes: WSM,  note: '', optional: false },
      { name: 'Crampons or micro spikes',                category: 'Footwear',             tripTypes: W,    note: '', optional: false },
      { name: 'Ice axe',                                 category: 'Footwear',             tripTypes: W,    note: '', optional: false },
      // Clothing (non-walking)
      { name: 'Active wicking t-shirt',                  category: 'Clothing (non-walking)', tripTypes: ALL,  note: '', optional: false },
      { name: 'Camp t-shirt (non-walking)',              category: 'Clothing (non-walking)', tripTypes: WSMC, note: '', optional: false },
      { name: 'Spare pants (underwear)',                 category: 'Clothing (non-walking)', tripTypes: WSMC, note: '', optional: false },
      { name: 'Spare socks',                             category: 'Clothing (non-walking)', tripTypes: WSMC, note: '', optional: false },
      { name: 'Sliders/camp shoes',                      category: 'Clothing (non-walking)', tripTypes: WSMC, note: '', optional: false },
      { name: 'Sun hat',                                 category: 'Clothing (non-walking)', tripTypes: SM,   note: '', optional: false },
      { name: 'Sunglasses',                              category: 'Clothing (non-walking)', tripTypes: SM,   note: '', optional: false },
      // First Aid
      { name: 'First aid kit',                           category: 'First Aid',            tripTypes: WSSH, note: '', optional: false },
      { name: 'Emergency foil blanket',                  category: 'First Aid',            tripTypes: W,    note: '', optional: false },
      { name: 'Compass',                                 category: 'First Aid',            tripTypes: WSMC, note: '', optional: false },
      // Cycle Kit
      { name: 'Spare inner tube',                        category: 'Cycle Kit',            tripTypes: CY,   note: '', optional: false },
      { name: 'Pump',                                    category: 'Cycle Kit',            tripTypes: CY,   note: '', optional: false },
      { name: 'Bike lock',                               category: 'Cycle Kit',            tripTypes: CY,   note: '', optional: false },
      // Electronics
      { name: 'Headlamp',                                category: 'Electronics',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Spare batteries / charging cable',        category: 'Electronics',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Power bank',                              category: 'Electronics',           tripTypes: WSMC, note: '', optional: false },
      // Toiletries
      { name: 'Toothbrush & toothpaste',                category: 'Toiletries',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Face wipes',                              category: 'Toiletries',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Toilet roll',                             category: 'Toiletries',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Microfibre towel',                        category: 'Toiletries',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Shampoo',                                 category: 'Toiletries',           tripTypes: WSMC, note: '', optional: false },
      // Sleep
      { name: 'Tent',                                    category: 'Sleep',                tripTypes: WSMC, note: '', optional: false },
      { name: 'Sleeping bag',                            category: 'Sleep',                tripTypes: WSMC, note: '', optional: false },
      { name: 'Sleeping mat',                            category: 'Sleep',                tripTypes: WSMC, note: '', optional: false },
      { name: 'Sleep mask',                              category: 'Sleep',                tripTypes: SMO,  note: '', optional: false },
      { name: 'Pillow',                                  category: 'Sleep',                tripTypes: WSMC, note: '', optional: false },
      { name: 'AirPods / ear plugs',                     category: 'Sleep',                tripTypes: WSMC, note: '', optional: false },
      // Cooking
      { name: 'Cooking set (stove & pots)',              category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      { name: 'Gas fuel canister',                       category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      { name: 'Crockery & plate set',                    category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      { name: 'Knife',                                   category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      { name: 'Lighter',                                 category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      { name: 'Salt & pepper',                           category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      { name: 'Olive oil',                               category: 'Cooking',              tripTypes: WSMC, note: '', optional: false },
      // Essentials
      { name: 'Bin bags',                                category: 'Essentials',           tripTypes: WSMC, note: '', optional: false },
      { name: 'Sun cream',                               category: 'Essentials',           tripTypes: SM,   note: '', optional: false },
      { name: 'Midge net',                               category: 'Essentials',           tripTypes: SMO,  note: '', optional: false },
      // Optional
      { name: 'Disposable BBQ',                          category: 'Optional',             tripTypes: ALL,  note: '', optional: true  },
      { name: 'Coals',                                   category: 'Optional',             tripTypes: ALL,  note: '', optional: true  },
    ];

    var seedItems = data.map(function (d) {
      return Schema.createItem(d.name, d.category, d.tripTypes, d.note, d.optional);
    });

    saveItems(seedItems.concat(userItems));

    try {
      localStorage.setItem(KEYS.SEED_VERSION, String(CURRENT_SEED_VERSION));
    } catch (_) {}
  }

  return { getItems, saveItems, getItemChecks, saveItemChecks, seedIfNeeded };
})();

const Schema = (function () {
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function createItem(name, category, tripTypes, note, optional, userAdded) {
    return {
      id:        generateId(),
      name:      name,
      category:  category  || '',
      note:      note      || '',
      tripTypes: tripTypes,
      optional:  optional  || false,
      userAdded: userAdded || false,
    };
  }

  return { generateId, createItem };
})();
