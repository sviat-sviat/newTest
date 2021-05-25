import { Ptor } from "protractor";
import { BasePage } from "./base.page";

const pageUrl = "authorize";
const validEmail = "ssls.automation+666@gmail.com";
const validPassword = "123456";

function createLocator(protractor: Ptor) {
    return{
        notificationMessage: protractor.$("[class='noty_text']"),
        emailInput: protractor.$("[name=email]"),
        passwordInput: protractor.$("[name=password]"),
        showPasswordButton: protractor.$("button[ng-click*='showPassword']"),
        loginButton: protractor.$("[type=submit]"),
    }
}

export class LoginPage extends BasePage {
  private _locators;

  constructor(protractor: Ptor) {
    super(
      protractor.browser,
      protractor.$("[class='authorization-page ng-scope']")
    );

    this._locators = createLocator(protractor);
  }

  async open() {
    await this.actions.goTo(`${this.baseUrl}/${pageUrl}`);
    await this.waitForPageToLoad();
  }

  async setEmailAddress(email: string) {
    await this.actions.setText(this._locators.emailInput, email);
  }

  async setPassword(password: string) {
    await this.actions.setText(this._locators.passwordInput, password);
  }
  async clickShowPasswordButton() {
    await this.actions.clickElement(this._locators.showPasswordButton);
  }

  async isPasswordShown(): Promise<boolean> {
    let attribute = await this.actions.getElementAttribute(
      this._locators.passwordInput,
      "type"
    );
    return attribute == "text";
  }

  async clickLoginButton(waitForSuccessfullyLogin: boolean = true) {
    await this.actions.clickElement(this._locators.loginButton);

    if (waitForSuccessfullyLogin) {
      await this.actions.waitForElementNotPresent(this._locators.loginButton);
    }
  }

  async login(
    email: string = validEmail,
    password: string = validPassword,
    waitForSuccessfullyLogin: boolean = true
  ) {
    await this.setEmailAddress(email);
    await this.setPassword(password);
    await this.clickLoginButton(waitForSuccessfullyLogin);
  }

  async getNotoficationMessage(): Promise<string> {
    return await this.actions.getText(this._locators.notificationMessage)
  }
}