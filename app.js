const DAYS = [
  { date: 'prep', label: '行前准备', weekday: '' },
  { date: '2026-06-21', label: '6月21日', weekday: '周日' },
  { date: '2026-06-22', label: '6月22日', weekday: '周一' },
  { date: '2026-06-23', label: '6月23日', weekday: '周二' },
  { date: '2026-06-24', label: '6月24日', weekday: '周三' },
  { date: '2026-06-25', label: '6月25日', weekday: '周四' },
  { date: 'pending', label: 'P人待定', weekday: '' },
];

const CATEGORY_MAP = {
  transport: { label: '交通', color: 'var(--teal)', bg: 'var(--teal-light)', tag: 'tag-transport' },
  food: { label: '美食', color: 'var(--yellow)', bg: 'var(--yellow-light)', tag: 'tag-food' },
  market: { label: '市集', color: 'var(--purple)', bg: 'var(--purple-light)', tag: 'tag-market' },
  activity: { label: '运动', color: 'var(--green)', bg: 'var(--green-light)', tag: 'tag-activity' },
  info: { label: '备注', color: '#888', bg: '#f0f0f0', tag: 'tag-info' },
};

const DEFAULT_ITINERARY = {
  '2026-06-21': [
    { time: '10:10', title: 'MU205 上海 → 清迈', category: 'transport', desc: '上海浦东 T1 出发，预计 13:25 抵达清迈国际机场', dist: { bike: 15 }, tips: [
      '出机场换少量泰铢够当天用即可，市区汇率更好',
      'Grab 或 Bolt 打车去古城，约 150-200 铢',
    ]},
    { time: '17:00', title: '周日夜市（Sunday Walking Street）', category: 'market', desc: '17:00 开市，22:00 收摊，周六日规模较大\n塔佩门(Tha Phae Gate) → 帕辛寺(Wat Phra Singh)', dist: { walk: 8, bike: 5 }, tips: [
      '主街 + 两侧寺庙空地的小吃摊',
      '最热闹的传统夜市，手工艺品、小吃、按摩都有',
    ]},
  ],
  '2026-06-22': [],
  '2026-06-23': [
    { time: '08:30', title: 'Teetee Elephant（大象营）', category: 'activity', desc: '集合地点：民宿\nTeetee Elephant 全包：接人 → 大象互动+散步，含交通、导游、午餐、门票', dist: { bike: 50 }, tips: [
      '自备溯溪鞋，涉及到过河+爬山，园内仅提供拖鞋，不允许穿自己的运动鞋',
      '不用担心衣服怕湿之类的，象营会提供宽大轻薄的衣服，最好穿一件短袖在里面',
      '驱蚊水可以带一下，过河以后在山上偶尔会遇到黄蚂蚁爬到身上',
    ]},
    { time: '13:00', title: '蓝庙（Wat Rong Suea Ten）', category: 'activity', desc: '清迈市区南部，距古城约 30 分钟车程\n深蓝色外墙和精细木雕，游览约 30-40 分钟', dist: { bike: 30 }, tips: [
      '着装要求：遮盖肩膀和膝盖（不能穿无袖、短裤/短裙）',
      '室内可拍照，请保持安静',
    ]},
    { time: '14:30', title: '粘粘瀑布（Bua Tha Waterfall）', category: 'activity', desc: '距清迈约 30km，山林公园\n石灰华表面有特殊苔藓而"粘脚"，可攀爬上下，游览约 1-1.5 小时', dist: { bike: 45 }, tips: [
      '穿防滑水鞋或拖鞋（现场可租借），赤脚也可',
      '水温较低，注意浸泡时间',
      '建议带一套换洗衣物',
    ]},
    { time: '16:30', title: '返回民宿（包车送回）', category: 'transport', desc: '包车送回民宿，当日行程结束', dist: { bike: 45 }},
  ],
  '2026-06-24': [
    { time: '19:00', title: 'North Gate Jazz Co-Op', category: 'activity', desc: 'Sri Poom Rd，North Gate 旁（昌普门）\n每晚 19:00-00:00 现场 Jazz，免费入场，消费制', dist: { walk: 12, bike: 8 }, tips: [
      '小卷毛约 21:30 出场，想坐好位子 19:30 前到，也可和老外拼桌',
      '不在乎座位站着听，门口也能听',
    ]},
  ],
  '2026-06-25': [
    { time: '14:55', title: 'MU206 清迈 → 上海', category: 'transport', desc: '清迈国际机场出发，预计 20:00 抵达上海浦东 T1\n⚠️ 建议提前 2.5 小时到机场（国际航班值机+安检）', dist: { bike: 12 }, tips: [
      '建议提前 2.5 小时到机场（国际航班）',
      '清迈机场不大，办理值机后还有时间逛机场小店',
      '带好护照和出境卡',
    ]},
  ],
  pending: [
    { title: '瑜伽课 Early Owls', category: 'activity', tips: [
      '场馆很美，清迈最美的瑜伽馆',
      'Google map上找到官网和联系方式，提前预约',
    ]},
    { title: '瑜伽课 Satva Yoga', category: 'activity', tips: [
      '300泰铢/节',
      'Alignment Yoga，老师非常专业，善用辅具进入体式',
      '练完下来感觉全身被正骨了一番',
      'Google map上找到官网和联系方式，提前预约',
    ]},
    { title: '打枪体验 333 Shooting Range Thaphae', category: 'activity', tips: [
      '在古城内，室内场馆，玩得不够过瘾',
    ]},
    { title: '打枪体验 700Year Shooting Range', category: 'activity', tips: [
      '提前2小时，在美团可购买套餐，套餐可共享',
      '最好在下午3点，价格优惠很多',
    ]},
  ],
};

const DEFAULT_PREP_TODOS = {
  toBring: [
    { title: '护照', note: '', done: false },
    { title: '现金/银行卡', note: '', done: false },
  ],
  toBuy: [
    { title: '泰国电话卡*2', note: '', done: false },
  ],
};

const STORAGE_KEYS = {
  itinerary: 'chiangmai_itinerary',
  prep: 'chiangmai_prep',
  prepRecovered: 'chiangmai_prep_recovered_v1',
  localBackup: 'chiangmai_pre_cloud_backup_v1',
  editorEmail: 'chiangmai_editor_email_v1',
};

const CLOUD_TABLES = {
  tripItems: 'trip_items',
  prepTodos: 'prep_todos',
  editors: 'trip_editors',
};

const CLOUD_POLL_MS = 30000;
const DAY_KEYS = DAYS.filter(day => day.date !== 'prep').map(day => day.date);
const REAL_DAY_KEYS = DAYS.filter(day => day.date !== 'prep' && day.date !== 'pending').map(day => day.date);

