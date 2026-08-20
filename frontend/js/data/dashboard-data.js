/**
 * AI Business Intelligence Platform
 * Dashboard Mock Data
 *
 * Frontend-only data layer.
 *
 * IMPORTANT:
 * - No DOM manipulation here.
 * - No Chart.js logic here.
 * - No business calculations here.
 * - No module-specific UI logic here.
 *
 * This file provides a predictable data contract for the
 * dashboard modules and chart layer.
 */


/* =========================================================
   EXECUTIVE SUMMARY
========================================================= */

export const executiveSummary = Object.freeze({
    revenue: {
        value: 18492000,
        previousValue: 16528000,
        changePercentage: 11.88,
        trend: 'up'
    },

    orders: {
        value: 48260,
        previousValue: 43180,
        changePercentage: 11.77,
        trend: 'up'
    },

    customers: {
        value: 128450,
        previousValue: 117920,
        changePercentage: 8.93,
        trend: 'up'
    },

    profit: {
        value: 3920000,
        previousValue: 3410000,
        changePercentage: 14.96,
        trend: 'up'
    },

    averageOrderValue: {
        value: 3832,
        previousValue: 3827,
        changePercentage: 0.13,
        trend: 'stable'
    },

    conversionRate: {
        value: 4.82,
        previousValue: 4.51,
        changePercentage: 6.87,
        trend: 'up'
    }
});


/* =========================================================
   REVENUE INTELLIGENCE
========================================================= */

export const revenueData = Object.freeze({
    trend: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            12400000,
            13150000,
            13820000,
            14680000,
            15920000,
            15180000,
            16450000,
            17120000,
            17680000,
            18150000,
            17890000,
            18492000
        ]
    },

    growth: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            6.2,
            8.4,
            9.1,
            11.5,
            14.8,
            9.6,
            12.4,
            13.1,
            11.8,
            10.6,
            9.8,
            11.9
        ]
    },

    category: {
        labels: [
            'Electronics',
            'Home',
            'Apparel',
            'Outdoor',
            'Beauty'
        ],

        values: [
            6200000,
            4180000,
            3240000,
            2110000,
            1212000
        ]
    }
});


/* =========================================================
   CUSTOMER INTELLIGENCE
========================================================= */

export const customerData = Object.freeze({
    acquisition: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            8420,
            9150,
            9780,
            10450,
            11920,
            10180,
            11240,
            11860,
            12340,
            12980,
            12640,
            13720
        ]
    },

    retention: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            68.2,
            69.1,
            70.4,
            71.2,
            72.6,
            71.8,
            73.1,
            74.2,
            75.1,
            74.8,
            76.2,
            77.1
        ]
    },

    segments: {
        labels: [
            'High Value',
            'Loyal',
            'Growth',
            'At Risk'
        ],

        values: [
            18,
            34,
            31,
            17
        ]
    }
});


/* =========================================================
   SALES ANALYTICS
========================================================= */

export const salesData = Object.freeze({
    trend: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            3240,
            3510,
            3690,
            3820,
            4210,
            3980,
            4360,
            4510,
            4680,
            4810,
            4740,
            5120
        ]
    },

    region: {
        labels: [
            'Maharashtra',
            'Karnataka',
            'Gujarat',
            'Delhi',
            'Tamil Nadu',
            'Telangana'
        ],

        values: [
            5240000,
            3870000,
            2940000,
            2310000,
            2080000,
            1750000
        ]
    },

    topProducts: {
        labels: [
            'Smartphone Pro',
            'Wireless Earbuds',
            'Smart TV',
            'Laptop Air',
            'Fitness Watch'
        ],

        values: [
            1840000,
            1260000,
            1130000,
            980000,
            760000
        ]
    }
});


/* =========================================================
   MARKETING ANALYTICS
========================================================= */

export const marketingData = Object.freeze({
    channels: {
        labels: [
            'Google Ads',
            'Meta',
            'YouTube',
            'Email',
            'Affiliate'
        ],

        values: [
            1840,
            1520,
            980,
            740,
            510
        ]
    },

    roi: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            2.8,
            3.1,
            3.4,
            3.7,
            4.1,
            3.8,
            4.3,
            4.5,
            4.7,
            4.4,
            4.8,
            5.1
        ]
    }
});


/* =========================================================
   FINANCIAL INTELLIGENCE
========================================================= */

export const financeData = Object.freeze({
    profitTrend: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            2180000,
            2310000,
            2460000,
            2630000,
            2910000,
            2740000,
            3050000,
            3290000,
            3470000,
            3610000,
            3780000,
            3920000
        ]
    },

    expenses: {
        labels: [
            'Operations',
            'Marketing',
            'Logistics',
            'Technology',
            'Administration'
        ],

        values: [
            2840000,
            1960000,
            1730000,
            1120000,
            840000
        ]
    },

    cashFlow: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            1240000,
            1390000,
            1480000,
            1620000,
            1850000,
            1710000,
            1940000,
            2110000,
            2280000,
            2390000,
            2470000,
            2610000
        ]
    }
});


/* =========================================================
   INVENTORY INTELLIGENCE
========================================================= */

export const inventoryData = Object.freeze({
    levels: {
        labels: [
            'Electronics',
            'Home',
            'Apparel',
            'Outdoor',
            'Beauty'
        ],

        values: [
            8420,
            12600,
            15300,
            7280,
            10940
        ]
    },

    warehouses: {
        labels: [
            'Mumbai',
            'Pune',
            'Bengaluru',
            'Delhi NCR'
        ],

        values: [
            34,
            26,
            23,
            17
        ]
    }
});


/* =========================================================
   OPERATIONS ANALYTICS
========================================================= */

export const operationsData = Object.freeze({
    fulfillment: {
        labels: [
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul'
        ],

        values: [
            91.2,
            92.1,
            92.8,
            93.4,
            94.1,
            93.8,
            94.7,
            95.1,
            95.6,
            95.2,
            96.1,
            96.4
        ]
    },

    delivery: {
        labels: [
            'Maharashtra',
            'Gujarat',
            'Karnataka',
            'Delhi',
            'Tamil Nadu',
            'Telangana'
        ],

        values: [
            96.4,
            95.8,
            94.9,
            94.2,
            93.8,
            93.5
        ]
    }
});


/* =========================================================
   GLOBAL DASHBOARD DATA
========================================================= */

export const dashboardData = Object.freeze({
    executiveSummary,

    revenue: revenueData,

    customer: customerData,

    sales: salesData,

    marketing: marketingData,

    finance: financeData,

    inventory: inventoryData,

    operations: operationsData
});


/* =========================================================
   DATA ACCESS
========================================================= */

/**
 * Get the complete dashboard dataset.
 *
 * @returns {Object}
 */
export function getDashboardData() {
    return dashboardData;
}


/**
 * Get a specific dashboard domain.
 *
 * @param {string} domain
 * @returns {Object|null}
 */
export function getDomainData(domain) {
    if (!domain) {
        return null;
    }

    return dashboardData[domain] || null;
}