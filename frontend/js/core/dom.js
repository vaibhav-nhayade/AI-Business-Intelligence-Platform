/**
 * AI Business Intelligence Platform
 * DOM Utilities
 *
 * Small, reusable helpers for common DOM operations.
 *
 * This module intentionally wraps only operations that
 * improve consistency across the application.
 */

/**
 * Select a single DOM element.
 *
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element|null}
 */
export function select(selector, scope = document) {
    if (!selector || !scope) {
        return null;
    }

    return scope.querySelector(selector);
}


/**
 * Select multiple DOM elements.
 *
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element[]}
 */
export function selectAll(selector, scope = document) {
    if (!selector || !scope) {
        return [];
    }

    return Array.from(scope.querySelectorAll(selector));
}


/**
 * Find an element by ID.
 *
 * @param {string} id
 * @returns {HTMLElement|null}
 */
export function getById(id) {
    if (!id) {
        return null;
    }

    return document.getElementById(id);
}


/**
 * Create a DOM element.
 *
 * @param {string} tagName
 * @param {Object} [attributes]
 * @param {string} [textContent]
 * @returns {HTMLElement}
 */
export function createElement(
    tagName,
    attributes = {},
    textContent = ''
) {
    const element = document.createElement(tagName);

    Object.entries(attributes).forEach(([attribute, value]) => {
        if (value === null || value === undefined) {
            return;
        }

        element.setAttribute(attribute, String(value));
    });

    if (textContent !== '') {
        element.textContent = textContent;
    }

    return element;
}


/**
 * Safely update text content.
 *
 * @param {Element|null} element
 * @param {string|number} value
 */
export function setText(element, value) {
    if (!element) {
        return;
    }

    element.textContent = value ?? '';
}


/**
 * Safely update HTML content.
 *
 * Use this only when the HTML source is trusted.
 *
 * @param {Element|null} element
 * @param {string} html
 */
export function setHTML(element, html) {
    if (!element) {
        return;
    }

    element.innerHTML = html ?? '';
}


/**
 * Add one or more classes.
 *
 * @param {Element|null} element
 * @param {...string} classNames
 */
export function addClass(element, ...classNames) {
    if (!element) {
        return;
    }

    element.classList.add(
        ...classNames.filter(Boolean)
    );
}


/**
 * Remove one or more classes.
 *
 * @param {Element|null} element
 * @param {...string} classNames
 */
export function removeClass(element, ...classNames) {
    if (!element) {
        return;
    }

    element.classList.remove(
        ...classNames.filter(Boolean)
    );
}


/**
 * Toggle a class.
 *
 * @param {Element|null} element
 * @param {string} className
 * @param {boolean} [force]
 * @returns {boolean}
 */
export function toggleClass(
    element,
    className,
    force
) {
    if (!element || !className) {
        return false;
    }

    return element.classList.toggle(className, force);
}


/**
 * Check whether an element contains a class.
 *
 * @param {Element|null} element
 * @param {string} className
 * @returns {boolean}
 */
export function hasClass(element, className) {
    if (!element || !className) {
        return false;
    }

    return element.classList.contains(className);
}


/**
 * Show an element.
 *
 * @param {HTMLElement|null} element
 * @param {string} [display='']
 */
export function show(element, display = '') {
    if (!element) {
        return;
    }

    element.hidden = false;
    element.style.display = display;
}


/**
 * Hide an element.
 *
 * @param {HTMLElement|null} element
 */
export function hide(element) {
    if (!element) {
        return;
    }

    element.hidden = true;
    element.style.removeProperty('display');
}


/**
 * Check whether an element exists in the DOM.
 *
 * @param {Element|null} element
 * @returns {boolean}
 */
export function exists(element) {
    return element instanceof Element;
}


/**
 * Check whether an element is visible.
 *
 * @param {Element|null} element
 * @returns {boolean}
 */
export function isVisible(element) {
    if (!element) {
        return false;
    }

    return !element.hidden &&
        element.getAttribute('aria-hidden') !== 'true';
}


/**
 * Remove an element from the DOM.
 *
 * @param {Element|null} element
 */
export function remove(element) {
    if (!element) {
        return;
    }

    element.remove();
}