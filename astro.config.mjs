// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';

// The site deploys to GitHub Pages under the repository name, so every
// generated URL must be prefixed with `base`. There is no CNAME in this repo;
// if a custom domain is ever added, set `base: '/'` and update `site`.
export default defineConfig({
  site: 'https://tamsformers5212.github.io',
  base: '/Website',
  trailingSlash: 'always',
  integrations: [icon()],

  image: {
    responsiveStyles: true,
  },

  // Fonts are downloaded and self-hosted at build time, so there is no
  // render-blocking request to fonts.googleapis.com. Only the weights the
  // stylesheet actually uses are fetched (the old site requested 300-700 plus
  // italics for all three families and used none of the italics).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Open Sans',
      cssVariable: '--font-open-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Jost',
      cssVariable: '--font-jost',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Poppins',
      cssVariable: '--font-poppins',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