const dom = {
  dayTabs: document.getElementById('dayTabs'),
  dayContents: document.getElementById('dayContents'),
  fabAdd: document.getElementById('fabAdd'),
  editOverlay: document.getElementById('editOverlay'),
  editPanel: document.getElementById('editPanel'),
  editPanelTitle: document.getElementById('editPanelTitle'),
  editDay: document.getElementById('editDay'),
  editPrepCatGroup: document.getElementById('editPrepCatGroup'),
  editPrepCat: document.getElementById('editPrepCat'),
  editTime: document.getElementById('editTime'),
  editTitle: document.getElementById('editTitle'),
  editDesc: document.getElementById('editDesc'),
  editTips: document.getElementById('editTips'),
  editWalk: document.getElementById('editWalk'),
  editBike: document.getElementById('editBike'),
  editItemList: document.getElementById('editItemList'),
  itemCount: document.getElementById('item-count'),
  authOverlay: document.getElementById('authOverlay'),
  authPanel: document.getElementById('authPanel'),
  authEmail: document.getElementById('authEmail'),
  btnAuthCancel: document.getElementById('btnAuthCancel'),
  btnAuthSend: document.getElementById('btnAuthSend'),
  moveOverlay: document.getElementById('moveOverlay'),
  movePanel: document.getElementById('movePanel'),
  moveItemTitle: document.getElementById('moveItemTitle'),
  moveDay: document.getElementById('moveDay'),
  moveTime: document.getElementById('moveTime'),
  tipsOverlay: document.getElementById('tipsOverlay'),
  tipsPanel: document.getElementById('tipsPanel'),
  tipsItemTitle: document.getElementById('tipsItemTitle'),
  tipsEditList: document.getElementById('tipsEditList'),
  tipsNewInput: document.getElementById('tipsNewInput'),
  syncPill: document.getElementById('syncPill'),
  syncStatus: document.getElementById('syncStatus'),
  syncDetail: document.getElementById('syncDetail'),
  btnQuickAdd: document.getElementById('btnQuickAdd'),
  btnCloudAuth: document.getElementById('btnCloudAuth'),
  btnCloudRefresh: document.getElementById('btnCloudRefresh'),
  btnCloudUpload: document.getElementById('btnCloudUpload'),
  btnRestoreLocalBackup: document.getElementById('btnRestoreLocalBackup'),
  btnExportData: document.getElementById('btnExportData'),
  importDataInput: document.getElementById('importDataInput'),
};

let itinerary = loadItinerary();
let prepTodos = loadPrepTodos();
let currentEditCat = 'info';
let selectedEditDate = DAYS[0].date;
let activeDay = DAYS[0].date;
let pendingMoveId = null;
let editingTips = { date: null, itemId: null, tips: [] };
let supabaseClient = null;
let cloudPollTimer = null;

const cloudConfig = normalizeCloudConfig(window.TRIP_SUPABASE_CONFIG);
const cloudState = {
  configured: Boolean(cloudConfig.url && cloudConfig.anonKey),
  loading: false,
  saving: false,
  available: false,
  hasRemoteData: false,
  editor: false,
  userEmail: '',
  session: null,
  lastError: '',
  importedUnsynced: false,
  localBackupAvailable: false,
};

migrateLegacyPrepData();
persistLocalCache();

function normalizeCloudConfig(rawConfig) {
  const config = rawConfig && typeof rawConfig === 'object' ? rawConfig : {};
  return {
    url: String(config.url || '').trim(),
    anonKey: String(config.anonKey || '').trim(),
    redirectTo: String(config.redirectTo || '').trim(),
    projectName: String(config.projectName || '清迈行程共享').trim(),
  };
}

function cloneJSON(value) {
  return JSON.parse(JSON.stringify(value));
}

function readStoredLocalBackup() {
  const snapshot = safeParseJSON(localStorage.getItem(STORAGE_KEYS.localBackup));
  if (!snapshot || typeof snapshot !== 'object') return null;
  return snapshot;
}

function writeStoredLocalBackup(snapshot) {
  localStorage.setItem(STORAGE_KEYS.localBackup, JSON.stringify(snapshot));
  cloudState.localBackupAvailable = true;
}

function clearStoredLocalBackup() {
  localStorage.removeItem(STORAGE_KEYS.localBackup);
  cloudState.localBackupAvailable = false;
}

function snapshotHasContent(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return false;
  const tripCount = Object.values(snapshot.itinerary || {}).reduce((total, items) => total + ((items || []).length), 0);
  const prepCount = Object.values(snapshot.prepTodos || {}).reduce((total, items) => total + ((items || []).length), 0);
  return tripCount + prepCount > 0;
}

function canonicalizeSnapshot(snapshot) {
  const tripRows = [];
  DAY_KEYS.forEach(date => {
    const items = Array.isArray(snapshot?.itinerary?.[date]) ? snapshot.itinerary[date] : [];
    items.forEach(item => {
      tripRows.push({
        date,
        time: item.time || '',
        title: item.title || '',
        category: item.category || '',
        desc: item.desc || '',
        tips: [...(item.tips || [])].map(tip => String(tip)).sort(),
        dist: item.dist || null,
      });
    });
  });
  tripRows.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

  const prepRows = [];
  ['toBring', 'toBuy'].forEach(category => {
    const items = Array.isArray(snapshot?.prepTodos?.[category]) ? snapshot.prepTodos[category] : [];
    items.forEach(item => {
      prepRows.push({
        category,
        title: item.title || '',
        note: item.note || '',
        done: Boolean(item.done),
      });
    });
  });
  prepRows.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

  return JSON.stringify({ tripRows, prepRows });
}

function safeParseJSON(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function makeId(prefix = '') {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return `${prefix}${window.crypto.randomUUID()}`;
  }
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function readStoredEditorEmail() {
  return String(localStorage.getItem(STORAGE_KEYS.editorEmail) || '').trim();
}

function writeStoredEditorEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return;
  localStorage.setItem(STORAGE_KEYS.editorEmail, normalized);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || '').trim());
}

function withOptionalUuidId(payload, id) {
  if (!isUuid(id)) return { ...payload };
  return { id, ...payload };
}

function normalizeTips(rawTips) {
  if (!Array.isArray(rawTips)) return undefined;
  const tips = rawTips
    .map(tip => String(tip || '').trim())
    .filter(Boolean);
  return tips.length ? tips : undefined;
}

function normalizeDist(rawDist) {
  if (!rawDist || typeof rawDist !== 'object') return undefined;
  const walkValue = Number(rawDist.walk);
  const bikeValue = Number(rawDist.bike);
  const walk = Number.isFinite(walkValue) && walkValue > 0 ? walkValue : null;
  const bike = Number.isFinite(bikeValue) && bikeValue > 0 ? bikeValue : null;
  if (!walk && !bike) return undefined;
  return { walk, bike };
}

function normalizeTripItem(rawItem = {}) {
  return {
    id: typeof rawItem.id === 'string' && rawItem.id ? rawItem.id : makeId('trip_'),
    time: typeof rawItem.time === 'string' ? rawItem.time : '',
    title: typeof rawItem.title === 'string' ? rawItem.title : '',
    category: CATEGORY_MAP[rawItem.category] ? rawItem.category : 'info',
    desc: typeof rawItem.desc === 'string' ? rawItem.desc : '',
    tips: normalizeTips(rawItem.tips),
    dist: normalizeDist(rawItem.dist),
  };
}

function normalizePrepTodo(rawTodo = {}, fallbackCategory = 'toBring', fallbackOrder = 0) {
  const sortOrderValue = Number(rawTodo.sortOrder);
  return {
    id: typeof rawTodo.id === 'string' && rawTodo.id ? rawTodo.id : makeId('prep_'),
    category: rawTodo.category === 'toBuy' ? 'toBuy' : fallbackCategory,
    title: typeof rawTodo.title === 'string' ? rawTodo.title : '',
    note: typeof rawTodo.note === 'string' ? rawTodo.note : '',
    done: Boolean(rawTodo.done),
    sortOrder: Number.isFinite(sortOrderValue) ? sortOrderValue : fallbackOrder,
  };
}

function createEmptyItinerary() {
  const base = {};
  DAY_KEYS.forEach(date => {
    base[date] = [];
  });
  return base;
}

function createTemplateItinerary() {
  const base = createEmptyItinerary();
  Object.entries(DEFAULT_ITINERARY).forEach(([date, items]) => {
    base[date] = (items || []).map(item => normalizeTripItem(item));
  });
  return base;
}

function createDefaultPrepTodos() {
  return {
    toBring: (DEFAULT_PREP_TODOS.toBring || []).map((todo, index) => normalizePrepTodo(todo, 'toBring', index)),
    toBuy: (DEFAULT_PREP_TODOS.toBuy || []).map((todo, index) => normalizePrepTodo(todo, 'toBuy', index)),
  };
}

function loadItinerary() {
  const base = createTemplateItinerary();
  const saved = safeParseJSON(localStorage.getItem(STORAGE_KEYS.itinerary));
  if (!saved || typeof saved !== 'object') return base;
  Object.keys(saved).forEach(date => {
    if (!DAY_KEYS.includes(date) || !Array.isArray(saved[date])) return;
    base[date] = saved[date].map(item => normalizeTripItem(item));
  });
  return base;
}

