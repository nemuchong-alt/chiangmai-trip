const TABLES = {
  tripItems: 'trip_items',
  prepTodos: 'prep_todos',
};

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error('请求太大'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (_) {
        reject(new Error('请求 JSON 格式不正确'));
      }
    });
    req.on('error', reject);
  });
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`后端环境变量 ${name} 还没设置`);
  return value;
}

function normalizeText(value) {
  return String(value || '').trim();
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || '').trim());
}

function optionalJson(value) {
  if (value === undefined || value === null) return null;
  return value;
}

function requireEditPassword(req) {
  const expected = requiredEnv('TRIP_EDIT_PASSWORD');
  const provided = String(req.headers['x-trip-edit-password'] || '').trim();
  if (!provided || provided !== expected) {
    const error = new Error('编辑密码不正确或缺失');
    error.statusCode = 401;
    throw error;
  }
}

function supabaseBaseUrl() {
  return requiredEnv('SUPABASE_URL').replace(/\/$/, '');
}

async function supabaseRest(path, options = {}) {
  const serviceKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  const response = await fetch(`${supabaseBaseUrl()}/rest/v1/${path}`, {
    method: options.method || 'GET',
    headers: {
      apikey: serviceKey,
      authorization: `Bearer ${serviceKey}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch (_) {
      data = raw;
    }
  }

  if (!response.ok) {
    const error = new Error(data?.message || data?.error || response.statusText || 'Supabase 请求失败');
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

function sanitizeTripRow(raw = {}) {
  const row = {
    date_key: normalizeText(raw.date_key),
    time_text: normalizeText(raw.time_text) || null,
    title: normalizeText(raw.title),
    category: normalizeText(raw.category) || 'info',
    description_text: normalizeText(raw.description_text) || null,
    tips: optionalJson(raw.tips),
    dist: optionalJson(raw.dist),
  };
  if (isUuid(raw.id)) row.id = raw.id;
  if (!row.date_key || !row.title) throw new Error('安排缺少日期或标题');
  return row;
}

function sanitizePrepRow(raw = {}) {
  const category = raw.category === 'toBuy' ? 'toBuy' : 'toBring';
  const row = {
    category,
    title: normalizeText(raw.title),
    note: normalizeText(raw.note),
    done: Boolean(raw.done),
    sort_order: Number.isFinite(Number(raw.sort_order)) ? Number(raw.sort_order) : 0,
  };
  if (isUuid(raw.id)) row.id = raw.id;
  if (!row.title) throw new Error('行前准备缺少标题');
  return row;
}

function sanitizeTripValues(values = {}) {
  const allowed = {};
  if ('date_key' in values) allowed.date_key = normalizeText(values.date_key);
  if ('time_text' in values) allowed.time_text = normalizeText(values.time_text) || null;
  if ('title' in values) allowed.title = normalizeText(values.title);
  if ('category' in values) allowed.category = normalizeText(values.category) || 'info';
  if ('description_text' in values) allowed.description_text = normalizeText(values.description_text) || null;
  if ('tips' in values) allowed.tips = optionalJson(values.tips);
  if ('dist' in values) allowed.dist = optionalJson(values.dist);
  return allowed;
}

function sanitizePrepValues(values = {}) {
  const allowed = {};
  if ('category' in values) allowed.category = values.category === 'toBuy' ? 'toBuy' : 'toBring';
  if ('title' in values) allowed.title = normalizeText(values.title);
  if ('note' in values) allowed.note = normalizeText(values.note);
  if ('done' in values) allowed.done = Boolean(values.done);
  if ('sort_order' in values) allowed.sort_order = Number.isFinite(Number(values.sort_order)) ? Number(values.sort_order) : 0;
  return allowed;
}

function tripSignature(row) {
  return [
    row.date_key || '',
    row.time_text || '',
    row.title || '',
    row.category || '',
    row.description_text || '',
    JSON.stringify(row.tips || []),
  ].join('||').toLowerCase();
}

function prepSignature(row) {
  return [
    row.category || '',
    row.title || '',
    row.note || '',
  ].join('||').toLowerCase();
}

async function loadData() {
  const [tripItems, prepTodos] = await Promise.all([
    supabaseRest(`${TABLES.tripItems}?select=*`),
    supabaseRest(`${TABLES.prepTodos}?select=*`),
  ]);

  const sortedTripItems = (tripItems || []).sort((a, b) =>
    String(a.date_key || '').localeCompare(String(b.date_key || '')) ||
    String(a.time_text || '').localeCompare(String(b.time_text || '')) ||
    String(a.created_at || '').localeCompare(String(b.created_at || ''))
  );
  const sortedPrepTodos = (prepTodos || []).sort((a, b) =>
    String(a.category || '').localeCompare(String(b.category || '')) ||
    Number(a.sort_order || 0) - Number(b.sort_order || 0) ||
    String(a.created_at || '').localeCompare(String(b.created_at || ''))
  );

  return {
    tripItems: sortedTripItems,
    prepTodos: sortedPrepTodos,
  };
}

async function insertRow(tableName, row) {
  const data = await supabaseRest(tableName, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: [row],
  });
  return data?.[0] || null;
}

async function updateRow(tableName, id, values) {
  if (!isUuid(id)) throw new Error('更新缺少有效 id');
  const data = await supabaseRest(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: values,
  });
  return data?.[0] || null;
}

async function deleteRow(tableName, id) {
  if (!isUuid(id)) throw new Error('删除缺少有效 id');
  await supabaseRest(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

async function upsertRows(tableName, rows) {
  if (rows.length === 0) return [];
  return supabaseRest(`${tableName}?on_conflict=id`, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: rows,
  });
}

async function mergeRows(tableName, incomingRows, sanitizeRow, signatureFn, existingRows) {
  const sanitizedRows = (incomingRows || []).map(sanitizeRow);
  const existingSignatures = new Set((existingRows || []).map(signatureFn));
  const rowsWithIds = sanitizedRows.filter(row => row.id);
  const rowsWithoutIds = sanitizedRows.filter(row => !row.id && !existingSignatures.has(signatureFn(row)));
  const [upsertedRows, insertedRows] = await Promise.all([
    upsertRows(tableName, rowsWithIds),
    rowsWithoutIds.length ? supabaseRest(tableName, {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: rowsWithoutIds,
    }) : [],
  ]);
  return [...(upsertedRows || []), ...(insertedRows || [])];
}

async function handleMutation(req, action, payload = {}) {
  requireEditPassword(req);

  switch (action) {
    case 'checkEditPassword':
      return { ok: true };
    case 'insertTripItem':
      return { row: await insertRow(TABLES.tripItems, sanitizeTripRow(payload.row)) };
    case 'updateTripItem':
      return { row: await updateRow(TABLES.tripItems, payload.id, sanitizeTripValues(payload.values)) };
    case 'deleteTripItem':
      await deleteRow(TABLES.tripItems, payload.id);
      return { ok: true };
    case 'insertPrepTodo':
      return { row: await insertRow(TABLES.prepTodos, sanitizePrepRow(payload.row)) };
    case 'updatePrepTodo':
      return { row: await updateRow(TABLES.prepTodos, payload.id, sanitizePrepValues(payload.values)) };
    case 'deletePrepTodo':
      await deleteRow(TABLES.prepTodos, payload.id);
      return { ok: true };
    case 'reorderPrepTodos': {
      const updates = payload.updates || [];
      const rows = await Promise.all(updates.map(update =>
        updateRow(TABLES.prepTodos, update.id, { sort_order: Number(update.sort_order) || 0 })
      ));
      return { rows };
    }
    case 'mergeCurrentState': {
      const current = await loadData();
      const [tripRows, prepRows] = await Promise.all([
        mergeRows(TABLES.tripItems, payload.tripRows, sanitizeTripRow, tripSignature, current.tripItems),
        mergeRows(TABLES.prepTodos, payload.prepRows, sanitizePrepRow, prepSignature, current.prepTodos),
      ]);
      return { tripRows, prepRows };
    }
    default:
      throw new Error(`未知操作：${action || 'empty'}`);
  }
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      sendJson(res, 200, await loadData());
      return;
    }

    if (req.method === 'POST') {
      const body = await readRequestBody(req);
      sendJson(res, 200, await handleMutation(req, body.action, body.payload || {}));
      return;
    }

    sendJson(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      error: error.message || '后端请求失败',
      details: error.details || null,
    });
  }
};
