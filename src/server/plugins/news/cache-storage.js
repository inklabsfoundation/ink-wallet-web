const cache = require("memory-cache");
const config = require("electrode-confippet").config;

class CacheStorage {
  static get(key) {
    return cache.get(key);
  }

  static put(key, value) {
    cache.put(key, value, config.settings.newsCacheTimeoutMilliseconds);
  }
}

module.exports = CacheStorage;