function saveItinerary() {
  localStorage.setItem(STORAGE_KEYS.itinerary, JSON.stringify(itinerary));
}

function loadPrepTodos() {
  const saved = safeParseJSON(localStorage.getItem(STORAGE_KEYS.prep));
  if (Array.isArray(saved)) {
    return {
      toBring: saved.map((todo, index) => normalizePrepTodo(todo, 'toBring', index)),
      toBuy: [],
    };
  }
  if (!saved || typeof saved !== 'object') return createDefaultPrepTodos();
  return {
    toBring: (saved.toBring || []).map((todo, index) => normalizePrepTodo(todo, 'toBring', index)),
    toBuy: (saved.toBuy || []).map((todo, index) => normalizePrepTodo(todo, 'toBuy', index)),
  };
}

function savePrepTodos() {
  localStorage.setItem(STORAGE_KEYS.prep, JSON.stringify(prepTodos));
}

function persistLocalCache() {
  saveItinerary();
  savePrepTodos();
}

function migrateLegacyPrepData() {
  if (itinerary.prep && Array.isArray(itinerary.prep) && itinerary.prep.length > 0) {
    itinerary.prep.forEach(item => {
      prepTodos.toBuy.push(normalizePrepTodo({
        title: item.title,
        note: item.note || item.desc || '',
        done: false,
      }, 'toBuy', prepTodos.toBuy.length));
    });
    delete itinerary.prep;
  }

  if (!localStorage.getItem(STORAGE_KEYS.prepRecovered)) {
    const hasBankTodo = (prepTodos.toBring || [])
      .concat(prepTodos.toBuy || [])
      .some(item => (item.title || '').includes('去银行换取20000泰铢'));
    if (!hasBankTodo) {
      prepTodos.toBuy.unshift(normalizePrepTodo({ title: '去银行换取20000泰铢', note: '', done: false }, 'toBuy', 0));
      prepTodos.toBuy = prepTodos.toBuy.map((todo, index) => ({ ...todo, sortOrder: index }));
    }
    localStorage.setItem(STORAGE_KEYS.prepRecovered, '1');
  }

  Object.keys(itinerary).forEach(date => {
    itinerary[date] = (itinerary[date] || []).map(item => normalizeTripItem(item));
  });
  prepTodos.toBring = (prepTodos.toBring || []).map((todo, index) => normalizePrepTodo(todo, 'toBring', index));
  prepTodos.toBuy = (prepTodos.toBuy || []).map((todo, index) => normalizePrepTodo(todo, 'toBuy', index));
}

function hasCloudSession() {
  return Boolean(cloudState.session?.user?.email);
}

function canEditData() {
  if (!cloudState.configured) return true;
  return cloudState.available && hasCloudSession();
}

function updateSyncUI() {
  cloudState.localBackupAvailable = Boolean(readStoredLocalBackup());
  dom.btnQuickAdd.style.display = canEditData() ? '' : 'none';

  if (!cloudState.configured) {
    dom.syncPill.textContent = '本地模式';
    dom.syncPill.className = 'sync-pill';
    dom.syncStatus.textContent = '当前数据只保存在这台设备的浏览器里。';
    dom.syncDetail.textContent = '如果想双人协同，填好 Supabase 配置后，这个页面就会改成共享数据。';
    dom.btnCloudAuth.style.display = 'none';
    dom.btnCloudRefresh.style.display = 'none';
    dom.btnCloudUpload.style.display = 'none';
    dom.btnRestoreLocalBackup.style.display = cloudState.localBackupAvailable ? '' : 'none';
    return;
  }

  dom.btnCloudAuth.style.display = '';
  dom.btnCloudRefresh.style.display = '';
  dom.btnCloudUpload.style.display = canEditData() ? '' : 'none';
  dom.btnRestoreLocalBackup.style.display = cloudState.localBackupAvailable ? '' : 'none';
  dom.btnCloudUpload.textContent = cloudState.hasRemoteData ? '用当前页面覆盖云端' : '上传当前数据到云端';

  if (cloudState.loading) {
    dom.syncPill.textContent = '连接中';
    dom.syncPill.className = 'sync-pill sync-pill-loading';
    dom.syncStatus.textContent = '正在读取共享数据……';
    dom.syncDetail.textContent = '首次接入时，如果数据库表还没建好，这里会提示你先跑 SQL。';
  } else if (!cloudState.available && cloudState.lastError) {
    dom.syncPill.textContent = '连接失败';
    dom.syncPill.className = 'sync-pill sync-pill-warn';
    dom.syncStatus.textContent = '还没成功连上 Supabase。';
    dom.syncDetail.textContent = cloudState.lastError;
  } else if (cloudState.available && hasCloudSession()) {
    dom.syncPill.textContent = cloudState.editor ? '共享可编辑' : '已登录可编辑';
    dom.syncPill.className = 'sync-pill sync-pill-ok';
    dom.syncStatus.textContent = '当前显示的是共享数据，你的新增/删除会写入公开网页。';
    if (cloudState.saving) {
      dom.syncDetail.textContent = '正在同步到 Supabase……';
    } else if (cloudState.localBackupAvailable) {
      dom.syncDetail.textContent = '这台设备之前的本地数据已自动备份。若要并入云端，先点“恢复本机旧备份”，确认后再上传。';
    } else if (cloudState.importedUnsynced) {
      dom.syncDetail.textContent = '你刚导入了本机备份，还没上传到云端；确认无误后点“用当前页面覆盖云端”。';
    } else if (!cloudState.hasRemoteData) {
      dom.syncDetail.textContent = '云端还没有数据。可以先用当前页面内容做一次初始化上传。';
    } else if (!cloudState.editor) {
      dom.syncDetail.textContent = `当前登录邮箱 ${cloudState.userEmail || '已登录邮箱'} 已进入编辑模式。页面先开放编辑入口，真正写入权限仍由 Supabase 校验。`;
    } else {
      dom.syncDetail.textContent = `当前编辑身份：${cloudState.userEmail || '已登录编辑账号'}。可以点“新增安排”或右下角加号继续编辑。`;
    }
  } else if (cloudState.available) {
    dom.syncPill.textContent = '共享只读';
    dom.syncPill.className = 'sync-pill sync-pill-readonly';
    dom.syncStatus.textContent = '当前显示的是共享数据，但这个设备还不能直接编辑。';
    if (cloudState.localBackupAvailable) {
      dom.syncDetail.textContent = '这台设备历史上的本地数据已自动保留。登录后可以点“恢复本机旧备份”，再把它并入云端。';
    } else if (cloudState.userEmail) {
      dom.syncDetail.textContent = `当前登录邮箱 ${cloudState.userEmail} 不在编辑名单里，需用你们的授权邮箱登录。`;
    } else {
      dom.syncDetail.textContent = '公开访客也能看共享数据；想编辑时，点“编辑登录”并用已授权邮箱收 magic link。';
    }
  }

  dom.btnCloudAuth.textContent = cloudState.session ? '退出编辑' : '编辑登录';
}

function render() {
  const canEdit = canEditData();
  dom.dayTabs.innerHTML = '';
  dom.dayContents.innerHTML = '';

  DAYS.forEach(day => {
    const isPrep = day.date === 'prep';
    const items = itinerary[day.date] || [];
    const hasContent = isPrep
      ? ((prepTodos.toBring || []).length + (prepTodos.toBuy || []).length > 0)
      : items.length > 0;

    const tab = document.createElement('div');
    tab.className = 'day-tab' + (day.date === activeDay ? ' active' : '') + (hasContent ? ' has-content' : '');
    tab.textContent = day.date === 'pending'
      ? 'P人待定'
      : (day.date === 'prep' ? '行前准备' : `${day.label.replace('6月', '')} ${day.weekday}`);
    tab.dataset.date = day.date;
    tab.addEventListener('click', () => switchDay(day.date));
    dom.dayTabs.appendChild(tab);

    const section = document.createElement('div');
    section.className = 'day-content' + (day.date === activeDay ? ' active' : '');
    section.id = `day-${day.date}`;
    section.innerHTML = renderDayContent(day, items, canEdit);
    dom.dayContents.appendChild(section);
  });

  dom.fabAdd.style.display = canEdit ? 'flex' : 'none';
  updateItemCount();
  updateEditItemList();
}

