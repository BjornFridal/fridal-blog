import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
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
        .nullable(),
      imageAlt: z.string().nullable(),
      teaser: z.string().nullable(),
      tags: z.array(z.string())
    })
});

export const collections = {
  blog: blogCollection
};
