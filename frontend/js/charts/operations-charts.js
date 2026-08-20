/**
 * AI Business Intelligence Platform
 * Operations Charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    LINE_CHART_OPTIONS,
    BAR_CHART_OPTIONS
} from '../config/chart-config.js';


/**
 * Order fulfillment trend.
 */
export function createFulfillmentChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'fulfillment',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Fulfillment',

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
 * Delivery performance.
 */
export function createDeliveryPerformanceChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'deliveryPerformance',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Delivery Rate',

                        data: data.values || [],

                        backgroundColor:
                            CHART_COLORS.AMBER,

                        borderRadius: 5,

                        borderSkipped: false
                    }
                ]
            },

            options: BAR_CHART_OPTIONS
        }
    );
}