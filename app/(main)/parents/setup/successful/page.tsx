import { Suspense } from "react";
import ILMIAssistant from "@/feature/parents/components/setup/common/ILMIAssistant";
import SuccessfulSetup from "@/feature/parents/components/setup/successful/SuccessfulSetup";

export default function Page() {
  return (
    <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <ILMIAssistant height={180} width={140} className="h-[180px] w-[140px]" />
            <p className="text-white text-lg">Loading data…</p>
          </div>
        </div>
      }>
      <SuccessfulSetup />
    </Suspense>
  );
}
