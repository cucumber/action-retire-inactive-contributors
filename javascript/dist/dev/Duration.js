"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
const parse_duration_1 = __importDefault(require("parse-duration"));
class Duration extends Number {
    static parse(raw) {
        const milliSeconds = (0, parse_duration_1.default)(raw);
        if (milliSeconds === null) {
            throw new Error(`Invalid duration: "${raw}"`);
        }
        return new Duration(milliSeconds);
    }
}
exports.Duration = Duration;
