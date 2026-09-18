import type { APIRoute, GetStaticPaths } from 'astro';
import { url } from '../lib/url';

// old flat .html urls -> new addresses, built against base
const moved: Record<string, string> = {
  TRS: '/#committees',
  donations: '/donations/',
  calendar: '/calendar/',
  'portfolio-details': '/robots/',
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(moved).map((legacy) => ({ params: { legacy } }));

export const GET: APIRoute = ({ params, site }) => {
  const target = url(moved[params.legacy!]);
  const canonical = new URL(target, site).href;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting&hellip;</title>
    <link rel="canonical" href="${canonical}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <p>This page has moved to <a href="${target}">${target}</a>.</p>
  </body>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
