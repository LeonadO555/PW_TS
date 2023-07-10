import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {ProfessorSpotlightPage} from "../pages/ProfessorSpotlightPage";
import {RegistrationPage} from "../pages/RegistrationPage";


test.describe('User can use Home page', async () => {
    test('User can view professors and their role', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.clickOnProfessorsButton();
        const professorSpotlightPage = new ProfessorSpotlightPage(page);
        await professorSpotlightPage.checkUserInProfessorDirectory();
        await professorSpotlightPage.userCanViewProfessorsNamesInTable();
        await professorSpotlightPage.userCanViewProfessorsRoleInTable();
    });
    test('User can view courses', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.clickOnCoursesButton();
        await homePage.userCanViewCourses();
        await homePage.clickOnGoToButton();
        const registrationPage = new RegistrationPage(page);
        await registrationPage.userOnRegistrationPage();
    });
});