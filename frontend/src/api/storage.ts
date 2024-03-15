const memoryStorage = new Map<string, string>();

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const fallbackStorage: StorageLike = {
  getItem: (key) => memoryStorage.get(key) ?? null,
  setItem: (key, value) => memoryStorage.set(key, value),
  removeItem: (key) => memoryStorage.delete(key),
};

/** localStorage를 사용할 수 없을 때도 화면 흐름을 유지하도록 메모리 저장소를 반환한다. */
export function getStorage(): StorageLike {
  if (typeof window === "undefined") return fallbackStorage;

  try {
    const probe = "__capybara_storage_probe__";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return fallbackStorage;
  }
}

/**
 * 저장된 JSON을 읽고 파싱 실패 시 손상 값을 제거한 뒤 안전한 초기값으로 복구한다.
 *
 * @param key 모드와 스키마 버전을 포함한 저장 키
 * @param fallback 값이 없거나 손상됐을 때 사용할 초기값
 */
export function readStored<T>(key: string, fallback: T): T {
  const raw = getStorage().getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    getStorage().removeItem(key);
    return fallback;
  }
}

/** 값을 JSON으로 직렬화해 현재 사용 가능한 저장소에 기록한다. */
export function writeStored<T>(key: string, value: T): void {
  getStorage().setItem(key, JSON.stringify(value));
}
