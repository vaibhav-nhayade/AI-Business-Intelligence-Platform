/**
 * AI Business Intelligence Platform
 * Marketing Analytics Charts
 *
 * Responsibility:
 * - Create Marketing Analytics charts
 * - Handle Marketing-specific Chart.js configuration
 * - Accept externally supplied data
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
    BAR_CHART_OPTIONS,
    DOUGHNUT_CHART_OPTIONS
} from '../config/chart-config.js';


/* =========================================================
   TRAFFIC SOURCES
========================================================= */

/**
 * Create Traffic Sources chart.
 *
 * Expected data:
 *
 * {
 *     labels: [],
 *     values: []
 * }
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createTrafficSourcesChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'marketingTrafficSources',
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
   CAMPAIGN PERFORMANCE
========================================================= */

/**
 * Create Campaign Performance chart.
 *
 * Expected data:
 *
 * {
 *     labels: [],
 *     values: []
 * }
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createCampaignPerformanceChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'marketingCampaignPerformance',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label:
                            data.label ||
                            'Conversions',

                        data: data.values || [],

                        backgroundColor:
                            CHART_COLORS.TEAL,

                        borderRadius: 6,

                        borderSkipped: false,

                        maxBarThickness: 42,

                        hoverBackgroundColor:
                            CHART_COLORS.TEAL
                    }
                ]
            },

            options: {
                ...BAR_CHART_OPTIONS,

                indexAxis: 'y',

                scales: {
                    ...BAR_CHART_OPTIONS.scales,

                    x: {
                        ...BAR_CHART_OPTIONS.scales.x,

                        beginAtZero: true
                    }
                }
            }
        }
    );
}