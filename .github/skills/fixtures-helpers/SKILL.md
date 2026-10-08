---
name: fixtures-helpers
description: Use or extend this repository's custom fixtures, Actions helper, testStep helper, and reusable utility layer. Use when generated tests need framework helpers or when repeated logic requires deciding where a helper belongs.
---

# Fixtures and Helpers

## Purpose

Reuse the framework's existing support layer rather than recreating browser actions, reporting behavior, or fixture setup inside specs.

## Custom Fixtures

The current framework extends Playwright's base `test` in `testAssets/pages/customFixtures.ts` and exposes Page Object fixtures such as `homePage` and `cartPage`.

Representative pattern:

```ts
export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});
```

Verify the current fixture file before relying on exact fixture names.

Rules:

- Import the repository's custom `test` when Page Object fixtures are required.
- Inject only fixtures actually used by the test.
- Reuse an existing fixture before creating another.
- Add a fixture only when the resource is genuinely fixture-like and the existing pattern supports it.
- If a new Page Object must be exposed, update `customFixtures.ts` consistently.
- Do not create a second fixture mechanism.

## Actions Helper

The current `helper/actions.ts` provides reusable interaction methods including:

```text
highlight(locator)
click(locator)
fill(locator, value)
check(locator)
selectOption(locator, value)
```

Existing Page Objects instantiate `Actions` and use it for standardized interactions.

Rules:

- Reuse an existing Actions method when the interaction matches it.
- Do not duplicate click/fill/check/select behavior in a Page Object or spec when the helper already supports it.
- If an interaction is missing, inspect the helper and decide whether it is truly generic before extending it.
- Do not move page-specific business behavior into a generic Actions helper.

## testStep Helper

The current `helper/utility.ts` provides `testStep(name, page, action, locator?)`. It wraps Playwright's `test.step()` and can perform the repository's waiting/screenshot attachment behavior.

Representative usage:

```ts
    await testStep("Step 1 : Launch the home page", page, async () => {
    await homePage.launchWebApp();
    await expect(homePage.newArrivalsSection).toBeVisible();
});
```

Rules:

- Use `testStep()` for meaningful reportable operations in generated tests.
- Keep the action and its expected-result assertion together where appropriate.
- Do not bypass the helper with direct `test.step()` when the repository's helper is the established reporting mechanism.
- Do not wrap an entire multi-action business scenario in one step when its distinct business actions need separate failure visibility.
- Do not turn every technical line into a separate step.

## Reusable Helper Placement

When repeated logic needs extraction, choose the layer by responsibility:

| Need | Location |
|---|---|
| Page-specific UI interaction | Page Object |
| Generic browser interaction | `Actions` or an existing generic helper |
| Step reporting/screenshots | `testStep()` |
| Reusable data/business transformation | Dedicated appropriate utility/helper |
| Scenario-only orchestration | Spec |

Example: sorting product objects by price is not a browser action and does not belong in `Actions`. If the same meaningful product-selection logic is reused, a product/data utility is more appropriate.

## Helper Extraction Rules

Extract a helper when:

- the same non-trivial logic appears in multiple tests/steps,
- the logic represents a reusable operation,
- centralizing it improves consistency and maintainability.

Do not extract a helper when:

- the expression is trivial and used once,
- the abstraction hides the business flow,
- the helper merely renames one line without reuse or clarity benefit.

### Critical Reporting Rule

A reusable helper must still be called inside the `testStep()` that represents its business operation.

Correct:

```ts
await testStep("Step 1 : Identify the highest-priced product", page, async () => {
    const products = await homePage.getNewArrivalProducts();
    await expect(products.length).toBeGreaterThan(0);
    highestPricedProduct = getHighestPricedProduct(products);
});
```

The helper improves reuse; the `testStep()` preserves failure localization.
