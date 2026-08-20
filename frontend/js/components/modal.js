/**
 * AI Business Intelligence Platform
 * Modal Component
 */

import {
    addClass,
    removeClass,
    getById
} from '../core/dom.js';

import {
    on
} from '../core/events.js';

import {
    setExpanded
} from '../utils/accessibility.js';


export class Modal {
    constructor(options = {}) {
        this.modal =
            options.modal ||
            getById(options.modalId);

        this.closeButtons =
            options.closeButtons ||
            [];

        this.closeOnBackdrop =
            options.closeOnBackdrop ?? true;

        this.closeOnEscape =
            options.closeOnEscape ?? true;

        this.cleanupFunctions = [];
    }


    /**
     * Initialize modal.
     *
     * @returns {Modal}
     */
    init() {
        if (!this.modal) {
            return this;
        }

        this.bindEvents();

        return this;
    }


    /**
     * Bind modal events.
     */
    bindEvents() {
        this.closeButtons.forEach(
            button => {
                const element =
                    typeof button === 'string'
                        ? getById(button)
                        : button;

                if (!element) {
                    return;
                }

                const cleanup = on(
                    element,
                    'click',
                    () => this.close()
                );

                if (cleanup) {
                    this.cleanupFunctions.push(
                        cleanup
                    );
                }
            }
        );


        if (this.closeOnBackdrop) {
            const cleanup = on(
                this.modal,
                'click',
                event => {
                    if (
                        event.target ===
                        this.modal
                    ) {
                        this.close();
                    }
                }
            );

            if (cleanup) {
                this.cleanupFunctions.push(
                    cleanup
                );
            }
        }


        if (this.closeOnEscape) {
            const cleanup = on(
                document,
                'keydown',
                event => {
                    if (
                        event.key === 'Escape' &&
                        this.isOpen()
                    ) {
                        this.close();
                    }
                }
            );

            if (cleanup) {
                this.cleanupFunctions.push(
                    cleanup
                );
            }
        }
    }


    /**
     * Open modal.
     */
    open() {
        if (!this.modal) {
            return;
        }

        addClass(this.modal, 'open');

        setExpanded(
            this.modal,
            true
        );

        document.body.classList.add(
            'modal-open'
        );
    }


    /**
     * Close modal.
     */
    close() {
        if (!this.modal) {
            return;
        }

        removeClass(this.modal, 'open');

        setExpanded(
            this.modal,
            false
        );

        document.body.classList.remove(
            'modal-open'
        );
    }


    /**
     * Toggle modal.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }


    /**
     * Check modal state.
     *
     * @returns {boolean}
     */
    isOpen() {
        return this.modal?.classList.contains(
            'open'
        ) ?? false;
    }


    /**
     * Destroy listeners.
     */
    destroy() {
        this.cleanupFunctions.forEach(
            cleanup => cleanup?.()
        );

        this.cleanupFunctions = [];
    }
}