/**
 * AI Business Intelligence Platform
 * Chart Manager
 *
 * Centralized Chart.js lifecycle management.
 */

import {
    COMMON_CHART_OPTIONS
} from '../config/chart-config.js';


export class ChartManager {
    constructor() {
        this.charts = new Map();
    }


    /**
     * Create and register a Chart.js instance.
     *
     * @param {string} id
     * @param {HTMLCanvasElement|string} canvas
     * @param {Object} config
     * @returns {Chart|null}
     */
    create(id, canvas, config) {
        if (
            !id ||
            !canvas ||
            !config ||
            typeof Chart === 'undefined'
        ) {
            return null;
        }

        const canvasElement =
            typeof canvas === 'string'
                ? document.querySelector(canvas)
                : canvas;

        if (!canvasElement) {
            return null;
        }

        this.destroy(id);

        const finalConfig = {
            ...config,
            options: {
                ...COMMON_CHART_OPTIONS,
                ...(config.options || {}),
                plugins: {
                    ...COMMON_CHART_OPTIONS.plugins,
                    ...(config.options?.plugins || {})
                }
            }
        };

        const chart = new Chart(
            canvasElement,
            finalConfig
        );

        this.charts.set(id, chart);

        return chart;
    }


    /**
     * Get a registered chart.
     *
     * @param {string} id
     * @returns {Chart|null}
     */
    get(id) {
        return this.charts.get(id) || null;
    }


    /**
     * Check whether a chart exists.
     *
     * @param {string} id
     * @returns {boolean}
     */
    has(id) {
        return this.charts.has(id);
    }


    /**
     * Update a chart.
     *
     * @param {string} id
     * @param {Object} data
     * @param {Object} [options]
     */
    update(id, data, options = {}) {
        const chart = this.get(id);

        if (!chart) {
            return;
        }

        if (data) {
            chart.data = data;
        }

        Object.assign(
            chart.options,
            options
        );

        chart.update();
    }


    /**
     * Destroy a chart.
     *
     * @param {string} id
     */
    destroy(id) {
        const chart = this.get(id);

        if (!chart) {
            return;
        }

        chart.destroy();

        this.charts.delete(id);
    }


    /**
     * Destroy every managed chart.
     */
    destroyAll() {
        this.charts.forEach(chart => {
            chart.destroy();
        });

        this.charts.clear();
    }


    /**
     * Resize a chart.
     *
     * @param {string} id
     */
    resize(id) {
        const chart = this.get(id);

        if (!chart) {
            return;
        }

        chart.resize();
    }


    /**
     * Resize all charts.
     */
    resizeAll() {
        this.charts.forEach(chart => {
            chart.resize();
        });
    }


    /**
     * Get number of active charts.
     *
     * @returns {number}
     */
    count() {
        return this.charts.size;
    }
}


/**
 * Shared application chart manager.
 */
export const chartManager =
    new ChartManager();