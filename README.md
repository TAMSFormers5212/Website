# Website

```bash
npm install
npm run dev      # localhost:4321/Website/
npm run build    # -> dist/
npm run preview
npm run check
```

```
src/content/team/members.yaml       # roster, every year
src/content/team/groups.yaml        # team sub-sections (execs, TRS)
src/content/committees/*.md         # committee cards on the homepage
src/content/sponsors/sponsors.yaml  # sponsors
src/content/robots/*.md             # robots
src/lib/site.ts                     # currentYear; other years fold into "Past Team Members"
src/assets/img/                     # images
src/styles/style.css                # styles
src/pages/                          # routes
src/pages/[legacy].html.ts          # old-URL redirects
public/robot.glb                    # homepage 3D model (binary glTF, Y-up)
```

```yaml
# src/content/team/members.yaml
- id: jane-doe
  name: Jane Doe
  role: Programming
  group: exec          # an id from groups.yaml
  year: 2025-2026      # != currentYear -> alumni list
  photo: ../../assets/img/team/2024-2025/jane-doe.jpg   # omit for an initials tile
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
<!-- src/content/committees/name.md -->
---
name: CAD Committee
heads: [Jane Doe]
order: 1
summary: One or two sentences.
photo: ../../assets/img/committees/thing.jpg   # optional
links:                                          # optional
  - label: Join
    href: https://forms.example
---
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
/outreach/              # src/pages/outreach.astro
```

```
push main -> .github/workflows/static.yml -> Pages
```

```bash
# where it is served from; the workflow reads Settings > Pages and sets both
npm run build                                       # tamsformers5212.github.io/Website/
SITE_URL=https://robotics.example.org BASE_PATH= npm run build   # domain root
# other host: repo variable SITE_URL=https://robotics.example.org
```

```astro
<!-- internal links -->
import { url } from '../lib/url';
<a href={url('/trs/')}>
```
