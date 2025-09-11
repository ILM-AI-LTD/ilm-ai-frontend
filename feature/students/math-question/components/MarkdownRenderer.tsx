import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

const extractLatexBlocks = (text: string) => {
  const parts: { content: string; isLatex: boolean; isComplete: boolean }[] =
    [];
  let buffer = "";
  let isInLatex = false;
  let latexBuffer = "";

  const lines = text.split("\n");

  for (let line of lines) {
    if (line.trim().startsWith("$$")) {
      if (isInLatex) {
        // Closing block
        latexBuffer += "\n" + line;
        parts.push({ content: latexBuffer, isLatex: true, isComplete: true });
        latexBuffer = "";
        isInLatex = false;
      } else {
        // Opening block
        if (buffer) {
          parts.push({ content: buffer, isLatex: false, isComplete: true });
          buffer = "";
        }
        isInLatex = true;
        latexBuffer = line;
      }
    } else if (isInLatex) {
      latexBuffer += "\n" + line;
    } else {
      buffer += (buffer ? "\n" : "") + line;
    }
  }

  // for (let line of lines) {
  //   if (line.trim().startsWith("$$")) {
  //     if (isInLatex) {
  //       // Closing block
  //       latexBuffer += "\n" + line;
  //       parts.push({ content: latexBuffer, isLatex: true, isComplete: true });
  //       latexBuffer = "";
  //       isInLatex = false;
  //     } else {
  //       // Check if it's a single-line LaTeX block (starts and ends with $$)
  //       const trimmedLine = line.trim();
  //       if (
  //         trimmedLine.startsWith("$$") &&
  //         trimmedLine.endsWith("$$") &&
  //         trimmedLine.length > 4
  //       ) {
  //         // Single-line LaTeX block
  //         if (buffer) {
  //           parts.push({ content: buffer, isLatex: false, isComplete: true });
  //           buffer = "";
  //         }
  //         parts.push({ content: line, isLatex: true, isComplete: true });
  //       } else {
  //         // Multi-line LaTeX block opening
  //         if (buffer) {
  //           parts.push({ content: buffer, isLatex: false, isComplete: true });
  //           buffer = "";
  //         }
  //         isInLatex = true;
  //         latexBuffer = line;
  //       }
  //     }
  //   } else if (isInLatex) {
  //     latexBuffer += "\n" + line;
  //   } else {
  //     buffer += (buffer ? "\n" : "") + line;
  //   }
  // }

  if (buffer) parts.push({ content: buffer, isLatex: false, isComplete: true });
  if (latexBuffer)
    parts.push({ content: latexBuffer, isLatex: true, isComplete: false });

  return parts;
};

// const extractLatexBlocks = (text: string) => {
//   const parts: { content: string; isLatex: boolean; isComplete: boolean }[] =
//     [];

//   // Handle multi-line $$ blocks first (traditional block format)
//   const lines = text.split("\n");
//   let processedText = "";
//   let isInMultilineLatex = false;
//   let latexBuffer = "";

//   for (let line of lines) {
//     const trimmedLine = line.trim();

//     if (trimmedLine === "$$") {
//       if (isInMultilineLatex) {
//         // Closing multi-line block
//         latexBuffer += "\n$$";
//         parts.push({ content: latexBuffer, isLatex: true, isComplete: true });
//         latexBuffer = "";
//         isInMultilineLatex = false;
//       } else {
//         // Opening multi-line block
//         if (processedText.trim()) {
//           // Process any accumulated text for inline LaTeX
//           parts.push(...parseInlineLatex(processedText));
//           processedText = "";
//         }
//         isInMultilineLatex = true;
//         latexBuffer = "$$";
//       }
//     } else if (isInMultilineLatex) {
//       latexBuffer += "\n" + line;
//     } else {
//       processedText += (processedText ? "\n" : "") + line;
//     }
//   }

//   // Handle any remaining multi-line LaTeX (incomplete)
//   if (latexBuffer) {
//     parts.push({ content: latexBuffer, isLatex: true, isComplete: false });
//   }

//   // Process any remaining text for inline LaTeX
//   if (processedText.trim()) {
//     parts.push(...parseInlineLatex(processedText));
//   }

//   return parts;
// };

// const parseInlineLatex = (
//   text: string
// ): { content: string; isLatex: boolean; isComplete: boolean }[] => {
//   const parts: { content: string; isLatex: boolean; isComplete: boolean }[] =
//     [];
//   let buffer = "";
//   let i = 0;

//   while (i < text.length) {
//     if (i < text.length - 1 && text[i] === "$" && text[i + 1] === "$") {
//       // Found $$ - look for closing $$
//       if (buffer) {
//         parts.push({ content: buffer, isLatex: false, isComplete: true });
//         buffer = "";
//       }

//       let latexContent = "$$";
//       i += 2;
//       let foundClosing = false;

//       while (i < text.length - 1) {
//         latexContent += text[i];
//         if (text[i] === "$" && text[i + 1] === "$") {
//           latexContent += "$";
//           i += 2;
//           foundClosing = true;
//           break;
//         }
//         i++;
//       }

//       parts.push({
//         content: latexContent,
//         isLatex: true,
//         isComplete: foundClosing,
//       });
//     } else if (text[i] === "$") {
//       // Found single $ - look for closing $
//       if (buffer) {
//         parts.push({ content: buffer, isLatex: false, isComplete: true });
//         buffer = "";
//       }

