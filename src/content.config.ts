import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['blog', 'notes']),
    tags: z.array(z.string()).default([]),
    sample: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
