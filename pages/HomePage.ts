import {PageObject} from "./PageObject";
import {expect, Locator, Page} from "@playwright/test";

export class HomePage extends PageObject {
    protected readonly professorsButton: Locator;
    protected readonly coursesButton: Locator;
    protected readonly signInHeaderButton: Locator;
    protected readonly addCourseButton: Locator;
    protected readonly coursesDropDownMenu: Locator;
    protected readonly courseListButton: Locator;
    protected readonly studentDirectoryButton: Locator;
    protected readonly avatarButton: Locator;
    protected readonly singOutButton: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.professorsButton = page.locator('//span[normalize-space()=\'Professors\']');
        this.coursesButton = page.locator('//span[normalize-space()=\'Courses\']');
        this.signInHeaderButton = page.locator('//a[contains(text(),\'Sign in\')]');
        this.addCourseButton = page.locator('//span[normalize-space()=\'Add course\']');
        this.coursesDropDownMenu = page.locator('//span[normalize-space()=\'Add course\']');
        this.courseListButton = page.locator('//div[@class=\'MuiBox-root css-0\']//a[@role=\'menuitem\']');
        this.studentDirectoryButton = page.locator('//span[normalize-space()=\'Student Directory\']');
        this.avatarButton = page.locator('//span[normalize-space()=\'Student Directory\']');
        this.singOutButton = page.locator('//span[normalize-space()=\'Sign Out\']');
    }
    async checkSuccessLoginUserOnHomePage(){
        await expect(this.avatarButton).toBeVisible();

    }
    async clickOnSignInHeaderButton(){
        await this.signInHeaderButton.click({timeout: 10000});
    }
}