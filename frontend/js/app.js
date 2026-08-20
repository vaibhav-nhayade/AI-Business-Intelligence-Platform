/**
 * AI Business Intelligence Platform
 * Application Entry Point
 *
 * Responsibility:
 * - Bootstrap the frontend application
 * - Detect the current page
 * - Initialize the appropriate page controller
 * - Initialize globally required UI components
 *
 * This file does NOT:
 * - Contain business data
 * - Fetch backend data
 * - Implement ML
 * - Define charts
 * - Contain page-specific business logic
 */


import {
    createHome
} from './pages/home.js';

import {
    createDashboard
} from './pages/dashboard.js';

import {
    createSidebar
} from './components/sidebar.js';

import {
    Header
} from './components/header.js';

import {
    DateFilter
} from './components/date-filter.js';


/* =========================================================
   APPLICATION
========================================================= */

class App {
    constructor() {
        this.page =
            this.detectPage();

        this.instances = {};
    }


    /**
     * Initialize application.
     *
     * @returns {App}
     */
    init() {
        this.initializeGlobalComponents();

        this.initializePage();

        return this;
    }


    /* =====================================================
       PAGE DETECTION
    ===================================================== */

    /**
     * Detect current application page.
     *
     * @returns {string}
     */
    detectPage() {
        const bodyPage =
            document.body.dataset.page;


        if (bodyPage) {
            return bodyPage;
        }


        const pathname =
            window.location.pathname
                .toLowerCase();


        if (
            pathname.endsWith(
                '/dashboard.html'
            )
        ) {
            return 'dashboard';
        }


        if (
            pathname.endsWith(
                '/login.html'
            )
        ) {
            return 'login';
        }


        return 'home';
    }


    /* =====================================================
       GLOBAL COMPONENTS
    ===================================================== */

    /**
     * Initialize components shared by
     * multiple application pages.
     */
    initializeGlobalComponents() {
        /*
         * Header
         *
         * Only initialize it when the required
         * dashboard header exists.
         */
        if (
            document.querySelector(
                '.topbar'
            )
        ) {
            this.instances.header =
                new Header().init();
        }


        /*
         * Date Filter
         *
         * The component safely exits when
         * its required DOM elements do not exist.
         */
        if (
            document.querySelector(
                '#dateFilter'
            ) ||
            document.querySelector(
                '[data-date-filter]'
            )
        ) {
            this.instances.dateFilter =
                new DateFilter().init();
        }
    }


    /* =====================================================
       PAGE INITIALIZATION
    ===================================================== */

    /**
     * Initialize the current page.
     */
    initializePage() {
        switch (
            this.page
        ) {
            case 'dashboard':
                this.initializeDashboard();
                break;


            case 'home':
                this.initializeHome();
                break;


            case 'login':
                this.initializeLogin();
                break;


            default:
                this.initializeHome();
                break;
        }
    }


    /**
     * Initialize Dashboard.
     */
    initializeDashboard() {
        /*
         * Sidebar is already a reusable component.
         *
         * The Dashboard page controller will eventually
         * receive the Sidebar instance once its refactor
         * is completed.
         */
        this.instances.sidebar =
            createSidebar();


        this.instances.dashboard =
            createDashboard({
                sidebar:
                    this.instances.sidebar
            });
    }


    /**
     * Initialize Home page.
     */
    initializeHome() {
        this.instances.home =
            createHome();
    }


    /**
     * Initialize Login page.
     *
     * Login is intentionally pending.
     *
     * We do not import or initialize login.js
     * until the login page is redesigned.
     */
    initializeLogin() {
        return;
    }
}


/* =========================================================
   BOOTSTRAP
========================================================= */

function bootstrap() {
    const app =
        new App().init();


    /*
     * Expose the application instance for
     * controlled debugging during development.
     *
     * This can be removed before production
     * if desired.
     */
    window.AIBI =
        app;
}


if (
    document.readyState ===
    'loading'
) {
    document.addEventListener(
        'DOMContentLoaded',
        bootstrap,
        {
            once: true
        }
    );
} else {
    bootstrap();
}