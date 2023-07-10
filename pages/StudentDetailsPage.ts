import {PageObject} from "./PageObject";
import {expect, Locator, Page} from "@playwright/test";

export class StudentDetailsPage extends PageObject{
    protected readonly studentName: Locator;

    constructor(page:Page) {
        super(page,'/');
        this.studentName = page.locator('//*[@data-field-type="heading1"]');
    }

    async checkUserOnCorrectStudentDetailsPage(name:string){
        //await expect(this.studentName);
        const textFromLocator = await this.studentName.textContent();
        return textFromLocator.includes(name);
    }

    async check(name:string){
        await expect(this.studentName).toContainText(name);
    }
}