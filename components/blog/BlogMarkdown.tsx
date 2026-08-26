import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const linkClass =
  'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2';

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 mt-10 first:mt-0 text-neutral-800 dark:text-neutral-200">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold mb-4 mt-10 first:mt-0 text-neutral-800 dark:text-neutral-200">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold mb-3 mt-8 first:mt-0 text-neutral-800 dark:text-neutral-200">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-relaxed text-neutral-600 dark:text-neutral-400">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc mb-5 ml-5 space-y-2 text-neutral-600 dark:text-neutral-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal mb-5 ml-5 space-y-2 text-neutral-600 dark:text-neutral-400">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-neutral-600 dark:text-neutral-400">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-neutral-700 dark:text-neutral-300">
      {children}
    </em>
  ),
  a: ({ href, children }) => {
    const external = Boolean(href && /^https?:\/\//.test(href));
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={linkClass}
      >
        {children}
      </a>
    );
  },
  code: ({ className, children, ...props }) => {
    const isBlock =
      Boolean(className?.includes('language-')) ||
      String(children).includes('\n');
    if (isBlock) {
      return (
        <code
          className={`font-geist-mono text-[13px] leading-relaxed text-neutral-800 dark:text-neutral-200 ${className ?? ''}`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="font-geist-mono text-[0.85em] bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="font-geist-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 mb-6 overflow-x-auto text-[13px] leading-relaxed text-neutral-800 dark:text-neutral-200">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 my-6 text-neutral-600 dark:text-neutral-400 italic">
      {children}
    </blockquote>
  ),
};

export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
