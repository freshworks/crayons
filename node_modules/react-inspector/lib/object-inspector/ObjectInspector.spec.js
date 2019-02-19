'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

var _ObjectInspector = require('./ObjectInspector');

var _ObjectInspector2 = _interopRequireDefault(_ObjectInspector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestRenderer = new _shallow2.default();

describe('ObjectInspector', function () {
  it('should render', function () {
    var tree = TestRenderer.render(_react2.default.createElement(_ObjectInspector2.default, { theme: 'testvalue' }));

    expect(tree).toMatchSnapshot();

    expect(tree.type).toBeInstanceOf(Function);
    expect(tree.props.theme).toEqual('testvalue');
  });

  it('passes `nodeRenderer` prop to <TreeView/>', function () {
    // Test that a custom `nodeRenderer` props is passed to <TreeView/>
    var nodeRenderer = function nodeRenderer() {
      return _react2.default.createElement(
        'span',
        null,
        'unit test'
      );
    };
    var tree = TestRenderer.render(_react2.default.createElement(_ObjectInspector2.default, { nodeRenderer: nodeRenderer }));

    expect(tree).toMatchSnapshot();

    expect(tree.props.children.type).toBeInstanceOf(Function);
    expect(tree.props.children.props.nodeRenderer).toEqual(nodeRenderer);
  });
});