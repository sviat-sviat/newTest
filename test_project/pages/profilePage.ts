import { ElementFinder, Ptor } from "protractor";
import { BasePage } from "./base.page";
import { HeaderComponent } from "./components/header.co";


const pageUrl = "user/profile"

function createLocator (protractor: Ptor) {
    return {
        newletterButton: protractor.$("[ng-class*='newsletter'] button"),

        fieldValue: (field: ProfileField): ElementFinder =>
          protractor.$(`[ng-class*='${field}'] [class='description']>span`)
    }
}

export class ProfilePage extends BasePage {
    private _locators;
    public headerCo: HeaderComponent

    constructor(protractor: Ptor) {
        super(protractor.browser, protractor.$("[class='profile-page ng-scope']"));

        this._locators = createLocator(protractor);
        this.headerCo = new HeaderComponent(protractor);
    }

    async open() {
        await this.actions.goTo(`${this.baseUrl}/${pageUrl}`);
        await this.waitForPageToLoad();
    }

    async getFieldValue(field: ProfileField): Promise<string> {
        return await this.actions.getText(this._locators.fieldValue(field));
    }

    async isNewLetterOn(): Promise<boolean> {
        let attribute = await this.actions.getElementAttribute(this._locators.newletterButton, "class");
        return attribute == "toggle-btn on"
    }

    async getNewletterButtonState(): Promise<boolean> {
        if(await this.isNewLetterOn()) {
            return true
        } else {
            return false
        }
    }
}

enum ProfileField {
    Name = "name",
    Email = "email",
    Password = "password",
    Phone = "phone",
    Address = "address",
    SupportPin = "pin",
    Newletter = "newsletter"
}

export { ProfileField }