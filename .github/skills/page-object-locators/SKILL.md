---
name: page-object-locators
description: Create, update, or reuse Page Object methods and locators for this Playwright repository. Use when UI behavior, selectors, DOM inspection, dynamic locators, or missing page capabilities are involved.
---

# Page Objects and Locators

## Purpose

Keep reusable UI behavior and selectors in the Page Object layer while preserving the repository's established implementation style.

## Current Page Object Pattern

The current repository uses Page Object classes under `testAssets/pages/`. Existing Page Objects store the Playwright `Page`, declare `Locator` properties, initialize locators in the constructor, instantiate `Actions`, and expose reusable methods.

Representative pattern:

```ts
export default class HomePage {
    actions: Actions;
    header: Locator;

    constructor(public page: Page) {
        this.actions = new Actions();
        this.header = this.page.locator("...");
    }
}
```

Verify the current file before extending it; this is a repository pattern, not a generic requirement to rewrite every Page Object.

## Reuse Before Extension

Before adding a Page Object method:

1. Search the relevant Page Object.
2. Search related Page Objects if the behavior could already exist elsewhere.
3. Check existing tests for direct or equivalent usage.
4. Check helpers that may already provide the required interaction.
5. Add a method only if no suitable reusable implementation exists.

A new method is justified when:

- the behavior belongs to that page,
- the behavior is useful beyond one isolated locator operation,
- no equivalent method exists,
- the implementation follows the repository pattern.

## Method Responsibilities

Page Object methods should represent useful page behavior, for example:

```text
launchWebApp()
getNewArrivalProducts()
addProductToCart(productName)
openCart()
getProductNames()
```

Prefer parameterized methods when the behavior varies by test data:

```ts
async addProductToCart(productName: string) {
    // locate the requested product and perform the existing action
}
```

Do not hard-code business-specific product names inside a Page Object when the method can accept the value dynamically.

## Business Assertions

Do not automatically place business assertions throughout Page Objects. Follow the repository's existing separation: Page Objects perform reusable page behavior; specs/reporting steps normally assert the expected business outcome.

A Page Object may return useful state for the spec to assert.

## Locator Creation

Before creating a locator:

1. Search the Page Object for an existing locator.
2. Inspect nearby Page Objects for selector conventions.
3. Inspect the DOM when source code and existing patterns are insufficient.
4. Place the locator in the appropriate Page Object.
5. Reuse it from the spec through the Page Object rather than embedding repeated selectors in the spec.

The current repository contains substantial XPath-based locators. Preserve the existing style for existing areas unless there is a concrete reason to improve a broken locator. Do not assume XPath is universally required for new areas.

Prefer reliable application-supported relationships and stable attributes when they are consistent with the repository and target. Avoid selectors based only on transient styling.

## Dynamic Locators

When the target varies by runtime data, build the locator around the parameter rather than creating one locator per business value.

For repeated product cards, scope the locator to the product/card relationship rather than selecting a fixed position when the repository/application provides a stable relationship.

## DOM Inspection

Do not guess selectors from screenshots alone when a reliable locator is required. Inspect the actual DOM or repository evidence.

Establish:

- the target element,
- stable attributes/relationships,
- repeated-element structure,
- parent/child relationships,
- whether the locator should be parameterized.

## Missing Capability Workflow

Use:

```text
Search → Reuse → Extend → Parameterize → Use → Validate
```

Do not immediately create a new method because a test needs one action.

## Locator Update

When an existing selector is broken:

- inspect the current DOM,
- determine why the existing selector no longer identifies the target,
- update the smallest affected Page Object locator,
- avoid unrelated locator rewrites,
- run the relevant test after the change when possible.
