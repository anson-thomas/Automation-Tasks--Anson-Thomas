import { expect,test } from "../pages/customFixtures"
import data from "../test-data/data.json"
import { testStep } from "../../helper/utility";

test.describe("Day 4 Assignment",  ()=>{

    test("Verify a user can fill details in the fields", async({ page, homePage })=>
    {
        await testStep("Verify user is able to launch the webpage", page, async()=>{
            await homePage.launchWebPage();
            await homePage.actions.expectVisible(homePage.header);
        })

        await testStep("Verify user can enter the first name", page, async()=>{
            await homePage.enterFieldValues(data.fieldName.firstName,data.fieldValue.firstName);
            await expect(await homePage.getFieldValue(data.fieldName.firstName)).toBe(data.fieldValue.firstName);
        })

        await testStep("Verify user can enter the last name", page, async()=>{
            await homePage.enterFieldValues(data.fieldName.lastName,data.fieldValue.lastName);
            await expect(await homePage.getFieldValue(data.fieldName.lastName)).toBe(data.fieldValue.lastName);
        })

        await testStep("Verify user can enter the email", page, async()=>{
            await homePage.enterFieldValues(data.fieldName.email,data.fieldValue.email);
            await expect(await homePage.getFieldValue(data.fieldName.email)).toBe(data.fieldValue.email);
        })

        await testStep("Verify user can enter the password", page, async()=>{
            await homePage.enterFieldValues(data.fieldName.password,data.fieldValue.password);
            await expect(await homePage.getFieldValue(data.fieldName.password)).toBe(data.fieldValue.password);
        })

        await testStep("Verify user can enter the repeat password", page, async()=>{
            await homePage.enterFieldValues(data.fieldName.repeatPassword,data.fieldValue.repeatPassword);
            await expect(await homePage.getFieldValue(data.fieldName.repeatPassword)).toBe(data.fieldValue.repeatPassword);
        })

        await testStep("Print all input values from UI", page, async () => {
            console.log("First Name:", await homePage.getFieldValue("First Name"));
            console.log("Last Name:", await homePage.getFieldValue("Last Name"));
            console.log("Email:", await homePage.getFieldValue("Email"));
            console.log("Password:", await homePage.getFieldValue("Password"));
            console.log("Repeat Password:", await homePage.getFieldValue("Repeat Password"));
        });
    });

    test("Verify you can print details as you need from the table",async({ page, homePage })=>
    {
        await testStep("Verify user is able to launch the webpage", page, async()=>{
            await homePage.launchWebPage();
            await homePage.actions.expectVisible(homePage.header);
        })

        const details = await homePage.getTableDetails();

        await testStep("Print Contact, Country and Salary", page, async () => {
            await homePage.validateTableDetails();

            for (const row of details) {
                console.log(
                    `Contact : ${row.Contact}; Country: ${row.Country}; Salary: ${row.Salary}`
                );
            }
        }, homePage.rows.nth(1));

        await testStep("Print salary greater than and less than 5000", page, async () => {
            console.log("\n Objects with salary greater than and less than 5000 \n");

            for (const row of details) {
                if (row.Salary > 5000 || row.Salary < 5000) {
                    console.log(row);
                }
            }
        });
    });
});