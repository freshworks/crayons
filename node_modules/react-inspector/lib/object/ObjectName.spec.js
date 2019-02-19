'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _ObjectName = require('./ObjectName');

var _ObjectName2 = _interopRequireDefault(_ObjectName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ObjectName', function () {
  it('should render', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectName2.default, { name: 'testvalue' }));

    expect(tree).toMatchSnapshot();
  });

  it('should apply dimming if `dimmed` prop is true', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectName2.default, { name: 'testvalue', dimmed: true }));

    expect(tree).toMatchSnapshot();
  });

  it('should not apply dimming if `dimmed` prop is false', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectName2.default, { name: 'testvalue', dimmed: false }));

    expect(tree).toMatchSnapshot();
  });

  it('Accepts and applies additional `style` prop', function () {
    // Test that a custom `style` props is passed and applied to <span/>
    var style = { color: 'hotpink' };
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectName2.default, { styles: style }));

    expect(tree).toMatchSnapshot();
  });
});