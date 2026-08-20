/**
 * AI Business Intelligence Platform
 * Chart.js Configuration
 *
 * Shared visual configuration for all dashboard charts.
 *
 * This file contains chart presentation rules only.
 * Business data belongs in /data.
 */

/* =========================================================
   INSIGHTIQ CHART PALETTE
========================================================= */

export const CHART_COLORS = Object.freeze({
    AMBER: '#E8A33D',
    TEAL: '#4FD1C5',
    RED: '#E8555C',
    MUTED: '#525D70',

    BLUE: '#6B7CFF',
    ORANGE: '#C47A1F',
    DARK: '#3A4658',

    TEXT_PRIMARY: '#EDF1F6',
    TEXT_SECONDARY: '#8A94A6',

    BACKGROUND: '#10151D',
    BORDER: 'rgba(255, 255, 255, 0.10)',

    GRID: 'rgba(120, 132, 150, 0.10)'
});


/* =========================================================
   CHART DEFAULTS
========================================================= */

export const CHART_DEFAULTS = Object.freeze({
    RESPONSIVE: true,

    MAINTAIN_ASPECT_RATIO: false,

    FONT_FAMILY: "'IBM Plex Mono', monospace",

    FONT_SIZE: 11,

    BORDER_COLOR: 'rgba(255, 255, 255, 0.06)'
});


/* =========================================================
   TOOLTIP CONFIGURATION
========================================================= */

export const TOOLTIP_CONFIG = Object.freeze({
    enabled: true,

    backgroundColor: 'rgba(16, 21, 29, 0.96)',

    titleColor: '#EDF1F6',

    bodyColor: '#8A94A6',

    borderColor: 'rgba(255, 255, 255, 0.10)',

    borderWidth: 1,

    padding: 10,

    cornerRadius: 10,

    displayColors: true,

    boxPadding: 4,

    caretSize: 5,

    titleFont: {
        family: "'Space Grotesk', sans-serif",
        weight: '600',
        size: 12
    },

    bodyFont: {
        family: "'IBM Plex Mono', monospace",
        size: 11.5
    }
});


/* =========================================================
   GRID CONFIGURATION
========================================================= */

export const GRID_CONFIG = Object.freeze({
    color: CHART_COLORS.GRID,
    drawTicks: false
});


/* =========================================================
   AXIS CONFIGURATION
========================================================= */

export const getAxisConfig = (scaleOptions = {}) => ({
    grid: GRID_CONFIG,

    border: {
        display: false
    },

    ticks: {
        color: CHART_COLORS.TEXT_SECONDARY,
        padding: 6
    },

    ...scaleOptions
});


/* =========================================================
   COMMON CHART OPTIONS
========================================================= */

export const COMMON_CHART_OPTIONS = Object.freeze({
    responsive: CHART_DEFAULTS.RESPONSIVE,

    maintainAspectRatio:
        CHART_DEFAULTS.MAINTAIN_ASPECT_RATIO,

    plugins: {
        legend: {
            display: false
        },

        tooltip: TOOLTIP_CONFIG
    }
});


/* =========================================================
   LINE CHART OPTIONS
========================================================= */

export const LINE_CHART_OPTIONS = Object.freeze({
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
        mode: 'index',
        intersect: false
    },

    plugins: {
        legend: {
            display: false
        },

        tooltip: TOOLTIP_CONFIG
    },

    scales: {
        x: getAxisConfig(),

        y: getAxisConfig()
    }
});


/* =========================================================
   BAR CHART OPTIONS
========================================================= */

export const BAR_CHART_OPTIONS = Object.freeze({
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false
        },

        tooltip: TOOLTIP_CONFIG
    },

    scales: {
        x: getAxisConfig(),

        y: getAxisConfig()
    }
});


/* =========================================================
   HORIZONTAL BAR CHART OPTIONS
========================================================= */

export const HORIZONTAL_BAR_CHART_OPTIONS = Object.freeze({
    responsive: true,

    maintainAspectRatio: false,

    indexAxis: 'y',

    plugins: {
        legend: {
            display: false
        },

        tooltip: TOOLTIP_CONFIG
    },

    scales: {
        x: getAxisConfig(),

        y: getAxisConfig()
    }
});


/* =========================================================
   DOUGHNUT CHART OPTIONS
========================================================= */

export const DOUGHNUT_CHART_OPTIONS = Object.freeze({
    responsive: true,

    maintainAspectRatio: false,

    cutout: '66%',

    plugins: {
        legend: {
            position: 'bottom',

            labels: {
                boxWidth: 9,
                boxHeight: 9,
                padding: 14,
                color: CHART_COLORS.TEXT_SECONDARY,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },

        tooltip: TOOLTIP_CONFIG
    }
});


/* =========================================================
   POLAR AREA CHART OPTIONS
========================================================= */

export const POLAR_AREA_CHART_OPTIONS = Object.freeze({
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: 'bottom',

            labels: {
                boxWidth: 10,
                color: CHART_COLORS.TEXT_SECONDARY
            }
        }
    },

    scales: {
        r: {
            grid: GRID_CONFIG,

            ticks: {
                display: false
            }
        }
    }
});


/* =========================================================
   GRADIENT HELPERS
========================================================= */

/**
 * Creates a vertical fade gradient for line charts.
 *
 * @param {Object} context - Chart.js scriptable context
 * @param {string} colorHex - Base color in hexadecimal format
 * @returns {CanvasGradient|string}
 */
export function createFadeGradient(context, colorHex) {
    const chartArea = context.chart.chartArea;

    if (!chartArea) {
        return `${colorHex}22`;
    }

    const gradient = context.chart.ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
    );

    gradient.addColorStop(0, `${colorHex}55`);
    gradient.addColorStop(1, `${colorHex}02`);

    return gradient;
}


/**
 * Creates a vertical gradient for bar charts.
 *
 * @param {Object} context - Chart.js scriptable context
 * @param {string} colorHex - Base color in hexadecimal format
 * @returns {CanvasGradient|string}
 */
export function createBarGradient(context, colorHex) {
    const chartArea = context.chart.chartArea;

    if (!chartArea) {
        return colorHex;
    }

    const gradient = context.chart.ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
    );

    gradient.addColorStop(0, colorHex);
    gradient.addColorStop(1, `${colorHex}99`);

    return gradient;
}