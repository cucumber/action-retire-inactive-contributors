import { retireInactiveContributors } from './retireInactiveContributors'
import { assertThat, equalTo, is } from 'hamjest'
import { Configuration } from './Configuration'
import { NullOctokitConfig, OctokitGitHub } from './OctokitGitHub'
import { Today } from './Today'
import { Duration } from './Duration'

describe(retireInactiveContributors.name, () => {
  it.skip('retires inactive members', async () => {
    const maximumAbsenceBeforeRetirement = 100
    const configuration = new Configuration(maximumAbsenceBeforeRetirement)

    const github = OctokitGitHub.createNull(
      new NullOctokitConfig(
        {
          committers: ['activeMember', 'inactiveMember'],
        },
        {
          activeMember: Today.minus(Duration.of(99).days()),
          inactiveMember: Today.minus(Duration.of(100).days()),
        }
      )
    )
    const githubChanges = github.trackChanges().data

    await retireInactiveContributors(github, configuration)

    // TODO: fix this assertion
    assertThat(githubChanges, equalTo([]))
  })
})
