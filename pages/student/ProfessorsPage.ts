import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';
// @ts-ignore
import {WaitForSelectorOptions} from 'playwright';

export class ProfessorsPage extends PageObject {
  protected readonly professorSpotlightTitle: Locator;
  protected readonly searchProfessorField: Locator;
  protected readonly noResultsFoundMessage: Locator;
  protected readonly viewProfileButton: Locator;

  constructor(page: Page) {
    // @ts-ignore
    super(page, '/#teacher-spotlight-heading');
    this.professorSpotlightTitle = page.locator("//span[normalize-space()='Professor spotlight']");
    this.searchProfessorField = page.locator("//input[@id=':r0:']");
    this.noResultsFoundMessage = page.getByText('No results found, try adjusting your search and filters.');
    this.viewProfileButton = page.getByText('View profile');
  }

  async checkVisibilityOfElements() {
    await expect(this.professorSpotlightTitle).toBeVisible();
    await expect(this.searchProfessorField).toBeVisible();
  }

  async fillSearchProfessorField(whatYouSearch: string) {
    await this.searchProfessorField.fill(whatYouSearch);
  }

  async checkPageContainsText(searchText: string): Promise<boolean> {
    const waitForOptions: WaitForSelectorOptions = {text: searchText};
    await this.page.waitForSelector(`:text("${searchText}")`, waitForOptions);
    return true;
  }

  async checkEmptyForm() {
    await expect(await this.viewProfileButton).toBeHidden();
  }

  async scrollToSearchProfessorsField() {
    await this.searchProfessorField.scrollIntoViewIfNeeded();
  }

  async scrollToNoResultFoundMessage() {
    await this.noResultsFoundMessage.scrollIntoViewIfNeeded();
  }

  async scrollToViewProfileButton() {
    await this.viewProfileButton.scrollIntoViewIfNeeded();
  }

  async clickOnViewProfileButton() {
    await this.viewProfileButton.click({timeout: 10000});
  }
}
