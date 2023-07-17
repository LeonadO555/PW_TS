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

export enum Faculty {
  BUSINESS_SCHOOL = 'Business School',
  ENGINEERING = 'Engineering',
  SCIENCES = 'Sciences',
  LAW = 'Law',
  MEDICINE = 'Medicine',
  ARTS_DESIGN_AND_ARCHITECTURE = 'Arts, Design & Architecture',
}

export const takeScreenshotOfElement = async (selector: Locator, fileName: string) => {
  const boundingBox = await selector.boundingBox();
  const width = boundingBox?.width || 0;
  const height = boundingBox?.height || 0;
  await expect(selector).toHaveScreenshot(fileName, {
    maxDiffPixels: getMaxDiffPixels(width, height),
  });
};

export const loginTestHelper = async (page: Page, username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.clickOnLoginButton();
  await loginPage.checkSuccessLogin();
};
export const loginHelp = async (page: Page, username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
  await loginPage.clickOnLoginButton();
  await loginPage.checkSuccessLogin();
};
