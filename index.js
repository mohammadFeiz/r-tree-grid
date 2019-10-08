"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GridContext = (0, _react.createContext)();

var Grid =
/*#__PURE__*/
function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this, props));
    _this.state = {};
    _this.groupsOpen = [];
    return _this;
  }

  _createClass(Grid, [{
    key: "setGroupsOpen",
    value: function setGroupsOpen(model) {
      if (this.props.groupField) {
        this.groupsOpen = model.map(function (m) {
          return m._opened;
        });
      }
    }
  }, {
    key: "getValue",
    value: function getValue(row, field) {
      if (!field) {
        return undefined;
      }

      var fields = Array.isArray(field) ? field[row._level] : field;
      fields = fields.split('.');
      var value = row[fields[0]];

      if (value === undefined) {
        return undefined;
      }

      for (var i = 1; i < fields.length; i++) {
        value = value[fields[i]];

        if (value === undefined) {
          return undefined;
        }
      }

      return value;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var _this2 = this;

      var _this$props = this.props,
          groupField = _this$props.groupField,
          columns = _this$props.columns,
          checkField = _this$props.checkField;
      var size = columns.filter(function (column) {
        if (!groupField) {
          return true;
        }

        return !_this2.compaireFields(column.field, groupField);
      }).map(function (column) {
        return column.width ? column.width + 'px' : 'auto';
      });

      if (checkField) {
        size = ['30px'].concat(size);
      }

      return size.join(' ');
    }
  }, {
    key: "getTotal",
    value: function getTotal() {
      var _this3 = this;

      var _this$getTheme = this.getTheme(),
          borderWidth = _this$getTheme.borderWidth,
          _this$props2 = this.props,
          groupField = _this$props2.groupField,
          checkField = _this$props2.checkField;

      var columns = this.props.columns.filter(function (column) {
        return !_this3.compaireFields(column.field, groupField);
      });
      var length = columns.length,
          columnsWidth = 0;

      for (var i = 0; i < length; i++) {
        columnsWidth += columns[i].width;
      }

      var bordersWidth = (length + 1 + (checkField ? 1 : 0)) * borderWidth;
      return bordersWidth + columnsWidth + (checkField ? 30 : 0);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$getTheme2 = this.getTheme(),
          borderColor = _this$getTheme2.borderColor;

      var style = this.props.style;
      return _jquery.default.extend({}, {
        background: borderColor,
        borderColor: borderColor
      }, style);
    }
  }, {
    key: "getColumn",
    value: function getColumn(obj) {
      var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.columns;

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];

        for (var prop in obj) {
          if (!this.compaireFields(column[prop], obj[prop])) {
            continue;
          }

          return column;
        }
      }

      return false;
    }
  }, {
    key: "getValueByDataset",
    value: function getValueByDataset(obj, prop) {
      if (obj[prop] !== undefined) {
        return obj[prop];
      }

      var dataset = this.props.dataset;
      var datasetprop = Array.isArray(dataset[prop]) ? dataset[prop][obj._level] : dataset[prop];
      return obj[datasetprop];
    }
  }, {
    key: "setValueByDataset",
    value: function setValueByDataset(row, value, prop) {
      var fields = prop.split('.');
      var node = row;

      for (var i = 0; i < fields.length - 1; i++) {
        node = node[fields[i]];
      }

      node[fields[fields.length - 1]] = value;
    }
  }, {
    key: "getModel",
    value: function getModel(model) {
      var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.columns;
      var groupField = this.props.groupField;

      if (!groupField) {
        return model;
      }

      var column = this.getColumn({
        field: groupField
      }, columns);

      if (!column) {
        console.error("A column with field equal to groupField not found!!!");
        return model;
      }

      var g = {};

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        var field = this.getValue(row, groupField);

        if (field === '') {
          continue;
        }

        g[field] = g[field] || {
          _childs: []
        };
        g[field]._groupName = column.title + ':' + field;

        g[field]._childs.push(row);
      }

      var result = [];
      var j = 0;

      for (var prop in g) {
        g[prop]._opened = this.groupsOpen[j] === undefined ? true : this.groupsOpen[j];
        j++;
        result.push(g[prop]);
      }

      return result;
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      return _jquery.default.extend({}, {
        borderColor: '#ddd',
        borderWidth: 1,
        cellBackground: '#fff',
        headerBackground: '#eee',
        rowHeight: 30
      }, this.props.theme);
    }
  }, {
    key: "compaireFields",
    value: function compaireFields(a, b) {
      if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
          return false;
        }

        if (b.length !== a.length) {
          return false;
        }

        for (var i = 0; i < b.length; i++) {
          if (b[i] !== a[i]) {
            return false;
          }
        }

        return true;
      } else {
        return a === b;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          dataset = _this$props3.dataset,
          groupField = _this$props3.groupField,
          rtl = _this$props3.rtl,
          onchange = _this$props3.onchange;
      var columns = this.props.columns;
      var model = this.state.model;

      if (!columns || !model || !columns.length || !model.length) {
        return '';
      }

      var contextValue = { ...this.props
      };
      contextValue = _jquery.default.extend({}, contextValue, {
        theme: this.getTheme(),
        model: this.getModel(model),
        originalModel: model,
        originalColumns: columns,
        columns: columns.filter(function (column, i) {
          column.order = i;

          if (!groupField) {
            return true;
          }

          return !_this4.compaireFields(column.field, groupField);
        }),
        size: this.getSize(),
        total: this.getTotal(),
        getValueByDataset: this.getValueByDataset.bind(this),
        getModel: this.getModel.bind(this),
        getColumn: this.getColumn.bind(this),
        getValue: this.getValue.bind(this),
        compaireFields: this.compaireFields.bind(this),
        onToggle: function onToggle(model) {
          _this4.setGroupsOpen(model);

          _this4.setState({
            model: model
          });
        },
        onCheck: function onCheck(row, value, context) {
          _this4.setValueByDataset(row, value, dataset._checked);

          onchange({
            model: _this4.state.model
          }, context);
        },
        onGroupCheck: function onGroupCheck(row, value, context) {
          for (var i = 0; i < row._childs.length; i++) {
            _this4.setValueByDataset(row._childs[i], value, dataset._checked);
          }

          onchange({
            model: _this4.state.model
          }, context);
        }
      });
      return _react.default.createElement(GridContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: "grid".concat(rtl ? ' rtl' : ''),
        style: this.getStyle()
      }, _react.default.createElement(GridHeader, null), _react.default.createElement(GridRows, null)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var s = {
        model: props.model
      };
      return s;
    }
  }]);

  return Grid;
}(_react.Component);

