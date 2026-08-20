/**
 * AI Business Intelligence Platform
 * Sales Analytics Module
 *
 * Responsibility:
 * - Coordinate Sales Analytics UI
 * - Render Sales charts
 * - Render salesperson performance table
 * - Accept externally supplied Sales data
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
    formatIndianCurrency,
    formatPercentage
} from '../utils/formatters.js';

import {
    createHourlySalesChart,
    createSalesFunnelChart
} from '../charts/sales-charts.js';


export class SalesAnalytics {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-sales'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize module.
     *
     * @returns {SalesAnalytics}
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
     * Render Sales Analytics.
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

        this.renderSalespeople(
            data.salespeople
        );
    }


    /* =====================================================
       CHARTS
    ===================================================== */

    /**
     * Render Sales charts.
     *
     * @param {Object} charts
     */
    renderCharts(charts) {
        if (!charts) {
            return;
        }


        const hourlyCanvas =
            getById(
                'chartHourly'
            );

        const funnelCanvas =
            getById(
                'chartSalesFunnel'
            );


        if (
            hourlyCanvas &&
            charts.hourly
        ) {
            createHourlySalesChart(
                hourlyCanvas,
                charts.hourly
            );
        }


        if (
            funnelCanvas &&
            charts.funnel
        ) {
            createSalesFunnelChart(
                funnelCanvas,
                charts.funnel
            );
        }


        this.chartsInitialized = true;
    }


    /* =====================================================
       SALESPERSON TABLE
    ===================================================== */

    /**
     * Render salesperson performance table.
     *
     * Expected data format:
     *
     * [
     *     {
     *         name: '...',
     *         state: '...',
     *         closed: 318,
     *         revenue: 2124000,
     *         conversionRate: 31.2
     *     }
     * ]
     *
     * @param {Array} salespeople
     */
    renderSalespeople(
        salespeople
    ) {
        if (
            !Array.isArray(salespeople) ||
            !salespeople.length
        ) {
            return;
        }


        const table =
            this.container.querySelector(
                'table'
            );


        if (!table) {
            return;
        }


        const tbody =
            table.querySelector(
                'tbody'
            );


        if (!tbody) {
            return;
        }


        tbody.replaceChildren();


        salespeople.forEach(
            salesperson => {
                const row =
                    this.createSalespersonRow(
                        salesperson
                    );

                if (row) {
                    tbody.appendChild(
                        row
                    );
                }
            }
        );
    }


    /**
     * Create a salesperson table row.
     *
     * @param {Object} salesperson
     * @returns {HTMLTableRowElement|null}
     */
    createSalespersonRow(
        salesperson
    ) {
        if (!salesperson) {
            return null;
        }


        const row =
            document.createElement(
                'tr'
            );


        const nameCell =
            document.createElement(
                'td'
            );

        const stateCell =
            document.createElement(
                'td'
            );

        const closedCell =
            document.createElement(
                'td'
            );

        const revenueCell =
            document.createElement(
                'td'
            );

        const conversionCell =
            document.createElement(
                'td'
            );


        setText(
            nameCell,
            salesperson.name || '—'
        );


        setText(
            stateCell,
            salesperson.state || '—'
        );


        setText(
            closedCell,
            salesperson.closed !== undefined
                ? salesperson.closed.toLocaleString(
                    'en-IN'
                )
                : '—'
        );


        setText(
            revenueCell,
            salesperson.revenue !== undefined
                ? formatIndianCurrency(
                    salesperson.revenue
                )
                : '—'
        );


        const conversionPill =
            document.createElement(
                'span'
            );


        conversionPill.classList.add(
            'pill'
        );


        const conversionRate =
            Number(
                salesperson.conversionRate
            );


        if (
            Number.isFinite(
                conversionRate
            )
        ) {
            setText(
                conversionPill,
                formatPercentage(
                    conversionRate
                )
            );
        } else {
            setText(
                conversionPill,
                '—'
            );
        }


        conversionPill.classList.add(
            this.getConversionClass(
                conversionRate
            )
        );


        conversionCell.appendChild(
            conversionPill
        );


        row.append(
            nameCell,
            stateCell,
            closedCell,
            revenueCell,
            conversionCell
        );


        return row;
    }


    /**
     * Determine conversion-rate status.
     *
     * @param {number} rate
     * @returns {string}
     */
    getConversionClass(rate) {
        if (!Number.isFinite(rate)) {
            return 'neutral';
        }


        if (rate >= 28) {
            return 'ok';
        }


        if (rate >= 20) {
            return 'warn';
        }


        return 'danger';
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
     * Clear Sales Analytics UI.
     */
    clear() {
        if (!this.container) {
            return;
        }


        const table =
            this.container.querySelector(
                'table tbody'
            );


        if (table) {
            table.replaceChildren();
        }


        this.currentData = null;

        this.chartsInitialized = false;
    }
}


/**
 * Factory helper.
 *
 * @param {Object} options
 * @returns {SalesAnalytics}
 */
export function createSalesAnalytics(
    options = {}
) {
    return new SalesAnalytics(
        options
    ).init();
}