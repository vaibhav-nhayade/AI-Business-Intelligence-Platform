/**
 * AI Business Intelligence Platform
 * Application Constants
 *
 * Central source of truth for application-wide
 * configuration values and static definitions.
 */

/* =========================================================
   APPLICATION
========================================================= */

export const APP = Object.freeze({
    NAME: 'InsightIQ Analytics',
    PLATFORM_NAME: 'AI Business Intelligence Platform',
    VERSION: '1.0.0'
});


/* =========================================================
   LOCALE & REGIONAL SETTINGS
========================================================= */

export const LOCALE = Object.freeze({
    LANGUAGE: 'en-IN',
    CURRENCY: 'INR',
    CURRENCY_SYMBOL: '₹',
    TIME_ZONE: 'Asia/Kolkata',
    DATE_LOCALE: 'en-IN',
    NUMBER_LOCALE: 'en-IN'
});


/* =========================================================
   DATE & TIME
========================================================= */

export const DATE_FORMATS = Object.freeze({
    DISPLAY: 'DD MMM YYYY',
    SHORT: 'DD/MM/YYYY',
    MONTH: 'MMM YYYY',
    TIME_24_HOUR: 'HH:mm:ss'
});


export const DATE_RANGES = Object.freeze({
    LAST_7_DAYS: 'Last 7 Days',
    LAST_30_DAYS: 'Last 30 Days',
    THIS_QUARTER: 'This Quarter',
    YTD: 'YTD',
    CUSTOM_RANGE: 'Custom Range'
});


/* =========================================================
   DATE RANGE SCALING
   Temporary frontend scaling used by the current
   dashboard prototype.
========================================================= */

export const DATE_RANGE_SCALE = Object.freeze({
    'Last 7 Days': 0.24,
    'Last 30 Days': 1,
    'This Quarter': 2.9,
    'YTD': 11.2,
    'Custom Range': 1
});


/* =========================================================
   DASHBOARD PAGE KEYS
========================================================= */

export const PAGE_KEYS = Object.freeze({
    EXECUTIVE: 'exec',

    AI_CENTER: 'mlhub',

    FRAUD: 'risk',
    SCAM: 'scam',
    FAKE_NEWS: 'fakenews',
    FORECAST: 'forecast',
    SEGMENTATION: 'segment',
    RECOMMENDATION: 'recommend',
    XAI: 'xai',

    REVENUE: 'revenue',
    CUSTOMER: 'customer',
    SALES: 'sales',
    MARKETING: 'marketing',
    PRODUCT: 'product',
    INVENTORY: 'inventory',
    SUPPLY_CHAIN: 'supply',
    FINANCE: 'finance',
    OPERATIONS: 'ops',
    SUPPORT: 'support',
    GEOGRAPHIC: 'geo',
    SUSTAINABILITY: 'sustain',

    ALERTS: 'alerts',
    REPORTS: 'reports',
    SETTINGS: 'settings'
});


/* =========================================================
   DASHBOARD PAGE METADATA
========================================================= */

