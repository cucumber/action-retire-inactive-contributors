import {Before, defineParameterType, Given, Then, When,} from '@cucumber/cucumber'
import {assertThat, hasItem, not} from 'hamjest'
import {Configuration} from '../../src/Configuration'
import {Duration} from '../../src/Duration'
import {FakeGitHub} from '../../src/FakeGitHub'
import {GitHubClient, retireInactiveContributors} from '../../src/retireInactiveContributors'
import {getOctokit} from "@actions/github";
import {OctokitGitHub} from "../../src/OctokitGitHub";

type World = {
  configuration: Configuration
  github: GitHubClient
}

Before(function () {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error(
        'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    )
  }
  const octokit = getOctokit(token)
  this.github = new OctokitGitHub(
      octokit,
      'todo-get-org-from-action-parameters'
  )
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
    await this.github.addUserToTeam(user, team)
  }
)

Given(
  "the create date of {user}'s last commit was {int} day/days ago",
  function (this: World, user: string, daysAgo: number) {
    // TODO: fix this
    // this.github.createCommit(user, daysAgo)
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

When('the action runs', function (this: World) {
  // Write code here that turns the phrase above into concrete actions
  retireInactiveContributors(this.github, this.configuration)
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
    this.configuration.maximumAbsenceBeforeRetirement =
      Duration.of(maximumDaysAbsent).days()
  }
)
