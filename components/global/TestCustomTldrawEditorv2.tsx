"use client";

import "tldraw/tldraw.css";
import { Card } from "../ui/card";
// import { useCallback } from "react";
// import { useEffect } from "react";
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
// import { apiRequest } from "@/utils/axios";
// import { useCallback } from "react";

type Props = {
  questions: {
    question_text: string;
    question_type: string;
  };
};

// const CustomTldrawEditor = ({ questions }: Props) => {
//   return (
//     <Card>
//       <div className="w-full p-8">
//         <div
//           className="prose prose-sm max-w-none text-foreground pb-6 text-2xl font-bold"
//           dangerouslySetInnerHTML={{ __html: questions.question_text }}
//         />
//         <div style={{ height: "50vh", width: "1366px" }}>
//           <Tldraw />
//         </div>
//       </div>
//     </Card>
//   );
// };

// const CAMERA_OPTIONS: TLCameraOptions = {
//   isLocked: false,
//   wheelBehavior: "pan",
//   panSpeed: 1,
//   zoomSpeed: 1,
//   zoomSteps: [0.1, 0.25, 0.5, 1, 2, 4, 8],
//   constraints: {
//     initialZoom: "fit-max",
//     baseZoom: "fit-max",
//     bounds: {
//       x: 0,
//       y: 0,
//       w: 1600,
//       h: 900,
//     },
//     behavior: { x: "contain", y: "contain" },
//     padding: { x: 100, y: 100 },
//     origin: { x: 0.5, y: 0.5 },
//   },
// };

// const BOUNDS_SIZES: Record<string, BoxModel> = {
//   a4: { x: 0, y: 0, w: 1050, h: 1485 },
//   landscape: { x: 0, y: 0, w: 1600, h: 900 },
//   portrait: { x: 0, y: 0, w: 900, h: 1600 },
//   square: { x: 0, y: 0, w: 900, h: 900 },
// };

// function LockZoomAndScroll() {
//   const editor = useEditor();

//   // Lock zoom and restrict scrolling to Y-axis
//   useCallback(() => {
//     // Set fixed zoom (1.0 = 100%)
//     editor.setCamera({ x: 0, y: 0, z: 1 });

//     // Prevent zooming
//     editor.setZoomBounds({ min: 1, max: 1 });

//     // Lock X-axis scrolling
//     editor.on("tick", () => {
//       const { x, y } = editor.getCamera();
//       editor.setCamera({ x: 0, y, z: 1 }); // Reset X to 0 on every frame
//     });
//   }, [editor]);

//   return null;
// }

// const shapeUtils = [NoteShapeUtil.configure({ resizeMode: "none" })];

// const PaddingDisplay = track(() => {
//   const editor = useEditor();
//   const cameraOptions = editor.getCameraOptions();

//   if (!cameraOptions.constraints) return null;

//   const {
//     constraints: {
//       padding: { x: px, y: py },
//     },
//   } = cameraOptions;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: py,
//         left: px,
//         width: `calc(100% - ${px * 2}px)`,
//         height: `calc(100% - ${py * 2}px)`,
//         border: "1px dotted var(--color-text)",
//         pointerEvents: "none",
//       }}
//     />
//   );
// });

// const BoundsDisplay = track(() => {
//   const editor = useEditor();
//   const cameraOptions = editor.getCameraOptions();

//   if (!cameraOptions.constraints) return null;

//   const {
//     constraints: {
//       bounds: { x, y, w, h },
//     },
//   } = cameraOptions;

//   const d = Vec.ToAngle({ x: w, y: h }) * (180 / Math.PI);
//   const colB = "#00000002";
//   const colA = "#0000001F";

//   return (
//     <>
//       <div
//         style={{
//           position: "absolute",
//           top: y,
//           left: x,
//           width: w,
//           height: h,
//           // grey and white stripes
//           border: "1px dashed var(--color-text)",
//           backgroundImage: `

// 				`,
//           backgroundSize: "200px 200px",
//           backgroundPosition: "0 0, 0 100px, 100px -100px, -100px 0px",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundImage: `
// 						linear-gradient(0deg, ${colB} 0%, ${colA} 50%, ${colB} 50%, ${colA} 100%),
// 						linear-gradient(90deg, ${colB} 0%, ${colA} 50%, ${colB} 50%, ${colA} 100%),
// 						linear-gradient(${d}deg, ${colB} 0%, ${colA} 50%, ${colB} 50%, ${colA} 100%),
// 						linear-gradient(-${d}deg, ${colB} 0%, ${colA} 50%, ${colB} 50%, ${colA} 100%)`,
//           }}
//         ></div>
//       </div>
//     </>
//   );
// });

