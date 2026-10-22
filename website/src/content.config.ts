import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** One Markdown file per release, newest first by date. See MAINTENANCE.md. */
const changelog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/changelog' }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date().optional(),
    title: z.string(),
    channel: z.enum(['release', 'pre-release']).default('release'),
    /** Order for releases without a date (oldest first gets the lowest number). */
    order: z.number(),
  }),
});

/** Documentation pages. `order` sets their place in the sidebar. */
const docs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    group: z.enum(['Getting started', 'Using MacPUMP', 'Reference']),
  }),
});

export const collections = { changelog, docs };
