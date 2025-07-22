'use client';

import React, { useMemo, useRef } from "react";
import { IconComponent } from "./IconComponent";
import {
  generateLayoutStructure,
  generateConnections,
} from "../utils/layoutUtils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Circle } from "./Circle";
import { Topic } from "@/types/student";

interface AnimatedLearningPathProps {
  topic: Topic;
  subject?: string;
}

export function AnimatedLearningPath({ topic, subject }: AnimatedLearningPathProps) {
  const topicSlug = topic.topic_name.toLowerCase().replace(/\s+/g, '-');
  const topicData = topic.data;

  const mainTopic = {
    subTopic_id: '0',
    subTopic_name: topic.topic_name,
    href: "#",
    progress: topic.progress,
    icon: topic.icon,
  };

  const allTopics = [
    mainTopic,
    ...topicData.map((topic) => ({
      ...topic,
      href: `/student/subjects/${subject}/${topicSlug}/${topic.subTopic_name
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
    })),
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const topicRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    allTopics.forEach((subTopic) => {
      refs[subTopic.subTopic_id] = React.createRef();
    });
    return refs;
  }, [allTopics]);

  const junctionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    const count = Math.ceil(topicData.length / 2);
    for (let i = 1; i <= count; i++) {
      refs[`junction${i}`] = React.createRef();
    }
    return refs;
  }, [topicData.length]);

  const layoutStructure = useMemo(
    () => generateLayoutStructure(topicData),
    [topicData]
  );
  const connections = useMemo(
    () => generateConnections(topicData),
    [topicData]
  );

  const renderLayout = () =>
    layoutStructure.map((item, index) => {
      if (item.type === "single") {
        const topic = allTopics.find((st) => st.subTopic_id === item.topicId);
        if (!topic) return null;

        return (
          <div key={index} className="flex size-full flex-col items-center">
            <Circle
              ref={topicRefs[topic.subTopic_id]}
              hidden={item.hidden}
              top={item.top}
              className={item.className}
              title={topic.subTopic_name}
              href={topic.href}
              progress={topic.progress}
              index={index}
            >
              <IconComponent iconName={topic.icon} />
            </Circle>
          </div>
        );
      }

      const leftTopic = allTopics.find((st) => st.subTopic_id === item.leftTopicId);
      if (!leftTopic) return null;

      return (
        <div
          key={index}
          className="flex size-full flex-row items-start justify-between"
        >
          <Circle
            ref={topicRefs[leftTopic.subTopic_id]}
            title={leftTopic.subTopic_name}
            href={leftTopic.href}
            progress={leftTopic.progress}
            index={index}
          >
            <IconComponent iconName={leftTopic.icon} />
          </Circle>
          <div
            ref={junctionRefs[item.junctionKey]}
            className="size-28 md:size-32 rounded-full"
          />
          <div className="size-28 md:size-32 rounded-full" />
        </div>
      );
    });

  const renderAnimatedBeams = () =>
    connections.map((connection, index) => {
      const fromRef = connection.from.startsWith('junction')
        ? junctionRefs[connection.from]
        : topicRefs[connection.from];

      const toRef = connection.to.startsWith('junction')
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
      className="relative flex flex-col gap-20 w-full max-w-[900px] items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {renderLayout()}
      {renderAnimatedBeams()}
    </div>
  );
}
