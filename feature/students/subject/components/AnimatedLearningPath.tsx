"use client";

import React, { useMemo, useRef } from "react";
import { IconComponent } from "./IconComponent";
import { generateLayoutStructure, generateConnections } from "../utils/layoutUtils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Circle } from "./Circle";
import { SubChapter } from "@/types/student";

interface Chapter {
  name: string;
  icon: string;
  data: SubChapter[];
  progress: number;
}

interface AnimatedLearningPathProps {
  chapter: Chapter;
}

export function AnimatedLearningPath({ chapter }: AnimatedLearningPathProps) {
  const chapterData = chapter.data;

  const mainTopic = {
    id: "0",
    subChapter: chapter.name,
    href: "#",
    progress: chapter.progress,
    icon: chapter.icon,
  };

  const allTopics = [mainTopic, ...chapterData];

  const containerRef = useRef<HTMLDivElement>(null);

  const topicRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    allTopics.forEach(topic => {
      refs[topic.id] = React.createRef();
    });
    return refs;
  }, [allTopics]);

  const junctionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    const count = Math.ceil(chapterData.length / 2);
    for (let i = 1; i <= count; i++) {
      refs[`junction${i}`] = React.createRef();
    }
    return refs;
  }, [chapterData.length]);

  const layoutStructure = useMemo(() => generateLayoutStructure(chapterData), [chapterData]);
  const connections = useMemo(() => generateConnections(chapterData), [chapterData]);

  const renderLayout = () =>
    layoutStructure.map((item, index) => {
      if (item.type === "single") {
        const topic = allTopics.find(t => t.id === item.topicId);
        if (!topic) return null;
        console.log('topic --------------', topic);

        return (
          <div key={index} className="flex size-full flex-col items-center">
            <Circle
              ref={topicRefs[topic.id]}
              hidden={item.hidden}
              top={item.top}
              className={item.className}
              title={topic.subChapter}
              href={topic.href}
              progress={topic.progress}
              index={index}
            >
              <IconComponent iconName={topic.icon} />
            </Circle>
          </div>
        );
      }

      // type === 'branch'
      const leftTopic = allTopics.find(t => t.id === item.leftTopicId);
      if (!leftTopic) return null;

      return (
        <div key={index} className="flex size-full flex-row items-start justify-between">
          <Circle
            ref={topicRefs[leftTopic.id]}
            title={leftTopic.subChapter}
            href={leftTopic.href}
            progress={leftTopic.progress}
            index={index}
          >
            <IconComponent iconName={leftTopic.icon} />
          </Circle>
          <div ref={junctionRefs[item.junctionKey]} className="size-32 rounded-full" />
          <div className="size-32 rounded-full" />
        </div>
      );
    });

  const renderAnimatedBeams = () =>
    connections.map((connection, index) => {
      const fromRef = connection.from.startsWith("junction")
        ? junctionRefs[connection.from]
        : topicRefs[connection.from];

      const toRef = connection.to.startsWith("junction")
        ? junctionRefs[connection.to]
        : topicRefs[connection.to];

      return (
        fromRef &&
        toRef && (
          <AnimatedBeam
            key={index}
            duration={3}
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            startYOffset={connection.startYOffset}
          />
        )
      );
    });

  return (
    <div
      className="relative flex flex-col gap-20 w-full max-w-[900px] items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      {renderLayout()}
      {renderAnimatedBeams()}
    </div>
  );
}