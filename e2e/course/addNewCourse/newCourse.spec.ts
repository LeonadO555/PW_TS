import {test} from "@playwright/test";
import {defaultPassword, loginUserHelper, teacherEmail} from "../../../helpers/common";
import {HomePage} from "../../../pages/home/HomePage";
import {AddNewCoursePage} from "../../../pages/course/AddNewCoursePage";




test.describe('User can work with Add Course directory', async () => {
    test('user can create new course', async ({page}, testInfo) => {
            await loginUserHelper(page,teacherEmail, defaultPassword);

            const homePage = new HomePage(page);
            await homePage.clickOnAddCourseButton();

            const addNewCoursePage = new AddNewCoursePage(page);
            await addNewCoursePage.checkVisibilityOfElements();
            await addNewCoursePage.fillCourseNameAndDescription("TestName", "Test description");
            await addNewCoursePage.selectAFaculty();
            await addNewCoursePage.coverPhotoUpload('e2e/files/cat.webp');
            await addNewCoursePage.setRandomCourseDates();
            await addNewCoursePage.clickOnAddButton();
        }
    )});