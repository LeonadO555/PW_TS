import {expect, Page, test, TestInfo} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {defaultPassword} from "../helpers/common";
import {HomePage} from "../pages/HomePage";

interface UsersCredential {
    email: string;
    password: string;
    positive?: boolean;
}

const testMethod = async (page: Page, testInfo: TestInfo, userCredential: UsersCredential) => {
    const homepage = new HomePage(page);
    await homepage.goto();
    await  homepage.clickOnSignInHeaderButton();
    const loginPage = new LoginPage(page);
    await loginPage.fillLoginForm(userCredential.email, userCredential.password);
    await loginPage.clickOnSubmitButton();
    if (userCredential.positive) {
        await loginPage.checkSuccessLogin();
    } else {
        await loginPage.takeScreenshotForErrorMessage(`${testInfo.title}-errorMessage.png`);
        await loginPage.checkNotSuccessLogin();
    }


};
test.describe('User can work with login', async () => {
    test('User can login role teacher', async ({page}, testInfo) => {
        const testUserCredential: UsersCredential = {
            email: 'vse23688@omeie.com',
            password: defaultPassword,
            positive: true,
        };
        await testMethod(page, testInfo, testUserCredential);
    });


    test('User can login role student', async ({page}, testInfo) => {
        const testUserCredential: UsersCredential = {
            email: 'tafida6678@eimatro.com',
            password: defaultPassword,
            positive: true,
        };
    });

    test('login user with empty email and password inputs', async ({page}, testInfo) => {
        const testStudentCredential: UsersCredential = {
            email: ' ',
            password: ' ',

        };
        await testMethod(page, testInfo, testStudentCredential);
    });

    test('login user with invalid password', async ({page}, testInfo) => {
        const testStudentCredential: UsersCredential = {
            email: 'tafida6678@eimatro.com',
            password: '1737663',

        };
        await testMethod(page, testInfo, testStudentCredential);
    });

        test('login user with invalid email', async ({page}, testInfo) => {
            const testStudentCredential: UsersCredential = {
                email: 'malic@exple.comr',
                password: defaultPassword,

            };
            await testMethod(page, testInfo, testStudentCredential);
        });

    });
