Feature: Login Functionality

    Scenario: Login valid in sub-domain
        Given The login page in "Sub-domain" site is opened successfull
        When Login with email: "organization01@yopmail.com" and password: "12345678"
        Then Verify url home page

    Scenario Outline: Login invalid with <type> in sub-domain
        Given The login page in "Sub-domain" site is opened successfull
        When Login with email: "<email>" and password: "<password>"
        Then the message "<message>" should be displayed

        Examples:
            | email                            | password | message                                                                                                                      | type              |
            |                                  |          | This information is required.                                                                                                | blank value       |
            | organization01                   | 12345678 | Please enter a valid email address (e.g. someone@example.com).                                                               | invalid email     |
            | mail-not-exit@mailinator.com     | 12345678 | Sorry, your email address is not associated with any account. Please contact your school for assistance.                     | non-exist account |
            | user-lock-only@mailinator.com    | 12345678 | You are requested to reset your password. Please check your user-lock-only@mailinator.com inbox for the password reset link. | blocked account   |
            | user-pending-only@mailinator.com | 12345678 | Check your user-pending-only@mailinator.com inbox for an invitation link to join the domain.                                 | pending account   |

    Scenario Outline: Login valid with <type> in primary-domain
        Given The login page in "primary-domain" site is opened successfull
        When Login with email: "<email>", domain: "<domain>" and password: "<password>"
        Then Verify url home page
        Examples:
            | email                      | domain           | password | type                             |
            | organization01@yopmail.com | Organization STG | 12345678 | valid account in multiple domain |
            | student29@yopmail.com      |                  | 12345678 | valid account in one domain      |

    Scenario Outline: Login invalid with <type> in primary-domain
     Given The login page in "primary-domain" site is opened successfull
        When Login with email: "<email>", domain: "<domain>" and password: "<password>"
        Then the message "<message>" should be displayed

        Examples:
            | email                            | domain | password | message                                                                                                                      | type                               |
            |                                  |        |          | This information is required.                                                                                                | blank value                        |
            | organization01                   |        |          | Please enter a valid email address (e.g. someone@example.com).                                                               | invalid email                      |
            | mail-not-exit@mailinator.com     |        |          | Sorry, your email address is not associated with any account. Please contact your school for assistance.                     | non-exist email                    |
            | user-lock-only@mailinator.com    |        |          | You are requested to reset your password. Please check your user-lock-only@mailinator.com inbox for the password reset link. | locked account in one domain       |
            | user-pending-only@mailinator.com |        |          | Check your user-pending-only@mailinator.com inbox for an invitation link to join the domain.                                 | pending account in one domain      |
            | user-lock@mailinator.com         |        |          | You are requested to reset your password. Please check your user-lock@mailinator.com inbox for the password reset link.      | locked account in multiple domain  |
            | user-pending@mailinator.com      |        |          | Check your user-pending@mailinator.com inbox for an invitation link to join the domain.                                      | pending account in multiple domain |