// const components = {
//   // These components are just included for debugging / visualization!
//   OnTheCanvas: BoundsDisplay,
//   InFrontOfTheCanvas: PaddingDisplay,
// };

// const CameraOptionsControlPanel = track(() => {
//   const editor = useEditor();

//   const [cameraOptions, setCameraOptions] = useLocalStorageState(
//     "camera ex1",
//     CAMERA_OPTIONS
//   );

//   useEffect(() => {
//     if (!editor) return;
//     editor.run(() => {
//       editor.setCameraOptions(cameraOptions);
//       editor.setCamera(editor.getCamera(), {
//         immediate: true,
//       });
//     });
//   }, [editor, cameraOptions]);

//   const { constraints } = cameraOptions;

//   const updateOptions = (
//     options: Partial<
//       Omit<TLCameraOptions, "constraints"> & {
//         constraints: Partial<TLCameraOptions["constraints"]>;
//       }
//     >
//   ) => {
//     const { constraints } = options;
//     const cameraOptions = editor.getCameraOptions();
//     setCameraOptions({
//       ...cameraOptions,
//       ...options,
//       constraints:
//         constraints === undefined
//           ? cameraOptions.constraints
//           : {
//               ...(cameraOptions.constraints! ?? CAMERA_OPTIONS.constraints),
//               ...constraints,
//             },
//     });
//   };

//   return (
//     <div
//       style={{
//         pointerEvents: "all",
//         position: "absolute",
//         top: 500,
//         left: 0,
//         padding: 4,
//         background: "white",
//         zIndex: 1000000,
//       }}
//     >
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "auto 1fr",
//           columnGap: 12,
//           rowGap: 4,
//           marginBottom: 12,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <label htmlFor="lock">Lock</label>
//         <select
//           name="lock"
//           value={cameraOptions.isLocked ? "true" : "false"}
//           onChange={(e) => {
//             const value = e.target.value;
//             updateOptions({
//               ...CAMERA_OPTIONS,
//               isLocked: value === "true",
//             });
//           }}
//         >
//           <option value="true">true</option>
//           <option value="false">false</option>
//         </select>
//         <label htmlFor="wheelBehavior">Wheel behavior</label>
//         <select
//           name="wheelBehavior"
//           value={cameraOptions.wheelBehavior}
//           onChange={(e) => {
//             const value = e.target.value;
//             updateOptions({
//               ...CAMERA_OPTIONS,
//               wheelBehavior: value as "zoom" | "pan",
//             });
//           }}
//         >
//           <option>zoom</option>
//           <option>pan</option>
//         </select>
//         <label htmlFor="panspeed">Pan Speed</label>
//         <input
//           name="panspeed"
//           type="number"
//           step={0.1}
//           value={cameraOptions.panSpeed}
//           onChange={(e) => {
//             const val = clamp(Number(e.target.value), 0, 2);
//             updateOptions({ panSpeed: val });
//           }}
//         />
//         <label htmlFor="zoomspeed">Zoom Speed</label>
//         <input
//           name="zoomspeed"
//           type="number"
//           step={0.1}
//           value={cameraOptions.zoomSpeed}
//           onChange={(e) => {
//             const val = clamp(Number(e.target.value), 0, 2);
//             updateOptions({ zoomSpeed: val });
//           }}
//         />
//         <label htmlFor="zoomsteps">Zoom Steps</label>
//         <input
//           name="zoomsteps"
//           type="text"
//           defaultValue={cameraOptions.zoomSteps.join(", ")}
//           onChange={(e) => {
//             try {
//               const val = e.target.value.split(", ").map((v) => Number(v));
//               if (
//                 val.every((v) => typeof v === "number" && Number.isFinite(v))
//               ) {
//                 updateOptions({ zoomSteps: val });
//               }
//             } catch {
//               // ignore
//             }
//           }}
//         />
//         <label htmlFor="bounds">Bounds</label>
//         <select
//           name="bounds"
//           value={
//             Object.entries(BOUNDS_SIZES).find(
//               ([_, b]) => b.w === constraints?.bounds.w
//             )?.[0] ?? "none"
//           }
//           onChange={(e) => {
//             const currentConstraints =
//               constraints ?? CAMERA_OPTIONS.constraints;
//             const value = e.target.value;