function renderDayContent(day, items, canEdit) {
  if (day.date === 'prep') {
    const renderSection = (category, label, color) => {
      const list = prepTodos[category] || [];
      let inner = '';
      if (list.length === 0) {
        inner = '<div style="text-align:center;padding:20px;color:#ddd;font-size:13px">暂无</div>';
      } else {
        list.forEach(todo => {
          const done = todo.done ? 'checked' : '';
          const doneClass = todo.done ? 'done' : '';
          const dragAttrs = canEdit ? `draggable="true" data-cat="${category}" data-id="${todo.id}"` : `data-cat="${category}" data-id="${todo.id}"`;
          inner += `<div class="prep-todo-item" ${dragAttrs}>
            <div class="prep-check ${done}" data-cat="${category}" data-id="${todo.id}"></div>
            <div class="prep-todo-text ${doneClass}">
              <div class="prep-todo-title">${todo.title}</div>
              ${todo.note ? `<div class="prep-todo-note">${todo.note}</div>` : ''}
            </div>
            ${canEdit ? '<div class="prep-drag-handle" title="拖动排序">☰</div>' : ''}
            ${canEdit ? `<div class="prep-delete" data-cat="${category}" data-id="${todo.id}">×</div>` : ''}
          </div>`;
        });
      }
      return `<div class="prep-section" data-cat="${category}">
        <div class="prep-section-header" style="border-left:3px solid ${color}">
          <span style="font-size:12px;font-weight:600;color:${color}">${label}</span>
        </div>
        <div class="prep-section-items" data-cat="${category}">${inner}</div>
        ${canEdit ? `<div class="prep-add-inline" data-cat="${category}">
          <input type="text" class="prep-inline-input" data-cat="${category}" placeholder="+ 添加${label}">
        </div>` : ''}
      </div>`;
    };

    return `<div class="day-label">行前准备</div>
      <div style="padding:0 16px">${renderSection('toBring', '需要带', 'var(--teal)')}${renderSection('toBuy', '需要买', 'var(--yellow)')}</div>`;
  }

  if (day.date === 'pending') {
    let html = '<div class="day-label">待安排</div>';
    if (items.length === 0) {
      html += `<div class="empty-day">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <div>${canEdit ? '还没有待定安排，点右下角 + 添加' : '还没有待定安排'}</div>
      </div>`;
    } else {
      items.forEach(item => {
        const cat = CATEGORY_MAP[item.category] || CATEGORY_MAP.info;
        html += `<div class="pending-item" data-id="${item.id}">
          <div class="timeline-item type-${item.category}">
            <div class="item-header">
              <span class="item-time">${item.time || '—'}</span>
              <span class="item-title">${item.title}</span>
            </div>
            ${item.desc ? `<div class="item-desc">${item.desc.replace(/\n/g, '<br>')}</div>` : ''}
            <span class="item-tag ${cat.tag}">${cat.label}</span>
          </div>
          ${canEdit ? `<button class="pending-move-btn" data-id="${item.id}">安排到日期 →</button>` : ''}
          ${item.tips ? `<div class="tips-card"><h4>💡 小贴士 ${canEdit ? `<button class="tips-edit-btn" data-date="pending" data-id="${item.id}">编辑</button>` : ''}</h4><ul>${item.tips.map(tip => `<li>${tip}</li>`).join('')}</ul></div>` : ''}
        </div>`;
      });
    }
    return html;
  }

  const hotelHtml = `<div class="hotel-card">
    <div class="hotel-icon">🏨</div>
    <div class="hotel-info">
      <div class="hotel-name">普拉辛格床酒店（仅成人）</div>
      <div class="hotel-addr">📍 古城内，Ratchamanka 路</div>
      <div class="hotel-meta">🚖 距机场 12 分钟 · 距火车站 18 分钟</div>
    </div>
  </div>`;

  const isArrivalOrDeparture = day.date === '2026-06-21' || day.date === '2026-06-25';
  let html = `<div class="day-label">${day.label} · ${day.weekday}</div>`;

  if (isArrivalOrDeparture) html += hotelHtml;

  if (items.length === 0) {
    html += `<div class="empty-day">
      <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      <div>${canEdit ? '还没有安排，点“新增安排”开始添加' : '还没有安排'}</div>
    </div>`;
  } else {
    const sortedItems = [...items].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    sortedItems.forEach(item => {
      const cat = CATEGORY_MAP[item.category] || CATEGORY_MAP.info;
      const isArrivalItem = item.title.includes('→') && item.title.includes('清迈') && !item.title.includes('上海');
      const isDepartureItem = item.title.includes('→') && item.title.includes('上海');
      const tipsTitle = isDepartureItem ? '✈️ 返程小贴士' : (isArrivalItem ? '💡 落地小贴士' : '💡 小贴士');
      html += `<div class="timeline-item type-${item.category}">
        <div class="item-header">
          <span class="item-time">${item.time || '—'}</span>
          <span class="item-title">${item.title}</span>
        </div>
        ${item.desc ? `<div class="item-desc">${item.desc.replace(/\n/g, '<br>')}</div>` : ''}
        <span class="item-tag ${cat.tag}">${cat.label}</span>
      </div>
      ${item.tips ? `<div class="tips-card"><h4>${tipsTitle}${canEdit ? `<button class="tips-edit-btn" data-date="${day.date}" data-id="${item.id}">编辑</button>` : ''}</h4><ul>${item.tips.map(tip => `<li>${tip}</li>`).join('')}</ul></div>` : ''}`;
    });
  }

  if (!isArrivalOrDeparture) html += hotelHtml;
  return html;
}

function switchDay(date) {
  activeDay = date;
  document.querySelectorAll('.day-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.date === date);
  });
  document.querySelectorAll('.day-content').forEach(content => {
    content.classList.toggle('active', content.id === `day-${date}`);
  });
}

function updateItemCount() {
  let total = 0;
  Object.values(itinerary).forEach(items => {
    total += (items || []).length;
  });
  dom.itemCount.textContent = total;

  DAYS.forEach(day => {
    const tab = document.querySelector(`.day-tab[data-date="${day.date}"]`);
    if (!tab) return;
    const hasContent = day.date === 'prep'
      ? ((prepTodos.toBring || []).length + (prepTodos.toBuy || []).length > 0)
      : ((itinerary[day.date] || []).length > 0);
    tab.classList.toggle('has-content', hasContent);
  });
}

function resetEditForm() {
  dom.editTime.value = '';
  dom.editTitle.value = '';
  dom.editDesc.value = '';
  dom.editTips.value = '';
  dom.editWalk.value = '';
  dom.editBike.value = '';
  document.querySelectorAll('.cat-option').forEach(option => option.classList.remove('selected'));
  document.querySelector('.cat-option[data-cat="info"]').classList.add('selected');
  currentEditCat = 'info';
}

function updateEditPanelMode() {
  const isPrep = selectedEditDate === 'prep';
  const timeGroup = dom.editTime.closest('.form-group');
  const tipsGroup = dom.editTips.closest('.form-group');
  const distGroup = dom.editWalk.closest('.form-group');
  const categoryGroup = document.querySelector('.category-picker').closest('.form-group');
  dom.editPrepCatGroup.style.display = isPrep ? 'block' : 'none';
  timeGroup.style.display = isPrep ? 'none' : '';
  tipsGroup.style.display = isPrep ? 'none' : '';
  distGroup.style.display = isPrep ? 'none' : '';
  categoryGroup.style.display = isPrep ? 'none' : '';
}

