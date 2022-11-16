import { run } from './run'
import assert from 'assert'

describe(run.name, () => {
  it('throws an error if given a NaN', async () => {
    await assert.rejects(
      run('abc', 'anOrg', 'aToken'),
      new Error('invalid duration')
    )
  })
})
