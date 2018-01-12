const extractStyle = require("./partials/extract-style");
const uglify = require("./partials/uglify");

module.exports = function (composer, options, compose) {
  composer.addPartials({
    "custom-style": {
      config: extractStyle()
    },
    "custom-uglify": {
      config: uglify()
    }
  });
  const base = composer.profiles._base;
  const tmp = base.partials["_extract-style"];
  tmp.enable = false;
  base.partials["custom-style"] = {order: tmp.order};

  const production = composer.profiles._production;
  const tmpUglify = production.partials["_uglify"];
  tmpUglify.enable = false;
  production.partials["custom-uglify"] = {order: tmpUglify.order};

  return compose();
};
