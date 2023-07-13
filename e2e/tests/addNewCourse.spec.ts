import { expect, Page, test, TestInfo } from '@playwright/test';
import { AddNewCoursePage } from "../../pages/addCourse/AddNewCoursePage";
import { NavigationBar } from "../../pages/navigationBar/NavigationBar";
import {LoginPage} from '../../pages/login/LoginPage';
import {Faculty, loginTestHelper} from "../../helpers/common";

interface AddCourse {
    courseNameInput: string;
    courseDescriptionInput: string;
    courseStartDateInput: string;
    courseEndDateInput: string;
}


test.describe('User can work with all products', async () => {
    test('User can open all products', async ({ page}, testInfo) => {

        await loginTestHelper(page,'roxanne@example.com', '123456')
        const navigationBar = new NavigationBar(page);
        const addNewCoursePage = new AddNewCoursePage(page);

        await navigationBar.clickAddCourse();

        await addNewCoursePage.clickFaculty();
        await addNewCoursePage.choseFaculty(Faculty.LAW);

        await addNewCoursePage.addCourseInput('122','1221');
        await addNewCoursePage.clickOnCalendarStartData();
        await addNewCoursePage.chooseStartData('2')
        await addNewCoursePage.clickOnCalendarEndData()
        await addNewCoursePage.chooseEndData('7')
        await addNewCoursePage.clickAddButton();

        //dataPiker
        // randomizer start 1-10, end 11-28
    });
});
