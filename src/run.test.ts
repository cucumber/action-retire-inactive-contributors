import { run } from './run'
import assert from 'assert'

describe(run.name, () => {
  it('throws an error if given a bad value for maximumAbsenceBeforeRetirementInput', async () => {
    await assert.rejects(run('abc', 'anOrg', 'aToken'))
  })
})
