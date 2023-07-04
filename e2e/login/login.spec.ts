import {expect, Page, test, TestInfo} from "@playwright/test";
import {LoginPage} from "../../pages/login/LoginPage";
import {defaultPassword, getMaxDiffPixels} from "../../helpers/common";


interface StudentsCredential{
    email: string,
    password: string,
    positive?: boolean;
}

const testMethod = async (page: Page, testInfo: TestInfo, userCredential: StudentsCredential) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillLoginForm(userCredential.email, userCredential.password);
    await expect(page).toHaveScreenshot(`${testInfo.title}-landing.png`, {maxDiffPixels: getMaxDiffPixels(1920, 1080)});
    await loginPage.clickOnSignInButton();
    if (userCredential.positive) {
        await loginPage.checkSuccessLogin();
    } else {
        await loginPage.takeScreenshotForErrorMessage(`${testInfo.title}-errorMessage.png`);
        await loginPage.checkNotSuccessLogin();
    }
};

test.describe('User can work with login', async () => {
    test('login standard user', async ({page}, testInfo) => {
        const testStudentCredential: StudentsCredential = {
            email: 'malik@example.com',
            password: defaultPassword,
            positive: true,
        };
        await testMethod(page, testInfo, testStudentCredential);
    });


        test('login user with invalid email', async ({page}, testInfo) => {
            const testStudentCredential: StudentsCredential = {email: 'malic@example.comr', password: defaultPassword};
            await testMethod(page, testInfo, testStudentCredential);
        });

        test('login user with invalid password', async ({page}, testInfo) => {
            const testStudentCredential: StudentsCredential = {email: 'malik@example.com', password: '123567'};
            await testMethod(page, testInfo, testStudentCredential);
        });
        test('user can not login with empty fields', async ({page}, testInfo) => {
            const testStudentCredential: StudentsCredential = {email: ' ', password: ' '};
            await testMethod(page, testInfo, testStudentCredential);
        });
    });
