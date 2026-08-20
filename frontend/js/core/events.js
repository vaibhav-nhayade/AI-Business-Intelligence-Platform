/**
 * AI Business Intelligence Platform
 * Event Utilities
 *
 * Centralized event listener helpers for reusable
 * and predictable event management.
 */


/**
 * Attach an event listener.
 *
 * @param {EventTarget|null} target
 * @param {string} event
 * @param {EventListener} handler
 * @param {AddEventListenerOptions|boolean} [options]
 * @returns {Function|null}
 */
export function on(
    target,
    event,
    handler,
    options
) {
    if (
        !target ||
        !event ||
        typeof handler !== 'function'
    ) {
        return null;
    }

    target.addEventListener(
        event,
        handler,
        options
    );

    return () => off(
        target,
        event,
        handler,
        options
    );
}


/**
 * Remove an event listener.
 *
 * @param {EventTarget|null} target
 * @param {string} event
 * @param {EventListener} handler
 * @param {EventListenerOptions|boolean} [options]
 */
export function off(
    target,
    event,
    handler,
    options
) {
    if (
        !target ||
        !event ||
        typeof handler !== 'function'
    ) {
        return;
    }

    target.removeEventListener(
        event,
        handler,
        options
    );
}


/**
 * Attach an event listener that runs only once.
 *
 * @param {EventTarget|null} target
 * @param {string} event
 * @param {EventListener} handler
 * @param {AddEventListenerOptions|boolean} [options]
 * @returns {Function|null}
 */
export function once(
    target,
    event,
    handler,
    options = {}
) {
    if (
        !target ||
        !event ||
        typeof handler !== 'function'
    ) {
        return null;
    }

    const onceOptions =
        typeof options === 'boolean'
            ? { once: true }
            : { ...options, once: true };

    return on(
        target,
        event,
        handler,
        onceOptions
    );
}


/**
 * Event delegation.
 *
 * Useful for dynamic lists where child elements may
 * be created after the listener is attached.
 *
 * @param {EventTarget|null} parent
 * @param {string} event
 * @param {string} selector
 * @param {Function} handler
 * @param {AddEventListenerOptions|boolean} [options]
 * @returns {Function|null}
 */
export function delegate(
    parent,
    event,
    selector,
    handler,
    options
) {
    if (
        !parent ||
        !event ||
        !selector ||
        typeof handler !== 'function'
    ) {
        return null;
    }

    const listener = (eventObject) => {
        const target = eventObject.target;

        if (!(target instanceof Element)) {
            return;
        }

        const matchedElement =
            target.closest(selector);

        if (
            !matchedElement ||
            !parent.contains(matchedElement)
        ) {
            return;
        }

        handler(eventObject, matchedElement);
    };

    return on(
        parent,
        event,
        listener,
        options
    );
}


/**
 * Dispatch a custom application event.
 *
 * @param {string} eventName
 * @param {*} [detail]
 * @param {EventTarget} [target=document]
 * @returns {boolean}
 */
export function emit(
    eventName,
    detail = {},
    target = document
) {
    if (
        !target ||
        !eventName
    ) {
        return false;
    }

    return target.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}


/**
 * Subscribe to a custom application event.
 *
 * @param {string} eventName
 * @param {EventListener} handler
 * @param {EventTarget} [target=document]
 * @returns {Function|null}
 */
export function onCustom(
    eventName,
    handler,
    target = document
) {
    return on(
        target,
        eventName,
        handler
    );
}