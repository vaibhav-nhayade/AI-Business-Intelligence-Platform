/**
 * AI Business Intelligence Platform
 * Marketing Charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    BAR_CHART_OPTIONS,
    LINE_CHART_OPTIONS
} from '../config/chart-config.js';


/**
 * Marketing channel performance.
 */
export function createMarketingChannelChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'marketingChannels',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Conversions',

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
 * Marketing ROI trend.
 */
export function createMarketingROIChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'marketingROI',
        canvas,
        {
            type: 'line',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'ROI',

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