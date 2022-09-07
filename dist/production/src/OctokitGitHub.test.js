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
describe(OctokitGitHub_1.OctokitGitHub.name, () => {
    context('adding someone to a team', () => {
        it('adds a new member to a team', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = process.env.GITHUB_TOKEN;
            if (!token) {
                throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
            }
            const octokit = (0, github_1.getOctokit)(token);
            const gitHubClient = new OctokitGitHub_1.OctokitGitHub(octokit, 'test-inactive-contributor-action');
            // TODO: prepare the test by emptying the test-Alumni team (using a direct octokit call here in the test)
            gitHubClient.addUserToTeam('blaisep', 'test-Alumni');
            const members = yield gitHubClient.getMembersOf('test-Alumni');
            (0, hamjest_1.assertThat)(members, (0, hamjest_1.hasItem)('blaisep'));
        }));
    });
    context('working out if a user has committed recently', () => {
        it('returns false if they have not', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = process.env.GITHUB_TOKEN;
            if (!token) {
                throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
            }
            const octokit = (0, github_1.getOctokit)(token);
            const gitHubClient = new OctokitGitHub_1.OctokitGitHub(octokit, 'test-inactive-contributor-action');
            const hasCommitted = yield gitHubClient.hasCommittedSince('olleolleolle', new Date());
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)((0, hamjest_1.falsey)()));
        }));
        it('returns true if they have', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = process.env.GITHUB_TOKEN;
            if (!token) {
                throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
            }
            const octokit = (0, github_1.getOctokit)(token);
            const gitHubClient = new OctokitGitHub_1.OctokitGitHub(octokit, 'test-inactive-contributor-action');
            const dateOnWhichMattCommitted = new Date(2022, 3, 1); // April 1.
            const hasCommitted = yield gitHubClient.hasCommittedSince('mattwynne', dateOnWhichMattCommitted);
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)(true));
        }));
    });
    it('gets members of a team', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
        }
        const octokit = (0, github_1.getOctokit)(token);
        const gitHubClient = new OctokitGitHub_1.OctokitGitHub(octokit, 'test-inactive-contributor-action');
        const members = yield gitHubClient.getMembersOf('fishcakes');
        (0, hamjest_1.assertThat)(members, (0, hamjest_1.equalTo)(['blaisep', 'funficient']));
    }));
});
