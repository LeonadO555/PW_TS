import {expect, Locator, Page} from '@playwright/test';
import {LoginPage} from '../pages/login/LoginPage';
import {HomePage} from '../pages/HomePage';

export const defaultPassword = '123456';

export const getMaxDiffPixels = (width: number, height: number): number => {
  return Math.round(((width * height) / 100) * 0.01);
};
export const takeScreenshotOfElement = async (selector: Locator, fileName: string) => {
  const boundingBox = await selector.boundingBox();
  const width = boundingBox?.width || 0;
  const height = boundingBox?.height || 0;
  await expect(selector).toHaveScreenshot(fileName, {
    maxDiffPixels: getMaxDiffPixels(width, height),
  });
};

export const loginTestHelper = async (page: Page, email: string, password: string = defaultPassword) => {
  const homepage = new HomePage(page);
  await homepage.goto();
  await homepage.clickOnSignInHeaderButton();
  const loginPage = new LoginPage(page);
  await loginPage.fillLoginForm(email, password);
  await loginPage.clickOnSubmitButton();
  await loginPage.checkSuccessLogin();
};