//             if (value === "none") {
//               updateOptions({
//                 ...CAMERA_OPTIONS,
//                 constraints: undefined,
//               });
//               return;
//             }

//             updateOptions({
//               ...CAMERA_OPTIONS,
//               constraints: {
//                 ...currentConstraints,
//                 bounds: BOUNDS_SIZES[value] ?? BOUNDS_SIZES.a4,
//               },
//             });
//           }}
//         >
//           <option value="none">none</option>
//           <option value="a4">A4 Page</option>
//           <option value="portrait">Portait</option>
//           <option value="landscape">Landscape</option>
//           <option value="square">Square</option>
//         </select>
//         {constraints ? (
//           <>
//             <label htmlFor="initialZoom">Initial Zoom</label>
//             <select
//               name="initialZoom"
//               value={constraints.initialZoom}
//               onChange={(e) => {
//                 updateOptions({
//                   constraints: {
//                     ...constraints,
//                     initialZoom: e.target.value as any,
//                   },
//                 });
//               }}
//             >
//               <option>fit-min</option>
//               <option>fit-max</option>
//               <option>fit-x</option>
//               <option>fit-y</option>
//               <option>fit-min-100</option>
//               <option>fit-max-100</option>
//               <option>fit-x-100</option>
//               <option>fit-y-100</option>
//               <option>default</option>
//             </select>
//             <label htmlFor="zoomBehavior">Base Zoom</label>
//             <select
//               name="zoomBehavior"
//               value={constraints.baseZoom}
//               onChange={(e) => {
//                 updateOptions({
//                   constraints: {
//                     ...constraints,
//                     baseZoom: e.target.value as any,
//                   },
//                 });
//               }}
//             >
//               <option>fit-min</option>
//               <option>fit-max</option>
//               <option>fit-x</option>
//               <option>fit-y</option>
//               <option>fit-min-100</option>
//               <option>fit-max-100</option>
//               <option>fit-x-100</option>
//               <option>fit-y-100</option>
//               <option>default</option>
//             </select>
//             <label htmlFor="originX">Origin X</label>
//             <input
//               name="originX"
//               type="number"
//               step={0.1}
//               value={constraints.origin.x}
//               onChange={(e) => {
//                 const val = clamp(Number(e.target.value), 0, 1);
//                 updateOptions({
//                   constraints: {
//                     origin: {
//                       ...constraints.origin,
//                       x: val,
//                     },
//                   },
//                 });
//               }}
//             />
//             <label htmlFor="originY">Origin Y</label>
//             <input
//               name="originY"
//               type="number"
//               step={0.1}
//               value={constraints.origin.y}
//               onChange={(e) => {
//                 const val = clamp(Number(e.target.value), 0, 1);
//                 updateOptions({
//                   constraints: {
//                     ...constraints,
//                     origin: {
//                       ...constraints.origin,
//                       y: val,
//                     },
//                   },
//                 });
//               }}
//             />
//             <label htmlFor="paddingX">Padding X</label>
//             <input
//               name="paddingX"
//               type="number"
//               step={10}
//               value={constraints.padding.x}
//               onChange={(e) => {
//                 const val = clamp(Number(e.target.value), 0);
//                 updateOptions({
//                   constraints: {
//                     ...constraints,
//                     padding: {
//                       ...constraints.padding,
//                       x: val,
//                     },
//                   },
//                 });
//               }}
//             />
//             <label htmlFor="paddingY">Padding Y</label>
//             <input
//               name="paddingY"
//               type="number"
//               step={10}
//               value={constraints.padding.y}
//               onChange={(e) => {
//                 const val = clamp(Number(e.target.value), 0);
//                 updateOptions({
//                   constraints: {
//                     padding: {
//                       ...constraints.padding,
//                       y: val,
//                     },
//                   },
//                 });
//               }}
//             />
//             <label htmlFor="behaviorX">Behavior X</label>
//             <select
//               name="behaviorX"
//               value={(constraints.behavior as { x: any; y: any }).x}
//               onChange={(e) => {
//                 setCameraOptions({
//                   ...cameraOptions,
//                   constraints: {
//                     ...constraints,
//                     behavior: {
//                       ...(constraints.behavior as { x: any; y: any }),
//                       x: e.target.value as any,
//                     },
//                   },
//                 });
//               }}
//             >
//               <option>free</option>
//               <option>contain</option>
//               <option>inside</option>
//               <option>outside</option>
//               <option>fixed</option>
//             </select>
//             <label htmlFor="behaviorY">Behavior Y</label>
//             <select
//               name="behaviorY"
//               value={(constraints.behavior as { x: any; y: any }).y}
//               onChange={(e) => {
//                 setCameraOptions({
//                   ...cameraOptions,
//                   constraints: {
//                     ...constraints,
//                     behavior: {
//                       ...(constraints.behavior as { x: any; y: any }),
//                       y: e.target.value as any,
//                     },
//                   },
//                 });
//               }}
//             >
//               <option>free</option>
//               <option>contain</option>
//               <option>inside</option>
//               <option>outside</option>
//               <option>fixed</option>
//             </select>
//           </>
//         ) : null}
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//         <button
//           onClick={() => {
//             editor.setCamera(editor.getCamera(), { reset: true });
//             // eslint-disable-next-line no-console
//             console.log(editor.getCameraOptions());
//           }}
//         >
//           Reset Camera
//         </button>
//         <button
//           onClick={() => {
//             updateOptions(CAMERA_OPTIONS);
//           }}
//         >
//           Reset Camera Options
//         </button>
//       </div>
//     </div>
//   );
// });

