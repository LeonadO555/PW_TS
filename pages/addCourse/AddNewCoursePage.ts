import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';

export enum DateInput {
  StartDate = "//input[@id='course-documents-form-Startdate-831849774']",
  EndDate = "//input[@id='course-documents-form-Enddate-1271684309']",
}
export class AddNewCoursePage extends PageObject {
  protected readonly courseNameInput: Locator;
  protected readonly facultyDropdown: Locator;
  protected readonly courseDescriptionInput: Locator;
  protected readonly coverImageInput: Locator;
  protected readonly addButton: Locator;
  protected readonly calendarData: Locator;
  protected readonly courseCreatedText: Locator;
  protected readonly courseNameIsRequiredErrorText: Locator;

  constructor(page: Page) {
    super(page, '/add-course');
    this.courseNameInput = page.locator("//input[@id='course-documents-form-CourseName--1078269106']");
    this.facultyDropdown = page.locator("//div[@id='course-documents-form-Faculty-1389247778']");
    this.courseDescriptionInput = page.locator("//textarea[@id='course-documents-form-Description-1634506682']");
    this.coverImageInput = page.locator("//input[@id='course-documents-form-CoverPhoto-1704715303']");
    this.addButton = page.locator("//button[normalize-space()='Add']");
    this.calendarData = page.locator("//div[@class='rdrDays']");
    this.courseCreatedText = page.locator(
      "//p[@class='sw-font-size-xs sw-text-color-5a5d63 sw-font-family-default sw-font-weight-medium sw-padding-top-7xs sw-padding-bottom-none sw-letter-spacing-normal']"
    );
    this.courseNameIsRequiredErrorText = page.locator("//span[@class='form-error-text']//span");
  }

  async addCourseInput(courseName: string, courseDescription: string) {
    await this.courseNameInput.fill(courseName);
    await this.courseDescriptionInput.fill(courseDescription);
  }

  async clickFaculty() {
    await this.facultyDropdown.click();
  }

  async clickAddButton() {
    await this.addButton.click({timeout: 1000});
  }

  async choseFaculty(nameFaculty: string) {
    const facultyItem = this.page.locator(`//li[normalize-space()='${nameFaculty}']`);
    await facultyItem.click();
  }
  async setDataInCalendar(selector: DateInput, data: string) {
    await this.page.locator(selector).click();
    await expect(this.calendarData, 'Calendar for start data should be shown!').toBeVisible();
    await this.calendarData.locator(`text="${data}"`).first().click();
  }
  async addCoverImage(imagePath: string) {
    const input = await this.coverImageInput.elementHandle();
    await input.setInputFiles(imagePath);
  }
  async checkSuccessCreatedCourse() {
    await expect(this.courseCreatedText).toBeVisible();
  }
  async checkCourseNameIsRequiredErrorText() {
    await expect(this.courseNameIsRequiredErrorText).toBeVisible();
  }
}
