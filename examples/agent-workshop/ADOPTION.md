# Maintenance workflow pilot

Complete this worksheet for a disposable pilot before adapting it to real work.
Named people and approval policies depend on your organisation.

## Proposed use

- Team and workflow owner:
- Recipients of findings:
- Current manual or scripted baseline:
- Useful outcome and how recipients will judge it:
- Work explicitly excluded:

## Release candidate

- Workflow source revision and compiler:
- Engine/model configuration:
- Skill/tool revisions and owners:
- Evaluation cases and held-out cases:
- Failed cases, review effort and unresolved risks:
- Pilot scope, duration and spending limit:
- Criteria for expanding, revising or stopping:

## Access and data

- Triggering identity:
- Identity used for repository reads:
- Identity used for inference:
- Identity used for external effects:
- Data sent to each service:
- Where traces and artifacts persist, who can read them, and retention:
- Required approvals and where they are enforced:

## Recovery rehearsal

Simulate a bad skill update or revoked credential without real secrets.
Record detection, the person responsible, the exact disable mechanism, how
pending outputs are reconciled, the rollback revision and verification.
Stopping a schedule alone does not cancel a run already in progress.

## Retirement

Account for triggers, in-flight work, outstanding proposals, credentials,
installed capabilities, retained data and the people returning to manual work.
