// Copyright Titanium I.T. LLC. MIT License
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputTracker = void 0;
/** A utility class for infrastructure wrappers to use track output */
class OutputTracker {
    constructor(_emitter, _event) {
        this._emitter = _emitter;
        this._event = _event;
        this._data = [];
        this._trackerFn = (text) => this._data.push(text);
        this._emitter.on(this._event, this._trackerFn);
    }
    static create(emitter, event) {
        return new OutputTracker(emitter, event);
    }
    get data() {
        return this._data;
    }
    consume() {
        const result = [...this._data];
        this._data.length = 0;
        return result;
    }
    off() {
        this.consume();
        this._emitter.off(this._event, this._trackerFn);
    }
}
exports.OutputTracker = OutputTracker;
