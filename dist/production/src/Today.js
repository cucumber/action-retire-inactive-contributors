"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Today = void 0;
class Today {
    static minus(duration) {
        const today = new Date().getTime();
        return new Date(today - duration.valueOf());
    }
}
exports.Today = Today;
