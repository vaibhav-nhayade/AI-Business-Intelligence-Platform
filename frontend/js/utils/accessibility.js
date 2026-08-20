/**
 * AI Business Intelligence Platform
 * Accessibility Utilities
 */


/**
 * Set an ARIA attribute safely.
 *
 * @param {Element|null} element
 * @param {string} attribute
 * @param {*} value
 */
export function setAria(
    element,
    attribute,
    value
) {
    if (
        !element ||
        !attribute
    ) {
        return;
    }

    element.setAttribute(
        `aria-${attribute}`,
        String(value)
    );
}


/**
 * Remove an ARIA attribute.
 *
 * @param {Element|null} element
 * @param {string} attribute
 */
export function removeAria(
    element,
    attribute
) {
    if (
        !element ||
        !attribute
    ) {
        return;
    }

    element.removeAttribute(
        `aria-${attribute}`
    );
}


/**
 * Update expanded state.
 *
 * @param {Element|null} element
 * @param {boolean} expanded
 */
export function setExpanded(
    element,
    expanded
) {
    setAria(
        element,
        'expanded',
        expanded
    );
}


/**
 * Update selected state.
 *
 * @param {Element|null} element
 * @param {boolean} selected
 */
export function setSelected(
    element,
    selected
) {
    setAria(
        element,
        'selected',
        selected
    );
}


/**
 * Set an element's busy state.
 *
 * @param {Element|null} element
 * @param {boolean} busy
 */
export function setBusy(
    element,
    busy
) {
    setAria(
        element,
        'busy',
        busy
    );
}


/**
 * Move keyboard focus to an element.
 *
 * @param {HTMLElement|null} element
 */
export function focusElement(element) {
    if (
        !element ||
        typeof element.focus !== 'function'
    ) {
        return;
    }

    element.focus({
        preventScroll: false
    });
}


/**
 * Check whether the user prefers reduced motion.
 *
 * @returns {boolean}
 */
export function prefersReducedMotion() {
    if (
        typeof window === 'undefined' ||
        typeof window.matchMedia !== 'function'
    ) {
        return false;
    }

    return window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;
}


/**
 * Get focusable elements within a container.
 *
 * @param {Element|null} container
 * @returns {HTMLElement[]}
 */
export function getFocusableElements(container) {
    if (!container) {
        return [];
    }

    const selector = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    return Array.from(
        container.querySelectorAll(selector)
    ).filter(element => {
        const styles =
            window.getComputedStyle(element);

        return styles.display !== 'none' &&
            styles.visibility !== 'hidden';
    });
}


/**
 * Create a basic focus trap for a modal/dialog.
 *
 * @param {HTMLElement|null} container
 * @returns {Function}
 */
export function createFocusTrap(container) {
    if (!container) {
        return () => {};
    }

    const handleKeydown = (event) => {
        if (event.key !== 'Tab') {
            return;
        }

        const focusable =
            getFocusableElements(container);

        if (focusable.length === 0) {
            event.preventDefault();
            return;
        }

        const first = focusable[0];
        const last =
            focusable[focusable.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === first
        ) {
            event.preventDefault();
            last.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === last
        ) {
            event.preventDefault();
            first.focus();
        }
    };

    container.addEventListener(
        'keydown',
        handleKeydown
    );

    return () => {
        container.removeEventListener(
            'keydown',
            handleKeydown
        );
    };
}