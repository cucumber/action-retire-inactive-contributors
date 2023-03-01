import { Duration } from './Duration'
import { RawInputs } from './RawInputs'

const DEFAULT_MAXIMUM_ABSENCE = 365
const DEFAULT_ALUMNI_TEAM = 'alumni'
const DEFAULT_READ_ONLY: ReadOnlyMode = 'read-only'
export type ReadOnlyMode = 'update' | 'read-only'

export class Configuration {
  public static from(inputs: RawInputs): Configuration {
    return new this(
      Duration.parse(inputs.maximumAbsenceBeforeRetirement),
      inputs.alumniTeam,
      inputs.readOnly == 'false' ? 'update' : 'read-only'
    )
  }

  constructor(
    public maximumAbsenceBeforeRetirement: Duration = DEFAULT_MAXIMUM_ABSENCE,
    public alumniTeam: string = DEFAULT_ALUMNI_TEAM,
    public readOnly: ReadOnlyMode = DEFAULT_READ_ONLY
  ) {}
}
