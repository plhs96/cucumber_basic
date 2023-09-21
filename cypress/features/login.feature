Feature: Login Feature In Sub-Domain Site

    Background:
        Given Goto Login Page

    Scenario: Login failed due to blank value
        When I log in as Following
            | email | password |
            |       |          |
        Then Verify expected "This information is required."

    Scenario: Login failed due to invalid email address
        When I log in as Following
            | email          | password |
            | organization01 | 12345678 |
        Then Verify expected "Please enter a valid email address (e.g. someone@example.com)."

    Scenario: Login failed due to none-exist email address
        When I log in as Following
            | email                        | password |
            | mail-not-exit@mailinator.com | 12345678 |
        Then Verify expected "Sorry, your email address is not associated with any account. Please contact your school for assistance."

    Scenario: Login failed due to blocked email address
        When I log in as Following
            | email                         | password |
            | user-lock-only@mailinator.com | 12345678 |
        Then Verify expected "You are requested to reset your password. Please check your user-lock-only@mailinator.com inbox for the password reset link."

    Scenario: Login failed due to pending email address
        When I log in as Following
            | email                            | password |
            | user-pending-only@mailinator.com | 12345678 |
        Then Verify expected "Check your user-pending-only@mailinator.com inbox for an invitation link to join the domain."

    Scenario: Login successfull
        When I log in as Following
            | email                      | password |
            | organization01@yopmail.com | 12345678 |
        Then Verify expected "success"


