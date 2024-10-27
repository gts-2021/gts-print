module.exports = {
  testMatch: ['**/*.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias '@' pour le dossier 'src'
    '^@components/(.*)$': '<rootDir>/src/components/$1', // Alias '@components' pour le dossier 'components'
    '^@pages/(.*)$': '<rootDir>/src/pages/$1', // Alias '@pages' pour le dossier 'pages'
    '^@services/(.*)$': '<rootDir>/src/services/$1', // Alias '@services' pour le dossier 'services'
    '^@constants/(.*)$': '<rootDir>/src/constants/$1', // Alias '@constants' pour le dossier 'constants'
    // Ajoutez d'autres alias si nécessaire
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(vuetify)/)',
  ],
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Fichier setup Jest
  testEnvironment: 'jsdom', // Simulation du DOM
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.vue', 'src/**/*.js'],
  coverageReporters: ['lcov', 'text'],
};
