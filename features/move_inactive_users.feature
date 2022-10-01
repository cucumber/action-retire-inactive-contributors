Feature: Move inactive users
  We have a special team called alumni that has no special permissions and is used
  to recognise past contributors.

  For security reasons, we want to retire contributors who haven't been active recently
  into the alumni group.

  Background: 
    Given the maximum absence before retirement is 100 days

  Rule: Users become inactive after a year

    Scenario: Greg has been inactive recently
      And a user Greg is part of the committers team
      And the create date of Greg's last commit was 100 days ago
      When the action runs
      Then Greg should be in the alumni team
      And Greg should not be in the committers team

    Scenario: Aslak has been active recently
      Given a user Aslak is part of the committers team
      And the create date of Aslak's last commit was 99 days ago
      When the action runs
      Then Aslak should be in the committers team
      And Aslak should not be in the alumni team

  Rule: Move inactive users into alumni team from any other team

    @todo
    Scenario: Julien is a member of the cucumber-js-admin tea
      Given a user Julien is a member of the cucumber-js-admin team
      And the create date of Julien's last commit was 100 days ago
      When the action runs
      Then Julien should be in the alumni team
      And Julien should not be in the cucumber-js-admin team anymore

  Rule: Remove any custom repo permissions from inactive users

    @todo
    Scenario: Matt has custom permissions
      Given a user Matt has write access to the cucumber-js repo
      And the create date of Matt's last commit was 100 days ago
      When the action runs
      Then Matt should be in the alumni team
      And Matt should not have any custom permissions on the cucumber-js repo

  Rule: Formerly inactive users, who are now active again should remain in the alumni group
    
    This helps us to know whether we have the right time-frame for retiring people - if there are lots of people
    in both committers and alumni, it means we're maybe retiring people too soon.

    @todo
    Scenario: Demi who was formerly inactive, recently became active again
      Given a user Demi is part of the alumni team
      And the create date of Demi's last commit was 1 day ago
      When the action runs
      Then Demi should be in the alumni team
