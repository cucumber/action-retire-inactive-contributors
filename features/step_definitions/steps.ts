import { Given, When, Then } from "@cucumber/cucumber"

Given("a user Matt has write access to the cucumber-js repo", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending"
})

Given("a user {word} is part/member of the {word} team", function (who: string, team: string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending" + who + team
})

Given(
  "the create date of their last commit was {int} day/days ago",
  function (daysAgo: number) {
    // Given('the create date of their last commit was {float} day ago', function (float) {
    // Write code here that turns the phrase above into concrete actions
    return "pending" + daysAgo
  }
)

Given("a user Julien is a member of the cucumber-js-admin team", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending"
})

When("the bot runs on the repo", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending"
})

Then("Demi should still be in the alumni team", function () {
  return "pending"
})

Then("{word} should be in the alumni team", function () {
  // "Writede here that turns the phrase above into concrete actions
  return "pending"
})

Then(
  "Matt should not have any custom permissions on the cucumber-js repo",
  function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending"
  }
)

Then("Julien should not be in the cucumber-js-admin team anymore", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending"
})

Then("Aslak should not be in the alumni team", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending"
})

Then('Aslak should still be in the committers team', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('Greg should not be in the committers team', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})