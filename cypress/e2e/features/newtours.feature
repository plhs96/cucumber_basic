Feature: newtours validation
Background: 
    Given open newtours application

    Scenario: Home Page 1
        Given precondition
        When action
        Then testable outcome

    Scenario: Home Page 2
        When provide valid userName and password
        Then click on submit button
        And verify title of the web page

    Scenario: Home Page 3
        When provide valid 'mercury' and 'mercury'
        Then click on submit button
        And verify title should be 'Login: Mercury Tours'

    Scenario: Home Page 4
        When I log in as Following
            | userName | password |
            | mercury  | mercury  |
        Then click on submit button
        And verify title should be 'Login: Mercury Tours'