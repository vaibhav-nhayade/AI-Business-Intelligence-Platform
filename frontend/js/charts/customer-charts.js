/**
 * AI Business Intelligence Platform
 * Customer Charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    LINE_CHART_OPTIONS,
    DOUGHNUT_CHART_OPTIONS
} from '../config/chart-config.js';


/**
 * Customer acquisition trend.
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


/**
 * Customer segmentation distribution.
 */
export function createCustomerSegmentChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'customerSegments',
        canvas,
        {
            type: 'doughnut',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        data: data.values || [],

                        backgroundColor: [
                            CHART_COLORS.AMBER,
                            CHART_COLORS.TEAL,
                            CHART_COLORS.RED,
                            CHART_COLORS.BLUE
                        ],

                        borderWidth: 0
                    }
                ]
            },

            options: DOUGHNUT_CHART_OPTIONS
        }
    );
}


/**
 * Customer retention trend.
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