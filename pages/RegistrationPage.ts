import {PageObject} from "./PageObject";
import {Locator, Page} from "@playwright/test";

export class RegistrationPage extends PageObject{
    protected readonly singUpTable:Locator;

    constructor(page:Page) {
        super(page,'/');
        this.singUpTable = page.locator('//div[@id=\'signup\']');
    }

    async userOnRegistrationPage(){
        await this.singUpTable.isVisible();
    }
}