function openEditPanel() {
  if (!canEditData()) {
    alert('当前页面是共享只读模式。请先用已授权邮箱登录，或者先完成 Supabase 配置。');
    return;
  }
  selectedEditDate = activeDay;
  dom.editOverlay.classList.add('active');
  dom.editPanel.classList.add('active');
  dom.fabAdd.style.display = 'none';
  dom.editDay.innerHTML = DAYS.map(day => {
    if (day.date === 'pending') return '<option value="pending">P人待定</option>';
    if (day.date === 'prep') return '<option value="prep">行前准备</option>';
    return `<option value="${day.date}">${day.label} ${day.weekday}</option>`;
  }).join('');
  dom.editDay.value = selectedEditDate;
  resetEditForm();
  updateEditPanelMode();
  updateEditItemList();
}

function closeEditPanel() {
  dom.editOverlay.classList.remove('active');
  dom.editPanel.classList.remove('active');
  dom.fabAdd.style.display = canEditData() ? 'flex' : 'none';
}

function openAuthPanel() {
  const suggestedEmail = cloudState.userEmail || readStoredEditorEmail();
  dom.authEmail.value = suggestedEmail;
  dom.authOverlay.classList.add('active');
  dom.authPanel.classList.add('active');
  dom.authPanel.style.display = 'block';
  window.setTimeout(() => {
    dom.authEmail.focus();
    dom.authEmail.select();
  }, 30);
}

function closeAuthPanel() {
  dom.authOverlay.classList.remove('active');
  dom.authPanel.classList.remove('active');
  dom.authPanel.style.display = 'none';
}

function updateEditItemList() {
  if (selectedEditDate === 'prep') {
    dom.editItemList.innerHTML = '<div style="font-size:13px;color:#bbb;padding:8px 0;">行前准备建议直接在当前页勾选、删除或回车添加。</div>';
    return;
  }

  const items = itinerary[selectedEditDate] || [];
  if (items.length === 0) {
    dom.editItemList.innerHTML = '<div style="font-size:13px;color:#bbb;padding:8px 0;">暂无安排</div>';
    return;
  }

  const sortedItems = [...items].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  dom.editItemList.innerHTML = sortedItems.map(item => {
    return `<div class="edit-item-row">
      <span>${item.time || '—'} ${item.title}</span>
      <button class="del-btn" data-date="${selectedEditDate}" data-id="${item.id}" title="删除">×</button>
    </div>`;
  }).join('');

  dom.editItemList.querySelectorAll('.del-btn').forEach(button => {
    button.addEventListener('click', () => {
      void deleteTripItem(button.dataset.date, button.dataset.id);
    });
  });
}

function serializeSnapshot() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    itinerary: cloneJSON(itinerary),
    prepTodos: cloneJSON(prepTodos),
  };
}

function tripSignature(date, item) {
  return [
    date,
    item.time || '',
    item.title || '',
    item.category || '',
    item.desc || '',
    JSON.stringify(item.tips || []),
  ].join('||').toLowerCase();
}

function prepSignature(category, todo) {
  return [
    category,
    todo.title || '',
    todo.note || '',
  ].join('||').toLowerCase();
}

function mergeSnapshotData(snapshot) {
  const incomingItinerary = snapshot && snapshot.itinerary && typeof snapshot.itinerary === 'object' ? snapshot.itinerary : {};
  const incomingPrep = snapshot && snapshot.prepTodos && typeof snapshot.prepTodos === 'object' ? snapshot.prepTodos : {};

  const mergedItinerary = cloneJSON(itinerary);
  DAY_KEYS.forEach(date => {
    const currentItems = (mergedItinerary[date] || []).map(item => normalizeTripItem(item));
    const seen = new Set(currentItems.map(item => tripSignature(date, item)));
    const incomingItems = Array.isArray(incomingItinerary[date]) ? incomingItinerary[date] : [];
    incomingItems.forEach(rawItem => {
      const item = normalizeTripItem(rawItem);
      const signature = tripSignature(date, item);
      if (seen.has(signature)) return;
      currentItems.push(item);
      seen.add(signature);
    });
    mergedItinerary[date] = currentItems;
  });

  const mergedPrep = {
    toBring: (prepTodos.toBring || []).map((todo, index) => normalizePrepTodo(todo, 'toBring', index)),
    toBuy: (prepTodos.toBuy || []).map((todo, index) => normalizePrepTodo(todo, 'toBuy', index)),
  };

  ['toBring', 'toBuy'].forEach(category => {
    const currentList = mergedPrep[category] || [];
    const seen = new Set(currentList.map(todo => prepSignature(category, todo)));
    const incomingList = Array.isArray(incomingPrep[category]) ? incomingPrep[category] : [];
    incomingList.forEach(rawTodo => {
      const todo = normalizePrepTodo(rawTodo, category, currentList.length);
      const signature = prepSignature(category, todo);
      if (seen.has(signature)) return;
      currentList.push(todo);
      seen.add(signature);
    });
    mergedPrep[category] = currentList.map((todo, index) => ({ ...todo, sortOrder: index }));
  });

  return {
    itinerary: mergedItinerary,
    prepTodos: mergedPrep,
  };
}

