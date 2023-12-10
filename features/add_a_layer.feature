Feature: User can manually add a layer 
  Scenario: Add a layer
    Given I am on the Pauliceia 2.0 home page
    When I follow Entrar
    Then I should be on the Login page
    When I fill the field E-mail with estudante.da.each@usp.br
    And I fill the field Senha with estudante.da.each@usp.br123
    And I press Entrar
    Then I should be logged on
    When I click user icon
    And follow Painel
    Then I should be on the Dashboard page
    When I follow Nova Camada
    Then I should be on the Nova Camada page
    When I fill the required data
    And I press Enviar
    Then I should be on the Dados Temporais page
    When I fill the time data
    And I press the Enviar button
    Then I should get an error
