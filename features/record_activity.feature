Feature: Record Activity
	The action MUST provide a record of any activity. It MAY provide additional signals like resource consumption.


  Rule: The action SHALL leave evidence of invocation.

    @todo
    Scenario: Admin can see that the action ran { success | failure }
      Given action runs
      When the action ends
      Then action log includes { "COMPLETED" | "FAIL" }

  Rule: The action SHALL record changes

    @todo
    Scenario:  User has been inactive for over a year
      Given action moves a user from Committers to Alumni
      When action completes
      Then we return  "moved { user } from Committers to Alumni"