import { signOutPage } from './simple.page';
import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { signUpPage } from './signup.page';
import { landingPage } from './landing.page';
import { spendingPage } from './spending.page';
import { planningPage } from './planning.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('matrp localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that sign in and sign out work', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that sign up and sign out work', async () => {
  await navBar.gotoSignupPage();
  await signUpPage.signupUser(newCredentials.username, newCredentials.password);
  await signInPage.signin(newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(newCredentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that user pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that admin page shows up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoAdminDeleteUserPage();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that add spending page works', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoSpendingPage();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that list spending page shows up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoSpendingPage();
  await spendingPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that edit spending works', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoSpendingPage();
  await spendingPage.isDisplayed();
  await spendingPage.editSpending();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that delete spending works', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoSpendingPage();
  await spendingPage.isDisplayed();
  await spendingPage.deleteSpending();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that add planning page works', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoPlanningPage();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that list planning page shows up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoPlanningPage();
  await planningPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that edit planning works', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoPlanningPage();
  await planningPage.isDisplayed();
  await planningPage.editPlanning();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that delete planning works', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoPlanningPage();
  await planningPage.isDisplayed();
  await planningPage.deletePlanning();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that policy page shows up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoPolicyPage();
  await navBar.logout();
  await signOutPage.isDisplayed();
});
