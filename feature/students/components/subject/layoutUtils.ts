import type { Connection, LayoutItem, SubChapter } from "./types";

export const generateLayoutStructure = (chapterData: SubChapter[]): LayoutItem[] => {
    const layout: LayoutItem[] = [{ type: "single", topicId: "0", hidden: true, className: "size-48",  }];
    for (let i = 0; i < chapterData.length; i++) {
        const topic = chapterData[i];
        if (i % 2 === 0) {
            layout.push({ type: "branch", leftTopicId: topic.id, junctionKey: `junction${Math.floor(i / 2) + 1}` });
        } else {
            layout.push({ type: "single", topicId: topic.id, top: true });
        }
    }
    return layout;
};

export const generateConnections = (chapterData: SubChapter[]) => {
    // const connections = [{ from: "0", to: "junction1" }];
    const connections: Connection[] = [{ from: "0", to: "junction1", startYOffset: 115 }];
    for (let i = 0; i < chapterData.length; i += 2) {
        const j = `junction${Math.floor(i / 2) + 1}`;
        const next = `junction${Math.floor(i / 2) + 2}`;
        if (chapterData[i]) connections.push({ from: j, to: chapterData[i].id });
        if (chapterData[i + 1]) {
            connections.push({ from: j, to: chapterData[i + 1].id });
            if (i + 2 < chapterData.length) {
                connections.push({ from: chapterData[i + 1].id, to: next, startYOffset: 115 });
            }
        }
    }
    return connections;
};



