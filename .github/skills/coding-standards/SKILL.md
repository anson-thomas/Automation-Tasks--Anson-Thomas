---
name: coding-standards
description: Independently review TypeScript Playwright code for framework fit, responsibility boundaries, reuse, and behavior. Use for a deeper standards review, not routine linting.
---

# Framework Standards Review

## Purpose

Perform an independent, framework-focused review when requested. This is an optional deeper review, not a required step after every spec. The current repository is the source of truth; inspect nearby code before applying a convention.

## Framework Boundaries

| Responsibility | Preferred location |
|---|---|
| Page-specific locators and UI behavior | Page Object |
| Generic browser interactions | Existing `Actions` helper |
| Named steps and step reporting | Existing `testStep()` utility |
| Scenario orchestration and business assertions | Spec/test |
| Shared non-trivial data transformations | Appropriate utility/helper |
| Page Object construction | Existing custom fixtures |
| Business/test data | Existing data mechanism |

Do not move code across these boundaries solely to make it shorter or more fashionable. Preserve public APIs, fixtures, test-data keys, and runtime behavior unless the requested change requires otherwise.

## Review Checklist

- Reuse existing fixtures, Page Objects, locators, `Actions`, `testStep()`, and test data before adding alternatives.
- Keep meaningful business operations visible in named `testStep()` calls, with appropriate assertions in the spec.
- Keep scenario-specific decisions in the spec; keep reusable page behavior in Page Objects and generic interactions in `Actions`.
- Prefer TypeScript types and existing patterns; avoid unnecessary `any`, unused declarations, hard waits, swallowed failures, and hardcoded secrets.
- Avoid broad cleanup, speculative rules, duplicate helpers, and unrelated locator or formatting rewrites.
- Treat existing repository conventions as evidence, not as a reason to preserve a concrete defect. Explain any recommended deviation.

## Skill Routing

Load only the specialist skill relevant to the reviewed change:

- `spec-generation` and `existing-spec-updates` for test flow or spec structure.
- `fixtures-helpers` for fixtures, `Actions`, `testStep()`, or helper placement.
- `page-object-locators` for Page Objects, selectors, or UI behavior.
- `test-data` for data sources or business-data transformations.
- `security` for credentials or other sensitive values.
- `validation` for static checks and test execution.

Do not load every skill for a general review. Do not duplicate their detailed procedures here.

## Review Workflow

1. Confirm the requested scope and inspect the affected code plus the nearest relevant framework resources.
2. Compare the implementation with the responsibilities and checklist above.
3. Report only actionable findings, ordered by severity, with file references and concise reasoning. Separate confirmed defects from recommendations.
4. Default to review-only. Do not edit unless the user asks for changes; never commit.
5. If edits are requested, make the smallest safe changes and run the relevant validation.