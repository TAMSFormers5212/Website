// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';

// SITE_URL origin, BASE_PATH path; workflow sets both from Settings > Pages
// custom domain there = domain root; unset locally = /Website like production
const site = process.env.SITE_URL || 'https://tamsformers5212.github.io';
const base = (process.env.BASE_PATH ?? '/Website') || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [icon()],

  image: {
    responsiveStyles: true,
  },

  // Fonts are downloaded and self-hosted at build time, so there is no
  // render-blocking request to fonts.googleapis.com. Only the weights the
  // stylesheet actually uses are fetched (the old site requested 300-700 plus
  // italics and used none of the italics).
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
  ],
});
