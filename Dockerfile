# Image for building and previewing this site locally.
#
# GitHub Pages builds this repository with its legacy pipeline, which pins the
# `github-pages` gem: Jekyll 3 plus a fixed plugin list. Installing that same
# gem here keeps a local preview faithful to the published site. Plain
# `gem install jekyll` pulls Jekyll 4, which renders this site differently
# enough to hide a routing mistake until it is published.
#
# git must be installed even though it need not resolve the checkout. The
# jekyll-theme-primer layout reads site.github, which shells out to
# `git rev-parse HEAD`. A git that exits non-zero costs one warning; a missing
# git binary raises ENOENT and fails the build. curl is for the healthcheck.
FROM ruby:3.3-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential git curl \
 && rm -rf /var/lib/apt/lists/*

RUN gem install --no-document github-pages

WORKDIR /site
