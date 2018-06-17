'use strict'

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.ts',
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.ts',
  },
  setupFiles: ['./test/test-setup.ts', 'jest-localstorage-mock'],
  testURL: 'https://expensus.atreidesdev.dev',
}
