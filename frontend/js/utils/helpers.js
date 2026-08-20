/**
 * AI Business Intelligence Platform
 * Generic Utility Helpers
 */


/**
 * Delay execution until calls stop occurring.
 *
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(
    callback,
    delay = 250
) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}


/**
 * Limit execution frequency.
 *
 * @param {Function} callback
 * @param {number} interval
 * @returns {Function}
 */
export function throttle(
    callback,
    interval = 250
) {
    let lastExecution = 0;
    let timeoutId = null;

    return function (...args) {
        const now = Date.now();
        const remaining =
            interval -
            (now - lastExecution);

        if (remaining <= 0) {
            clearTimeout(timeoutId);
            timeoutId = null;

            lastExecution = now;

            callback.apply(this, args);
            return;
        }

        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastExecution = Date.now();
                timeoutId = null;

                callback.apply(this, args);
            }, remaining);
        }
    };
}


/**
 * Clamp a number between minimum and maximum.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(
    value,
    min,
    max
) {
    return Math.min(
        Math.max(value, min),
        max
    );
}


/**
 * Check whether a value is an object.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isObject(value) {
    return value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value);
}


/**
 * Check whether a value is empty.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return false;
}


/**
 * Safely parse JSON.
 *
 * @param {string} value
 * @param {*} fallback
 * @returns {*}
 */
export function safeJsonParse(
    value,
    fallback = null
) {
    if (typeof value !== 'string') {
        return fallback;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}


/**
 * Generate a unique identifier.
 *
 * @param {string} prefix
 * @returns {string}
 */
export function generateId(
    prefix = 'id'
) {
    const randomPart =
        Math.random()
            .toString(36)
            .slice(2, 9);

    return `${prefix}-${Date.now()}-${randomPart}`;
}


/**
 * Wait for a specified duration.
 *
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */
export function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


/**
 * Execute a callback when the DOM is ready.
 *
 * @param {Function} callback
 */
export function onDOMReady(callback) {
    if (typeof callback !== 'function') {
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            callback,
            { once: true }
        );

        return;
    }

    callback();
}