import {expect, Locator, Page} from '@playwright/test';
import {LoginPage} from '../pages/login/LoginPage';

export const getMaxDiffPixels = (width: number, height: number): number => {
  return Math.round(((width * height) / 100) * 0.01);
};

export enum CourseData {
  COURSE_NAME = 'QA_41_PAVEL',
  COURSE_DESCRIPTION = 'IT IS MY FIRST COURSE TEST',
  COURSE_START_DATA = 'July 05 2023',
  COURSE_END_DATA = 'July 10 2023',
}

export const takeScreenshotOfElement = async (selector: Locator, fileName: string) => {
  const boundingBox = await selector.boundingBox();
  const width = boundingBox?.width || 0;
  const height = boundingBox?.height || 0;
  await expect(selector).toHaveScreenshot(fileName, {
    maxDiffPixels: getMaxDiffPixels(width, height),
  });
};

export const loginTestHelper = async (page: Page, email: string, password: string = '123456') => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn(email, password);
  await loginPage.clickOnLoginButton();
};
