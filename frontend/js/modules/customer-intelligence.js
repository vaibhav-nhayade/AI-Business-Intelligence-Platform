/**
 * AI Business Intelligence Platform
 * Customer Intelligence Module
 *
 * Responsibility:
 * - Coordinate Customer Intelligence UI
 * - Render Customer KPIs
 * - Initialize Customer charts
 * - Accept externally supplied Customer data
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
    formatIndianCurrency,
    formatPercentage
} from '../utils/formatters.js';

import {
    createRFMSegmentationChart,
    createCustomerCohortChart,
    createCustomerFunnelChart
} from '../charts/customer-charts.js';


export class CustomerIntelligence {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-customer'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize module.
     *
     * @returns {CustomerIntelligence}
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
     * Render Customer Intelligence.
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
     * Render Customer KPI cards.
     *
     * Current page order:
     *
     * 1. Customer LTV
     * 2. Churn Rate
     * 3. Repeat Purchase Rate
     * 4. Acquisition Cost
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

        if (cards.length < 4) {
            return;
        }


        this.updateKPI(
            cards[0],
            kpis.ltv,
            value =>
                formatIndianCurrency(
                    value
                )
        );


        this.updateKPI(
            cards[1],
            kpis.churnRate,
            value =>
                formatPercentage(
                    value
                )
        );


        this.updateKPI(
            cards[2],
            kpis.repeatPurchaseRate,
            value =>
                formatPercentage(
                    value
                )
        );


        this.updateKPI(
            cards[3],
            kpis.acquisitionCost,
            value =>
                formatIndianCurrency(
                    value,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )
        );
    }


    /**
     * Update one KPI card.
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
     * Update KPI trend styling.
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
            element.classList.add(
                'down'
            );

            return;
        }


        if (trend === 'up') {
            element.classList.add(
                'up'
            );
        }
    }


    /* =====================================================
       CHART RENDERING
    ===================================================== */

    /**
     * Render Customer charts.
     *
     * @param {Object} charts
     */
    renderCharts(charts) {
        if (!charts) {
            return;
        }


        const rfmCanvas =
            getById(
                'chartRFM'
            );

        const cohortCanvas =
            getById(
                'chartCohort'
            );

        const funnelCanvas =
            getById(
                'chartCustFunnel'
            );


        if (
            rfmCanvas &&
            charts.rfm
        ) {
            createRFMSegmentationChart(
                rfmCanvas,
                charts.rfm
            );
        }


        if (
            cohortCanvas &&
            charts.cohort
        ) {
            createCustomerCohortChart(
                cohortCanvas,
                charts.cohort
            );
        }


        if (
            funnelCanvas &&
            charts.funnel
        ) {
            createCustomerFunnelChart(
                funnelCanvas,
                charts.funnel
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
     * Check whether charts are initialized.
     *
     * @returns {boolean}
     */
    hasCharts() {
        return this.chartsInitialized;
    }


    /**
     * Clear Customer Intelligence UI.
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
 * @returns {CustomerIntelligence}
 */
export function createCustomerIntelligence(
    options = {}
) {
    return new CustomerIntelligence(
        options
    ).init();
}