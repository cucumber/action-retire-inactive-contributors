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
const FakeGitHub_1 = require("./FakeGitHub");
const hamjest_1 = require("hamjest");
describe(FakeGitHub_1.FakeGitHub.name, () => {
    context('working out if a user has committed recently', () => {
        it('returns false if they have not', () => __awaiter(void 0, void 0, void 0, function* () {
            const githubAdapter = new FakeGitHub_1.FakeGitHub();
            const hasCommitted = yield githubAdapter.hasCommittedSince('olleolleolle', new Date());
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)((0, hamjest_1.falsey)()));
        }));
        it('returns true if they have', () => __awaiter(void 0, void 0, void 0, function* () {
            const longAgo = new Date(2020, 1, 1);
            const githubAdapter = new FakeGitHub_1.FakeGitHub();
            githubAdapter.createCommit('mattwynne', 0);
            const hasCommitted = yield githubAdapter.hasCommittedSince('mattwynne', longAgo);
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)(true));
        }));
        it('returns false if they have committed earlier than the given date', () => __awaiter(void 0, void 0, void 0, function* () {
            const today = new Date();
            const githubAdapter = new FakeGitHub_1.FakeGitHub();
            githubAdapter.createCommit('mattwynne', 100);
            const hasCommitted = yield githubAdapter.hasCommittedSince('mattwynne', today);
            (0, hamjest_1.assertThat)(hasCommitted, (0, hamjest_1.is)(false));
        }));
    });
    it('gets members of a team', () => __awaiter(void 0, void 0, void 0, function* () {
        // const token = process.env.GITHUB_TOKEN
        // if (!token) {
        //   throw new Error(
        //     'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        //   )
        // }
        // const octokit = getOctokit(token)
        // const githubAdapter = new OctokitGithub(
        //   octokit,
        //   'test-inactive-contributor-action'
        // )
        // const members = await githubAdapter.getMembersOf('fishcakes')
        // assertThat(members, equalTo(['blaisep', 'funficient']))
    }));
});
