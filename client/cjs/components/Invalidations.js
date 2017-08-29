'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Invalidations = props => {
  const item = ({ message, property }) => {
    return _react2.default.createElement(
      'p',
      { key: property },
      _react2.default.createElement(
        'strong',
        null,
        message
      )
    );
  };

  const items = () => {
    if (props.items.length > 0) {
      return _react2.default.createElement(
        'aside',
        { className: 'danger' },
        props.items.map(item)
      );
    }
  };

  return items() || null;
};

Invalidations.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    message: _propTypes2.default.string,
    property: _propTypes2.default.string
  })).isRequired
};

exports.default = Invalidations;