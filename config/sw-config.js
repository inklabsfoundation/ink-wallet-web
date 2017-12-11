module.exports = {
  cache: {
    cacheId: "qtum-web",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: "#FFFFFF",
    title: "qtum-web",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
