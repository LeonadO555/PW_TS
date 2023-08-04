import {expect, Locator, Page} from "@playwright/test";
import {HomePage} from "../pages/home/HomePage";
import {LoginPage} from "../pages/login/LoginPage";

export const getMaxDiffPixels = (width: number, height: number): number => {
    return Math.round(((width * height) / 100) * 0.01);
};

export const studentEmail = 'malik@example.com';
export const teacherEmail = 'roxanne@example.com';
export const defaultPassword = '123456';

export const loginUserHelper = async (page: Page, email: string, password: string = defaultPassword) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickOnSignInButton();
    const loginPage = new LoginPage(page);
    await loginPage.fillLoginForm(email, password);
    await loginPage.clickOnSignInButton();
    await loginPage.checkSuccessLogin();
}

export const takeScreenshotOfElement = async (selector: Locator, fileName: string) => {
    const boundingBox = await selector.boundingBox();
    const width = boundingBox?.width || 0;
    const height = boundingBox?.height || 0;
    await expect(selector).toHaveScreenshot(fileName, {
        maxDiffPixels: getMaxDiffPixels(width, height),
    });
};