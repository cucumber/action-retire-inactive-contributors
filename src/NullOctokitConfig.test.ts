import { assertThat, equalTo } from 'hamjest'
import { Duration } from './Duration'
import { NullOctokitConfig } from './NullOctokitConfig'
import { Today } from './Today'

describe(NullOctokitConfig.name, () => {
  describe('adding team members', () => {
    it('can add a team member', () => {
      const config = new NullOctokitConfig().withTeamMember('matt', 'admin')
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

  describe('adding last commit dates', () => {
    it('adds a commit date', () => {
      const date = Today.minus(Duration.of(1).days())
      const config = new NullOctokitConfig().withLastCommit('someUser', date)
      assertThat(
        config.commitDates,
        equalTo({
          someUser: date,
        })
      )
    })

    it('preserves existing commit dates', () => {
      const date1 = Today.minus(Duration.of(1).days())
      const date2 = Today.minus(Duration.of(2).days())
      const date3 = Today.minus(Duration.of(3).days())

      const config = new NullOctokitConfig()
        .withLastCommit('user1', date1)
        .withLastCommit('user2', date2)
        .withLastCommit('user3', date3)

      assertThat(
        config.commitDates,
        equalTo({
          user1: date1,
          user2: date2,
          user3: date3,
        })
      )
    })

    it('preserves exsiting team members', () => {
      const date = Today.minus(Duration.of(1).days())
      const config = new NullOctokitConfig()
        .withTeamMember('someUser', 'someTeam')
        .withLastCommit('someUser', date)
      assertThat(
        config.teamMembers,
        equalTo({
          someTeam: ['someUser'],
        })
      )
    })
  })
})