function exportBackup() {
  const snapshot = serializeSnapshot();
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `chiangmai-trip-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importBackup(file) {
  if (!file) return;
  if (cloudState.configured && !canEditData()) {
    alert('共享模式下，建议先用已授权邮箱登录后再导入，这样你可以把合并结果继续上传到云端。');
    dom.importDataInput.value = '';
    return;
  }

  const text = await file.text();
  const parsed = safeParseJSON(text);
  if (!parsed) {
    alert('这个备份文件不是有效的 JSON。');
    dom.importDataInput.value = '';
    return;
  }

  const merged = mergeSnapshotData(parsed);
  itinerary = merged.itinerary;
  prepTodos = merged.prepTodos;
  persistLocalCache();
  cloudState.importedUnsynced = cloudState.configured;
  render();
  updateSyncUI();

  if (cloudState.configured && canEditData()) {
    const shouldUpload = confirm('备份已经合并到当前页面。要不要立刻用这份结果覆盖云端共享数据？');
    if (shouldUpload) {
      await replaceCloudWithCurrentState(true);
    }
  }

  dom.importDataInput.value = '';
}

function restoreStoredLocalBackup() {
  const backup = readStoredLocalBackup();
  if (!backup) {
    alert('这台设备目前没有可恢复的本机旧备份。');
    return;
  }

  const merged = mergeSnapshotData(backup);
  itinerary = merged.itinerary;
  prepTodos = merged.prepTodos;
  persistLocalCache();
  cloudState.importedUnsynced = cloudState.configured;
  render();
  updateSyncUI();

  if (cloudState.configured && canEditData()) {
    alert('本机旧数据已经恢复到当前页面。请确认无误后点击“用当前页面覆盖云端”，把它并入共享数据。');
  } else {
    alert('本机旧数据已经恢复到当前页面。登录编辑身份后，可以再上传到云端。');
  }
}

function buildCloudTripRows() {
  const rows = [];
  DAY_KEYS.forEach(date => {
    if (date === 'prep') return;
    (itinerary[date] || []).forEach(item => {
      rows.push(withOptionalUuidId({
        date_key: date,
        time_text: item.time || null,
        title: item.title,
        category: item.category,
        description_text: item.desc || null,
        tips: item.tips || null,
        dist: item.dist || null,
      }, item.id));
    });
  });
  return rows;
}

function buildCloudPrepRows() {
  const rows = [];
  ['toBring', 'toBuy'].forEach(category => {
    (prepTodos[category] || []).forEach((todo, index) => {
      rows.push(withOptionalUuidId({
        category,
        title: todo.title,
        note: todo.note || '',
        done: Boolean(todo.done),
        sort_order: index,
      }, todo.id));
    });
  });
  return rows;
}

function hydrateItineraryFromCloud(rows) {
  const next = createEmptyItinerary();
  rows.forEach(row => {
    if (!DAY_KEYS.includes(row.date_key)) return;
    next[row.date_key].push(normalizeTripItem({
      id: row.id,
      time: row.time_text || '',
      title: row.title,
      category: row.category,
      desc: row.description_text || '',
      tips: row.tips,
      dist: row.dist,
    }));
  });
  return next;
}

function hydratePrepFromCloud(rows) {
  const next = { toBring: [], toBuy: [] };
  rows.forEach(row => {
    if (row.category !== 'toBring' && row.category !== 'toBuy') return;
    next[row.category].push(normalizePrepTodo({
      id: row.id,
      category: row.category,
      title: row.title,
      note: row.note || '',
      done: row.done,
      sortOrder: row.sort_order,
    }, row.category, row.sort_order || 0));
  });
  next.toBring.sort((a, b) => a.sortOrder - b.sortOrder);
  next.toBuy.sort((a, b) => a.sortOrder - b.sortOrder);
  return next;
}

function formatCloudError(error) {
  if (!error) return '';
  const text = error.message || String(error);
  if (/relation .* does not exist/i.test(text)) {
    return 'Supabase 里的数据表还没创建。先运行仓库里的 `supabase-setup.sql`，再刷新网页。';
  }
  if (/invalid input syntax for type uuid/i.test(text)) {
    return '本地旧数据的 id 格式和 Supabase 的 uuid 要求不一致。我已经补兼容修复；刷新到最新版页面后再试一次即可。';
  }
  if (/row-level security|permission denied|violates row-level security/i.test(text)) {
    return '当前登录邮箱还没有通过 Supabase 的编辑权限校验。你先把这条报错截给我，我继续帮你排白名单或 RLS。';
  }
  return text;
}

async function refreshEditorPermission(email) {
  if (!email) return false;
  const { data, error } = await supabaseClient
    .from(CLOUD_TABLES.editors)
    .select('email')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error) {
    throw error;
  }
  return Boolean(data);
}

async function refreshSessionState(session = null) {
  let currentSession = session;
  if (!currentSession) {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    currentSession = data.session;
  }

  cloudState.session = currentSession;
  cloudState.userEmail = currentSession?.user?.email || '';
  if (cloudState.userEmail) {
    writeStoredEditorEmail(cloudState.userEmail);
    closeAuthPanel();
  }
  cloudState.editor = currentSession?.user?.email
    ? await refreshEditorPermission(currentSession.user.email)
    : false;
}

async function loadCloudData(options = {}) {
  const { silent = false } = options;
  if (!supabaseClient) return false;
  if (!silent) {
    cloudState.loading = true;
    updateSyncUI();
  }

  try {
    const [tripResponse, prepResponse] = await Promise.all([
      supabaseClient
        .from(CLOUD_TABLES.tripItems)
        .select('*')
        .order('date_key', { ascending: true })
        .order('time_text', { ascending: true, nullsFirst: true })
        .order('created_at', { ascending: true }),
      supabaseClient
        .from(CLOUD_TABLES.prepTodos)
        .select('*')
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true }),
    ]);

    if (tripResponse.error) throw tripResponse.error;
    if (prepResponse.error) throw prepResponse.error;

    const localSnapshotBeforeCloud = serializeSnapshot();
    const remoteItinerary = hydrateItineraryFromCloud(tripResponse.data);
    const remotePrepTodos = hydratePrepFromCloud(prepResponse.data);
    const remoteSnapshot = {
      version: 1,
      itinerary: remoteItinerary,
      prepTodos: remotePrepTodos,
    };

    cloudState.available = true;
    cloudState.lastError = '';
    cloudState.hasRemoteData = tripResponse.data.length > 0 || prepResponse.data.length > 0;
    if (cloudState.hasRemoteData) {
      if (
        snapshotHasContent(localSnapshotBeforeCloud) &&
        canonicalizeSnapshot(localSnapshotBeforeCloud) !== canonicalizeSnapshot(remoteSnapshot)
      ) {
        writeStoredLocalBackup(localSnapshotBeforeCloud);
      }
      itinerary = remoteItinerary;
      prepTodos = remotePrepTodos;
      persistLocalCache();
    }
    render();
    return true;
  } catch (error) {
    cloudState.available = false;
    cloudState.lastError = formatCloudError(error);
    render();
    return false;
  } finally {
    cloudState.loading = false;
    updateSyncUI();
  }
}

function startCloudPolling() {
  if (cloudPollTimer) return;
  cloudPollTimer = window.setInterval(() => {
    if (!supabaseClient || cloudState.loading || cloudState.saving) return;
    void loadCloudData({ silent: true });
  }, CLOUD_POLL_MS);
}

async function initCloudSync() {
  updateSyncUI();
  if (!cloudState.configured) return;

  cloudState.loading = true;
  updateSyncUI();

  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    supabaseClient = createClient(cloudConfig.url, cloudConfig.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });

    supabaseClient.auth.onAuthStateChange((_, session) => {
      void (async () => {
        try {
          await refreshSessionState(session);
          render();
          updateSyncUI();
        } catch (error) {
          cloudState.lastError = formatCloudError(error);
          updateSyncUI();
        }
      })();
    });

    await refreshSessionState();
    await loadCloudData({ silent: true });
    startCloudPolling();
  } catch (error) {
    cloudState.available = false;
    cloudState.loading = false;
    cloudState.lastError = formatCloudError(error);
    updateSyncUI();
  }
}

async function requireCloudEdit(actionLabel) {
  if (!cloudState.configured) return true;
  if (!cloudState.available) {
    alert(`现在还没连上共享数据，暂时不能${actionLabel}。先把 Supabase 配置和数据表跑通，再试一次。`);
    return false;
  }
  if (!hasCloudSession()) {
    alert(`当前页面是共享只读模式，不能${actionLabel}。请用已授权邮箱登录。`);
    return false;
  }
  return true;
}

async function runCloudMutation(actionLabel, runner, onSuccess) {
  const allowed = await requireCloudEdit(actionLabel);
  if (!allowed) return false;

  cloudState.saving = true;
  updateSyncUI();

  try {
    await runner();
    cloudState.importedUnsynced = false;
    await loadCloudData({ silent: true });
    if (typeof onSuccess === 'function') onSuccess();
    render();
    return true;
  } catch (error) {
    cloudState.lastError = formatCloudError(error);
    alert(`${actionLabel}失败：${cloudState.lastError}`);
    return false;
  } finally {
    cloudState.saving = false;
    updateSyncUI();
  }
}

async function replaceCloudWithCurrentState(showConfirm) {
  const confirmed = !showConfirm || confirm(cloudState.hasRemoteData
    ? '这会用当前页面的数据覆盖 Supabase 里的共享版本。确定继续吗？'
    : '云端还没有数据。要用当前页面内容初始化共享数据吗？');
  if (!confirmed) return false;

  return runCloudMutation('覆盖云端数据', async () => {
    const tripRows = buildCloudTripRows();
    const prepRows = buildCloudPrepRows();

    const tripDelete = await supabaseClient
      .from(CLOUD_TABLES.tripItems)
      .delete()
      .not('id', 'is', null);
    if (tripDelete.error) throw tripDelete.error;

    const prepDelete = await supabaseClient
      .from(CLOUD_TABLES.prepTodos)
      .delete()
      .not('id', 'is', null);
    if (prepDelete.error) throw prepDelete.error;

    if (tripRows.length > 0) {
      const tripInsert = await supabaseClient.from(CLOUD_TABLES.tripItems).insert(tripRows);
      if (tripInsert.error) throw tripInsert.error;
    }

    if (prepRows.length > 0) {
      const prepInsert = await supabaseClient.from(CLOUD_TABLES.prepTodos).insert(prepRows);
      if (prepInsert.error) throw prepInsert.error;
    }
  }, () => {
    clearStoredLocalBackup();
  });
}

function findTripItem(date, itemId) {
  return (itinerary[date] || []).find(item => item.id === itemId) || null;
}

function findPrepTodo(category, todoId) {
  return (prepTodos[category] || []).find(todo => todo.id === todoId) || null;
}

async function saveItem() {
  const date = dom.editDay.value;
  const title = dom.editTitle.value.trim();
  const desc = dom.editDesc.value.trim();
  if (!title) {
    dom.editTitle.focus();
    return;
  }

  if (date === 'prep') {
    const category = dom.editPrepCat.value;
    const todo = normalizePrepTodo({
      title,
      note: desc,
      done: false,
    }, category, (prepTodos[category] || []).length);

    if (!cloudState.configured) {
      prepTodos[category].push(todo);
      savePrepTodos();
      dom.editTitle.value = '';
      dom.editDesc.value = '';
      render();
      openEditPanel();
      return;
    }

    await runCloudMutation('添加行前准备', async () => {
      const response = await supabaseClient.from(CLOUD_TABLES.prepTodos).insert([withOptionalUuidId({
        category,
        title: todo.title,
        note: todo.note,
        done: false,
        sort_order: (prepTodos[category] || []).length,
      }, todo.id)]);
      if (response.error) throw response.error;
    }, () => {
      dom.editTitle.value = '';
      dom.editDesc.value = '';
      openEditPanel();
    });
    return;
  }

  const tipsRaw = dom.editTips.value.trim();
  const tips = tipsRaw ? tipsRaw.split('\n').map(tip => tip.trim()).filter(Boolean) : [];
  const walk = Number.parseInt(dom.editWalk.value, 10);
  const bike = Number.parseInt(dom.editBike.value, 10);
  const dist = (walk || bike) ? { walk: walk || null, bike: bike || null } : undefined;
  const item = normalizeTripItem({
    time: dom.editTime.value,
    title,
    category: currentEditCat,
    desc,
    tips,
    dist,
  });

  if (!cloudState.configured) {
    if (!itinerary[date]) itinerary[date] = [];
    itinerary[date].push(item);
    saveItinerary();
    resetEditForm();
    render();
    openEditPanel();
    return;
  }

  await runCloudMutation('添加安排', async () => {
    const response = await supabaseClient.from(CLOUD_TABLES.tripItems).insert([withOptionalUuidId({
      date_key: date,
      time_text: item.time || null,
      title: item.title,
      category: item.category,
      description_text: item.desc || null,
      tips: item.tips || null,
      dist: item.dist || null,
    }, item.id)]);
    if (response.error) throw response.error;
  }, () => {
    resetEditForm();
    openEditPanel();
  });
}

async function deleteTripItem(date, itemId) {
  if (!itemId) return;

  if (!cloudState.configured) {
    itinerary[date] = (itinerary[date] || []).filter(item => item.id !== itemId);
    saveItinerary();
    render();
    return;
  }

  await runCloudMutation('删除安排', async () => {
    const response = await supabaseClient
      .from(CLOUD_TABLES.tripItems)
      .delete()
      .eq('id', itemId);
    if (response.error) throw response.error;
  });
}

async function togglePrepDone(category, todoId) {
  const todo = findPrepTodo(category, todoId);
  if (!todo) return;
  const nextDone = !todo.done;

  if (!cloudState.configured) {
    todo.done = nextDone;
    savePrepTodos();
    render();
    return;
  }

  await runCloudMutation('更新行前准备', async () => {
    const response = await supabaseClient
      .from(CLOUD_TABLES.prepTodos)
      .update({ done: nextDone })
      .eq('id', todoId);
    if (response.error) throw response.error;
  });
}

async function deletePrepTodo(category, todoId) {
  if (!cloudState.configured) {
    prepTodos[category] = (prepTodos[category] || []).filter(todo => todo.id !== todoId);
    prepTodos[category] = prepTodos[category].map((todo, index) => ({ ...todo, sortOrder: index }));
    savePrepTodos();
    render();
    return;
  }

  await runCloudMutation('删除行前准备', async () => {
    const response = await supabaseClient
      .from(CLOUD_TABLES.prepTodos)
      .delete()
      .eq('id', todoId);
    if (response.error) throw response.error;
  });
}

async function addPrepInline(category, title) {
  const todo = normalizePrepTodo({ title, note: '', done: false }, category, (prepTodos[category] || []).length);
  if (!cloudState.configured) {
    prepTodos[category].push(todo);
    savePrepTodos();
    render();
    return;
  }

  await runCloudMutation('添加行前准备', async () => {
    const response = await supabaseClient.from(CLOUD_TABLES.prepTodos).insert([withOptionalUuidId({
      category,
      title: todo.title,
      note: '',
      done: false,
      sort_order: (prepTodos[category] || []).length,
    }, todo.id)]);
    if (response.error) throw response.error;
  });
}

async function reorderPrepTodos(category, fromId, toId) {
  const list = prepTodos[category] || [];
  const fromIndex = list.findIndex(todo => todo.id === fromId);
  const toIndex = list.findIndex(todo => todo.id === toId);
  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

  const reordered = [...list];
  const [moved] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, moved);
  prepTodos[category] = reordered.map((todo, index) => ({ ...todo, sortOrder: index }));

  if (!cloudState.configured) {
    savePrepTodos();
    render();
    return;
  }

  render();
  await runCloudMutation('调整行前准备顺序', async () => {
    const updates = prepTodos[category].map((todo, index) =>
      supabaseClient
        .from(CLOUD_TABLES.prepTodos)
        .update({ sort_order: index })
        .eq('id', todo.id)
    );
    const results = await Promise.all(updates);
    const firstError = results.find(result => result.error)?.error;
    if (firstError) throw firstError;
  });
}

function openMovePanel(itemId) {
  const item = findTripItem('pending', itemId);
  if (!item) return;
  pendingMoveId = itemId;
  dom.moveItemTitle.textContent = item.title;
  dom.moveTime.value = item.time || '09:00';
  dom.moveDay.innerHTML = REAL_DAY_KEYS.map(date => {
    const day = DAYS.find(entry => entry.date === date);
    return `<option value="${date}">${day.label} ${day.weekday}</option>`;
  }).join('');
  dom.moveOverlay.classList.add('active');
  dom.movePanel.style.display = 'block';
  dom.moveTime.focus();
}

function closeMovePanel() {
  dom.moveOverlay.classList.remove('active');
  dom.movePanel.style.display = 'none';
  pendingMoveId = null;
}

async function movePendingItem() {
  if (!pendingMoveId) return;
  const targetDate = dom.moveDay.value;
  const targetTime = dom.moveTime.value;
  const item = findTripItem('pending', pendingMoveId);
  if (!item) {
    closeMovePanel();
    return;
  }

  if (!cloudState.configured) {
    itinerary.pending = (itinerary.pending || []).filter(entry => entry.id !== pendingMoveId);
    if (!itinerary[targetDate]) itinerary[targetDate] = [];
    itinerary[targetDate].push({ ...item, time: targetTime });
    saveItinerary();
    closeMovePanel();
    render();
    return;
  }

  await runCloudMutation('迁移待定安排', async () => {
    const response = await supabaseClient
      .from(CLOUD_TABLES.tripItems)
      .update({ date_key: targetDate, time_text: targetTime || null })
      .eq('id', pendingMoveId);
    if (response.error) throw response.error;
  }, () => {
    closeMovePanel();
  });
}

function openTipsPanel(date, itemId) {
  const item = findTripItem(date, itemId);
  if (!item || !canEditData()) return;
  editingTips = {
    date,
    itemId,
    tips: item.tips ? [...item.tips] : [],
  };
  dom.tipsItemTitle.textContent = item.title;
  dom.tipsNewInput.value = '';
  renderTipsEditList();
  dom.tipsOverlay.classList.add('active');
  dom.tipsPanel.style.display = 'block';
  dom.tipsNewInput.focus();
}

function closeTipsPanel() {
  dom.tipsOverlay.classList.remove('active');
  dom.tipsPanel.style.display = 'none';
  editingTips = { date: null, itemId: null, tips: [] };
}

function renderTipsEditList() {
  if (editingTips.tips.length === 0) {
    dom.tipsEditList.innerHTML = '<div style="font-size:13px;color:#ccc;padding:4px 0">暂无小贴士</div>';
    return;
  }
  dom.tipsEditList.innerHTML = editingTips.tips.map((tip, index) => `
    <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">
      <span style="flex:1;font-size:13px;color:var(--text)">${tip}</span>
      <button class="tips-del-btn" data-idx="${index}" style="background:none;border:none;color:#e07a5f;font-size:16px;cursor:pointer;padding:0 4px">×</button>
    </div>
  `).join('');
}

async function saveTips() {
  const item = findTripItem(editingTips.date, editingTips.itemId);
  if (!item) {
    closeTipsPanel();
    return;
  }

  const nextTips = editingTips.tips.length ? editingTips.tips : undefined;

  if (!cloudState.configured) {
    item.tips = nextTips;
    saveItinerary();
    closeTipsPanel();
    render();
    return;
  }

  await runCloudMutation('保存小贴士', async () => {
    const response = await supabaseClient
      .from(CLOUD_TABLES.tripItems)
      .update({ tips: nextTips || null })
      .eq('id', editingTips.itemId);
    if (response.error) throw response.error;
  }, () => {
    closeTipsPanel();
  });
}

async function handleCloudAuth() {
  if (!cloudState.configured) {
    alert('先在 `supabase-config.js` 里填好项目地址和 anon key，页面才会进入共享模式。');
    return;
  }
  if (!supabaseClient) {
    alert('Supabase SDK 还没加载完成，稍等一下再试。');
    return;
  }

  if (cloudState.session) {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(`退出失败：${formatCloudError(error)}`);
      return;
    }
    cloudState.session = null;
    cloudState.userEmail = '';
    cloudState.editor = false;
    render();
    updateSyncUI();
    return;
  }

  openAuthPanel();
}

async function submitCloudAuth() {
  const email = dom.authEmail.value.trim().toLowerCase();
  if (!email) {
    dom.authEmail.focus();
    return;
  }
  if (!isValidEmail(email)) {
    alert('请输入完整邮箱，例如 nemuchong@gmail.com。');
    dom.authEmail.focus();
    dom.authEmail.select();
    return;
  }

  dom.btnAuthSend.disabled = true;
  dom.btnAuthSend.textContent = '发送中...';

  try {
    const redirectTo = cloudConfig.redirectTo || window.location.href.split('#')[0];
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    if (error) {
      alert(`发送登录邮件失败：${formatCloudError(error)}`);
      return;
    }
    writeStoredEditorEmail(email);
    closeAuthPanel();
    alert('登录链接已经发到邮箱。你在手机上点开 magic link 之后，这个网页就会切到可编辑状态。');
  } finally {
    dom.btnAuthSend.disabled = false;
    dom.btnAuthSend.textContent = '发送登录邮件';
  }
}

function bindEvents() {
  dom.fabAdd.addEventListener('click', openEditPanel);
  dom.editOverlay.addEventListener('click', closeEditPanel);
  document.getElementById('btnCancel').addEventListener('click', closeEditPanel);
  document.getElementById('btnSave').addEventListener('click', () => {
    void saveItem();
  });

  document.querySelectorAll('.cat-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.cat-option').forEach(entry => entry.classList.remove('selected'));
      option.classList.add('selected');
      currentEditCat = option.dataset.cat;
    });
  });

  dom.editDay.addEventListener('change', event => {
    selectedEditDate = event.target.value;
    updateEditPanelMode();
    updateEditItemList();
  });

  document.addEventListener('click', event => {
    if (event.target.classList.contains('prep-check')) {
      void togglePrepDone(event.target.dataset.cat, event.target.dataset.id);
    }

    if (event.target.classList.contains('prep-delete')) {
      void deletePrepTodo(event.target.dataset.cat, event.target.dataset.id);
    }

    if (event.target.classList.contains('pending-move-btn')) {
      openMovePanel(event.target.dataset.id);
    }

    if (event.target.id === 'btnMoveCancel' || event.target.id === 'moveOverlay') {
      closeMovePanel();
    }

    if (event.target.id === 'btnMoveConfirm') {
      void movePendingItem();
    }

    if (event.target.classList.contains('tips-edit-btn')) {
      openTipsPanel(event.target.dataset.date, event.target.dataset.id);
    }

    if (event.target.id === 'btnTipsCancel' || event.target.id === 'tipsOverlay') {
      closeTipsPanel();
    }

    if (event.target.classList.contains('tips-del-btn')) {
      const index = Number.parseInt(event.target.dataset.idx, 10);
      editingTips.tips.splice(index, 1);
      renderTipsEditList();
    }

    if (event.target.id === 'btnTipsSave') {
      void saveTips();
    }
  });

  let dragSource = null;

  document.addEventListener('dragstart', event => {
    const item = event.target.closest('.prep-todo-item');
    if (!item || !canEditData()) return;
    dragSource = {
      category: item.dataset.cat,
      id: item.dataset.id,
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(dragSource));
    item.style.opacity = '0.4';
  });

  document.addEventListener('dragend', event => {
    const item = event.target.closest('.prep-todo-item');
    if (item) item.style.opacity = '';
  });

  document.addEventListener('dragover', event => {
    const item = event.target.closest('.prep-todo-item');
    if (!item || !canEditData()) return;
    event.preventDefault();
    item.style.background = 'var(--green-light)';
  });

  document.addEventListener('dragleave', event => {
    const item = event.target.closest('.prep-todo-item');
    if (item) item.style.background = '';
  });

  document.addEventListener('drop', event => {
    const item = event.target.closest('.prep-todo-item');
    if (!item || !dragSource || !canEditData()) return;
    event.preventDefault();
    item.style.background = '';
    if (dragSource.category !== item.dataset.cat) return;
    void reorderPrepTodos(dragSource.category, dragSource.id, item.dataset.id);
    dragSource = null;
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.classList.contains('prep-inline-input')) {
      event.preventDefault();
      const title = event.target.value.trim();
      if (!title) return;
      void addPrepInline(event.target.dataset.cat, title);
      event.target.value = '';
    }

    if (event.key === 'Enter' && event.target.id === 'tipsNewInput') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (!value) return;
      editingTips.tips.push(value);
      event.target.value = '';
      renderTipsEditList();
    }

    if (event.key === 'Enter' && event.target.id === 'authEmail') {
      event.preventDefault();
      void submitCloudAuth();
    }
  });

  dom.btnCloudAuth.addEventListener('click', () => {
    void handleCloudAuth();
  });
  dom.btnQuickAdd.addEventListener('click', openEditPanel);
  dom.authOverlay.addEventListener('click', closeAuthPanel);
  dom.btnAuthCancel.addEventListener('click', closeAuthPanel);
  dom.btnAuthSend.addEventListener('click', () => {
    void submitCloudAuth();
  });

  dom.btnCloudRefresh.addEventListener('click', () => {
    if (!cloudState.configured) return;
    void loadCloudData();
  });

  dom.btnCloudUpload.addEventListener('click', () => {
    void replaceCloudWithCurrentState(true);
  });

  dom.btnRestoreLocalBackup.addEventListener('click', restoreStoredLocalBackup);

  dom.btnExportData.addEventListener('click', exportBackup);
  dom.importDataInput.addEventListener('change', event => {
    void importBackup(event.target.files[0]);
  });
}

async function init() {
  bindEvents();
  render();
  updateSyncUI();
  await initCloudSync();
}

void init();
