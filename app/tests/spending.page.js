import { Selector, t } from 'testcafe';

class SpendingPage {
  constructor() {
    this.pageId = '#spending-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the add spending form, then checks to see that add spending was successful. */
  async addSpending() {
    const categorySelector = Selector('#spending-category');
    const homeOption = categorySelector.find('#home');
    await this.isDisplayed();
    await t.click('#add-spending');
    await t.typeText('#spending-title', 'title');
    await t.typeNum('#spending-amount', '1234');
    await t.typeText('#spending-date', '01/10/2030');
    await t.click(homeOption);
    await t.typeText('#spending-title', 'title');
    await t.typeText('#spending-description', 'description');
    await t.click('#spending-submit');
    // await navBar.isLoggedIn(username);
  }

  /** Fills out and submits the edit spending form, then checks to see that edit spending was successful. */
  async editSpending() {
    const categorySelector = Selector('#edit-spending-category');
    const foodOption = categorySelector.find('#food');
    await this.isDisplayed();
    await t.click('#list-spending');
    await t.click('#edit-spending');
    await t.typeText('#edit-spending-title', 'edit-title');
    await t.typeNum('#edit-spending-amount', '123');
    await t.typeText('#edit-spending-date', '01/01/2030');
    await t.click(foodOption);
    await t.typeText('#edit-spending-title', 'edit-title');
    await t.typeText('#edit-spending-description', 'edit-description');
    await t.click('#edit-spending-submit');
    // await navBar.isLoggedIn(username);
  }

  async deleteSpending() {
    await this.isDisplayed();
    await t.click('#list-spending');
    await t.click('#delete-spending');
    await t.click(Selector('.swal-button--confirm'));
    // await navBar.isLoggedIn(username);
  }
}

export const spendingPage = new SpendingPage();
