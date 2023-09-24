Feature: Login Functionality in Subdomain site

    Background:
        Given The login page in Subdomain site is opened successfull

    Scenario: Login valid in subdomain
        When Login with email: "organization01@yopmail.com" and password: "12345678"
        Then Verify url home page

    Scenario Outline: Login invalid with <type>
        When Login with email: "<email>" and password: "<password>"
        Then the message "<message>" should be displayed

        Examples:
            | email                            | password | message                                                                                                                      | type              |
            |                                  |          | This information is required.                                                                                                | blank value       |
            | organization01                   | 12345678 | Please enter a valid email address (e.g. someone@example.com).                                                               | invalid email     |
            | mail-not-exit@mailinator.com     | 12345678 | Sorry, your email address is not associated with any account. Please contact your school for assistance.                     | non-exist account |
            | user-lock-only@mailinator.com    | 12345678 | You are requested to reset your password. Please check your user-lock-only@mailinator.com inbox for the password reset link. | blocked account   |
            | user-pending-only@mailinator.com | 12345678 | Check your user-pending-only@mailinator.com inbox for an invitation link to join the domain.                                 | pending account   |