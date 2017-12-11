const extractStyle = require("./partials/extract-style");
//TODO Find out more elegant way to add global css
module.exports = function (composer, options, compose) {
  composer.addPartials({
    "custom-style": {
      config: extractStyle()
    }
  });
  const base = composer.profiles._base;
  const tmp = base.partials["_extract-style"];
  tmp.enable = false;
  base.partials["custom-style"] = {order: tmp.order};

  return compose();
};
