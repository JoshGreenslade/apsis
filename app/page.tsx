import { loadCurricula } from "@/curricula/registry";
import LessonViewer from "@/components/LessonViewer";
export default async function Page() {
  return <LessonViewer packs={await loadCurricula()} />;
}
