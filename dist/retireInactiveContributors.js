"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retireInactiveContributors = void 0;
function retireInactiveContributors(github) {
    // return alumni team, a member called Greg and the last commit date
    const alumniTeam = "alumni";
    const committersTeam = "committers";
    const committersTeamMembers = github.getMembersOf(committersTeam);
    for (const user of committersTeamMembers) {
        const daysSinceLastCommit = github.getAgeOfLastCommitBy(user);
        if (daysSinceLastCommit >= 365) {
            github.addUserToTeam(user, alumniTeam);
            github.removeUserFromTeam(user, committersTeam);
        }
    }
}
exports.retireInactiveContributors = retireInactiveContributors;
