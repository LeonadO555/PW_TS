import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';

export class StudentMainPage extends PageObject {
  protected readonly professorsTab: Locator;
  protected readonly avatarButton: Locator;
  protected readonly signOutButton: Locator;

  constructor(page: Page) {
    // @ts-ignore
    super(page, '/');
    this.professorsTab = page.locator("//span[normalize-space()='Professors']");
    this.signOutButton = page.locator("//span[normalize-space()='Sign Out']");
    this.avatarButton = page.locator("//*[@type='button']//img");
  }

  async checkVisibilityOfElements() {
    await expect(this.professorsTab).toBeVisible();
  }

  async clickOnProfessorsTab() {
    await this.professorsTab.click({timeout: 10000});
  }

  async signOut() {
    await this.avatarButton.click({timeout: 10000});
    await this.signOutButton.click();
  }
}
