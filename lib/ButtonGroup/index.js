"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Wrap = function Wrap(_ref) {
  var space = _ref.space,
      children = _ref.children;
  return _react["default"].createElement("span", {
    style: {
      marginLeft: space
    }
  }, children);
};

var ButtonGroup = function ButtonGroup(_ref2) {
  var count = _ref2.count,
      space = _ref2.space,
      title = _ref2.title,
      children = _ref2.children,
      ghost = _ref2.ghost,
      disabled = _ref2.disabled;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  (0, _react.useEffect)(function () {
    var hideMenu = function hideMenu() {
      if (visible) {
        setVisible(false);
      }
    };

    document.addEventListener("click", hideMenu, false);
    return function () {
      document.removeEventListener("click", hideMenu, false);
    };
  });

  var buttons = function buttons(btns) {
    if (btns) {
      return btns.map(function (_ref3) {
        var component = _ref3.component,
            key = _ref3.key;
        return _react["default"].createElement(Wrap, {
          space: space,
          key: key
        }, component);
      });
    }

    return btns;
  };

  if (children && Array.isArray(children)) {
    var childs = children.map(function (ele, i) {
      return {
        key: i,
        component: ele
      };
    }).filter(function (ele) {
      return !!ele.component;
    });

    if (childs.length > count) {
      var visibleButtons = childs.slice(0, count - 1);
      var moreButtons = childs.slice(count - 1);
      return _react["default"].createElement(_react["default"].Fragment, null, buttons(visibleButtons), _react["default"].createElement(Wrap, {
        space: space
      }, _react["default"].createElement(_antd.Popover, {
        visible: visible,
        mouseLeaveDelay: 0.15,
        placement: "bottomRight",
        overlayClassName: "popover-more-button",
        content: moreButtons.map(function (_ref4) {
          var component = _ref4.component,
              key = _ref4.key;
          return _react["default"].createElement("div", {
            key: key,
            onClick: function onClick() {
              return setVisible(false);
            }
          }, component);
        })
      }, _react["default"].createElement(_antd.Button, {
        type: "primary",
        ghost: ghost,
        disabled: disabled,
        onClick: function onClick() {
          return setVisible(!visible);
        }
      }, title, _react["default"].createElement(_antd.Icon, {
        type: "down"
      })))));
    }

    return buttons(childs);
  }

  return children;
};

ButtonGroup.defaultProps = {
  // 展示的按钮
  count: 4,
  // 间距
  space: 12,
  // 名称
  title: "更多",
  // 按钮类型
  ghost: true,
  // 按钮置灰
  disabled: false
};
ButtonGroup.propTypes = {
  count: _propTypes["default"].number,
  space: _propTypes["default"].number,
  title: _propTypes["default"].string,
  ghost: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool
};
var _default = ButtonGroup;
exports["default"] = _default;