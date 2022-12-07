import { assertThat, empty, equalTo, not } from 'hamjest'
import { ActionLog } from './ActionLog'

describe(ActionLog.name, () => {
  describe('getting output', () => {
    it('returns a string of all the logged messages', () => {
      const log = new ActionLog()
      log.info('hello')
      log.info('hello again')
      assertThat(log.getOutput(), not(empty()))
      assertThat(log.getOutput(), equalTo('hello\nhello again'))
    })
  })
})