// function onMount(editor: ReturnType<typeof useEditor>) {
//   editor.updateInstanceState({
//     camera: {
//       constraints: {
//         behavior: "fixed", // Lock canvas position in viewport
//         bounds: {
//           x: 0,
//           y: 0,
//           w: 1000,
//           h: 500,
//         },
//         origin: { x: 0, y: 0 }, // Align top-left corner
//         initialZoom: "default",
//       },
//     },
//   });

//   // Optionally center the camera on the fixed bounds
//   editor.zoomToBounds({
//     x: 0,
//     y: 0,
//     w: 1000,
//     h: 500,
//   });
// }

// ====================================================
// function ToggleableStylePanel(props) {
//   const [isMinimized, setIsMinimized] = useState(false);
//   const styles = useRelevantStyles();

//   if (isMinimized) {
//     // Minimized state - show only toggle button
//     return (
//       <div
//         style={{
//           position: "fixed",
//           right: "8px",
//           top: "50%",
//           transform: "translateY(-50%)",
//           zIndex: 1000,
//           backgroundColor: "var(--color-panel)",
//           border: "1px solid var(--color-border)",
//           borderRadius: "8px",
//           padding: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//         }}
//       >
//         <button
//           onClick={() => setIsMinimized(false)}
//           style={{
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             fontSize: "16px",
//             padding: "4px",
//             color: "var(--color-text)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           title="Expand style panel"
//         >
//           ⚙️
//         </button>
//       </div>
//     );
//   }

//   // Expanded state - show full style panel with minimize button
//   return (
//     <DefaultStylePanel {...props}>
//       {/* Custom header with minimize button */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "8px 12px",
//           borderBottom: "1px solid var(--color-border)",
//           backgroundColor: "var(--color-muted-2)",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "12px",
//             fontWeight: "500",
//             color: "var(--color-text-2)",
//           }}
//         >
//           Style
//         </span>
//         <button
//           onClick={() => setIsMinimized(true)}
//           style={{
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             fontSize: "14px",
//             padding: "2px 4px",
//             color: "var(--color-text-2)",
//             borderRadius: "4px",
//           }}
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

