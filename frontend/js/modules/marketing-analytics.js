/**
 * AI Business Intelligence Platform
 * Marketing Analytics Module
 *
 * Responsibility:
 * - Coordinate Marketing Analytics UI
 * - Initialize Marketing charts
 * - Render campaign performance information
 * - Accept externally supplied data
 *
 * This module does NOT:
 * - Fetch backend data
 * - Implement ML
 * - Contain hard-coded business data
 * - Own Chart.js lifecycle
 */

import {
    getById,
    setText
} from '../core/dom.js';

import {
    createTrafficSourcesChart,
    createCampaignPerformanceChart
} from '../charts/marketing-charts.js';


export class MarketingAnalytics {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-marketing'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize module.
     *
     * @returns {MarketingAnalytics}
     */
    init() {
        if (!this.container) {
            return this;
        }

        return this;
    }


    /* =====================================================
       RENDER
    ===================================================== */

    /**
     * Render Marketing Analytics.
     *
     * @param {Object} data
     */
    render(data) {
        if (!data || !this.container) {
            return;
        }

        this.currentData = data;

        this.renderCharts(
            data.charts
        );
    }


    /* =====================================================
       CHARTS
    ===================================================== */

    /**
     * Render Marketing charts.
     *
     * @param {Object} charts
     */
    renderCharts(charts) {
        if (!charts) {
            return;
        }


        const trafficCanvas =
            getById(
                'chartTrafficSources'
            );

        const campaignCanvas =
            getById(
                'chartCampaignPerformance'
            );


        if (
            trafficCanvas &&
            charts.trafficSources
        ) {
            createTrafficSourcesChart(
                trafficCanvas,
                charts.trafficSources
            );
        }


        if (
            campaignCanvas &&
            charts.campaignPerformance
        ) {
            createCampaignPerformanceChart(
                campaignCanvas,
                charts.campaignPerformance
            );
        }


        this.chartsInitialized = true;
    }


    /* =====================================================
       CAMPAIGN INFORMATION
    ===================================================== */

    /**
     * Update optional campaign summary elements.
     *
     * This method is intentionally generic so the HTML can
     * expose optional data attributes without forcing a
     * particular UI structure.
     *
     * Supported:
     *
     * [data-marketing-metric="campaigns"]
     * [data-marketing-metric="conversions"]
     * [data-marketing-metric="roi"]
     *
     * @param {Object} metrics
     */
    renderMetrics(metrics) {
        if (!metrics || !this.container) {
            return;
        }


        Object.entries(metrics).forEach(
            ([key, value]) => {
                const element =
                    this.container.querySelector(
                        `[data-marketing-metric="${key}"]`
                    );

                if (!element) {
                    return;
                }

                setText(
                    element,
                    value
                );
            }
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current module data.
     *
     * @returns {Object|null}
     */
    getData() {
        return this.currentData;
    }


    /**
     * Check whether charts are initialized.
     *
     * @returns {boolean}
     */
    hasCharts() {
        return this.chartsInitialized;
    }


    /**
     * Clear Marketing Analytics UI.
     */
    clear() {
        if (!this.container) {
            return;
        }


        const metrics =
            this.container.querySelectorAll(
                '[data-marketing-metric]'
            );


        metrics.forEach(element => {
            setText(
                element,
                '—'
            );
        });


        this.currentData = null;

        this.chartsInitialized = false;
    }
}


/**
 * Factory helper.
 *
 * @param {Object} options
 * @returns {MarketingAnalytics}
 */
export function createMarketingAnalytics(
    options = {}
) {
    return new MarketingAnalytics(
        options
    ).init();
}