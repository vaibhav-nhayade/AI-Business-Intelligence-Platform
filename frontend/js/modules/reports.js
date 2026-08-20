/**
 * AI Business Intelligence Platform
 * Reports Module
 *
 * Responsibility:
 * - Coordinate Report Center UI
 * - Handle report actions
 * - Handle PDF export action
 * - Handle CSV export action
 * - Provide a clean interface for future report services
 *
 * This module does NOT:
 * - Fetch backend data
 * - Generate business data
 * - Implement ML
 * - Contain hard-coded report datasets
 */

import {
    getById,
    setText
} from '../core/dom.js';


export class Reports {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-reports'
            );

        this.currentData = null;

        this.pdfExportHandler =
            options.pdfExportHandler ||
            null;

        this.csvExportHandler =
            options.csvExportHandler ||
            null;
    }


    /**
     * Initialize the Reports module.
     *
     * @returns {Reports}
     */
    init() {
        if (!this.container) {
            return this;
        }

        this.bindEvents();

        return this;
    }


    /* =====================================================
       EVENT BINDING
    ===================================================== */

    /**
     * Bind Report Center actions.
     */
    bindEvents() {
        const pdfButton =
            getById(
                'exportPdfBtn'
            );

        const csvButton =
            getById(
                'exportCsvBtn'
            );


        if (pdfButton) {
            pdfButton.addEventListener(
                'click',
                event => {
                    this.handlePdfExport(
                        event
                    );
                }
            );
        }


        if (csvButton) {
            csvButton.addEventListener(
                'click',
                event => {
                    this.handleCsvExport(
                        event
                    );
                }
            );
        }
    }


    /* =====================================================
       RENDER
    ===================================================== */

    /**
     * Render Report Center data.
     *
     * This is intentionally lightweight because the
     * current dashboard represents reports as status cards.
     *
     * @param {Object} data
     */
    render(data) {
        if (!data || !this.container) {
            return;
        }

        this.currentData = data;

        this.renderStatuses(
            data.statuses
        );
    }


    /**
     * Render report statuses.
     *
     * Supported keys:
     *
     * weekly
     * monthly
     * kpi
     * financial
     *
     * @param {Object} statuses
     */
    renderStatuses(statuses) {
        if (!statuses) {
            return;
        }


        this.updateStatusCard(
            'WEEKLY REPORT',
            statuses.weekly
        );


        this.updateStatusCard(
            'MONTHLY REPORT',
            statuses.monthly
        );


        this.updateStatusCard(
            'KPI REPORT',
            statuses.kpi
        );


        this.updateStatusCard(
            'FINANCIAL REPORT',
            statuses.financial
        );
    }


    /**
     * Update a report status card.
     *
     * @param {string} label
     * @param {Object|string} status
     */
    updateStatusCard(
        label,
        status
    ) {
        if (
            !label ||
            status === undefined ||
            status === null
        ) {
            return;
        }


        const cards =
            this.container.querySelectorAll(
                '.mod-card'
            );


        cards.forEach(card => {
            const labelElement =
                card.querySelector(
                    '.m-label'
                );


            if (!labelElement) {
                return;
            }


            if (
                labelElement.textContent
                    .trim()
                    .toUpperCase() !==
                label.toUpperCase()
            ) {
                return;
            }


            const valueElement =
                card.querySelector(
                    '.m-value'
                );


            const subElement =
                card.querySelector(
                    '.m-sub'
                );


            if (
                typeof status ===
                'string'
            ) {
                if (valueElement) {
                    setText(
                        valueElement,
                        status
                    );
                }

                return;
            }


            if (valueElement) {
                setText(
                    valueElement,
                    status.value ||
                    '—'
                );
            }


            if (subElement) {
                setText(
                    subElement,
                    status.description ||
                    ''
                );
            }
        });
    }


    /* =====================================================
       PDF EXPORT
    ===================================================== */

    /**
     * Handle PDF export.
     *
     * @param {Event} event
     */
    handlePdfExport(event) {
        event?.preventDefault();


        if (
            typeof this.pdfExportHandler ===
            'function'
        ) {
            this.pdfExportHandler(
                this.currentData
            );

            return;
        }


        this.printCurrentPage();
    }


    /**
     * Print the current dashboard page.
     *
     * This provides a browser-native fallback until
     * a dedicated report-generation service is introduced.
     */
    printCurrentPage() {
        if (!this.container) {
            return;
        }


        window.print();
    }


    /* =====================================================
       CSV EXPORT
    ===================================================== */

    /**
     * Handle CSV export.
     *
     * @param {Event} event
     */
    handleCsvExport(event) {
        event?.preventDefault();


        if (
            typeof this.csvExportHandler ===
            'function'
        ) {
            this.csvExportHandler(
                this.currentData
            );

            return;
        }


        const csvData =
            this.buildCSVData();


        if (!csvData) {
            return;
        }


        this.downloadCSV(
            csvData
        );
    }


    /**
     * Build a lightweight CSV representation
     * from currently available report data.
     *
     * This is intentionally generic and does not
     * assume a backend-specific schema.
     *
     * @returns {string|null}
     */
    buildCSVData() {
        if (!this.currentData) {
            return null;
        }


        const rows = [
            [
                'Report',
                'Status',
                'Description'
            ]
        ];


        const statuses =
            this.currentData.statuses;


        if (!statuses) {
            return null;
        }


        const reports = [
            [
                'Weekly Report',
                statuses.weekly
            ],

            [
                'Monthly Report',
                statuses.monthly
            ],

            [
                'KPI Report',
                statuses.kpi
            ],

            [
                'Financial Report',
                statuses.financial
            ]
        ];


        reports.forEach(
            ([name, status]) => {
                if (!status) {
                    return;
                }


                if (
                    typeof status ===
                    'string'
                ) {
                    rows.push([
                        name,
                        status,
                        ''
                    ]);

                    return;
                }


                rows.push([
                    name,
                    status.value || '',
                    status.description || ''
                ]);
            }
        );


        return rows
            .map(row =>
                row
                    .map(value =>
                        this.escapeCSVValue(
                            value
                        )
                    )
                    .join(',')
            )
            .join('\n');
    }


    /**
     * Escape a CSV value.
     *
     * @param {*} value
     * @returns {string}
     */
    escapeCSVValue(value) {
        const stringValue =
            String(
                value ?? ''
            );


        if (
            stringValue.includes(',') ||
            stringValue.includes('"') ||
            stringValue.includes('\n')
        ) {
            return `"${stringValue.replace(
                /"/g,
                '""'
            )}"`;
        }


        return stringValue;
    }


    /**
     * Trigger browser CSV download.
     *
     * @param {string} csvData
     */
    downloadCSV(csvData) {
        const blob =
            new Blob(
                [csvData],
                {
                    type:
                        'text/csv;charset=utf-8;'
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const anchor =
            document.createElement(
                'a'
            );


        anchor.href = url;

        anchor.download =
            'business-intelligence-report.csv';


        document.body.appendChild(
            anchor
        );

        anchor.click();

        anchor.remove();


        URL.revokeObjectURL(
            url
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current Report Center data.
     *
     * @returns {Object|null}
     */
    getData() {
        return this.currentData;
    }


    /**
     * Clear report status information.
     */
    clear() {
        if (!this.container) {
            return;
        }


        const cards =
            this.container.querySelectorAll(
                '.mod-card'
            );


        cards.forEach(card => {
            const valueElement =
                card.querySelector(
                    '.m-value'
                );


            const subElement =
                card.querySelector(
                    '.m-sub'
                );


            if (valueElement) {
                setText(
                    valueElement,
                    '—'
                );
            }


            if (subElement) {
                setText(
                    subElement,
                    ''
                );
            }
        });


        this.currentData = null;
    }
}


/**
 * Factory helper.
 *
 * @param {Object} options
 * @returns {Reports}
 */
export function createReports(
    options = {}
) {
    return new Reports(
        options
    ).init();
}