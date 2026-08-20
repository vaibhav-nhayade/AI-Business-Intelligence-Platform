/**
 * AI Business Intelligence Platform
 * Storage Utilities
 *
 * Safe abstraction over localStorage and sessionStorage.
 *
 * All stored objects are serialized as JSON.
 */


/**
 * Resolve the requested browser storage.
 *
 * @param {'local'|'session'} type
 * @returns {Storage|null}
 */
function getStorage(type) {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const storage =
            type === 'session'
                ? window.sessionStorage
                : window.localStorage;

        /*
         * Accessing storage may throw in restricted
         * browser environments, so verify that it works.
         */
        const testKey =
            '__insightiq_storage_test__';

        storage.setItem(testKey, '1');
        storage.removeItem(testKey);

        return storage;
    } catch {
        return null;
    }
}


/**
 * Store a value.
 *
 * @param {string} key
 * @param {*} value
 * @param {'local'|'session'} [type='local']
 * @returns {boolean}
 */
export function set(
    key,
    value,
    type = 'local'
) {
    if (!key) {
        return false;
    }

    const storage = getStorage(type);

    if (!storage) {
        return false;
    }

    try {
        storage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;
    } catch {
        return false;
    }
}


/**
 * Retrieve a stored value.
 *
 * @param {string} key
 * @param {*} [fallback=null]
 * @param {'local'|'session'} [type='local']
 * @returns {*}
 */
export function get(
    key,
    fallback = null,
    type = 'local'
) {
    if (!key) {
        return fallback;
    }

    const storage = getStorage(type);

    if (!storage) {
        return fallback;
    }

    try {
        const value = storage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);
    } catch {
        return fallback;
    }
}


/**
 * Remove a stored value.
 *
 * @param {string} key
 * @param {'local'|'session'} [type='local']
 * @returns {boolean}
 */
export function remove(
    key,
    type = 'local'
) {
    if (!key) {
        return false;
    }

    const storage = getStorage(type);

    if (!storage) {
        return false;
    }

    try {
        storage.removeItem(key);

        return true;
    } catch {
        return false;
    }
}


/**
 * Check whether a key exists.
 *
 * @param {string} key
 * @param {'local'|'session'} [type='local']
 * @returns {boolean}
 */
export function has(
    key,
    type = 'local'
) {
    if (!key) {
        return false;
    }

    const storage = getStorage(type);

    if (!storage) {
        return false;
    }

    return storage.getItem(key) !== null;
}


/**
 * Clear all application storage.
 *
 * @param {'local'|'session'} [type='local']
 * @returns {boolean}
 */
export function clear(type = 'local') {
    const storage = getStorage(type);

    if (!storage) {
        return false;
    }

    try {
        storage.clear();

        return true;
    } catch {
        return false;
    }
}


/**
 * Get all keys from the selected storage.
 *
 * @param {'local'|'session'} [type='local']
 * @returns {string[]}
 */
export function keys(type = 'local') {
    const storage = getStorage(type);

    if (!storage) {
        return [];
    }

    return Object.keys(storage);
}


/**
 * Convenience wrapper for localStorage.
 */
export const local = Object.freeze({
    set: (key, value) =>
        set(key, value, 'local'),

    get: (key, fallback = null) =>
        get(key, fallback, 'local'),

    remove: (key) =>
        remove(key, 'local'),

    has: (key) =>
        has(key, 'local'),

    clear: () =>
        clear('local'),

    keys: () =>
        keys('local')
});


/**
 * Convenience wrapper for sessionStorage.
 */
export const session = Object.freeze({
    set: (key, value) =>
        set(key, value, 'session'),

    get: (key, fallback = null) =>
        get(key, fallback, 'session'),

    remove: (key) =>
        remove(key, 'session'),

    has: (key) =>
        has(key, 'session'),

    clear: () =>
        clear('session'),

    keys: () =>
        keys('session')
});