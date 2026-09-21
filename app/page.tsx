import { loadCurricula } from "@/curriculums/registry";
import LessonViewer from "@/components/LessonViewer";
export default async function Page() {
  return (
    <LessonViewer
      packs={await loadCurricula()}
      staticMode={Boolean(process.env.PAGES_BASE_PATH)}
    />
  );
}
