Feature: Dry run
	The dry run option allows us to simulate without actually making any changes to the users permissions.

  Scenario: Greg has become inactive
    Given the maximum absence before retirement is 100 days
    And a user Greg is part of the committers team
    And the create date of Greg's last commit was 101 days ago
    When the action runs with the dry-run option
    Then Greg should not be in the alumni team
    And Greg should be in the committers team
    And the action log should include:
      """
      Added user Greg to alumni team
      Removed user Greg from committers team
      """
