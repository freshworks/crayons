'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.injectDeps = injectDeps;
exports.useDeps = useDeps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}; // eslint-disable-line no-unused-vars
function injectDeps(context, _actions) {
  var actions = {};
  for (var key in _actions) {
    if (_actions.hasOwnProperty(key)) {
      var actionMap = _actions[key];
      var newActionMap = {};
      for (var actionName in actionMap) {
        if (actionMap.hasOwnProperty(actionName)) {
          newActionMap[actionName] = actionMap[actionName].bind(null, context);
        }
      }
      actions[key] = newActionMap;
    }
  }

  return function (Component) {
    var ComponentWithDeps = (0, _createReactClass2.default)({
      childContextTypes: {
        context: _propTypes2.default.object,
        actions: _propTypes2.default.object
      },

      getChildContext: function getChildContext() {
        return {
          context: context,
          actions: actions
        };
      },
      render: function render() {
        return _react2.default.createElement(Component, this.props);
      }
    });

    ComponentWithDeps.displayName = 'WithDeps(' + getDisplayName(Component) + ')';
    return (0, _hoistNonReactStatics2.default)(ComponentWithDeps, Component);
  };
}

var defaultMapper = function defaultMapper(_context, _actions2) {
  return {
    context: function context() {
      return _context;
    },
    actions: function actions() {
      return _actions2;
    }
  };
};

function useDeps() {
  var mapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMapper;

  return function (Component) {
    var ComponentUseDeps = (0, _createReactClass2.default)({
      render: function render() {
        var _context2 = this.context,
            context = _context2.context,
            actions = _context2.actions;

        var mappedProps = mapper(context, actions);

        var newProps = (0, _extends3.default)({}, this.props, mappedProps);

        return _react2.default.createElement(Component, newProps);
      },


      contextTypes: {
        context: _propTypes2.default.object,
        actions: _propTypes2.default.object
      }
    });

    ComponentUseDeps.displayName = 'UseDeps(' + getDisplayName(Component) + ')';
    return (0, _hoistNonReactStatics2.default)(ComponentUseDeps, Component);
  };
}