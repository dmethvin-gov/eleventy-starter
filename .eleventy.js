
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
//const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
//const tocPlugin = require("eleventy-plugin-toc")

const siteConfig = require("./data/siteConfig.js");

module.exports = function(eleventyConfig) {

  // Markdown formatting and anchor links
	let markdownIt = require("markdown-it");
	let markdownItAnchor = require("markdown-it-anchor");
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};
	let opts = {
		permalink: true,
		slugify: function(s) {
			return encodeURIComponent(
        String(s).trim().toLowerCase()
          .replace(/[?!]/g, '')
          .replace(/\s+/g, '-')
      );
		},
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3,4]
	};
	eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));
  //eleventyConfig.addPlugin(tocPlugin)
  //eleventyConfig.addPlugin(syntaxHighlightPlugin, { templateFormats: "md" });

  // Production optimizations
  if( siteConfig.minifyHtml ) {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if ( process.env.PRODUCTION && outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }

      return content;
    });
  }

  eleventyConfig.addFilter("cssmin", function(code) {
		if ( process.env.PRODUCTION ) {
			return new CleanCSS({}).minify(code).styles;
		} else {
			return code;
		}
	});

  return {
    dir: {
      input: "pages",
      output: "dist"
    },
    passThroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false
  };
};
