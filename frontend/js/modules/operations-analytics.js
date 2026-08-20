/**
 * AI Business Intelligence Platform
 * Operations Analytics Module
 *
 * Responsibility:
 * - Coordinate Operations Analytics UI
 * - Render operational metrics
 * - Initialize Order Cycle Time chart
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
    selectAll,
    setText
} from '../core/dom.js';

import {
    createOrderCycleTimeChart
} from '../charts/operations-charts.js';


export class OperationsAnalytics {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-ops'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize the module.
     *
     * @returns {OperationsAnalytics}
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
     * Render Operations Analytics.
     *
     * @param {Object} data
     */
    render(data) {
        if (!data || !this.container) {
            return;
        }

        this.currentData = data;

        this.renderMetrics(
            data.metrics
        );

        this.renderOrderCycleTime(
            data.orderCycleTime
        );
    }


    /* =====================================================
       OPERATIONAL METRICS
    ===================================================== */

    /**
     * Render operational metric cards.
     *
     * Current page order:
     *
     * 1. Order Processing Time
     * 2. Avg Packing Time
     * 3. Delivery SLA
     * 4. Order Cycle Time
     * 5. Pending Orders
     * 6. Delayed Orders
     *
     * @param {Object} metrics
     */
    renderMetrics(metrics) {
        if (!metrics) {
            return;
        }

        const cards =
            selectAll(
                '.mod-card',
                this.container
            );

        if (cards.length < 6) {
            return;
        }


        this.updateMetric(
            cards[0],
            metrics.orderProcessingTime
        );


        this.updateMetric(
            cards[1],
            metrics.avgPackingTime
        );


        this.updateMetric(
            cards[2],
            metrics.deliverySLA
        );


        this.updateMetric(
            cards[3],
            metrics.orderCycleTime
        );


        this.updateMetric(
            cards[4],
            metrics.pendingOrders
        );


        this.updateMetric(
            cards[5],
            metrics.delayedOrders
        );
    }


    /**
     * Update one operational metric.
     *
     * @param {HTMLElement} card
     * @param {Object} metric
     */
    updateMetric(
        card,
        metric
    ) {
        if (!card || !metric) {
            return;
        }


        const valueElement =
            card.querySelector(
                '.m-value'
            );

        const subElement =
            card.querySelector(
                '.m-sub'
            );


        if (valueElement) {
            setText(
                valueElement,
                metric.value ?? '—'
            );
        }


        if (subElement) {
            setText(
                subElement,
                metric.label || ''
            );

            this.updateMetricState(
                subElement,
                metric.trend
            );
        }
    }


    /**
     * Update metric state styling.
     *
     * @param {HTMLElement} element
     * @param {string} trend
     */
    updateMetricState(
        element,
        trend
    ) {
        element.classList.remove(
            'up',
            'down',
            'warn'
        );


        if (
            trend === 'up' ||
            trend === 'down' ||
            trend === 'warn'
        ) {
            element.classList.add(
                trend
            );
        }
    }


    /* =====================================================
       ORDER CYCLE TIME
    ===================================================== */

    /**
     * Render Order Cycle Time trend.
     *
     * @param {Object} data
     */
    renderOrderCycleTime(data) {
        if (!data) {
            return;
        }


        const canvas =
            getById(
                'chartOps'
            );


        if (!canvas) {
            return;
        }


        createOrderCycleTimeChart(
            canvas,
            data
        );


        this.chartsInitialized = true;
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current Operations data.
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
     * Clear Operations Analytics UI.
     */
    clear() {
        if (!this.container) {
            return;
        }


        const values =
            selectAll(
                '.m-value',
                this.container
            );

        const subtitles =
            selectAll(
                '.m-sub',
                this.container
            );


        values.forEach(element => {
            setText(
                element,
                '—'
            );
        });


        subtitles.forEach(element => {
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
 * @returns {OperationsAnalytics}
 */
export function createOperationsAnalytics(
    options = {}
) {
    return new OperationsAnalytics(
        options
    ).init();
}