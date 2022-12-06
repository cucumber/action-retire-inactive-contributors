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
const Configuration_1 = require("./Configuration");
const GitHubClient_1 = require("./infrastructure/GitHubClient");
const retireInactiveContributors_1 = require("./retireInactiveContributors");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
        }
        const github = GitHubClient_1.GitHubClient.create(token, 'todo-get-org-from-action-parameters');
        // TODO: read max absence from action parameters
        const configuration = new Configuration_1.Configuration();
        yield (0, retireInactiveContributors_1.retireInactiveContributors)(github, configuration);
    });
}
run();
