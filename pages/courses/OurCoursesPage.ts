import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';

export class OurCoursesPage extends PageObject {
  protected readonly searchInput: Locator;
  protected readonly selectCreatedCourse: Locator;

  constructor(page: Page) {
    super(page, '/course-list');
    this.searchInput = page.locator("//input[@id=':r0:']");
    this.selectCreatedCourse = page.locator("(//div[@class='list-item-wrapper vertical MuiBox-root css-89nl51'])[1]");
  }

  async clickSearchInput(nameCourse: string) {
    await this.searchInput.fill(nameCourse);
  }
  async clickSelectCreatedCourse() {
    await this.selectCreatedCourse.click();
  }
}
