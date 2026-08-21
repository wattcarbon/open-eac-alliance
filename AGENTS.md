# Working on this repository

This repository publishes the OpenEAC Alliance methodologies as a Jekyll site at
[methods.openeac.org](https://methods.openeac.org). GitHub Pages builds it from
`main`, using its legacy pipeline: the `github-pages` gem, which pins Jekyll 3
and a fixed plugin list.

## What the files are

- `index.md` lists every methodology. It is the only place a methodology is
  advertised, so a new one is not published until it appears here.
- `_pages/*.md` are redirect stubs, one per methodology. Each carries a dated
  `permalink` and a `redirect_to`. There is no prose in them.
- `approved_documents/` holds the frozen PDF of each approved methodology, with
  its public comment history beside it.
- `_config.yml`, `Dockerfile` and `compose.yml` are site and preview plumbing.

## A permalink is a citation

Every certificate records the URL of the methodology that produced it. A
permalink is therefore a published identifier, not a routing detail:

- **Never change or delete a `permalink`.** To rename one, add the old value to
  the new page's `redirect_from` list, so the old URL still resolves.
- **Never move a file under `approved_documents/`.** Those paths are reachable
  from outside this repository.
- Link a Google Doc with `/view`, never `/edit`. A reader must not be able to
  change a document that a published claim already depends on.

## Preview a change

```sh
docker compose up          # then open http://localhost:4000
```

The site rebuilds when you edit a file, so a reload shows the change.

To check a change without reading it, build it:

```sh
docker compose run --rm site jekyll build --destination /tmp/_site
```

That fails on a broken permalink, a duplicate one, or unparseable front matter,
which is most of what can go wrong here.

## Preview through the server, not the built output

Do not point a static file server at a built `_site`. It produces a convincing
false alarm.

GitHub Pages resolves an extensionless request such as
`/methodologies/whole-building-metered/2025-02-07` to the `2025-02-07.html` file
it generated, and every link on this site is extensionless. A plain file server
returns 404 for all of them, which reads as a site full of broken links when
nothing is broken. `jekyll serve`, which `docker compose up` runs, resolves them
the way Pages does.

`jekyll-redirect-from` also writes **absolute** URLs, built from `site.url`. The
preview sets that to wherever you are serving it, so redirects point at the host
you are reading. Set `SITE_URL` to override it.
