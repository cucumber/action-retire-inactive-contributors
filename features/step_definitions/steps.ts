import { Given, When, Then, defineParameterType } from "@cucumber/cucumber"
import { retireInactiveContributors } from "../../src/retireInactiveContributors"

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

Given("a GitHub organization {string}", function (organization: string) {
  console.log(organization)
  return "pending"
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
  function (user: string, team: string) {
    console.log(user)
    console.log(team)
    // Write code here that turns the phrase above into concrete actions
    return "pending"
  }
)

Given(
  "the create date of their last commit was {int} day/days ago",
  function (daysAgo: number) {
    // Given('the create date of their last commit was {float} day ago', function (float) {
    // Write code here that turns the phrase above into concrete actions
    console.log(daysAgo)
    return "pending"
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

When("the job is scheduled to run on the organization", function () {
  // Write code here that turns the phrase above into concrete actions
  retireInactiveContributors()
})

Then("{user} should still be in {team}", function (user: string, team: string) {
  console.log(user)
  console.log(team)
  return "pending"
})

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
    console.log(user)
    console.log(team)
    return "pending"
  }
)
