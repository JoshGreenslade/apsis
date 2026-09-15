import { applyAction } from "./curriculum-engine";
import type {
  CurriculumPack,
  LearnerState,
  LearningAction,
} from "@/types/curriculum";

function key(pack: CurriculumPack) {
  return `apsis:state:${pack.id}:${pack.version}`;
}

export function readBrowserState(pack: CurriculumPack): LearnerState {
  try {
    const raw = localStorage.getItem(key(pack));
    if (!raw) return { topics: {}, scratchpads: {} };
    const parsed = JSON.parse(raw) as LearnerState;
    return parsed && typeof parsed === "object" && parsed.topics && parsed.scratchpads
      ? parsed
      : { topics: {}, scratchpads: {} };
  } catch {
    return { topics: {}, scratchpads: {} };
  }
}

export function applyBrowserAction(
  pack: CurriculumPack,
  action: LearningAction,
) {
  const result = applyAction(pack, readBrowserState(pack), action);
  localStorage.setItem(key(pack), JSON.stringify(result.state));
  return result;
}
