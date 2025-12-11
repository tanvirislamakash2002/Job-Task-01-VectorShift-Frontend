const path = require('path');

module.exports = {
  style: {
    postcss: {
      loaderOptions: (postcssLoaderOptions) => {
        // Exclude reactflow from PostCSS processing
        if (postcssLoaderOptions.postcssOptions) {
          postcssLoaderOptions.postcssOptions.plugins = [
            ['@tailwindcss/postcss', {}],
            ['autoprefixer', {}]
          ];
        }
        return postcssLoaderOptions;
      }
    }
  },
  webpack: {
    configure: (webpackConfig) => {
      // Find the PostCSS loader rule
      const postcssLoaderRule = webpackConfig.module.rules
        .find(rule => rule.oneOf)
        .oneOf.find(rule => 
          rule.test && 
          rule.test.toString().includes('css') &&
          rule.use && 
          rule.use.some(use => use.loader && use.loader.includes('postcss-loader'))
        );
      
      if (postcssLoaderRule) {
        // Exclude reactflow from PostCSS
        postcssLoaderRule.exclude = /node_modules\/reactflow/;
      }
      
      return webpackConfig;
    }
  }
};