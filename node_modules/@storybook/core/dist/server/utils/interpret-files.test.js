"use strict";

var _mockFs = _interopRequireDefault(require("mock-fs"));

var _interpretFiles = require("./interpret-files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('interpret-files', () => {
  it('will interpret file as file.ts when it exists in fs', () => {
    (0, _mockFs.default)({
      'path/to/file.ts': 'ts file contents'
    });
    const file = (0, _interpretFiles.getInterpretedFile)('path/to/file');
    expect(file).toEqual('path/to/file.ts');
  });
  it('will interpret file as file.js when both are in fs', () => {
    (0, _mockFs.default)({
      'path/to/file.js': 'js file contents',
      'path/to/file.ts': 'ts file contents'
    });
    const file = (0, _interpretFiles.getInterpretedFile)('path/to/file');
    expect(file).toEqual('path/to/file.js');
  });
  it('will return undefined if there is no candidate of a file in fs', () => {
    (0, _mockFs.default)({
      'path/to/file.js': 'js file contents'
    });
    const file = (0, _interpretFiles.getInterpretedFile)('path/to/file2');
    expect(file).toBeUndefined();
  });
  afterEach(_mockFs.default.restore);
});