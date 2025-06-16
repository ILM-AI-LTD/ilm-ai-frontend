export interface CountryResponse {
    id: string;
    image: string;
    label: string;
}

export interface BoardResponse {
    id: number;
    name: string;
}

export type SubChapter = {
    id: string;
    subChapter: string;
    href?: string;
    progress: number;
    icon: string;
};

export type Connection = {
    from: string;
    to: string;
    startYOffset?: number;
};


export type LayoutItem =
    | { type: "single"; topicId: string; hidden?: boolean; className?: string; top?: boolean }
    | { type: "branch"; leftTopicId: string; junctionKey: string };
