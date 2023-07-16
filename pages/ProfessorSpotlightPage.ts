import {PageObject} from "./PageObject";
import {expect, Locator, Page} from "@playwright/test";

export class ProfessorSpotlightPage extends PageObject{
    protected readonly professorSpotlightTitle: Locator;
    protected readonly professorList: Locator;
    protected readonly professorRole: Locator;
    protected readonly professorNames: Locator;


    constructor(page:Page) {
        super(page,'/');
        this.professorSpotlightTitle = page.locator('//span[normalize-space()=\'Professor spotlight\']');
        this.professorList = page.locator('//body//div[@class=\'horizontal-list-item\']//div[@class=\'css-1w7j2y6\']');
        this.professorRole = page.locator('//body//div[@class=\'horizontal-list-item\']//div[@class=\'css-1w7j2y6\']//p');
        this.professorNames = page.locator('//*//div[@class=\'css-1w7j2y6\']//h3');
    }

    async checkUserInProfessorDirectory(){
        await expect(this.professorSpotlightTitle).toBeVisible();
    }
    async userCanViewProfessorsNamesInTable(){
        await expect(this.professorNames.first()).toBeVisible();
        return await this.professorNames.allInnerTexts();
    }
    async userCanViewProfessorsRoleInTable(){
        await expect(this.professorRole.first()).toBeVisible();
        return await this.professorRole.allInnerTexts();
    }

}