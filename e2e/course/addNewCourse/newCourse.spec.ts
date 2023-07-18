import {expect, test} from '@playwright/test';
import {defaultPassword, loginUserHelper, studentEmail, teacherEmail} from '../../../helpers/common';
import {HomePage} from '../../../pages/home/HomePage';
import {AddNewCoursePage} from '../../../pages/course/AddNewCoursePage';
import {faker} from '@faker-js/faker';
import {CoursesPage} from '../../../pages/course/CoursesPage';
import {LoginPage} from '../../../pages/login/LoginPage';
import {CoursePage} from '../../../pages/course/CoursePage';

test.describe('User can work with Add Course directory', async () => {
  test('user can create new course', async ({page}, testInfo) => {
    await loginUserHelper(page, teacherEmail, defaultPassword);
    const randomCourseName = faker.commerce.productName();
    const randomCourseDescription = faker.lorem.sentence(7);

    const homePage = new HomePage(page);
    await homePage.clickOnAddCourseButton();

    const addNewCoursePage = new AddNewCoursePage(page);
    await addNewCoursePage.checkVisibilityOfElements();
    await addNewCoursePage.fillCourseNameAndDescription(randomCourseName, randomCourseDescription);
    await addNewCoursePage.selectAFaculty();
    await addNewCoursePage.coverPhotoUpload('e2e/files/cat.webp');
    await addNewCoursePage.chooseStartData();
    await addNewCoursePage.chooseEndData();
    await addNewCoursePage.clickOnAddButton();
    await addNewCoursePage.checkSuccessMsgPresent();
    await addNewCoursePage.logoutUser();

    const loginPage = new LoginPage(page);
    await loginPage.checkElementIsVisible();

    await loginUserHelper(page, studentEmail, defaultPassword);
    await homePage.clickOnCourseButton();
    await homePage.clickOnCourseListButton();
    const coursesPage = new CoursesPage(page);
    await coursesPage.fillCourseInput(randomCourseName);
    await coursesPage.clickOnCourseName(randomCourseName);

    const coursePage = new CoursePage(page);
    const courseName = await coursePage.getTextFromLocator(coursePage.courseName);
    console.log('Course Name:', courseName);
    const expectedCourseName = randomCourseName;
    expect(courseName).toEqual(expectedCourseName);
  });
});
