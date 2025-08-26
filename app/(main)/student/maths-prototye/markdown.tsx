// components/MathRenderer.js
"use client";
import { useEffect, useRef } from "react";

type Props = {
  content: string;
};

const MathRenderer = ({ content }: Props) => {
  const containerRef = useRef();

  useEffect(() => {
    const renderMath = async () => {
      const katex = (await import("katex")).default;

      if (containerRef.current) {
        const parsedContent = content
          .replace(/\$\$(.*?)\$\$/gs, (match, equation) => {
            try {
              return `<div class="math-block">${katex.renderToString(
                equation.trim()
              )}</div>`;
            } catch (e) {
              return `<div class="math-error">${equation}</div>`;
            }
          })
          .replace(/\$(.*?)\$/g, (match, equation) => {
            try {
              return `<span class="math-inline">${katex.renderToString(
                equation.trim()
              )}</span>`;
            } catch (e) {
              return `<span class="math-error">${equation}</span>`;
            }
          });

        containerRef.current.innerHTML = parsedContent;
      }
    };

    renderMath();
  }, [content]);

  return <div ref={containerRef} />;
};

export default MathRenderer;
