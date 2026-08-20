/**
 * AI Business Intelligence Platform
 * Dashboard Page Controller
 *
 * Responsibility:
 * - Control dashboard page navigation
 * - Manage active page state
 * - Update dashboard header
 * - Coordinate the Sidebar component
 * - Maintain URL hash navigation
 *
 * This file does NOT:
 * - Manage sidebar DOM behavior
 * - Contain business data
 * - Define charts
 * - Implement ML
 * - Fetch backend data
 * - Contain module-specific business logic
 *
 * Sidebar behavior belongs to:
 *     ../components/sidebar.js
 */


import {
    getById,
    selectAll,
    setText
} from '../core/dom.js';

import {
    Sidebar
} from '../components/sidebar.js';


/* =========================================================
   PAGE CONFIGURATION
========================================================= */

const PAGE_CONFIG = {
    exec: {
        title: 'Executive Summary',
        subtitle:
            'Morning brief · consolidated across all channels & regions'
    },

    mlhub: {
        title:
            'AI & Machine Learning Intelligence Center',
        subtitle:
            'Predictive intelligence across fraud, demand, customers & decisions'
    },

    risk: {
        title: 'Fraud Detection',
        subtitle:
            'Real-time transaction risk intelligence'
    },

    scam: {
        title: 'Scam Detection',
        subtitle:
            'Detecting refund fraud, seller scams & account takeovers'
    },

    fakenews: {
        title: 'Fake News Detection',
        subtitle:
            'Screening market-moving and business-related content'
    },

    forecast: {
        title: 'Demand Forecasting',
        subtitle:
            'Forecast-driven demand intelligence across products and regions'
    },

    segment: {
        title: 'Customer Segmentation',
        subtitle:
            'Customer groups, behavior patterns and commercial value'
    },

    recommend: {
        title: 'Recommendation Engine',
        subtitle:
            'AI-generated actions across products, campaigns and inventory'
    },

    xai: {
        title: 'Explainable AI',
        subtitle:
            'Transparent reasoning behind every AI prediction'
    },

    revenue: {
        title: 'Revenue Intelligence',
        subtitle:
            'Revenue performance, growth drivers and monetization insights'
    },

    finance: {
        title: 'Financial Intelligence',
        subtitle:
            'Profitability, cash flow, margins and financial health'
    },

    customer: {
        title: 'Customer Intelligence',
        subtitle:
            'Customer behavior, retention and lifetime value'
    },

    sales: {
        title: 'Sales Intelligence',
        subtitle:
            'Sales performance, conversion and channel intelligence'
    },

    marketing: {
        title: 'Marketing Intelligence',
        subtitle:
            'Campaign performance, acquisition and marketing ROI'
    },

    support: {
        title: 'Customer Support',
        subtitle:
            'Service performance, satisfaction and support operations'
    },

    product: {
        title: 'Product Analytics',
        subtitle:
            'Product performance, adoption and commercial insights'
    },

    inventory: {
        title: 'Inventory Intelligence',
        subtitle:
            'Stock health, availability and inventory risk'
    },

    supply: {
        title: 'Supply Chain',
        subtitle:
            'Supply movement, fulfillment and network intelligence'
    },

    ops: {
        title: 'Operations Analytics',
        subtitle:
            'Operational efficiency, fulfillment and delivery performance'
    },

    geo: {
        title: 'Geographic Intelligence',
        subtitle:
            'Business performance across Indian states and cities'
    },

    sustain: {
        title: 'Sustainability',
        subtitle:
            'ESG, emissions and sustainable business performance'
    },

    alerts: {
        title: 'Alerts Center',
        subtitle:
            'Critical events, risks and operational alerts'
    },

    reports: {
        title: 'Report Center',
        subtitle:
            'Schedule, export and share leadership reports'
    },

    settings: {
        title: 'Settings',
        subtitle:
            'Console configuration, access and system controls'
    }
};


/* =========================================================
   DASHBOARD CONTROLLER
========================================================= */

export class Dashboard {

