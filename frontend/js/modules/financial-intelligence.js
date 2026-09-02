/**
 * AI Business Intelligence Platform
 * Financial Intelligence Module
 *
 * Responsibility:
 * - Coordinate Financial Intelligence UI
 * - Render financial KPI values
 * - Initialize Cash Flow chart
 * - Render GST table data
 * - Accept externally supplied financial data
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
    createCashFlowChart
} from '../charts/finance-charts.js';


export class FinancialIntelligence {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-finance'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize the module.
     *
     * @returns {FinancialIntelligence}
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
     * Render Financial Intelligence.
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

        this.renderCashFlow(
            data.cashFlow
        );

        this.renderGSTTable(
            data.gst
        );
    }


    /* =====================================================
       KPI RENDERING
    ===================================================== */

    /**
     * Render Financial KPI cards.
     *
     * Current page order:
     *
     * 1. Gross Profit
     * 2. EBITDA
     * 3. Operating Margin
     * 4. Working Capital
     * 5. GST Liability
     * 6. CGST Collected
     * 7. SGST Collected
     * 8. Revenue Leakage
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

        if (cards.length < 8) {
            return;
        }


        this.updateKPI(
            cards[0],
            kpis.grossProfit,
            value =>
                formatIndianCurrency(value)
        );


        this.updateKPI(
            cards[1],
            kpis.ebitda,
            value =>
                formatIndianCurrency(value)
        );


        this.updateKPI(
            cards[2],
            kpis.operatingMargin,
            value =>
                formatPercentage(value)
        );


        this.updateKPI(
            cards[3],
            kpis.workingCapital,
            value =>
                formatIndianCurrency(value)
        );


        this.updateKPI(
            cards[4],
            kpis.gstLiability,
            value =>
                formatIndianCurrency(value)
        );


        this.updateKPI(
            cards[5],
            kpis.cgstCollected,
            value =>
                formatIndianCurrency(value)
        );


        this.updateKPI(
            cards[6],
            kpis.sgstCollected,
            value =>
                formatIndianCurrency(value)
        );


        this.updateKPI(
            cards[7],
            kpis.revenueLeakage,
            value =>
                formatIndianCurrency(value)
        );
    }


    /**
     * Update one financial KPI.
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
            'down',
            'warn'
        );


        if (trend === 'down') {
            element.classList.add(
                'down'
            );

            return;
        }


        if (trend === 'warn') {
            element.classList.add(
                'warn'
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
       CASH FLOW
    ===================================================== */

    /**
     * Render Cash Flow chart.
     *
     * @param {Object} data
     */
    renderCashFlow(data) {
        if (!data) {
            return;
        }

        const canvas =
            getById(
                'chartCashFlow'
            );

        if (!canvas) {
            return;
        }

        createCashFlowChart(
            canvas,
            data
        );

        this.chartsInitialized = true;
    }


    /* =====================================================
       GST TABLE
    ===================================================== */

    /**
     * Render GST collection table.
     *
     * Expected data:
     *
     * [
     *     {
     *         type: 'CGST',
     *         rateSlab: '9%',
     *         collected: 930000,
     *         status: 'Filed',
     *         statusType: 'ok'
     *     }
     * ]
     *
     * @param {Array} rows
     */
    renderGSTTable(rows) {
        if (
            !Array.isArray(rows) ||
            !rows.length
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


        rows.forEach(
            row => {
                const tableRow =
                    this.createGSTRow(
                        row
                    );

                if (tableRow) {
                    tbody.appendChild(
                        tableRow
                    );
                }
            }
        );
    }


    /**
     * Create one GST table row.
     *
     * @param {Object} row
     * @returns {HTMLTableRowElement|null}
     */
    createGSTRow(row) {
        if (!row) {
            return null;
        }


        const tableRow =
            document.createElement(
                'tr'
            );


        const typeCell =
            document.createElement(
                'td'
            );

        const rateCell =
            document.createElement(
                'td'
            );

        const collectedCell =
            document.createElement(
                'td'
            );

        const statusCell =
            document.createElement(
                'td'
            );


        setText(
            typeCell,
            row.type || '—'
        );


        setText(
            rateCell,
            row.rateSlab || '—'
        );


        if (
            row.collected !== undefined &&
            row.collected !== null
        ) {
            setText(
                collectedCell,
                formatIndianCurrency(
                    row.collected
                )
            );
        } else {
            setText(
                collectedCell,
                '—'
            );
        }


        const statusPill =
            document.createElement(
                'span'
            );


        statusPill.classList.add(
            'pill'
        );


        const statusType =
            row.statusType || 'warn';


        if (
            statusType === 'ok' ||
            statusType === 'warn' ||
            statusType === 'danger'
        ) {
            statusPill.classList.add(
                statusType
            );
        }


        setText(
            statusPill,
            row.status || '—'
        );


        statusCell.appendChild(
            statusPill
        );


        tableRow.append(
            typeCell,
            rateCell,
            collectedCell,
            statusCell
        );


        return tableRow;
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current financial data.
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
     * Clear Financial Intelligence UI.
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


        const tbody =
            this.container.querySelector(
                'table tbody'
            );


        if (tbody) {
            tbody.replaceChildren();
        }


        this.currentData = null;

        this.chartsInitialized = false;
    }
}


/**
 * Factory helper.
 *
 * @param {Object} options
 * @returns {FinancialIntelligence}
 */
export function createFinancialIntelligence(
    options = {}
) {
    return new FinancialIntelligence(
        options
    ).init();
}