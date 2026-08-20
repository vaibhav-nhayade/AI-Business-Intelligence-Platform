/**
 * AI Business Intelligence Platform
 * Revenue Intelligence Module
 *
 * Responsibility:
 * - Coordinate Revenue Intelligence UI
 * - Render Revenue KPIs
 * - Initialize Revenue charts
 * - Accept externally supplied Revenue data
 *
 * This module does NOT:
 * - Fetch backend data
 * - Implement ML
 * - Contain hard-coded business data
 * - Own Chart.js lifecycle
 */

import {
    getById,
    selectAll,
    setText
} from '../core/dom.js';

import {
    formatPercentage,
    formatIndianCurrency
} from '../utils/formatters.js';

import {
    createRevenueCategoryChart,
    createRevenuePaymentChart,
    createMonthlyRevenueChart,
    createRevenueWaterfallChart
} from '../charts/revenue-charts.js';


export class RevenueIntelligence {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-revenue'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize the module.
     *
     * @returns {RevenueIntelligence}
     */
    init() {
        if (!this.container) {
            return this;
        }

        return this;
    }


    /**
     * Render Revenue Intelligence.
     *
     * @param {Object} data
     */
    render(data) {
        if (!data || !this.container) {
            return;
        }

        this.currentData = data;

        this.renderKPIs(
            data.kpis
        );

        this.renderCharts(
            data.charts
        );
    }


    /* =====================================================
       KPI RENDERING
    ===================================================== */

    /**
     * Render Revenue KPI cards.
     *
     * @param {Object} kpis
     */
    renderKPIs(kpis) {
        if (!kpis) {
            return;
        }

        const cards =
            selectAll(
                '.kpi',
                this.container
            );

        if (!cards.length) {
            return;
        }

        this.updateKPI(
            cards[0],
            kpis.revenueVsTarget,
            value => formatPercentage(value)
        );

        this.updateKPI(
            cards[1],
            kpis.yoyGrowth,
            value => formatPercentage(value)
        );

        this.updateKPI(
            cards[2],
            kpis.qoqGrowth,
            value => formatPercentage(value)
        );

        this.updateRegionKPI(
            cards[3],
            kpis.bestRegion
        );
    }


    /**
     * Update a standard KPI card.
     *
     * @param {HTMLElement} card
     * @param {Object} metric
     * @param {Function} formatter
     */
    updateKPI(
        card,
        metric,
        formatter
    ) {
        if (!card || !metric) {
            return;
        }

        const valueElement =
            card.querySelector(
                '.kpi-value'
            );

        const deltaElement =
            card.querySelector(
                '.kpi-delta'
            );

        if (valueElement) {
            setText(
                valueElement,
                formatter(metric.value)
            );
        }

        if (deltaElement) {
            setText(
                deltaElement,
                metric.label || ''
            );

            this.updateTrendClass(
                deltaElement,
                metric.trend
            );
        }
    }


    /**
     * Update Best Region KPI.
     *
     * @param {HTMLElement} card
     * @param {Object} metric
     */
    updateRegionKPI(card, metric) {
        if (!card || !metric) {
            return;
        }

        const valueElement =
            card.querySelector(
                '.kpi-value'
            );

        const deltaElement =
            card.querySelector(
                '.kpi-delta'
            );

        if (valueElement) {
            setText(
                valueElement,
                metric.region || '—'
            );
        }

        if (deltaElement) {
            setText(
                deltaElement,
                metric.value !== undefined
                    ? `${formatIndianCurrency(metric.value)} MTD`
                    : ''
            );

            this.updateTrendClass(
                deltaElement,
                metric.trend
            );
        }
    }


    /**
     * Update trend styling.
     *
     * @param {HTMLElement} element
     * @param {string} trend
     */
    updateTrendClass(
        element,
        trend
    ) {
        element.classList.remove(
            'up',
            'down'
        );

        if (trend === 'down') {
            element.classList.add('down');
            return;
        }

        if (trend === 'up') {
            element.classList.add('up');
        }
    }


    /* =====================================================
       CHART RENDERING
    ===================================================== */

    /**
     * Render Revenue charts.
     *
     * @param {Object} charts
     */
    renderCharts(charts) {
        if (!charts) {
            return;
        }

        const categoryCanvas =
            getById(
                'chartRevByCategory'
            );

        const paymentCanvas =
            getById(
                'chartRevByPayment'
            );

        const monthlyCanvas =
            getById(
                'chartRevMonthly'
            );

        const waterfallCanvas =
            getById(
                'chartRevWaterfall'
            );


        if (
            categoryCanvas &&
            charts.byCategory
        ) {
            createRevenueCategoryChart(
                categoryCanvas,
                charts.byCategory
            );
        }


        if (
            paymentCanvas &&
            charts.byPayment
        ) {
            createRevenuePaymentChart(
                paymentCanvas,
                charts.byPayment
            );
        }


        if (
            monthlyCanvas &&
            charts.monthly
        ) {
            createMonthlyRevenueChart(
                monthlyCanvas,
                charts.monthly
            );
        }


        if (
            waterfallCanvas &&
            charts.waterfall
        ) {
            createRevenueWaterfallChart(
                waterfallCanvas,
                charts.waterfall
            );
        }

        this.chartsInitialized = true;
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
     * Check whether charts were initialized.
     *
     * @returns {boolean}
     */
    hasCharts() {
        return this.chartsInitialized;
    }


    /**
     * Clear Revenue UI.
     */
    clear() {
        if (!this.container) {
            return;
        }

        const values =
            selectAll(
                '.kpi-value',
                this.container
            );

        const deltas =
            selectAll(
                '.kpi-delta',
                this.container
            );

        values.forEach(element => {
            setText(
                element,
                '—'
            );
        });

        deltas.forEach(element => {
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
 * @returns {RevenueIntelligence}
 */
export function createRevenueIntelligence(
    options = {}
) {
    return new RevenueIntelligence(
        options
    ).init();
}