exports.default = Grid;
Grid.defaultProps = {
  theme: {},
  dataType: 'composite'
};

var GridHeader =
/*#__PURE__*/
function (_Component2) {
  _inherits(GridHeader, _Component2);

  function GridHeader() {
    _classCallCheck(this, GridHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridHeader).apply(this, arguments));
  }

  _createClass(GridHeader, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context = this.context,
          size = _this$context.size,
          theme = _this$context.theme,
          total = _this$context.total;
      return {
        gridTemplateColumns: size,
        gridColumnGap: theme.borderWidth + 'px',
        padding: (theme.borderWidth || 1) + 'px',
        width: total + 'px'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var checkField = this.context.checkField;
      var columns = (checkField ? [{
        width: 30,
        resizable: false
      }] : []).concat(this.context.columns);
      var titles = columns.map(function (column, i) {
        return _react.default.createElement(GridTitle, {
          column: column,
          key: i,
          index: i
        });
      });
      return _react.default.createElement("div", {
        className: "grid-header",
        style: this.getStyle()
      }, titles);
    }
  }]);

  return GridHeader;
}(_react.Component);

_defineProperty(GridHeader, "contextType", GridContext);

var GridTitle =
/*#__PURE__*/
function (_Component3) {
  _inherits(GridTitle, _Component3);

  function GridTitle(props) {
    var _this5;

    _classCallCheck(this, GridTitle);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(GridTitle).call(this, props));

    _defineProperty(_assertThisInitialized(_this5), "moveMove", function (e) {
      var _this5$startOffset = _this5.startOffset,
          width = _this5$startOffset.width,
          height = _this5$startOffset.height;
      e.preventDefault();
      (0, _jquery.default)(".grid-title-shadow").css({
        left: e.clientX - width / 2,
        top: e.clientY - (height + 2)
      });
    });

    _defineProperty(_assertThisInitialized(_this5), "moveUp", function (e) {
      (0, _jquery.default)(window).off("mousemove", _this5.moveMove);
      (0, _jquery.default)(window).off("mouseup", _this5.moveUp);
      (0, _jquery.default)('.move-handle').off("mouseenter");
      (0, _jquery.default)(".grid-title-shadow").remove();
      var so = _this5.startOffset;

      if (so.to !== 0 && !so.to) {
        return;
      }

      var _this5$context = _this5.context,
          columns = _this5$context.originalColumns,
          onchange = _this5$context.onchange;

      if (so.from === so.to) {
        return;
      }

      ;
      var temp = columns[so.from];
      columns[so.from] = columns[so.to];
      columns[so.to] = temp;
      onchange({
        columns: columns
      }, _this5.context);
    });

    _defineProperty(_assertThisInitialized(_this5), "resizeUp", function (e) {
      var _this5$context2 = _this5.context,
          onchange = _this5$context2.onchange,
          originalColumns = _this5$context2.originalColumns;
      var _this5$startOffset2 = _this5.startOffset,
          column = _this5$startOffset2.column,
          newWidth = _this5$startOffset2.newWidth;
      column.width = newWidth;
      onchange({
        columns: originalColumns
      }, _this5.context);
      (0, _jquery.default)(window).off("mousemove", _this5.resizeMouseMove);
      (0, _jquery.default)(window).off("mouseup", _this5.resizeMouseUp);
    });

    _defineProperty(_assertThisInitialized(_this5), "resizeMove", function (e) {
      e.preventDefault();
      var rtl = _this5.context.rtl;
      var so = _this5.startOffset;
      var offset = (so.x - e.clientX) * (rtl ? 1 : -1);
      var newWidth = so.width + offset;
      newWidth = newWidth < so.minWidth ? so.minWidth : newWidth;
      so.newWidth = newWidth;
      so.size[so.index] = newWidth;
      so.gridTemplateColumns = '';
      var theme = _this5.context.theme;
      var total = theme.borderWidth;

      for (var i = 0; i < so.size.length; i++) {
        var size = so.size[i];
        total += size + theme.borderWidth;
        so.gridTemplateColumns += size === 'auto' ? 'auto ' : size + 'px ';
      }

      so.container.css({
        gridTemplateColumns: so.gridTemplateColumns
      });
      so.gridRows.css('width', total);
    });

    _this5.dom = (0, _react.createRef)();
    return _this5;
  }

  _createClass(GridTitle, [{
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var column = this.props.column;
      return {
        background: theme.headerBackground,
        height: theme.rowHeight + 'px',
        lineHeight: theme.rowHeight + 'px',
        boxShadow: "0 0 0 ".concat(theme.borderWidth || 1, "px ").concat(theme.borderColor),
        minWidth: column.minWidth ? column.minWidth + 'px' : undefined
      };
    }
  }, {
    key: "moveDown",
    value: function moveDown(column, e) {
      var _this6 = this;

      if (e.button === 2) return;

      if (column.order === undefined) {
        return;
      }

      var dom = (0, _jquery.default)(e.target);
      this.startOffset = {
        from: column.order,
        width: dom.width(),
        height: dom.height()
      };
      (0, _jquery.default)("body").append(this.getShadow(column.title, e));
      (0, _jquery.default)(window).on("mousemove", this.moveMove);
      (0, _jquery.default)(window).on("mouseup", this.moveUp);
      (0, _jquery.default)('.move-handle').on("mouseenter", function (e) {
        _this6.startOffset.to = parseInt((0, _jquery.default)(e.target).attr('data-index'));
      });
    }
  }, {
    key: "getShadow",
    value: function getShadow(title, e) {
      var _this$context$theme = this.context.theme,
          headerBackground = _this$context$theme.headerBackground,
          borderColor = _this$context$theme.borderColor;
      var _this$startOffset = this.startOffset,
          width = _this$startOffset.width,
          height = _this$startOffset.height;
      var style = "width:".concat(width, "px;left:").concat(e.clientX - width / 2, "px;top:").concat(e.clientY - (height + 2), "px;background:").concat(headerBackground, ";border:1px solid ").concat(borderColor, ";z-index:100;font-size:11px;");
      return " \n    <div class=\"grid-title grid-title-shadow\" style=\"".concat(style, "\">\n      ").concat(title, "\n    </div>");
    }
  }, {
    key: "resizeDown",
    value: function resizeDown(column, e) {
      if (column.width === 'auto' || !column.width || column.resizable === false) {
        return;
      }

      var dom = (0, _jquery.default)(e.target);
      var grid = dom.parents('.grid');
      var gridRows = grid.find('.grid-rows');
      this.startOffset = {
        column: column,
        index: parseInt(dom.attr('data-index')),
        minWidth: column.minWidth || 40,
        width: parseInt(column.width),
        //عرض ستون
        x: e.clientX,
        // موقعیت در راستای افق
        size: this.context.size.split(' ').map(function (a) {
          return a === 'auto' ? 'auto' : parseInt(a);
        }),
        container: grid.find(".grid-header,.grid-row"),
        gridRowsWidth: parseInt(gridRows.css('width')),
        gridRows: gridRows
      };
      (0, _jquery.default)(window).on("mousemove", this.resizeMove);
      (0, _jquery.default)(window).on("mouseup", this.resizeUp);
    }
  }, {
    key: "toggleSetting",
    value: function toggleSetting(column, e) {
      (0, _jquery.default)(this.dom.current).find('.column-popup').toggle();
    }
  }, {
    key: "setGroup",
    value: function setGroup() {}
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props4 = this.props,
          column = _this$props4.column,
          index = _this$props4.index;
      var _column$options = column.options,
          options = _column$options === void 0 ? [] : _column$options;
      var Options = options.map(function (option) {
        return _react.default.createElement("li", {
          className: "column-option".concat(option.checked ? ' checked' : ''),
          onClick: option.callback,
          "data-value": option.value
        }, option.text);
      });
      return _react.default.createElement("div", {
        className: "grid-title",
        style: this.getStyle(),
        ref: this.dom
      }, _react.default.createElement("div", {
        className: "move-handle",
        "data-index": column.order,
        onMouseDown: function onMouseDown(e) {
          _this7.moveDown(column, e);
        }
      }, column.title), _react.default.createElement("div", {
        className: "resize-handle",
        "data-index": index,
        onMouseDown: function onMouseDown(e) {
          _this7.resizeDown(column, e);
        }
      }), _react.default.createElement("div", {
        className: "column-setting",
        "data-index": index,
        onMouseDown: function onMouseDown(e) {
          _this7.toggleSetting(column, e);
        }
      }), Options.length > 0 && _react.default.createElement("ul", {
        className: "column-popup"
      }, _react.default.createElement("li", {
        className: "backdrop",
        onMouseDown: this.toggleSetting.bind(this)
      }), _react.default.createElement("li", {
        className: "active",
        onMouseDown: this.setGroup.bind(this)
      }, 'Group')));
    }
  }]);

  return GridTitle;
}(_react.Component);

