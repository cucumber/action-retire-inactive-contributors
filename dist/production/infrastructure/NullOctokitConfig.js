"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullOctokitConfig = void 0;
class NullOctokitConfig {
    constructor(teamMembers = {}, commitDates = {}) {
        this.teamMembers = teamMembers;
        this.commitDates = commitDates;
    }
    withTeamMember(user, team) {
        var _a;
        const existingTeam = (_a = this.teamMembers[team]) !== null && _a !== void 0 ? _a : [];
        const newTeam = [...existingTeam, user];
        const newTeamMembers = Object.assign(Object.assign({}, this.teamMembers), { [team]: newTeam });
        return new NullOctokitConfig(newTeamMembers, this.commitDates);
    }
    withLastCommit(user, date) {
        const commitDates = Object.assign(Object.assign({}, this.commitDates), { [user]: date });
        return new NullOctokitConfig(this.teamMembers, commitDates);
    }
}
exports.NullOctokitConfig = NullOctokitConfig;
