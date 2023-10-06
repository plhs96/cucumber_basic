Feature: User Functionality

  Background: User Goto User Tab
    Given The login page in "Sub-domain" site is opened successfull
    When Login with email: "organization01@yopmail.com", domain:"" and password: "87654321"
    And Goto User Tab

  Scenario Outline: Invite New User unsuccessfull due to require field: <error>
    And Click add new user
    When Invite-Edit user with firstname: "<firstname>", lastname: "<lastname>", email: "<email>", role: "<role>" and option: "<option>"

    Examples: 
      | firstname | lastname | email                        | role                         | option | error         | message                                                        |
      | null      | null     | null                         | null                         | invite | blank data    | This information is required.                                  |
      | son 1     | son 2    | son 3                        | School Manager, User Manager | invite | invalid email | Please enter a valid email address (e.g. someone@example.com). |
      | son 1     | son 2    | mail169459219073@yopmail.com | School Manager, User Manager | invite | existed email | Someone already uses this email address.                       |

  Scenario Outline: Invite New User successfull with option: <option>
    Given Search user by: "<email>"
    And Verify search result
    And Click add new user
    When Invite-Edit user with firstname: "<firstname>", lastname: "<lastname>", email: "<email>", role: "<role>" and option: "<option>"
    Then Verrify email: "<email>" is display with option: "<option>"

    Examples: 
      | firstname | lastname | email                   | role                         | option |
      | son 7     | son 8    | plhs-2023-4@yopmail.com | School Manager, User Manager | cancel |
      | son 7     | son 8    | plhs-2023-4@yopmail.com | School Manager, User Manager | Invite |

  Scenario Outline: Edit User unsuccessfull due to require field: <error>
    Given Search user by: "plhs-2023-4@yopmail.com"
    And Click edit user
    When Invite-Edit user with firstname: "<firstname>", lastname: "<lastname>", email: "<email>", role: "<role>" and option: "<option>"
    Then Verrify error message: "<message>" is display

    Examples: 
      | firstname | lastname | email                        | role                    | option | error         | message                                                        |
      | null      | null     | null                         | null                    | invite | blank data    | This information is required.                                  |
      | son 3     | son 4    | son 3                        | Course Manager, Teacher | invite | invalid email | Please enter a valid email address (e.g. someone@example.com). |
      | son 3     | son 4    | mail169459219073@yopmail.com | Course Manager, Teacher | invite | existed email | Someone already uses this email address.                       |

  Scenario Outline: Edit User successfull with option: <option>
    Given Search user by: "plhs-2023-4@yopmail.com"
    And Click edit user
    When Invite-Edit user with firstname: "<firstname>", lastname: "<lastname>", email: "<email>", role: "<role>" and option: "<option>"
    Then Verrify email: "<email>", lastname: "<lastname>" and email: "<email>" is display with option: "<option>"

    Examples: 
      | firstname | lastname | email                   | role                    | option |
      | son 5     | son 6    | plhs-2023-3@yopmail.com | Course Manager, Teacher | cancel |
      | son 5     | son 6    | plhs-2023-3@yopmail.com | Course Manager, Teacher | Invite |

  Scenario Outline: Delete User successfull with option: <option>
    Given Search user by: "plhs-2023-4@yopmail.com"
    And Click delete user with option: "<option>"
    Then Verrify result after delete with: "<option>"

    Examples: 
      | email                   | option |
      | plhs-2023-3@yopmail.com | cancel |
      | plhs-2023-3@yopmail.com | delete |
