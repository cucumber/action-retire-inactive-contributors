import { Duration } from './Duration'

const DEFAULT_MAXIMUM_ABSENCE = 365
const DEFAULT_ALUMNI_TEAM = 'alumni'
const DEFAULT_DRY_RUN = true

export class Configuration {
  constructor(
    public maximumAbsenceBeforeRetirement: Duration = DEFAULT_MAXIMUM_ABSENCE,
    public alumniTeam: string = DEFAULT_ALUMNI_TEAM,
    public dryRun: boolean = DEFAULT_DRY_RUN
  ) {}
}
