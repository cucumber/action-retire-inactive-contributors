import { assertThat, equalTo } from 'hamjest'
import { Duration } from './Duration'

describe(Duration.name, () => {
  it('it parses a valid duration', () => {
    const expected = Duration.of(1).days()
    assertThat(Duration.parse('1 day'), equalTo(expected))
  })
})
