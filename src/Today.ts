import { Duration } from './Duration'

export class Today {
  static minus(duration: Duration): Date {
    const today = new Date().getTime()
    return new Date(today - duration.valueOf())
  }
}
