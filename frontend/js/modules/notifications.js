/**
 * AI Business Intelligence Platform
 * Notifications / Alerts Module
 *
 * Responsibility:
 * - Coordinate Alerts Center UI
 * - Render alerts dynamically
 * - Manage alert severity presentation
 * - Provide alert filtering and clearing helpers
 * - Accept externally supplied alert data
 *
 * This module does NOT:
 * - Fetch backend data
 * - Implement ML
 * - Contain hard-coded alert data
 * - Manage unrelated dashboard modules
 */

import {
    getById,
    setText
} from '../core/dom.js';


export class Notifications {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-alerts'
            );

        this.currentAlerts = [];
    }


    /**
     * Initialize the Notifications module.
     *
     * @returns {Notifications}
     */
    init() {
        if (!this.container) {
            return this;
        }

        return this;
    }


    /* =====================================================
       RENDER
    ===================================================== */

    /**
     * Render Alerts Center.
     *
     * @param {Array} alerts
     */
    render(alerts) {
        if (
            !Array.isArray(alerts) ||
            !this.container
        ) {
            return;
        }

        this.currentAlerts = [
            ...alerts
        ];

        this.renderAlerts(
            this.currentAlerts
        );
    }


    /**
     * Render alert rows.
     *
     * @param {Array} alerts
     */
    renderAlerts(alerts) {
        if (!this.container) {
            return;
        }


        this.removeExistingAlerts();


        alerts.forEach(
            alert => {
                const element =
                    this.createAlert(
                        alert
                    );

                if (element) {
                    this.container.appendChild(
                        element
                    );
                }
            }
        );
    }


    /* =====================================================
       ALERT CREATION
    ===================================================== */

    /**
     * Create one alert row.
     *
     * Expected data:
     *
     * {
     *     severity: 'critical',
     *     title: '...',
     *     category: 'INVENTORY',
     *     time: '2 min ago'
     * }
     *
     * @param {Object} alert
     * @returns {HTMLElement|null}
     */
    createAlert(alert) {
        if (!alert) {
            return null;
        }


        const row =
            document.createElement(
                'div'
            );


        row.classList.add(
            'alert-row'
        );


        if (alert.id !== undefined) {
            row.dataset.alertId =
                String(
                    alert.id
                );
        }


        if (
            alert.read === false
        ) {
            row.dataset.unread =
                'true';
        }


        const dot =
            document.createElement(
                'div'
            );


        dot.classList.add(
            'alert-dot'
        );


        dot.classList.add(
            this.getSeverityClass(
                alert.severity
            )
        );


        const body =
            document.createElement(
                'div'
            );


        body.classList.add(
            'body'
        );


        const title =
            document.createElement(
                'div'
            );


        title.classList.add(
            't'
        );


        setText(
            title,
            alert.title || 'Alert'
        );


        const meta =
            document.createElement(
                'div'
            );


        meta.classList.add(
            's'
        );


        setText(
            meta,
            this.buildMetaText(
                alert
            )
        );


        body.append(
            title,
            meta
        );


        row.append(
            dot,
            body
        );


        return row;
    }


    /**
     * Convert severity into the existing CSS class.
     *
     * Existing dashboard classes:
     *
     * crit
     * warn
     *
     * @param {string} severity
     * @returns {string}
     */
    getSeverityClass(
        severity
    ) {
        switch (
            String(
                severity || ''
            ).toLowerCase()
        ) {
            case 'critical':
            case 'crit':
            case 'high':
                return 'crit';


            case 'warning':
            case 'warn':
            case 'medium':
                return 'warn';


            default:
                return 'warn';
        }
    }


    /**
     * Build alert metadata.
     *
     * @param {Object} alert
     * @returns {string}
     */
    buildMetaText(alert) {
        const category =
            alert.category ||
            'SYSTEM';


        const time =
            alert.time ||
            '';


        if (!time) {
            return category;
        }


        return `${category} · ${time}`;
    }


    /* =====================================================
       FILTERING
    ===================================================== */

    /**
     * Return alerts matching a severity.
     *
     * @param {string} severity
     * @returns {Array}
     */
    filterBySeverity(
        severity
    ) {
        if (!severity) {
            return [
                ...this.currentAlerts
            ];
        }


        const normalizedSeverity =
            String(
                severity
            ).toLowerCase();


        return this.currentAlerts.filter(
            alert =>
                String(
                    alert.severity || ''
                ).toLowerCase() ===
                normalizedSeverity
        );
    }


    /**
     * Get only critical alerts.
     *
     * @returns {Array}
     */
    getCriticalAlerts() {
        return this.currentAlerts.filter(
            alert => {
                const severity =
                    String(
                        alert.severity || ''
                    ).toLowerCase();

                return (
                    severity === 'critical' ||
                    severity === 'crit' ||
                    severity === 'high'
                );
            }
        );
    }


    /**
     * Get only warning alerts.
     *
     * @returns {Array}
     */
    getWarningAlerts() {
        return this.currentAlerts.filter(
            alert => {
                const severity =
                    String(
                        alert.severity || ''
                    ).toLowerCase();

                return (
                    severity === 'warning' ||
                    severity === 'warn' ||
                    severity === 'medium'
                );
            }
        );
    }


    /* =====================================================
       ALERT MANAGEMENT
    ===================================================== */

    /**
     * Remove an alert by ID.
     *
     * @param {string|number} alertId
     */
    removeAlert(alertId) {
        if (
            alertId === undefined ||
            alertId === null
        ) {
            return;
        }


        this.currentAlerts =
            this.currentAlerts.filter(
                alert =>
                    String(
                        alert.id
                    ) !==
                    String(
                        alertId
                    )
            );


        const element =
            this.container?.querySelector(
                `[data-alert-id="${CSS.escape(
                    String(alertId)
                )}"]`
            );


        if (element) {
            element.remove();
        }
    }


    /**
     * Mark an alert as read.
     *
     * @param {string|number} alertId
     */
    markAsRead(alertId) {
        const alert =
            this.currentAlerts.find(
                item =>
                    String(
                        item.id
                    ) ===
                    String(
                        alertId
                    )
            );


        if (!alert) {
            return;
        }


        alert.read = true;


        const element =
            this.container?.querySelector(
                `[data-alert-id="${CSS.escape(
                    String(alertId)
                )}"]`
            );


        if (element) {
            delete element.dataset.unread;
        }
    }


    /**
     * Get unread alerts.
     *
     * @returns {Array}
     */
    getUnreadAlerts() {
        return this.currentAlerts.filter(
            alert =>
                alert.read === false
        );
    }


    /**
     * Get number of unread alerts.
     *
     * @returns {number}
     */
    getUnreadCount() {
        return this.getUnreadAlerts()
            .length;
    }


    /* =====================================================
       DOM HELPERS
    ===================================================== */

    /**
     * Remove existing dynamically managed
     * alert rows.
     */
    removeExistingAlerts() {
        if (!this.container) {
            return;
        }


        const rows =
            this.container.querySelectorAll(
                '.alert-row'
            );


        rows.forEach(
            row => row.remove()
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Return all current alerts.
     *
     * @returns {Array}
     */
    getAlerts() {
        return [
            ...this.currentAlerts
        ];
    }


    /**
     * Clear all alerts.
     */
    clear() {
        this.currentAlerts = [];


        this.removeExistingAlerts();
    }
}


/**
 * Factory helper.
 *
 * @param {Object} options
 * @returns {Notifications}
 */
export function createNotifications(
    options = {}
) {
    return new Notifications(
        options
    ).init();
}