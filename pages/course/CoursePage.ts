import {PageObject} from "../PageObject";
import {expect, Locator, Page} from "@playwright/test";
// @ts-ignore
import {WaitForSelectorOptions} from 'playwright';


export class CoursePage extends PageObject {
    protected readonly computerSinceCourse: Locator;
    protected readonly titleComputerSince: Locator;
    protected readonly nameOfDocument: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.computerSinceCourse = page.locator("//*[@href='/course-details?recordId=rec2dBNr4rcB2StDM']");
        this.titleComputerSince = page.locator("//h3[@xpath='1']");
        this.nameOfDocument = page.getByText("cat");
    }

    async courseTitleIsVisible(){
        await expect (this.titleComputerSince).toBeVisible();
    }

    async checkPageContainsText(searchText: string): Promise<boolean> {
        const waitForOptions: WaitForSelectorOptions = {text: searchText};
        await this.page.waitForSelector(`:text("${searchText}")`, waitForOptions);
        return true;
    }
}
