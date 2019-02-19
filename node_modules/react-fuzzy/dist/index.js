'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  searchBoxStyle: {
    border: '1px solid #eee',
    borderRadius: 2,
    padding: '8px 10px',
    lineHeight: '24px',
    width: '100%',
    outline: 'none',
    fontSize: 16,
    color: '#666',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  searchBoxWrapper: {
    padding: '4px',
    boxShadow: '0 4px 15px 4px rgba(0,0,0,0.2)',
    borderRadius: 2,
    backgroundColor: '#fff'
  },
  resultsStyle: {
    backgroundColor: '#fff',
    position: 'relative',
    padding: '12px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: 14,
    cursor: 'pointer'
  },
  selectedResultStyle: {
    backgroundColor: '#f9f9f9',
    position: 'relative',
    padding: '12px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: 14,
    cursor: 'pointer'
  },
  resultsWrapperStyle: {
    width: '100%',
    boxShadow: '0px 12px 30px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid #eee',
    borderTop: 0,
    boxSizing: 'border-box',
    maxHeight: 400,
    overflow: 'auto',
    position: 'relative'
  }
};

function defaultResultsTemplate(props, state, styl, clickHandler) {
  return state.results.map(function (val, i) {
    var style = state.selectedIndex === i ? styl.selectedResultStyle : styl.resultsStyle;
    return _react2.default.createElement(
      'div',
      { key: i, style: style, onClick: function onClick() {
          return clickHandler(i);
        } },
      val.title
    );
  });
}

var FuzzySearch = function (_Component) {
  (0, _inherits3.default)(FuzzySearch, _Component);

  function FuzzySearch(props) {
    (0, _classCallCheck3.default)(this, FuzzySearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FuzzySearch.__proto__ || (0, _getPrototypeOf2.default)(FuzzySearch)).call(this, props));

    _this.state = {
      results: [],
      selectedIndex: 0,
      selectedValue: {}
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleMouseClick = _this.handleMouseClick.bind(_this);
    _this.fuse = new _fuse2.default(props.list, _this.getOptions());
    return _this;
  }

  (0, _createClass3.default)(FuzzySearch, [{
    key: 'getOptions',
    value: function getOptions() {
      var _props = this.props,
          caseSensitive = _props.caseSensitive,
          id = _props.id,
          include = _props.include,
          keys = _props.keys,
          shouldSort = _props.shouldSort,
          sortFn = _props.sortFn,
          tokenize = _props.tokenize,
          verbose = _props.verbose,
          maxPatternLength = _props.maxPatternLength,
          distance = _props.distance,
          threshold = _props.threshold,
          location = _props.location,
          options = _props.options;


      return (0, _extends3.default)({
        caseSensitive: caseSensitive,
        id: id,
        include: include,
        keys: keys,
        shouldSort: shouldSort,
        sortFn: sortFn,
        tokenize: tokenize,
        verbose: verbose,
        maxPatternLength: maxPatternLength,
        distance: distance,
        threshold: threshold,
        location: location
      }, options);
    }
  }, {
    key: 'getResultsTemplate',
    value: function getResultsTemplate() {
      var _this2 = this;

      return this.state.results.map(function (val, i) {
        var style = _this2.state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
        return _react2.default.createElement(
          'div',
          { key: i, style: style },
          val.title
        );
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        results: this.fuse.search(e.target.value).slice(0, this.props.maxResults - 1)
      });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var _state = this.state,
          results = _state.results,
          selectedIndex = _state.selectedIndex;

      if (e.keyCode === 40 && selectedIndex < results.length - 1) {
        this.setState({
          selectedIndex: selectedIndex + 1
        });
      } else if (e.keyCode === 38 && selectedIndex > 0) {
        this.setState({
          selectedIndex: selectedIndex - 1
        });
      } else if (e.keyCode === 13) {
        if (results[selectedIndex]) {
          this.props.onSelect(results[this.state.selectedIndex]);
          this.setState({
            selectedValue: results[this.state.selectedIndex]
          });
        }
        this.setState({
          results: [],
          selectedIndex: 0
        });
      }
    }
  }, {
    key: 'handleMouseClick',
    value: function handleMouseClick(clickedIndex) {
      var results = this.state.results;


      if (results[clickedIndex]) {
        this.props.onSelect(results[clickedIndex]);
      }
      this.setState({
        results: [],
        selectedIndex: 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          width = _props2.width,
          resultsTemplate = _props2.resultsTemplate,
          placeholder = _props2.placeholder,
          autoFocus = _props2.autoFocus;


      var mainClass = (0, _classnames2.default)('react-fuzzy-search', className);

      return _react2.default.createElement(
        'div',
        { className: mainClass, style: { width: width }, onKeyDown: this.handleKeyDown },
        _react2.default.createElement(
          'div',
          { style: styles.searchBoxWrapper },
          _react2.default.createElement('input', {
            type: 'text',
            style: styles.searchBoxStyle,
            onChange: this.handleChange,
            ref: 'searchBox',
            placeholder: placeholder,
            autoFocus: autoFocus,
            value: this.state.selectedValue && this.state.selectedValue.title
          })
        ),
        this.state.results && this.state.results.length > 0 && _react2.default.createElement(
          'div',
          { style: styles.resultsWrapperStyle },
          resultsTemplate(this.props, this.state, styles, this.handleMouseClick)
        )
      );
    }
  }]);
  return FuzzySearch;
}(_react.Component);

FuzzySearch.propTypes = {
  caseSensitive: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  distance: _propTypes2.default.number,
  id: _propTypes2.default.string,
  include: _propTypes2.default.array,
  maxPatternLength: _propTypes2.default.number,
  onSelect: _propTypes2.default.func.isRequired,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  keys: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
  list: _propTypes2.default.array.isRequired,
  location: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  resultsTemplate: _propTypes2.default.func,
  shouldSort: _propTypes2.default.bool,
  sortFn: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  tokenize: _propTypes2.default.bool,
  verbose: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  maxResults: _propTypes2.default.number,
  options: _propTypes2.default.object
};
FuzzySearch.defaultProps = {
  caseSensitive: false,
  distance: 100,
  include: [],
  location: 0,
  width: 430,
  placeholder: 'Search',
  resultsTemplate: defaultResultsTemplate,
  shouldSort: true,
  sortFn: function sortFn(a, b) {
    return a.score - b.score;
  },

  threshold: 0.6,
  tokenize: false,
  verbose: false,
  autoFocus: false,
  maxResults: 10
};
exports.default = FuzzySearch;