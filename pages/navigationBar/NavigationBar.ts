import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';

export const defaultPassword = '123456';
export const defaultEmailTeacher = 'roxanne@example.com';
export const defaultEmailStudent = 'malik@example.com';

export class NavigationBar extends PageObject {
  protected readonly toHomePageLogoNavBarButton: Locator;
  protected readonly aboutUsNavBarButton: Locator;
  protected readonly coursesNavBarButton: Locator;
  protected readonly professorsNavBarButton: Locator;
  protected readonly signInNavBarButton: Locator;
  protected readonly signUpNavBarButton: Locator;
  protected readonly addCourse: Locator;
  protected readonly courseListButton: Locator;
  protected readonly userProfileButton: Locator;
  protected readonly myProfileButton: Locator;
  protected readonly signUpUserProfileButton: Locator;

  constructor(page: Page) {
    super(page, 'https://jere237.softr.app/');
    this.toHomePageLogoNavBarButton = page.locator("//a[normalize-space()='']//img");
    this.aboutUsNavBarButton = page.locator("//span[normalize-space()='About Us");
    this.coursesNavBarButton = page.locator("//span[normalize-space()='Courses']");
    this.professorsNavBarButton = page.locator("//span[normalize-space()='Professors']");
    this.signInNavBarButton = page.locator("//span[normalize-space()='Sign in']");
    this.signUpNavBarButton = page.locator("//span[normalize-space()='Sign up']");
    this.addCourse = page.locator(
      "//a[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-50mh96']"
    );
    this.courseListButton = page.locator("//span[normalize-space()='Course list']");
    this.userProfileButton = page.locator("//button[@type='button']");
    this.myProfileButton = page.locator("//span[normalize-space()='My Profile']");
    this.signUpUserProfileButton = page.locator("//span[normalize-space()='Sign Out']");
  }

  async checkLoaded() {
    await expect(this.aboutUsNavBarButton).toBeVisible();
  }

  async clickToHomePageLogoNavBarButton() {
    await this.toHomePageLogoNavBarButton.click();
  }
  async clickAboutUsNavBarButton() {
    await this.aboutUsNavBarButton.click();
  }
  async clickCoursesNavBarButton() {
    await this.coursesNavBarButton.click();
  }
  async clickProfessorsNavBarButton() {
    await this.professorsNavBarButton.click();
  }
  async clickSignInNavBarButton() {
    await this.signInNavBarButton.click();
  }
  async clickSignUpNavBarButton() {
    await this.signUpNavBarButton.click();
  }
  async clickAddCourse() {
    await this.addCourse.click();
  }
  async clickCourseListButton() {
    await this.courseListButton.click();
  }
  async clickUserProfileButton() {
    await this.userProfileButton.click();
  }
  async clickMyProfileButton() {
    await this.userProfileButton.click();
  }
  async clickSignUpUserProfileButton() {
    await this.signUpUserProfileButton.click();
  }
}
