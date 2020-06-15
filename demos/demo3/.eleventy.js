

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addDataExtension("geojson", contents => JSON.parse(contents));
};