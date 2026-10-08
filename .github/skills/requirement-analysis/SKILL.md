---
name: requirement-analysis
description: Analyze a requested Playwright automation scenario before implementation. Use when a request is ambiguous, multi-step, involves several framework resources, or requires deciding what the generated test should actually verify.
---

# Requirement Analysis

## Purpose

Translate the user's request into an automation scenario without inventing requirements. Identify the business actions, expected outcomes, data dependencies, pages/resources, and likely reusable framework components before code is written.

## Analyze the Request

Determine:

- What business behavior is being tested.
- What user/business actions occur and in what order.
- What result should be observed after each meaningful action.
- Which values are inputs, which are derived at runtime, and which are expected outcomes.
- Whether the request creates a new spec, updates an existing spec, or requires framework support.
- Which pages, Page Objects, fixtures, helpers, test-data files, and locators are likely involved.
- Whether the request contains repeated behavior that should be reused.

Do not silently invent missing business expectations. If the repository can establish the answer, inspect it first. Ask the user only when the missing information cannot reasonably be established from the request or repository.

## Scenario Decomposition

Break the scenario into meaningful business operations, not individual lines of code.

For example:

```text
Launch application
Identify highest-priced product
Add selected product to cart
Verify selected product is in cart
```

This decomposition is important because each meaningful operation may require a named `testStep()` for failure localization and reporting.

Do not turn implementation details into artificial business steps. A locator lookup, variable assignment, loop, or internal helper call does not automatically deserve its own step. It belongs inside the step representing the business operation it supports.

## Resource Classification

Classify required work as one or more of:

- new spec generation
- existing spec update
- Page Object reuse/update
- locator creation/update
- fixture reuse/update
- helper reuse/update
- test-data reuse/update
- validation/failure diagnosis

Then load only the corresponding skills.

## Reuse Analysis

Before recommending a new resource, establish whether the repository already contains:

1. an equivalent test flow,
2. an equivalent Page Object method,
3. an equivalent locator,
4. an existing fixture,
5. an existing helper,
6. an existing data source or transformation utility.

Repeated meaningful logic is a reuse signal. Do not duplicate non-trivial sorting, filtering, selection, calculation, parsing, or transformation logic merely because it can be written inline.

## Output Expectations

The analysis should result in a concrete implementation plan internally:

- what the test will do,
- what each meaningful step will report,
- what assertions belong to each step,
- what existing resources will be reused,
- what new resource, if any, is justified,
- what validation is required.

Do not expose a long planning document to the user unless requested; use the analysis to generate the correct implementation.
