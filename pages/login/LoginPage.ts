import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';
import {takeScreenshotOfElement} from '../../helpers/common';

export const defaultPassword = '123456';
export const defaultEmailTeacher = 'roxanne@example.com';
export const defaultEmailStudent = 'malik@example.com';

export class LoginPage extends PageObject {

    protected readonly emailInput: Locator;
    protected readonly passwordInput: Locator;
    protected readonly singInButton: Locator;
    protected readonly accountLogoDisplayed: Locator;
    protected readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page, 'https://jere237.softr.app/sign-in');
        this.emailInput = page.locator('//input[@id=\'sw-form-capture-email-input\']');
        this.passwordInput = page.locator('//input[@id=\'sw-form-password-input\']');
        this.singInButton = page.locator('//a[@id=\'sw-sign-in-submit-btn\']');
        this.accountLogoDisplayed = page.locator('//div[@class=\'MuiBox-root css-4tv0ih\']//button');
        this.errorMessage = page.locator('//div[@class=\'error-message login-error d-block\']');
    }

    async login(username: string = 'roxane@example.com', password: string = '123456') {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
    }


    async clickOnLoginButton() {
        await this.singInButton.click({timeout: 100000});
    }

    async checkSuccessLogin() {
        await expect(this.emailInput).not.toBeHidden({timeout: 10000});
        await expect(this.passwordInput).not.toBeHidden({timeout: 10000});
        await expect(this.singInButton).not.toBeHidden({timeout: 10000});
        await expect(this.accountLogoDisplayed).toBeVisible();
    }

    async checkNotSuccessLogin() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.singInButton).toBeVisible();
        await expect(this.errorMessage).toBeVisible();
    }

    async takeScreenshotForErrorMessage(fileName: string) {
        await takeScreenshotOfElement(this.errorMessage, fileName);
    }
}
