import {expect, Page, test, TestInfo} from '@playwright/test';
import {defaultEmailStudent, defaultEmailTeacher, defaultPassword, LoginPage} from '../../pages/login/LoginPage';


interface UsersCredential {
  emailUserInput: string;
  passwordInput: string;
  positive?: boolean;
}


const testMethod = async (page: Page, testInfo: TestInfo, userCredential: UsersCredential) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto();
  await loginPage.login(userCredential.emailUserInput, userCredential.passwordInput);
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
      emailUserInput: defaultEmailTeacher,
      passwordInput: defaultPassword,
      positive: true,
    };
    await testMethod(page, testInfo, testUserCredential);
  });
  test('login student user', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {
      emailUserInput: defaultEmailStudent,
      passwordInput: defaultPassword,
      positive: true,
    };
    await testMethod(page, testInfo, testUserCredential);
  });

  test.describe('User should not be able to login', async () => {
    test('login invalid password', async ({page}, testInfo) => {
      const testUserCredential: UsersCredential = {
        emailUserInput: defaultEmailTeacher,
        passwordInput: '12password34',
      };
      await testMethod(page, testInfo, testUserCredential);
    });
  test('login invalid email', async ({page}, testInfo) => {
    const testUserCredential: UsersCredential = {
      emailUserInput: 'invalidemail@example.com',
      passwordInput: defaultPassword,
    };
    await testMethod(page, testInfo, testUserCredential);
  });
});
});
