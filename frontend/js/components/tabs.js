/**
 * AI Business Intelligence Platform
 * Toast Notification Component
 */

import {
    createElement,
    addClass
} from '../core/dom.js';

import {
    generateId
} from '../utils/helpers.js';


const DEFAULT_DURATION = 4000;


export class Toast {
    constructor(options = {}) {
        this.container =
            options.container ||
            this.createContainer();

        this.duration =
            options.duration ||
            DEFAULT_DURATION;
    }


    /**
     * Create toast container.
     *
     * @returns {HTMLElement}
     */
    createContainer() {
        let container =
            document.getElementById(
                'toastContainer'
            );

        if (container) {
            return container;
        }

        container = createElement(
            'div',
            {
                id: 'toastContainer',
                class: 'toast-container',
                role: 'region',
                'aria-live': 'polite',
                'aria-label': 'Notifications'
            }
        );

        document.body.appendChild(container);

        return container;
    }


    /**
     * Show a toast.
     *
     * @param {string} message
     * @param {Object} options
     */
    show(message, options = {}) {
        if (!message) {
            return null;
        }

        const {
            type = 'info',
            duration = this.duration,
            title = ''
        } = options;

        const toast = createElement(
            'div',
            {
                id: generateId('toast'),
                class: `toast toast-${type}`,
                role: 'status'
            }
        );

        if (title) {
            const titleElement =
                createElement(
                    'strong',
                    {
                        class: 'toast-title'
                    },
                    title
                );

            toast.appendChild(titleElement);
        }

        const messageElement =
            createElement(
                'span',
                {
                    class: 'toast-message'
                },
                message
            );

        toast.appendChild(messageElement);

        const closeButton =
            createElement(
                'button',
                {
                    type: 'button',
                    class: 'toast-close',
                    'aria-label': 'Dismiss notification'
                },
                '×'
            );

        closeButton.addEventListener(
            'click',
            () => this.dismiss(toast)
        );

        toast.appendChild(closeButton);

        this.container.appendChild(toast);

        requestAnimationFrame(() => {
            addClass(toast, 'show');
        });

        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(toast);
            }, duration);
        }

        return toast;
    }


    /**
     * Dismiss a toast.
     *
     * @param {HTMLElement} toast
     */
    dismiss(toast) {
        if (!toast) {
            return;
        }

        toast.classList.remove('show');

        setTimeout(() => {
            toast.remove();
        }, 200);
    }


    success(message, options = {}) {
        return this.show(
            message,
            {
                ...options,
                type: 'success'
            }
        );
    }


    error(message, options = {}) {
        return this.show(
            message,
            {
                ...options,
                type: 'error'
            }
        );
    }


    warning(message, options = {}) {
        return this.show(
            message,
            {
                ...options,
                type: 'warning'
            }
        );
    }


    info(message, options = {}) {
        return this.show(
            message,
            {
                ...options,
                type: 'info'
            }
        );
    }
}


/**
 * Shared application toast instance.
 */
export const toast = new Toast();