const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// setup do driver
/*const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();*/

/*const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('user-data-dir=/home/mintuser/Documentos/Pauliceia');
chromeOptions.addArguments('--temp-directory=/home/mintuser/Documentos/Pauliceia');
chromeOptions.addArguments('--test-type');
chromeOptions.addArguments('--no-sandbox');
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();*/

const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('user-data-dir=/home/mintuser/Documentos/Pauliceia');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments('--disable-extensions');
chromeOptions.addArguments('--disable-infobars');
chromeOptions.addArguments('--disable-dev-shm-usage'); // Adicionada esta opção

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();



Given('I am on the Pauliceia 2.0 home page', {timeout: 60 * 1000}, async function () {
    await driver.get('https://pauliceia.unifesp.br/portal/home');
});

When('I follow Sobre', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/ul/li[4]/a")).click();
    const url = driver.getCurrentUrl() + '';
    this.actualAnswer =  url.split('/')[url.split('/').length - 1];
});

Then('I should be on the Sobre page', {timeout: 60 * 1000}, async function () {
    const url = driver.getCurrentUrl() + '';
    const page_name =  url.split('/')[url.split('/').length - 1];
    expect(page_name).to.equal(this.actualAnswer);
});





/*Given('I am on the Pauliceia 2.0 home page', {timeout: 60 * 1000}, async function () {
    await driver.get('https://pauliceia.unifesp.br/portal/home');
});*/

When('I follow Entrar', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div/section/div/header/nav/div/div[1]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div/section/div/header/nav/div/div[1]/a")).click();
});

Then('I should be on the Login page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    const page_name =  url.split('/')[url.split('/').length - 1] + '';
    this.actualAnswer = 'login';
    expect(page_name).to.equal(this.actualAnswer);
});

When('I fill the field E-mail with estudante.da.each@usp.br', {timeout: 60 * 1000}, async function () {
    driver.sleep(3000);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[1]/input")).sendKeys("estudante.da.each@usp.br");
});

When('I fill the field Senha with estudante.da.each@usp.br123', {timeout: 60 * 1000}, async function () {
    driver.sleep(30000);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[2]/input")).sendKeys("estudante.da.each@usp.br123");
});

When('I press Entrar', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[3]/button")).click();
    driver.sleep(5000);
});

Then('I should be logged on', {timeout: 60 * 1000}, async function () {
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div/section/div/header/nav/div/div[1]/div/button/div/div/div/div/img")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const icon_exists = await element.isDisplayed();
    expect(icon_exists).to.equal(true);
});

When('I click user icon', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/div[1]/div/button")).click();
    driver.sleep(5000);
});

When('follow Painel', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/ul/li[2]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[2]/a")).click();
});

Then('I should be on the Dashboard page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    expect(url.split('/')[url.split('/').length - 2] + '/' + url.split('/')[url.split('/').length - 1]).to.equal('dashboard/home');
});

When('I follow Nova Camada', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/div/ul/li[2]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/div/ul/li[2]/a")).click();
});

Then('I should be on the Nova Camada page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    expect(url.split('/')[url.split('/').length - 1]).to.equal('newLayer');
});

When('I fill the required data', {timeout: 60 * 1000}, async function () {
    this.nomeCamada = Math.random().toString().replace('0.', '');
    await driver.findElement(By.xpath("//*[@id=\"inputName\"]")).sendKeys("teste camada " + this.nomeCamada);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).sendKeys("teste");
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/button")).click();
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("cintiaalmeida");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("teste");
    await driver.findElement(By.xpath("//*[@id=\"inputDescription\"]")).sendKeys("Teste de adição de camada");
    await driver.findElement(By.xpath("//*[@id=\"inputReference\"]")).sendKeys("DE TAL, Fulano. Especialização em temas gerais.");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[4]/div/div[2]/a")).click();
    await driver.findElement(By.xpath("//*[@id=\"Upload\"]")).sendKeys(__dirname + '/' + 'camada_teste.zip');
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[2]/button")).click();
});

When('I press Enviar', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[2]/button")).click();
});

Then('I should be on the Dados Temporais page', {timeout: 60 * 1000}, async function () {
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/h5")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_exists = await element.isDisplayed();
    expect(elem_exists).to.equal(true);
});

When('I fill the time data', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("//*[@id=\"start_date\"]")).sendKeys("01/01/1900");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("data");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[1]/div[3]/div/div/div[1]/input")).sendKeys("YYYY-MM-DD");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("teste");
    await driver.findElement(By.xpath("//*[@id=\"end_date\"]")).sendKeys("01/01/2000");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[2]/div[2]/div/div/div[1]/input")).sendKeys("datafim");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[2]/div[3]/div/div/div[1]/input")).sendKeys("YYYY-MM-DD");
});

When('I press the Enviar button', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[3]/div/a")).click();
});

AfterAll({timeout: 60 * 1000}, async function(){
    driver.sleep(5000);
    await driver.quit();
});

/*Feature: User can manually add a layer //*[@id="keywordsSelect"]
  Scenario: Add a layer
    Given I am on the Pauliceia 2.0 home page
    When I follow Entrar
    Then I should be on the Login page
    When I fill the field E-mail with estudante.da.each@usp.br
    When I fill the field Senha with estudante.da.each@usp.br123
    When I press Entrar
    Then I should be logged on
    When I click user icon
    And follow Painel
    Then I should be on the Profile page
    When I follow Nova Camada
    Then I should be on the Nova Camada page
    When fill the required data
    And press Enviar
    Then I should get an error*/
