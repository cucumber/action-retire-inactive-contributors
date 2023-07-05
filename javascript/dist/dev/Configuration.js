"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const Duration_1 = require("./Duration");
const DEFAULT_MAXIMUM_ABSENCE = 365;
const DEFAULT_ALUMNI_TEAM = 'alumni';
const DEFAULT_READ_ONLY = 'read-only';
class Configuration {
    static from(inputs) {
        return new this(Duration_1.Duration.parse(inputs.maximumAbsenceBeforeRetirement), inputs.alumniTeam, inputs.readOnly == 'false' ? 'update' : 'read-only');
    }
    constructor(maximumAbsenceBeforeRetirement = DEFAULT_MAXIMUM_ABSENCE, alumniTeam = DEFAULT_ALUMNI_TEAM, readOnly = DEFAULT_READ_ONLY) {
        this.maximumAbsenceBeforeRetirement = maximumAbsenceBeforeRetirement;
        this.alumniTeam = alumniTeam;
        this.readOnly = readOnly;
    }
}
exports.Configuration = Configuration;
