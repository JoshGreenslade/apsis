# Investigator starting point

Requires Node 24 or later. No install, account, API key or network access needed.
These files are intentionally a small service fragment, not a deployed API.

From this directory:

```sh
node --test releases.test.mjs
```

The starting point has two passing and two failing checks. Both failures expose
the same query interpretation problem. Read CONTRACT.md before editing.
Keep an untouched copy to restart; make your proposed fix in a separate copy.
Nothing in the exercise calls a model or writes outside your working copy.

You can ask an agent to investigate the reported issue, or inspect the files
yourself. Record the task, information it accessed, proposed change and checks
actually run. Never present your own reconstructed sequence as a model trace.

## Download individually

The course serves releases.ts, releases.test.mjs, package.json and CONTRACT.md
alongside this file. Put all four in the same directory before running the command.
Alternatively, clone Apsis and work from public/agent-workshop/investigator.
