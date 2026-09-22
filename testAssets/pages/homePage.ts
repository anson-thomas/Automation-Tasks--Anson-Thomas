import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class HomePage{

    actions: Actions;
    header: Locator;
    inputValue: (inputValue: string) => Locator;
    rows: Locator;

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