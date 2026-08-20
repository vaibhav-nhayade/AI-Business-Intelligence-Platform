/**
 * AI Business Intelligence Platform
 * Tabs Component
 */

import {
    selectAll,
    addClass,
    removeClass
} from '../core/dom.js';

import {
    on
} from '../core/events.js';

import {
    setSelected
} from '../utils/accessibility.js';


export class Tabs {
    constructor(options = {}) {
        this.container =
            typeof options.container === 'string'
                ? document.querySelector(
                    options.container
                )
                : options.container;

        this.tabSelector =
            options.tabSelector ||
            '[role="tab"]';

        this.panelSelector =
            options.panelSelector ||
            '[role="tabpanel"]';

        this.activeClass =
            options.activeClass ||
            'active';

        this.cleanupFunctions = [];
    }


    /**
     * Initialize tabs.
     *
     * @returns {Tabs}
     */
    init() {
        if (!this.container) {
            return this;
        }

        this.bindEvents();
        this.initializeState();

        return this;
    }


    /**
     * Get all tabs.
     *
     * @returns {Element[]}
     */
    getTabs() {
        return selectAll(
            this.tabSelector,
            this.container
        );
    }


    /**
     * Get all panels.
     *
     * @returns {Element[]}
     */
    getPanels() {
        return selectAll(
            this.panelSelector,
            this.container
        );
    }


    /**
     * Bind click and keyboard events.
     */
    bindEvents() {
        this.getTabs().forEach(tab => {
            const cleanup = on(
                tab,
                'click',
                () => {
                    this.activate(
                        tab.dataset.tab
                    );
                }
            );

            if (cleanup) {
                this.cleanupFunctions.push(
                    cleanup
                );
            }


            const keyCleanup = on(
                tab,
                'keydown',
                event => {
                    this.handleKeyboard(
                        event,
                        tab
                    );
                }
            );

            if (keyCleanup) {
                this.cleanupFunctions.push(
                    keyCleanup
                );
            }
        });
    }


    /**
     * Initialize active tab.
     */
    initializeState() {
        const activeTab =
            this.getTabs().find(
                tab =>
                    tab.classList.contains(
                        this.activeClass
                    )
            );

        if (activeTab) {
            this.activate(
                activeTab.dataset.tab
            );
            return;
        }

        const firstTab =
            this.getTabs()[0];

        if (firstTab) {
            this.activate(
                firstTab.dataset.tab
            );
        }
    }


    /**
     * Activate a tab.
     *
     * @param {string} tabId
     */
    activate(tabId) {
        if (!tabId) {
            return;
        }

        this.getTabs().forEach(tab => {
            const isActive =
                tab.dataset.tab === tabId;

            tab.classList.toggle(
                this.activeClass,
                isActive
            );

            setSelected(
                tab,
                isActive
            );

            tab.setAttribute(
                'tabindex',
                isActive ? '0' : '-1'
            );
        });


        this.getPanels().forEach(panel => {
            const isActive =
                panel.dataset.tabPanel === tabId;

            panel.hidden = !isActive;

            if (isActive) {
                addClass(
                    panel,
                    this.activeClass
                );
            } else {
                removeClass(
                    panel,
                    this.activeClass
                );
            }
        });
    }


    /**
     * Keyboard navigation.
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} currentTab
     */
    handleKeyboard(
        event,
        currentTab
    ) {
        const tabs = this.getTabs();

        if (!tabs.length) {
            return;
        }

        const currentIndex =
            tabs.indexOf(currentTab);

        let nextIndex = currentIndex;

        if (
            event.key === 'ArrowRight' ||
            event.key === 'ArrowDown'
        ) {
            nextIndex =
                (currentIndex + 1) %
                tabs.length;
        }

        if (
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowUp'
        ) {
            nextIndex =
                (currentIndex - 1 + tabs.length) %
                tabs.length;
        }

        if (
            event.key === 'Home'
        ) {
            nextIndex = 0;
        }

        if (
            event.key === 'End'
        ) {
            nextIndex =
                tabs.length - 1;
        }

        if (nextIndex === currentIndex) {
            return;
        }

        event.preventDefault();

        const nextTab = tabs[nextIndex];

        nextTab.focus();

        this.activate(
            nextTab.dataset.tab
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