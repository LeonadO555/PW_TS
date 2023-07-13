import {Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';

// import en from "@faker-js/faker/locales/en";

export class AddNewCoursePage extends PageObject {
  protected readonly courseNameInput: Locator;
  protected readonly facultyDropdown: Locator;
  protected readonly courseDescriptionInput: Locator;
  protected readonly coverImageInput: Locator;
  protected readonly courseStartDateInput: Locator;
  protected readonly courseEndDateInput: Locator;
  protected readonly addButton: Locator;
  protected readonly calendarData: Locator;

  constructor(page: Page) {
    super(page, 'https://jere237.softr.app/add-course');
    this.courseNameInput = page.locator("//input[@id='course-documents-form-CourseName--1078269106']");
    this.facultyDropdown = page.locator("//div[@id='course-documents-form-Faculty-1389247778']");
    this.courseDescriptionInput = page.locator("//textarea[@id='course-documents-form-Description-1634506682']");
    this.coverImageInput = page.locator("//input[@id='course-documents-form-CoverPhoto-1704715303']");
    this.courseStartDateInput = page.locator("//input[@id='course-documents-form-Startdate-831849774']");
    this.courseEndDateInput = page.locator("//input[@id='course-documents-form-Enddate-1271684309']");
    this.addButton = page.locator("//button[normalize-space()='Add']");
    this.calendarData = page.locator("//div[@class='rdrDays']");
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

  async clickOnCalendarStartData() {
    await this.courseStartDateInput.click();
  }

  async clickOnCalendarEndData() {
    await this.courseEndDateInput.click();
  }

  // async chooseStartData(startData) {
  //     await this.calendarData.getByText(startData).click()
  // }
  //
  // async chooseEndData(endData) {
  //     await this.calendarData.getByText(endData).click()
  // }
  async chooseStartData(startData) {
    await this.calendarData.getByText(`"${startData}"`).click();
  }
  async chooseEndData(endData) {
    await this.calendarData.getByText(`"${endData}"`).click();
  }
}
