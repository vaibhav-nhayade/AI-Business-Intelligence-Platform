/**
 * AI Business Intelligence Platform
 * Dropdown Component
 */

import {
    addClass,
    removeClass,
    select
} from '../core/dom.js';

import {
    on
} from '../core/events.js';

import {
    setExpanded
} from '../utils/accessibility.js';


export class Dropdown {
    constructor(trigger, menu, options = {}) {
        this.trigger =
            typeof trigger === 'string'
                ? select(trigger)
                : trigger;

        this.menu =
            typeof menu === 'string'
                ? select(menu)
                : menu;

        this.closeOnOutsideClick =
            options.closeOnOutsideClick ?? true;

        this.closeOnEscape =
            options.closeOnEscape ?? true;

        this.cleanupFunctions = [];
    }


    /**
     * Initialize dropdown.
     *
     * @returns {Dropdown}
     */
    init() {
        if (!this.trigger || !this.menu) {
            return this;
        }

        this.bindEvents();
        this.syncAccessibility();

        return this;
    }


    /**
     * Attach events.
     */
    bindEvents() {
        const triggerCleanup = on(
            this.trigger,
            'click',
            event => {
                event.stopPropagation();
                this.toggle();
            }
        );

        if (triggerCleanup) {
            this.cleanupFunctions.push(
                triggerCleanup
            );
        }


        const menuCleanup = on(
            this.menu,
            'click',
            event => {
                event.stopPropagation();
            }
        );

        if (menuCleanup) {
            this.cleanupFunctions.push(
                menuCleanup
            );
        }


        if (this.closeOnOutsideClick) {
            const outsideCleanup = on(
                document,
                'click',
                () => this.close()
            );

            if (outsideCleanup) {
                this.cleanupFunctions.push(
                    outsideCleanup
                );
            }
        }


        if (this.closeOnEscape) {
            const escapeCleanup = on(
                document,
                'keydown',
                event => {
                    if (event.key === 'Escape') {
                        this.close();
                    }
                }
            );

            if (escapeCleanup) {
                this.cleanupFunctions.push(
                    escapeCleanup
                );
            }
        }
    }


    /**
     * Open dropdown.
     */
    open() {
        addClass(this.menu, 'open');
        this.syncAccessibility();
    }


    /**
     * Close dropdown.
     */
    close() {
        removeClass(this.menu, 'open');
        this.syncAccessibility();
    }


    /**
     * Toggle dropdown.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }


    /**
     * Check dropdown state.
     *
     * @returns {boolean}
     */
    isOpen() {
        return this.menu?.classList.contains('open') ?? false;
    }


    /**
     * Update accessibility state.
     */
    syncAccessibility() {
        setExpanded(
            this.trigger,
            this.isOpen()
        );
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