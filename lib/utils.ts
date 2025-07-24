import { clsx, type ClassValue } from "clsx"
import { ParamValue } from "next/dist/server/request/params";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function kebabToTitleCase(input: string): string {
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const mergeProgress = (original: any, apiData: any) => {
  const updatedTopics = original.topics.map((topic: any) => {
    const matchedTopic = apiData.find((t: any) => t.topic_name === topic.topic_id);
    if (!matchedTopic) return topic;

    const updatedSubTopics = topic.data.map((sub: any) => {
      const matchedSub = matchedTopic.subtopics.find((s: any) => s.subtopic_name === sub.subTopic_id);
      return matchedSub ? { ...sub, progress: matchedSub.progress } : sub;
    });

    return {
      ...topic,
      progress: matchedTopic.progress,
      data: updatedSubTopics
    };
  });

  return { ...original, topics: updatedTopics };
};

export function truncateText(text: string, maxLength: number = 35): string {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}