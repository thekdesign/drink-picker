const path = require('node:path');

const r = (p) => path.resolve(__dirname, p);

module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['./jest.setup.js'],
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '^apis/(.*)$': r('resources/js/apis/$1'),
        '^bootstrap/(.*)$': r('resources/js/bootstrap/$1'),
        '^components/(.*)$': r('resources/js/components/$1'),
        '^composables/(.*)$': r('resources/js/composables/$1'),
        '^config/(.*)$': r('resources/js/config/$1'),
        '^data/(.*)$': r('resources/js/data/$1'),
        '^enums/(.*)$': r('resources/js/enums/$1'),
        '^formatters/(.*)$': r('resources/js/formatters/$1'),
        '^libs/(.*)$': r('resources/js/libs/$1'),
        '^maps/(.*)$': r('resources/js/maps/$1'),
        '^parameters/(.*)$': r('resources/js/parameters/$1'),
        '^router/(.*)$': r('resources/js/router/$1'),
        '^stores/(.*)$': r('resources/js/stores/$1'),
    },
    testMatch: ['**/resources/js/tests/**/*.test.js'],
    collectCoverageFrom: [
        'resources/js/**/*.{js,vue}',
        '!resources/js/tests/**',
        '!resources/js/index.js',
    ],
    coverageReporters: ['text', 'cobertura'],
};
