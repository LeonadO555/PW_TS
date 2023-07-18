import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';
import {getMaxDiffPixels} from '../../helpers/common';

export class LoginPage extends PageObject {
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly signInButton: Locator;
  protected readonly signUpButton: Locator;
  protected readonly errorMsg: Locator;

  constructor(page: Page) {
    super(page, '/sign-in');
    this.emailInput = page.locator("//input[@type='email']");
    this.passwordInput = page.locator("//input[@type='password']");
    this.signInButton = page.locator("//a[@id='sw-sign-in-submit-btn']");
    this.signUpButton = page.locator("//a[@id='sw-go-to-sign-up-btn']");
    this.errorMsg = page.locator("//*[@class='error-message login-error d-block']");
  }

  async fillLoginForm(email: string, password: string = '123456') {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickOnSignInButton() {
    await this.signInButton.click({timeout: 10000});
  }

  async checkSuccessLogin() {
    await expect(this.emailInput).toBeHidden();
    await expect(this.passwordInput).toBeHidden();
    await expect(this.signInButton).toBeHidden();
  }

  async checkNotSuccessLogin() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async takeScreenshotForErrorMessage(fileName: string) {
    const boundingBox = await this.errorMsg.boundingBox();
    const width = boundingBox?.width || 0;
    const height = boundingBox?.height || 0;
    await expect(this.errorMsg).toHaveScreenshot(fileName, {maxDiffPixels: getMaxDiffPixels(width, height)});
  }

  async checkElementIsVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }
}
