import {PageObject} from "./PageObject";
import {Locator, Page} from "@playwright/test";

export class StudentDetailsPage extends PageObject{
    protected readonly studentName: Locator;

    constructor(page:Page) {
        super(page,'/');
        this.studentName = page.locator('//*[@data-field-type="heading1"]');
    }

    async checkUserOnCorrectStudentDetailsPage(name:string){
        const textFromLocator = await this.studentName.textContent();
        return textFromLocator.includes(name);
    }

}