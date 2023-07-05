"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionLog = void 0;
class ActionLog {
    constructor() {
        this.messages = [];
    }
    info(message) {
        this.messages.push(message);
    }
    getOutput() {
        return this.messages.join('\n');
    }
}
exports.ActionLog = ActionLog;
