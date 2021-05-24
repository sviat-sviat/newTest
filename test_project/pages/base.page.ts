import { ProtractorBrowser, ElementFinder } from "protractor";
import { BaseActions } from "../helpers/base.actions"

const baseUrl = "https://www.sbzend.ssls.com"

export class BasePage {
    public actions: BaseActions;
    public rootElement: ElementFinder;
    public baseUrl: string = baseUrl;

    constructor(
        browser: ProtractorBrowser,
        rootElement: ElementFinder
    ) {
        this.actions = new BaseActions(browser);
        this.rootElement = rootElement
    }

    async waitForPageToLoad() {
        await this.actions.waitForElementVisible(this.rootElement);
    }

    async isPageLoaded(): Promise<boolean> {
        return this.actions.isElementDisplayed(this.rootElement);
    }
}