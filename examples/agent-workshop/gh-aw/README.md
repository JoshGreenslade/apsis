# GitHub Agentic Workflows workshop

Compiler: gh-aw v0.88.8. The example is outside .github/workflows so it is inert
in Apsis. Do not move it into Apsis's live workflows as part of course authoring.

Install this release using the official GitHub gh-aw release instructions and
confirm gh aw --version. If using a standalone binary, replace gh aw below with
its executable path. Compilation does not call a model or publish an issue.

From the Apsis repository root:

~~~sh
gh aw compile --dir examples/agent-workshop/gh-aw/workflows --no-check-update
~~~

Read the generated docs-drift.lock.yml alongside docs-drift.md. Local compilation
is not a live Actions test. The example selects Copilot; remote execution requires
the authentication and entitlement documented for that engine and release.
Do not assume the automatic GitHub token also pays for or authenticates inference.

For an optional live exercise, use your own disposable repository. Preserve
examples/agent-workshop/maintenance, copy the Markdown source into its
.github/workflows, compile there, and commit both Markdown and generated lock
file to its default branch. Configure the engine's secret using the official
authentication guide before manually dispatching the workflow. Review the
compiled secret references rather than guessing a credential name.

Local verification on 2026-09-22: v0.88.8 compiled the supplied source with no
warnings. The downloaded Windows compiler's SHA256 matched its release digest:
ceaf30b48bc8f1823fc8f6a71eb0c8df727cfca54a1c4feac40d146a8950a7db.
No live Actions run or paid inference was performed. Compilation may create
.gitattributes and .github/aw/actions-lock.json in the working repository; inspect
those generated support files when preparing your own sandbox.

The supplied workflow has only a manual trigger and staged output. Staged mode
previews supported output operations; a remote run still consumes runner/model
resources. Check account pricing and set limits before running. Start with one
run. Staged safe outputs do not mean every other job is side-effect-free: inspect
the generated conclusion job and its permissions as well as safe_outputs.
Do not enable a schedule until you have inspected the result and budget.
Disable the workflow, remove its secrets and delete the disposable repository
when finished. Do not paste secrets into prompts or commit them.

The maintenance fixture has a deliberately stale query parameter name. Its
implementation is authoritative for this exercise. Change API.md to match and
repeat: a useful workflow should now report no actionable mismatch.
