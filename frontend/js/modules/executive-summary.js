/**
 * AI Business Intelligence Platform
 * Executive Summary Module
 *
 * Responsibility:
 * - Coordinate Executive Summary UI
 * - Update KPI values
 * - Update KPI trend indicators
 * - Provide a clean interface for future data sources
 *
 * This module does NOT:
 * - Fetch backend data
 * - Implement ML
 * - Create Chart.js instances directly
 * - Contain hard-coded business data
 */

import {
    getById,
    setText,
    selectAll
} from '../core/dom.js';

import {
    formatIndianCurrency,
    formatNumber,
    formatPercentage,
    formatPercentageChange
} from '../utils/formatters.js';


export class ExecutiveSummary {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'executiveSummary'
            );

        this.kpiSelector =
            options.kpiSelector ||
            '[data-kpi]';

        this.currentData = null;
    }


    /**
     * Initialize the module.
     *
     * @returns {ExecutiveSummary}
     */
    init() {
        if (!this.container) {
            return this;
        }

        return this;
    }


    /**
     * Render Executive Summary data.
     *
     * The data should be supplied by a future
     * service/API layer.
     *
     * @param {Object} data
     */
    render(data) {
        if (!data) {
            return;
        }

        this.currentData = data;

        this.updateKPI(
            'revenue',
            data.revenue
        );

        this.updateKPI(
            'orders',
            data.orders
        );

        this.updateKPI(
            'customers',
            data.customers
        );

        this.updateKPI(
            'profit',
            data.profit
        );

        this.updateKPI(
            'averageOrderValue',
            data.averageOrderValue
        );

        this.updateKPI(
            'conversionRate',
            data.conversionRate
        );
    }


    /**
     * Update one KPI.
     *
     * @param {string} key
     * @param {Object} metric
     */
    updateKPI(key, metric) {
        if (!metric) {
            return;
        }

        const valueElement =
            this.container.querySelector(
                `[data-kpi="${key}"] [data-kpi-value]`
            );

        const changeElement =
            this.container.querySelector(
                `[data-kpi="${key}"] [data-kpi-change]`
            );

        const trendElement =
            this.container.querySelector(
                `[data-kpi="${key}"] [data-kpi-trend]`
            );

        if (valueElement) {
            setText(
                valueElement,
                this.formatMetric(
                    key,
                    metric.value
                )
            );
        }

        if (changeElement) {
            setText(
                changeElement,
                formatPercentageChange(
                    metric.changePercentage
                )
            );
        }

        if (trendElement) {
            this.updateTrend(
                trendElement,
                metric.trend
            );
        }
    }


    /**
     * Format a KPI based on its type.
     *
     * @param {string} key
     * @param {number} value
     * @returns {string}
     */
    formatMetric(key, value) {
        switch (key) {
            case 'revenue':
            case 'profit':
                return formatIndianCurrency(value);

            case 'orders':
            case 'customers':
                return formatNumber(value);

            case 'averageOrderValue':
                return formatIndianCurrency(value);

            case 'conversionRate':
                return formatPercentage(value);

            default:
                return formatNumber(value);
        }
    }


    /**
     * Update trend UI.
     *
     * @param {HTMLElement} element
     * @param {string} trend
     */
    updateTrend(element, trend) {
        element.classList.remove(
            'trend-up',
            'trend-down',
            'trend-stable'
        );

        switch (trend) {
            case 'up':
                element.classList.add(
                    'trend-up'
                );

                element.setAttribute(
                    'aria-label',
                    'Increasing'
                );

                break;

            case 'down':
                element.classList.add(
                    'trend-down'
                );

                element.setAttribute(
                    'aria-label',
                    'Decreasing'
                );

                break;

            default:
                element.classList.add(
                    'trend-stable'
                );

                element.setAttribute(
                    'aria-label',
                    'Stable'
                );
        }
    }


    /**
     * Get currently rendered data.
     *
     * @returns {Object|null}
     */
    getData() {
        return this.currentData;
    }


    /**
     * Clear currently displayed KPI values.
     */
    clear() {
        if (!this.container) {
            return;
        }

        const values =
            selectAll(
                '[data-kpi-value]',
                this.container
            );

        const changes =
            selectAll(
                '[data-kpi-change]',
                this.container
            );

        values.forEach(element => {
            setText(element, '—');
        });

        changes.forEach(element => {
            setText(element, '—');
        });

        this.currentData = null;
    }
}


/**
 * Factory function for simple initialization.
 *
 * @param {Object} options
 * @returns {ExecutiveSummary}
 */
export function createExecutiveSummary(
    options = {}
) {
    return new ExecutiveSummary(
        options
    ).init();
}