_defineProperty(GridTitle, "contextType", GridContext);

var GridRows =
/*#__PURE__*/
function (_Component4) {
  _inherits(GridRows, _Component4);

  function GridRows() {
    _classCallCheck(this, GridRows);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridRows).apply(this, arguments));
  }

  _createClass(GridRows, [{
    key: "getRows",
    value: function getRows() {
      var _this$context2 = this.context,
          model = _this$context2.model,
          groupField = _this$context2.groupField;
      this.rows = [];
      this._order = 0;
      this.getRowsRecursive(model, groupField ? -1 : 0);
      return this.rows;
    }
  }, {
    key: "getRowsRecursive",
    value: function getRowsRecursive(model, level) {
      var getValueByDataset = this.context.getValueByDataset;

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        row._order = this._order;
        row._level = level;
        row._opened = row._opened === undefined ? true : row._opened;
        row._childs = getValueByDataset(row, '_childs');
        var props = {
          row: row,
          key: row._order,
          isFirst: row._order === 0
        };
        this.rows.push(row._groupName !== undefined ? _react.default.createElement(GroupRow, props) : _react.default.createElement(GridRow, props));
        this._order++;
        var childs = row._childs;

        if (childs && childs.length && row._opened !== false) {
          this.getRowsRecursive(childs, level + 1);
        }
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$context3 = this.context,
          theme = _this$context3.theme,
          total = _this$context3.total;
      return {
        background: theme.borderColor,
        padding: (theme.borderWidth || 1) + 'px',
        paddingTop: 0,
        width: total + (theme.borderWidth === 0 ? 2 : 0) + 'px',
        boxSizing: 'border-box'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var rows = this.getRows();
      return _react.default.createElement("ul", {
        className: "grid-rows",
        style: this.getStyle()
      }, rows);
    }
  }]);

  return GridRows;
}(_react.Component);

