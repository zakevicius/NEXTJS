const { i18n } = require("./next.config");
const path = require("path");

const i18next = require("i18next");
const HttpApi = require("i18next-http-backend");

const i18nextOptions = {
  ...i18n,
  localePath: path.resolve("./public/static/locales"),
  backend: {
    loadPath: () => {
      return "https://test-m-photo.s3.eu-north-1.amazonaws.com/locales/{{lng}}/{{ns}}.json";
    },
  },
};

module.exports = i18next.use(HttpApi).init(i18nextOptions);

// module.exports = {
//   ...i18n,
//   // localePath: path.resolve('./public/static/locales'),
//   backend: {
//     loadPath:
//       'https://test-m-photo.s3.eu-north-1.amazonaws.com/locales/{{lng}}/{{ns}}.json',
//   },
// };
