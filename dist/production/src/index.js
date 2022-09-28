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
const Configuration_1 = require("./Configuration");
const OctokitGitHub_1 = require("./OctokitGitHub");
const retireInactiveContributors_1 = require("./retireInactiveContributors");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
        }
        const octokit = (0, github_1.getOctokit)(token);
        const github = new OctokitGitHub_1.OctokitGitHub(octokit, 'todo-get-org-from-action-parameters');
        yield (0, retireInactiveContributors_1.retireInactiveContributors)(github, new Configuration_1.Configuration());
    });
}
run();
