module.exports = {
  preset: '@vue/cli-plugin-unit-jest',  
  transform: {
    '^.+\\.js$': 'babel-jest',  
    '^.+\\.vue$': '@vue/vue3-jest',   
    '^.+\\.mjs$': 'babel-jest',  
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(vuetify)/)',  
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'], // Fichier setup Jest
  testEnvironment: 'jsdom', // Simulation du DOM
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.vue', 'src/**/*.js'],
  coverageReporters: ['lcov', 'text'],
};
