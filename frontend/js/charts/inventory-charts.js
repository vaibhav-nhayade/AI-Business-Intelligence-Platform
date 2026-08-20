/**
 * AI Business Intelligence Platform
 * Inventory Charts
 */

import {
    chartManager
} from './chart-manager.js';

import {
    CHART_COLORS,
    BAR_CHART_OPTIONS,
    DOUGHNUT_CHART_OPTIONS
} from '../config/chart-config.js';


/**
 * Inventory levels.
 */
export function createInventoryLevelChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'inventoryLevels',
        canvas,
        {
            type: 'bar',

            data: {
                labels: data.labels || [],

                datasets: [
                    {
                        label: 'Stock',

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
 * Warehouse distribution.
 */
export function createWarehouseDistributionChart(
    canvas,
    data
) {
    if (!data) {
        return null;
    }

    return chartManager.create(
        'warehouseDistribution',
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
                            CHART_COLORS.BLUE,
                            CHART_COLORS.ORANGE
                        ],

                        borderWidth: 0
                    }
                ]
            },

            options: DOUGHNUT_CHART_OPTIONS
        }
    );
}