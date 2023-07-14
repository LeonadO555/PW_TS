import {PageObject} from "./PageObject";
import {expect, Locator, Page} from "@playwright/test";
import {defaultPassword, takeScreenshotOfElement} from "../helpers/common";

export class LoginPage extends PageObject{
    protected readonly emailInput: Locator;
    protected readonly passwordInput: Locator;
    protected readonly signInButton: Locator;
    protected readonly signUpButton: Locator;
    protected readonly singInTable: Locator;
    protected readonly errorMessage: Locator;


    constructor(page:Page) {
        super(page, '/');
        this.singInTable = page.locator('//div[@id="signin"]');
        this.emailInput = page.locator('//input[@placeholder="Email"]');
        this.passwordInput = page.locator('//input[@placeholder="Password"]');
        this.signInButton = page.locator("//a[@id='sw-sign-in-submit-btn']");
        this.errorMessage = page.locator('//div[@class=\'error-message login-error d-block\']');
        this.signUpButton = page.locator("//a[@id='sw-go-to-sign-up-btn']");

    }

    async fillLoginForm(userEmail: string, password: string = defaultPassword){
        await this.singInTable.isVisible();
        await this.emailInput.fill(userEmail);
        await this.passwordInput.fill(password);
    }
    async checkSuccessLogin(){
        await expect(this.emailInput).not.toBeVisible();
        await expect(this.passwordInput).not.toBeVisible();
    }
    async checkNotSuccessLogin() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();

    }

    async takeScreenshotForErrorMessage(fileName: string) {
        await takeScreenshotOfElement(this.errorMessage, fileName);
    }

    async clickOnSubmitButton() {
        await this.signInButton.click();
    }
}