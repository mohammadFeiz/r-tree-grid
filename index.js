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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
    _this.state = {
      model: _this.getModel(_this.props.model),
      columns: _this.getColumns(_this.props.columns),
      prevModel: _this.props.model,
      prevColumns: _this.props.columns,
      getModel: _this.getModel.bind(_assertThisInitialized(_this)),
      getColumns: _this.getColumns.bind(_assertThisInitialized(_this))
    };
    return _this;
  }

  _createClass(Grid, [{
    key: "getCheckboxColumn",
    value: function getCheckboxColumn() {
      var _this$props = this.props,
          checkField = _this$props.checkField,
          dataset = _this$props.dataset;

      if (!checkField) {
        return [];
      }

      return [{
        width: 30,
        resizable: false,
        movable: false,
        cellsClassName: 'grid-cell-checkbox',
        field: dataset._checked,
        template: function template(value, _ref, context) {
          var row = _ref.row,
              column = _ref.column;
          var _onchange = context.onchange,
              dataset = context.dataset,
              model = context.model,
              setValueByDataset = context.setValueByDataset;

          var a = _react.default.createElement(GridCheckbox, {
            checked: value || false,
            disabled: checkField.disabled(row),
            onchange: function onchange(e) {
              setValueByDataset(row, e.target.checked, dataset._checked);

              _onchange({
                model: model
              });
            }
          });

          return a;
        }
      }];
    }
  }, {
    key: "getRowsByParent",
    value: function getRowsByParent(model, parentKey, parentValue, result) {
      for (var i = 0; i < model.length; i++) {
        var row = model[i];

        if (row[parentKey] === parentValue) {
          result.push(row);
          model.splice(i, 1);
          i--;
        }
      }

      return {
        result: result,
        model: model
      };
    }
  }, {
    key: "convertModel",
    value: function convertModel(model, dataset) {
      var _this2 = this;

      var convertModelRecursive = function convertModelRecursive(model, parent, result) {
        var a = _this2.getRowsByParent(model, dataset._parent, parent, result);

        for (var i = 0; i < a.result.length; i++) {
          var row = a.result[i];
          row[dataset._childs] = row[dataset._childs] || [];
          convertModelRecursive(a.model, row[dataset._id], row[dataset._childs]);
        }
      };

      var convertedModel = [];
      convertModelRecursive(model, undefined, convertedModel);
      return convertedModel;
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
      var columns = this.state.columns;

      var _this$getTheme = this.getTheme(),
          borderWidth = _this$getTheme.borderWidth;

      var total = 0;
      var size = columns.map(function (column) {
        total += column.width;
        return column.width ? column.width + 'px' : 'auto';
      });
      return {
        size: size.join(' '),
        total: total + (columns.length + 1) * borderWidth
      };
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
    key: "getColumns",
    value: function getColumns(columns) {
      var _this3 = this;

      var _this$props2 = this.props,
          groupField = _this$props2.groupField,
          treeField = _this$props2.treeField;
      var checkboxColumn = this.getCheckboxColumn();
      var cols = checkboxColumn.concat(columns).filter(function (column, i) {
        if (_this3.compaire(column.field, treeField)) {
          column.template = function (value, _ref2, context) {
            var row = _ref2.row,
                column = _ref2.column;
            return _react.default.createElement(TreeCell, {
              row: row,
              column: column,
              value: value
            });
          };

          column.cellsClassName = 'grid-cell-tree';
        }

        if (!groupField) {
          return true;
        }

        return !_this3.compaire(column.field, groupField);
      });
      return cols;
    }
  }, {
    key: "getColumn",
    value: function getColumn(obj) {
      var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.columns;

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];

        for (var prop in obj) {
          if (!this.compaire(column[prop], obj[prop])) {
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
      var _this$props3 = this.props,
          groupField = _this$props3.groupField,
          dataType = _this$props3.dataType,
          dataset = _this$props3.dataset;
      model = JSON.parse(JSON.stringify(model));

      if (dataType === 'flat') {
        model = this.convertModel(model, dataset);
      }

      if (!groupField) {
        return model;
      }

      var groupColumn = this.getColumn({
        field: groupField
      }, columns);

      if (!groupColumn) {
        console.error("A column with field equal to groupField not found!!!");
        return model;
      }

      var g = {};

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        var groupValue = this.getValue(row, groupField);

        if (groupValue === undefined) {
          continue;
        }

        g[groupValue] = g[groupValue] || {
          _childs: []
        };
        g[groupValue]._groupName = groupColumn.title + ':' + groupValue;
        g[groupValue]._opened = true;

        g[groupValue]._childs.push(row);
      }

      var groupedModel = [];
      var j = 0;

      for (var prop in g) {
        groupedModel.push(g[prop]);
      }

      return groupedModel;
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
    key: "compaire",
    value: function compaire(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    }
  }, {
    key: "onchange",
    value: function onchange(obj) {
      this.setState(obj);

      if (this.props.onchange) {
        this.props.onchange(obj);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          dataset = _this$props4.dataset,
          groupField = _this$props4.groupField,
          rtl = _this$props4.rtl;
      var _this$state = this.state,
          model = _this$state.model,
          columns = _this$state.columns;

      if (!columns || !model || !columns.length || !model.length) {
        return '';
      }

      var _this$getSize = this.getSize(),
          size = _this$getSize.size,
          total = _this$getSize.total;

      var contextValue = { ...this.props
      };
      contextValue = _jquery.default.extend({}, contextValue, {
        model: model,
        columns: columns,
        onchange: this.onchange.bind(this),
        originalModel: this.props.model,
        originalColumns: this.props.columns,
        theme: this.getTheme(),
        size: size,
        total: total,
        getValueByDataset: this.getValueByDataset.bind(this),
        setValueByDataset: this.setValueByDataset.bind(this),
        getColumn: this.getColumn.bind(this),
        getValue: this.getValue.bind(this),
        compaire: this.compaire.bind(this),
        onGroupCheck: function onGroupCheck(row, value, context) {
          for (var i = 0; i < row._childs.length; i++) {
            _this4.setValueByDataset(row._childs[i], value, dataset._checked);
          }

          _this4.onchange({
            model: _this4.state.model
          });
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
      var prevModel = state.prevModel;
      var prevColumns = state.prevColumns;
      var isPropsChanged = false;
      var changeObject = {};

      if (JSON.stringify(prevModel) !== JSON.stringify(props.model)) {
        isPropsChanged = true;
        changeObject.model = props.model;
        changeObject.prevModel = props.model;
      }

      if (JSON.stringify(prevColumns) !== JSON.stringify(props.columns)) {
        isPropsChanged = true;
        changeObject.columns = props.columns;
        changeObject.prevColumns = props.columns;
      }

      if (isPropsChanged) {
        return changeObject;
      }

      return null;
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
      var _this$context2 = this.context,
          checkField = _this$context2.checkField,
          columns = _this$context2.columns;
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

      if (so.from === so.to) {
        return;
      }

      ;
      var _this5$context = _this5.context,
          columns = _this5$context.columns,
          onchange = _this5$context.onchange;
      var temp = columns[so.from];
      columns[so.from] = columns[so.to];
      columns[so.to] = temp;
      onchange({
        columns: columns
      });
    });

    _defineProperty(_assertThisInitialized(_this5), "resizeUp", function (e) {
      (0, _jquery.default)(window).off("mousemove", _this5.resizeMouseMove);
      (0, _jquery.default)(window).off("mouseup", _this5.resizeMouseUp);
      var _this5$context2 = _this5.context,
          onchange = _this5$context2.onchange,
          columns = _this5$context2.columns;
      var _this5$startOffset2 = _this5.startOffset,
          column = _this5$startOffset2.column,
          newWidth = _this5$startOffset2.newWidth;
      column.width = newWidth;
      onchange({
        columns: columns
      });
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

      if (column.cellsClassName === 'grid-cell-checkbox') {
        return;
      } //شرط نادیده گرفتن ستون چک باکس


      var dom = (0, _jquery.default)(e.target);
      this.startOffset = {
        from: parseInt(dom.attr('data-column-index')),
        width: dom.width(),
        height: dom.height()
      };
      (0, _jquery.default)("body").append(this.getShadow(column, e));
      (0, _jquery.default)(window).on("mousemove", this.moveMove);
      (0, _jquery.default)(window).on("mouseup", this.moveUp);
      (0, _jquery.default)('.move-handle').on("mouseenter", function (e) {
        _this6.startOffset.to = parseInt((0, _jquery.default)(e.target).attr('data-column-index'));
      });
    }
  }, {
    key: "getShadow",
    value: function getShadow(column, e) {
      var _this$context$theme = this.context.theme,
          headerBackground = _this$context$theme.headerBackground,
          borderColor = _this$context$theme.borderColor;
      var _this$startOffset = this.startOffset,
          width = _this$startOffset.width,
          height = _this$startOffset.height;
      var style = "width:".concat(width, "px;left:").concat(e.clientX - width / 2, "px;top:").concat(e.clientY - (height + 2), "px;background:").concat(headerBackground, ";border:1px solid ").concat(borderColor, ";z-index:100;font-size:11px;");
      return " \n    <div class=\"grid-title grid-title-shadow\" style=\"".concat(style, "\">\n      ").concat(column.title, "\n    </div>");
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
        index: parseInt(dom.attr('data-column-index')),
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
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props5 = this.props,
          column = _this$props5.column,
          index = _this$props5.index;
      var _column$options = column.options,
          options = _column$options === void 0 ? [] : _column$options;
      var _this$context$theme2 = this.context.theme,
          borderColor = _this$context$theme2.borderColor,
          cellBackground = _this$context$theme2.cellBackground;
      var Options = options.map(function (option, i) {
        return _react.default.createElement("li", {
          key: i,
          className: "column-option".concat(option.checked ? ' checked' : ''),
          onClick: function onClick() {
            option.callback(column);
          },
          "data-value": option.value
        }, option.text);
      });
      return _react.default.createElement("div", {
        className: "grid-title",
        style: this.getStyle(),
        ref: this.dom
      }, _react.default.createElement("div", {
        className: "move-handle",
        "data-column-index": index,
        onMouseDown: function onMouseDown(e) {
          _this7.moveDown(column, e);
        }
      }, column.title), _react.default.createElement("div", {
        className: "resize-handle",
        "data-column-index": index,
        onMouseDown: function onMouseDown(e) {
          _this7.resizeDown(column, e);
        }
      }), Options.length > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        className: "column-setting",
        "data-column-index": index,
        onMouseDown: function onMouseDown(e) {
          _this7.toggleSetting(column, e);
        }
      }), _react.default.createElement("ul", {
        className: "column-popup",
        style: {
          background: cellBackground,
          borderColor: borderColor
        }
      }, _react.default.createElement("li", {
        className: "backdrop",
        onMouseDown: this.toggleSetting.bind(this)
      }), Options)));
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
      var _this$context3 = this.context,
          model = _this$context3.model,
          groupField = _this$context3.groupField;
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
        row._inorder = i;
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
      var _this$context4 = this.context,
          theme = _this$context4.theme,
          total = _this$context4.total;
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
      var _this$context5 = this.context,
          size = _this$context5.size,
          theme = _this$context5.theme;
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
      var _this$context6 = this.context,
          columns = _this$context6.columns,
          checkField = _this$context6.checkField;
      var row = this.props.row;
      var cells = columns.map(function (column, i) {
        return _react.default.createElement(GridCell, {
          column: column,
          row: row,
          key: i
        });
      });
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
      var _this$context7 = this.context,
          checkField = _this$context7.checkField,
          onGroupCheck = _this$context7.onGroupCheck;
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
      var column = this.props.column;
      return "grid-cell".concat(column.cellsClassName ? ' ' + column.cellsClassName : ' grid-cell-text');
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(row, column) {
      var getValue = this.context.getValue;
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
      var _this$props6 = this.props,
          row = _this$props6.row,
          column = _this$props6.column;
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
      var _this$props7 = this.props,
          row = _this$props7.row,
          value = _this$props7.value;
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
      var _this$context8 = this.context,
          onchange = _this$context8.onchange,
          model = _this$context8.model;
      var row = this.props.row;

      if (!row._childs || !row._childs.length) {
        return;
      }

      row._opened = !row._opened;
      onchange({
        model: model
      });
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
      var _this$props8 = this.props,
          checked = _this$props8.checked,
          disabled = _this$props8.disabled;
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