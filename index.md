---
layout: default
title: "API Index"
permalink: /
---

## API Endpoints

The site provides JSON endpoints for posts, tags and reading statistics.

- `/api/posts.json` — all posts (supports limit/offset via front-matter when used as a page)
- `/api/latest.json` — latest posts (5)
- `/api/posts/pages.json` — paginated pages JSON (pages array)
- `/api/tags.json` — tags mapping to posts
- `/api/stats.json` — reading statistics for posts
- `/api/posts/<year>/<month>/<day>/<slug>/` — (use post URLs plus `.json` if available per-post)

To increment a post read counter programmatically, trigger the repository_dispatch event `increment-read` (see README or Actions tab). This increments the value in `_data/stats.json` and the change is committed to the repo.

If you want a per-post detail JSON generated automatically, tell me and I'll add per-post API files or an endpoint pattern.
            </a>
