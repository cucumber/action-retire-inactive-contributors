"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hamjest_1 = require("hamjest");
const Duration_1 = require("./Duration");
const NullOctokitConfig_1 = require("./NullOctokitConfig");
const Today_1 = require("./Today");
describe(NullOctokitConfig_1.NullOctokitConfig.name, () => {
    describe('adding team members', () => {
        it('can add a team member', () => {
            const config = new NullOctokitConfig_1.NullOctokitConfig().withTeamMember('matt', 'admin');
            (0, hamjest_1.assertThat)(config.teamMembers.admin, (0, hamjest_1.equalTo)(['matt']));
        });
        it('remembers existing team members', () => {
            const config = new NullOctokitConfig_1.NullOctokitConfig()
                .withTeamMember('admin1', 'admin')
                .withTeamMember('admin2', 'admin')
                .withTeamMember('teamMember', 'myTeam');
            (0, hamjest_1.assertThat)(config.teamMembers, (0, hamjest_1.equalTo)({
                admin: ['admin1', 'admin2'],
                myTeam: ['teamMember'],
            }));
        });
        it('remembers existing commit dates', () => {
            const date = Today_1.Today.minus(Duration_1.Duration.of(1).days());
            const config = new NullOctokitConfig_1.NullOctokitConfig({}, {
                myUser: date,
            }).withTeamMember('myUser', 'myTeam');
            (0, hamjest_1.assertThat)(config.commitDates, (0, hamjest_1.equalTo)({
                myUser: date,
            }));
        });
    });
    describe('adding last commit dates', () => {
        it('adds a commit date', () => {
            const date = Today_1.Today.minus(Duration_1.Duration.of(1).days());
            const config = new NullOctokitConfig_1.NullOctokitConfig().withLastCommit('someUser', date);
            (0, hamjest_1.assertThat)(config.commitDates, (0, hamjest_1.equalTo)({
                someUser: date,
            }));
        });
        it('preserves existing commit dates', () => {
            const date1 = Today_1.Today.minus(Duration_1.Duration.of(1).days());
            const date2 = Today_1.Today.minus(Duration_1.Duration.of(2).days());
            const date3 = Today_1.Today.minus(Duration_1.Duration.of(3).days());
            const config = new NullOctokitConfig_1.NullOctokitConfig()
                .withLastCommit('user1', date1)
                .withLastCommit('user2', date2)
                .withLastCommit('user3', date3);
            (0, hamjest_1.assertThat)(config.commitDates, (0, hamjest_1.equalTo)({
                user1: date1,
                user2: date2,
                user3: date3,
            }));
        });
        it('preserves exsiting team members', () => {
            const date = Today_1.Today.minus(Duration_1.Duration.of(1).days());
            const config = new NullOctokitConfig_1.NullOctokitConfig()
                .withTeamMember('someUser', 'someTeam')
                .withLastCommit('someUser', date);
            (0, hamjest_1.assertThat)(config.teamMembers, (0, hamjest_1.equalTo)({
                someTeam: ['someUser'],
            }));
        });
    });
});
