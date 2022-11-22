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
const NullOctokitConfig_1 = require("../../src/NullOctokitConfig");
const OctokitGitHub_1 = require("../../src/OctokitGitHub");
const retireInactiveContributors_1 = require("../../src/retireInactiveContributors");
const Today_1 = require("../../src/Today");
(0, cucumber_1.Before)(function () {
    this.nullOctokitConfig = new NullOctokitConfig_1.NullOctokitConfig();
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
        this.nullOctokitConfig = this.nullOctokitConfig.withTeamMember(user, team);
    });
});
(0, cucumber_1.Given)("the create date of {user}'s last commit was {int} day/days ago", function (user, daysAgo) {
    const date = Today_1.Today.minus(Duration_1.Duration.of(daysAgo).days());
    this.nullOctokitConfig = this.nullOctokitConfig.withLastCommit(user, date);
});
(0, cucumber_1.Given)('a user {user} is a member of {team}', function (user, team) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user);
    console.log(team);
    return 'pending';
});
(0, cucumber_1.When)('the action runs', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Write code here that turns the phrase above into concrete actions
        const github = OctokitGitHub_1.OctokitGitHub.createNull(this.nullOctokitConfig);
        this.githubChanges = github.trackChanges().data;
        yield (0, retireInactiveContributors_1.retireInactiveContributors)(github, this.configuration);
    });
});
(0, cucumber_1.Given)('the maximum absence before retirement is {int} days', function (maximumDaysAbsent) {
    this.configuration.maximumAbsenceBeforeRetirement =
        Duration_1.Duration.of(maximumDaysAbsent).days();
});
(0, cucumber_1.Then)('{user} should have been added to {team}', (user, team) => {
    // Write code here that turns the phrase above into concrete actions
});
(0, cucumber_1.Then)('{user} should have been removed from {team}', (user, team) => {
    // Write code here that turns the phrase above into concrete actions
});
(0, cucumber_1.Then)('we should have told GitHub:', function (expectedChanges) {
    (0, hamjest_1.assertThat)(this.githubChanges, (0, hamjest_1.equalTo)(expectedChanges.hashes()));
});