_defineProperty(GridRows, "contextType", GridContext);

var GridRow =
/*#__PURE__*/
function (_Component5) {
  _inherits(GridRow, _Component5);

  function GridRow() {
    _classCallCheck(this, GridRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridRow).apply(this, arguments));
  }

  _createClass(GridRow, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context4 = this.context,
          size = _this$context4.size,
          theme = _this$context4.theme;
      var isFirst = this.props.isFirst;
      return {
        gridTemplateColumns: size,
        gridColumnGap: theme.borderWidth,
        marginTop: isFirst ? 0 : theme.borderWidth || 1
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context5 = this.context,
          columns = _this$context5.columns,
          checkField = _this$context5.checkField;
      var row = this.props.row;
      var cells = checkField ? [_react.default.createElement(GridCell, {
        column: "checkbox",
        row: row,
        key: "checkbox"
      })] : [];
      cells = cells.concat(columns.map(function (column, i) {
        return _react.default.createElement(GridCell, {
          column: column,
          row: row,
          key: i
        });
      }));
      return _react.default.createElement("li", {
        className: "grid-row",
        style: this.getStyle()
      }, cells);
    }
  }]);

  return GridRow;
}(_react.Component);

_defineProperty(GridRow, "contextType", GridContext);

var GroupRow =
/*#__PURE__*/
function (_Component6) {
  _inherits(GroupRow, _Component6);

  function GroupRow() {
    _classCallCheck(this, GroupRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(GroupRow).apply(this, arguments));
  }

  _createClass(GroupRow, [{
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var isFirst = this.props.isFirst;
      return {
        background: theme.cellBackground,
        marginTop: isFirst ? 0 : theme.borderWidth || 1,
        height: '24px',
        lineHeight: '24px'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var row = this.props.row;
      var _this$context6 = this.context,
          checkField = _this$context6.checkField,
          onGroupCheck = _this$context6.onGroupCheck;
      return _react.default.createElement("li", {
        className: "grid-group-row",
        style: this.getStyle()
      }, row._childs && row._childs.length && _react.default.createElement(GridToggleIcon, {
        row: row
      }), checkField && _react.default.createElement("div", {
        className: "grid-checkbox"
      }, _react.default.createElement(GridCheckbox, {
        checked: row._checked,
        onchange: function onchange(e) {
          onGroupCheck(row, e.target.checked, _this8.context);
        }
      })), _react.default.createElement(GridText, {
        text: row._groupName
      }));
    }
  }]);

  return GroupRow;
}(_react.Component);

