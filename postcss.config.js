const AutoPrefixer = require("autoprefixer");

module.exports = () => {
  return {
    plugins: [
      AutoPrefixer({
        overrideBrowserslist: [
          "last 20 versions",
        ]
      })
    ]
  };
};
