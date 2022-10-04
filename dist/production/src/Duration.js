"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
class DurationBuilder {
    constructor(length) {
        this.length = length;
    }
    days() {
        return new Duration(this.length * 24 * 60 * 60 * 1000);
    }
}
class Duration extends Number {
    static of(length) {
        return new DurationBuilder(length);
    }
}
exports.Duration = Duration;
