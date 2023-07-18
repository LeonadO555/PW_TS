import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';
// @ts-ignore
import {WaitForSelectorOptions} from 'playwright';

export class CoursePage extends PageObject {
  protected readonly computerSinceCourse: Locator;
  protected readonly titleComputerSince: Locator;
  protected readonly nameOfDocument: Locator;
  public courseName: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.computerSinceCourse = page.locator("//*[@href='/course-details?recordId=rec2dBNr4rcB2StDM']");
    this.titleComputerSince = page.locator("//h3[@xpath='1']");
    this.nameOfDocument = page.getByText('cat');
    this.courseName = page.locator("(//div[@class='MuiBox-root css-0'])[1]");
  }

  async checkPageContainsText(searchText: string): Promise<boolean> {
    const waitForOptions: WaitForSelectorOptions = {text: searchText};
    await this.page.waitForSelector(`:text("${searchText}")`, waitForOptions);
    return true;
  }

  async getTextFromLocator(locator: Locator): Promise<string | null> {
    try {
      const element = await locator.first();
      if (element) {
        const text = await element.textContent();
        return text ?? null;
      }
    } catch (error) {
      console.error('Error while getting text from locator:', error);
    }

    return null;
  }
}
