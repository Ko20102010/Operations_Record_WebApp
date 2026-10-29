(() => {
  const V = '0.8.11';
  const K = 'ops_issues_v080';
  const LANGUAGE_KEY = 'ops_language';
  const C = window.OPS_CONFIG;
  const $ = selector => document.querySelector(selector);
  const pad = number => String(number).padStart(2, '0');
  const get = () => JSON.parse(localStorage.getItem(K) || '[]');
  const set = records => localStorage.setItem(K, JSON.stringify(records));
  const getLanguage = () => localStorage.getItem(LANGUAGE_KEY) === 'zh' ? 'zh' : 'en';

  function applyLanguage() {
    const language = getLanguage();
    document.documentElement.lang = language === 'zh' ? 'zh-HK' : 'en';
    document.body.dataset.language = language;
    document.querySelectorAll('[data-aria-en][data-aria-zh]').forEach(element => {
      element.setAttribute('aria-label', language === 'zh' ? element.dataset.ariaZh : element.dataset.ariaEn);
    });
    document.querySelectorAll('[aria-label], [title], [alt]').forEach(element => {
      ['aria-label', 'title', 'alt'].forEach(attribute => {
        const value = element.getAttribute(attribute);
        const match = value?.match(/^(.+?)\s+([\u3400-\u9fff].*)$/);
        if (match) element.setAttribute(attribute, language === 'zh' ? match[2] : match[1]);
      });
    });

    const titles = {
      'index.html': ['Operations Support', '前線故障報告'],
      'report.html': ['Report an Issue', '報告故障'],
      'issues.html': ['Open Issues', '未完成問題'],
      'history.html': ['Issue History', '問題記錄'],
      'completed.html': ['Completed Issues', '已完成問題'],
      'edit.html': ['Edit Issue', '更新問題'],
      'success.html': ['Report Submitted', '報告已提交'],
      'settings.html': ['Settings', '設定']
    };
    const pageTitle = titles[location.pathname.split('/').pop()] || titles['index.html'];
    const version = document.title.match(/v\d+\.\d+\.\d+/)?.[0] || '';
    document.title = `${pageTitle[language === 'zh' ? 1 : 0]} ${version}`.trim();

    const header = $('.header');
    if (header && location.pathname.split('/').pop() !== 'settings.html') {
      let link = $('.settings-link');
      if (!link) {
        link = document.createElement('a');
        link.className = 'settings-link';
        link.href = 'settings.html';
        header.append(link);
      }
      link.setAttribute('aria-label', language === 'zh' ? '語言設定' : 'Language settings');
      link.title = language === 'zh' ? '設定' : 'Settings';
      link.textContent = language === 'zh' ? '設定' : 'Settings';
      link.onclick = () => sessionStorage.setItem('ops_settings_return', `${location.pathname.split('/').pop()}${location.search}`);
    }

    document.querySelectorAll('[data-en-placeholder][data-zh-placeholder]').forEach(field => {
      field.placeholder = language === 'zh' ? field.dataset.zhPlaceholder : field.dataset.enPlaceholder;
    });
  }

  function fmt(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    if (getLanguage() === 'zh') {
      return new Intl.DateTimeFormat('zh-HK', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
      }).format(date);
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} | ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function statusClass(value) {
    return value === 'Operation Suspended' ? 'suspended' : value === 'Limited Operation' ? 'limited' : 'no-impact';
  }

  async function latest() {
    try {
      const response = await fetch(`./version.json?t=${Date.now()}`, { cache: 'no-store' });
      const version = await response.json();
      if (version.version !== V && version.forceUpdate) {
        const overlay = $('#updateOverlay');
        overlay?.classList.add('show');
        const updateButton = overlay?.querySelector('button');
        updateButton?.focus();
        if (overlay) overlay.onkeydown = event => {
          if (event.key === 'Escape') {
            event.preventDefault();
            return;
          }
          if (event.key === 'Tab') {
            event.preventDefault();
            updateButton?.focus();
          }
        };
        return false;
      }
    } catch {}
    return true;
  }

  applyLanguage();
  window.OPS = { V, K, C, get, set, fmt, statusClass, latest, getLanguage, LANGUAGE_KEY };
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js', { updateViaCache: 'none' }).catch(() => {});
})();
