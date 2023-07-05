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
exports.OctokitGitHub = void 0;
const Errors_1 = require("./Errors");
class OctokitGitHub {
    constructor(octokit, org) {
        this.octokit = octokit;
        this.org = org;
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
    addUserToTeam(user, alumniTeam) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.octokit.rest.teams.addOrUpdateMembershipForUserInOrg({
                org: this.org,
                team_slug: alumniTeam,
                username: user,
            });
        });
    }
    removeUserFromTeam(user, committersTeam) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.octokit.rest.teams.removeMembershipForUserInOrg({
                org: this.org,
                team_slug: committersTeam,
                username: user,
            });
        });
    }
    getMembersOf(team) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.octokit.rest.teams.listMembersInOrg({
                    org: this.org,
                    team_slug: team,
                });
                return result.data.map((user) => user.login);
            }
            catch (err) {
                if (isGithubRequestError(err)) {
                    throw new Errors_1.UnableToGetMembersError(`${err.message}, unable to get members of ${team} from: ${err.request.url}`);
                }
                throw err;
            }
        });
    }
}
exports.OctokitGitHub = OctokitGitHub;
function isGithubRequestError(candidate) {
    return Boolean(candidate && typeof candidate == 'object' && 'request' in candidate);
}
