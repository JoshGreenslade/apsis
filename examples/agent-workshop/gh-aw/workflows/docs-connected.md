---
description: Shared maintenance guidance and a deterministic document check.
on:
  workflow_dispatch:
permissions:
  contents: read
engine: copilot
timeout-minutes: 10
max-turns: 8
imports:
  - shared/evidence.md
network:
  allowed:
    - defaults
steps:
  - name: Install pinned workshop dependencies
    run: npm ci --ignore-scripts --prefix examples/agent-workshop
tools:
  bash:
    - "cat"
    - "ls"
    - "node examples/agent-workshop/maintenance/check-docs.mjs"
safe-outputs:
  staged: true
  create-issue:
    title-prefix: "[workshop-connected] "
    max: 1
---

# Inspect documentation using shared guidance

Read the maintenance fixture's implementation and API document under
examples/agent-workshop/maintenance. Run the supplied check-docs.mjs against
API.md, then inspect the implementation: the script only recognises an obsolete
spelling and does not establish overall semantic correctness.

Propose at most one evidence-backed documentation finding. Do not change code.
For this maintenance exercise, the implementation defines the supported query.
