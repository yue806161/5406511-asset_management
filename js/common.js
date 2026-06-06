/**
 * Family Capital Governance Platform — Common JS v2.0
 * Sidebar rendering, active nav, mobile toggle, shared helpers
 */

/* ─── Nav Definition ─────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "總覽",      separator: true },
  { href: "index.html",      icon: "fa-solid fa-house",           label: "EAM 操作總覽"      },

  { label: "資產管理",  separator: true },
  { href: "assets.html",     icon: "fa-solid fa-globe",           label: "全球資產"           },
  { href: "market.html",     icon: "fa-solid fa-chart-line",      label: "市場行情"           },
  { href: "portfolio.html",  icon: "fa-solid fa-briefcase",       label: "投資組合"           },

  { label: "融資與合規", separator: true },
  { href: "credit.html",     icon: "fa-solid fa-building-columns",label: "銀行與融資"         },
  { href: "domestic.html",   icon: "fa-solid fa-flag",            label: "境內台灣產業投資"   },
  { href: "tax.html",        icon: "fa-solid fa-scale-balanced",  label: "稅務與合規"         },

  { label: "治理與報告", separator: true },
  { href: "governance.html", icon: "fa-solid fa-users",           label: "家族治理 FMO"       },
  { href: "reports.html",    icon: "fa-solid fa-file-lines",      label: "報告中心"           },
  { href: "documents.html",  icon: "fa-solid fa-folder-open",     label: "文件中心"           },
  { href: "messages.html",   icon: "fa-solid fa-bell",            label: "訊息中心",  badge: true }
];

/* ─── Build Sidebar HTML ─────────────────────────────────── */
function buildSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const unreadCount = (typeof MOCK !== 'undefined') ? MOCK.messages.filter(m => !m.read).length : 0;

  let navHtml = '';
  for (const item of NAV_ITEMS) {
    if (item.separator) {
      navHtml += `<div class="nav-label">${item.label}</div>`;
      continue;
    }
    const isActive = currentPage === item.href;
    const badgeHtml = (item.badge && unreadCount > 0)
      ? `<span class="badge-unread">${unreadCount}</span>` : '';
    navHtml += `
      <a href="${item.href}" class="${isActive ? 'active' : ''}">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
        ${badgeHtml}
      </a>`;
  }

  return `
    <div class="sidebar-logo">
      <div class="d-flex align-items-center gap-2 mb-1">
        <img src="img/logo.png" alt="logo" style="width:36px;height:36px;border-radius:6px;flex-shrink:0;object-fit:cover;">
        <div>
          <div class="platform-name" style="font-size:18px;line-height:1.3;">跨境家族資本治理平台</div>
          <div class="platform-sub">Family Capital Governance</div>
        </div>
      </div>
    </div>
    <div class="sidebar-avatar">
      <div class="avatar-circle"><i class="fa-solid fa-user"></i></div>
      <div class="avatar-info">
        <div class="name">陳家族辦公室</div>
        <div class="role">Family Office</div>
      </div>
    </div>
    <div class="sidebar-divider"></div>
    <nav class="sidebar-nav">${navHtml}</nav>
    <div class="sidebar-divider"></div>
    <div style="padding:12px 18px 18px;">
      <div style="font-size:11px;color:rgba(255,255,255,0.35);">最後更新</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:2px;" id="last-updated">—</div>
    </div>`;
}

/* ─── Mobile sidebar toggle ──────────────────────────────── */
function toggleSidebar(force) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('sidebar-open');
  const shouldOpen = (force !== undefined) ? force : !isOpen;
  sidebar.classList.toggle('sidebar-open', shouldOpen);
  if (overlay) overlay.classList.toggle('overlay-visible', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

function setupMobileSidebar() {
  // Overlay
  let overlay = document.getElementById('sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', () => toggleSidebar(false));
    document.body.appendChild(overlay);
  }

  // Toggle button — inject before topbar's first child
  const topbar = document.querySelector('.topbar');
  if (topbar && !document.getElementById('sidebar-toggle-btn')) {
    const btn = document.createElement('button');
    btn.id = 'sidebar-toggle-btn';
    btn.className = 'sidebar-toggle-btn';
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    btn.setAttribute('aria-label', 'Toggle sidebar');
    btn.addEventListener('click', () => toggleSidebar());
    topbar.insertBefore(btn, topbar.firstChild);
  }

  // Close sidebar when nav link clicked on mobile
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 991) toggleSidebar(false);
    });
  });
}

/* ─── Format helpers ─────────────────────────────────────── */
function fmt(n, decimals = 0) {
  if (n === null || n === undefined) return '—';
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function fmtUSD(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${fmt(n)}`;
}

function fmtPct(n, decimals = 2) {
  if (n === null || n === undefined) return '—';
  const sign = n >= 0 ? '+' : '';
  return `${sign}${Number(n).toFixed(decimals)}%`;
}

function changeClass(n) {
  return n >= 0 ? 'text-up' : 'text-down';
}

function changeIcon(n) {
  return n >= 0 ? '▲' : '▼';
}

function portBadge(port) {
  const map = { A: 'badge-port-a', B: 'badge-port-b', C: 'badge-port-c' };
  const labels = { A: '境外 A', B: '境內 B', C: '融資 C' };
  return `<span class="${map[port] || 'badge-info'}">${labels[port] || port}</span>`;
}

/* ─── Build ticker HTML ──────────────────────────────────── */
function buildTicker() {
  if (typeof MOCK === 'undefined') return '';
  let html = '';
  for (const t of [...MOCK.ticker, ...MOCK.ticker]) { // doubled for seamless loop
    const cls  = t.change >= 0 ? 't-up' : 't-dn';
    const icon = t.change >= 0 ? '▲' : '▼';
    html += `<div class="ticker-item">
      <span class="t-name">${t.name}</span>
      <span>${fmt(t.price, t.price < 100 ? 2 : 0)}</span>
      <span class="${cls}">${icon} ${Math.abs(t.change).toFixed(2)}%</span>
    </div>`;
  }
  return html;
}

/* ─── Standard page shell ────────────────────────────────── */
function renderShell(pageTitle, breadcrumb) {
  const sidebar  = document.getElementById('sidebar');
  const topbar   = document.querySelector('.topbar');
  const tickerEl = document.getElementById('ticker-inner');

  if (sidebar) sidebar.innerHTML = buildSidebar();

  if (topbar) {
    // Title (injected if not present)
    const titleEl = topbar.querySelector('.topbar-title');
    if (titleEl) titleEl.textContent = pageTitle;
  }

  // Update last-updated timestamp
  const lu = document.getElementById('last-updated');
  if (lu) {
    const now = new Date();
    lu.textContent = now.toLocaleString('zh-TW', {
      month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  }

  // Ticker
  if (tickerEl) tickerEl.innerHTML = buildTicker();

  // Breadcrumb
  const bcEl = document.querySelector('.breadcrumb-row');
  if (bcEl && breadcrumb) bcEl.innerHTML = breadcrumb;

  setupMobileSidebar();
}

/* ─── Chart.js defaults ──────────────────────────────────── */
function applyChartDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = "'Noto Sans TC', sans-serif";
  Chart.defaults.font.size   = 12;
  Chart.defaults.color       = '#6B7280';
  Chart.defaults.plugins.legend.labels.padding = 14;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
}

document.addEventListener('DOMContentLoaded', () => {
  applyChartDefaults();
  // Shell rendering is called per-page after DOMContentLoaded
});
