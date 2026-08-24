document.querySelectorAll('.abstract-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.classList.toggle('active', !expanded);
    panel.hidden = expanded;
  });
});

document.querySelectorAll('.email-copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const email = button.dataset.email;
    const status = button.parentElement.querySelector('.email-copy-status');

    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }

    button.classList.add('copied');
    status.textContent = 'Email address copied';

    window.setTimeout(() => {
      button.classList.remove('copied');
      status.textContent = '';
    }, 1300);
  });
});

document.querySelectorAll('.drag-scroll').forEach((slider) => {
  let active = false;
  let dragged = false;
  let startX = 0;
  let startScroll = 0;

  slider.addEventListener('pointerdown', (event) => {
    active = true;
    dragged = false;
    startX = event.clientX;
    startScroll = slider.scrollLeft;
    slider.classList.add('dragging');
    slider.setPointerCapture(event.pointerId);
  });

  slider.addEventListener('pointermove', (event) => {
    if (!active) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 4) dragged = true;
    slider.scrollLeft = startScroll - distance;
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
    slider.addEventListener(eventName, () => {
      active = false;
      slider.classList.remove('dragging');
    });
  });

  slider.addEventListener('click', (event) => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  }, true);

  slider.addEventListener('keydown', (event) => {
    const distance = Math.min(slider.clientWidth * 0.75, 280);

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      slider.scrollBy({ left: distance, behavior: 'smooth' });
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      slider.scrollBy({ left: -distance, behavior: 'smooth' });
    }
  });
});

const themeToggle = document.querySelector('.theme-toggle');
let themeShiftTimer;
const root = document.documentElement;

function updateThemeControl(theme) {
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to day mode' : 'Switch to night mode');
}

function applyTheme(theme, mode) {
  root.dataset.theme = theme;
  root.dataset.themeMode = mode;
  updateThemeControl(theme);
}

updateThemeControl(root.dataset.theme || 'light');

themeToggle.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme, 'manual');

  // Restart the spin even when the button is clicked repeatedly.
  themeToggle.classList.remove('spin');
  void themeToggle.offsetWidth;
  themeToggle.classList.add('spin');

  // Let the colours cascade in rather than snapping over at once.
  root.classList.add('theme-shift');
  window.clearTimeout(themeShiftTimer);
  themeShiftTimer = window.setTimeout(() => root.classList.remove('theme-shift'), 700);

  try {
    localStorage.setItem('monir-theme-preference', theme);
  } catch (error) {
    // The theme still changes when storage is unavailable.
  }
});

function followLocalTheme() {
  if (root.dataset.themeMode === 'manual') return;
  const preference = window.getPreferredTheme();
  applyTheme(preference.theme, preference.mode);
}

window.setInterval(followLocalTheme, 60_000);
