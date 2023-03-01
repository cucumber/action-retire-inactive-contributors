Feature: Read only
	The `read-only` input allows us to simulate without actually making any changes to the users permissions.

  Scenario: Greg has become inactive
    Given the maximum absence before retirement is 100 days
    And a user Greg is part of the committers team
    And the create date of Greg's last commit was 101 days ago
    When the action runs with the read-only input set to true
    Then Greg should not be in the alumni team
    And Greg should be in the committers team
