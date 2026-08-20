/**
 * AI Business Intelligence Platform
 * Validation Utilities
 */


/**
 * Check whether a value is empty.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isRequired(value) {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === 'string') {
        return value.trim().length > 0;
    }

    return true;
}


/**
 * Validate an email address.
 *
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email.trim());
}


/**
 * Validate a number.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isValidNumber(value) {
    if (
        value === null ||
        value === '' ||
        value === undefined
    ) {
        return false;
    }

    return Number.isFinite(Number(value));
}


/**
 * Validate a positive number.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
    return isValidNumber(value) &&
        Number(value) > 0;
}


/**
 * Validate an integer.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isInteger(value) {
    if (!isValidNumber(value)) {
        return false;
    }

    return Number.isInteger(Number(value));
}


/**
 * Validate a value against a numeric range.
 *
 * @param {*} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isInRange(
    value,
    min,
    max
) {
    if (!isValidNumber(value)) {
        return false;
    }

    const numericValue = Number(value);

    return numericValue >= min &&
        numericValue <= max;
}


/**
 * Validate a percentage.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isValidPercentage(value) {
    return isInRange(value, 0, 100);
}


/**
 * Validate a date.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isValidDate(value) {
    if (!value) {
        return false;
    }

    const date = new Date(value);

    return !Number.isNaN(date.getTime());
}


/**
 * Validate a date range.
 *
 * @param {*} startDate
 * @param {*} endDate
 * @returns {boolean}
 */
export function isValidDateRange(
    startDate,
    endDate
) {
    if (
        !isValidDate(startDate) ||
        !isValidDate(endDate)
    ) {
        return false;
    }

    return new Date(startDate) <=
        new Date(endDate);
}


/**
 * Validate a form field.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|null} field
 * @returns {Object}
 */
export function validateField(field) {
    if (!field) {
        return {
            valid: false,
            message: 'Field not found.'
        };
    }

    const value = field.value;

    if (
        field.required &&
        !isRequired(value)
    ) {
        return {
            valid: false,
            message: 'This field is required.'
        };
    }

    if (
        field.type === 'email' &&
        value &&
        !isValidEmail(value)
    ) {
        return {
            valid: false,
            message: 'Please enter a valid email address.'
        };
    }

    if (
        field.type === 'number' &&
        value &&
        !isValidNumber(value)
    ) {
        return {
            valid: false,
            message: 'Please enter a valid number.'
        };
    }

    return {
        valid: true,
        message: ''
    };
}