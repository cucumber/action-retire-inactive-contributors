import { Duration } from './Duration'

export class Today {
  static minus(duration: Duration): Date {
    if (!Number.isInteger(duration)) {
      throw new Error('invalid duration')
    }
    const today = new Date().getTime()
    return new Date(today - duration.valueOf())
  }
}
