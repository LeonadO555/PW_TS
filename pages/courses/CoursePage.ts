import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';

export class CoursePage extends PageObject {
  public readonly courseName: Locator;
  protected readonly professorsName: Locator;
  protected readonly facultyDropdown: Locator;

  constructor(page: Page) {
    super(page, '/course-list');
    this.courseName = page.locator("(//div[@class='MuiBox-root css-0'])[1]");
    this.professorsName = page.locator('//div[@class="list-action-wrapper"]');
  }

  async getTextFromLocator(locator: Locator): Promise<string | null> {
    try {
      const element = await locator.first();
      if (element) {
        const text = await element.textContent();
        return text ?? null;
      }
    } catch (error) {
      console.error('Error while getting text from locator:', error);
    }

    return null;
  }
}
