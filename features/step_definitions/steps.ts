import {
  Before,
  defineParameterType,
  Given,
  Then,
  When,
} from '@cucumber/cucumber'
import { assertThat, containsString, hasItem, not } from 'hamjest'
import { Configuration } from '../../src/Configuration'
import { Duration } from '../../src/Duration'
import { FakeGitHub } from '../../src/FakeGitHub'
import { retireInactiveContributors } from '../../src/retireInactiveContributors'
import { ActionLog } from '../../src/ActionLog'

type World = {
  actionLog: ActionLog
  configuration: Configuration
  github: FakeGitHub
}

Before(function () {
  this.github = new FakeGitHub()
  this.configuration = new Configuration()
  this.actionLog = new ActionLog()
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
  function (this: World, user: string, team: string) {
    this.github.addUserToTeam(user, team)
  }
)

Given(
  "the create date of {user}'s last commit was {int} day/days ago",
  function (this: World, user: string, daysAgo: number) {
    this.github.createCommit(user, daysAgo)
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
  await retireInactiveContributors(
    this.github,
    this.configuration,
    this.actionLog
  )
})

When('the action runs with the dry-run option', async function (this: World) {
  this.configuration.dryRun = true
  await retireInactiveContributors(
    this.github,
    this.configuration,
    this.actionLog
  )
})

Then(
  '{user} should be in {team}',
  async function (this: World, user: string, team: string) {
    const users = await this.github.getMembersOf(team)
    assertThat(users, hasItem(user))
  }
)

Then(
  '{user} should not have any custom permissions on the cucumber-js repo',
  function (user: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user)
    return 'pending'
  }
)

Then(
  '{user} should not be in {team}( anymore)',
  async function (this: World, user: string, team: string) {
    const users = await this.github.getMembersOf(team)
    assertThat(users, not(hasItem(user)))
  }
)

Given(
  'the maximum absence before retirement is {int} days',
  function (this: World, maximumDaysAbsent: number) {
    this.configuration.maximumAbsenceBeforeRetirement = Duration.parse(
      `${maximumDaysAbsent} days`
    )
  }
)

Then(
  'the action log should include:',
  function (this: World, expectedText: string) {
    assertThat(this.actionLog.getOutput(), containsString(expectedText))
  }
)

Given('dry-run is disabled', function (this: World) {
  this.configuration.dryRun = false
})
