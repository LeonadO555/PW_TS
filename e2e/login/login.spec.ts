import {expect, Page, test, TestInfo} from '@playwright/test';
import {defaultEmailStudent, defaultEmailTeacher, defaultPassword, LoginPage} from '../../pages/login/LoginPage';


interface UsersCredential {
  emailUserField: string;
  passwordField: string;
  positive?: boolean;
}

const testMethod = async (page: Page, testInfo: TestInfo, userCredential: UsersCredential) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto();
  await loginPage.signIn(userCredential.emailUserField, userCredential.passwordField);
  await loginPage.clickOnLoginButton();
  if (userCredential.positive){
    await loginPage.checkSuccessLogin();
  }else{
    await loginPage.takeScreenshotForErrorMessage(`${testInfo.title}-errorMessage.png`);
    await loginPage.checkNotSuccessLogin();
  }
};
test.describe('User should be able to login', async () => {
  test('login teacher user', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {
      emailUserField: defaultEmailTeacher,
      passwordField: defaultPassword,
      positive: true,
    };
    await testMethod(page, testInfo, testUserCredential);
  });
  test('login student user', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {
      emailUserField: defaultEmailStudent,
      passwordField: defaultPassword,
      positive: true,
    };
    await testMethod(page, testInfo, testUserCredential);
  });

  test.describe('User should mot be able to login', async () => {
    test('login invalid password', async ({page}, testInfo) => {
      const testUserCredential: UsersCredential = {
        emailUserField: defaultEmailTeacher,
        passwordField: '12password34',
        positive: false,
      };
      await testMethod(page, testInfo, testUserCredential);
    });
  test('login invalid email', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {
      emailUserField: 'invalidemail@example.com',
      passwordField: defaultPassword,
      positive: false,
    };
    await testMethod(page, testInfo, testUserCredential);
  });
});
});
