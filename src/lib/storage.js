const keyFor = (testId) => `epizod:${testId}`;

export function loadRun(testId) {
  try {
    const raw = sessionStorage.getItem(keyFor(testId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveRun(testId, run) {
  sessionStorage.setItem(keyFor(testId), JSON.stringify(run));
}

export function clearRun(testId) {
  sessionStorage.removeItem(keyFor(testId));
}
