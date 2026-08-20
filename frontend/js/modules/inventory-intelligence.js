/**
 * AI Business Intelligence Platform
 * Inventory Intelligence Module
 *
 * Responsibility:
 * - Coordinate Inventory Intelligence UI
 * - Render inventory KPI values
 * - Initialize Stock Aging chart
 * - Render reorder recommendations
 * - Accept externally supplied inventory data
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
    createInventoryLevelChart
} from '../charts/inventory-charts.js';


export class InventoryIntelligence {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-inventory'
            );

        this.currentData = null;

        this.chartsInitialized = false;
    }


    /**
     * Initialize the module.
     *
     * @returns {InventoryIntelligence}
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
     * Render Inventory Intelligence.
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

        this.renderStockAging(
            data.stockAging
        );

        this.renderReorderRecommendations(
            data.reorderRecommendations
        );
    }


    /* =====================================================
       KPI RENDERING
    ===================================================== */

    /**
     * Render Inventory KPI cards.
     *
     * Current page order:
     *
     * 1. Stock Turnover
     * 2. Avg Inventory Days
     * 3. Low Stock SKUs
     * 4. Warehouse Utilization
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
            kpis.stockTurnover
        );


        this.updateKPI(
            cards[1],
            kpis.avgInventoryDays
        );


        this.updateKPI(
            cards[2],
            kpis.lowStockSKUs
        );


        this.updateKPI(
            cards[3],
            kpis.warehouseUtilization
        );
    }


    /**
     * Update one Inventory KPI.
     *
     * @param {HTMLElement} card
     * @param {Object} metric
     */
    updateKPI(
        card,
        metric
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
                metric.value ?? '—'
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
       STOCK AGING
    ===================================================== */

    /**
     * Render Stock Aging Distribution.
     *
     * The existing chart layer already provides a bar-chart
     * implementation that accepts labels and values.
     *
     * @param {Object} data
     */
    renderStockAging(data) {
        if (!data) {
            return;
        }


        const canvas =
            getById(
                'chartStockAge'
            );


        if (!canvas) {
            return;
        }


        createInventoryLevelChart(
            canvas,
            data
        );


        this.chartsInitialized = true;
    }


    /* =====================================================
       REORDER RECOMMENDATIONS
    ===================================================== */

    /**
     * Render reorder recommendation table.
     *
     * Expected data:
     *
     * [
     *     {
     *         sku: '...',
     *         warehouse: '...',
     *         daysLeft: 5,
     *         action: 'Reorder now',
     *         actionType: 'bad'
     *     }
     * ]
     *
     * @param {Array} recommendations
     */
    renderReorderRecommendations(
        recommendations
    ) {
        if (
            !Array.isArray(
                recommendations
            ) ||
            !recommendations.length
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


        recommendations.forEach(
            recommendation => {
                const row =
                    this.createRecommendationRow(
                        recommendation
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
     * Create one reorder recommendation row.
     *
     * @param {Object} recommendation
     * @returns {HTMLTableRowElement|null}
     */
    createRecommendationRow(
        recommendation
    ) {
        if (!recommendation) {
            return null;
        }


        const row =
            document.createElement(
                'tr'
            );


        const skuCell =
            document.createElement(
                'td'
            );

        const warehouseCell =
            document.createElement(
                'td'
            );

        const daysCell =
            document.createElement(
                'td'
            );

        const actionCell =
            document.createElement(
                'td'
            );


        setText(
            skuCell,
            recommendation.sku || '—'
        );


        setText(
            warehouseCell,
            recommendation.warehouse || '—'
        );


        setText(
            daysCell,
            recommendation.daysLeft !== undefined
                ? String(
                    recommendation.daysLeft
                )
                : '—'
        );


        const actionPill =
            document.createElement(
                'span'
            );


        actionPill.classList.add(
            'pill'
        );


        const actionType =
            recommendation.actionType ||
            'warn';


        if (
            actionType === 'bad' ||
            actionType === 'warn' ||
            actionType === 'ok'
        ) {
            actionPill.classList.add(
                actionType
            );
        }


        setText(
            actionPill,
            recommendation.action || '—'
        );


        actionCell.appendChild(
            actionPill
        );


        row.append(
            skuCell,
            warehouseCell,
            daysCell,
            actionCell
        );


        return row;
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current Inventory data.
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
     * Clear Inventory Intelligence UI.
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
 * @returns {InventoryIntelligence}
 */
export function createInventoryIntelligence(
    options = {}
) {
    return new InventoryIntelligence(
        options
    ).init();
}