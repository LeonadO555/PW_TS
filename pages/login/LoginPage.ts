import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';
import {takeScreenshotOfElement} from '../../helpers/common';

export const defaultPassword = '123456';
export const defaultEmailTeacher = 'roxanne@example.com';
export const defaultEmailStudent = 'malik@example.com';

export class LoginPage extends PageObject {

    protected readonly emailUserField: Locator;
    protected readonly passwordField: Locator;
    protected readonly singInButton: Locator;
    protected readonly accountLogoDisplayed: Locator;
    protected readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page, 'https://jere237.softr.app/sign-in');
        this.emailUserField = page.locator('//input[@id=\'sw-form-capture-email-input\']');
        this.passwordField = page.locator('//input[@id=\'sw-form-password-input\']');
        this.singInButton = page.locator('//a[@id=\'sw-sign-in-submit-btn\']');
        this.accountLogoDisplayed = page.locator('//div[@class=\'MuiBox-root css-4tv0ih\']//button');
        this.errorMessage = page.locator('//div[@class=\'error-message login-error d-block\']');
    }

    async signIn(username: string, password: string = 'roxane@example.com') {
        await this.emailUserField.fill(username);
        await this.passwordField.fill(password);
    }


    async clickOnLoginButton() {
        await this.singInButton.click({timeout: 10000});
    }

    async checkSuccessLogin() {
        // await this.page.waitForTimeout(1000);
        await expect(this.emailUserField).not.toBeVisible();
        await expect(this.passwordField).not.toBeVisible();
        await expect(this.singInButton).not.toBeVisible();
        await expect(this.accountLogoDisplayed).toBeVisible();
    }

    async checkNotSuccessLogin() {
        await expect(this.emailUserField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.singInButton).toBeVisible();
        await expect(this.errorMessage).toBeVisible();
    }

    async takeScreenshotForErrorMessage(fileName: string) {
        await takeScreenshotOfElement(this.errorMessage, fileName);
    }
}
