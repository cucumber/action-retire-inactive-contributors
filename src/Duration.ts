import parse from 'parse-duration'

export class Duration extends Number {
  static parse(raw: string): Duration {
    const milliSeconds = parse(raw)
    if (milliSeconds === null) {
      throw new Error(`Invalid duration: "${raw}"`)
    }
    return new Duration(milliSeconds)
  }
}
