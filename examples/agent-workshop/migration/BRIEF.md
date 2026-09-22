# Rename the release API without breaking consumers

Start with the passing migration.test.mjs. Rename getReleases to listReleases.
The dashboard and report consumers must keep their current behaviour.

Use an expand/migrate/contract sequence:

1. Provider: export listReleases and temporarily retain getReleases as an alias.
2. Consumers: migrate dashboard.mjs and report.mjs independently.
3. Integration: verify both consumers and remove the obsolete provider export.

The final state must contain no getReleases references. Passing the behaviour
test alone is insufficient: it passes before any migration too.

Assign each worker a writable file set and a result contract: starting revision,
changed files, checks actually run and unresolved dependencies. The integration
owner decides when the old export may be removed. Do not send workers an
unqualified instruction to rename everything.

Run from this directory:

~~~sh
node --test migration.test.mjs
~~~

Use disposable copies or a standalone disposable Git repository. Do not change
the teaching fixture in the Apsis checkout. No installation or paid calls are
needed for the manual exercise. Agent sessions are optional and use your own
provider allowance. No script automatically launches agents.

For a multi-repository variation, put the provider and each consumer into separate
local repositories. Replace relative imports with your chosen package boundary,
pin the consumer dependency revisions, and establish an integration test before
starting workers. Merely making three repositories does not simulate a release
registry or prove compatibility across deployed versions.
