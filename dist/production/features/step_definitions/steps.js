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
const cucumber_1 = require("@cucumber/cucumber");
const hamjest_1 = require("hamjest");
const Configuration_1 = require("../../src/Configuration");
const Duration_1 = require("../../src/Duration");
const retireInactiveContributors_1 = require("../../src/retireInactiveContributors");
const github_1 = require("@actions/github");
const OctokitGitHub_1 = require("../../src/OctokitGitHub");
(0, cucumber_1.Before)(function () {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
    }
    const octokit = (0, github_1.getOctokit)(token);
    this.github = new OctokitGitHub_1.OctokitGitHub(octokit, 'todo-get-org-from-action-parameters');
    this.configuration = new Configuration_1.Configuration();
});
(0, cucumber_1.defineParameterType)({
    regexp: /the ([\w-]+) team/,
    transformer: (teamName) => teamName,
    name: 'team',
});
(0, cucumber_1.defineParameterType)({
    regexp: /([A-Z]\w+)/,
    transformer: (userName) => userName,
    name: 'user',
});
(0, cucumber_1.Given)('a user {user} has write access to the cucumber-js repo', function (user) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user);
    return 'pending';
});
(0, cucumber_1.Given)('a user {user} is part/member of {team}', function (user, team) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.github.addUserToTeam(user, team);
    });
});
(0, cucumber_1.Given)("the create date of {user}'s last commit was {int} day/days ago", function (user, daysAgo) {
    // TODO: fix this
    // this.github.createCommit(user, daysAgo)
});
(0, cucumber_1.Given)('a user {user} is a member of {team}', function (user, team) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user);
    console.log(team);
    return 'pending';
});
(0, cucumber_1.When)('the action runs', function () {
    // Write code here that turns the phrase above into concrete actions
    (0, retireInactiveContributors_1.retireInactiveContributors)(this.github, this.configuration);
});
(0, cucumber_1.Then)('{user} should be in {team}', function (user, team) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield this.github.getMembersOf(team);
        (0, hamjest_1.assertThat)(users, (0, hamjest_1.hasItem)(user));
    });
});
(0, cucumber_1.Then)('{user} should not have any custom permissions on the cucumber-js repo', function (user) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user);
    return 'pending';
});
(0, cucumber_1.Then)('{user} should not be in {team}( anymore)', function (user, team) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield this.github.getMembersOf(team);
        (0, hamjest_1.assertThat)(users, (0, hamjest_1.not)((0, hamjest_1.hasItem)(user)));
    });
});
(0, cucumber_1.Given)('the maximum absence before retirement is {int} days', function (maximumDaysAbsent) {
    this.configuration.maximumAbsenceBeforeRetirement =
        Duration_1.Duration.of(maximumDaysAbsent).days();
});
