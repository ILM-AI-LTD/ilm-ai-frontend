"use client";

import "tldraw/tldraw.css";
// import { Card } from "../ui/card";
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
  // DefaultStylePanel,
  // DefaultStylePanelContent,
  // useRelevantStyles,
  Editor,
  //   // useLocalStorageState,
  //   NoteShapeUtil,
} from "tldraw";
import "tldraw/tldraw.css";
import {
  useState,
  // MouseEvent,
  // PointerEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
// import { Brush } from "lucide-react";
// import { Card } from "@/components/ui/card";

// type Props = {
//   questions: {
//     question_text: string;
//     question_type: string;
//   };
// };

// interface SubmitButtonProps {
//   editor: Editor | null;
//   onSubmit?: (pngBlob: Blob) => void;
// }

// function ToggleableStylePanel() {
//   const [isMinimized, setIsMinimized] = useState<boolean>(false);
//   const styles = useRelevantStyles();

//   const handleExpand = (event: MouseEvent | PointerEvent) => {
//     // console.log("ee ---", event);

//     event.preventDefault();
//     event.stopPropagation();
//     // console.log("Expand button clicked");
//     setIsMinimized(false);
//   };

//   const handleMinimize = (event: MouseEvent | PointerEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
//     // console.log("Minimize button clicked");
//     setIsMinimized(true);
//   };

//   if (isMinimized) {
//     // Minimized state - show only toggle button
//     return (
//       <div className="fixed right-2 top-4 z-[99999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg pointer-events-auto">
//         <button
//           onPointerDown={handleExpand}
//           onMouseDown={handleExpand}
//           className="bg-transparent border-none cursor-pointer text-base p-1 text-gray-700 dark:text-gray-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors pointer-events-auto"
//           title="Expand style panel"
//         >
//           <Brush />
//         </button>
//       </div>
//     );
//   }

//   // Expanded state - show full style panel with minimize button
//   return (
//     <DefaultStylePanel>
//       {/* Custom header with minimize button */}
//       <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//         <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
//           Style
//         </span>
//         <button
//           onPointerDown={handleMinimize}
//           onMouseDown={handleMinimize}
//           className="bg-transparent border-none cursor-pointer text-sm px-1 py-0.5 text-gray-500 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors pointer-events-auto"
//           title="Minimize style panel"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Default style panel content */}
//       <DefaultStylePanelContent styles={styles} />
//     </DefaultStylePanel>
//   );
// }

// Custom Submit Button Component
// function SubmitButton({ editor, onSubmit }: SubmitButtonProps) {
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const handleSubmit = async () => {
//     if (!editor || isSubmitting) return;

//     setIsSubmitting(true);
//     try {
//       // Export the canvas as PNG
//       const pngBlob = await exportToPNG(editor);

//       // Send to API (comment out if you want to test download only)
//       // await sendToAPI(pngBlob);

//       // Call the onSubmit callback if provided
//       if (onSubmit) {
//         onSubmit(pngBlob);
//       }
//     } catch (error) {
//       console.error("❌ Error during submit:", error);
//       alert("Error submitting drawing. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitting}
//         className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
//       >
//         {isSubmitting ? (
//           <>
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//             Submitting...
//           </>
//         ) : (
//           <>Submit Drawing</>
//         )}
//       </button>
//     </div>
//   );
// }

// Function to export canvas as PNG (Fixed version)
async function exportToPNG(editor: Editor): Promise<Blob> {
  try {
    // Method 1: Use Tldraw's built-in exportToBlob method
    const shapeIds = [...editor.getCurrentPageShapeIds()];

    if (shapeIds.length === 0) {
      console.warn("⚠️ No shapes on canvas to export");
      // Create a small blank PNG if no shapes
      // const canvas = document.createElement("canvas");
      // canvas.width = 800;
      // canvas.height = 600;
      // const ctx = canvas.getContext("2d");
      // ctx.fillStyle = "white";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      // return new Promise((resolve) => {
      //   canvas.toBlob(resolve, "image/png");
      // });
      return createBlankPNG(800, 600);
    }

    const svgElement = await editor.getSvg(shapeIds, {
      background: true,
      padding: 16,
      scale: 2, // Higher scale for better quality
      bounds: null,
    });

    if (!svgElement) {
      throw new Error("getSvg returned null or undefined");
    }

    // Convert SVG to PNG
    return await convertSvgElementToPng(svgElement);
  } catch (error: any) {
    console.error("❌ Export failed:", error);
    throw new Error(`PNG export failed: ${error.message}`);
  }
}

// Helper function to create blank PNG
function createBlankPNG(width: number, height: number): Promise<Blob> {
  // return new Promise((resolve) => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = width;
  //   canvas.height = height;
  //   const ctx = canvas.getContext("2d");
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(0, 0, width, height);

  //   canvas.toBlob(resolve, "image/png");
  // });
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to create blank PNG blob"));
      }
    }, "image/png");
  });
}

