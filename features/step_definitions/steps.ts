import {
  Before,
  Given,
  When,
  Then,
  defineParameterType,
} from '@cucumber/cucumber'
import assert from 'assert'
import { retireInactiveContributors } from '../../src/retireInactiveContributors'
import { FakeGitHub } from '../../src/FakeGitHub'

type World = { github: FakeGitHub }

Before(function () {
  this.github = new FakeGitHub()
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

When('the action runs', function (this: World) {
  // Write code here that turns the phrase above into concrete actions
  retireInactiveContributors(this.github)
})

Then(
  '{user} should be in {team}',
  async function (this: World, user: string, team: string) {
    const users = await this.github.getMembersOf(team)
    assert(
      users.includes(user),
      `Could not find user: ${user} in team: ${team}. Users found: ${users}`
    )
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
    assert(
      !users.includes(user),
      `Could not find user: ${user} in team: ${team}.`
    )
  }
)