_defineProperty(GroupRow, "contextType", GridContext);

var GridCell =
/*#__PURE__*/
function (_Component7) {
  _inherits(GridCell, _Component7);

  function GridCell() {
    _classCallCheck(this, GridCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridCell).apply(this, arguments));
  }

  _createClass(GridCell, [{
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var column = this.props.column;
      return {
        background: theme.cellBackground,
        lineHeight: theme.rowHeight + 'px',
        height: theme.rowHeight + 'px',
        minWidth: column.minWidth ? column.minWidth + 'px' : undefined
      };
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _this$context7 = this.context,
          treeField = _this$context7.treeField,
          compaireFields = _this$context7.compaireFields;
      var column = this.props.column;

      if (column === 'checkbox') {
        return 'grid-cell grid-cell-checkbox';
      }

      if (compaireFields(column.field, treeField)) {
        return 'grid-cell grid-cell-tree';
      }

      return "grid-cell".concat(column.cellsClassName ? ' ' + column.cellsClassName : ' grid-cell-text');
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(row, column) {
      var _this9 = this;

      var _this$context8 = this.context,
          treeField = _this$context8.treeField,
          checkField = _this$context8.checkField,
          onCheck = _this$context8.onCheck,
          dataset = _this$context8.dataset,
          getValue = _this$context8.getValue,
          compaireFields = _this$context8.compaireFields;

      if (column === 'checkbox') {
        return _react.default.createElement(GridCheckbox, {
          disabled: checkField.disabled(row),
          checked: row[dataset._checked] || false,
          onchange: function onchange(e) {
            onCheck(row, e.target.checked, _this9.context);
          }
        });
      }

      if (compaireFields(column.field, treeField)) {
        return _react.default.createElement(TreeCell, {
          row: row,
          column: column,
          value: getValue(row, column.field)
        });
      }

      var value = getValue(row, column.field);

      if (!column.template) {
        return value === undefined ? '' : value;
      } else {
        return column.template(value, {
          row: row,
          column: column
        }, this.context);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          row = _this$props5.row,
          column = _this$props5.column;
      return _react.default.createElement("div", {
        className: this.getClassName(),
        style: this.getStyle()
      }, this.getTemplate(row, column));
    }
  }]);

  return GridCell;
}(_react.Component);

