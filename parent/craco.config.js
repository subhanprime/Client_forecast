// const path = require("path");
// const { getLoader, loaderByName } = require("@craco/craco");

// const packages = [];
// packages.push(path.join(__dirname, "../reports"));
// packages.push(path.join(__dirname, "../test"));
// packages.push(path.join(__dirname, "../people"));
// packages.push(path.join(__dirname, "../project"));
// packages.push(path.join(__dirname, "../scheduling"));
// packages.push(path.join(__dirname, "../reports"));

// module.exports = {
//   webpack: {
//     configure: (webpackConfig, arg) => {
//       const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
//       if (isFound) {
//         const include = Array.isArray(match.loader.include)
//           ? match.loader.include
//           : [match.loader.include];

//         match.loader.include = include.concat(packages);
//       }

//       return webpackConfig;
//     },
//   },
//   style: {
//     // why use postcssOptions? -> https://github.com/dilanx/craco/issues/353
//     postcssOptions: {
//         plugins: [
//             require('tailwindcss'),
//             require('autoprefixer'),
//         ],
//     },
// },
// };

const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [
  "reports",
  "test",
  "people",
  "project",
  "scheduling",
  // Add other packages as needed
];

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages.map(pkg => path.join(__dirname, `../${pkg}`)));
      }

      return webpackConfig;
    },
  },
  style: {
    postcssOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
