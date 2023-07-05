"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hamjest_1 = require("hamjest");
const ActionLog_1 = require("./ActionLog");
describe(ActionLog_1.ActionLog.name, () => {
    describe('getting output', () => {
        it('returns a string of all the logged messages', () => {
            const log = new ActionLog_1.ActionLog();
            log.info('hello');
            log.info('hello again');
            (0, hamjest_1.assertThat)(log.getOutput(), (0, hamjest_1.not)((0, hamjest_1.empty)()));
            (0, hamjest_1.assertThat)(log.getOutput(), (0, hamjest_1.equalTo)('hello\nhello again'));
        });
    });
});
