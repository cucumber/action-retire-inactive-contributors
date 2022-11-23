import { Duration } from './Duration'

const DEFAULT_MAXIMUM_ABSENCE = 365
const DEFAULT_ALUMNI_TEAM = 'alumni'

export class Configuration {
  constructor(
    public maximumAbsenceBeforeRetirement: Duration = DEFAULT_MAXIMUM_ABSENCE,
    public alumniTeam: string = DEFAULT_ALUMNI_TEAM
  ) {}
}
