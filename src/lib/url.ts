const BASE = import.meta.env.BASE_URL;

/**
 * Builds a site-absolute URL that respects the configured `base`.
 *
 * The site is served from a GitHub Pages subpath (/Website/), so hardcoding
 * a leading "/" in an href produces a link that works locally and 404s in
 * production. Route every internal link through this helper.
 */
export function url(path = '/'): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (!path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}
