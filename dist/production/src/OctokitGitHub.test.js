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
const github_1 = require("@actions/github");
const hamjest_1 = require("hamjest");
const Duration_1 = require("./Duration");
const OctokitGitHub_1 = require("./OctokitGitHub");
const Today_1 = require("./Today");
const org = 'test-inactive-contributor-action';
const testContributorsTeam = 'test-Contributors';
const testAlumniTeam = 'test-Alumni';
const testUser = 'blaisep';
describe(OctokitGitHub_1.OctokitGitHub.name, () => {
    context('adding someone to a team', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const octokit = (0, github_1.getOctokit)(token());
            const gitHubClient = new OctokitGitHub_1.OctokitGitHub(octokit, org);
            const initialMembers = yield gitHubClient.getMembersOf(testAlumniTeam);
            for (const member of initialMembers) {
                yield octokit.rest.teams.removeMembershipForUserInOrg({
                    org,
                    team_slug: testAlumniTeam,
                    username: member,
                });
            }
        }));
        it('adds a new member to a team', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = client();
            yield gitHubClient.addUserToTeam(testUser, testAlumniTeam);
            const members = yield gitHubClient.getMembersOf(testAlumniTeam);
            (0, hamjest_1.assertThat)(members, (0, hamjest_1.hasItem)(testUser));
        }));
        it('says which members have been added to teams', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = client();
            const changes = gitHubClient.trackChanges().data;
            (0, hamjest_1.assertThat)(changes, (0, hamjest_1.equalTo)([]));
            yield gitHubClient.addUserToTeam(testUser, testAlumniTeam);
            (0, hamjest_1.assertThat)(changes, (0, hamjest_1.equalTo)([
                {
                    action: 'add',
                    user: testUser,
                    team: testAlumniTeam,
                },
            ]));
        }));
    });
    context('removing someone from the team', () => {
        it('removes an existing member from a team', () => __awaiter(void 0, void 0, void 0, function* () {
            // Given
            const gitHubClient = client();
            yield gitHubClient.addUserToTeam(testUser, testContributorsTeam);
            const initialMembers = yield gitHubClient.getMembersOf(testContributorsTeam);
            (0, hamjest_1.assertThat)(initialMembers, (0, hamjest_1.hasItem)(testUser));
            // When
            yield gitHubClient.removeUserFromTeam(testUser, testContributorsTeam);
            // Then
            const members = yield gitHubClient.getMembersOf(testContributorsTeam);
            (0, hamjest_1.assertThat)(members, (0, hamjest_1.not)((0, hamjest_1.hasItem)(testUser)));
        }));
        it('says which members have been removed from teams', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = client();
            yield gitHubClient.addUserToTeam(testUser, testContributorsTeam);
            const initialMembers = yield gitHubClient.getMembersOf(testContributorsTeam);
            (0, hamjest_1.assertThat)(initialMembers, (0, hamjest_1.hasItem)(testUser));
            // When
            const changes = gitHubClient.trackChanges().data;
            yield gitHubClient.removeUserFromTeam(testUser, testContributorsTeam);
            // Then
            (0, hamjest_1.assertThat)(changes, (0, hamjest_1.equalTo)([
                { action: 'remove', user: testUser, team: testContributorsTeam },
            ]));
        }));
    });
    context('working out if a user has committed recently', () => {
        it('returns false if they have not', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = client();
            const hasCommitted = yield gitHubClient.hasCommittedSince('olleolleolle', new Date());
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)((0, hamjest_1.falsey)()));
        }));
        it('returns true if they have', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = client();
            const dateOnWhichMattCommitted = new Date(2022, 3, 1); // April 1.
            const hasCommitted = yield gitHubClient.hasCommittedSince('mattwynne', dateOnWhichMattCommitted);
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)(true));
        }));
    });
    context('team members', () => {
        it('gets members of a team', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = client();
            const members = yield gitHubClient.getMembersOf('fishcakes');
            (0, hamjest_1.assertThat)(members, (0, hamjest_1.equalTo)([testUser, 'funficient']));
        }));
    });
    context('null instance', () => {
        it('does not actually add user to team', () => __awaiter(void 0, void 0, void 0, function* () {
            yield assertAsynchronous(() => __awaiter(void 0, void 0, void 0, function* () {
                const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
                yield gitHubClient.addUserToTeam(testUser, testAlumniTeam);
            }));
        }));
        it('does not actually remove user from team', () => __awaiter(void 0, void 0, void 0, function* () {
            yield assertAsynchronous(() => __awaiter(void 0, void 0, void 0, function* () {
                const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
                yield gitHubClient.removeUserFromTeam(testUser, testAlumniTeam);
            }));
        }));
        it('by default, teams have no members', () => __awaiter(void 0, void 0, void 0, function* () {
            yield assertAsynchronous(() => __awaiter(void 0, void 0, void 0, function* () {
                const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
                (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf(testContributorsTeam), (0, hamjest_1.equalTo)([]));
            }));
        }));
        it('users with no configured commits throw an exception', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
            yield (0, hamjest_1.promiseThat)(gitHubClient.hasCommittedSince(testUser, new Date()), (0, hamjest_1.rejected)((0, hamjest_1.hasProperty)('message', `Attempted to discover commits for null user '${testUser}', but it wasn't configured`)));
        }));
        it('allows team members to be configured', () => __awaiter(void 0, void 0, void 0, function* () {
            yield assertAsynchronous(() => __awaiter(void 0, void 0, void 0, function* () {
                const config = new OctokitGitHub_1.NullOctokitConfig({
                    team1: ['user1', 'user2'],
                    team2: ['user3', 'user4'],
                });
                const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull(config);
                (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf('team1'), (0, hamjest_1.equalTo)(['user1', 'user2']));
                (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf('team2'), (0, hamjest_1.equalTo)(['user3', 'user4']));
                (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf('noSuchTeam'), (0, hamjest_1.equalTo)([]));
            }));
        }));
        it('allows last commit date to be configured per user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield assertAsynchronous(() => __awaiter(void 0, void 0, void 0, function* () {
                const nineDaysAgo = Today_1.Today.minus(Duration_1.Duration.of(9).days());
                const tenDaysAgo = Today_1.Today.minus(Duration_1.Duration.of(10).days());
                const elevenDaysAgo = Today_1.Today.minus(Duration_1.Duration.of(11).days());
                const config = new OctokitGitHub_1.NullOctokitConfig({}, {
                    user1: tenDaysAgo,
                });
                const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull(config);
                (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince('user1', elevenDaysAgo), (0, hamjest_1.equalTo)(true));
                (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince('user1', tenDaysAgo), (0, hamjest_1.equalTo)(true));
                (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince('user1', nineDaysAgo), (0, hamjest_1.equalTo)(false));
            }));
        }));
    });
});
function token() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
    }
    return token;
}
function client() {
    const octokit = (0, github_1.getOctokit)(token());
    return new OctokitGitHub_1.OctokitGitHub(octokit, org);
}
function assertAsynchronous(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        let tickElapsed = false;
        setImmediate(() => (tickElapsed = true));
        yield fn();
        (0, hamjest_1.assertThat)(tickElapsed, (0, hamjest_1.equalTo)(true));
    });
}
