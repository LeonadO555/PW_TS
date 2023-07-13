import {expect, Page, test, TestInfo} from "@playwright/test";
import {defaultPassword, loginUserHelper, studentEmail} from "../../../helpers/common";
import {HomePage} from "../../../pages/home/HomePage";
import {CoursePage} from "../../../pages/course/CoursePage";
import {CoursesPage} from "../../../pages/course/CoursesPage";


test.describe('User can work with list of courses', async () => {
    test('user can choose and work with course', async ({page}, testInfo) => {
            await loginUserHelper(page,studentEmail, defaultPassword);

            const homePage = new HomePage(page);
            await homePage.clickOnCourseButton();
            await homePage.clickOnCourseListButton();
            const coursesPage = new CoursesPage(page);
            await coursesPage.fillCourseInput('Computer Science');
            await coursesPage.clickOnCourse();
            const coursePage = new CoursePage(page);
            await coursePage.checkPageContainsText('Computer Science');
            
    }
    )});




