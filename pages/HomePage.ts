import {PageObject} from './PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class HomePage extends PageObject {
  protected readonly signInHeaderButton: Locator;
  protected readonly signUpHeaderButton: Locator;
  protected readonly logoButton: Locator;
  protected readonly welcomeText: Locator;
  protected readonly signUpNowButton: Locator;
  protected readonly aboutUsTab: Locator;
  protected readonly coursesTab: Locator;
  protected readonly professorsTab: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.welcomeText = page.getByText('Welcome');
    this.signInHeaderButton = page.locator("//a[contains(text(),'Sign in')]");
    this.signUpHeaderButton = page.locator("//a[contains(text(),'Sign up ')]");
    this.logoButton = page.locator("//img[@class='sw-width-5xs']");
    this.signUpNowButton = page.locator("//a[normalize-space()='Sign up now']");
    this.aboutUsTab = page.locator("//span[normalize-space()='About Us']");
    this.coursesTab = page.locator("//span[normalize-space()='Courses']");
    this.professorsTab = page.locator("//span[normalize-space()='Professors']");
  }

  async clickOnSignInHeaderButton() {
    await this.signInHeaderButton.click({timeout: 10000});
  }

  async clickOnSignUpHeaderButton() {
    await this.signInHeaderButton.click({timeout: 10000});
  }

  async clickOnLogoButton() {
    await this.logoButton.click({timeout: 10000});
  }

  async checkElementsVisibility() {
    await expect(this.signInHeaderButton).toBeVisible();
    await expect(this.signUpHeaderButton).toBeVisible();
    await expect(this.logoButton).toBeVisible();
    await expect(this.welcomeText).toBeVisible();
    await expect(this.aboutUsTab).toBeVisible();
    await expect(this.coursesTab).toBeVisible();
    await expect(this.professorsTab).toBeVisible();
  }
}
