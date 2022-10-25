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
const retireInactiveContributors_1 = require("./retireInactiveContributors");
const hamjest_1 = require("hamjest");
const Configuration_1 = require("./Configuration");
const OctokitGitHub_1 = require("./OctokitGitHub");
const Today_1 = require("./Today");
const Duration_1 = require("./Duration");
describe(retireInactiveContributors_1.retireInactiveContributors.name, () => {
    it.skip('retires inactive members', () => __awaiter(void 0, void 0, void 0, function* () {
        const maximumAbsenceBeforeRetirement = 100;
        const configuration = new Configuration_1.Configuration(maximumAbsenceBeforeRetirement);
        const github = OctokitGitHub_1.OctokitGitHub.createNull(new OctokitGitHub_1.NullOctokitConfig({
            committers: ['activeMember', 'inactiveMember'],
        }, {
            activeMember: Today_1.Today.minus(Duration_1.Duration.of(99).days()),
            inactiveMember: Today_1.Today.minus(Duration_1.Duration.of(100).days()),
        }));
        const githubChanges = github.trackChanges().data;
        yield (0, retireInactiveContributors_1.retireInactiveContributors)(github, configuration);
        // TODO: fix this assertion
        (0, hamjest_1.assertThat)(githubChanges, (0, hamjest_1.equalTo)([]));
    }));
});
