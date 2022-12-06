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
exports.NullMembersList = exports.NullCommitList = exports.NullRepoList = exports.nextTick = exports.NullOctokit = void 0;
class NullOctokit {
    constructor(config) {
        this.config = config;
    }
    get rest() {
        return {
            teams: {
                addOrUpdateMembershipForUserInOrg: () => __awaiter(this, void 0, void 0, function* () { return nextTick(); }),
                removeMembershipForUserInOrg: () => __awaiter(this, void 0, void 0, function* () { return nextTick(); }),
                listMembersInOrg: ({ team_slug }) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield nextTick();
                    return new NullMembersList((_a = this.config.teamMembers[team_slug]) !== null && _a !== void 0 ? _a : []);
                }),
            },
            repos: {
                listForOrg: () => __awaiter(this, void 0, void 0, function* () {
                    yield nextTick();
                    return new NullRepoList();
                }),
                listCommits: ({ author, since, }) => __awaiter(this, void 0, void 0, function* () {
                    const commitDate = this.config.commitDates[author];
                    if (commitDate === undefined)
                        throw new Error(`Attempted to discover commits for null user '${author}', but it wasn't configured`);
                    yield nextTick();
                    return new NullCommitList(new Date(since) <= commitDate);
                }),
            },
        };
    }
}
exports.NullOctokit = NullOctokit;
function nextTick() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setImmediate(resolve));
    });
}
exports.nextTick = nextTick;
class NullRepoList {
    get data() {
        return [
            {
                name: 'null_octokit_repo',
            },
        ];
    }
}
exports.NullRepoList = NullRepoList;
class NullCommitList {
    constructor(hasCommits) {
        this.hasCommits = hasCommits;
    }
    get data() {
        return this.hasCommits ? ['null_octokit_commit'] : [];
    }
}
exports.NullCommitList = NullCommitList;
class NullMembersList {
    constructor(teamMembers) {
        this.teamMembers = teamMembers;
    }
    get data() {
        return this.teamMembers.map((login) => ({ login }));
    }
}
exports.NullMembersList = NullMembersList;
