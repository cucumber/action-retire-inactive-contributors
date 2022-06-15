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
const assert_1 = __importDefault(require("assert"));
const OctokitGithub_1 = require("./OctokitGithub");
const github_1 = require("@actions/github");
describe(OctokitGithub_1.OctokitGithub.name, () => {
    it('gets members of a team', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
        }
        const octokit = (0, github_1.getOctokit)(token);
        const githubAdapter = new OctokitGithub_1.OctokitGithub(octokit);
        const members = githubAdapter.getMembersOf('fishcakes');
        (0, assert_1.default)(members);
    }));
});
