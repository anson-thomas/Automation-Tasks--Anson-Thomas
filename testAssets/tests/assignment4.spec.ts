import {expect,test} from "../pages/customFixtures"
import data from "../test-data/data.json"

test.describe("Day 4 Assignment",  ()=>{
    test("Verify a user can fill details in the fields", async({homePage})=>
    {
        await test.step("Verify user is able to launch the webpage",async()=>{
            await homePage.launchWebPage();
            await expect(homePage.header).toBeVisible();
        })
        await test.step("Verify user can enter the first name", async()=>{
            await homePage.enterFieldValues(data.fieldName.firstName,data.fieldValue.firstName);
            await expect(data.fieldValue.firstName).toBeTruthy();
        })
        await test.step("Verify user can enter the last name", async()=>{
            await homePage.enterFieldValues(data.fieldName.lastName,data.fieldValue.lastName);
            await expect(data.fieldValue.lastName).toBeTruthy();
        })
        await test.step("Verify user can enter the email", async()=>{
            await homePage.enterFieldValues(data.fieldName.email,data.fieldValue.email);
            await expect(data.fieldValue.email).toBeTruthy();
        })
        await test.step("Verify user can enter the password", async()=>{
            await homePage.enterFieldValues(data.fieldName.password,data.fieldValue.password);
            await expect(data.fieldValue.password).toBeTruthy();
        })
        await test.step("Verify user can enter the repeat password", async()=>{
            await homePage.enterFieldValues(data.fieldName.repeatPassword,data.fieldValue.repeatPassword);
            await expect(data.fieldValue.repeatPassword).toBeTruthy();
        })
        await test.step("Print all input values from UI", async () => {

    console.log("First Name:", await homePage.getFieldValue("First Name"));
    console.log("Last Name:", await homePage.getFieldValue("Last Name"));
    console.log("Email:", await homePage.getFieldValue("Email"));
    console.log("Password:", await homePage.getFieldValue("Password"));
    console.log("Repeat Password:", await homePage.getFieldValue("Repeat Password"));

});
});
    test("Verify you can print details as you need from the table",async({homePage})=>
    {
        await test.step("Verify user is able to launch the webpage",async()=>{
            await homePage.launchWebPage();
            await expect(homePage.header).toBeVisible();
        })
        await test.step("Print Contact, Country and Salary", async () => {
            await homePage.getTableDetails()
        });
        const details = await homePage.getTableDetails();
        await test.step("Print salary greater than and less than 5000", async () => {
        console.log("\n Objects with salary greater than and less than 5000 \n");    
        for (const row of details) {
            if (row.Salary > 5000 || row.Salary < 5000) {
                console.log(row);
            }
        }
    });
    }
)

});

