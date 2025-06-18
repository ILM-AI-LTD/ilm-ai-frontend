// components/MarkdownRenderer.tsx
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-lg font-bold text-white mb-2 mt-1">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-semibold text-white mb-2 mt-1">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-medium text-white mb-1 mt-1">{children}</h3>,
          p: ({ children }) => <p className="text-sm text-white mb-2 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-white">{children}</em>,
          del: ({ children }) => <del className="line-through text-gray-400">{children}</del>,
          ul: ({ children }) => <ul className="list-disc list-inside text-sm text-white mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-white mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-white">{children}</li>,
          a: ({ href, children }) => <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return <code className="bg-gray-700 text-gray-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>;
            }
            return (
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-xs overflow-x-auto mb-2">
                <code className="font-mono">{children}</code>
              </pre>
            );
          },
          pre: ({ children }) => <div className="bg-gray-800 rounded-md mb-2 overflow-hidden">{children}</div>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300 mb-2">{children}</blockquote>,
          hr: () => <hr className="border-gray-600 my-3" />,
          table: ({ children }) => <div className="overflow-x-auto mb-2"><table className="min-w-full text-sm text-white border border-gray-600">{children}</table></div>,
          thead: ({ children }) => <thead className="bg-gray-700">{children}</thead>,
          tbody: ({ children }) => <tbody className="bg-gray-800">{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-600">{children}</tr>,
          th: ({ children }) => <th className="px-3 py-2 text-left font-medium">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2">{children}</td>,
          img: ({ src, alt }) => <img src={src!} alt={alt!} className="max-w-full h-auto rounded-md mb-2" />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;