    /**
     * @param {Object} options
     */
    constructor(options = {}) {

        this.pageTitle =
            options.pageTitle ||
            getById(
                options.pageTitleId ||
                'pageTitle'
            );


        this.pageSub =
            options.pageSub ||
            getById(
                options.pageSubId ||
                'pageSub'
            );


        /*
         * Use an injected Sidebar instance when
         * provided by app.js.
         *
         * Otherwise create one here.
         */
        this.sidebar =
            options.sidebar ||
            null;


        this.currentPage =
            options.initialPage ||
            this.getInitialPage();


        this.initialized = false;
    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    /**
     * Initialize Dashboard.
     *
     * @returns {Dashboard}
     */
    init() {

        this.initializeSidebar();

        this.bindHashNavigation();

        this.navigate(
            this.currentPage,
            {
                updateHistory: false
            }
        );


        this.initialized = true;

        return this;
    }


    /**
     * Initialize Sidebar integration.
     */
    initializeSidebar() {

        /*
         * If app.js supplied the Sidebar instance,
         * configure its navigation callback.
         */
        if (this.sidebar) {

            this.sidebar.onNavigate =
                page => {
                    this.navigate(
                        page
                    );
                };


            /*
             * Ensure current page is reflected
             * in sidebar state.
             */
            this.sidebar.setActive(
                this.currentPage
            );

            return;
        }


        /*
         * Fallback for direct Dashboard usage.
         */
        this.sidebar =
            new Sidebar({
                onNavigate:
                    page => {
                        this.navigate(
                            page
                        );
                    }
            }).init();
    }


    /* =====================================================
       INITIAL PAGE
    ===================================================== */

    /**
     * Determine initial dashboard page.
     *
     * Priority:
     *
     * 1. URL hash
     * 2. Active navigation item
     * 3. Executive Summary
     *
     * @returns {string}
     */
    getInitialPage() {

        const hash =
            window.location.hash
                .replace(
                    '#',
                    ''
                )
                .trim();


        if (
            hash &&
            PAGE_CONFIG[hash]
        ) {
            return hash;
        }


        const activeItem =
            document.querySelector(
                '.nav-item.active[data-page]'
            );


        if (
            activeItem &&
            PAGE_CONFIG[
                activeItem.dataset.page
            ]
        ) {
            return activeItem.dataset.page;
        }


        return 'exec';
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    /**
     * Navigate to a dashboard page.
     *
     * @param {string} page
     * @param {Object} options
     */
    navigate(
        page,
        options = {}
    ) {

        if (
            !page ||
            !PAGE_CONFIG[page]
        ) {
            return;
        }


        const pageElement =
            getById(
                `page-${page}`
            );


        /*
         * Do not update the header or URL for
         * a page that does not actually exist.
         */
        if (!pageElement) {
            return;
        }


        this.hideAllPages();

        this.showPage(
            pageElement
        );

        this.updateHeader(
            page
        );


        if (this.sidebar) {
            this.sidebar.setActive(
                page
            );
        }


        this.currentPage =
            page;


        if (
            options.updateHistory !==
            false
        ) {
            this.updateURL(
                page
            );
        }
    }


    /**
     * Hide all dashboard pages.
     */
    hideAllPages() {

        const pages =
            selectAll(
                '.page'
            );


        pages.forEach(
            page => {

                page.classList.remove(
                    'active'
                );


                page.setAttribute(
                    'aria-hidden',
                    'true'
                );
            }
        );
    }


    /**
     * Show selected page.
     *
     * @param {HTMLElement} pageElement
     */
    showPage(
        pageElement
    ) {

        pageElement.classList.add(
            'active'
        );


        pageElement.setAttribute(
            'aria-hidden',
            'false'
        );
    }


    /* =====================================================
       HEADER
    ===================================================== */

    /**
     * Update dashboard header.
     *
     * @param {string} page
     */
    updateHeader(
        page
    ) {

        const config =
            PAGE_CONFIG[page];


        if (!config) {
            return;
        }


        if (this.pageTitle) {
            setText(
                this.pageTitle,
                config.title
            );
        }


        if (this.pageSub) {
            setText(
                this.pageSub,
                config.subtitle
            );
        }
    }


    /* =====================================================
       URL STATE
    ===================================================== */

    /**
     * Update URL hash.
     *
     * @param {string} page
     */
    updateURL(
        page
    ) {

        const nextHash =
            `#${page}`;


        if (
            window.location.hash ===
            nextHash
        ) {
            return;
        }


        window.history.replaceState(
            null,
            '',
            nextHash
        );
    }


    /**
     * Handle browser hash changes.
     */
    handleHashChange() {

        const page =
            window.location.hash
                .replace(
                    '#',
                    ''
                )
                .trim();


        if (
            !page ||
            !PAGE_CONFIG[page]
        ) {
            return;
        }


        this.navigate(
            page,
            {
                updateHistory: false
            }
        );
    }


    /**
     * Bind browser history navigation.
     */
    bindHashNavigation() {

        window.addEventListener(
            'hashchange',
            () => {
                this.handleHashChange();
            }
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current page.
     *
     * @returns {string}
     */
    getCurrentPage() {
        return this.currentPage;
    }


    /**
     * Get page configuration.
     *
     * @param {string} page
     * @returns {Object|null}
     */
    getPageConfig(
        page
    ) {
        return (
            PAGE_CONFIG[page] ||
            null
        );
    }


    /**
     * Get registered page keys.
     *
     * @returns {string[]}
     */
    getPages() {
        return Object.keys(
            PAGE_CONFIG
        );
    }


    /**
     * Check whether Dashboard
     * has been initialized.
     *
     * @returns {boolean}
     */
    isInitialized() {
        return this.initialized;
    }


    /**
     * Destroy Dashboard listeners.
     *
     * Note:
     * Sidebar lifecycle is owned by app.js
     * when Sidebar is injected.
     */
    destroy() {

        window.removeEventListener(
            'hashchange',
            this.handleHashChange
        );


        this.initialized = false;
    }
}


/* =========================================================
   FACTORY
========================================================= */

/**
 * Create Dashboard controller.
 *
 * @param {Object} options
 * @returns {Dashboard}
 */
export function createDashboard(
    options = {}
) {
    return new Dashboard(
        options
    ).init();
}