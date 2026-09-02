/**
 * AI Business Intelligence Platform
 * Revenue Intelligence Charts
 *
 * Responsibility:
 * - Create Revenue Intelligence charts
 * - Own Revenue-specific Chart.js configuration
 * - Accept data from an external source
 *
 * This file does NOT:
 * - Fetch data
 * - Store business data
 * - Contain business datasets
 * - Manipulate unrelated dashboard UI
 *
 * Data contract:
 * {
 *     labels: [],
 *     values: [],
 *     colors: []
 * }
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    LINE_CHART_OPTIONS,
    BAR_CHART_OPTIONS,
    DOUGHNUT_CHART_OPTIONS,
    createFadeGradient,
    createBarGradient
} from '../config/chart-config.js';


/* =========================================================
   SHARED CONFIGURATION
========================================================= */

/**
 * Default colors for Revenue doughnut charts.
 *
 * Data supplied by the caller can override these using
 * data.colors.
 */
const REVENUE_DONUT_COLORS = [
    CHART_COLORS.AMBER,
    CHART_COLORS.TEAL,
    CHART_COLORS.BLUE,
    CHART_COLORS.ORANGE,
    CHART_COLORS.DARK
];


/**
 * Default colors for Revenue Waterfall.
 *
 * Data supplied by the caller can override these using
 * data.colors.
 */
const REVENUE_WATERFALL_COLORS = [
    CHART_COLORS.MUTED,
    CHART_COLORS.TEAL,
    CHART_COLORS.TEAL,
    CHART_COLORS.RED,
    CHART_COLORS.RED,
    CHART_COLORS.AMBER
];


/* =========================================================
   REVENUE BY CATEGORY
========================================================= */

/**
 * Create Revenue by Category chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenueCategoryChart(
    canvas,
    data
) {
    if (!canvas || !data) {
        return null;
    }


    return chartManager.create(
        'revenueByCategory',
        canvas,
        {
            type: 'doughnut',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        data: data.values || [],

                        backgroundColor:
                            data.colors ||
                            REVENUE_DONUT_COLORS,

                        borderColor:
                            CHART_COLORS.BACKGROUND,

                        borderWidth: 3,

                        hoverOffset: 6,

                        borderRadius: 4
                    }
                ]
            },

            options:
                DOUGHNUT_CHART_OPTIONS
        }
    );
}


/* =========================================================
   REVENUE BY PAYMENT METHOD
========================================================= */

/**
 * Create Revenue by Payment Method chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenuePaymentChart(
    canvas,
    data
) {
    if (!canvas || !data) {
        return null;
    }


    return chartManager.create(
        'revenueByPayment',
        canvas,
        {
            type: 'doughnut',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        data: data.values || [],

                        backgroundColor:
                            data.colors ||
                            REVENUE_DONUT_COLORS,

                        borderColor:
                            CHART_COLORS.BACKGROUND,

                        borderWidth: 3,

                        hoverOffset: 6,

                        borderRadius: 4
                    }
                ]
            },

            options:
                DOUGHNUT_CHART_OPTIONS
        }
    );
}


/* =========================================================
   MONTHLY REVENUE
========================================================= */

/**
 * Create Monthly Revenue chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createMonthlyRevenueChart(
    canvas,
    data
) {
    if (!canvas || !data) {
        return null;
    }


    return chartManager.create(
        'revenueMonthly',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label:
                            data.label ||
                            'Revenue',

                        data: data.values || [],

                        backgroundColor:
                            context =>
                                createBarGradient(
                                    context,
                                    CHART_COLORS.AMBER
                                ),

                        borderRadius: 6,

                        maxBarThickness: 34,

                        borderSkipped: false,

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

                        title: {
                            display: true,

                            text:
                                data.yAxisLabel ||
                                'Revenue'
                        }
                    }
                }
            }
        }
    );
}


/* =========================================================
   REVENUE WATERFALL
========================================================= */

/**
 * Create Revenue Waterfall chart.
 *
 * Expected data:
 *
 * {
 *     labels: [],
 *     ranges: [],
 *     colors: []
 * }
 *
 * `ranges` should contain the start/end values
 * required by the Chart.js floating-bar format.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenueWaterfallChart(
    canvas,
    data
) {
    if (!canvas || !data) {
        return null;
    }


    return chartManager.create(
        'revenueWaterfall',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label:
                            data.label ||
                            'Revenue',

                        data: data.ranges || [],

                        backgroundColor:
                            data.colors ||
                            REVENUE_WATERFALL_COLORS,

                        borderRadius: 4,

                        borderSkipped: false
                    }
                ]
            },

            options: {
                ...BAR_CHART_OPTIONS,

                parsing: {
                    yAxisKey: 'value'
                },

                scales: {
                    ...BAR_CHART_OPTIONS.scales,

                    y: {
                        ...BAR_CHART_OPTIONS.scales.y,

                        title: {
                            display: true,

                            text:
                                data.yAxisLabel ||
                                '₹ Cr'
                        }
                    }
                }
            }
        }
    );
}


/* =========================================================
   REVENUE TREND
========================================================= */

/**
 * Create Revenue Trend chart.
 *
 * This chart remains available for Executive Summary
 * or future Revenue Intelligence views.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenueTrendChart(
    canvas,
    data
) {
    if (!canvas || !data) {
        return null;
    }


    return chartManager.create(
        'revenueTrend',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label:
                            data.label ||
                            'Revenue',

                        data: data.values || [],

                        borderColor:
                            CHART_COLORS.AMBER,

                        backgroundColor:
                            context =>
                                createFadeGradient(
                                    context,
                                    CHART_COLORS.AMBER
                                ),

                        fill: true,

                        tension: 0.4,

                        pointRadius: 0,

                        pointHoverRadius: 4,

                        pointHoverBackgroundColor:
                            CHART_COLORS.AMBER,

                        pointHoverBorderColor:
                            CHART_COLORS.BACKGROUND,

                        pointHoverBorderWidth: 2,

                        borderWidth: 2.25
                    }
                ]
            },

            options:
                LINE_CHART_OPTIONS
        }
    );
}