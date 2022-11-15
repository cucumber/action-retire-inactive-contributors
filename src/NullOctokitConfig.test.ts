import { assertThat, equalTo } from 'hamjest'
import { Duration } from './Duration'
import { NullOctokitConfig } from './NullOctokitConfig'
import { Today } from './Today'

describe(NullOctokitConfig.name, () => {
  it('can add a team member', () => {
    let config = new NullOctokitConfig()
    config = config.withTeamMember('matt', 'admin')
    assertThat(config.teamMembers.admin, equalTo(['matt']))
  })

  it('remembers existing team members', () => {
    const config = new NullOctokitConfig()
      .withTeamMember('admin1', 'admin')
      .withTeamMember('admin2', 'admin')
      .withTeamMember('teamMember', 'myTeam')
    assertThat(
      config.teamMembers,
      equalTo({
        admin: ['admin1', 'admin2'],
        myTeam: ['teamMember'],
      })
    )
  })

  it('remembers existing commit dates', () => {
    const date = Today.minus(Duration.of(1).days())
    const config = new NullOctokitConfig(
      {},
      {
        myUser: date,
      }
    ).withTeamMember('myUser', 'myTeam')

    assertThat(
      config.commitDates,
      equalTo({
        myUser: date,
      })
    )
  })
})
