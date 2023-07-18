import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class CoursesPage extends PageObject {
  protected readonly computerSinceCourse: Locator;
  protected readonly searchCourseInput: Locator;
  protected readonly courseNameText: Locator;

  constructor(page: Page) {
    super(page, '/course-details?recordId=rec2dBNr4rcB2StDM');

    this.computerSinceCourse = page.locator(
      "//div[@class='list-action-wrapper']//a[@href='/course-details?recordId=rec2dBNr4rcB2StDM']"
    );
    this.searchCourseInput = page.locator("//*[@placeholder='Search by course name or professor']");
    this.courseNameText = page.locator("(//div[@class='list-item-wrapper vertical MuiBox-root css-89nl51'])[1]");
  }

  async fillCourseInput(text: string) {
    await this.searchCourseInput.fill(text);
  }

  async clickOnCourse() {
    await this.computerSinceCourse.click();
  }

  async clickOnCourseName(text: string) {
    await expect(await this.page.locator(`text=${text}`)).toBeVisible();
    //await this.page.locator(`text=${text}`).click();
    await this.courseNameText.click({timeout: 10000});
  }
}
