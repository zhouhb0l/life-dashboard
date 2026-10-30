(function () {
  'use strict';

  const PASSCODE = 'go';
  const ACCESS_KEY = 'research-paper-progress.access-go';
  const gate = document.getElementById('tracker-access-gate');
  const form = document.getElementById('tracker-access-form');
  const input = document.getElementById('tracker-passcode');
  const error = document.getElementById('tracker-access-error');
  const workspace = document.getElementById('tracker-workspace');
  const lockButton = document.getElementById('tracker-lock-button');
  if (!gate || !form || !input || !error || !workspace) return;

  function clearError() {
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  }
  function focusSoon(callback) {
    if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(callback);
    else callback();
  }
  function unlock() {
    // Storage can be unavailable for local files or restricted browser sessions.
    try { window.sessionStorage.setItem(ACCESS_KEY, '1'); } catch (_) { /* Unlock this view regardless. */ }
    clearError();
    input.value = '';
    gate.hidden = true;
    gate.setAttribute('aria-hidden', 'true');
    workspace.hidden = false;
    workspace.inert = false;
    workspace.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('tracker-locked');
    focusSoon(function () {
      if (workspace.hidden) return;
      const target = document.getElementById('new-project') || document.getElementById('page-title');
      if (!target) return;
      if (target.id === 'page-title') target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }
  function lock(clearSession) {
    if (clearSession) {
      try { window.sessionStorage.removeItem(ACCESS_KEY); } catch (_) {
        try { window.sessionStorage.setItem(ACCESS_KEY, '0'); } catch (_) { /* Keep the current view locked. */ }
      }
    }
    document.querySelectorAll('dialog[open]').forEach(function (dialog) { dialog.close(); });
    clearError();
    input.value = '';
    workspace.hidden = true;
    workspace.inert = true;
    workspace.setAttribute('aria-hidden', 'true');
    gate.hidden = false;
    gate.setAttribute('aria-hidden', 'false');
    document.body.classList.add('tracker-locked');
    focusSoon(function () { if (!gate.hidden) input.focus(); });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value.trim() === PASSCODE) { unlock(); return; }
    error.textContent = 'Incorrect passcode.';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    input.select();
  });
  input.addEventListener('input', clearError);
  if (lockButton) lockButton.addEventListener('click', function (event) {
    event.preventDefault();
    lock(true);
  });

  let remembered = false;
  try { remembered = window.sessionStorage.getItem(ACCESS_KEY) === '1'; } catch (_) { /* Start at the gate. */ }
  if (remembered) unlock();
  else lock(false);
})();
