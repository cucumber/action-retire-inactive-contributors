Feature: Record Activity
	The action MUST provide a record of any activity. It MAY provide additional signals like resource consumption.

  Rule: The action SHALL record how many users were checked

    Scenario: Multiple users in the committers team
      Given a user Greg is part of the committers team
      Given a user Lisa is part of the committers team
      When the action runs
      Then the action log should include:
        """
        Reviewing permissions for 2 users...
        """

  Rule: The action SHALL record changes

    Scenario: Action moves a user from Committers to Alumni
      Given the maximum absence before retirement is 100 days
      And a user Greg is part of the committers team
      And the create date of Greg's last commit was 101 days ago
      When the action runs
      Then the action log should include:
        """
        Added user Greg to alumni team
        Removed user Greg from committers team
        """
