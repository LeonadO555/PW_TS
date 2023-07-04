import {expect, Page, test, TestInfo} from '@playwright/test';
import {loginTestHelperStudent} from '../../helpers/common';
import {StudentMainPage} from '../../pages/student/StudentMainPage';
import {ProfessorsPage} from '../../pages/student/ProfessorsPage';
import {ProfessorsProfilePage} from '../../pages/student/ProfessorsProfilePage';

interface SearchingOfProfessor {
  requestText: string;
  positive?: boolean;
}

const testMethod = async (page: Page, testInfo: TestInfo, searchingOfProfessor: SearchingOfProfessor) => {
  await loginTestHelperStudent(page, 'malik@example.com', '123456');
  const studentMainPage = new StudentMainPage(page);

  await studentMainPage.checkVisibilityOfElements();
  await studentMainPage.clickOnProfessorsTab();

  const professorsPage = new ProfessorsPage(page);
  await professorsPage.checkVisibilityOfElements();
  await professorsPage.scrollToSearchProfessorsField();

  await professorsPage.fillSearchProfessorField(searchingOfProfessor.requestText);
  if (searchingOfProfessor.positive) {
    //const containsText = await professorsPage.checkPageContainsText(searchingOfProfessor.requestText);
    expect(await professorsPage.checkPageContainsText(searchingOfProfessor.requestText)).toBe(true);
    await professorsPage.scrollToViewProfileButton();
    await professorsPage.clickOnViewProfileButton();

    const professorsProfilePage = new ProfessorsProfilePage(page);
    await professorsProfilePage.checkEmailVisibility();
    await professorsProfilePage.checkRoleVisibility();
    await professorsProfilePage.checkProfessorOfTitle();
  } else {
    await professorsPage.scrollToNoResultFoundMessage();
    await professorsPage.checkNoResultsFoundMessage();
  }
};

test.describe('Student can search professor and open professors profile', async () => {
  test('Search and open existing text', async ({page}, testInfo) => {
    const searchingOfProfessor: SearchingOfProfessor = {
      requestText: 'Roxanne',
      positive: true,
    };
    await testMethod(page, testInfo, searchingOfProfessor);
  });

  test('Search not existing text', async ({page}, testInfo) => {
    const searchingOfProfessor: SearchingOfProfessor = {
      requestText: 'ბლაბლაბლა',
      positive: false,
    };
    await testMethod(page, testInfo, searchingOfProfessor);
  });
});
