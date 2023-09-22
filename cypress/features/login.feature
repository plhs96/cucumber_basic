Feature: Login Functionality

    Background:
        Given The login page is opened successfull

    Scenario: Login valid
        When user input email "organization01@yopmail.com" and password "12345678"
        Then Verify url home page

    Scenario Outline: Login invalid
        When user input email "<email>" and password "<password>"
        Then the message "<message>" should be displayed

    Examples:
        | email                            | password | message                                                                                                                      |
        |                                  |          | This information is required.                                                                                                |
        | organization01                   | 12345678 | Please enter a valid email address (e.g. someone@example.com).                                                               |
        | mail-not-exit@mailinator.com     | 12345678 | Sorry, your email address is not associated with any account. Please contact your school for assistance.                     |
        | user-lock-only@mailinator.com    | 12345678 | You are requested to reset your password. Please check your user-lock-only@mailinator.com inbox for the password reset link. |
        | user-pending-only@mailinator.com | 12345678 | Check your user-pending-only@mailinator.com inbox for an invitation link to join the domain.                                 |