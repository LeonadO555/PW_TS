import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';

export class HomePage extends PageObject {
  protected readonly pageText: Locator;
  protected readonly signInButton: Locator;
  protected readonly courseButton: Locator;
  protected readonly courseListButton: Locator;
  protected readonly addCourseButton: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.pageText = page.locator("//div[@class='col-lg-5 pb-5 pb-lg-0 text-center text-lg-left']");
    this.signInButton = page.locator("//a[contains(text(),'Sign in')]");
    this.courseButton = page.locator("//a[@role='button']");
    this.courseListButton = page.getByText('Course list');
    this.addCourseButton = page.locator("//a[@href='/add-course']");
  }

  async clickOnSignInButton() {
    await this.signInButton.click({timeout: 10000});
  }
  async clickOnAddCourseButton() {
    await this.addCourseButton.click({timeout: 10000});
  }

  async clickOnCourseButton() {
    await this.courseButton.click({timeout: 10000});
  }

  async clickOnCourseListButton() {
    await this.courseListButton.click({timeout: 10000});
  }
}
