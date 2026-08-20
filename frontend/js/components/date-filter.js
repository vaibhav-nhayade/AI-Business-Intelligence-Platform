/**
 * AI Business Intelligence Platform
 * Date Filter Component
 */

import {
    getById
} from '../core/dom.js';

import {
    on,
    emit
} from '../core/events.js';

import {
    local
} from '../core/storage.js';

import {
    DATE_RANGES,
    STORAGE_KEYS,
    UI
} from '../config/constants.js';


export class DateFilter {
    constructor(options = {}) {
        this.element =
            options.element ||
            getById(
                options.elementId ||
                'dateFilter'
            );

        this.storageKey =
            options.storageKey ||
            STORAGE_KEYS.DATE_RANGE;

        this.defaultValue =
            options.defaultValue ||
            UI.DEFAULT_DATE_RANGE;

        this.onChange =
            typeof options.onChange === 'function'
                ? options.onChange
                : null;

        this.cleanupFunctions = [];
    }


    /**
     * Initialize date filter.
     *
     * @returns {DateFilter}
     */
    init() {
        if (!this.element) {
            return this;
        }

        this.restore();
        this.bindEvents();

        return this;
    }


    /**
     * Attach change event.
     */
    bindEvents() {
        const cleanup = on(
            this.element,
            'change',
            event => {
                const value =
                    event.target.value;

                this.persist(value);

                if (this.onChange) {
                    this.onChange(value);
                }

                emit(
                    'datefilter:change',
                    {
                        value
                    }
                );
            }
        );

        if (cleanup) {
            this.cleanupFunctions.push(
                cleanup
            );
        }
    }


    /**
     * Restore saved value.
     */
    restore() {
        const storedValue =
            local.get(
                this.storageKey,
                this.defaultValue
            );

        const availableValues =
            Array.from(
                this.element.options
            ).map(
                option => option.value
            );

        if (
            availableValues.includes(
                storedValue
            )
        ) {
            this.element.value =
                storedValue;
        } else if (
            availableValues.includes(
                DATE_RANGES.LAST_30_DAYS
            )
        ) {
            this.element.value =
                DATE_RANGES.LAST_30_DAYS;
        }
    }


    /**
     * Persist selected value.
     *
     * @param {string} value
     */
    persist(value) {
        local.set(
            this.storageKey,
            value
        );
    }


    /**
     * Get current value.
     *
     * @returns {string|null}
     */
    getValue() {
        return this.element?.value ?? null;
    }


    /**
     * Set selected value.
     *
     * @param {string} value
     * @param {boolean} [dispatch=true]
     */
    setValue(
        value,
        dispatch = true
    ) {
        if (!this.element) {
            return;
        }

        const optionExists =
            Array.from(
                this.element.options
            ).some(
                option =>
                    option.value === value
            );

        if (!optionExists) {
            return;
        }

        this.element.value = value;

        this.persist(value);

        if (dispatch) {
            this.element.dispatchEvent(
                new Event('change', {
                    bubbles: true
                })
            );
        }
    }


    /**
     * Destroy component.
     */
    destroy() {
        this.cleanupFunctions.forEach(
            cleanup => cleanup?.()
        );

        this.cleanupFunctions = [];
    }
}