/**
 * AI Business Intelligence Platform
 * Revenue Charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    LINE_CHART_OPTIONS,
    BAR_CHART_OPTIONS,
    createFadeGradient,
    createBarGradient
} from '../config/chart-config.js';


/**
 * Create Revenue Trend chart.
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

                        tension: 0.35,

                        borderWidth: 2,

                        pointRadius: 0,

                        pointHoverRadius: 5,

                        pointHoverBackgroundColor:
                            CHART_COLORS.AMBER
                    }
                ]
            },

            options: {
                ...LINE_CHART_OPTIONS,

                scales: {
                    ...LINE_CHART_OPTIONS.scales,

                    y: {
                        ...LINE_CHART_OPTIONS.scales.y,

                        beginAtZero: false
                    }
                }
            }
        }
    );
}


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
        'revenueCategory',
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
                                CHART_COLORS.TEAL
                            ),

                        borderRadius: 6,

                        borderSkipped: false
                    }
                ]
            },

            options: BAR_CHART_OPTIONS
        }
    );
}


/**
 * Create Revenue Growth chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRevenueGrowthChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'revenueGrowth',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Growth',

                        data: data.values || [],

                        borderColor:
                            CHART_COLORS.TEAL,

                        backgroundColor:
                            'transparent',

                        tension: 0.35,

                        borderWidth: 2,

                        pointRadius: 2
                    }
                ]
            },

            options: {
                ...LINE_CHART_OPTIONS,

                scales: {
                    ...LINE_CHART_OPTIONS.scales,

                    y: {
                        ...LINE_CHART_OPTIONS.scales.y,

                        ticks: {
                            ...LINE_CHART_OPTIONS.scales.y.ticks,

                            callback: value =>
                                `${value}%`
                        }
                    }
                }
            }
        }
    );
}