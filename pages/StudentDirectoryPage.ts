import {PageObject} from "./PageObject";
import {expect, Locator, Page} from "@playwright/test";

export class StudentDirectoryPage extends PageObject{
    protected readonly header: Locator;
    protected readonly searchBox: Locator;
    protected readonly studentTable:Locator;
    protected readonly viewProfileButton:Locator;
    protected readonly studentNameInTable:Locator;

    constructor(page:Page) {
        super(page,'/');
        this.header= page.locator('//div[@class=\'sw-font-family-default sw-letter-spacing-wide sw-line-height-loose\']');
        this.searchBox= page.locator('//input[@id=\':r0:\']');
        this.studentTable= page.locator('//*[@class="content-section"]');
        this.viewProfileButton= page.locator('//a[normalize-space()=\'View profile\']');
        this.studentNameInTable= page.locator('//div[@class="field-student-directory-0-heading3-_i7tulsj9u MuiBox-root css-blhqza"]');
    }

    async checkUserInStudentDirectory(){
        await expect(this.header).toBeVisible();
    }

    async findStudentByEmailAndCheckThatNameIsDisplayInTable(studentName: string){
        await this.searchBox.fill(studentName);
        const textContent = await this.studentTable?.textContent();
        if (textContent?.includes(studentName)) {
            console.log(`Студент с именем ${studentName} найден в таблице.`);
            return true;
        } else {
            console.log(`Студент с именем ${studentName} не найден в таблице.`);
            return false;
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return false;

    }

    async clickOnViewProfileButton(studentName: string){
        await expect(this.page.locator(`(//h3[contains(text(),'${studentName}')])[2]`)).toBeVisible();
        await this.viewProfileButton.click();
    }

}