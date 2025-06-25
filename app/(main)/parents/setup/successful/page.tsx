import { Suspense } from "react";
import SuccessfulSetup from "@/feature/parents/components/setup/successful/SuccessfulSetup";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <ILMIAssistantv2 height={180} width={140} className="h-[180px] w-[140px]" />
          <p className="text-white text-lg">Loading data…</p>
        </div>
      </div>
    }>
      <SuccessfulSetup />
    </Suspense>
  );
}