// Custom Submit Button Component
function SubmitButton({ editor, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [lastDownload, setLastDownload] = useState<any>(null);

  const handleSubmit = async () => {
    if (!editor || isSubmitting) return;

    setIsSubmitting(true);
    try {
      console.log("🎨 Starting PNG export...");

      // Export the canvas as PNG
      const pngBlob = await exportToPNG(editor);

      console.log("✅ PNG export successful!");
      console.log("📊 Image details:", {
        size: `${(pngBlob.size / 1024).toFixed(2)} KB`,
        type: pngBlob.type,
        timestamp: new Date().toISOString(),
      });

      // Generate filename with timestamp
      // const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      // const filename = `drawing-${timestamp}.png`;

      // Download the PNG
      // downloadPNG(pngBlob, filename);

      // Update last download info for UI feedback
      // setLastDownload({
      //   filename,
      //   size: pngBlob.size,
      //   time: new Date().toLocaleTimeString(),
      // });

      // Optional: Create a preview URL for verification
      const previewUrl = URL.createObjectURL(pngBlob);
      console.log("🖼️ Preview URL (paste in browser):", previewUrl);

      // Send to API (comment out if you want to test download only)
      await sendToAPI(pngBlob);

      // Uncomment the line above and comment this one when ready for API
      console.log("🚀 API call skipped - testing download only");

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(pngBlob);
      }
    } catch (error) {
      console.error("❌ Error during submit:", error);
      alert("Error submitting drawing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Submitting...
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Submit Drawing
          </>
        )}
      </button>

      {/* Download confirmation feedback */}
      {/* {lastDownload && (
        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border">
          ✅ Downloaded: {lastDownload.filename}
          <br />
          📁 Size: {(lastDownload.size / 1024).toFixed(2)} KB
          <br />⏰ Time: {lastDownload.time}
        </div>
      )} */}
    </div>
  );
}

// Function to export canvas as PNG (Fixed version)
async function exportToPNG(editor) {
  try {
    // Method 1: Use Tldraw's built-in exportToBlob method
    const shapeIds = [...editor.getCurrentPageShapeIds()];

    if (shapeIds.length === 0) {
      console.warn("⚠️ No shapes on canvas to export");
      // Create a small blank PNG if no shapes
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      return new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });
    }

    console.log("📝 Found shapes to export:", shapeIds.length);

    // Try the built-in exportToBlob method first
    try {
      const blob = await editor.exportToBlob({
        ids: shapeIds,
        format: "png",
        opts: {
          background: true,
          padding: 16,
          scale: 1,
        },
      });

      console.log("✅ Export successful with exportToBlob");
      return blob;
    } catch (exportError) {
      console.warn(
        "⚠️ exportToBlob failed, trying alternative method:",
        exportError.message
      );

      // Alternative method: Use getSvg and convert
      const svg = await editor.getSvg(shapeIds, {
        background: true,
        padding: 16,
        scale: 1,
      });

      return await convertSvgToPng(svg);
    }
  } catch (error) {
    console.error("❌ Export failed:", error);
    throw new Error(`PNG export failed: ${error.message}`);
  }
}

// Helper function to convert SVG to PNG
async function convertSvgToPng(svgElement) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Get SVG dimensions
    const svgRect = svgElement.getBoundingClientRect();
    const svgWidth = svgRect.width || 800;
    const svgHeight = svgRect.height || 600;

    canvas.width = svgWidth;
    canvas.height = svgHeight;

    // Create image from SVG
    const img = new Image();

    img.onload = () => {
      try {
        // Fill white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the SVG
        ctx.drawImage(img, 0, 0);

        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob) {
            console.log("✅ SVG to PNG conversion successful");
            resolve(blob);
          } else {
            reject(new Error("Failed to create PNG blob from canvas"));
          }
        }, "image/png");
      } catch (drawError) {
        reject(new Error(`Failed to draw SVG: ${drawError.message}`));
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load SVG image"));
    };

    // Convert SVG to data URL
    try {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgDataUrl =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svgString)));
      img.src = svgDataUrl;
    } catch (serializeError) {
      reject(new Error(`Failed to serialize SVG: ${serializeError.message}`));
    }
  });
}

// Function to download PNG with verification
// function downloadPNG(blob, filename) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;

//   // Add event listeners to verify download
//   a.addEventListener("click", () => {
//     console.log("✅ Download initiated for:", filename);
//     console.log("📁 File size:", (blob.size / 1024).toFixed(2) + " KB");
//     console.log("🔗 Download URL:", url);
//   });

//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   // Clean up the URL after a short delay
//   setTimeout(() => {
//     URL.revokeObjectURL(url);
//     console.log("🧹 Cleaned up download URL");
//   }, 1000);
// }

