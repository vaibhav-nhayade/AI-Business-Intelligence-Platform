/**
 * AI Business Intelligence Platform
 * Sidebar Component
 */

import {
    select,
    selectAll,
    getById,
    addClass,
    removeClass
} from '../core/dom.js';

import {
    on
} from '../core/events.js';

import {
    setExpanded
} from '../utils/accessibility.js';


/**
 * Sidebar component.
 *
 * Handles:
 * - Desktop navigation state
 * - Mobile sidebar
 * - Sidebar backdrop
 * - Active navigation item
 * - Navigation callbacks
 */
export class Sidebar {
    constructor(options = {}) {
        this.sidebar = select(
            options.sidebarSelector || '.sidebar'
        );

        this.hamburger = getById(
            options.hamburgerId || 'hamburgerBtn'
        );

        this.backdrop = getById(
            options.backdropId || 'sidebarBackdrop'
        );

        this.navItems = selectAll(
            options.navItemSelector || '.nav-item'
        );

        this.onNavigate =
            typeof options.onNavigate === 'function'
                ? options.onNavigate
                : null;

        this.cleanupFunctions = [];
    }


    /**
     * Initialize the component.
     *
     * @returns {Sidebar}
     */
    init() {
        if (!this.sidebar) {
            return this;
        }

        this.bindEvents();
        this.syncAccessibility();

        return this;
    }


    /**
     * Attach sidebar events.
     */
    bindEvents() {
        if (this.hamburger) {
            this.cleanupFunctions.push(
                on(
                    this.hamburger,
                    'click',
                    () => this.toggle()
                )
            );
        }

        if (this.backdrop) {
            this.cleanupFunctions.push(
                on(
                    this.backdrop,
                    'click',
                    () => this.close()
                )
            );
        }

        this.navItems.forEach(item => {
            const cleanup = on(
                item,
                'click',
                () => {
                    const page =
                        item.dataset.page;

                    if (this.onNavigate) {
                        this.onNavigate(page);
                    }

                    this.setActive(page);
                    this.close();
                }
            );

            if (cleanup) {
                this.cleanupFunctions.push(cleanup);
            }
        });
    }


    /**
     * Open the sidebar.
     */
    open() {
        if (!this.sidebar) {
            return;
        }

        addClass(this.sidebar, 'open');

        if (this.backdrop) {
            addClass(this.backdrop, 'open');
        }

        this.syncAccessibility();
    }


    /**
     * Close the sidebar.
     */
    close() {
        if (!this.sidebar) {
            return;
        }

        removeClass(this.sidebar, 'open');

        if (this.backdrop) {
            removeClass(this.backdrop, 'open');
        }

        this.syncAccessibility();
    }


    /**
     * Toggle sidebar state.
     */
    toggle() {
        if (!this.sidebar) {
            return;
        }

        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }


    /**
     * Check whether sidebar is open.
     *
     * @returns {boolean}
     */
    isOpen() {
        return this.sidebar?.classList.contains('open') ?? false;
    }


    /**
     * Set active navigation item.
     *
     * @param {string} pageKey
     */
    setActive(pageKey) {
        if (!pageKey) {
            return;
        }

        this.navItems.forEach(item => {
            const isActive =
                item.dataset.page === pageKey;

            item.classList.toggle(
                'active',
                isActive
            );
        });
    }


    /**
     * Update ARIA state.
     */
    syncAccessibility() {
        if (!this.hamburger) {
            return;
        }

        setExpanded(
            this.hamburger,
            this.isOpen()
        );
    }


    /**
     * Remove registered listeners.
     */
    destroy() {
        this.cleanupFunctions.forEach(
            cleanup => cleanup?.()
        );

        this.cleanupFunctions = [];
    }
}