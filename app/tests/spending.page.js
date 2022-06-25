import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SpendingPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SPENDING}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the add spending form, then checks to see that add spending was successful. */
  async addSpending() {
    await this.isDisplayed();
    await t.typeText('#spending-title', 'title');
    await t.typeText('#spending-amount', '1234');
    await t.typeText('#spending-date', '01/10/2030');
    const categorySelector = Selector('#spending-category');
    const homeOption = categorySelector.find('#home');
    await t.click(homeOption);
    await t.typeText('#spending-title', 'title');
    await t.typeText('#spending-description', 'description');
    await t.click('#spending-submit');
  }

  /** Fills out and submits the edit spending form, then checks to see that edit spending was successful. */
  async editSpending() {
    await this.isDisplayed();
    await t.click('#edit-spending');
    await t.typeText('#edit-spending-title', 'edit-title');
    await t.typeText('#edit-spending-description', 'edit-description');
    await t.typeText('#edit-spending-amount', '123');
    await t.typeText('#edit-spending-date', '01/01/2030');
    await t.click('#edit-spending-submit');
  }

  async deleteSpending() {
    await this.isDisplayed();
    await t.click('#list-spending');
    await t.click('#delete-spending');
    await t.click(Selector('.swal-button--confirm'));
    await t.click('.swal-button--confirm');
  }
}

export const spendingPage = new SpendingPage();
