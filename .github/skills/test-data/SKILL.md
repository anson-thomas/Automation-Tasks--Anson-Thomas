---
name: test-data
description: Manage existing, runtime-derived, generated, and business-specific test data in this Playwright repository. Use when data drives a scenario, values are derived from the application, repeated transformations are needed, or hardcoding must be avoided.
---

# Test Data and Runtime Data

## Purpose

Keep test data maintainable and separate from UI implementation while allowing scenarios to derive expected values from runtime application data when required.

## Existing Data First

The current repository stores test data under `testAssets/test-data/`. A known example is:

```json
{
    "minimumProduct": {
        "name": "Beats Studio Buds",
        "price": 149.99
    },
    "maximumProduct": {
        "name": "LG NanoCell 90 Series",
        "price": 1799.99
    }
}
```

Always inspect the current repository before relying on exact files or properties.

Rules:

- Reuse existing test data when it satisfies the requirement.
- Follow the structure of the closest existing data file when new data is justified.
- Do not create a second data mechanism for the same kind of information.
- Do not introduce WDIO `procedure` or orchestrator data formats.

## Avoid Inappropriate Hardcoding

Do not hard-code business/test-specific values directly into specs or Page Objects when they can come from:

- existing JSON/test data,
- runtime application data,
- configuration,
- parameters,
- an established repository mechanism.

Examples of values that should normally remain dynamic:

- product names,
- usernames/passwords,
- search values,
- quantities,
- expected business amounts,
- runtime-selected records.

Static technical values such as selectors and framework configuration may remain in their appropriate implementation locations.

## Runtime-Derived Data

Some tests intentionally determine their input from application state. For example, selecting the highest-priced current product should not hard-code a product name if the requirement is explicitly based on runtime price.

The flow is:

```text
Retrieve application data
→ validate that usable data exists
→ derive/select the required business value
→ use the value in the UI action
→ validate the resulting business state
```

Meaningful retrieval/selection logic belongs inside the corresponding `testStep()` so a failure is visible in the report.

Example:

```ts
await testStep("Step 1 : Identify the highest-priced new arrival product", page, async () => {
    const products = await homePage.getNewArrivalProducts();
    await expect(products.length).toBeGreaterThan(0);
    highestPricedProduct = getHighestPricedProduct(products);
});
```

## Repeated Data Transformation

Sorting, filtering, selecting, calculating, or transforming data can be legitimate reusable business logic.

If the same non-trivial transformation is repeated across multiple tests or steps, inspect for an existing helper. If none exists and the operation is genuinely reusable, create an appropriately scoped data/business utility.

For example, if both tests independently sort the same product collection to select the minimum and maximum price, avoid duplicating the sorting implementation in both tests. Prefer reusable operations such as:

```ts
getHighestPricedProduct(products)
getLowestPricedProduct(products)
```

or another abstraction consistent with the repository.

Do not create a helper for a trivial one-off transformation simply to remove a line.

## Assertions for Derived Data

Do not assert implementation details merely because data was retrieved. Assert something meaningful that establishes the precondition or expected business value, such as:

```ts
    await expect(products.length).toBeGreaterThan(0);
```

or, where appropriate, validate that the selected value is defined and usable.

Do not invent exact expected business values when the scenario is explicitly runtime-driven.

## Generated or Output Data

If the framework already has a mechanism for writing generated data, reuse it. Do not introduce a new persistence mechanism merely because a test produces output.

When generated data is persisted, verify the destination and property names against the actual repository files before writing assertions against them.
