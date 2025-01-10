module.exports = {
  rootDir: '.', // The root directory of your project
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Path to the setup file
  testEnvironment: 'jest-environment-jsdom', // Use the JSDOM environment
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS/JSX using Babel
  },
  moduleFileExtensions: ['js', 'jsx'], // Recognize .js and .jsx extensions
  transformIgnorePatterns: [
    '/node_modules/', // Do not transform node_modules
  ],
}
