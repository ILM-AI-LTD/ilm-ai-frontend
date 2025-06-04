"use client";

import { AnimatedLearningPath } from "@/feature/parents/components/test/AnimatedLearningPath";
import { physicsChapters } from "@/feature/parents/components/test/physics";
import { useState } from "react";

export default function Page() {
  const [selectedPaper, setSelectedPaper] = useState<"paper1" | "paper2">("paper1");

  const current = physicsChapters[selectedPaper];

  return (
    <div className="p-6 space-y-10">
      <div className="flex gap-4">
        <button
          onClick={() => setSelectedPaper("paper1")}
          className={`px-4 py-2 rounded ${selectedPaper === "paper1" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Paper 1
        </button>
        <button
          onClick={() => setSelectedPaper("paper2")}
          className={`px-4 py-2 rounded ${selectedPaper === "paper2" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Paper 2
        </button>
      </div>

      <div className="space-y-16">
        {current.chapters.map((chapter, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-4">{chapter.name}</h2>
            <AnimatedLearningPath chapter={chapter} />
          </div>
        ))}
      </div>
    </div>
  );
}
