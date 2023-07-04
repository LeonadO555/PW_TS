import {Page, test, TestInfo} from '@playwright/test';
import {LoginPage} from '../../pages/login/LoginPage';
import {HomePage} from '../../pages/HomePage';

interface UsersCredential {
  email: string;
  password: string;
  positive?: boolean;
}

const testMethod = async (page: Page, testInfo: TestInfo, userCredential: UsersCredential) => {
  const homepage = new HomePage(page);
  await homepage.goto();
  await homepage.clickOnSignUpHeaderButton();

  const loginPage = new LoginPage(page);
  await loginPage.fillLoginForm(userCredential.email, userCredential.password);
  await loginPage.clickOnSignInButtonInTheForm();
  if (userCredential.positive) {
    await loginPage.checkSuccessLogin();
  } else {
    await loginPage.takeScreenshotForErrorMessage(`${testInfo.title}-errorMessage.png`);
    await loginPage.checkNotSuccessLogin();
  }
};

test.describe('Student can login with valid data', async () => {
  test('login standard user', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {
      email: 'malik@example.com',
      password: '123456',
      positive: true,
    };
    await testMethod(page, testInfo, testUserCredential);
  });
});

test.describe('User shouldn t be able to login', async () => {
  test('login without email and password', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {email: '', password: ''};
    await testMethod(page, testInfo, testUserCredential);
  });
  test('login with correct email and incorrect password', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {email: 'malik@example.com', password: '23456'};
    await testMethod(page, testInfo, testUserCredential);
  });
  test('login with incorrect email and correct password', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {email: 'm alik@example.com', password: '123456'};
    await testMethod(page, testInfo, testUserCredential);
  });
});
