Feature: Move inactive users

	We have a special team called alumni that has no special permissions and is used
	to recognise past contributors.

	For security reasons, we want to retire contributors who haven't been active recently
	into the alumni group.

	Rule: Users become inactive after a year

		Scenario: Greg has been inactive for over a year
			Given a user Greg is part of the committers team
			And the create date of their last commit was 366 days ago
			When the bot runs on the repo
			Then Greg should be in the alumni team
			And Greg should not be in the committers team

		Scenario: Aslak has been active within the past year
			Given a user Aslak is part of the committers team
			And the create date of their last commit was 1 day ago
			When the bot runs on the repo
			Then Aslak should still be in the committers team
			And Aslak should not be in the alumni team

	Rule: Move inactive users into alumni team from any other team

		Scenario: Julien is a member of the cucumber-js-admin team
			Given a user Julien is a member of the cucumber-js-admin team
			And the create date of their last commit was 366 days ago
			When the bot runs on the repo
			Then Julien should be in the alumni team
			And Julien should not be in the cucumber-js-admin team anymore

	Rule: Remove any custom repo permissions from inactive users

		Scenario: Matt has custom permissions
			Given a user Matt has write access to the cucumber-js repo
			And the create date of their last commit was 366 days ago
			When the bot runs on the repo
			Then Matt should be in the alumni team
			And Matt should not have any custom permissions on the cucumber-js repo

	Rule: Formerly inactive users, who are now active again should remain in the alumni group

		This helps us to know whether we have the right time-frame for retiring people - if there are lots of people
		in both committers and alumni, it means we're maybe retiring people too soon.

		Scenario: Demi who was formerly inactive, recently became active again
			Given a user Demi is part of the alumni team
			And the create date of their last commit was 1 day ago
			When the bot runs on the repo
			Then Demi should still be in the alumni team