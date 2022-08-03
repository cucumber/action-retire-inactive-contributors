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
function retireInactiveContributors(github) {
    return __awaiter(this, void 0, void 0, function* () {
        const alumniTeam = 'alumni';
        const committersTeam = 'committers';
        const committersTeamMembers = yield github.getMembersOf(committersTeam);
        for (const user of committersTeamMembers) {
            const lastCommit = yield github.getLastCommitBy(user);
            const oneDay = 1000 * 60 * 60 * 24;
            const daysSinceLastCommit = Math.round((new Date().getTime() - lastCommit.date.getTime()) / oneDay);
            if (daysSinceLastCommit >= 365) {
                github.addUserToTeam(user, alumniTeam);
                github.removeUserFromTeam(user, committersTeam);
            }
        }
    });
}
exports.retireInactiveContributors = retireInactiveContributors;
