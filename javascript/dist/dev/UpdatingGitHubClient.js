"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatingGitHubClient = void 0;
class UpdatingGitHubClient {
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;
    }
    hasCommittedSince(author, date) {
        return this.client.hasCommittedSince(author, date);
    }
    getMembersOf(team) {
        return this.client.getMembersOf(team);
    }
    addUserToTeam(user, alumniTeam) {
        this.logger.info(`Adding user ${user} to ${alumniTeam} team`);
        return this.client.addUserToTeam(user, alumniTeam);
    }
    removeUserFromTeam(user, committersTeam) {
        this.logger.info(`Removing user ${user} from ${committersTeam} team`);
        return this.client.removeUserFromTeam(user, committersTeam);
    }
}
exports.UpdatingGitHubClient = UpdatingGitHubClient;
