// const { nextI18NextRewrites } = require("next-i18next/rewrites");

// const localeSubpaths = {};

module.exports = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  // rewrites: async () => nextI18NextRewrites(localeSubpaths),
  // publicRuntimeConfig: {
  //   localeSubpaths,
  // },
};
