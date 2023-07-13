import {expect, Page, test, TestInfo} from '@playwright/test';
import {defaultPassword, loginTestHelper} from '../../helpers/common';
import {StudentMainPage} from '../../pages/student/StudentMainPage';
import {ProfessorsPage} from '../../pages/student/ProfessorsPage';
import {ProfessorsProfilePage} from '../../pages/student/ProfessorsProfilePage';

interface SearchingOfProfessor {
  requestText: string;
  professorsEmail: string;
  role: string;
  positive?: boolean;
}

const testMethod = async (page: Page, testInfo: TestInfo, searchingOfProfessor: SearchingOfProfessor) => {
  await loginTestHelper(page, 'malik@example.com', defaultPassword);
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
    expect(
      await professorsProfilePage.checkContainsInfoAboutProfessor(
        searchingOfProfessor.requestText,
        searchingOfProfessor.role,
        searchingOfProfessor.professorsEmail
      ),
      'Check that profile page contains text'
    ).toBe(true);
  } else {
    await professorsPage.checkEmptyForm();
  }
};

test.describe('Student can search professor and open professors profile', async () => {
  test('Search and open existing professor profile', async ({page}, testInfo) => {
    const searchingOfProfessor: SearchingOfProfessor = {
      requestText: 'Roxanne',
      professorsEmail: 'roxanne@example.com',
      role: 'teacher',
      positive: true,
    };
    await testMethod(page, testInfo, searchingOfProfessor);
  });

  test('Search not existing professor profile', async ({page}, testInfo) => {
    const searchingOfProfessor: SearchingOfProfessor = {
      requestText: 'ბლაბლაბლა',
      professorsEmail: null,
      role: null,
    };
    await testMethod(page, testInfo, searchingOfProfessor);
  });
});
