module.exports = function getBabelConfig(modules) {
  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          modules,
        },
      ],
      "@babel/preset-react",
    ],
    "plugins": [
      "@babel/plugin-transform-runtime",
      [
        "@babel/plugin-proposal-decorators",
        {
          "decoratorsBeforeExport": false,
        },
      ],
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",
    ],
  };

};