import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export enum FacultyList {
  BUSINESS_SCHOOL = 'Business School',
  ENGINEERING = 'Engineering',
  SCIENCES = 'Sciences',
  LAW = 'Law',
  MEDICINE = 'Medicine',
  ART_DESIGN_ARCHITECTURE = 'Arts, Design & Architecture',
}

function randEnumValue<T>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj as object);
  const index = Math.floor(Math.random() * enumValues.length);
  return enumValues[index];
}

export class AddNewCoursePage extends PageObject {
  protected readonly addANewCourseText: Locator;
  protected readonly courseNameInput: Locator;
  protected readonly facultyDropDown: Locator;
  protected readonly descriptionInput: Locator;
  protected readonly coverPhotoInput: Locator;
  protected readonly courseStartDate: Locator;
  protected readonly courseEndDate: Locator;
  protected readonly addCourseButton: Locator;
  protected readonly successMessage: Locator;
  protected readonly calendarDates: Locator;
  protected readonly userAvatar: Locator;
  protected readonly signOutButton: Locator;

  constructor(page: Page) {
    super(page, '/add-course');

    this.addANewCourseText = page.getByText('Add a new course');
    this.courseNameInput = page.locator("//form//div[@field='Course Name']//input");
    this.facultyDropDown = page.locator("//div[@field='Faculty']");
    this.descriptionInput = page.locator("//div[@field='Description']//textarea[1]");
    this.coverPhotoInput = page.locator("//input[@field='Cover Photo']");
    this.courseStartDate = page.locator("//div[@field='Start date']//input");
    this.courseEndDate = page.locator("//div[@field='End date']//input");
    this.addCourseButton = page.locator("//button[@type='submit']");
    this.successMessage = page.locator(
      "//p[@class='sw-font-size-xs sw-text-color-5a5d63 sw-font-family-default sw-font-weight-medium sw-padding-top-7xs sw-padding-bottom-none sw-letter-spacing-normal']"
    );
    this.calendarDates = page.locator("//div[@class='rdrMonth']//div[@class='rdrDays']");
    this.userAvatar = page.locator("//img[@alt='Roxanne']");
    this.signOutButton = page.getByText('Sign Out');
  }

  async checkVisibilityOfElements() {
    await expect(this.addANewCourseText).toBeVisible();
  }
  async fillCourseNameAndDescription(courseName: string, description: string) {
    await this.courseNameInput.fill(courseName);
    await this.descriptionInput.fill(description);
  }

  async selectAFaculty(faculty: string = randEnumValue(FacultyList)) {
    await this.facultyDropDown.click({timeout: 10000});
    const optionLoc = `//div[@role="presentation"]//ul[@role="listbox"]/li[@data-value="${faculty}"]`;

    const facultyOption = this.page.locator(optionLoc);
    await facultyOption.click({timeout: 10000});
  }

  async coverPhotoUpload(photoPath: string) {
    await this.coverPhotoInput.setInputFiles(photoPath);
  }

  async clickOnStartDate() {
    await this.courseStartDate.click();
  }

  async clickOnEndDate() {
    await this.courseEndDate.click();
  }

  getRandomDay() {
    const now = new Date();
    const daysCount = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Math.floor(Math.random() * (daysCount + 1));
  }

  async chooseStartData(startData: number = this.getRandomDay()) {
    await this.clickOnStartDate();
    await this.calendarDates.locator(`//button[not(contains(@class, 'rdrDayPassive')) and  .="${startData}"]`).click();
  }
  async chooseEndData(endData: number = this.getRandomDay()) {
    await this.clickOnEndDate();
    await this.calendarDates.locator(`//button[not(contains(@class, 'rdrDayPassive'))  and  .="${endData}"]`).click();
  }

  async clickOnAddButton() {
    await this.addCourseButton.click({timeout: 10000});
  }

  async checkSuccessMsgPresent() {
    await expect(this.successMessage).toBeVisible();
  }

  async logoutUser() {
    await this.userAvatar.click();
    await this.signOutButton.click();
  }
}
