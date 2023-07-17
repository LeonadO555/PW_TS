import {expect, test} from '@playwright/test';
import {AddNewCoursePage, DateInput} from '../../pages/addCourse/AddNewCoursePage';
import {NavigationBar} from '../../pages/navigationBar/NavigationBar';
import {Faculty, loginHelp, loginTestHelper} from '../../helpers/common';
import {OurCoursesPage} from '../../pages/courses/OurCoursesPage';
import {CoursePage} from '../../pages/courses/CoursePage';
import {faker} from '@faker-js/faker';

interface AddCourse {
  courseNameInput: string;
  courseDescriptionInput: string;
  courseStartDateInput: string;
  courseEndDateInput: string;
}

function getRandomNumberAsString(min: number, max: number): string {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}
// function getRandomText(length: number): string {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let randomText = '';
//
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     randomText += characters.charAt(randomIndex);
//   }
//
//   return randomText;
// }
test.describe('Teacher create Course', async () => {
  test('Create with valid data and check course', async ({page}, testInfo) => {
    await loginTestHelper(page, 'roxanne@example.com', '123456');
    const navigationBar = new NavigationBar(page);
    const addNewCoursePage = new AddNewCoursePage(page);

    await navigationBar.clickAddCourse();

    await addNewCoursePage.clickFaculty();
    await addNewCoursePage.choseFaculty(Faculty.LAW);
    // const randomText = getRandomText(5);
    const randomTextLorem = faker.lorem.words(10);
    const randomCourseName = faker.commerce.productName();

    const imagePath = 'Photo/cry.jpeg';

    await addNewCoursePage.addCoverImage(imagePath);
    const randomEmail = faker.internet.email();
    await addNewCoursePage.addCourseInput(randomCourseName, randomTextLorem);
    await addNewCoursePage.setDataInCalendar(DateInput.StartDate, getRandomNumberAsString(1, 9));
    await addNewCoursePage.setDataInCalendar(DateInput.EndDate, getRandomNumberAsString(11, 28));
    await addNewCoursePage.clickAddButton();
    await addNewCoursePage.checkSuccessCreatedCourse();

    await navigationBar.clickUserProfileButton();
    await navigationBar.clickSignUpUserProfileButton();

    await loginHelp(page, 'malik@example.com', '123456');
    await navigationBar.clickCoursesNavBarButton();
    await navigationBar.clickCourseListButton();
    const ourCoursesPage = new OurCoursesPage(page);
    await ourCoursesPage.clickSearchInput(randomCourseName);
    await ourCoursesPage.clickSelectCreatedCourse();

    const coursePage = new CoursePage(page);
    const courseName = await coursePage.getTextFromLocator(coursePage.courseName);
    console.log('Course Name:', courseName);

    const expectedCourseName = randomCourseName;
    expect(courseName).toEqual(expectedCourseName);
  });
  test('Create course without nameCourse', async ({page}, testInfo) => {
    await loginTestHelper(page, 'roxanne@example.com', '123456');
    const navigationBar = new NavigationBar(page);
    const addNewCoursePage = new AddNewCoursePage(page);

    await navigationBar.clickAddCourse();

    await addNewCoursePage.clickFaculty();
    await addNewCoursePage.choseFaculty(Faculty.LAW);
    const randomTextLorem = faker.lorem.words(10);

    const imagePath = 'Photo/cry.jpeg';

    await addNewCoursePage.addCoverImage(imagePath);
    const randomEmail = faker.internet.email();
    await addNewCoursePage.addCourseInput('', randomTextLorem);
    await addNewCoursePage.setDataInCalendar(DateInput.StartDate, getRandomNumberAsString(1, 9));
    await addNewCoursePage.setDataInCalendar(DateInput.EndDate, getRandomNumberAsString(11, 28));
    await addNewCoursePage.clickAddButton();
    await addNewCoursePage.checkCourseNameIsRequiredErrorText();
  });
});
