import {
  ProtractorBrowser,
  ExpectedConditions,
  ElementFinder,
} from "protractor";

const timeout = 10000;

export class BaseActions {
  private _browser: ProtractorBrowser;

  constructor(browser: ProtractorBrowser) {
    this._browser = browser;
  }

  async waitForElementPresent(
    element: ElementFinder,
    timeToWait: number = timeout,
    msg = `Failed to wait for element present by locator: '${element.locator()}')`
  ) {
    await this._browser.wait(
      ExpectedConditions.presenceOf(element),
      timeToWait,
      msg
    );
  }

  async waitForElementNotPresent(
    element: ElementFinder,
    timeToWait: number = timeout,
    msg: string = `Failed to wait for element not present by locator: '${element.locator()}'`
  ) {
    await this._browser.wait(
      ExpectedConditions.stalenessOf(element),
      timeToWait,
      msg
    );
  }

  async waitForElementVisible(
    element: ElementFinder,
    timeToWait: number = timeout,
    msg: string = `Failed to wait for element visible by locator: '${element.locator()}'`
  ) {
    await this._browser.wait(
      ExpectedConditions.visibilityOf(element),
      timeToWait,
      msg
    );
  }

  async isElementPresent(element: ElementFinder): Promise<boolean> {
    return await element.isPresent();
  }

  async isElementDisplayed(element: ElementFinder): Promise<boolean> {
    return await element.isDisplayed();
  }

  async clickElement(element: ElementFinder) {
    await this.waitForElementPresent(element);
    await element.click();
  }

  async setText(element: ElementFinder, value: string | number) {
    await this.waitForElementPresent(element);
    await element.clear();
    await element.sendKeys(value);
  }

  async goTo(url: string) {
    if ((await this._browser.getCurrentUrl()) != url) {
      await this._browser.get(url);
    }
  }
}
