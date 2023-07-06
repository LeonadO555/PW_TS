import {test} from '@playwright/test';
import {loginTestHelper} from '../../helpers/common';
import {StudentMainPage} from '../../pages/student/StudentMainPage';
import {HomePage} from '../../pages/HomePage';

test.describe('User can sign out', async () => {
  test('Student can sign out', async ({page}) => {
    await loginTestHelper(page, 'malik@example.com', '123456');
    const studentMainPage = new StudentMainPage(page);
    await studentMainPage.checkVisibilityOfElements();
    await studentMainPage.signOut();

    const homepage = new HomePage(page);
    await homepage.clickOnLogoButton();
    await homepage.checkElementsVisibility();
  });
});
