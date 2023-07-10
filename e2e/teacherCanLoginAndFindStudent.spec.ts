import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {defaultPassword, loginTestHelper} from "../helpers/common";
import {StudentDirectoryPage} from "../pages/StudentDirectoryPage";
import {StudentDetailsPage} from "../pages/StudentDetailsPage";

const  userEmail = 'roxanne@example.com';
const studentName = 'malik@example.com';
const studentName1 = 'Malik';
test.describe('User can find student in student directory', async () => {
    test('Teacher can find student', async ({page}) => {
        await loginTestHelper(page, userEmail, defaultPassword);
        const homePage = new HomePage(page);
        await homePage.clickOnStudentDerictoryButton();
        const studentDirectoryPage = new StudentDirectoryPage(page);
        await studentDirectoryPage.checkUserInStudentDirectory();
        await studentDirectoryPage.fillSearchBoxInput(studentName);
        await studentDirectoryPage.clickOnViewProfileButton();
        const studentDetailsPage = new StudentDetailsPage(page);
        await studentDetailsPage.check(studentName1);
    });
});