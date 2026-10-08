---
name: validation
description: Validate generated or modified Playwright tests against the repository and execute the narrowest relevant test when possible. Use after creation, modification, helper/Page Object changes, or when diagnosing a generated-test failure.
---

# Validation and Failure Diagnosis

## Purpose

A generated test is not complete merely because the code looks plausible. Validate that it matches the repository, references real resources, reports meaningful business steps, and executes correctly when execution is available.

## Static Validation

Check:

- file is under the configured test directory,
- `.spec.ts` naming is appropriate,
- imports resolve to existing files,
- fixture names exist in `customFixtures.ts`,
- Page Object methods exist,
- locator properties exist,
- helper names/signatures match the actual implementation,
- test-data files and properties exist,
- TypeScript syntax and types are consistent with the project,
- no WDIO-specific code was introduced.

## Framework Validation

Verify that the generated test uses the repository's actual:

- custom fixture pattern,
- Page Object architecture,
- Actions helper,
- `testStep()` implementation,
- test-data mechanism,
- configuration/test directory.

Do not validate against a generic framework structure when repository evidence is available.

## Reporting Validation

Explicitly inspect the generated flow for failure localization.

Ask:

1. What meaningful business operations occur?
2. Is each operation represented by a named `testStep()`?
3. Is meaningful data retrieval/selection/transformation inside the step that represents it?
4. Are reusable helpers invoked inside that step?
5. If the operation fails, would the report identify the business operation that failed?
6. Are distinct business actions represented by distinct steps?
7. Are step names specific enough to serve as documentation?
8. Does every assertion use `await expect(...)`, including assertions against plain values?

Example of a problem:

```ts
const products = await homePage.getNewArrivalProducts();
products.sort(...);
const highest = products[products.length - 1];

await testStep("Step 2 : Add highest-priced product", ...);
```

The product-identification operation is invisible as a report step. It should be represented by a step such as `Identify the highest-priced new arrival product` and the retrieval/selection should occur inside it.

## Assertion Validation

For each meaningful step, determine whether an appropriate expected-result assertion exists.

Examples:

- page launch → page identity/element,
- data selection → usable/non-empty result where appropriate,
- add action → cart count/product state,
- navigation → URL/page identity,
- selection → selected value.

Do not require artificial assertions for purely technical implementation details.

## Reuse Validation

Search for unnecessary duplication in:

- Page Object methods,
- locators,
- Actions methods,
- fixtures,
- data transformations,
- repeated business logic.

If the same non-trivial operation appears multiple times, determine whether an existing helper can be reused or whether a new reusable method/helper is justified.

Do not treat every repeated trivial expression as a required abstraction.

## Execution Validation

When execution is available:

1. Run the narrowest relevant test first.
2. Inspect the actual failure if it fails.
3. Fix the underlying framework/spec issue rather than hiding the failure.
4. Re-run after the fix.
5. Use the repository's normal reporting commands only when relevant.

Do not claim that a test passed unless the execution result supports that statement.

## Failure Diagnosis

When a generated test fails, identify:

- the failing `testStep()` if the report provides it,
- the exact operation inside that step,
- whether the failure is in the spec, Page Object, locator, helper, fixture, data, or application behavior,
- whether the generated structure itself made diagnosis harder.

If a meaningful operation failed outside a `testStep()`, treat that as a spec-structure defect when appropriate and recommend moving it into the corresponding report step.
