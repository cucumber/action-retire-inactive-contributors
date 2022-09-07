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
exports.OctokitGithub = void 0;
// "TODO: Implement this using actual API calls to GitHub via Octokit library"
class OctokitGithub {
    constructor(octokit, org) {
        this.octokit = octokit;
        this.org = org;
    }
    getLastCommitBy(user) {
        throw new Error('Function not implemented.');
        // TODO: build a request with the pattern: https://api.github.com/repos/{user}/{repo}commits/master
        // Possible suggestion in https://stackoverflow.com/a/61548243/11799079 for get last commit
        // To be implemented.
    }
    addUserToTeam(user, alumniTeam) {
        throw new Error('Function not implemented.');
    }
    removeUserFromTeam(user, committersTeam) {
        throw new Error('Function not implemented.');
    }
    getMembersOf(team) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: change interface to make these functions async (i.e. they need to return Promises)
            const result = yield this.octokit.rest.teams.listMembersInOrg({
                org: this.org,
                team_slug: team,
            });
            return result.data.map((user) => user.login);
        });
    }
}
exports.OctokitGithub = OctokitGithub;
