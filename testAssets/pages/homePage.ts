import { Locator, Page, test, expect } from "@playwright/test";
import Actions from "../../helper/actions";

export default class HomePage{

    actions: Actions;
    header: Locator;
    inputValue: (inputValue: string) => Locator;
    rows: Locator;
    playGroundLink: Locator;
    menuButton: Locator;
    signUpOption: Locator;
    loginOption: Locator;
    logoutOption: Locator;

    constructor(public page: Page){

        this.actions = new Actions();

        this.header = this.page.locator(
            '//h1[@class="post-title entry-title"]'
        );

        this.inputValue = (inputValue: string) =>
            this.page.locator(
                `//label[normalize-space()='${inputValue}']/following::input[1]`
            );

        this.rows = this.page.locator(
            '//table[@id="contactList"]//tbody//tr'
        );
        this.playGroundLink = this.page.getByRole("link", {
      name: "PlayGround",
    });

    this.menuButton = this.page.locator(".flex.gap-4 > div > .flex");

    this.signUpOption = this.page.getByRole("link", {
      name: "Sign Up",
    });

    this.loginOption = this.page.getByRole("link", {
      name: "Login",
    });

    this.logoutOption = this.page.getByText("Log Out");
    }

    async launchWebPage(){
        await this.page.goto(
            "https://www.hyrtutorials.com/p/add-padding-to-containers.html"
        );
    }

    async enterFieldValues(fieldName: string, fieldValue: string){
        await this.actions.fill(
            this.inputValue(fieldName),
            fieldValue
        );
    }

    async getFieldValue(fieldName: string): Promise<string>{
        return await this.inputValue(fieldName).inputValue();
    }

    async getTableDetails(){

        const rows = this.rows;
        const details = [];

        for(let i = 1; i < await rows.count(); i++){

            const columns = rows.nth(i).locator("td");

            const contact = await columns.nth(1).innerText();
            const country = await columns.nth(2).innerText();
            const salary = await columns.nth(3).innerText();

            const detailsObject = {
                Contact: contact,
                Country: country,
                Salary: Number(salary)
            };

            details.push(detailsObject);
        }

        return details;
    }
    async validateTableDetails(){
    for(let i = 1; i < await this.rows.count(); i++){

        const row = this.rows.nth(i);

        await this.actions.expectVisible(row);
    }
}
}


