import { Today } from './Today'
import assert from 'assert'

describe(Today.name, () => {
  it('should return an invalid date if given a NaN', () => {
    assert.throws(() => Today.minus(NaN), new Error('invalid duration'))
  })
})
