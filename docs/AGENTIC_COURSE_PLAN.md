# Agentic engineering: a fresh course

Status: curriculum and narrative proposal. These are learning strands, not
chapter boundaries. No lesson text has been drafted.

## Audience and destination

The reader can write software and has tried an AI assistant. They do not need
experience building agents or studying machine learning.

By the end, they should be able to choose useful work to delegate, understand
what an agent system is doing, build a small system, and judge whether it is
worth using. The course should develop engineering judgement as well as
implementation ability.

## Basic curriculum

| Learning strand | What the reader should understand or be able to do |
| --- | --- |
| Working with an assistant | Distinguish useful help, delegated work and automation; recognise when ordinary code or a human decision is more appropriate. |
| Models and their limits | Understand inference, context, variability and missing information well enough to interpret both impressive results and mistakes. |
| From answers to actions | Follow a tool request through execution and observation; understand how a model participates in a loop and what the surrounding runtime supplies. |
| Giving work a useful shape | Turn an intention into a task with relevant context, constraints, room for judgement and a recognisable outcome. |
| Information over time | Select and retrieve evidence, handle conflicting sources, preserve working state and resume without treating old assumptions as current facts. |
| Building a small agent | Connect a model, tools and explicit state; observe the run and understand how it stops, fails and recovers. |
| Deciding whether it works | Verify individual results, evaluate representative tasks, examine human effort and cost, and use failures to guide improvement. |
| Connecting capabilities | Choose tool interfaces and integrations; understand MCP and reusable guidance in the problems they solve. |
| Operating repeated work | Handle triggers, identities, permissions, isolation, budgets, external effects, interruptions and maintenance. |
| Dividing work | Decide when workers or independent review help; design delegation, shared ownership and the integration of results. |
| Choosing what to keep | Compare existing products and custom components; pilot a useful workflow and decide whether to expand, revise or retire it. |

This is a coverage inventory, not a demand for eleven chapters. Some ideas
should recur with more depth as the reader gains experience.

## The course's story

Begin with a familiar experience: an assistant has returned something that
looks useful. We want to understand what it has actually done, what we still
need to do, and whether we would trust it with more of the work. Establish why
these questions matter before introducing implementation terminology.

Follow that curiosity into the system. The answer depends on information the
model receives. Acting on the answer requires tools. Tools return observations,
which can change the next action. The reader gradually acquires the vocabulary
for machinery they have already seen a reason to examine.

Then move from watching an assistant to working well with one. Give it a task,
see where the request leaves important choices unresolved, and improve the
handoff. Introduce context selection and continuity when the work actually
needs more information or lasts beyond a conversation.

At that point, build a small agent. Let a first working loop make the earlier
ideas tangible. Extend it in response to behaviour we can observe, rather than
starting with a framework and explaining its configuration. Pair a runnable
path with explanations that remain understandable without running it.

Use the system to do useful work and discover the difference between a
convincing demonstration and a reliable result. Verification appears wherever
we make a claim; evaluation now asks how the whole arrangement behaves across
tasks, including the time it takes people to review and repair its outputs.

As the system reaches beyond a local experiment, let new requirements motivate
integrations, durable state, permissions and recovery. Repeated execution
raises questions a supervised one-off run could leave with its operator.

Only then consider more agents and more infrastructure. There should be a
visible bottleneck or requirement to address. The reader can compare the
benefit with the work required to combine outputs and operate the system.

Finish with an engineering decision about a modest real workflow: what it is
useful for, what still needs a person, and what evidence would change that
decision. A sensible decision not to automate is a valid outcome.

## Examples and teaching approach

Use a few recognisable tasks where they naturally help: a small code change,
investigating an unfamiliar failure, and a recurring maintenance task. Select
the eventual build project after the learning sequence is agreed. No single
bug must carry every concept.

Begin explanations with a situation the reader can understand and a reason
to investigate it. Develop the reasoning in connected prose. Define technical
terms when they become useful. Let examples unfold inside the explanation;
include mistakes when they illuminate a real choice, not to fill a template.

Use conversational clarity, curiosity and concrete thought experiments.
Avoid adopting a performer's voice or adding stock lecture phrases. Length,
diagrams, questions, code and exercises should follow the particular idea.
There is no required pattern for a lesson or a paragraph.

The scope includes useful capabilities and creative problem-solving as well
as reliability. Every topic should help the reader understand, build or decide
something, rather than merely add another caution.

## Next decisions

First review the coverage and narrative above. Then identify chapter
boundaries where the reader has answered one substantial question and is
ready for the next. Check prerequisites, repetition and the balance between
understanding, building and operating.

Only after that, choose the opening chapter and write it in full. Read it as
a learner before extending the approach to the next small batch. Do not
generate a whole course from a common prose template.
