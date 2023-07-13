import {PageObject} from "../PageObject";
import {Locator, Page} from "@playwright/test";

export class CoursesPage extends PageObject {
    protected readonly computerSinceCourse: Locator;
    protected readonly searchCourseInput: Locator;


    constructor(page: Page) {
        super(page, '/course-details?recordId=rec2dBNr4rcB2StDM');

        this.computerSinceCourse = page.locator("//div[@class='list-action-wrapper']//a[@href='/course-details?recordId=rec2dBNr4rcB2StDM']");
        this.searchCourseInput = page.locator("//*[@placeholder='Search by course name or professor']");
    }

    async fillCourseInput(text: string){
        await this.searchCourseInput.fill(text);
    }

    async clickOnCourse(){
        await this.computerSinceCourse.click({timeout:10000});
    }


}
