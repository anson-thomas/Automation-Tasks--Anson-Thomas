---
name: spec-generation
description: Generate Playwright TypeScript specs using this repository's structure, reporting, assertion, naming, reuse, and failure-localization standards. Use for new tests and whenever test-flow structure is being designed.
---

# Playwright Spec Generation

## Purpose

Create a readable business-flow spec that follows the repository's established Playwright architecture. The generated test must be useful both as executable automation and as failure documentation in the Playwright report.

## Test Structure

Use the repository's custom fixture import when Page Object fixtures are required:

```ts
import { test, expect } from "../pages/customFixtures";
```

Use only the fixtures required by the test:

```ts
test("Add the highest-priced new arrival product to the cart", async ({ page, homePage, cartPage }) => {
    // steps
});
```

Use `.spec.ts` under the configured test directory unless the repository establishes another location. Group related tests with `test.describe()` when consistent with nearby tests.

Do not introduce WDIO syntax, browser globals, orchestrators, `procedure` structures, or other foreign framework conventions.

## Business Steps and Failure Localization

### Core rule

Every meaningful business operation that affects the test outcome must be represented by a named `testStep()` when the repository uses `testStep()` for reporting.

Prefix each `testStep()` name with a sequential step number using the repository format `Step N : <description>`. Number steps in execution order within each test, starting at 1; reset the numbering for the next test. If a loop creates multiple reported steps, keep their numbers sequential as well.

This includes meaningful non-UI operations such as:

- retrieving scenario data,
- filtering data,
- sorting data,
- selecting a runtime value,
- calculating a business value,
- transforming data,
- preparing a meaningful business selection,
- performing a UI action,
- validating the resulting business state.

Do not execute scenario-critical logic between two reported steps simply because it is not a browser interaction.

### Do not interpret this as one line = one step

A `testStep()` represents a meaningful business operation. Technical implementation details can remain inside that step.

For example, these belong together:

```ts
await testStep("Step 1 : Identify the highest-priced new arrival product", page, async () => {
    const products = await homePage.getNewArrivalProducts();
    await expect(products.length).toBeGreaterThan(0);
    highestPricedProduct = getHighestPricedProduct(products);
});
```

The product retrieval and selection are implementation details supporting one business operation.

## Helpers Must Preserve Step Reporting

Extracting logic into a helper does not remove the need for a reportable step.

Correct:

```ts
await testStep("Step 1 : Identify the highest-priced new arrival product", page, async () => {
    const products = await homePage.getNewArrivalProducts();
    await expect(products.length).toBeGreaterThan(0);
    highestPricedProduct = getHighestPricedProduct(products);
});
```

Incorrect:

```ts
const products = await homePage.getNewArrivalProducts();
const highestPricedProduct = getHighestPricedProduct(products);

await testStep("Step 2 : Add the highest-priced product to the cart", page, async () => {
    // ...
});
```

The second structure hides a meaningful scenario failure between report steps.

## Step Granularity

Each distinct meaningful business action should be a separate step.

If three products are added, use three steps, not one loop wrapped in a single step:

```text
Step 1 : Add phone to cart
Step 2 : Add laptop to cart
Step 3 : Add headphones to cart
```

The step name should identify the actual business item where that information is available. Prefer:

```ts
await testStep(`Step ${index + 1} : Add ${product.name} to the cart`, page, async () => {
    await homePage.addProductToCart(product.name);
    await expect(cartPage.cartCount).toHaveText(String(index + 1));
});
```

over generic names such as:

```text
Add new arrival product 1 to the cart
```

unless the actual product identity is intentionally unavailable or irrelevant.

Do not split one business operation into artificial technical steps.

## Action and Expected Result

A meaningful `testStep()` should normally contain the action and the assertion that validates its expected outcome.

Examples:

```ts
await testStep("Step 1 : Launch the home page", page, async () => {
    await homePage.launchWebApp();
    await homePage.waitForNewArrivalImages();
    await expect(homePage.newArrivalsSection).toBeVisible();
});
```

```ts
await testStep("Step 2 : Add the selected product to the cart", page, async () => {
    await homePage.addProductToCart(product.name);
    await expect(cartPage.cartCount).toHaveText("1");
});
```

```ts
await testStep("Step 3 : Verify the selected product is in the cart", page, async () => {
    await homePage.openCart();
    await expect(await cartPage.getProductNames()).toContain(product.name);
});
```

Some purely technical preparation may not have a meaningful assertion. Do not create meaningless assertions merely to satisfy a rule. If a preparation operation materially affects the scenario and can fail, prefer a meaningful validation such as non-empty input, expected count, or valid derived value.

## Assertion Standards

Every meaningful business step should have an appropriate assertion validating the expected outcome whenever such an outcome is observable.

Always write assertions as `await expect(...)`, including assertions against plain values or arrays. Follow the repository's convention even when Playwright's matcher is synchronous and `await` is technically optional.

Examples:

- Launch → URL, heading, or unique page element.
- Search → expected results or result state.
- Select value → selected value.
- Add product → cart count/product presence.
- Navigate → expected URL or page identity.
- Submit → confirmation or resulting state.
- Select runtime data → non-empty/valid selected data when that establishes the precondition.

Do not add assertions that merely repeat the implementation or prove an irrelevant technical fact.

## Reuse and Extraction

Before duplicating non-trivial logic across tests or steps, search for an existing method/helper.

If the same meaningful operation is repeated and no appropriate reusable implementation exists, extract it into the smallest suitable abstraction.

Use this responsibility guide:

| Logic | Preferred location |
|---|---|
| Page-specific UI behavior | Page Object |
| Generic browser interaction already standardized | Existing `Actions` helper |
| Test reporting/step screenshots | `testStep()` |
| Reusable data/business transformation | Appropriate utility/helper |
| Scenario orchestration | Spec |

Do not extract trivial one-off expressions just to reduce line count.

## Naming

Use repository conventions first. Where no conflicting convention exists:

- camelCase for variables, functions, methods, and test-data properties.
- PascalCase for classes/Page Objects.
- descriptive test titles that state the business behavior.
- descriptive step names that identify the business operation and relevant entity.

## Dynamic Values and Hardcoding

Do not hard-code test-specific or business-specific values when they can be obtained through existing test data, runtime application data, configuration, parameters, or established repository mechanisms.

Do not hard-code credentials.

Static implementation details such as selectors can remain in Page Objects. Distinguish implementation constants from business/test data.

Do not invent a new data mechanism if the repository already has one.

## Spec Responsibility

The spec should orchestrate the business flow. It should not become a second Page Object, Actions helper, or general-purpose data utility.

A spec may contain scenario-specific orchestration, but repeated meaningful logic should be reusable.

## Generation Review

Before finalizing a generated spec, explicitly review:

- Is any meaningful scenario logic outside a `testStep()`?
- Can a failure be located to the business operation that actually failed?
- Does each meaningful step validate its expected result?
- Is repeated non-trivial logic unnecessarily duplicated?
- If a helper was introduced, is it called inside the appropriate `testStep()`?
- Are step names specific enough to be useful documentation?
- Are `testStep()` names numbered sequentially in execution order within each test?
- Are existing framework resources reused?
