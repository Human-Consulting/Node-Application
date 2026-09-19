import '@testing-library/jest-dom';

// This Node build ships a broken `localStorage`/`sessionStorage` global (the
// experimental Web Storage API): even plain `node -e "localStorage.setItem(...)"`
// throws "not a function" without an explicit `--localstorage-file` flag.
// Because that global is already defined before jsdom's environment sets up,
// jsdom/vitest-environment-jsdom see the key as already present on globalThis
// and skip installing their own working Storage implementation over it — so
// `window.localStorage` ends up being the same broken object. Replace both
// with a minimal, real in-memory Storage implementation so tests can rely on
// localStorage/sessionStorage behaving normally.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

const installMemoryStorage = (target: typeof globalThis | Window) => {
  Object.defineProperty(target, 'localStorage', {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
  Object.defineProperty(target, 'sessionStorage', {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
};

installMemoryStorage(globalThis);
if (typeof window !== 'undefined') {
  installMemoryStorage(window);
}
