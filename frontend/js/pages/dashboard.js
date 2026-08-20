/**
 * AI Business Intelligence Platform
 * Dashboard Page Controller
 *
 * Responsibility:
 * - Initialize the Dashboard page
 * - Control page navigation
 * - Manage active navigation state
 * - Update page title and subtitle
 * - Coordinate dashboard modules
 * - Handle mobile sidebar state
 *
 * This file does NOT:
 * - Contain business data
 * - Define charts
 * - Implement ML
 * - Fetch backend data
 * - Contain module-specific business logic
 */


import {
    getById,
    selectAll,
    setText
} from '../core/dom.js';


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
    constructor(options = {}) {
        this.shell =
            options.shell ||
            getById('dashboardShell') ||
            document.querySelector('.shell');

        this.navigation =
            options.navigation ||
            getById('navScroll');

        this.sidebar =
            options.sidebar ||
            document.querySelector('.sidebar');

        this.pageTitle =
            options.pageTitle ||
            getById('pageTitle');

        this.pageSub =
            options.pageSub ||
            getById('pageSub');

        this.hamburgerButton =
            options.hamburgerButton ||
            getById('hamburgerBtn');

        this.currentPage =
            options.initialPage ||
            this.getInitialPage();

        this.isSidebarOpen = false;
    }


    /**
     * Initialize Dashboard.
     *
     * @returns {Dashboard}
     */
    init() {
        this.bindNavigation();

        this.bindMobileNavigation();

        this.bindKeyboardNavigation();

        this.navigate(
            this.currentPage,
            {
                updateHistory: false
            }
        );

        return this;
    }


    /* =====================================================
       INITIAL PAGE
    ===================================================== */

    /**
     * Determine the initial page.
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
                .replace('#', '')
                .trim();


        if (
            hash &&
            PAGE_CONFIG[hash]
        ) {
            return hash;
        }


        const activeItem =
            this.navigation?.querySelector(
                '.nav-item.active'
            );


        if (activeItem?.dataset.page) {
            return activeItem.dataset.page;
        }


        return 'exec';
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    /**
     * Bind sidebar navigation.
     */
    bindNavigation() {
        if (!this.navigation) {
            return;
        }


        const navigationItems =
            this.navigation.querySelectorAll(
                '.nav-item[data-page]'
            );


        navigationItems.forEach(
            item => {
                item.addEventListener(
                    'click',
                    () => {
                        const page =
                            item.dataset.page;


                        if (!page) {
                            return;
                        }


                        this.navigate(
                            page
                        );
                    }
                );
            }
        );
    }


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


        if (!pageElement) {
            return;
        }


        this.hideAllPages();

        this.showPage(
            pageElement
        );

        this.updateActiveNavigation(
            page
        );

        this.updateHeader(
            page
        );


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


        this.closeSidebar();
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
    showPage(pageElement) {
        pageElement.classList.add(
            'active'
        );

        pageElement.setAttribute(
            'aria-hidden',
            'false'
        );
    }


    /**
     * Update active sidebar navigation item.
     *
     * @param {string} page
     */
    updateActiveNavigation(page) {
        if (!this.navigation) {
            return;
        }


        const items =
            this.navigation.querySelectorAll(
                '.nav-item[data-page]'
            );


        items.forEach(
            item => {
                const isActive =
                    item.dataset.page ===
                    page;


                item.classList.toggle(
                    'active',
                    isActive
                );


                if (isActive) {
                    item.setAttribute(
                        'aria-current',
                        'page'
                    );
                } else {
                    item.removeAttribute(
                        'aria-current'
                    );
                }
            }
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
    updateHeader(page) {
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
     * Update URL hash without reloading.
     *
     * @param {string} page
     */
    updateURL(page) {
        if (
            window.location.hash ===
            `#${page}`
        ) {
            return;
        }


        window.history.replaceState(
            null,
            '',
            `#${page}`
        );
    }


    /**
     * Handle browser back/forward navigation.
     */
    handleHashChange() {
        const page =
            window.location.hash
                .replace('#', '')
                .trim();


        if (
            page &&
            PAGE_CONFIG[page]
        ) {
            this.navigate(
                page,
                {
                    updateHistory: false
                }
            );
        }
    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    /**
     * Bind hamburger/sidebar controls.
     */
    bindMobileNavigation() {
        if (!this.hamburgerButton) {
            return;
        }


        this.hamburgerButton.addEventListener(
            'click',
            () => {
                this.toggleSidebar();
            }
        );


        document.addEventListener(
            'click',
            event => {
                if (
                    !this.isSidebarOpen ||
                    !this.sidebar
                ) {
                    return;
                }


                const clickedInsideSidebar =
                    this.sidebar.contains(
                        event.target
                    );


                const clickedHamburger =
                    this.hamburgerButton.contains(
                        event.target
                    );


                if (
                    !clickedInsideSidebar &&
                    !clickedHamburger
                ) {
                    this.closeSidebar();
                }
            }
        );
    }


    /**
     * Toggle sidebar.
     */
    toggleSidebar() {
        if (this.isSidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }


    /**
     * Open sidebar.
     */
    openSidebar() {
        if (!this.sidebar) {
            return;
        }


        this.sidebar.classList.add(
            'open'
        );


        this.isSidebarOpen = true;


        this.hamburgerButton?.setAttribute(
            'aria-expanded',
            'true'
        );
    }


    /**
     * Close sidebar.
     */
    closeSidebar() {
        if (!this.sidebar) {
            return;
        }


        this.sidebar.classList.remove(
            'open'
        );


        this.isSidebarOpen = false;


        this.hamburgerButton?.setAttribute(
            'aria-expanded',
            'false'
        );
    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    /**
     * Bind keyboard shortcuts.
     */
    bindKeyboardNavigation() {
        document.addEventListener(
            'keydown',
            event => {
                if (
                    event.key ===
                    'Escape'
                ) {
                    this.closeSidebar();
                }
            }
        );


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
    getPageConfig(page) {
        return (
            PAGE_CONFIG[page] ||
            null
        );
    }


    /**
     * Get all registered pages.
     *
     * @returns {string[]}
     */
    getPages() {
        return Object.keys(
            PAGE_CONFIG
        );
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