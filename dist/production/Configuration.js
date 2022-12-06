"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const DEFAULT_MAXIMUM_ABSENCE = 365;
class Configuration {
    constructor(maximumAbsenceBeforeRetirement = DEFAULT_MAXIMUM_ABSENCE) {
        this.maximumAbsenceBeforeRetirement = maximumAbsenceBeforeRetirement;
    }
}
exports.Configuration = Configuration;
