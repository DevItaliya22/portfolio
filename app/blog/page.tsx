import type { Metadata } from 'next';
import Link from 'next/link';
import { formatPostDate, getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on local-first software, sync engines, and how products like Linear actually work.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
        writing
      </h1>
      <p className="text-neutral-600 dark:text-neutral-500 mb-10 leading-relaxed">
        local-first, sync engines, and the guts of tools that feel instant.
      </p>
      <ul className="space-y-0">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border-b border-neutral-200 dark:border-neutral-800/50 last:border-0 py-6 first:pt-0"
          >
            <time
              dateTime={post.date}
              className="block text-sm text-neutral-500 dark:text-neutral-500 mb-2"
            >
              {formatPostDate(post.date)}
            </time>
            <h2 className="text-lg font-semibold mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-white transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-500 leading-relaxed">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
