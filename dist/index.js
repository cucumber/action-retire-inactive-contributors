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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("TODO: Implement this using actual API calls to GitHub via Octokit library");
        const github = {
            getAgeOfLastCommitBy: function (user) {
                throw new Error("Function not implemented.");
            },
            addUserToTeam: function (user, alumniTeam) {
                throw new Error("Function not implemented.");
            },
            removeUserFromTeam: function (user, committersTeam) {
                throw new Error("Function not implemented.");
            },
            getMembersOf(team) {
                throw new Error("Function not implemented.");
            }
        };
        yield (0, retireInactiveContributors_1.retireInactiveContributors)(github);
    });
}
run();
