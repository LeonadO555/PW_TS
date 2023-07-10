import {PageObject} from "./PageObject";
import {expect, Locator, Page} from "@playwright/test";

export class StudentDirectoryPage extends PageObject{
    protected readonly header: Locator;
    protected readonly searchBox: Locator;
    protected readonly studentList:Locator;
    protected readonly viewProfileButton:Locator;
    protected readonly studentNameInTable:Locator;

    constructor(page:Page) {
        super(page,'/');
        this.header= page.locator('//div[@class=\'sw-font-family-default sw-letter-spacing-wide sw-line-height-loose\']');
        this.searchBox= page.locator('//input[@id=\':r0:\']');
        this.studentList= page.locator('//div[@class=\'horizontal-list-item\']//h3');
        this.viewProfileButton= page.locator('//a[normalize-space()=\'View profile\']');
        this.studentNameInTable= page.locator('//div[@class="field-student-directory-0-heading3-_i7tulsj9u MuiBox-root css-blhqza"]');
    }

    async checkUserInStudentDirectory(){
        await expect(this.header).toBeVisible();
    }

    async fillSearchBoxInput(studentName: string){
        await this.searchBox.fill(studentName);
    }
    async clickOnViewProfileButton(){
        await this.viewProfileButton.click();
    }


}