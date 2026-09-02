/**
 * AI Business Intelligence Platform
 * AI Decision Intelligence Center
 *
 * Responsibility:
 * - Coordinate the AI & ML Intelligence Center hero
 * - Render AI model summary metrics
 * - Render AI capability cards
 * - Maintain a clean frontend contract for future AI data
 * - Provide access to AI capability state
 *
 * This module does NOT:
 * - Implement machine learning
 * - Train models
 * - Fetch backend data
 * - Contain hard-coded business results
 * - Implement individual AI models
 *
 * Individual AI capabilities should remain modular.
 */


import {
    getById,
    selectAll,
    setText
} from '../core/dom.js';


export class AIDecisionIntelligence {
    constructor(options = {}) {
        this.container =
            options.container ||
            getById(
                options.containerId ||
                'page-mlhub'
            );

        this.currentData = null;

        this.capabilities = new Map();
    }


    /**
     * Initialize AI Decision Intelligence Center.
     *
     * @returns {AIDecisionIntelligence}
     */
    init() {
        if (!this.container) {
            return this;
        }

        this.cacheCapabilities();

        return this;
    }


    /* =====================================================
       RENDER
    ===================================================== */

    /**
     * Render the complete AI Intelligence Center.
     *
     * @param {Object} data
     */
    render(data) {
        if (
            !data ||
            !this.container
        ) {
            return;
        }


        this.currentData = data;


        this.renderSummary(
            data.summary
        );


        this.renderCapabilities(
            data.capabilities
        );
    }


    /* =====================================================
       SUMMARY
    ===================================================== */

    /**
     * Render AI model summary information.
     *
     * The current dashboard contains four KPI cards:
     *
     * 1. Models in Production
     * 2. Predictions Today
     * 3. Average Confidence
     * 4. Fraud Blocked
     *
     * @param {Object} summary
     */
    renderSummary(summary) {
        if (!summary) {
            return;
        }


        const cards =
            selectAll(
                '.card.kpi',
                this.container
            );


        if (cards.length < 4) {
            return;
        }


        this.updateSummaryCard(
            cards[0],
            summary.modelsInProduction
        );


        this.updateSummaryCard(
            cards[1],
            summary.predictionsToday
        );


        this.updateSummaryCard(
            cards[2],
            summary.averageConfidence
        );


        this.updateSummaryCard(
            cards[3],
            summary.fraudBlocked
        );
    }


    /**
     * Update one AI summary KPI card.
     *
     * @param {HTMLElement} card
     * @param {Object} metric
     */
    updateSummaryCard(
        card,
        metric
    ) {
        if (
            !card ||
            !metric
        ) {
            return;
        }


        const valueElement =
            card.querySelector(
                '.kpi-value'
            );


        const deltaElement =
            card.querySelector(
                '.kpi-delta'
            );


        if (valueElement) {
            setText(
                valueElement,
                metric.value ?? '—'
            );
        }


        if (deltaElement) {
            setText(
                deltaElement,
                metric.label || ''
            );


            this.updateStateClass(
                deltaElement,
                metric.state
            );
        }
    }


    /* =====================================================
       CAPABILITIES
    ===================================================== */

    /**
     * Cache AI capability cards.
     *
     * The existing HTML uses data-nav values:
     *
     * risk
     * scam
     * fakenews
     * forecast
     * segment
     * recommend
     * xai
     * reports
     */
    cacheCapabilities() {
        const cards =
            this.container.querySelectorAll(
                '.mod-card[data-nav]'
            );


        this.capabilities.clear();


        cards.forEach(card => {
            const target =
                card.dataset.nav;


            if (!target) {
                return;
            }


            this.capabilities.set(
                target,
                card
            );
        });
    }


    /**
     * Render AI capability cards.
     *
     * @param {Object} capabilities
     */
    renderCapabilities(
        capabilities
    ) {
        if (!capabilities) {
            return;
        }


        Object.entries(
            capabilities
        ).forEach(
            ([key, capability]) => {
                this.updateCapability(
                    key,
                    capability
                );
            }
        );
    }


    /**
     * Update one AI capability card.
     *
     * @param {string} key
     * @param {Object} capability
     */
    updateCapability(
        key,
        capability
    ) {
        if (!capability) {
            return;
        }


        const card =
            this.capabilities.get(
                key
            );


        if (!card) {
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


        if (valueElement) {
            setText(
                valueElement,
                capability.value ?? '—'
            );
        }


        if (subElement) {
            setText(
                subElement,
                capability.description || ''
            );
        }


        this.updateStateClass(
            card,
            capability.state
        );
    }


    /* =====================================================
       STATE
    ===================================================== */

    /**
     * Update state styling.
     *
     * Supported states:
     *
     * up
     * down
     * warn
     * critical
     * healthy
     *
     * @param {HTMLElement} element
     * @param {string} state
     */
    updateStateClass(
        element,
        state
    ) {
        if (!element) {
            return;
        }


        element.classList.remove(
            'up',
            'down',
            'warn',
            'critical',
            'healthy'
        );


        if (!state) {
            return;
        }


        const normalizedState =
            String(
                state
            ).toLowerCase();


        const allowedStates = [
            'up',
            'down',
            'warn',
            'critical',
            'healthy'
        ];


        if (
            allowedStates.includes(
                normalizedState
            )
        ) {
            element.classList.add(
                normalizedState
            );
        }
    }


    /* =====================================================
       CAPABILITY ACCESS
    ===================================================== */

    /**
     * Get a capability card.
     *
     * @param {string} key
     * @returns {HTMLElement|null}
     */
    getCapabilityElement(key) {
        return (
            this.capabilities.get(
                key
            ) || null
        );
    }


    /**
     * Check whether a capability exists.
     *
     * @param {string} key
     * @returns {boolean}
     */
    hasCapability(key) {
        return this.capabilities.has(
            key
        );
    }


    /**
     * Return available capability keys.
     *
     * @returns {string[]}
     */
    getCapabilityKeys() {
        return Array.from(
            this.capabilities.keys()
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    /**
     * Get current AI Center data.
     *
     * @returns {Object|null}
     */
    getData() {
        return this.currentData;
    }


    /**
     * Clear AI Center data.
     */
    clear() {
        if (!this.container) {
            return;
        }


        const values =
            selectAll(
                '.kpi-value',
                this.container
            );


        const deltas =
            selectAll(
                '.kpi-delta',
                this.container
            );


        values.forEach(
            element => {
                setText(
                    element,
                    '—'
                );
            }
        );


        deltas.forEach(
            element => {
                setText(
                    element,
                    ''
                );
            }
        );


        this.capabilities.forEach(
            card => {
                const value =
                    card.querySelector(
                        '.m-value'
                    );


                const sub =
                    card.querySelector(
                        '.m-sub'
                    );


                if (value) {
                    setText(
                        value,
                        '—'
                    );
                }


                if (sub) {
                    setText(
                        sub,
                        ''
                    );
                }
            }
        );


        this.currentData = null;
    }
}


/**
 * Factory helper.
 *
 * @param {Object} options
 * @returns {AIDecisionIntelligence}
 */
export function createAIDecisionIntelligence(
    options = {}
) {
    return new AIDecisionIntelligence(
        options
    ).init();
}