async function convertSvgElementToPng(svgElement: SVGElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Get dimensions from SVG
      const width = parseInt(svgElement.getAttribute("width")) || 800;
      const height = parseInt(svgElement.getAttribute("height")) || 600;

      console.log("🖼️ Converting SVG to PNG, dimensions:", { width, height });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      // Create image element
      const img = new Image();

      img.onload = () => {
        try {
          console.log("✅ SVG image loaded successfully");

          // Fill white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);

          // Draw the SVG
          ctx.drawImage(img, 0, 0, width, height);

          console.log("🎨 Image drawn to canvas");

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                console.log(
                  "✅ PNG blob created successfully, size:",
                  (blob.size / 1024).toFixed(2) + " KB"
                );
                resolve(blob);
              } else {
                reject(new Error("Failed to create PNG blob from canvas"));
              }
            },
            "image/png",
            0.95
          );
        } catch (drawError) {
          console.error("❌ Error drawing to canvas:", drawError);
          reject(new Error(`Failed to draw SVG: ${drawError.message}`));
        }
      };

      img.onerror = (error) => {
        console.error("❌ Error loading SVG image:", error);
        reject(new Error("Failed to load SVG image - SVG might be malformed"));
      };

      // Convert SVG to data URL with proper encoding
      try {
        // Clone the SVG to avoid modifying the original
        const clonedSvg = svgElement.cloneNode(true);

        // Ensure proper SVG namespace
        clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clonedSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

        // Serialize to string
        const svgString = new XMLSerializer().serializeToString(clonedSvg);
        console.log("📄 SVG string length:", svgString.length);
        console.log("🔍 SVG preview:", svgString.substring(0, 200) + "...");

        // Create data URL
        const svgDataUrl =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

        console.log("🔗 Setting image source...");
        img.src = svgDataUrl;
      } catch (serializeError) {
        console.error("❌ Error serializing SVG:", serializeError);
        reject(new Error(`Failed to serialize SVG: ${serializeError.message}`));
      }
    } catch (setupError) {
      console.error("❌ Error setting up conversion:", setupError);
      reject(new Error(`Setup failed: ${setupError.message}`));
    }
  });
}

// async function sendToAPI(pngBlob: Blob): Promise<any> {
//   console.log("png blob ----------", pngBlob);

//   const formData = new FormData();
//   formData.append("image", pngBlob);
//   formData.append(
//     "question",
//     "Explain why the total energy in a closed system does not decrease, even when energy appears to be “lost” as heat or sound."
//   );
//   formData.append(
//     "correct_answer",
//     "The total energy remains constant because, according to the Law of Conservation of Energy, energy cannot be destroyed—energy that seems “lost” is actually transferred or transformed (e.g., into heat or sound), but the overall amount stays the same."
//   );

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_STREAM_URL}/questions/evaluate-answer-from-image`,
//       {
//         // Replace with your API endpoint
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZhNDdkOGRiZGM3NWRhYjZiNjZjMTAiLCJ0eXBlIjoiY2hpbGQiLCJpYXQiOjE3NTI3NjAwMTQsImV4cCI6MTc1MzM2NDgxNH0.h8EkAwK3deuDk2YeGiN2p7pJUhG80XEq7kEF3GWiKR8"}`,
//           // Don't set Content-Type when using FormData - let browser set it
//         },
//         body: formData,
//       }
//     );

//     // const response = await apiRequest(
//     //   `${process.env.NEXT_PUBLIC_API_BRAIN_URL}/questions/evaluate-answer-from-image`,
//     //   {
//     //     method: "POST",
//     //     data: formData,
//     //   }
//     // );
//     // return response.data;

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("API Response:", result);
//     return result;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw error;
//   }
// }

const components: TLUiComponents = {
  // StylePanel: ToggleableStylePanel,
  StylePanel: null,
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  PageMenu: null,
  NavigationPanel: null,
  // Toolbar: null,
  RichTextToolbar: null,
  ImageToolbar: null,
  VideoToolbar: null,
  KeyboardShortcutsDialog: null,
  QuickActions: null,
  HelperButtons: null,
  DebugPanel: null,
  DebugMenu: null,
  // MenuPanel: null,
  TopPanel: null,
  SharePanel: null,
  CursorChatBubble: null,
  Dialogs: null,
  Toasts: null,
  A11y: null,
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
  tools: (_editor, tools) => {
    // console.log("Available tools:", Object.keys(tools));

    delete tools.arrow;
    delete tools.note;
    delete tools.asset;
    delete tools.rectangle;
    delete tools.ellipse;
    delete tools.triangle;
    delete tools.diamond;
    delete tools.oval;
    delete tools.rhombus;
    delete tools.hexagon;
    delete tools.star;
    delete tools.cloud;
    delete tools.heart;
    delete tools.line;
    delete tools.highlight;
    delete tools.laser;
    delete tools.frame;

    delete tools["x-box"];
    delete tools["check-box"];
    delete tools["arrow-left"];
    delete tools["arrow-up"];
    delete tools["arrow-down"];
    delete tools["arrow-right"];
    return tools;
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
export interface CustomTldrawEditorRef {
  exportToPNG: () => Promise<Blob>;
}

const CustomTldrawEditor = forwardRef<CustomTldrawEditorRef>((props, ref) => {
  const [editor, setEditor] = useState<Editor | null>(null);

  const handleMount = (editorInstance: Editor) => {
    setEditor(editorInstance);
    configureEditor(editorInstance);
  };

  // Expose the exportToPNG method to parent component
  useImperativeHandle(ref, () => ({
    exportToPNG: async () => {
      if (!editor) {
        throw new Error("Editor not initialized");
      }
      return await exportToPNG(editor);
    },
  }));

  return (
    <div className="relative">
      <div className="w-full h-[500px]">
        <Tldraw
          overrides={overrides}
          onMount={handleMount}
          components={components}
        />
      </div>
    </div>
  );
});

CustomTldrawEditor.displayName = "CustomTldrawEditor";

export default CustomTldrawEditor;
