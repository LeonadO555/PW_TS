import {PageObject} from '../PageObject';
import {Page} from '@playwright/test';
// @ts-ignore
import {WaitForSelectorOptions} from 'playwright';

export class ProfessorsProfilePage extends PageObject {
  constructor(page: Page) {
    super(page, '/');
  }

  async checkContainsInfoAboutProfessor(
    professorName: string,
    teacherRole: string,
    teacherEmail: string
  ): Promise<boolean> {
    try {
      const waitForOption1: WaitForSelectorOptions = {text: professorName};
      await this.page.waitForSelector(`:text("${professorName}")`, waitForOption1);
      const waitForOption2: WaitForSelectorOptions = {text: teacherRole};
      await this.page.waitForSelector(`:text("${teacherRole}")`, waitForOption2);
      const waitForOption3: WaitForSelectorOptions = {text: teacherEmail};
      await this.page.waitForSelector(`:text("${teacherEmail}")`, waitForOption3);
      return true;
    } catch (e) {
      return false;
    }
  }
}
