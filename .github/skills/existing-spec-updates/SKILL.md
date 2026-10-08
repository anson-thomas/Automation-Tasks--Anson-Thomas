---
name: existing-spec-updates
description: Safely modify an existing Playwright spec while preserving its established behavior, structure, reporting, and framework conventions. Use whenever the requested change targets an existing test file.
---

# Updating Existing Specs

## Purpose

Improve or extend an existing test without unnecessarily rewriting unrelated code or changing established behavior.

## Before Editing

Inspect the complete relevant test or enough surrounding code to understand:

- imports,
- `describe` structure,
- fixtures,
- existing test steps,
- assertions,
- data flow,
- Page Object usage,
- helper usage,
- existing naming and formatting.

Identify exactly which requested behavior needs to change.

## Preserve Existing Structure

Do not rewrite an entire spec when a targeted modification is sufficient.

Preserve:

- working imports,
- existing Page Object usage,
- fixture patterns,
- established step/reporting behavior,
- unrelated tests,
- useful assertions,
- existing data mechanisms.

Change only what is necessary to satisfy the new requirement or correct a real defect.

## Improve During an Update When Justified

An existing spec may contain a pattern that directly conflicts with the current agent rules. Correct it when touching the relevant area, especially when it causes poor failure visibility or unnecessary duplication.

Examples:

- Move meaningful scenario logic currently outside `testStep()` into the appropriate step.
- Replace duplicated non-trivial transformation logic with a justified reusable helper.
- Make repeated product-addition steps descriptive rather than generic.
- Replace hard-coded business data when an existing dynamic source is already available.

Do not perform unrelated cleanup merely because it is possible.

## Repeated Logic

When two or more tests contain the same non-trivial operation, check for an existing helper before duplicating another copy.

If no helper exists and extraction is justified, create the smallest appropriate reusable method/helper and update the affected tests to use it.

The helper must still be invoked inside the relevant `testStep()` when the operation is part of the business scenario.

## Validation After Modification

Check:

- changed imports,
- fixture names,
- Page Object methods,
- helper signatures,
- test-data paths/properties,
- step names,
- assertions,
- unrelated tests were preserved.

Run the modified test or the narrowest relevant test when execution is available.
