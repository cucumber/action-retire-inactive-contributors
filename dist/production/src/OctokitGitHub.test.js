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
const OctokitGitHub_1 = require("./OctokitGitHub");
const github_1 = require("@actions/github");
const hamjest_1 = require("hamjest");
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
    context.only('null instance', () => {
        it('does not actually add user to team', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
            yield gitHubClient.addUserToTeam(testUser, testAlumniTeam);
        }));
        it('does not actually remove user from team', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
            yield gitHubClient.removeUserFromTeam(testUser, testContributorsTeam);
        }));
        it('by default, users have never made a commit', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
            (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince(testUser, new Date()), (0, hamjest_1.equalTo)(false));
        }));
        it('by default, teams have no members', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull();
            (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf(testContributorsTeam), (0, hamjest_1.equalTo)([]));
        }));
        it('allows commit dates to be configured, and differently across multiple calls', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull({
                hasCommitted: [true, false, true],
            });
            (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince(testUser, new Date()), (0, hamjest_1.equalTo)(true));
            (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince(testUser, new Date()), (0, hamjest_1.equalTo)(false));
            (0, hamjest_1.assertThat)(yield gitHubClient.hasCommittedSince(testUser, new Date()), (0, hamjest_1.equalTo)(true));
        }));
        it('allows team members to be configured, and differently across multiple calls', () => __awaiter(void 0, void 0, void 0, function* () {
            const gitHubClient = OctokitGitHub_1.OctokitGitHub.createNull({
                teamMembers: [
                    ['user1', 'user2'],
                    ['user3', 'user4'],
                ],
            });
            (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf('irrelevant_team'), (0, hamjest_1.equalTo)(['user1', 'user2']));
            (0, hamjest_1.assertThat)(yield gitHubClient.getMembersOf('irrelevant_team'), (0, hamjest_1.equalTo)(['user3', 'user4']));
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