// Function to send PNG to API
async function sendToAPI(pngBlob) {
  const formData = new FormData();
  formData.append("image", pngBlob);
  formData.append(
    "question",
    "Explain why the total energy in a closed system does not decrease, even when energy appears to be “lost” as heat or sound."
  );
  formData.append(
    "correct_answer",
    "The total energy remains constant because, according to the Law of Conservation of Energy, energy cannot be destroyed—energy that seems “lost” is actually transferred or transformed (e.g., into heat or sound), but the overall amount stays the same."
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BRAIN_URL}/questions/evaluate-answer-from-image`,
      {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZhNDdkOGRiZGM3NWRhYjZiNjZjMTAiLCJ0eXBlIjoiY2hpbGQiLCJpYXQiOjE3NTI3NjAwMTQsImV4cCI6MTc1MzM2NDgxNH0.h8EkAwK3deuDk2YeGiN2p7pJUhG80XEq7kEF3GWiKR8"}`,
          // Don't set Content-Type when using FormData - let browser set it
        },
        body: formData,
      }
    );

    // const response = await apiRequest(
    //   `${process.env.NEXT_PUBLIC_API_BRAIN_URL}/questions/evaluate-answer-from-image`,
    //   {
    //     method: "POST",
    //     data: formData,
    //   }
    // );
    // return response.data;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

const components: TLUiComponents = {
  StylePanel: ToggleableStylePanel,
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
  // QuickActions: null,
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

  // Optionally zoom to top part of the canvas
  // editor.zoomToBounds({
  //   x: 0,
  //   y: 0,
  //   w: 1000,
  //   h: 500,
  // });

  // editor.updateInstanceState({ canZoom: false });

  // // Optionally: set a fixed zoom level
  // editor.setZoom(1); // 100%

  // // Optionally: lock the zoom entirely (override camera zoom methods)
  // const blockZoom = () => editor.stopCameraAnimation();

  // editor.zoomIn = blockZoom;
  // editor.zoomOut = blockZoom;
  // editor.resetZoom = blockZoom;
  // editor.zoomToFit = blockZoom;

  // // Optional: override gesture-based zoom events
  // editor.getContainer()?.addEventListener(
  //   "wheel",
  //   (e) => {
  //     if (e.ctrlKey || e.metaKey) e.preventDefault();
  //   },
  //   { passive: false }
  // );
}

const CustomTldrawEditor = ({ questions }: Props) => {
  const [editor, setEditor] = useState(null);

  const handleMount = (editorInstance) => {
    setEditor(editorInstance);
    configureEditor(editorInstance);
  };

  const handleSubmit = (pngBlob) => {
    console.log("Drawing submitted successfully!");
    // You can add additional logic here, like showing a success message
  };

  return (
    <Card>
      <div className="w-full p-8">
        <div
          className="prose prose-sm max-w-none text-foreground pb-6 text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: questions.question_text }}
        />
      </div>
      <div className="max-w-[1000px] h-[500px]">
        <Tldraw
          overrides={overrides}
          onMount={handleMount}
          components={components}
        />
        {/* Submit button positioned absolutely */}
        {/* <div className="absolute bottom-4 left-30 z-[99999]"> */}
      </div>

      <div className="flex justify-center ">
        <SubmitButton editor={editor} onSubmit={handleSubmit} />
        {/* <div className="flex gap-1">
            <button
              onClick={async () => {
                if (!editor) return;
                try {
                  console.log(
                    "🔍 Debug: Editor methods available:",
                    Object.getOwnPropertyNames(editor)
                  );
                  console.log("📊 Current page shapes:", [
                    ...editor.getCurrentPageShapeIds(),
                  ]);
                  console.log("📄 Current page:", editor.getCurrentPage());

                  // Test if exportToBlob exists
                  if (typeof editor.exportToBlob === "function") {
                    console.log("✅ exportToBlob method exists");
                  } else {
                    console.log("❌ exportToBlob method NOT found");
                  }

                  // Test if getSvg exists
                  if (typeof editor.getSvg === "function") {
                    console.log("✅ getSvg method exists");
                  } else {
                    console.log("❌ getSvg method NOT found");
                  }
                } catch (error) {
                  console.error("Debug failed:", error);
                }
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-2 rounded-lg transition-colors duration-200 text-xs"
              title="Debug editor methods"
            >
              🔍
            </button>

            <button
              onClick={async () => {
                if (!editor) return;
                try {
                  const pngBlob = await exportToPNG(editor);
                  const filename = `test-download-${Date.now()}.png`;
                  downloadPNG(pngBlob, filename);
                  console.log("🧪 Test download completed!");
                } catch (error) {
                  console.error("Test download failed:", error);
                }
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
              title="Test download only (no API call)"
            >
              📥 Test
            </button>
          </div> */}
      </div>
    </Card>
  );
};

export default CustomTldrawEditor;
