import MathematicsExplorer from "@/components/MathematicsExplorer";
import type {
  LessonBlock,
  LessonContent,
  LessonSection,
} from "@/types/curriculum";
import { Lightbulb } from "lucide-react";
import { Diagram } from "@/components/Diagram";
import { FormulaCopies, InlineMathText, MathText } from "@/components/MathText";

function Reflection({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="reflection">
      <summary>
        <Lightbulb size={18} />
        <span>
          <InlineMathText>{question}</InlineMathText>
          <small>Think it through, then compare your reasoning</small>
        </span>
      </summary>
      <MathText>{answer}</MathText>
    </details>
  );
}

function LessonBlockView({
  block,
  role,
  sectionTitle,
}: {
  block: LessonBlock;
  role?: LessonSection["role"];
  sectionTitle?: string;
}) {
  switch (block.kind) {
    case "exploration":
      return <MathematicsExplorer topicId={block.experiment} />;
    case "summary":
      return (
        <section className="theoretical-minimum">
          <h3>Theoretical minimum</h3>
          {Object.entries(block.data).map(([key, value]) => (
            <div key={key}>
              {key !== "coreIdea" && key !== "widerConnection" && (
                <h4>{key.replace(/([A-Z])/g, " $1")}</h4>
              )}
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, i) => (
                    <li key={i}>
                      <MathText>{item}</MathText>
                    </li>
                  ))}
                </ul>
              ) : (
                <MathText>{value}</MathText>
              )}
            </div>
          ))}
        </section>
      );
    case "content":
      return (
        <section
          className={role === "reasoning" ? "reasoning-step" : "content-prose"}
        >
          {block.title && <h3>{block.title}</h3>}
          <MathText>{block.body}</MathText>
          {role === "reasoning" && <FormulaCopies text={block.body} />}
        </section>
      );
    case "callout":
      return (
        <div className={`content-callout ${block.tone ?? "idea"}`}>
          <h3>{block.title}</h3>
          <MathText>{block.body}</MathText>
        </div>
      );
    case "list":
      return (
        <div className="content-list">
          {block.title && <h3>{block.title}</h3>}
          <ul>
            {block.items.map((item, index) => (
              <li key={index}>
                <MathText>{item}</MathText>
              </li>
            ))}
          </ul>
        </div>
      );
    case "steps":
      return (
        <div className="content-steps">
          <h3>{block.title}</h3>
          {block.steps.map((step, index) => (
            <section className="worked-step" key={`${step.title}-${index}`}>
              <span className="step-index">{index + 1}</span>
              <div>
                <h4>{step.title}</h4>
                {step.reason && (
                  <div className="reason">
                    <strong>Why this step?</strong>
                    <MathText>{step.reason}</MathText>
                  </div>
                )}
                <MathText>{step.body}</MathText>
                {step.trap && (
                  <div className="trap">
                    <strong>A common wrong turn</strong>
                    <MathText>{step.trap}</MathText>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      );
    case "diagram":
      return <Diagram data={block.data} />;
    case "question":
      return (
        <div className="content-checkpoint">
          {block.bridge && (
            <p className="teaching-bridge">
              <InlineMathText>{block.bridge}</InlineMathText>
            </p>
          )}
          {block.meaning && (
            <div className="meaning">
              <h4>What this is really saying</h4>
              <p>
                <InlineMathText>{block.meaning}</InlineMathText>
              </p>
            </div>
          )}
          <Reflection question={block.question} answer={block.answer} />
          {block.further?.map((reflection, index) => (
            <Reflection key={index} {...reflection} />
          ))}
        </div>
      );
    case "example":
      return (
        <div className="content-example">
          {block.title !== sectionTitle && <h3>{block.title}</h3>}
          {block.problem !== block.title && (
            <div className="example-brief">
              <MathText>{block.problem}</MathText>
            </div>
          )}
          {block.steps.map((step, index) => (
            <section className="worked-step" key={`${step.title}-${index}`}>
              <span className="step-index">{index + 1}</span>
              <div>
                <h4>{step.title}</h4>
                {step.reason && (
                  <div className="reason">
                    <strong>Why this step?</strong>
                    <MathText>{step.reason}</MathText>
                  </div>
                )}
                <MathText>{step.body}</MathText>
                {step.trap && (
                  <div className="trap">
                    <strong>A common wrong turn</strong>
                    <MathText>{step.trap}</MathText>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      );
    case "sidebar":
      return (
        <details className="deep-dive">
          <summary>{block.heading}</summary>
          <MathText>{block.body}</MathText>
        </details>
      );
    case "lab":
      return (
        <div className="practical-lab">
          <div className="section-kicker">
            PUT IT TO WORK · {block.data.minutes} MIN · OPTIONAL LAB
          </div>
          <h2>{block.data.title}</h2>
          <MathText>{block.data.brief}</MathText>
          <ol>
            {block.data.steps.map((step) => (
              <li key={step}>
                <MathText>{step}</MathText>
              </li>
            ))}
          </ol>
          <h3>What to produce</h3>
          <ul>
            {block.data.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <details className="deep-dive">
            <summary>Compare with the review guide</summary>
            <MathText>{block.data.review}</MathText>
          </details>
          <p className="muted">
            Use your notebook below to keep your reasoning. Labs are
            self-reviewed and do not affect knowledge-check scores.
          </p>
        </div>
      );
    case "takeaway":
      return (
        <div className="content-takeaway">
          <div className="takeaway">
            <MathText>{block.body}</MathText>
          </div>
          {block.nextConnection && <MathText>{block.nextConnection}</MathText>}
        </div>
      );
    default: {
      const unhandled: never = block;
      throw new Error(`Unknown prefab: ${JSON.stringify(unhandled)}`);
    }
  }
}

export default function LessonContent({ content }: { content: LessonContent }) {
  return (
    <>
      {content.sections.map((section) => (
        <section id={section.id} className="lesson-section" key={section.id}>
          {section.kicker && (
            <div className="section-kicker">{section.kicker}</div>
          )}
          <h2>{section.title}</h2>
          {section.blocks.map((block, blockIndex) => (
            <LessonBlockView
              key={`${section.id}-${block.kind}-${blockIndex}`}
              block={block}
              role={section.role}
              sectionTitle={section.title}
            />
          ))}
        </section>
      ))}
    </>
  );
}
