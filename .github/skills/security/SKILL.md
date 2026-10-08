---
name: security
description: Apply security rules when Playwright tests involve credentials, authentication, tokens, secrets, or sensitive test values.
---

# Security and Sensitive Data

- Never hard-code real passwords, API keys, access tokens, private keys, or other secrets into generated tests.
- Reuse the repository's established environment/configuration mechanism when credentials are required.
- Do not expose sensitive values in test titles, screenshots, logs, reports, or committed test-data files.
- Inspect the repository for an existing authentication/data mechanism before creating one.
- If no established mechanism exists and authentication is required, do not invent a secret-management architecture without sufficient repository evidence; ask for the missing information when necessary.
- Do not print sensitive values merely to diagnose a failure.
