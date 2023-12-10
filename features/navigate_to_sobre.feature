Feature: Navigate to "Sobre" page 
  Scenario: "Home" page isn't "Sobre" page
    Given I am on the Pauliceia 2.0 home page
    When I follow Sobre
    Then I should be on the Sobre page
