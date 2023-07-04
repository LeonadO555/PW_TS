import {expect, Locator, Page} from '@playwright/test';
import {takeScreenshotOfElement} from '../../helpers/common';
import {PageObject} from '../PageObject';

export class LoginPage extends PageObject {
  protected readonly emailField: Locator;
  protected readonly passwordField: Locator;
  protected readonly forgotPasswordLink: Locator;
  protected readonly signInButtonInTheForm: Locator;
  protected readonly signUpButtonInTheForm: Locator;
  protected readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.emailField = page.locator("//input[@id='sw-form-capture-email-input']");
    this.passwordField = page.locator("//input[@id='sw-form-password-input']");
    this.forgotPasswordLink = page.locator("//a[normalize-space()='Forgot password']");
    this.signInButtonInTheForm = page.locator("//a[@id='sw-sign-in-submit-btn']");
    this.signUpButtonInTheForm = page.locator("//img[@class='sw-width-5xs']");
    this.errorMessage = page.locator("//div[@class='error-message login-error d-block']");
  }

  async checkLoginFormElementsVisibility() {
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signInButtonInTheForm).toBeVisible();
    await expect(this.signUpButtonInTheForm).toBeVisible();
  }

  async fillLoginForm(username: string, password: string) {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
  }

  async clickOnSignInButtonInTheForm() {
    await this.signInButtonInTheForm.click({timeout: 10000});
  }

  async takeScreenshotForErrorMessage(fileName: string) {
    await takeScreenshotOfElement(this.errorMessage, fileName);
  }

  async checkSuccessLogin() {
    await expect(this.emailField).not.toBeVisible();
    await expect(this.passwordField).not.toBeVisible();
  }

  async checkNotSuccessLogin() {
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
  }
}