export const PAGE_METADATA = Object.freeze({
    exec: {
        title: 'Executive Summary',
        subtitle: 'Morning brief · consolidated across all states & channels'
    },

    mlhub: {
        title: 'AI & Machine Learning Intelligence Center',
        subtitle: 'The predictive core of InsightIQ Analytics'
    },

    risk: {
        title: 'Fraud Detection',
        subtitle: 'Real-time transaction risk scoring'
    },

    scam: {
        title: 'Scam Detection',
        subtitle: 'Refund fraud, seller scams & account takeovers'
    },

    fakenews: {
        title: 'Fake News Detection',
        subtitle: 'Misinformation screening for brand-related content'
    },

    forecast: {
        title: 'Demand Forecasting',
        subtitle: 'Model-projected revenue and demand, festival-aware'
    },

    segment: {
        title: 'Customer Segmentation',
        subtitle: 'Automatic clustering by value and risk'
    },

    recommend: {
        title: 'Recommendation Engine',
        subtitle: 'Actions ranked by estimated impact'
    },

    xai: {
        title: 'Explainable AI (XAI)',
        subtitle: 'Reasoning behind every prediction'
    },

    revenue: {
        title: 'Revenue Intelligence',
        subtitle: 'Growth, targets, and where every rupee comes from'
    },

    customer: {
        title: 'Customer Intelligence',
        subtitle: 'Lifetime value, cohorts, and churn risk'
    },

    sales: {
        title: 'Sales Intelligence',
        subtitle: 'Trend, timing, and team performance'
    },

    marketing: {
        title: 'Marketing Intelligence',
        subtitle: 'Spend efficiency across every channel'
    },

    product: {
        title: 'Product Analytics',
        subtitle: 'What sells, what sits, what to discount'
    },

    inventory: {
        title: 'Inventory Intelligence',
        subtitle: 'Stock health across the network'
    },

    supply: {
        title: 'Supply Chain Analytics',
        subtitle: 'Supplier reliability and delivery performance'
    },

    finance: {
        title: 'Financial Intelligence',
        subtitle: 'Margin, cash flow, working capital & GST'
    },

    ops: {
        title: 'Operations Analytics',
        subtitle: 'Click-to-doorstep performance'
    },

    support: {
        title: 'Customer Support Analytics',
        subtitle: 'Ticket volume and resolution speed'
    },

    geo: {
        title: 'Geographic Intelligence',
        subtitle: 'Where the business is growing, state by state'
    },

    sustain: {
        title: 'Sustainability Dashboard',
        subtitle: 'Emissions, packaging, and ESG'
    },

    alerts: {
        title: 'Alerts Center',
        subtitle: 'Everything needing attention right now'
    },

    reports: {
        title: 'Report Center',
        subtitle: 'Schedule, export, and share'
    },

    settings: {
        title: 'Settings',
        subtitle: 'Console configuration and access'
    }
});


/* =========================================================
   INDIAN BUSINESS CONTEXT
========================================================= */

export const INDIAN_STATES = Object.freeze([
    'Maharashtra',
    'Gujarat',
    'Karnataka',
    'Tamil Nadu',
    'Delhi',
    'Telangana',
    'Rajasthan',
    'Uttar Pradesh',
    'West Bengal',
    'Madhya Pradesh',
    'Kerala',
    'Andhra Pradesh',
    'Punjab',
    'Haryana',
    'Bihar',
    'Odisha'
]);


export const PAYMENT_METHODS = Object.freeze([
    'UPI',
    'Credit Card',
    'Debit Card',
    'Net Banking',
    'Digital Wallet',
    'Cash on Delivery',
    'EMI'
]);


export const BUSINESS_CATEGORIES = Object.freeze([
    'Electronics',
    'Home',
    'Apparel',
    'Outdoor',
    'Beauty'
]);


/* =========================================================
   DASHBOARD DATA PERIODS
========================================================= */

export const MONTHS = Object.freeze([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]);


/* =========================================================
   CHART DATA LABELS
========================================================= */

export const CHART_PERIODS = Object.freeze({
    DAYS_30: Array.from(
        { length: 30 },
        (_, index) => `D${index + 1}`
    ),

    MONTHS_12: [
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
    ]
});


/* =========================================================
   STORAGE KEYS
========================================================= */

export const STORAGE_KEYS = Object.freeze({
    THEME: 'insightiq-theme',
    DATE_RANGE: 'insightiq-date-range',
    SIDEBAR_STATE: 'insightiq-sidebar-state',
    USER_PREFERENCES: 'insightiq-user-preferences'
});


/* =========================================================
   UI SETTINGS
========================================================= */

export const UI = Object.freeze({
    DEFAULT_DATE_RANGE: DATE_RANGES.LAST_30_DAYS,

    SIDEBAR_BREAKPOINT: 1024,

    TOAST_DURATION: 4000,

    MODAL_TRANSITION_DURATION: 200,

    DEBOUNCE_DELAY: 250,

    ANIMATION_DURATION: 900
});


/* =========================================================
   ACCESSIBILITY
========================================================= */

export const ACCESSIBILITY = Object.freeze({
    REDUCED_MOTION_QUERY: '(prefers-reduced-motion: reduce)'
});