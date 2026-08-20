/**
 * AI Business Intelligence Platform
 * Header Component
 */

import {
    getById
} from '../core/dom.js';

import {
    on
} from '../core/events.js';

import {
    local
} from '../core/storage.js';

import {
    STORAGE_KEYS
} from '../config/constants.js';

import {
    Dropdown
} from './dropdown.js';


export class Header {
    constructor(options = {}) {
        this.themeButton =
            getById(
                options.themeButtonId || 'themeBtn'
            );

        this.filterButton =
            getById(
                options.filterButtonId ||
                'filterToggleBtn'
            );

        this.filtersPanel =
            getById(
                options.filtersPanelId ||
                'filtersPanel'
            );

        this.bellButton =
            getById(
                options.bellButtonId ||
                'bellBtn'
            );

        this.bellDropdown =
            getById(
                options.bellDropdownId ||
                'bellDropdown'
            );

        this.avatarButton =
            getById(
                options.avatarButtonId ||
                'avatarBtn'
            );

        this.avatarDropdown =
            getById(
                options.avatarDropdownId ||
                'avatarDropdown'
            );

        this.cleanupFunctions = [];
        this.dropdowns = [];
    }


    /**
     * Initialize header.
     *
     * @returns {Header}
     */
    init() {
        this.initializeDropdowns();
        this.bindTheme();
        this.bindFilters();
        this.restoreTheme();

        return this;
    }


    /**
     * Initialize header dropdowns.
     */
    initializeDropdowns() {
        if (
            this.bellButton &&
            this.bellDropdown
        ) {
            const bellDropdown =
                new Dropdown(
                    this.bellButton,
                    this.bellDropdown
                ).init();

            this.dropdowns.push(
                bellDropdown
            );
        }


        if (
            this.avatarButton &&
            this.avatarDropdown
        ) {
            const avatarDropdown =
                new Dropdown(
                    this.avatarButton,
                    this.avatarDropdown
                ).init();

            this.dropdowns.push(
                avatarDropdown
            );
        }
    }


    /**
     * Initialize theme switching.
     */
    bindTheme() {
        if (!this.themeButton) {
            return;
        }

        const cleanup = on(
            this.themeButton,
            'click',
            () => this.toggleTheme()
        );

        if (cleanup) {
            this.cleanupFunctions.push(cleanup);
        }
    }


    /**
     * Toggle light/dark theme.
     */
    toggleTheme() {
        const currentTheme =
            document.body.dataset.theme;

        const isLight =
            currentTheme === 'light';

        const nextTheme =
            isLight ? '' : 'light';

        document.body.dataset.theme =
            nextTheme;

        this.updateThemeButton(
            nextTheme
        );

        local.set(
            STORAGE_KEYS.THEME,
            nextTheme || 'dark'
        );
    }


    /**
     * Restore persisted theme.
     */
    restoreTheme() {
        const storedTheme =
            local.get(
                STORAGE_KEYS.THEME,
                'light'
            );

        const theme =
            storedTheme === 'dark'
                ? ''
                : 'light';

        document.body.dataset.theme =
            theme;

        this.updateThemeButton(theme);
    }


    /**
     * Update theme button text.
     *
     * @param {string} theme
     */
    updateThemeButton(theme) {
        if (!this.themeButton) {
            return;
        }

        this.themeButton.textContent =
            theme === 'light'
                ? '☀️ Light'
                : '🌙 Dark';
    }


    /**
     * Initialize filters toggle.
     */
    bindFilters() {
        if (
            !this.filterButton ||
            !this.filtersPanel
        ) {
            return;
        }

        const cleanup = on(
            this.filterButton,
            'click',
            () => {
                this.filtersPanel.classList.toggle(
                    'open'
                );
            }
        );

        if (cleanup) {
            this.cleanupFunctions.push(cleanup);
        }
    }


    /**
     * Destroy component.
     */
    destroy() {
        this.cleanupFunctions.forEach(
            cleanup => cleanup?.()
        );

        this.dropdowns.forEach(
            dropdown => dropdown.destroy()
        );

        this.cleanupFunctions = [];
        this.dropdowns = [];
    }
}