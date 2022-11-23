import { assertThat, equalTo, hasProperty, throws } from 'hamjest'
import { Duration } from './Duration'

describe.only(Duration.name, () => {
  it('it parses a valid duration', () => {
    const expected = Duration.of(1).days()
    assertThat(Duration.parse('1 day'), equalTo(expected))
  })

  it('fails when given an invalid duration', () => {
    assertThat(
      () => Duration.parse('nonsense'),
      throws(hasProperty('message', 'Invalid duration: "nonsense"'))
    )
  })
})
