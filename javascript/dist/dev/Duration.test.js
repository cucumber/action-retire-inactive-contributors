"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hamjest_1 = require("hamjest");
const Duration_1 = require("./Duration");
describe(Duration_1.Duration.name, () => {
    it('it parses a valid duration', () => {
        const expected = 1000 * 60 * 60 * 24;
        (0, hamjest_1.assertThat)(Duration_1.Duration.parse('1 day'), (0, hamjest_1.equalTo)(expected));
    });
    it('fails when given an invalid duration', () => {
        (0, hamjest_1.assertThat)(() => Duration_1.Duration.parse('nonsense'), (0, hamjest_1.throws)((0, hamjest_1.hasProperty)('message', 'Invalid duration: "nonsense"')));
    });
});
