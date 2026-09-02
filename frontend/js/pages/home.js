/**
 * AI Business Intelligence Platform
 * Home Page Controller
 *
 * Responsibility:
 * - Initialize the public landing page
 * - Handle primary navigation actions
 * - Handle smooth scrolling
 * - Provide a clean page-level API
 *
 * This file does NOT:
 * - Manage dashboard state
 * - Fetch business data
 * - Implement AI/ML
 * - Contain business data
 * - Define reusable UI components
 */


const HOME_SELECTORS = {
    navigationLinks:
        '[data-home-nav]',

    dashboardLinks:
        '[data-dashboard-link]',

    scrollLinks:
        'a[href^="#"]'
};


export class Home {
    constructor(options = {}) {
        this.root =
            options.root ||
            document;

        this.navigationLinks = [];

        this.dashboardLinks = [];
    }


    /**
     * Initialize Home page.
     *
     * @returns {Home}
     */
    init() {
        this.cacheElements();

        this.bindNavigation();

        this.bindDashboardLinks();

        this.bindSmoothScrolling();

        return this;
    }


    /* =====================================================
       ELEMENT CACHE
    ===================================================== */

    /**
     * Cache relevant Home page elements.
     */
    cacheElements() {
        this.navigationLinks =
            Array.from(
                this.root.querySelectorAll(
                    HOME_SELECTORS.navigationLinks
                )
            );


        this.dashboardLinks =
            Array.from(
                this.root.querySelectorAll(
                    HOME_SELECTORS.dashboardLinks
                )
            );
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    /**
     * Bind Home page navigation.
     */
    bindNavigation() {
        this.navigationLinks.forEach(
            link => {
                link.addEventListener(
                    'click',
                    event => {
                        this.handleNavigation(
                            event,
                            link
                        );
                    }
                );
            }
        );
    }


    /**
     * Handle navigation link.
     *
     * Expected markup:
     *
     * <a
     *   href="#features"
     *   data-home-nav
     * >
     *
     * @param {Event} event
     * @param {HTMLElement} link
     */
    handleNavigation(
        event,
        link
    ) {
        const href =
            link.getAttribute(
                'href'
            );


        if (
            !href ||
            !href.startsWith('#')
        ) {
            return;
        }


        const target =
            document.querySelector(
                href
            );


        if (!target) {
            return;
        }


        event.preventDefault();


        this.scrollToElement(
            target
        );
    }


    /* =====================================================
       DASHBOARD NAVIGATION
    ===================================================== */

    /**
     * Bind links that open the dashboard.
     */
    bindDashboardLinks() {
        this.dashboardLinks.forEach(
            link => {
                link.addEventListener(
                    'click',
                    event => {
                        this.handleDashboardNavigation(
                            event,
                            link
                        );
                    }
                );
            }
        );
    }


    /**
     * Handle dashboard navigation.
     *
     * Expected markup:
     *
     * <a
     *   href="dashboard.html"
     *   data-dashboard-link
     * >
     *
     * @param {Event} event
     * @param {HTMLElement} link
     */
    handleDashboardNavigation(
        event,
        link
    ) {
        const href =
            link.getAttribute(
                'href'
            );


        if (!href) {
            return;
        }


        /*
         * Keep the browser's normal navigation
         * behavior unless a future requirement
         * needs additional logic.
         */
        if (
            event.defaultPrevented
        ) {
            return;
        }
    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    /**
     * Bind generic anchor scrolling.
     */
    bindSmoothScrolling() {
        const links =
            this.root.querySelectorAll(
                HOME_SELECTORS.scrollLinks
            );


        links.forEach(
            link => {
                const href =
                    link.getAttribute(
                        'href'
                    );


                if (
                    !href ||
                    href === '#' ||
                    link.hasAttribute(
                        'data-home-nav'
                    )
                ) {
                    return;
                }


                link.addEventListener(
                    'click',
                    event => {
                        this.handleScrollLink(
                            event,
                            link
                        );
                    }
                );
            }
        );
    }


    /**
     * Handle generic anchor scrolling.
     *
     * @param {Event} event
     * @param {HTMLElement} link
     */
    handleScrollLink(
        event,
        link
    ) {
        const href =
            link.getAttribute(
                'href'
            );


        if (
            !href ||
            !href.startsWith('#')
        ) {
            return;
        }


        const target =
            document.querySelector(
                href
            );


        if (!target) {
            return;
        }


        event.preventDefault();


        this.scrollToElement(
            target
        );


        this.updateHash(
            href
        );
    }


    /**
     * Scroll to an element.
     *
     * @param {HTMLElement} element
     */
    scrollToElement(element) {
        if (!element) {
            return;
        }


        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }


    /**
     * Update URL hash without page reload.
     *
     * @param {string} hash
     */
    updateHash(hash) {
        if (
            !hash ||
            window.location.hash ===
                hash
        ) {
            return;
        }


        window.history.replaceState(
            null,
            '',
            hash
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Scroll to a named section.
     *
     * @param {string} sectionId
     */
    goTo(sectionId) {
        if (!sectionId) {
            return;
        }


        const element =
            document.getElementById(
                sectionId
            );


        if (!element) {
            return;
        }


        this.scrollToElement(
            element
        );
    }
}


/* =========================================================
   FACTORY
========================================================= */

/**
 * Create Home page controller.
 *
 * @param {Object} options
 * @returns {Home}
 */
export function createHome(
    options = {}
) {
    return new Home(
        options
    ).init();
}