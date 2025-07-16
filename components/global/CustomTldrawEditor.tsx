"use client";

import "tldraw/tldraw.css";
import { Card } from "../ui/card";
import {
  //   // BoxModel,
  // TLCameraOptions,
  Tldraw,
  TLUiOverrides,
  //   Vec,
  //   // clamp,
  //   track,
  useEditor,
  TLUiComponents,
  DefaultStylePanel,
  DefaultStylePanelContent,
  useRelevantStyles,
  //   // useLocalStorageState,
  //   NoteShapeUtil,
} from "tldraw";
import "tldraw/tldraw.css";
import { useState } from "react";
import { Brush } from "lucide-react";

type Props = {
  questions: {
    question_text: string;
    question_type: string;
  };
};

function ToggleableStylePanel(props) {
  const [isMinimized, setIsMinimized] = useState(false);
  const styles = useRelevantStyles();

  const handleExpand = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Expand button clicked"); // Debug log
    setIsMinimized(false);
  };

  const handleMinimize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Minimize button clicked"); // Debug log
    setIsMinimized(true);
  };

  if (isMinimized) {
    // Minimized state - show only toggle button
    return (
      // <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[99999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg pointer-events-auto">
      <div className="fixed right-2 top-4 z-[99999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg pointer-events-auto">
        <button
          onPointerDown={handleExpand}
          onMouseDown={handleExpand}
          className="bg-transparent border-none cursor-pointer text-base p-1 text-gray-700 dark:text-gray-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors pointer-events-auto"
          title="Expand style panel"
        >
          {/* ⚙️ */}
          <Brush />
        </button>
      </div>
    );
  }

  // Expanded state - show full style panel with minimize button
  return (
    <DefaultStylePanel {...props}>
      {/* Custom header with minimize button */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Style
        </span>
        <button
          onPointerDown={handleMinimize}
          onMouseDown={handleMinimize}
          className="bg-transparent border-none cursor-pointer text-sm px-1 py-0.5 text-gray-500 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors pointer-events-auto"
          title="Minimize style panel"
        >
          ✕
        </button>
      </div>

      {/* Default style panel content */}
      <DefaultStylePanelContent styles={styles} />
    </DefaultStylePanel>
  );
}

const components: TLUiComponents = {
  StylePanel: ToggleableStylePanel, // Replace with our custom component
};

const DEFAULT_CAMERA_STEPS = [0.05, 0.1, 0.25, 0.5, 1, 2, 4, 8];

const overrides: TLUiOverrides = {
  actions(editor, actions) {
    actions.lockCameraZoom = {
      id: "lock-camera-zoom",
      kbd: "shift+k",
      onSelect() {
        const isLocked = editor.getCameraOptions().zoomSteps.length === 1;
        editor.setCameraOptions({
          zoomSteps: isLocked ? DEFAULT_CAMERA_STEPS : [editor.getZoomLevel()],
        });
      },
    };

    return actions;
  },
};

function configureEditor(editor: ReturnType<typeof useEditor>) {
  editor.setCameraOptions({
    constraints: {
      behavior: "inside", // Prevent going outside
      bounds: {
        x: 0,
        y: 0,
        w: 1000, // Fixed width
        h: 100000, // Simulated infinite vertical canvas
      },
      origin: { x: 0, y: 0 },
      initialZoom: "default",
      padding: { x: 0, y: 0 },
      baseZoom: "default",
    },
  });

  editor.setCameraOptions({
    zoomSteps: [editor.getZoomLevel()],
  });
}

const CustomTldrawEditor = ({ questions }: Props) => {
  return (
    <Card>
      <div className="w-full p-8">
        <div
          className="prose prose-sm max-w-none text-foreground pb-6 text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: questions.question_text }}
        />
      </div>
      <div className="max-w-[1000px] h-[500px] ">
        <Tldraw
          overrides={overrides}
          onMount={configureEditor}
          components={components}
        />
      </div>
    </Card>
  );
};

export default CustomTldrawEditor;
