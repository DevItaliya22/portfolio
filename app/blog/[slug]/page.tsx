import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogMarkdown from '@/components/blog/BlogMarkdown';
import {
  bodyWithoutTitle,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
} from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Not found' };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-10">
        <time
          dateTime={post.date}
          className="block text-sm text-neutral-500 dark:text-neutral-500 mb-3"
        >
          {formatPostDate(post.date)}
        </time>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 leading-snug">
          {post.title}
        </h1>
      </header>
      <BlogMarkdown content={bodyWithoutTitle(post)} />
    </article>
  );
}
