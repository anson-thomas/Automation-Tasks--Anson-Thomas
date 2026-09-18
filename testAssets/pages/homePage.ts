import { Locator,Page } from "@playwright/test";
export default class HomePage{
    header : Locator;
    inputValue : (inputValue : string ) => Locator;
    rows : Locator;
constructor(public page: Page){
    this.page = page;
    this.header = this.page.locator('//h1[@class="post-title entry-title"]');
    this.inputValue = (inputValue : string ) => this.page.locator(`//label[normalize-space()='${inputValue}']/following::input[1]`);
    this.rows = this.page.locator('//table[@id="contactList"]//tbody//tr');
}
async launchWebPage(){
    await this.page.goto("https://www.hyrtutorials.com/p/add-padding-to-containers.html");
}
async enterFieldValues( fieldName:string , fieldValue:string){
    await this.inputValue(fieldName).click()
    await this.inputValue(fieldName).fill(fieldValue)
}
async getFieldValue(fieldName: string): Promise<string> {
    return await this.inputValue(fieldName).inputValue();
}
async getTableDetails() {
    const rows = this.rows;
    const details = [];
    for (let i = 1; i < await rows.count(); i++) {
        const columns = rows.nth(i).locator("td");
        const contact = await columns.nth(1).innerText();
        const country = await columns.nth(2).innerText();
        const salary = await columns.nth(3).innerText();
        const detailsObject = {
            Contact: contact,
            Country: country,
            Salary: Number(salary)
        };
        console.log(`Contact : ${contact}; Country: ${country}; Salary: ${salary}`);
        details.push(detailsObject);
    }
    return details;
}

}


