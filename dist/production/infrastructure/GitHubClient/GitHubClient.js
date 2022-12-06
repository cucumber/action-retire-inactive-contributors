"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
const events_1 = require("events");
const OutputTracker_1 = require("../common/OutputTracker");
const GitHubClientNullConfig_1 = require("./GitHubClientNullConfig");
const NullOctokit_1 = require("./NullOctokit");
const CHANGE_EVENT = 'changeEvent';
class GitHubClient {
    constructor(octokit, org) {
        this.octokit = octokit;
        this.org = org;
        this.emitter = new events_1.EventEmitter();
    }
    static createNull(config = new GitHubClientNullConfig_1.GitHubClientNullConfig()) {
        return new GitHubClient(new NullOctokit_1.NullOctokit(config), '');
    }
    hasCommittedSince(author, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.octokit.rest.repos.listForOrg({ org: this.org });
            const repos = response.data.map((repoData) => repoData.name);
            for (const repo of repos) {
                const result = yield this.octokit.rest.repos.listCommits({
                    owner: this.org,
                    repo,
                    author,
                    since: date.toISOString(),
                });
                if (result.data.length > 0) {
                    return true;
                }
            }
            return false;
        });
    }
    addUserToTeam(user, team) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.octokit.rest.teams.addOrUpdateMembershipForUserInOrg({
                org: this.org,
                team_slug: team,
                username: user,
            });
            this.emitter.emit(CHANGE_EVENT, {
                action: 'add',
                team,
                user,
            });
        });
    }
    removeUserFromTeam(user, team) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.octokit.rest.teams.removeMembershipForUserInOrg({
                org: this.org,
                team_slug: team,
                username: user,
            });
            this.emitter.emit(CHANGE_EVENT, {
                action: 'remove',
                team,
                user,
            });
        });
    }
    getMembersOf(team) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.octokit.rest.teams.listMembersInOrg({
                org: this.org,
                team_slug: team,
            });
            return result.data.map((user) => user.login);
        });
    }
    trackChanges() {
        return OutputTracker_1.OutputTracker.create(this.emitter, CHANGE_EVENT);
    }
}
exports.GitHubClient = GitHubClient;
