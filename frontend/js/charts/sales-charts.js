/**
 * AI Business Intelligence Platform
 * Sales Charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    LINE_CHART_OPTIONS,
    BAR_CHART_OPTIONS,
    HORIZONTAL_BAR_CHART_OPTIONS
} from '../config/chart-config.js';


/**
 * Sales trend.
 */
export function createSalesTrendChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'salesTrend',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Sales',

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


/**
 * Sales by region.
 */
export function createSalesRegionChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'salesRegion',
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
                            CHART_COLORS.TEAL,

                        borderRadius: 5,

                        borderSkipped: false
                    }
                ]
            },

            options: BAR_CHART_OPTIONS
        }
    );
}


/**
 * Top products by sales.
 */
export function createTopProductsChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'topProducts',
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

                        borderRadius: 5,

                        borderSkipped: false
                    }
                ]
            },

            options:
                HORIZONTAL_BAR_CHART_OPTIONS
        }
    );
}