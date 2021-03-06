"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

var keys = {
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  SPACE: 32
};

var DayPicker = (function (_Component) {
  _inherits(DayPicker, _Component);

  _createClass(DayPicker, null, [{
    key: "propTypes",
    value: {

      className: _react.PropTypes.string,
      style: _react.PropTypes.object,
      tabIndex: _react.PropTypes.number,

      initialMonth: _react.PropTypes.instanceOf(Date),
      numberOfMonths: _react.PropTypes.number,

      modifiers: _react.PropTypes.object,

      locale: _react.PropTypes.string,
      localeUtils: _react.PropTypes.shape({
        formatMonthTitle: _react.PropTypes.func.isRequired,
        formatWeekdayShort: _react.PropTypes.func.isRequired,
        formatWeekdayLong: _react.PropTypes.func.isRequired,
        getFirstDayOfWeek: _react.PropTypes.func.isRequired
      }),

      enableOutsideDays: _react.PropTypes.bool,
      canChangeMonth: _react.PropTypes.bool,

      onDayClick: _react.PropTypes.func,
      onDayTouchTap: _react.PropTypes.func,
      onDayMouseEnter: _react.PropTypes.func,
      onDayMouseLeave: _react.PropTypes.func,
      onMonthChange: _react.PropTypes.func,
      onCaptionClick: _react.PropTypes.func,

      renderDay: _react.PropTypes.func

    },
    enumerable: true
  }, {
    key: "defaultProps",
    value: {
      tabIndex: 0,
      initialMonth: new Date(),
      numberOfMonths: 1,
      locale: "en",
      localeUtils: _Utils2["default"],
      enableOutsideDays: false,
      canChangeMonth: true,
      renderDay: function renderDay(day) {
        return day.getDate();
      }
    },
    enumerable: true
  }]);

  function DayPicker(props) {
    _classCallCheck(this, DayPicker);

    _get(Object.getPrototypeOf(DayPicker.prototype), "constructor", this).call(this, props);
    this.state = {
      currentMonth: _Utils2["default"].startOfMonth(props.initialMonth)
    };
  }

  _createClass(DayPicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.initialMonth !== nextProps.initialMonth) {
        this.setState({
          currentMonth: _Utils2["default"].startOfMonth(nextProps.initialMonth)
        });
      }
    }
  }, {
    key: "showMonth",
    value: function showMonth(d) {
      this.setState({
        currentMonth: _Utils2["default"].startOfMonth(d)
      });
    }
  }, {
    key: "showNextMonth",
    value: function showNextMonth(callback) {
      var _this = this;

      var currentMonth = this.state.currentMonth;

      var nextMonth = _Utils2["default"].addMonths(currentMonth, 1);
      this.setState({
        currentMonth: nextMonth
      }, function () {
        if (callback) {
          callback();
        }
        if (_this.props.onMonthChange) {
          _this.props.onMonthChange(_this.state.currentMonth);
        }
      });
    }
  }, {
    key: "showPreviousMonth",
    value: function showPreviousMonth(callback) {
      var _this2 = this;

      var currentMonth = this.state.currentMonth;

      var prevMonth = _Utils2["default"].addMonths(currentMonth, -1);
      this.setState({
        currentMonth: prevMonth
      }, function () {
        if (callback) {
          callback();
        }
        if (_this2.props.onMonthChange) {
          _this2.props.onMonthChange(_this2.state.currentMonth);
        }
      });
    }

    // Show the month(s) belonging to an outside day, counting the
    // number of months actually shown in the calendar.
  }, {
    key: "showMonthsForOutsideDay",
    value: function showMonthsForOutsideDay(day) {
      var currentMonth = this.state.currentMonth;
      var numberOfMonths = this.props.numberOfMonths;

      var diffInMonths = _Utils2["default"].getMonthsDiff(currentMonth, day);
      if (diffInMonths > 0 && diffInMonths >= numberOfMonths) {
        var nextMonth = _Utils2["default"].addMonths(currentMonth, numberOfMonths);
        this.setState({
          currentMonth: nextMonth
        });
      } else if (diffInMonths < 0) {
        var prevMonth = _Utils2["default"].addMonths(currentMonth, -numberOfMonths);
        this.setState({
          currentMonth: prevMonth
        });
      }
    }
  }, {
    key: "focusPreviousDay",
    value: function focusPreviousDay(dayNode) {
      var body = dayNode.parentNode.parentNode.parentNode.parentNode;
      var dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
      var nodeIndex = undefined;
      for (var i = 0; i < dayNodes.length; i++) {
        if (dayNodes[i] === dayNode) {
          nodeIndex = i;
          break;
        }
      }
      if (nodeIndex === 0) {
        var currentMonth = this.state.currentMonth;
        var numberOfMonths = this.props.numberOfMonths;

        var prevMonth = _Utils2["default"].addMonths(currentMonth, -numberOfMonths);
        this.setState({
          currentMonth: prevMonth
        }, function () {
          dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
          dayNodes[dayNodes.length - 1].focus();
        });
      } else {
        dayNodes[nodeIndex - 1].focus();
      }
    }
  }, {
    key: "focusNextDay",
    value: function focusNextDay(dayNode) {
      var body = dayNode.parentNode.parentNode.parentNode.parentNode;
      var dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
      var nodeIndex = undefined;
      for (var i = 0; i < dayNodes.length; i++) {
        if (dayNodes[i] === dayNode) {
          nodeIndex = i;
          break;
        }
      }

      if (nodeIndex === dayNodes.length - 1) {
        var currentMonth = this.state.currentMonth;
        var numberOfMonths = this.props.numberOfMonths;

        var nextMonth = _Utils2["default"].addMonths(currentMonth, numberOfMonths);
        this.setState({
          currentMonth: nextMonth
        }, function () {
          dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
          dayNodes[0].focus();
        });
      } else {
        dayNodes[nodeIndex + 1].focus();
      }
    }

    // Event handlers

  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      switch (e.keyCode) {
        case keys.LEFT:
          this.showPreviousMonth();
          break;
        case keys.RIGHT:
          this.showNextMonth();
          break;
      }
    }
  }, {
    key: "handleDayKeyDown",
    value: function handleDayKeyDown(e, day, modifiers) {
      e.persist();
      switch (e.keyCode) {
        case keys.LEFT:
          e.preventDefault();
          e.stopPropagation();
          this.focusPreviousDay(e.target);
          break;
        case keys.RIGHT:
          e.preventDefault();
          e.stopPropagation();
          this.focusNextDay(e.target);
          break;
        case keys.ENTER:
        case keys.SPACE:
          e.preventDefault();
          e.stopPropagation();
          if (this.props.onDayClick) {
            this.handleDayClick(e, day, modifiers);
          }
          if (this.props.onDayTouchTap) {
            this.handleDayTouchTap(e, day, modifiers);
          }
          break;
      }
    }
  }, {
    key: "handleNextMonthClick",
    value: function handleNextMonthClick(e) {
      e.stopPropagation();
      this.showNextMonth();
    }
  }, {
    key: "handlePrevMonthClick",
    value: function handlePrevMonthClick(e) {
      e.stopPropagation();
      this.showPreviousMonth();
    }
  }, {
    key: "handleCaptionClick",
    value: function handleCaptionClick(e, currentMonth) {
      e.persist();
      this.props.onCaptionClick(e, currentMonth);
    }
  }, {
    key: "handleDayTouchTap",
    value: function handleDayTouchTap(e, day, modifiers) {
      e.persist();
      if (modifiers.indexOf("outside") > -1) {
        this.showMonthsForOutsideDay(day);
      }
      this.props.onDayTouchTap(e, day, modifiers);
    }
  }, {
    key: "handleDayClick",
    value: function handleDayClick(e, day, modifiers) {
      e.persist();
      if (modifiers.indexOf("outside") > -1) {
        this.showMonthsForOutsideDay(day);
      }

      this.props.onDayClick(e, day, modifiers);
    }
  }, {
    key: "handleDayMouseEnter",
    value: function handleDayMouseEnter(e, day, modifiers) {
      e.persist();
      this.props.onDayMouseEnter(e, day, modifiers);
    }
  }, {
    key: "handleDayMouseLeave",
    value: function handleDayMouseLeave(e, day, modifiers) {
      e.persist();
      this.props.onDayMouseLeave(e, day, modifiers);
    }
  }, {
    key: "renderNavBar",
    value: function renderNavBar() {
      var baseClass = "DayPicker-NavButton DayPicker-NavButton";
      return _react2["default"].createElement(
        "div",
        { className: "DayPicker-NavBar" },
        _react2["default"].createElement("span", {
          key: "prev",
          className: baseClass + "--prev",
          onClick: this.handlePrevMonthClick.bind(this) }),
        _react2["default"].createElement("span", {
          key: "next",
          className: baseClass + "--next",
          onClick: this.handleNextMonthClick.bind(this) })
      );
    }
  }, {
    key: "renderMonth",
    value: function renderMonth(d, i) {
      var _this3 = this;

      var _props = this.props;
      var locale = _props.locale;
      var localeUtils = _props.localeUtils;
      var onCaptionClick = _props.onCaptionClick;
      var currentMonth = this.state.currentMonth;

      return _react2["default"].createElement(
        "div",
        {
          className: "DayPicker-Month",
          key: i },
        _react2["default"].createElement(
          "div",
          { className: "DayPicker-Caption", onClick: onCaptionClick ? function (e) {
              return _this3.handleCaptionClick(e, currentMonth);
            } : null },
          localeUtils.formatMonthTitle(d, locale)
        ),
        _react2["default"].createElement(
          "div",
          { className: "DayPicker-Weekdays" },
          this.renderWeekDays()
        ),
        _react2["default"].createElement(
          "div",
          { className: "DayPicker-Body" },
          this.renderWeeksInMonth(d)
        )
      );
    }
  }, {
    key: "renderWeekDays",
    value: function renderWeekDays() {
      var _props2 = this.props;
      var locale = _props2.locale;
      var localeUtils = _props2.localeUtils;

      var days = [];
      for (var i = 0; i < 7; i++) {
        days.push(_react2["default"].createElement(
          "div",
          { key: i, className: "DayPicker-Weekday" },
          _react2["default"].createElement(
            "attr",
            { title: localeUtils.formatWeekdayLong(i, locale) },
            localeUtils.formatWeekdayShort(i, locale)
          )
        ));
      }
      return _react2["default"].createElement(
        "div",
        null,
        days
      );
    }
  }, {
    key: "renderWeeksInMonth",
    value: function renderWeeksInMonth(month) {
      var _this4 = this;

      var _props3 = this.props;
      var locale = _props3.locale;
      var localeUtils = _props3.localeUtils;

      var firstDayOfWeek = localeUtils.getFirstDayOfWeek(locale);
      return _Utils2["default"].getWeekArray(month, firstDayOfWeek).map(function (week, i) {
        return _react2["default"].createElement(
          "div",
          { key: i, className: "DayPicker-Week", role: "row" },
          week.map(function (day) {
            return _this4.renderDay(month, day);
          })
        );
      });
    }
  }, {
    key: "renderDay",
    value: function renderDay(month, day) {
      var _this5 = this;

      var renderDay = this.props.renderDay;
      var _props4 = this.props;
      var enableOutsideDays = _props4.enableOutsideDays;
      var modifierFunctions = _props4.modifiers;

      var className = "DayPicker-Day";
      var modifiers = [];
      var key = "" + day.getFullYear() + day.getMonth() + day.getDate();

      var isToday = _Utils2["default"].isSameDay(day, new Date());
      if (isToday) {
        modifiers.push("today");
      }

      var isOutside = _Utils2["default"].isDayOutsideMonth(day, month);
      if (isOutside) {
        modifiers.push("outside");
      }

      if (modifierFunctions) {
        var customModifiers = _Utils2["default"].getModifiersForDay(day, modifierFunctions);
        modifiers = [].concat(_toConsumableArray(modifiers), _toConsumableArray(customModifiers));
      }

      className += modifiers.map(function (modifier) {
        return " " + className + "--" + modifier;
      }).join("");

      if (isOutside && !enableOutsideDays) {
        return _react2["default"].createElement("div", { key: "outside-" + key, className: className });
      }

      var _props5 = this.props;
      var onDayMouseEnter = _props5.onDayMouseEnter;
      var onDayMouseLeave = _props5.onDayMouseLeave;
      var onDayTouchTap = _props5.onDayTouchTap;
      var onDayClick = _props5.onDayClick;

      var tabIndex = null;
      if ((onDayTouchTap || onDayClick) && !isOutside) {
        tabIndex = -1;
        // Focus on the first day of the month
        if (day.getDate() === 1) {
          tabIndex = this.props.tabIndex;
        }
      }
      return _react2["default"].createElement(
        "div",
        { key: key, className: className,
          tabIndex: tabIndex,
          role: "gridcell",
          onKeyDown: function (e) {
            return _this5.handleDayKeyDown(e, day, modifiers);
          },
          onMouseEnter: onDayMouseEnter ? function (e) {
            return _this5.handleDayMouseEnter(e, day, modifiers);
          } : null,
          onMouseLeave: onDayMouseLeave ? function (e) {
            return _this5.handleDayMouseLeave(e, day, modifiers);
          } : null,
          onClick: onDayClick ? function (e) {
            return _this5.handleDayClick(e, day, modifiers);
          } : null,
          onTouchTap: onDayTouchTap ? function (e) {
            return _this5.handleDayTouchTap(e, day, modifiers);
          } : null
        },
        renderDay(day)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _props6 = this.props;
      var numberOfMonths = _props6.numberOfMonths;
      var locale = _props6.locale;
      var style = _props6.style;
      var tabIndex = _props6.tabIndex;
      var canChangeMonth = _props6.canChangeMonth;
      var currentMonth = this.state.currentMonth;

      var className = "DayPicker DayPicker--" + locale;

      if (!this.props.onDayClick && !this.props.onDayTouchTap) {
        className = className + " DayPicker--interactionDisabled";
      }
      if (this.props.className) {
        className = className + " " + this.props.className;
      }

      var months = [];
      var month = undefined;
      for (var i = 0; i < numberOfMonths; i++) {
        month = _Utils2["default"].addMonths(currentMonth, i);
        months.push(this.renderMonth(month, i));
      }

      return _react2["default"].createElement(
        "div",
        { className: className,
          style: style,
          role: "widget",
          tabIndex: canChangeMonth && tabIndex,
          onKeyDown: canChangeMonth && this.handleKeyDown.bind(this) },
        canChangeMonth && this.renderNavBar(),
        months
      );
    }
  }]);

  return DayPicker;
})(_react.Component);

exports["default"] = DayPicker;
module.exports = exports["default"];
//# sourceMappingURL=DayPicker.js.map