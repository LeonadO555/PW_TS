import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';
// @ts-ignore
import {WaitForSelectorOptions} from 'playwright';

export class ProfessorsProfilePage extends PageObject {
  protected readonly professorsEmail: Locator;
  protected readonly professorsRole: Locator;
  protected readonly professorOfTitle: Locator;

  constructor(page: Page) {
    // @ts-ignore
    super(page, '/');
    this.professorsEmail = page.getByText('@');
    this.professorsRole = page.getByText('teacher');
    this.professorOfTitle = page.getByText('Professor of');
  }

  async checkEmailVisibility() {
    await expect(this.professorsEmail).toBeVisible();
  }

  async checkRoleVisibility() {
    await this.scrollToRole();
    await expect(this.professorsEmail).toBeVisible();
  }

  async checkProfessorOfTitle() {
    await this.scrollToProfessorOfTitle();
    await expect(this.professorsEmail).toBeVisible();
  }

  async scrollToRole() {
    await this.professorsRole.scrollIntoViewIfNeeded();
  }

  async scrollToProfessorOfTitle() {
    await this.professorOfTitle.scrollIntoViewIfNeeded();
  }
}
