# DHS School Safety Site

TODO: What this content does

## Technology

This site is built using [eleventy](https://www.11ty.io/), a static site generator. Pages can be created using plain HTML, Markdown, or any of several templating languages--in the case of this site, Nunjucks.

Eleventy does not impose any specific library or framework requirement on pages. This site does not require a complex framework so it just uses the US Web Design System 2.0 (USWDS) and some basic JavaScript.

Commands in the `package.json` file provide most of the functionality needed to build and maintain the site. The most important ones are:

* `npm run lint` checks the site for correctness, including JavaScript style and working links in Markdown.
* `npm run build` builds the final static files to `dist` from the source files in `pages`.
* `npm start` starts a local web server on `localhost:8000` to serve the static files.

When committing, a git commit hook runs lint on all the JS files but checks links on the edited files *only*, to ensure they're clean. Note that it's possible for the incremental linting to miss issues such as broken cross-file links, so it's a good idea to run the full `npm run lint` occasionally.
