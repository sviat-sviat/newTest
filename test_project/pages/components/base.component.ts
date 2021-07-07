import { ProtractorBrowser, ElementFinder } from "protractor";
import { BaseActions} from "../../helpers/base.actions";

export class BaseComponent {
  public rootElement: ElementFinder;
  public actions: BaseActions

  constructor(browser: ProtractorBrowser, rootElement: ElementFinder) {
    this.actions = new BaseActions(browser);
    this.rootElement = rootElement;
  }

  async waitForComponentToLoad() {
    await this.actions.waitForElementPresent(this.rootElement);
  }

  async waitForComponentToGone() {
    await this.actions.waitForElementNotPresent(this.rootElement);
  }
}
