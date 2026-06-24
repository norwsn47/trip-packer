'use strict';

const TRIP_TYPES = [
  { key: 'winter-hiking-single', label: 'Winter hiking — single day' },
  { key: 'winter-hiking-multi',  label: 'Winter hiking — multi day'  },
  { key: 'summer-hiking-single', label: 'Summer hiking — single day' },
  { key: 'summer-hiking-multi',  label: 'Summer hiking — multi day'  },
  { key: 'cycle-camping',        label: 'Cycle camping'              },
];

const FILTER_LABELS = {
  'all':                  'All',
  'winter-hiking-single': 'Winter (single)',
  'winter-hiking-multi':  'Winter (multi)',
  'summer-hiking-single': 'Summer (single)',
  'summer-hiking-multi':  'Summer (multi)',
  'cycle-camping':        'Cycle camping',
};

const CATEGORIES = [
  'Base Layers', 'Mid Layers', 'Outer Layers', 'Gloves', 'Footwear',
  'Clothing (non-walking)', 'First Aid', 'Cycle Kit',
  'Electronics', 'Toiletries', 'Sleep', 'Cooking',
  'Essentials', 'Optional',
];

var activeFilter = 'all';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', function () {
  Storage.seedIfNeeded();
  showItemsScreen();
  bindDialogEvents();
});

// ── Items screen ─────────────────────────────────────────────────────────────

