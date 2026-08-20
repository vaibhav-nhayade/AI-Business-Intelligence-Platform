/**
 * AI Business Intelligence Platform
 * Customer Intelligence Charts
 *
 * Responsibility:
 * - Create Customer Intelligence charts
 * - Handle Customer-specific Chart.js configuration
 * - Accept externally supplied data
 *
 * This file does NOT:
 * - Fetch data
 * - Store business data
 * - Manipulate dashboard DOM outside charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    LINE_CHART_OPTIONS,
    HORIZONTAL_BAR_CHART_OPTIONS,
    POLAR_AREA_CHART_OPTIONS
} from '../config/chart-config.js';


/* =========================================================
   RFM SEGMENTATION
========================================================= */

/**
 * Create RFM Segmentation chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createRFMSegmentationChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'customerRFM',
        canvas,
        {
            type: 'polarArea',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        data: data.values || [],

                        backgroundColor:
                            data.colors || [
                                `${CHART_COLORS.AMBER}cc`,
                                `${CHART_COLORS.TEAL}cc`,
                                `${CHART_COLORS.BLUE}cc`,
                                `${CHART_COLORS.ORANGE}cc`,
                                `${CHART_COLORS.DARK}cc`
                            ],

                        borderColor:
                            CHART_COLORS.BACKGROUND,

                        borderWidth: 1
                    }
                ]
            },

            options: {
                ...POLAR_AREA_CHART_OPTIONS,

                scales: {
                    r: {
                        grid: {
                            color:
                                CHART_COLORS.GRID
                        },

                        ticks: {
                            display: false
                        }
                    }
                }
            }
        }
    );
}


/* =========================================================
   CUSTOMER COHORT RETENTION
========================================================= */

/**
 * Create Customer Cohort Retention chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createCustomerCohortChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'customerCohort',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Retention',

                        data: data.values || [],

                        borderColor:
                            CHART_COLORS.TEAL,

                        backgroundColor:
                            'transparent',

                        fill: false,

                        tension: 0.35,

                        borderWidth: 2,

                        pointRadius: 2,

                        pointHoverRadius: 5,

                        pointBackgroundColor:
                            CHART_COLORS.TEAL
                    }
                ]
            },

            options: {
                ...LINE_CHART_OPTIONS,

                scales: {
                    ...LINE_CHART_OPTIONS.scales,

                    y: {
                        ...LINE_CHART_OPTIONS.scales.y,

                        min: 0,

                        max: 100,

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


/* =========================================================
   CUSTOMER FUNNEL
========================================================= */

/**
 * Create Customer Funnel chart.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createCustomerFunnelChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'customerFunnel',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Customers',

                        data: data.values || [],

                        backgroundColor:
                            data.color ||
                            CHART_COLORS.AMBER,

                        borderRadius: 6,

                        borderSkipped: false,

                        maxBarThickness: 34
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


/* =========================================================
   CUSTOMER ACQUISITION
========================================================= */

/**
 * Create Customer Acquisition chart.
 *
 * Kept available for future Customer Intelligence
 * expansion.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createCustomerAcquisitionChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'customerAcquisition',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Customers',

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

            options: LINE_CHART_OPTIONS
        }
    );
}


/* =========================================================
   CUSTOMER RETENTION
========================================================= */

/**
 * Create Customer Retention chart.
 *
 * Available for future Customer Intelligence views.
 *
 * @param {string|HTMLCanvasElement} canvas
 * @param {Object} data
 * @returns {Chart|null}
 */
export function createCustomerRetentionChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'customerRetention',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Retention',

                        data: data.values || [],

                        borderColor:
                            CHART_COLORS.AMBER,

                        backgroundColor:
                            'transparent',

                        tension: 0.35,

                        borderWidth: 2,

                        pointRadius: 2
                    }
                ]
            },

            options: LINE_CHART_OPTIONS
        }
    );
}