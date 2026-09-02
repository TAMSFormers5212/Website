import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const socials = z.object({
  facebook: z.url().optional(),
  instagram: z.url().optional(),
  linkedin: z.url().optional(),
});

// The sub-sections of the Team section (execs, committees, ...). The homepage
// renders one block per group, in `order`, so new committees need no page edits.
const teamGroups = defineCollection({
  loader: file('src/content/team/groups.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number(),
  }),
});

// Everyone on the Team section. `group` must match an id in groups.yaml; the
// build fails on a typo rather than silently dropping the person.
const team = defineCollection({
  loader: file('src/content/team/members.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      group: reference('teamGroups'),
      year: z.string().optional(),
      photo: image(),
      bio: z.string(),
      socials: socials.default({}),
    }),
});

const sponsors = defineCollection({
  loader: file('src/content/sponsors/sponsors.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image(),
      url: z.url().optional(),
    }),
});

// One entry per competition robot. Drives the filterable homepage grid and
// the generated /robots/<slug>/ detail pages.
const robots = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/robots' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      year: z.string(),
      // Shown on the filter bar; usually the year, but "Previous Years"
      // groups everything older than the individually documented robots.
      filter: z.string(),
      images: z.array(image()).min(1),
      summary: z.string(),
      order: z.number(),
      // Set on the robot featured in the homepage "Past Robots" section.
      featured: z.boolean().default(false),
      // Key mechanisms, rendered as the homepage accordion and as headed
      // sections on the robot's own page. Defined once, shown in both places.
      mechanisms: z
        .array(z.object({ title: z.string(), body: z.string() }))
        .default([]),
    }),
});

export const collections = { teamGroups, team, sponsors, robots };
