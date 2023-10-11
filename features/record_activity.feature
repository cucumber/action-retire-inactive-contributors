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
        Adding user Greg to alumni team
        Removing user Greg from committers team
        """

  Rule: The action SHALL record simulated changes in dry-run mode

    Scenario: Action runs in read-only mode
      Given the maximum absence before retirement is 100 days
      And a user Greg is part of the committers team
      And the create date of Greg's last commit was 101 days ago
      When the action runs with the read-only input set to true
      Then the action log should include:
        """
        Read-only: Add user Greg to alumni team
        Read-only: Remove user Greg from committers team
        """
@wip
  Rule: The action SHALL notify changes of status

    Scenario: Action runs in read-write mode
      Given a user Greg is part of the committers team
      When a user Greg is removed from the committers team
      Then the action sends a notification:
        """
        The user Greg has been moved from committers to alumni due to inactivity        
        """