/**
 * AI Business Intelligence Platform
 * Revenue Charts
 *
 * Responsibility:
 * - Create Revenue Intelligence charts
 * - Own Revenue-specific Chart.js configuration
 * - Accept data from an external source
 *
 * This file does NOT:
 * - Fetch data
 * - Store business data
 * - Manipulate unrelated dashboard UI
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
    if (!data) {
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
                            data.colors || [
                                CHART_COLORS.AMBER,
                                CHART_COLORS.TEAL,
                                CHART_COLORS.BLUE,
                                CHART_COLORS.ORANGE,
                                CHART_COLORS.DARK
                            ],

                        borderColor:
                            CHART_COLORS.BACKGROUND,

                        borderWidth: 3,

                        hoverOffset: 6,

                        borderRadius: 4
                    }
                ]
            },

            options: DOUGHNUT_CHART_OPTIONS
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
    if (!data) {
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
                            data.colors || [
                                CHART_COLORS.AMBER,
                                CHART_COLORS.TEAL,
                                CHART_COLORS.BLUE,
                                CHART_COLORS.ORANGE,
                                CHART_COLORS.DARK
                            ],

                        borderColor:
                            CHART_COLORS.BACKGROUND,

                        borderWidth: 3,

                        hoverOffset: 6,

                        borderRadius: 4
                    }
                ]
            },

            options: DOUGHNUT_CHART_OPTIONS
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
    if (!data) {
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
                        label: 'Revenue',

                        data: data.values || [],

                        backgroundColor: context =>
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
                            text: 'Revenue'
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
 * The data format expected:
 *
 * {
 *     labels: ['Start', 'New', 'Upsell', ...],
 *     ranges: [
 *         [0, 3.6],
 *         [3.6, 3.9],
 *         ...
 *     ],
 *     colors: [...]
 * }
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenueWaterfallChart(
    canvas,
    data
) {
    if (!data) {
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
                        label: 'Revenue',

                        data: data.ranges || [],

                        backgroundColor:
                            data.colors || [
                                CHART_COLORS.MUTED,
                                CHART_COLORS.TEAL,
                                CHART_COLORS.TEAL,
                                CHART_COLORS.RED,
                                CHART_COLORS.RED,
                                CHART_COLORS.AMBER
                            ],

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
                            text: '₹ Cr'
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
 * Kept available for future Executive/Revenue views.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenueTrendChart(
    canvas,
    data
) {
    if (!data) {
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
                        label: 'Revenue',

                        data: data.values || [],

                        borderColor:
                            CHART_COLORS.AMBER,

                        backgroundColor: context =>
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

            options: LINE_CHART_OPTIONS
        }
    );
}