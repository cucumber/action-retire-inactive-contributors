import {
  Before,
  DataTable,
  defineParameterType,
  Given,
  Then,
  When,
} from '@cucumber/cucumber'
import { assertThat, equalTo } from 'hamjest'
import { Configuration } from '../../src/Configuration'
import { Duration } from '../../src/Duration'
import { GitHubClientNullConfig } from '../../src/infrastructure/GitHubClient'
import {
  GitHubChange,
  GitHubClient,
} from '../../src/infrastructure/GitHubClient'
import { retireInactiveContributors } from '../../src/retireInactiveContributors'
import { Today } from '../../src/Today'

type World = {
  configuration: Configuration
  githubClientNullConfig: GitHubClientNullConfig
  githubChanges: GitHubChange[]
}

Before(function (this: World) {
  this.githubClientNullConfig = new GitHubClientNullConfig()
  this.configuration = new Configuration()
})

defineParameterType({
  regexp: /the ([\w-]+) team/,
  transformer: (teamName: string) => teamName,
  name: 'team',
})

defineParameterType({
  regexp: /([A-Z]\w+)/,
  transformer: (userName: string) => userName,
  name: 'user',
})

Given(
  'a user {user} has write access to the cucumber-js repo',
  function (user: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user)
    return 'pending'
  }
)

Given(
  'a user {user} is part/member of {team}',
  async function (this: World, user: string, team: string) {
    this.githubClientNullConfig = this.githubClientNullConfig.withTeamMember(
      user,
      team
    )
  }
)

Given(
  "the create date of {user}'s last commit was {int} day/days ago",
  function (this: World, user: string, daysAgo: number) {
    const date = Today.minus(Duration.of(daysAgo).days())
    this.githubClientNullConfig = this.githubClientNullConfig.withLastCommit(
      user,
      date
    )
  }
)

Given(
  'a user {user} is a member of {team}',
  function (user: string, team: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user)
    console.log(team)
    return 'pending'
  }
)

When('the action runs', async function (this: World) {
  // Write code here that turns the phrase above into concrete actions
  const github = GitHubClient.createNull(this.githubClientNullConfig)
  this.githubChanges = github.trackChanges().data
  await retireInactiveContributors(github, this.configuration)
})

Given(
  'the maximum absence before retirement is {int} days',
  function (this: World, maximumDaysAbsent: number) {
    this.configuration.maximumAbsenceBeforeRetirement =
      Duration.of(maximumDaysAbsent).days()
  }
)

Then(
  '{user} should have been added to {team}',
  (user: string, team: string) => {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then(
  '{user} should have been removed from {team}',
  (user: string, team: string) => {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then(
  'we should have told GitHub:',
  function (this: World, expectedChanges: DataTable) {
    assertThat(this.githubChanges, equalTo(expectedChanges.hashes()))
  }
)

Then('we should have told GitHub nothing', function (this: World) {
  assertThat(this.githubChanges, equalTo([]))
})
