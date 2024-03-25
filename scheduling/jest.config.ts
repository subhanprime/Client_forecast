module.exports = {
  preset: 'ts-jest/preset/js-with-ts',
  testEnvironment: 'jsdom',

  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/',"node_modules/(?!axios)"],

};