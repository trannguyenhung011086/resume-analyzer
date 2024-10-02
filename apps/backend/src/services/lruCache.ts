type LRUCacheProviderOptions = {
  ttl: number; // Time to live in milliseconds
  itemLimit: number;
};
type LRUCacheProvider<T> = {
  has: (key: string) => boolean;
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
};
type CacheEntry<V> = {
  value: V;
  expiry: number;
};

export function createLRUCacheProvider<T>({ ttl, itemLimit }: LRUCacheProviderOptions): LRUCacheProvider<T> {
  const cache = new Map<string, CacheEntry<T>>();

  return {
    has: (key: string) => {
      const entry = cache.get(key);

      if (!entry) {
        return false;
      }

      if (entry.expiry < Date.now()) {
        cache.delete(key);
        return false;
      }

      // Move accessed item to the end (most recently used)
      cache.delete(key);
      cache.set(key, { ...entry, expiry: Date.now() + ttl });
      return true;
    },
    get: (key: string) => {
      const entry = cache.get(key);

      if (!entry) {
        return undefined;
      }

      if (entry.expiry < Date.now()) {
        cache.delete(key);
        return undefined;
      }

      // Move accessed item to the end (most recently used)
      cache.delete(key);
      cache.set(key, { ...entry, expiry: Date.now() + ttl });

      return entry.value;
    },
    set: (key: string, value: T) => {
      const entry = cache.get(key);
      if (entry) {
        cache.delete(key);
      }

      // Get the first item (least used)
      if (cache.size >= itemLimit) {
        const lruKey = cache.keys().next().value;
        if (lruKey) cache.delete(lruKey);
      }

      cache.set(key, {
        value,
        expiry: Date.now() + ttl,
      });
    },
  };
}

const lruCache = createLRUCacheProvider({
  ttl: 86_400_000 * 3, // 3 days
  itemLimit: 50,
});
export default lruCache;
