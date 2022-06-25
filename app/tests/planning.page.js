import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class PlanningPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.PLANNING}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the add planning form, then checks to see that add planning was successful. */
  async addPlanning() {
    await this.isDisplayed();
    await t.typeText('#planning-title', 'title');
    await t.typeText('#planning-budget', '1234');
    await t.typeText('#planning-start', '01/10/2030');
    await t.typeText('#planning-end', '10/10/2030');
    await t.typeText('#planning-description', 'description');
    await t.click('#planning-submit');
  }

  /** Fills out and submits the edit planning form, then checks to see that edit planning was successful. */
  async editPlanning() {
    await this.isDisplayed();
    await t.click('#edit-planning');
    await t.typeText('#edit-planning-title', 'edit-title');
    await t.typeText('#edit-planning-budget', '123');
    await t.typeText('#edit-planning-description', 'edit-description');
    await t.click('#edit-planning-submit');
    await t.click(Selector('.swal-button--confirm'));
  }

  async deletePlanning() {
    await this.isDisplayed();
    await t.click('#delete-planning');
    await t.click(Selector('.swal-button--confirm'));
    await t.click('.swal-button--confirm');
  }
}

export const planningPage = new PlanningPage();
