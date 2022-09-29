class DurationBuilder {
  constructor(private readonly length: number) {}

  days() {
    return new Duration(this.length * 24 * 60 * 60 * 1000)
  }
}

export class Duration extends Number {
  static of(length: number): DurationBuilder {
    return new DurationBuilder(length)
  }
}
