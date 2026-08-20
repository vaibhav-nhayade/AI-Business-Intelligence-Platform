/**
 * AI Business Intelligence Platform
 * Formatting Utilities
 *
 * Centralized formatting for Indian business data.
 */

import { LOCALE } from '../config/constants.js';


/* =========================================================
   CURRENCY
========================================================= */

/**
 * Format a value as Indian Rupees.
 *
 * Example:
 * 1250000 → ₹12,50,000
 *
 * @param {number} value
 * @param {Object} options
 * @returns {string}
 */
export function formatCurrency(value, options = {}) {
    const {
        maximumFractionDigits = 0,
        minimumFractionDigits = 0,
        compact = false
    } = options;

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '₹0';
    }

    if (compact) {
        return new Intl.NumberFormat(
            LOCALE.NUMBER_LOCALE,
            {
                style: 'currency',
                currency: LOCALE.CURRENCY,
                notation: 'compact',
                maximumFractionDigits
            }
        ).format(numericValue);
    }

    return new Intl.NumberFormat(
        LOCALE.NUMBER_LOCALE,
        {
            style: 'currency',
            currency: LOCALE.CURRENCY,
            maximumFractionDigits,
            minimumFractionDigits
        }
    ).format(numericValue);
}


/**
 * Format large Indian currency values.
 *
 * Examples:
 * 150000 → ₹1.50 L
 * 12500000 → ₹1.25 Cr
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatIndianCurrency(
    value,
    decimals = 2
) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '₹0';
    }

    const absoluteValue = Math.abs(numericValue);

    let divisor = 1;
    let suffix = '';

    if (absoluteValue >= 10000000) {
        divisor = 10000000;
        suffix = ' Cr';
    } else if (absoluteValue >= 100000) {
        divisor = 100000;
        suffix = ' L';
    } else if (absoluteValue >= 1000) {
        divisor = 1000;
        suffix = ' K';
    }

    const formattedValue =
        (numericValue / divisor).toLocaleString(
            'en-IN',
            {
                minimumFractionDigits:
                    divisor === 1 ? 0 : decimals,
                maximumFractionDigits:
                    divisor === 1 ? 0 : decimals
            }
        );

    return `₹${formattedValue}${suffix}`;
}


/* =========================================================
   NUMBER
========================================================= */

/**
 * Format numbers using Indian numbering.
 *
 * Example:
 * 1250000 → 12,50,000
 *
 * @param {number} value
 * @param {Object} options
 * @returns {string}
 */
export function formatNumber(value, options = {}) {
    const {
        maximumFractionDigits = 0,
        minimumFractionDigits = 0
    } = options;

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '0';
    }

    return new Intl.NumberFormat(
        LOCALE.NUMBER_LOCALE,
        {
            maximumFractionDigits,
            minimumFractionDigits
        }
    ).format(numericValue);
}


/**
 * Format a number using compact notation.
 *
 * @param {number} value
 * @param {number} maximumFractionDigits
 * @returns {string}
 */
export function formatCompactNumber(
    value,
    maximumFractionDigits = 1
) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '0';
    }

    return new Intl.NumberFormat(
        LOCALE.NUMBER_LOCALE,
        {
            notation: 'compact',
            maximumFractionDigits
        }
    ).format(numericValue);
}


/* =========================================================
   PERCENTAGE
========================================================= */

/**
 * Format percentage.
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercentage(
    value,
    decimals = 1
) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '0%';
    }

    return `${numericValue.toFixed(decimals)}%`;
}


/**
 * Format percentage change with sign.
 *
 * Example:
 * 12.5 → +12.5%
 * -4.2 → -4.2%
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercentageChange(
    value,
    decimals = 1
) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '0%';
    }

    const sign = numericValue > 0
        ? '+'
        : '';

    return `${sign}${numericValue.toFixed(decimals)}%`;
}


/* =========================================================
   DATE
========================================================= */

/**
 * Format a date using Indian locale.
 *
 * @param {string|Date|number} value
 * @param {Object} options
 * @returns {string}
 */
export function formatDate(
    value,
    options = {}
) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    const {
        dateStyle = 'medium'
    } = options;

    return new Intl.DateTimeFormat(
        LOCALE.DATE_LOCALE,
        {
            dateStyle
        }
    ).format(date);
}


/**
 * Format date and time.
 *
 * @param {string|Date|number} value
 * @returns {string}
 */
export function formatDateTime(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    return new Intl.DateTimeFormat(
        LOCALE.DATE_LOCALE,
        {
            dateStyle: 'medium',
            timeStyle: 'short'
        }
    ).format(date);
}


/* =========================================================
   TEXT
========================================================= */

/**
 * Convert a string to title case.
 *
 * @param {*} value
 * @returns {string}
 */
export function toTitleCase(value) {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value)
        .toLowerCase()
        .replace(/\b\w/g, character =>
            character.toUpperCase()
        );
}


/**
 * Truncate text safely.
 *
 * @param {*} value
 * @param {number} maxLength
 * @param {string} suffix
 * @returns {string}
 */
export function truncate(
    value,
    maxLength = 100,
    suffix = '…'
) {
    const text = String(value ?? '');

    if (text.length <= maxLength) {
        return text;
    }

    return text.slice(
        0,
        Math.max(0, maxLength - suffix.length)
    ) + suffix;
}


/* =========================================================
   STATUS
========================================================= */

/**
 * Format a business status for display.
 *
 * @param {*} value
 * @returns {string}
 */
export function formatStatus(value) {
    if (value === null || value === undefined) {
        return 'Unknown';
    }

    return toTitleCase(
        String(value).replace(/[-_]/g, ' ')
    );
}