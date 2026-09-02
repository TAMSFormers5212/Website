# Website

```bash
npm install
npm run dev      # localhost:4321/Website/
npm run build    # -> dist/
npm run preview
npm run check
```

```
src/content/team/members.yaml       # roster
src/content/team/groups.yaml        # team sub-sections (execs, committees)
src/content/sponsors/sponsors.yaml  # sponsors
src/content/robots/*.md             # robots
src/assets/img/                     # images
src/styles/style.css                # styles
src/pages/                          # routes
public/*.html                       # old-URL redirects
```

```yaml
# src/content/team/members.yaml
- id: jane-doe
  name: Jane Doe
  role: Programming
  group: exec          # an id from groups.yaml
  year: 2025-2026
  photo: ../../assets/img/team/2024-2025/jane-doe.jpg
  bio: One sentence.
  socials:
    instagram: https://instagram.com/janedoe
```

```yaml
# src/content/sponsors/sponsors.yaml
- id: acme
  name: Acme
  logo: ../../assets/img/sponsors/acme.png
  url: https://acme.com
```

```markdown
<!-- src/content/robots/robotname.md -->
---
name: Robotname
year: "2026"
filter: "2026"
order: 0
featured: true
summary: One paragraph.
images:
  - ../../assets/img/robots/2026/robotname-1.jpg
mechanisms:
  - title: Drivetrain
    body: One paragraph.
---
```

```
/robots/<filename>/     # page per robots/*.md
```

```
push main -> .github/workflows/static.yml -> Pages
```

```js
// astro.config.mjs — no CNAME, so:
base: '/Website'
```

```astro
<!-- internal links -->
import { url } from '../lib/url';
<a href={url('/trs/')}>
```
