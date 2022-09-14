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
exports.FakeGitHub = void 0;
class FakeGitHub {
    constructor() {
        this.membersOfTeam = new Map();
        this.commitsByUser = new Map();
    }
    getMembersOf(team) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.membersOfTeam.get(team) || [];
        });
    }
    addUserToTeam(user, team) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUsers = [...(yield this.getMembersOf(team)), user];
            this.membersOfTeam.set(team, updatedUsers);
        });
    }
    removeUserFromTeam(user, team) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUsers = (yield this.getMembersOf(team)).filter((member) => member !== user);
            this.membersOfTeam.set(team, updatedUsers);
        });
    }
    hasCommittedSince(author, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const commits = this.commitsByUser.get(author) || [];
            return commits.some((commit) => commit.date >= date);
        });
    }
    createCommit(user, daysAgo) {
        const today = new Date();
        const date = new Date(today.setDate(today.getDate() - daysAgo));
        const commit = { user, date };
        const updatedCommits = [...this.getCommitsByUser(user), commit];
        this.commitsByUser.set(user, updatedCommits);
    }
    getCommitsByUser(user) {
        return this.commitsByUser.get(user) || [];
    }
}
exports.FakeGitHub = FakeGitHub;
