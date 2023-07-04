import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';

export class StudentMainPage extends PageObject {
  protected readonly meetYourPeersButton: Locator;
  protected readonly professorsTab: Locator;
  //protected readonly searchField: Locator;
  //protected readonly noResultsFoundMessage: Locator;

  constructor(page: Page) {
    // @ts-ignore
    super(page, '/');
    this.meetYourPeersButton = page.locator("//a[normalize-space()='Meet Your Peers']");
    this.professorsTab = page.locator("//span[normalize-space()='Professors']");
    //this.searchField = page.locator("//span[normalize-space()='Student Directory']");
    //this.noResultsFoundMessage = page.getByText('No results found, try adjusting your search and filters.');
  }

  async checkVisibilityOfElements() {
    await expect(this.meetYourPeersButton).toBeVisible();
    await expect(this.professorsTab).toBeVisible();
    //await expect(this.searchField).toBeVisible();
    //await expect(this.noResultsFoundMessage).toBeVisible();
  }

  async clickOnMeetYourPeersButton() {
    await this.meetYourPeersButton.click({timeout: 10000});
  }

  async clickOnProfessorsTab() {
    await this.professorsTab.click({timeout: 10000});
  }

  // async fillSearchField(whatYouSearch: string) {
  //   await this.searchField.fill(whatYouSearch);
  // }
  //
  // async checkNoResultsFoundMessage() {
  //   await expect(this.noResultsFoundMessage).toBeVisible();
  // }
  //
  // async checkPageContainsText(searchText: string) {
  //   const textContent = await this.page.textContent('body');
  //   await expect(textContent.includes(searchText));
  // }
}
