import fs from "node:fs";
import path from "node:path";
import Image from "@11ty/eleventy-img";

// Vid lansering med egen domän sätts denna till ""
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

// Escapa värden som skrivs in i HTML-attribut (t.ex. alt-text med citattecken
// från en rubrik i CMS:et).
function escapeAttr(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function albumImageOptions(folder, file, widths) {
  return {
    outputDir: ALBUM_OUT,
    urlPath: ALBUM_URL,
    formats: ["webp", "jpeg"],
    cacheOptions: { duration: "0s" },
    sharpJpegOptions: { quality: 72, mozjpeg: true },
    sharpWebpOptions: { quality: 72 },
    widths,
    // `id` är en hash av källbilden + inställningarna. Utan den återanvänder
    // eleventy-img gamla utdatafiler även när källbilden bytts ut (disk-cachen
    // kontrollerar bara om målfilen finns), vilket gav inaktuella bilder.
    filenameFormat: (id, src, width, format) =>
      `${slugifyFilename(folder)}-${slugifyFilename(file)}-${width}w-${id}.${format}`,
  };
}

async function albumImg(folder, file, alt) {
  const src = `${ALBUM_IMG}/${folder}/${file}`;
  try {
    const [thumbMeta, fullMeta] = await Promise.all([
      Image(src, albumImageOptions(folder, file, [300])),
      Image(src, albumImageOptions(folder, file, [1200])),
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
      ` height="${thumbJpeg.height}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async">`,
      `</picture></a>`,
    ].join("");
  } catch (e) {
    console.error(`albumImg: kunde inte bearbeta ${src}: ${e.message}`);
    return "";
  }
}

// Omslagsbild till albumlistan – bara en liten bild, ingen ljuslådelänk.
async function albumCover(folder, file, alt) {
  if (!file) return "";
  const src = `${ALBUM_IMG}/${folder}/${file}`;
  try {
    const meta = await Image(src, albumImageOptions(folder, file, [480]));
    const jpeg = meta.jpeg[0];
    const webp = meta.webp[0];
    return [
      `<picture>`,
      `<source type="image/webp" srcset="${webp.url}">`,
      `<img class="album-cover" src="${jpeg.url}" width="${jpeg.width}" height="${jpeg.height}"`,
      ` alt="${escapeAttr(alt)}" loading="lazy" decoding="async">`,
      `</picture>`,
    ].join("");
  } catch (e) {
    console.error(`albumCover: kunde inte bearbeta ${src}: ${e.message}`);
    return "";
  }
}

export default function (eleventyConfig) {
  // Kopiera statiska filer (bilder, pdf:er) och CSS till bygget
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Gör att rot-relativa länkar och bilder som skrivs in via CMS:et
  // (t.ex. src="/static/images/...") också fungerar när sajten ligger på
  // en underkatalog som /sicklaSluss/. Vid lansering på egen domän är
  // PATH_PREFIX tom och transformen gör ingenting.
  if (PATH_PREFIX) {
    const prefix = "/" + PATH_PREFIX;
    const prefixPattern = PATH_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rootUrlPattern = new RegExp(
      `(\\s(?:href|src|poster)=")\\/(?!\\/)(?!${prefixPattern}(?:[/"?#]|$))([^"]*)"`,
      "g",
    );
    eleventyConfig.addTransform("prefix-root-relative-urls", function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith(".html")) return content;
      return content.replace(
        rootUrlPattern,
        (match, attribute, rest) => `${attribute}${prefix}/${rest}"`,
      );
    });
  }

  // Galleribilder (tumnagel + storbild) för bildreportage
  eleventyConfig.addAsyncShortcode("albumImg", albumImg);
  eleventyConfig.addAsyncShortcode("albumCover", albumCover);

  // Lista bilder i ett album automatiskt från bildmappen, så redaktören
  // inte behöver fylla i filnamnen för hand.
  function listAlbumImages(folder) {
    const dir = path.join(ALBUM_IMG, folder || "");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, "sv", { numeric: true }));
  }

  eleventyConfig.addFilter("albumImages", listAlbumImages);

  // Välj omslagsbild: den som angetts i `cover`, annars första bilden.
  // Om det angivna filnamnet inte finns faller vi tillbaka på första bilden
  // i stället för att albumet blir utan omslag.
  eleventyConfig.addFilter("albumCoverFile", (folder, requested) => {
    const images = listAlbumImages(folder);
    if (requested && images.includes(requested)) return requested;
    return images[0] || "";
  });

  // Gruppera album per decennium. Album med `period: historiskt` hamnar i en
  // egen grupp sist, oavsett datum.
  eleventyConfig.addFilter("albumGroups", (albums) => {
    const groups = new Map();

    for (const album of albums || []) {
      const isHistoric = album.data.period === "historiskt";
      let group;

      if (isHistoric) {
        group = { key: "historiskt", title: "Historiskt", order: -1, albums: [] };
      } else {
        const date =
          album.data.date instanceof Date
            ? album.data.date
            : new Date(album.data.date);
        const year = Number.isNaN(date.getTime())
          ? 2000
          : date.getFullYear();
        const decade = Math.floor(year / 10) * 10;
        group = {
          key: String(decade),
          title: `${decade}–${decade + 9}`,
          order: decade,
          albums: [],
        };
      }

      if (!groups.has(group.key)) groups.set(group.key, group);
      groups.get(group.key).albums.push(album);
    }

    const result = [...groups.values()].sort((a, b) => b.order - a.order);
    for (const group of result) {
      if (group.key === "historiskt") {
        group.albums.sort((a, b) =>
          String(a.data.title).localeCompare(String(b.data.title), "sv", {
            numeric: true,
          }),
        );
      } else {
        group.albums.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
      }
    }
    return result;
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

  // Sidor som ska med i sitemap.xml: bara riktiga HTML-sidor som inte är
  // undantagna (t.ex. 404) eller noindex.
  eleventyConfig.addFilter("sitemapPages", (pages) =>
    (pages || []).filter(
      (p) =>
        p.url &&
        p.outputPath &&
        p.outputPath.endsWith(".html") &&
        !p.data?.noindex &&
        !p.data?.eleventyExcludeFromCollections,
    ),
  );

  eleventyConfig.addFilter("dateToISO", (d) => {
    if (!d) return "";
    const date = d instanceof Date ? d : new Date(d);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("dateToRfc3339", (d) => {
    if (!d) return "";
    const date = d instanceof Date ? d : new Date(d);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  });

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
}
