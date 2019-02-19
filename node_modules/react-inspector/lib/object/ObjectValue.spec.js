'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _ObjectValue = require('./ObjectValue');

var _ObjectValue2 = _interopRequireDefault(_ObjectValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ObjectValue', function () {
  it('should render', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: 0 }));
    expect(tree).toMatchSnapshot();
  });

  it('should render number', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: 0 })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['0']);
  });

  it('should render string with quotes', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: 'octocat' })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['"', 'octocat', '"']);
  });

  it('should render boolean', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: true })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['true']);
  });

  it('should render undefined', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: undefined })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['undefined']);
  });

  it('should render null', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: null })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['null']);
  });

  it('should display date correctly', function () {
    var dateString = 'December 17, 1995 03:24:00';
    var date = new Date(dateString);
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: date })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual([date.toString()]);
  });

  it('should render array with length information', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: [1, 2, 3, 4, 5] })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['Array[5]']);
  });

  it('should render an empty object', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: {} })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['Object']);
  });

  it('should render a simple object', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: { k: 'v' } })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['Object']);
  });

  it('should render a null prototyped object', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: Object.create(null) })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['Object']);
  });

  /*
  it('should render an anonymous function', () => {
    renderer.render(<ObjectValue object={function(){}} />)
    const tree = renderer.getRenderOutput()
    expect(tree.type).toBe('span')
    // const n = tree.children[1].props.children[1]
    // console.log(JSON.stringify(n, null, 2))
    // console.log(typeof n)
    // console.log(tree.children[1].props.children)
    expect(tree.children[0]).toEqual(<span style={objectStyles.value.function.keyword}>function</span>)
    expect(tree.children[1]).toEqual(<span style={objectStyles.value.function.name}>{[ '\xa0', 'object', '()' ]}</span>)
  });
  */

  /*
  it('should render a named function', () => {
    renderer.render(<ObjectValue object={function id(a){return a;}} />)
    const tree = renderer.getRenderOutput()
    expect(tree.type).toBe('span')
    expect(tree.children).toEqual([
                                          <span style={objectStyles.value.function.keyword}>function</span>,
                                          <span style={objectStyles.value.function.name}>{[ '\xa0', 'id', '()' ]}</span>
                                        ])
  });
  */

  it('should render a symbol', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: Symbol() })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['Symbol()']);
  });

  it('should render a symbol foo', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { object: Symbol('foo') })).toJSON();
    expect(tree.type).toBe('span');
    expect(tree.children).toEqual(['Symbol(foo)']);
  });

  it('accepts and applies style from `styles` prop', function () {
    // Custom `styles` prop gets applied to the element
    var style = { color: 'blue' };
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ObjectValue2.default, { styles: style, object: '' })).toJSON();
    expect(tree.props.style.color).toEqual('blue');
  });
});