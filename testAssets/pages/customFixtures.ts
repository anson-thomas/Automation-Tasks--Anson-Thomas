import {test as base, expect} from "@playwright/test"
import HomePage from "./homePage"

type Pages = {
    homePage: HomePage;
}

export const test = base.extend<Pages, {}>({
    homePage: async({page}, use)=>{
        const homePage = new HomePage(page);
        await use (homePage);
    }
})
export {expect} from "@playwright/test"