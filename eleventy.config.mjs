const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

// Vid lansering med egen domän sätts denna till "" (eller ändra till "/")
const PATH_PREFIX = "sicklaSluss";

const ALBUM_IMG = "src/images/bildreportage";
const ALBUM_OUT = "_site/static/images/bildreportage";
const ALBUM_URL = `${PATH_PREFIX ? "/" + PATH_PREFIX : ""}/static/images/bildreportage`;

function slugifyFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-");
}

async function albumImg(folder, file, alt) {
  const src = `${ALBUM_IMG}/${folder}/${file}`;
  const common = {
    outputDir: ALBUM_OUT,
    urlPath: ALBUM_URL,
    formats: ["webp", "jpeg"],
    cacheOptions: { duration: "0s" },
    formatsOptions: {
      jpeg: { quality: 72, mozjpeg: true },
      webp: { quality: 72 },
    },
    filenameFormat: (id, f, width, format) =>
      `${slugifyFilename(folder)}-${slugifyFilename(file)}-${width}w.${format}`,
  };
  try {
    const [thumbMeta, fullMeta] = await Promise.all([
      Image(src, { ...common, widths: [300] }),
      Image(src, { ...common, widths: [1200] }),
    ]);
    const thumbJpeg = thumbMeta.jpeg[0];
    const thumbWebp = thumbMeta.webp[0];
    const fullJpeg = fullMeta.jpeg[0];
    const fullWebp = fullMeta.webp[0];
    return [
      `<a class="gallery-item" href="${fullJpeg.url}" data-webp="${fullWebp.url}">`,
      `<picture>`,
      `<source type="image/webp" srcset="${thumbWebp.url} 1x">`,
      `<img class="gallery-thumb" src="${thumbJpeg.url}" width="${thumbJpeg.width}"`,
      ` height="${thumbJpeg.height}" alt="${alt}" loading="lazy">`,
      `</picture></a>`,
    ].join("");
  } catch (e) {
    console.error(`albumImg: kunde inte bearbeta ${src}: ${e.message}`);
    return "";
  }
}

module.exports = function (eleventyConfig) {
  // Kopiera statiska filer (bilder, pdf:er) och CSS till bygget
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Galleribilder (tumnagel + storbild) för bildreportage
  eleventyConfig.addAsyncShortcode("albumImg", albumImg);

  // Lista bilder i ett album automatiskt från bildmappen, så redaktören
  // inte behöver fylla i filnamnen för hand.
  eleventyConfig.addFilter("albumImages", (folder) => {
    const dir = path.join(ALBUM_IMG, folder || "");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, "sv", { numeric: true }));
  });

  // Datumformatering för nyheter m.m.
  eleventyConfig.addFilter("shortDate", (d) => {
    if (!d) return "";
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.setServerOptions({
    mount: {
      "/sicklaSluss": "./_site",
    },
  });

  eleventyConfig.addFilter("readableDate", (d) => {
    if (!d) return "";
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    pathPrefix: PATH_PREFIX,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};