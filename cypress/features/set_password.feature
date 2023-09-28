Feature: Set Password Functionality

  Scenario Outline: Forgot valid in sub-domain
    Given The forgot password page in "Sub-domain" site is opened successfull
    When Input email "<email>"
    Then There is a message with content: "<message>"
    And Verify login with email "<email>" and old password "<oldPassword>" in Sub-domain when message "<message>" is successfull and check email
    And Set password in mail "<email>" when message "<message>" is successfull
      | newPassword                               | confirmPassword                           | message                                                |
      |                                           |                                           | Please enter your password.                            |
      |                                         1 |                                         1 | Please choose a password that is 8-40 characters long. |
      | 12345678901234567890123456789012345678901 | 12345678901234567890123456789012345678901 | Please choose a password that is 8-40 characters long. |
      |                                  12345678 |                                  12345679 | Confirmed password does not match the password above.  |
      |                                  12345678 |                                  12345678 |                                                        |

    Examples: 
      | email                     | message                                                                                                  | oldPassword | status |
      |                           | This information is required.                                                                            |             | false  |
      | null                      | Please enter a valid email address (e.g. someone@example.com).                                           |             | false  |
      | null@yopmail.com          | Sorry, your email address is not associated with any account. Please contact your school for assistance. |             | false  |
      | user-password@yopmail.com | We have sent you a link to reset your password of Organization STG. Please check your inbox now.         |    12345678 | true   |

  Scenario Outline: Forgot valid in primary-domain
    Given The forgot password page in "Primary-domain" site is opened successfull
    When Input email "<email>" and choose domain: "<domain>"
    Then There is a message with content: "<message>"
    And Verify login with email "<email>", old password "<oldPassword>" and domain "<domain>" in Primary-domain when message "<message>" is successfull and check email
    And Set password in mail "<email>" when message "<message>" is successfull
      | newPassword                               | confirmPassword                           | message                                                |
      |                                           |                                           | Please enter your password.                            |
      |                                         1 |                                         1 | Please choose a password that is 8-40 characters long. |
      | 12345678901234567890123456789012345678901 | 12345678901234567890123456789012345678901 | Please choose a password that is 8-40 characters long. |
      |                                  12345678 |                                  12345679 | Confirmed password does not match the password above.  |
      |                                  12345678 |                                  12345678 |                                                        |

    Examples: 
      | email                      | domain           | message                                                                                                                     | oldPassword | status |
      |                            |                  | This information is required.                                                                                               |             | false  |
      | null                       |                  | Please enter a valid email address (e.g. someone@example.com).                                                              |             | false  |
      | null@yopmail.com           |                  | Sorry, your email address is not associated with any account. Please contact your school for assistance.                    |             | false  |
      | organization01@yopmail.com | Organization STG | We have sent you a link to reset your password of Organization STG. Please check your organization01@yopmail.com inbox now. |    12345678 | true   |
      | student28@yopmail.com      |                  | We have sent you a link to reset your password of Organization STG. Please check your student28@yopmail.com inbox now.      | Password01  | true   |