function showItemsScreen() {
  const items = Items.getAll();
  document.getElementById('screen').innerHTML =
    items.length === 0 ? renderEmptyState() : renderItemList(items);
  bindScreenEvents();
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <div class="empty-icon" aria-hidden="true">🎒</div>
      <h2 class="empty-heading">No items yet</h2>
      <p class="empty-subtext">Add your first packing item to get started</p>
      <button class="btn btn-primary" id="btn-add-first">Add item</button>
    </div>
  `;
}

function renderItemList(items) {
  const checks  = Storage.getItemChecks();
  const filtered = activeFilter === 'all'
    ? items
    : items.filter(function (item) { return item.tripTypes.indexOf(activeFilter) !== -1; });

  const grouped = {};
  filtered.forEach(function (item) {
    const key = CATEGORIES.indexOf(item.category) !== -1 ? item.category : '__other__';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const sections = CATEGORIES
    .filter(function (cat) { return grouped[cat] && grouped[cat].length > 0; })
    .map(function (cat) { return { label: cat, items: grouped[cat] }; });

  if (grouped['__other__'] && grouped['__other__'].length > 0) {
    sections.push({ label: 'Other', items: grouped['__other__'] });
  }

  const hasChecked = items.some(function (i) { return checks[i.id]; });

  return `
    <div class="screen-header">
      <h1 class="screen-title"><span class="wordmark-main">Packlist</span><span class="wordmark-sub"> by Outbuild</span></h1>
      <div class="header-actions">
        <div id="clear-all-area">${hasChecked ? '<button class="btn-clear-all" id="btn-clear-all">Clear all</button>' : ''}</div>
        <button class="btn-icon" id="btn-add" aria-label="Add item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
    ${renderTripFilter()}
    ${sections.length === 0
      ? '<p class="filter-empty">No items for this trip type.</p>'
      : sections.map(function (s) { return renderCategorySection(s, checks); }).join('')
    }
  `;
}

function renderTripFilter() {
  return `
    <div class="filter-row">
      <label class="filter-label" for="trip-filter">Trip type:</label>
      <select class="filter-select" id="trip-filter">
        <option value="all"${activeFilter === 'all' ? ' selected' : ''}>All</option>
        ${TRIP_TYPES.map(function (t) {
          return `<option value="${t.key}"${activeFilter === t.key ? ' selected' : ''}>${escapeHtml(t.label)}</option>`;
        }).join('')}
      </select>
    </div>
  `;
}

function renderCategorySection(section, checks) {
  const count = section.items.length;
  return `
    <div class="category-section">
      <h2 class="category-header">
        ${escapeHtml(section.label)}<span class="category-count"> · ${count} ${count === 1 ? 'item' : 'items'}</span>
      </h2>
      <ul class="item-group" role="list">
        ${section.items.map(function (item) { return renderItemRow(item, checks); }).join('')}
      </ul>
    </div>
  `;
}

function renderItemRow(item, checks) {
  const isChecked  = !!checks[item.id];
  const checkedCls = isChecked ? ' is-checked' : '';
  return `
    <li class="item-row${checkedCls}">
      <button class="item-check" data-id="${escapeHtml(item.id)}"
              aria-pressed="${isChecked}"
              aria-label="${isChecked ? 'Uncheck' : 'Check'} ${escapeHtml(item.name)}">
        <span class="check-circle" aria-hidden="true">
          <svg class="check-icon" width="14" height="14" viewBox="0 0 14 14"
               fill="none" stroke="#fff" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,7 5.5,10.5 12,3.5"/>
          </svg>
        </span>
      </button>
      <div class="item-body">
        <div class="item-name-row">
          <span class="item-name">${escapeHtml(item.name)}</span>
          ${item.optional  ? '<span class="badge-optional">Optional</span>' : ''}
          ${item.userAdded ? '<span class="badge-new">New</span>'           : ''}
        </div>
      </div>
      <button class="item-edit-btn" data-id="${escapeHtml(item.id)}" aria-label="Edit ${escapeHtml(item.name)}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9,6 15,12 9,18"/>
        </svg>
      </button>
    </li>
  `;
}

// ── Screen events (delegation) ────────────────────────────────────────────────

function bindScreenEvents() {
  const addBtn = document.getElementById('btn-add');
  if (addBtn) addBtn.addEventListener('click', function () { openDialog(); });

  const addFirstBtn = document.getElementById('btn-add-first');
  if (addFirstBtn) addFirstBtn.addEventListener('click', function () { openDialog(); });

  document.getElementById('screen').addEventListener('change', function (e) {
    if (e.target.id === 'trip-filter') {
      activeFilter = e.target.value;
      showItemsScreen();
    }
  });

  document.getElementById('screen').addEventListener('click', function (e) {

    const checkBtn = e.target.closest('.item-check');
    if (checkBtn) {
      const id     = checkBtn.dataset.id;
      const checks = Storage.getItemChecks();
      if (checks[id]) {
        delete checks[id];
      } else {
        checks[id] = true;
      }
      Storage.saveItemChecks(checks);

      const isChecked = !!checks[id];
      const row = checkBtn.closest('.item-row');
      checkBtn.setAttribute('aria-pressed', String(isChecked));
      checkBtn.setAttribute('aria-label', (isChecked ? 'Uncheck' : 'Check') + ' ' + row.querySelector('.item-name').textContent);
      row.classList.toggle('is-checked', isChecked);

      syncClearAllButton();
      return;
    }

    const editBtn = e.target.closest('.item-edit-btn');
    if (editBtn) {
      const item = Items.getAll().find(function (i) { return i.id === editBtn.dataset.id; });
      if (item) openDialog(item);
      return;
    }

    if (e.target.id === 'btn-clear-all') {
      document.getElementById('clear-all-area').innerHTML = `
        <span class="clear-confirm">
          Clear all ticks?
          <button class="clear-confirm-btn clear-confirm-btn--yes" id="clear-yes">Yes</button>
          <button class="clear-confirm-btn" id="clear-no">Cancel</button>
        </span>
      `;
      return;
    }

    if (e.target.id === 'clear-yes') {
      Storage.saveItemChecks({});
      showItemsScreen();
      return;
    }

    if (e.target.id === 'clear-no') {
      syncClearAllButton();
      return;
    }
  });
}

function syncClearAllButton() {
  const area = document.getElementById('clear-all-area');
  if (!area) return;
  const checks    = Storage.getItemChecks();
  const hasChecked = Items.getAll().some(function (i) { return checks[i.id]; });
  area.innerHTML   = hasChecked ? '<button class="btn-clear-all" id="btn-clear-all">Clear all</button>' : '';
}

// ── Dialog ───────────────────────────────────────────────────────────────────

function closeDialog() {
  const dialog = document.getElementById('item-dialog');
  dialog.classList.add('is-closing');
  dialog.addEventListener('animationend', function onEnd() {
    dialog.classList.remove('is-closing');
    dialog.close();
    dialog.removeEventListener('animationend', onEnd);
  }, { once: true });
}

function bindDialogEvents() {
  const dialog    = document.getElementById('item-dialog');
  const form      = document.getElementById('item-form');
  const catSelect = document.getElementById('field-category');

  catSelect.addEventListener('change', function () {
    applyOptionalState(form);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name     = form.elements['name'].value.trim();
    const category = form.elements['category'].value;
    const optional = category === 'Optional';
    const tripTypes = optional
      ? TRIP_TYPES.map(function (t) { return t.key; })
      : Array.from(form.querySelectorAll('input[name="tripType"]:checked'))
              .map(function (cb) { return cb.value; });

    if (!name || !category || tripTypes.length === 0) return;

    const editId = form.dataset.editId;
    if (editId) {
      const existing = Items.getAll().find(function (i) { return i.id === editId; });
      const note     = existing ? existing.note || '' : '';
      Items.update(editId, name, category, tripTypes, note, optional);
    } else {
      Items.add(name, category, tripTypes, '', optional);
    }
    closeDialog();
    showItemsScreen();
  });

  document.getElementById('btn-cancel').addEventListener('click', function () {
    closeDialog();
  });

  document.getElementById('btn-delete').addEventListener('click', function () {
    const editId = form.dataset.editId;
    if (!editId) return;
    if (!confirm('Delete this item? This can\'t be undone.')) return;
    Items.remove(editId);
    closeDialog();
    showItemsScreen();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) closeDialog();
  });
}

function applyOptionalState(form) {
  const isOptional = form.elements['category'].value === 'Optional';
  form.querySelectorAll('input[name="tripType"]').forEach(function (cb) {
    cb.checked  = isOptional ? true : cb.checked;
    cb.disabled = isOptional;
  });
  document.getElementById('trip-type-section').style.opacity = isOptional ? '0.45' : '1';
}

function openDialog(item) {
  const dialog    = document.getElementById('item-dialog');
  const form      = document.getElementById('item-form');
  const title     = document.getElementById('dialog-title');
  const deleteBtn = document.getElementById('btn-delete');

  form.reset();
  form.dataset.editId = '';
  form.querySelectorAll('input[name="tripType"]').forEach(function (cb) { cb.disabled = false; });
  document.getElementById('trip-type-section').style.opacity = '1';

  if (item) {
    title.textContent               = 'Edit item';
    form.elements['name'].value     = item.name;
    form.elements['category'].value = item.category || '';
    item.tripTypes.forEach(function (key) {
      const cb = form.querySelector('input[value="' + key + '"]');
      if (cb) cb.checked = true;
    });
    form.dataset.editId = item.id;
    deleteBtn.hidden    = false;
    applyOptionalState(form);
  } else {
    title.textContent = 'Add item';
    deleteBtn.hidden  = true;
  }

  dialog.showModal();
}
