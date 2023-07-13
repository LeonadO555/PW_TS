import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {takeScreenshotOfElement} from '../../helpers/common';

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
    this.successMessage = page.locator("/button[@label='Add']//span[@class='MuiTouchRipple-root css-w0pj6f']");
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

  formatDate(date: Date): string {
    return date
      .toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(',', '');
  }

  async setRandomCourseDates() {
    const startDate = faker.date.future();
    const endDate = faker.date.between(startDate, faker.date.future(2));

    await new Promise((res: any, _: any) => {
      setTimeout(() => {
        res();
      }, 3000);
    });

    await this.page.evaluate(
      ({start, end}) => {
        (document.querySelector("div[field='Start date'] input") as HTMLInputElement).value = start;
        (document.querySelector("div[field='End date'] input") as HTMLInputElement).value = end;
      },
      {start: this.formatDate(startDate), end: this.formatDate(endDate)}
    );
  }

  async clickOnAddButton() {
    await this.addCourseButton.click({timeout: 10000});
  }

  async takeScreenshotForSuccessMessage(fileName: string) {
    await takeScreenshotOfElement(this.successMessage, fileName);
  }
}
