"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retireInactiveContributors = void 0;
function retireInactiveContributors(github) {
    // return alumni team, a member called Greg and the last commit date
    const alumniTeam = "alumni";
    const committersTeam = "committers";
    const committersTeamMembers = github.getMembersOf(committersTeam);
    for (const user of committersTeamMembers) {
        const lastCommit = github.getLastCommitBy(user);
        const oneDay = 1000 * 60 * 60 * 24;
        const daysSinceLastCommit = Math.round(new Date().getTime() - lastCommit.date.getTime() / oneDay);
        if (daysSinceLastCommit >= 365) {
            github.addUserToTeam(user, alumniTeam);
            github.removeUserFromTeam(user, committersTeam);
        }
    }
}
exports.retireInactiveContributors = retireInactiveContributors;
