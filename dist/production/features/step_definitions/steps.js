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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = __importDefault(require("assert"));
const retireInactiveContributors_1 = require("../../src/retireInactiveContributors");
const FakeGitHub_1 = require("../../src/FakeGitHub");
(0, cucumber_1.Before)(function () {
    this.github = new FakeGitHub_1.FakeGitHub();
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
    this.github.addUserToTeam(user, team);
});
(0, cucumber_1.Given)("the create date of {user}'s last commit was {int} day/days ago", function (user, daysAgo) {
    this.github.createCommit(user, daysAgo);
});
(0, cucumber_1.Given)('a user {user} is a member of {team}', function (user, team) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user);
    console.log(team);
    return 'pending';
});
(0, cucumber_1.When)('the action runs', function () {
    // Write code here that turns the phrase above into concrete actions
    (0, retireInactiveContributors_1.retireInactiveContributors)(this.github);
});
(0, cucumber_1.Then)('{user} should be in {team}', function (user, team) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield this.github.getMembersOf(team);
        (0, assert_1.default)(users.includes(user), `Could not find user: ${user} in team: ${team}. Users found: ${users}`);
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
        (0, assert_1.default)(!users.includes(user), `Could not find user: ${user} in team: ${team}.`);
    });
});
