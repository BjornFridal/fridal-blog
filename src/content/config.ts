import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      preTitle: z.string().optional().nullable(),
      metaTitle: z.string().optional().nullable(),
      description: z.string(),
      pubDate: z.date().nullable(),
      image: image()
        .refine((img) => img.width >= 1080, {
          message: 'Cover image must be at least 1080 pixels wide!'
        })
        .nullable(),
      ogImage: image()
        .refine((img) => img.width >= 1080, {
          message: 'Cover image must be at least 1080 pixels wide!'
        })
        .optional()
        .nullable(),
      imageAlt: z.string().nullable(),
      teaser: z.string().nullable(),
      tags: z.array(z.string())
    })
});

const resumeCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      date: z.date(),
      highlights: z.array(z.string()),
      skills: z.array(z.string()),
      website: z.string().url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional()
    })
});

export const collections = {
  blog: blogCollection,
  resume: resumeCollection
};