//       let latexContent = "$";
//       i++;
//       let foundClosing = false;

//       while (i < text.length) {
//         latexContent += text[i];
//         if (text[i] === "$") {
//           i++;
//           foundClosing = true;
//           break;
//         }
//         i++;
//       }

//       parts.push({
//         content: latexContent,
//         isLatex: true,
//         isComplete: foundClosing,
//       });
//     } else {
//       buffer += text[i];
//       i++;
//     }
//   }

//   if (buffer) {
//     parts.push({ content: buffer, isLatex: false, isComplete: true });
//   }

//   return parts;
// };

const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(
  ({ content, isStreaming = false }) => {
    console.log("content ----------", content);

    const [renderedContent, setRenderedContent] = useState(content);
    const lastUpdateRef = useRef<number>(0);
    const pendingUpdateRef = useRef<string>(content);

    useEffect(() => {
      pendingUpdateRef.current = content;

      if (isStreaming) {
        const now = Date.now();
        const timeSinceLastUpdate = now - lastUpdateRef.current;

        if (timeSinceLastUpdate >= 50) {
          setRenderedContent(content);
          lastUpdateRef.current = now;
        } else {
          const timeoutId = setTimeout(() => {
            setRenderedContent(pendingUpdateRef.current);
            lastUpdateRef.current = Date.now();
          }, 50 - timeSinceLastUpdate);

          return () => clearTimeout(timeoutId);
        }
      } else {
        setRenderedContent(content);
        lastUpdateRef.current = Date.now();
      }
    }, [content, isStreaming]);

    const markdownComponents = useMemo(
      () => ({
        h1: ({ children }: { children: React.ReactNode }) => (
          <h1 className="text-lg font-bold text-foreground mb-2 mt-1">
            {children}
          </h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
          <h2 className="text-base font-semibold text-foreground mb-2 mt-1">
            {children}
          </h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
          <h3 className="text-sm font-medium text-foreground mb-1 mt-1">
            {children}
          </h3>
        ),
        p: ({ children }: { children: React.ReactNode }) => (
          <p className="text-base text-foreground mb-2 leading-relaxed">
            {children}
          </p>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
          <em className="italic text-foreground">{children}</em>
        ),
        del: ({ children }: { children: React.ReactNode }) => (
          <del className="line-through text-gray-400">{children}</del>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
          <ul className="list-disc list-inside text-sm text-foreground mb-2 space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
          <ol className="list-decimal list-inside text-sm text-foreground mb-2 space-y-1">
            {children}
          </ol>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
          <li className="text-foreground text-base">{children}</li>
        ),
        a: ({
          href,
          children,
        }: {
          href?: string;
          children: React.ReactNode;
        }) => (
          <a
            href={href}
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({
          children,
          className,
        }: {
          children: React.ReactNode;
          className?: string;
        }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-gray-700 text-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            );
          }
          return (
            <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-xs overflow-x-auto mb-2">
              <code className="font-mono">{children}</code>
            </pre>
          );
        },
        pre: ({ children }: { children: React.ReactNode }) => (
          <div className="bg-gray-800 rounded-md mb-2 overflow-hidden">
            {children}
          </div>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => (
          <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300 mb-2">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="border-gray-600 my-3" />,
        table: ({ children }: { children: React.ReactNode }) => (
          <div className="overflow-x-auto mb-2">
            <table className="min-w-full text-sm text-foreground border">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }: { children: React.ReactNode }) => (
          <thead className="bg-secondary">{children}</thead>
        ),
        tbody: ({ children }: { children: React.ReactNode }) => (
          <tbody className="bg-secondary/10">{children}</tbody>
        ),
        tr: ({ children }: { children: React.ReactNode }) => (
          <tr className="border-b border">{children}</tr>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
          <th className="px-3 py-2 text-left font-medium">{children}</th>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
          <td className="px-3 py-2">{children}</td>
        ),
        img: ({ src, alt }: { src?: string; alt?: string }) => (
          <img
            src={src!}
            alt={alt!}
            className="max-w-full h-auto rounded-md mb-2"
          />
        ),
      }),
      []
    );

    const remarkPlugins = useMemo(() => [remarkGfm, remarkMath], []);
    const rehypePlugins = useMemo(() => [rehypeKatex], []);

    return (
      <div className="prose prose-sm prose-invert max-w-none space-y-4">
        {extractLatexBlocks(renderedContent).map((block, idx) => {
          if (block.isLatex) {
            {
              console.log("block ------", block);
            }
            return block.isComplete ? (
              <div className="text-foreground">
                <Markdown
                  key={idx}
                  remarkPlugins={remarkPlugins}
                  rehypePlugins={rehypePlugins}
                  components={markdownComponents as any}
                >
                  {block.content}
                </Markdown>
              </div>
            ) : (
              <div key={idx} className="space-y-2">
                <Skeleton className="h-6 w-11/12 bg-gray-400" />
                <Skeleton className="h-6 w-2/3 bg-gray-400" />
              </div>
            );
          } else {
            return (
              <Markdown
                key={idx}
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={markdownComponents as any}
              >
                {block.content}
              </Markdown>
            );
          }
        })}
      </div>
    );
  }
);

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;
