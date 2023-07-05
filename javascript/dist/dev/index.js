"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const run_1 = require("./run");
const token = process.env.GITHUB_TOKEN;
if (!token) {
    throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
}
(0, run_1.run)({
    maximumAbsenceBeforeRetirement: (0, core_1.getInput)('maximum-absence-before-retirement'),
    githubOrgname: (0, core_1.getInput)('github-orgname'),
    alumniTeam: (0, core_1.getInput)('alumni-team'),
    readOnly: (0, core_1.getInput)('read-only'),
    token,
});
