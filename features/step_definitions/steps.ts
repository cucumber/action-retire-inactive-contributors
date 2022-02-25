import { Given, When, Then, defineParameterType } from "@cucumber/cucumber"
import path from "path"
import { Probot, ProbotOctokit } from "probot"
import payload from "../../test/fixtures/issues.opened.json"
import myProbotApp from "../../src"
import fs from "fs"
import nock from "nock"

const privateKey = fs.readFileSync(
  path.join(__dirname, "../../test/fixtures/mock-cert.pem"),
  "utf-8"
)

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
  function (user: string, team: string) {
    /*--    nock("https://api.github.com")
      // return a test token
      .post("/app/installations/2/access_tokens")
      .reply(200, {
        token: "test",
        permissions: {
          issues: "write",
        },
      })
      .post(
        "/repos/hiimbex/testing-things/issues/1/comments",
        (responseBody: any) => (this.issueComment = responseBody.body)
      )
      .reply(200)--*/

    console.log(user)
    console.log(team)
  }
)

Given(
  "the create date of their last commit was {int} day/days ago",
  function (daysAgo: number) {
    // Given('the create date of their last commit was {float} day ago', function (float) {
    console.log(daysAgo)
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

When("the bot runs on the repo", async function () {
  // Write code here that turns the phrase above into concrete actions
  nock("https://api.github.com")
    // return a test token
    .post("/app/installations/2/access_tokens")
    .reply(200, {
      token: "test",
      permissions: {
        issues: "write",
      },
    })

  this.probot = new Probot({
    appId: 123,
    privateKey,
    // disable request throttling and retries for testing
    Octokit: ProbotOctokit.defaults({
      retry: { enabled: false },
      throttle: { enabled: false },
    }),
  })
  // Load our app into probot
  this.probot.load(myProbotApp)
  await this.probot.receive({ name: "issues", payload: payload })
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
