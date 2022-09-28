const DEFAULT_MAXIMUM_ABSENCE = 365

export class Configuration {
  constructor(
    public maximumAbsenceBeforeRetirement: number = DEFAULT_MAXIMUM_ABSENCE
  ) {}
}
