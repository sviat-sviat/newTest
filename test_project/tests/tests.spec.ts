import { protractor } from "protractor";
import { DataGeneration } from "../helpers/data.generation";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { ProfilePage, ProfileField } from "../pages/profilePage"

describe("Tests from test task", () => {
    let dataGeneration = new DataGeneration();
    let homePage: HomePage;
    let loginPage: LoginPage;
    let profilePage: ProfilePage;


    beforeEach(async () => {
        protractor.browser.waitForAngularEnabled(false);
        homePage = new HomePage(protractor);
        loginPage = new LoginPage(protractor);
        profilePage = new ProfilePage(protractor);

        await homePage.open();
        await homePage.headerCo.clickLoginLabel();
    });

    it("Authorization page. Not registered user", async () => {
        let invalidEmail = dataGeneration.getRandomEmail();
        let invalidPassword = dataGeneration.getRandomString(10);

        await loginPage.login(invalidEmail, invalidPassword, false);
        await loginPage.clickShowPasswordButton();
        
        expect(await loginPage.isPasswordShown())
          .toBeTruthy();
        expect(await loginPage.getNotoficationMessage())
          .toEqual("Uh oh! Email or password is incorrect");
    });

    it("Authorization page (Welcome back!)", async () => {
        await loginPage.login();

        expect(await homePage.headerCo.isLoginLabelPresent())
          .toBeFalsy();
        expect((await homePage.headerCo.getLogedInUserEmail()).toLowerCase())
          .toContain("ssls.automation+666@gmail.com");
    });

    it("My profile page. Client area",async () =>{
        let nameValue, emailValue, phoneValue, addressValue, supportPinValue, newlatterState

        await loginPage.login();
        await profilePage.open();

        nameValue = await profilePage.getFieldValue(ProfileField.Name);
        emailValue = await profilePage.getFieldValue(ProfileField.Email);
        phoneValue = await profilePage.getFieldValue(ProfileField.Phone);
        addressValue = await profilePage.getFieldValue(ProfileField.Address);
        supportPinValue = await profilePage.getFieldValue(ProfileField.SupportPin);
        newlatterState = await profilePage.getNewletterButtonState();

        await profilePage.headerCo.logOut();
        await loginPage.login();
        await homePage.headerCo.openUserDropdown();
        await homePage.headerCo.clickProfileOption();

        expect(await profilePage.getFieldValue(ProfileField.Name))
          .toEqual(nameValue);
        expect(await profilePage.getFieldValue(ProfileField.Email))
          .toEqual(emailValue);
        expect((await profilePage.getFieldValue(ProfileField.Password)).length)
          .toBeGreaterThan(0);
        expect(await profilePage.getFieldValue(ProfileField.Phone))
          .toEqual(phoneValue);
        expect(await profilePage.getFieldValue(ProfileField.Address))
          .toEqual(addressValue);
        expect(await profilePage.getFieldValue(ProfileField.SupportPin))
          .toEqual(supportPinValue);
        expect(await profilePage.getNewletterButtonState())
          .toEqual(newlatterState)
    });
});