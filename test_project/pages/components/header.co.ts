import { Ptor } from "protractor";
import { BaseComponent } from "./base.component";
import { LoginPage } from "../loginPage";

function createLocator (protractor: Ptor) {
    let by = protractor.by;
    let header = protractor.$("[class='ssls-header']")

    return {
        loginLabel: header.element(by.xpath("//span[contains(text(),'Log in')]")),
        logedInUserEmail: header.$("button span[class$=text]"),
        userDropdown: header.$("div[class*=ssls-header-user]>button"),
        profileOption: header.$("[href*=profile]"),
        logOut: header.$("[class*='holder--toolbar'] button")
    }
}

export class HeaderComponent extends BaseComponent {
    private _protractor: Ptor;
    private _locators;

    constructor(protractor: Ptor) {
        super(protractor.browser, protractor.$("[class='ssls-header']"));
    
        this._protractor = protractor;
        this._locators = createLocator(protractor);
    }

    async clickLoginLabel() {
        await this.actions.clickElement(this._locators.loginLabel);
        await new LoginPage(this._protractor).waitForPageToLoad();
    }

    async isLoginLabelPresent(): Promise<boolean> {
        return await this.actions.isElementPresent(this._locators.loginLabel);
    }

    async getLogedInUserEmail(): Promise<string> {
        return await this.actions.getText(this._locators.logedInUserEmail);
    }

    async openUserDropdown() {
        await this.actions.clickElement(this._locators.userDropdown);
    }

    async clickProfileOption() {
        await this.actions.clickElement(this._locators.profileOption);
    }

    async logOut() {
        await this.openUserDropdown();
        await this.actions.clickElement(this._locators.logOut);
        await new LoginPage(this._protractor).waitForPageToLoad();
    }
}