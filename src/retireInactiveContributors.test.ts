import { assertThat, equalTo } from 'hamjest'
import { Configuration } from './Configuration'
import { Duration } from './Duration'
import { OctokitGitHub } from './OctokitGitHub'
import { NullOctokitConfig } from './NullOctokitConfig'
import { retireInactiveContributors } from './retireInactiveContributors'
import { Today } from './Today'

describe(retireInactiveContributors.name, () => {
  it('retires inactive members', async () => {
    const maximumAbsenceBeforeRetirement = Duration.of(100).days()
    const configuration = new Configuration(maximumAbsenceBeforeRetirement)

    const github = OctokitGitHub.createNull(
      new NullOctokitConfig(
        {
          committers: ['activeMember', 'inactiveMember'],
        },
        {
          activeMember: Today.minus(Duration.of(99).days()),
          inactiveMember: Today.minus(Duration.of(101).days()),
        }
      )
    )
    const githubChanges = github.trackChanges().data

    await retireInactiveContributors(github, configuration)

    assertThat(
      githubChanges,
      equalTo([
        {
          action: 'add',
          team: 'alumni',
          user: 'inactiveMember',
        },
        {
          action: 'remove',
          team: 'committers',
          user: 'inactiveMember',
        },
      ])
    )
  })
})
