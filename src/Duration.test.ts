import { assertThat, equalTo, hasProperty, throws } from 'hamjest'
import { Duration } from './Duration'

describe(Duration.name, () => {
  it('it parses a valid duration', () => {
    const expected = 1000 * 60 * 60 * 24
    assertThat(Duration.parse('1 day'), equalTo(expected))
  })

  it('fails when given an invalid duration', () => {
    assertThat(
      () => Duration.parse('nonsense'),
      throws(hasProperty('message', 'Invalid duration: "nonsense"'))
    )
  })
})
