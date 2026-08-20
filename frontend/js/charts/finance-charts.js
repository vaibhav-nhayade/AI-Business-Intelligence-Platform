/**
 * AI Business Intelligence Platform
 * Finance Charts
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
 * Profit trend.
 */
export function createProfitTrendChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'profitTrend',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Profit',

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
 * Expenses trend.
 */
export function createExpensesChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'expenses',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Expenses',

                        data: data.values || [],

                        backgroundColor:
                            CHART_COLORS.RED,

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
 * Cash flow trend.
 */
export function createCashFlowChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'cashFlow',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Cash Flow',

                        data: data.values || [],

                        borderColor:
                            CHART_COLORS.BLUE,

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