_defineProperty(GridCell, "contextType", GridContext);

var TreeCell =
/*#__PURE__*/
function (_Component8) {
  _inherits(TreeCell, _Component8);

  function TreeCell() {
    _classCallCheck(this, TreeCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(TreeCell).apply(this, arguments));
  }

  _createClass(TreeCell, [{
    key: "getStyle",
    value: function getStyle() {
      var rtl = this.context.rtl;
      var row = this.props.row;
      return _defineProperty({}, 'padding' + (rtl ? 'Right' : 'Left'), row._level * 12);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          row = _this$props6.row,
          value = _this$props6.value;
      return _react.default.createElement("div", {
        className: "grid-tree-cell",
        style: this.getStyle()
      }, _react.default.createElement(GridToggleIcon, {
        row: row
      }), _react.default.createElement(GridText, {
        text: value
      }));
    }
  }]);

  return TreeCell;
}(_react.Component);

_defineProperty(TreeCell, "contextType", GridContext);

var GridText =
/*#__PURE__*/
function (_Component9) {
  _inherits(GridText, _Component9);

  function GridText() {
    _classCallCheck(this, GridText);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridText).apply(this, arguments));
  }

  _createClass(GridText, [{
    key: "render",
    value: function render() {
      var text = this.props.text;
      return _react.default.createElement("div", {
        className: "grid-text"
      }, text);
    }
  }]);

  return GridText;
}(_react.Component);

var GridToggleIcon =
/*#__PURE__*/
function (_Component10) {
  _inherits(GridToggleIcon, _Component10);

  function GridToggleIcon() {
    _classCallCheck(this, GridToggleIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridToggleIcon).apply(this, arguments));
  }

  _createClass(GridToggleIcon, [{
    key: "getClassName",
    value: function getClassName(row) {
      var hasChild = row._childs && row._childs.length;
      var className = 'grid-toggle-icon';

      if (!hasChild) {
        return className;
      }

      className += row._opened ? ' opened' : ' closed';
      return className;
    }
  }, {
    key: "click",
    value: function click() {
      var _this$context9 = this.context,
          onToggle = _this$context9.onToggle,
          model = _this$context9.model;
      var row = this.props.row;

      if (!row._childs || !row._childs.length) {
        return;
      }

      row._opened = !row._opened;
      onToggle(model);
    }
  }, {
    key: "render",
    value: function render() {
      var row = this.props.row;
      return _react.default.createElement("div", {
        className: this.getClassName(row),
        onClick: this.click.bind(this)
      });
    }
  }]);

  return GridToggleIcon;
}(_react.Component);

_defineProperty(GridToggleIcon, "contextType", GridContext);

var GridCheckbox =
/*#__PURE__*/
function (_Component11) {
  _inherits(GridCheckbox, _Component11);

  function GridCheckbox() {
    _classCallCheck(this, GridCheckbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridCheckbox).apply(this, arguments));
  }

  _createClass(GridCheckbox, [{
    key: "change",
    value: function change(e) {
      this.props.onchange(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          checked = _this$props7.checked,
          disabled = _this$props7.disabled;
      return _react.default.createElement("input", {
        type: "checkbox",
        onChange: this.change.bind(this),
        checked: checked,
        disabled: disabled
      });
    }
  }]);

  return GridCheckbox;
}(_react.Component);