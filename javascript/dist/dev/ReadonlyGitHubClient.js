"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadOnlyGitHubClient = void 0;
class ReadOnlyGitHubClient {
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
        this.logger.info(`Read-only: Add user ${user} to ${alumniTeam} team`);
        return Promise.resolve();
    }
    removeUserFromTeam(user, committersTeam) {
        this.logger.info(`Read-only: Remove user ${user} from ${committersTeam} team`);
        return Promise.resolve();
    }
}
exports.ReadOnlyGitHubClient = ReadOnlyGitHubClient;
