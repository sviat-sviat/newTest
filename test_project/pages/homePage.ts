import { Ptor } from "protractor";
import { BasePage } from "./base.page";
import { HeaderComponent } from "./components/header.co"

function createLocator (protractor: Ptor) {
    return {
    }
}

export class HomePage extends BasePage {
    private _locators;
    public headerCo: HeaderComponent

    constructor(protractor: Ptor) {
        super(protractor.browser, protractor.$("[class='ssls-home-page']"));

        this._locators = createLocator(protractor);
        this.headerCo = new HeaderComponent(protractor);
    }

    async open() {
        await this.actions.goTo(`${this.baseUrl}`);
        await this.waitForPageToLoad();
    }
}