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
exports.retireInactiveContributors = void 0;
const ReadonlyGitHubClient_1 = require("./ReadonlyGitHubClient");
const UpdatingGitHubClient_1 = require("./UpdatingGitHubClient");
const Today_1 = require("./Today");
function retireInactiveContributors(github, configuration, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration.readOnly == 'read-only') {
            github = new ReadonlyGitHubClient_1.ReadOnlyGitHubClient(github, logger);
        }
        else {
            github = new UpdatingGitHubClient_1.UpdatingGitHubClient(github, logger);
        }
        const cutOffDate = Today_1.Today.minus(configuration.maximumAbsenceBeforeRetirement);
        const alumniTeam = configuration.alumniTeam;
        const committersTeam = 'committers';
        const committersTeamMembers = yield github.getMembersOf(committersTeam);
        logger.info(`Reviewing permissions for ${committersTeamMembers.length} users...`);
        for (const author of committersTeamMembers) {
            if (!(yield github.hasCommittedSince(author, cutOffDate))) {
                yield github.addUserToTeam(author, alumniTeam);
                yield github.removeUserFromTeam(author, committersTeam);
            }
        }
    });
}
exports.retireInactiveContributors = retireInactiveContributors;
