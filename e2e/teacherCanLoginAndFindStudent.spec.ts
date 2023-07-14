import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {defaultPassword, loginTestHelper} from "../helpers/common";
import {StudentDirectoryPage} from "../pages/StudentDirectoryPage";
import {StudentDetailsPage} from "../pages/StudentDetailsPage";

const  userEmail = 'roxanne@example.com';
const studentEmail = 'malik@example.com';
const studentName = 'Malik';
test.describe('User can find student in student directory', async () => {
    test('Teacher can find student', async ({page}) => {
        await loginTestHelper(page, userEmail, defaultPassword);
        const homePage = new HomePage(page);
        await homePage.clickOnStudentDirectoryButton();
        const studentDirectoryPage = new StudentDirectoryPage(page);
        await studentDirectoryPage.checkUserInStudentDirectory();
        await studentDirectoryPage.findStudentByEmailAndCheckThatNameIsDisplayInTable(studentEmail);
        await studentDirectoryPage.clickOnViewProfileButton(studentName);
        const studentDetailsPage = new StudentDetailsPage(page);
        await studentDetailsPage.checkUserOnCorrectStudentDetailsPage(studentName);

    });
});