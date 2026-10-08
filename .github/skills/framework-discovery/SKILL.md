---
name: framework-discovery
description: Inspect this repository's Playwright framework before generation or modification. Use when framework conventions, existing resources, configuration, or reusable patterns need to be established from source.
---

# Framework Discovery

## Purpose

The repository, not generic Playwright knowledge, determines how generated automation should be structured. Inspect the smallest relevant set of files needed to establish the current convention.

## Current Repository Inventory

The current workspace includes the following known areas, but always verify the current repository before relying on them:

```text
playwright.config.ts
package.json
tsconfig.json
helper/
    actions.ts
    utility.ts
testAssets/
    pages/
        homePage.ts
        cartPage.ts
        customFixtures.ts
    test-data/
        productData.json
    tests/
        assignment6.spec.ts
```

The current project uses a custom fixture layer, Page Objects, `Actions`, and `testStep()`. These are established patterns, not permission to assume that every future repository state is identical.

## Inspect Configuration

Inspect `playwright.config.ts` when the task depends on:

- test directory,
- projects/browsers,
- retries/workers,
- reporters,
- screenshots/video/trace,
- execution behavior.

Do not copy transient configuration values into generated tests when the configuration itself should be the source of truth.

Inspect `package.json` when package availability, scripts, or installed framework capabilities matter.

## Inspect Tests

Inspect nearby `.spec.ts` files to establish:

- import style,
- `test.describe()` usage,
- test naming,
- fixture injection,
- `testStep()` usage,
- assertion style,
- data access,
- Page Object usage,
- loop/parameterization patterns.

Prefer the closest relevant example over a distant example.

## Inspect Page Objects and Fixtures

Before writing UI code:

1. Search the relevant Page Object.
2. Search related Page Objects if the behavior crosses pages.
3. Inspect `customFixtures.ts` for available Page Object fixtures.
4. Inspect `helper/actions.ts` for supported interactions.
5. Inspect `helper/utility.ts` for `testStep()` behavior.

Do not recreate a capability that already exists.

## Discovery Discipline

Inspect only what is relevant. A simple spec request does not require loading the whole repository.

However, do not skip discovery merely to save context when a new helper, fixture, Page Object method, or data mechanism might be created. The cost of a small targeted inspection is lower than introducing a conflicting framework pattern.

## Source-of-Truth Rule

When repository evidence conflicts with generic Playwright advice, follow the repository for framework-specific structure unless doing so would make the requested behavior impossible or unsafe. Do not silently replace the repository architecture with a preferred architecture.
