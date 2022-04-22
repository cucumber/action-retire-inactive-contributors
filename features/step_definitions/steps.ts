import {
  Before,
  Given,
  When,
  Then,
  defineParameterType,
} from "@cucumber/cucumber"
import assert from "assert"
import { retireInactiveContributors } from "../../src/retireInactiveContributors"

type World = { github: FakeGitHub }

class FakeGitHub {
  private readonly membersOfTeam = new Map<string, string[]>()

  getMembersOf(team: string): string[] {
    return this.membersOfTeam.get(team) || []
  }

  createUser(user: string) {
    console.log("TODO: ensure a user exists named", user)
  }

  createTeam(team: string) {
    console.log("TODO: ensure a team exsits named", team)
  }

  addUserToTeam(user: string, team: string) {
    const updatedUsers = [...this.getMembersOf(team), user]
    this.membersOfTeam.set(team, updatedUsers)
  }

  createCommit(daysAgo: number) {
    console.log("TODO: create a commit", daysAgo, "days ago")
  }
}

Before(function () {
  this.github = new FakeGitHub()
})

defineParameterType({
  regexp: /the ([\w-]+) team/,
  transformer: (teamName: string) => teamName,
  name: "team",
})

defineParameterType({
  regexp: /([A-Z]\w+)/,
  transformer: (userName: string) => userName,
  name: "user",
})

Given(
  "a user {user} has write access to the cucumber-js repo",
  function (user: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user)
    return "pending"
  }
)

Given(
  "a user {user} is part/member of {team}",
  function (this: World, user: string, team: string) {
    this.github.createUser(user)
    this.github.createTeam(team)
    this.github.addUserToTeam(user, team)
  }
)

Given(
  "the create date of their last commit was {int} day/days ago",
  function (this: World, daysAgo: number) {
    this.github.createCommit(daysAgo)
  }
)

Given(
  "a user {user} is a member of {team}",
  function (user: string, team: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user)
    console.log(team)
    return "pending"
  }
)

When("the action runs", function () {
  // Write code here that turns the phrase above into concrete actions
  retireInactiveContributors()
})

Then(
  "{user} should still be in {team}",
  function (this: World, user: string, team: string) {
    const users = this.github.getMembersOf(team)
    assert(
      users.includes(user),
      `Could not find user: ${user} in team: ${team}. Users found: ${users}`
    )
  }
)

Then("{user} should be in {team}", function (user: string, team: string) {
  // "Writede here that turns the phrase above into concrete actions
  console.log(user)
  console.log(team)
  return "pending"
})

Then(
  "{user} should not have any custom permissions on the cucumber-js repo",
  function (user: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(user)
    return "pending"
  }
)

Then(
  "{user} should not be in {team}( anymore)",
  function (user: string, team: string) {
    // Write code here that turns the phrase above into concrete actions
    console.log("TODO: assert that", user, "is NOT in", team)
  }
)
