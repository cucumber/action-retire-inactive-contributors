import { Duration } from './Duration'

const DEFAULT_MAXIMUM_ABSENCE = 365

export class Configuration {
  constructor(
    public maximumAbsenceBeforeRetirement: Duration = DEFAULT_MAXIMUM_ABSENCE
  ) {}
}
