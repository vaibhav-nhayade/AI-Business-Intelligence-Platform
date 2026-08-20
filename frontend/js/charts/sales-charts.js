/**
 * AI Business Intelligence Platform
 * Sales Analytics Charts
 *
 * Responsibility:
 * - Create Sales Analytics charts
 * - Handle Sales-specific Chart.js configuration
 * - Accept externally supplied data
 *
 * This file does NOT:
 * - Fetch data
 * - Store business data
 * - Manipulate dashboard DOM
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    BAR_CHART_OPTIONS,
    HORIZONTAL_BAR_CHART_OPTIONS
} from '../config/chart-config.js';


/* =========================================================
   HOURLY SALES PATTERN
========================================================= */

/**
 * Create Hourly Sales Pattern chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createHourlySalesChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'salesHourly',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Sales',

                        data: data.values || [],

                        backgroundColor:
                            CHART_COLORS.AMBER,

                        borderRadius: 6,

                        borderSkipped: false,

                        maxBarThickness: 34,

                        hoverBackgroundColor:
                            CHART_COLORS.AMBER
                    }
                ]
            },

            options: {
                ...BAR_CHART_OPTIONS,

                scales: {
                    ...BAR_CHART_OPTIONS.scales,

                    y: {
                        ...BAR_CHART_OPTIONS.scales.y,

                        beginAtZero: true
                    }
                }
            }
        }
    );
}


/* =========================================================
   SALES CONVERSION FUNNEL
========================================================= */

/**
 * Create Sales Conversion Funnel chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createSalesFunnelChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'salesFunnel',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Opportunities',

                        data: data.values || [],

                        backgroundColor:
                            CHART_COLORS.TEAL,

                        borderRadius: 6,

                        borderSkipped: false,

                        maxBarThickness: 38,

                        hoverBackgroundColor:
                            CHART_COLORS.TEAL
                    }
                ]
            },

            options: {
                ...HORIZONTAL_BAR_CHART_OPTIONS,

                scales: {
                    ...HORIZONTAL_BAR_CHART_OPTIONS.scales,

                    x: {
                        ...HORIZONTAL_BAR_CHART_OPTIONS.scales.x,

                        beginAtZero: true
                    }
                }
            }
        }
    );
}