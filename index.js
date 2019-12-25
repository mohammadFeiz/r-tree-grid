"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridIcon = exports.GridCheckbox = exports.GridToggleIcon = exports.GridText = exports.TreeCell = exports.GridCell = exports.GroupRow = exports.GridRow = exports.GridRows = exports.GridTitle = exports.GridHeader = exports.GridContainer = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

var _rActions = _interopRequireDefault(require("r-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _ref = new _rActions.default(),
    convertFlatToComposite = _ref.convertFlatToComposite,
    getValueByField = _ref.getValueByField,
    searchComposite = _ref.searchComposite,
    setValueByField = _ref.setValueByField;

var GridContext = (0, _react.createContext)();

var Grid =
/*#__PURE__*/
function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this, props));
    _this.dom = (0, _react.createRef)();
    _this.groupsOpen = {};
    _this.splitPosition = _this.props.splitPosition;
    _this.theme = _this.getTheme(_this.props.theme);
    return _this;
  }

  _createClass(Grid, [{
    key: "getTheme",
    value: function getTheme(theme) {
      return _jquery.default.extend({}, {
        background: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        cellBackground: '#fff',
        headerBackground: '#eee',
        rowHeight: 30
      }, theme);
    }
  }, {
    key: "changeGroupsOpen",
    value: function changeGroupsOpen(index) {
      this.groupsOpen['g' + index] = !this.groupsOpen['g' + index];
      this.props.onchange({
        model: this.props.model
      });
    }
  }, {
    key: "getModel",
    value: function getModel(model, dataType) {
      var _this$props = this.props,
          _this$props$group = _this$props.group,
          group = _this$props$group === void 0 ? {} : _this$props$group,
          _this$props$dataset = _this$props.dataset,
          dataset = _this$props$dataset === void 0 ? {} : _this$props$dataset;

      if (dataType === 'flat') {
        model = convertFlatToComposite(model, dataset._id, dataset._parent);
      }

      if (!group.field) {
        return model;
      }

      var g = {};

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        var groupValue = getValueByField(row, group.field);

        if (groupValue === undefined) {
          continue;
        }

        g[groupValue] = g[groupValue] || {
          _childs: []
        };
        g[groupValue]._groupName = group.title ? group.title + ':' + groupValue : '';

        g[groupValue]._childs.push(row);
      }

      var groupedModel = [];
      var j = 0;

      for (var prop in g) {
        this.groupsOpen['g' + j] = this.groupsOpen['g' + j] === undefined ? true : this.groupsOpen['g' + j];
        g[prop]._opened = this.groupsOpen['g' + j];
        g[prop].groupIndex = j;
        groupedModel.push(g[prop]);
        j++;
      }

      return groupedModel;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      this.startOffset = {
        x: e.clientX,
        size: this.splitPosition
      };
      (0, _jquery.default)(window).bind('mousemove', _jquery.default.proxy(this.mouseMove, this));
      (0, _jquery.default)(window).bind('mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var rtl = this.props.rtl;
      var so = this.startOffset;
      var pos = (so.x - e.clientX) * (rtl ? 1 : -1) + so.size;
      this.splitPosition = pos;
      var container = (0, _jquery.default)(this.dom.current);
      var splitter = container.find('.grid-splitter');
      var grids = container.find('.grid-container');
      grids.eq(0).css({
        width: "calc(".concat(pos + 'px', " - 5px)")
      });
      grids.eq(1).css(_defineProperty({
        width: "calc(100% - ".concat(pos + 'px', ")")
      }, rtl ? 'right' : 'left', pos + 'px'));
      splitter.css(_defineProperty({}, rtl ? 'right' : 'left', "calc(".concat(pos + 'px', " - 5px)")));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.split) {
        (0, _jquery.default)(this.dom.current).find('.grid-container').on('mouseenter', function (e) {
          _this2.index = parseInt((0, _jquery.default)(e.currentTarget).attr('data-splitter'));
          _this2.otherIndex = _this2.index === 0 ? 1 : 0;
          var grids = (0, _jquery.default)(_this2.dom.current).find('.grid-container');
          grids.off('scroll');
          grids.eq(_this2.index).on('scroll', function () {
            var scrollTop = grids.eq(_this2.index).scrollTop();
            grids.eq(_this2.otherIndex).scrollTop(scrollTop);
          });
        });
      }
    }
  }, {
    key: "onchange",
    value: function onchange(obj, props) {
      var _this$props2 = this.props,
          columns = _this$props2.columns,
          split = _this$props2.split;

      if (props.dataSplitter === 0 && obj.columns) {
        obj.columns = obj.columns.concat(columns.slice(split, columns.length));
      } else if (props.dataSplitter === 1 && obj.columns) {
        obj.columns = columns.slice(0, split).concat(obj.columns);
      }

      this.props.onchange(obj, props);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      (0, _jquery.default)(window).unbind('mousemove', this.mouseMove);
      (0, _jquery.default)(window).unbind('mouseup', this.mouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      var _ref3;

      var _this$props3 = this.props,
          split = _this$props3.split,
          rtl = _this$props3.rtl,
          group = _this$props3.group,
          dataType = _this$props3.dataType,
          columns = _this$props3.columns,
          splitPosition = _this$props3.splitPosition,
          className = _this$props3.className,
          model = _this$props3.model,
          style = _this$props3.style;
      var props = {
        dataType: dataType,
        onchange: this.onchange.bind(this),
        convertedModel: this.getModel(model, dataType),
        changeGroupsOpen: this.changeGroupsOpen.bind(this),
        theme: this.theme,
        style: undefined
      };
      return _react.default.createElement("div", {
        className: "grid".concat(className ? ' ' + className : ''),
        ref: this.dom,
        style: style
      }, !split && _react.default.createElement(GridContainer, _extends({}, this.props, props)), split && _react.default.createElement(_react.Fragment, null, _react.default.createElement(GridContainer, _extends({}, this.props, props, {
        columns: columns.slice(0, split),
        dataSplitter: 0,
        style: _defineProperty({
          width: "calc(".concat(splitPosition + 'px', " - 5px)")
        }, rtl ? 'right' : 'left', 0)
      })), _react.default.createElement("div", {
        className: "grid-splitter",
        style: (_ref3 = {
          width: '5px',
          height: '100%',
          position: 'absolute'
        }, _defineProperty(_ref3, rtl ? 'right' : 'left', "calc(".concat(splitPosition + 'px', " - 5px)")), _defineProperty(_ref3, "background", this.theme.borderColor), _defineProperty(_ref3, "cursor", 'col-resize'), _ref3),
        onMouseDown: this.mouseDown.bind(this)
      }), _react.default.createElement(GridContainer, _extends({}, this.props, props, {
        columns: columns.slice(split, columns.length),
        dataSplitter: 1,
        style: _defineProperty({
          width: "calc(100% - ".concat(splitPosition + 'px', ")")
        }, rtl ? 'right' : 'left', splitPosition + 'px'),
        checkField: false,
        group: group ? {
          field: group.field,
          title: group.title,
          collapsible: false
        } : false
      }))));
    }
  }]);

  return Grid;
}(_react.Component);

exports.default = Grid;
Grid.defaultProps = {
  splitPosition: 200
};

var GridContainer =
/*#__PURE__*/
function (_Component2) {
  _inherits(GridContainer, _Component2);

  function GridContainer(props) {
    var _this3;

    _classCallCheck(this, GridContainer);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(GridContainer).call(this, props));
    _this3.dom = (0, _react.createRef)();

    _this3.treeTemplate = function (value, _ref5, context) {
      var row = _ref5.row,
          column = _ref5.column;
      return _react.default.createElement(TreeCell, {
        row: row,
        column: column,
        value: value
      });
    };

    for (var prop in _this3.props.keyboard) {
      _this3[prop] = _this3.props.keyboard[prop];
    }

    _this3.selected = _this3.props.selectable ? [0, 0] : undefined;
    _this3.actived = undefined;
    return _this3;
  }

  _createClass(GridContainer, [{
    key: "getInlineInput",
    value: function getInlineInput() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var rowIndex = arguments.length > 1 ? arguments[1] : undefined;
      var colIndex = arguments.length > 2 ? arguments[2] : undefined;
      return "<input type=\"text\" value=\"".concat(value, "\" class='inline-edit inline-edit-text' data-row-index=\"").concat(rowIndex, "\" data-col-index=\"").concat(colIndex, "\">");
    }
  }, {
    key: "setActived",
    value: function setActived(rowIndex, colIndex) {
      var columns = this.props.columns;
      var Grid = (0, _jquery.default)(this.dom.current),
          Rows = Grid.find('.grid-row');
      var Row = Rows.filter("[data-row-index=".concat(rowIndex, "]")); // ردیفی که باید اکتیو شود را پیدا کن

      if (Row.hasClass('actived')) {
        this.deactiveAll();
        return;
      } //اگر ردیف اکتیو بود دی اکتیو را اجرا کن و ادامه نده


      var row = searchComposite(this.props.convertedModel, {
        _order: rowIndex
      }, '_childs'); // آبجکت مربوط به ردیف را پیدا کن
      //ردیف را اکتیو کن

      Row.addClass('actived');
      this.actived = [rowIndex, colIndex];

      for (var i = 0; i < columns.length; i++) {
        // به ازای تمام ستون ها 
        var column = columns[i];

        if (!column.inlineEdit) {
          continue;
        } // ستون هایی که قابلیت اینلاین ادیت دارند را پیدا کن


        if (typeof column.inlineEdit === 'function' && !column.inlineEdit(row, column)) {
          continue;
        }

        var Cell = Row.find(".grid-cell[data-col-index=".concat(i, "]")); //سلول مربوط به ردیف و ستون را پیدا کن

        var value = getValueByField(row, column.field); // مقدار سلول را پیدا کن

        var input = (0, _jquery.default)(this.getInlineInput(value, rowIndex, i)); // اینپوت با مقدار سلول را بساز

        Cell.append(input); // اینپوت را در سلول قرار بده

        if (colIndex === i) {
          // اگر سلول اکتیو بود آن را هایلایت کن
          input.select();
        }
      }
    }
  }, {
    key: "deactiveAll",
    value: async function deactiveAll() {
      var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.actived) {
        return;
      }

      var _this$props4 = this.props,
          columns = _this$props4.columns,
          convertedModel = _this$props4.convertedModel,
          saveInlineEdit = _this$props4.saveInlineEdit,
          model = _this$props4.model,
          onchange = _this$props4.onchange;
      var rowIndex = this.actived[0];
      var Grid = (0, _jquery.default)(this.dom.current);
      var Rows = Grid.find('.grid-row'); //المان مربوط به ردیف اکتیو را پیدا کن
      //آبجکت مربوط به ردیف اکتیو را پیدا کن
      //همه ی اینپوت های ردیف اکتیو را بگیر

      var Row = Rows.filter("[data-row-index=".concat(rowIndex, "]"));
      var row = searchComposite(convertedModel, {
        _order: rowIndex
      }, '_childs');
      var inlineInputs = Row.find('.inline-edit'); //اکتیو را آپدیت کن
      //کلاس اکتیو را از ردیف اکتیو حذف کن
      // اینپوت های ردیف اکتیو را حذف کن

      this.actived = undefined;
      Row.removeClass('actived');
      inlineInputs.remove(); //روی گرید فوکوس کن که کیبرد از کار نیفتد

      Grid.focus(); // اگر در خواست سیو آمده مقادیر ثبت شده در اینپوت های ردیف اکتیو را بگیر و اعمال کن 

      if (save) {
        var changes = [];

        for (var i = 0; i < inlineInputs.length; i++) {
          var iI = inlineInputs.eq(i);

          if (iI.hasClass('inline-edit-text')) {
            var colIndex = iI.attr('data-col-index');
            var value = iI.val();
            var column = columns[colIndex];
            changes.push(JSON.parse(JSON.stringify({
              row: row,
              column: column,
              value: value
            })));
            setValueByField(row, column.field, value);
          }
        }

        var errors;

        if (saveInlineEdit) {
          errors = await saveInlineEdit(row, changes);
        }

        onchange({
          model: model,
          errors: errors
        });
      }
    }
  }, {
    key: "isActived",
    value: function isActived(rowIndex) {
      if (this.actived === undefined) {
        return false;
      }

      return this.actived === rowIndex;
    }
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.selected;
    }
  }, {
    key: "deselectAll",
    value: function deselectAll() {
      (0, _jquery.default)(this.dom.current).find('.grid-cell,.grid-group-row').removeClass('selected');
      this.selected = undefined;
    }
  }, {
    key: "setSelected",
    value: function setSelected(rowIndex) {
      var colIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected[1] || 0;
      var Grid = (0, _jquery.default)(this.dom.current);
      var Row = Grid.find("[data-row-index=".concat(rowIndex, "]")); // ردیفی که قرار است سلکت شود را پیدا کن

      var type = Row.hasClass('grid-group-row') ? 'group' : 'cell';

      if (this.isSelected(rowIndex, type === 'group' ? undefined : colIndex)) {
        return;
      }

      this.deselectAll();

      if (type === 'cell') {
        // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه نبود
        var Cell = Row.find(".grid-cell[data-col-index=".concat(colIndex, "]")); // سلولی که قرار است سلکت شود را پیدا کن

        Cell.addClass('selected').focus(); //سلول را سلکت کن

        this.selected = [rowIndex, colIndex];
        var actived = this.actived && rowIndex === this.actived[0]; // ببین آیا سلول داخل ردیف اکتیو است؟

        if (actived) {
          // اگر سلول مربوط به ردیف اکتیو بود
          Cell.find('.inline-edit').select(); //اینپوت داخل آن را هایلایت کن        
        } else {
          //اگر سلول مربوط به ردیف اکتیو نبود 
          this.deactiveAll(); //اگر ردیفی اکتیو است آن را دی اکتیو کن
        }
      } else {
        // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه بود
        Row.addClass('selected').focus(); // ردیف گروه را سلکت کن

        this.selected = [rowIndex, colIndex];
        this.deactiveAll(); //اگر ردیفی اکتیو است آن را دی اکتیو کن
      }
    }
  }, {
    key: "isSelected",
    value: function isSelected(rowIndex, colIndex) {
      if (!this.selected) {
        return false;
      }

      var _this$selected = _slicedToArray(this.selected, 2),
          s0 = _this$selected[0],
          s1 = _this$selected[1];

      if (colIndex === undefined) {
        return s0 === rowIndex;
      } //اگر ایندکس ستون ارسال نشد فقط چک کن ردیف سلکت شده یا نه


      return s0 === rowIndex && s1 === colIndex;
    }
  }, {
    key: "getCheckboxColumn",
    value: function getCheckboxColumn() {
      var _this$props5 = this.props,
          checkField = _this$props5.checkField,
          dataset = _this$props5.dataset;

      if (!checkField) {
        return false;
      }

      return {
        width: 40,
        resizable: false,
        movable: false,
        cellsClassName: 'grid-cell-checkbox',
        field: dataset._checked,
        template: function template(value, _ref6, context) {
          var row = _ref6.row,
              column = _ref6.column;
          var _onchange = context.onchange,
              dataset = context.dataset,
              model = context.model;

          var a = _react.default.createElement(GridCheckbox, {
            checked: value || false,
            disabled: checkField.disabled(row),
            onchange: function onchange(value) {
              setValueByField(row, dataset._checked, value);

              _onchange({
                model: model
              });
            }
          });

          return a;
        }
      };
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var _this$props6 = this.props,
          columns = _this$props6.columns,
          theme = _this$props6.theme;
      var borderWidth = theme.borderWidth;
      var total = 0;
      var checkboxColumn = this.getCheckboxColumn();
      checkboxColumn = checkboxColumn ? [checkboxColumn] : [];
      var Columns = checkboxColumn.concat(columns);
      var size = Columns.map(function (column) {
        var width = typeof column.width === 'function' ? column.width() : column.width;
        total += width;
        return width ? width + 'px' : 'auto';
      });
      return {
        size: size.join(' '),
        total: total + (columns.length + 1) * borderWidth
      };
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$props7 = this.props,
          style = _this$props7.style,
          theme = _this$props7.theme;
      var borderColor = theme.borderColor;
      return _jquery.default.extend({}, {
        background: borderColor,
        borderColor: borderColor
      }, style);
    }
  }, {
    key: "onchange",
    value: function onchange(obj) {
      this.props.onchange(obj, this.props);
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      var key = e.keyCode;

      if (this['key' + key]) {
        this['key' + key](e);
      }
    }
  }, {
    key: "onGroupCheck",
    value: function onGroupCheck(row, value) {
      var dataset = this.props.dataset;

      for (var i = 0; i < row._childs.length; i++) {
        setValueByField(row._childs[i], dataset._checked, value);
      }

      this.onchange({
        model: this.props.model
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          model = _this$props8.model,
          theme = _this$props8.theme,
          convertedModel = _this$props8.convertedModel,
          dataType = _this$props8.dataType,
          rtl = _this$props8.rtl,
          group = _this$props8.group,
          dataSplitter = _this$props8.dataSplitter,
          columns = _this$props8.columns,
          changeGroupsOpen = _this$props8.changeGroupsOpen;

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
        convertedModel: convertedModel,
        onchange: this.onchange.bind(this),
        theme: theme,
        size: size,
        total: total,
        group: group,
        dataType: dataType,
        selected: this.selected,
        getSelected: this.getSelected.bind(this),
        setSelected: this.setSelected.bind(this),
        isSelected: this.isSelected.bind(this),
        deselectAll: this.deselectAll.bind(this),
        isActived: this.isActived.bind(this),
        changeGroupsOpen: changeGroupsOpen,
        groupsOpen: this.groupsOpen,
        checkboxColumn: this.getCheckboxColumn(),
        treeTemplate: this.treeTemplate,
        onGroupCheck: this.onGroupCheck.bind(this)
      });
      return _react.default.createElement(GridContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: "grid-container".concat(rtl ? ' rtl' : ''),
        style: this.getStyle(),
        "data-splitter": dataSplitter,
        onKeyDown: this.keyDown.bind(this),
        tabIndex: 0,
        ref: this.dom
      }, _react.default.createElement(GridHeader, null), _react.default.createElement(GridRows, null)));
    }
  }]);

  return GridContainer;
}(_react.Component);

exports.GridContainer = GridContainer;
GridContainer.defaultProps = {
  theme: {},
  selectable: false,
  dataset: {},
  keyboard: {}
};

var GridHeader =
/*#__PURE__*/
function (_Component3) {
  _inherits(GridHeader, _Component3);

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
          columns = _this$context2.columns,
          checkboxColumn = _this$context2.checkboxColumn;
      var index = -1;

      if (checkboxColumn) {
        index++;

        var checkboxTitle = _react.default.createElement(GridTitle, {
          column: checkboxColumn,
          key: index,
          renderColIndex: index,
          colIndex: false
        });
      }

      var titles = columns.map(function (column, i) {
        index++;
        return _react.default.createElement(GridTitle, {
          column: column,
          key: index,
          renderColIndex: index,
          colIndex: i
        });
      });
      return _react.default.createElement("div", {
        className: "grid-header",
        style: this.getStyle()
      }, checkboxColumn && checkboxTitle, titles);
    }
  }]);

  return GridHeader;
}(_react.Component);

exports.GridHeader = GridHeader;

_defineProperty(GridHeader, "contextType", GridContext);

var GridTitle =
/*#__PURE__*/
function (_Component4) {
  _inherits(GridTitle, _Component4);

  function GridTitle(props) {
    var _this4;

    _classCallCheck(this, GridTitle);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(GridTitle).call(this, props));

    _defineProperty(_assertThisInitialized(_this4), "moveMove", function (e) {
      var _this4$startOffset = _this4.startOffset,
          width = _this4$startOffset.width,
          height = _this4$startOffset.height;
      e.preventDefault();
      (0, _jquery.default)(".grid-title-shadow").css({
        left: e.clientX - width / 2,
        top: e.clientY - (height + 2)
      });
    });

    _defineProperty(_assertThisInitialized(_this4), "moveUp", function (e) {
      (0, _jquery.default)(window).off("mousemove", _this4.moveMove);
      (0, _jquery.default)(window).off("mouseup", _this4.moveUp);
      (0, _jquery.default)('.move-handle').off("mouseenter");
      (0, _jquery.default)(".grid-title-shadow").remove();
      var so = _this4.startOffset;

      if (so.to !== 0 && !so.to) {
        return;
      }

      if (so.from === so.to) {
        return;
      }

      ;
      var _this4$context = _this4.context,
          columns = _this4$context.columns,
          onchange = _this4$context.onchange;
      var temp = columns[so.from];
      columns[so.from] = columns[so.to];
      columns[so.to] = temp;
      onchange({
        columns: columns
      });
    });

    _defineProperty(_assertThisInitialized(_this4), "resizeUp", function (e) {
      (0, _jquery.default)(window).off("mousemove", _this4.resizeMouseMove);
      (0, _jquery.default)(window).off("mouseup", _this4.resizeMouseUp);
      var _this4$context2 = _this4.context,
          onchange = _this4$context2.onchange,
          columns = _this4$context2.columns;
      var _this4$startOffset2 = _this4.startOffset,
          column = _this4$startOffset2.column,
          newWidth = _this4$startOffset2.newWidth;
      column.width = newWidth;
      onchange({
        columns: columns
      });
    });

    _defineProperty(_assertThisInitialized(_this4), "resizeMove", function (e) {
      e.preventDefault();
      var rtl = _this4.context.rtl;
      var so = _this4.startOffset;
      var offset = (so.x - e.clientX) * (rtl ? 1 : -1);
      var newWidth = so.width + offset;
      newWidth = newWidth < so.minWidth ? so.minWidth : newWidth;
      so.newWidth = newWidth;
      so.size[so.index] = newWidth + 'px';
      so.gridTemplateColumns = '';
      var theme = _this4.context.theme;
      var total = theme.borderWidth;

      for (var i = 0; i < so.size.length; i++) {
        var size = so.size[i];
        total += parseInt(size) + theme.borderWidth;
        so.gridTemplateColumns += size === 'auto' ? 'auto ' : size + ' ';
      }

      so.container.css({
        gridTemplateColumns: so.gridTemplateColumns
      });
      so.gridRows.css('width', total);
    });

    _this4.dom = (0, _react.createRef)();
    return _this4;
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
      var _this5 = this;

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
        _this5.startOffset.to = parseInt((0, _jquery.default)(e.target).attr('data-column-index'));
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
      var width = typeof column.width === 'function' ? column.width() : column.width;

      if (width === 'auto' || !width || column.resizable === false) {
        return;
      }

      var dom = (0, _jquery.default)(e.target);
      var grid = dom.parents('.grid-container');
      var gridRows = grid.find('.grid-rows');
      this.startOffset = {
        column: column,
        index: parseInt(dom.attr('data-render-column-index')),
        minWidth: column.minWidth || 40,
        width: parseInt(width),
        //عرض ستون
        x: e.clientX,
        // موقعیت در راستای افق
        size: this.context.size.split(' '),
        container: grid.find(".grid-header,.grid-row"),
        gridRowsWidth: parseInt(gridRows.css('width')),
        gridRows: gridRows
      };
      (0, _jquery.default)(window).on("mousemove", this.resizeMove);
      (0, _jquery.default)(window).on("mouseup", this.resizeUp);
    }
  }, {
    key: "toggleSetting",
    value: function toggleSetting() {
      (0, _jquery.default)(this.dom.current).find('.column-popup').toggle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props9 = this.props,
          column = _this$props9.column,
          renderColIndex = _this$props9.renderColIndex,
          colIndex = _this$props9.colIndex;
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
      }, colIndex !== false && _react.default.createElement("div", {
        className: "move-handle",
        "data-column-index": colIndex,
        "data-render-column-index": renderColIndex,
        onMouseDown: function onMouseDown(e) {
          _this6.moveDown(column, e);
        }
      }, column.title), colIndex !== false && _react.default.createElement("div", {
        className: "resize-handle",
        "data-column-index": colIndex,
        "data-render-column-index": renderColIndex,
        onMouseDown: function onMouseDown(e) {
          _this6.resizeDown(column, e);
        }
      }), Options.length > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        className: "column-setting",
        "data-column-index": colIndex,
        "data-render-column-index": renderColIndex,
        onMouseDown: function onMouseDown(e) {
          _this6.toggleSetting(column, e);
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

exports.GridTitle = GridTitle;

_defineProperty(GridTitle, "contextType", GridContext);

var GridRows =
/*#__PURE__*/
function (_Component5) {
  _inherits(GridRows, _Component5);

  function GridRows() {
    _classCallCheck(this, GridRows);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridRows).apply(this, arguments));
  }

  _createClass(GridRows, [{
    key: "getRows",
    value: function getRows() {
      var _this$context3 = this.context,
          convertedModel = _this$context3.convertedModel,
          group = _this$context3.group;
      this.rows = [];
      this._order = 0;
      this.getRowsRecursive(convertedModel, group ? -1 : 0);
      return this.rows;
    }
  }, {
    key: "getRowsRecursive",
    value: function getRowsRecursive(model, level) {
      var dataset = this.context.dataset;

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        row._order = this._order;
        row._inorder = i;
        row._level = level;
        row._opened = row._opened === undefined ? true : row._opened;
        row._childs = row._childs || getValueByField(row, dataset._childs);
        var props = {
          row: row,
          key: row._order,
          isFirst: row._order === 0,
          rowIndex: row._order
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
      var theme = this.context.theme;
      var borderWidth = theme.borderWidth,
          background = theme.background;
      return _react.default.createElement("div", {
        className: "grid-rows",
        style: this.getStyle()
      }, rows, _react.default.createElement("div", {
        className: "grid-background",
        style: {
          flex: 1,
          background: background,
          marginTop: borderWidth
        }
      }));
    }
  }]);

  return GridRows;
}(_react.Component);

exports.GridRows = GridRows;

_defineProperty(GridRows, "contextType", GridContext);

var GridRow =
/*#__PURE__*/
function (_Component6) {
  _inherits(GridRow, _Component6);

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
          checkField = _this$context6.checkField,
          checkboxColumn = _this$context6.checkboxColumn,
          isActived = _this$context6.isActived;
      var _this$props10 = this.props,
          row = _this$props10.row,
          rowIndex = _this$props10.rowIndex;
      var cells = columns.map(function (column, i) {
        return _react.default.createElement(GridCell, {
          column: column,
          row: row,
          key: i,
          rowIndex: row._order,
          colIndex: i
        });
      });
      return _react.default.createElement("div", {
        className: "grid-row".concat(isActived(rowIndex, null, 'row') ? ' actived' : ''),
        style: this.getStyle(),
        "data-row-index": rowIndex
      }, checkField && _react.default.createElement(GridCell, {
        column: checkboxColumn,
        row: row,
        key: -1
      }), cells);
    }
  }]);

  return GridRow;
}(_react.Component);

exports.GridRow = GridRow;

_defineProperty(GridRow, "contextType", GridContext);

var GroupRow =
/*#__PURE__*/
function (_Component7) {
  _inherits(GroupRow, _Component7);

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
        height: theme.rowHeight + 'px',
        lineHeight: '24px'
      };
    }
  }, {
    key: "click",
    value: function click() {
      var _this$context7 = this.context,
          setSelected = _this$context7.setSelected,
          selectable = _this$context7.selectable;

      if (!selectable) {
        return;
      }

      var rowIndex = this.props.rowIndex;
      setSelected(rowIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
          row = _this$props11.row,
          rowIndex = _this$props11.rowIndex;
      var _this$context8 = this.context,
          checkField = _this$context8.checkField,
          onGroupCheck = _this$context8.onGroupCheck,
          group = _this$context8.group,
          isSelected = _this$context8.isSelected;
      return _react.default.createElement("div", {
        className: "grid-group-row".concat(isSelected(rowIndex) ? ' selected' : ''),
        style: this.getStyle(),
        "data-group-index": row.groupIndex,
        "data-row-index": rowIndex,
        tabIndex: 0,
        onClick: this.click.bind(this)
      }, _react.default.createElement("div", {
        className: "grid-group-row-container"
      }, checkField && group.checkable !== false && _react.default.createElement("div", {
        className: "grid-checkbox"
      }, _react.default.createElement(GridCheckbox, {
        checked: row._checked,
        onchange: function onchange(value) {
          onGroupCheck(row, value);
        }
      })), group.collapsible !== false && row._childs && row._childs.length && _react.default.createElement(GridToggleIcon, {
        row: row
      }), _react.default.createElement(GridText, {
        text: row._groupName
      })));
    }
  }]);

  return GroupRow;
}(_react.Component);

exports.GroupRow = GroupRow;

_defineProperty(GroupRow, "contextType", GridContext);

var GridCell =
/*#__PURE__*/
function (_Component8) {
  _inherits(GridCell, _Component8);

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
      var _this$props12 = this.props,
          rowIndex = _this$props12.rowIndex,
          colIndex = _this$props12.colIndex,
          column = _this$props12.column;
      var isSelected = this.context.isSelected;
      var className;

      if (column.treeMode) {
        className = 'grid-cell';
      } else {
        className = "grid-cell".concat(column.cellsClassName ? ' ' + column.cellsClassName : ' grid-cell-text');
      }

      className += isSelected(rowIndex, colIndex) ? ' selected' : '';
      return className;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(row, column, value) {
      var treeTemplate = this.context.treeTemplate;

      if (column.treeMode) {
        return treeTemplate(value, {
          row: row,
          column: column
        }, this.context);
      } else if (!column.template) {
        return value === undefined ? '' : value;
      } else {
        return column.template(value, {
          row: row,
          column: column
        }, this.context);
      }
    }
  }, {
    key: "click",
    value: function click() {
      var _this$context9 = this.context,
          setSelected = _this$context9.setSelected,
          selectable = _this$context9.selectable;

      if (!selectable) {
        return;
      }

      var _this$props13 = this.props,
          _this$props13$rowInde = _this$props13.rowIndex,
          rowIndex = _this$props13$rowInde === void 0 ? false : _this$props13$rowInde,
          _this$props13$colInde = _this$props13.colIndex,
          colIndex = _this$props13$colInde === void 0 ? false : _this$props13$colInde;

      if (rowIndex === false || colIndex === false) {
        return;
      }

      setSelected(rowIndex, colIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props14 = this.props,
          row = _this$props14.row,
          column = _this$props14.column,
          colIndex = _this$props14.colIndex;
      var value = getValueByField(row, column.field);
      return _react.default.createElement("div", {
        title: column.template ? undefined : value,
        className: this.getClassName(),
        style: this.getStyle(),
        "data-col-index": colIndex,
        tabIndex: 0,
        onClick: this.click.bind(this)
      }, this.getTemplate(row, column, value));
    }
  }]);

  return GridCell;
}(_react.Component);

exports.GridCell = GridCell;

_defineProperty(GridCell, "contextType", GridContext);

var TreeCell =
/*#__PURE__*/
function (_Component9) {
  _inherits(TreeCell, _Component9);

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
      var _this$props15 = this.props,
          row = _this$props15.row,
          value = _this$props15.value,
          column = _this$props15.column;
      var icon = column.icon ? column.icon(row) : false;
      return _react.default.createElement("div", {
        className: "grid-tree-cell",
        style: this.getStyle()
      }, _react.default.createElement(GridToggleIcon, {
        row: row
      }), icon && _react.default.createElement(GridIcon, {
        className: icon.className,
        color: icon.color
      }), _react.default.createElement(GridText, {
        text: value
      }));
    }
  }]);

  return TreeCell;
}(_react.Component);

exports.TreeCell = TreeCell;

_defineProperty(TreeCell, "contextType", GridContext);

var GridText =
/*#__PURE__*/
function (_Component10) {
  _inherits(GridText, _Component10);

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

exports.GridText = GridText;

var GridToggleIcon =
/*#__PURE__*/
function (_Component11) {
  _inherits(GridToggleIcon, _Component11);

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
      var _this$context10 = this.context,
          onchange = _this$context10.onchange,
          model = _this$context10.model,
          changeGroupsOpen = _this$context10.changeGroupsOpen;
      var row = this.props.row;

      if (row._groupName !== undefined) {
        changeGroupsOpen(row.groupIndex);
      } else {
        if (!row._childs || !row._childs.length) {
          return;
        }

        row._opened = !row._opened;
        onchange({
          model: model
        });
      }
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

exports.GridToggleIcon = GridToggleIcon;

_defineProperty(GridToggleIcon, "contextType", GridContext);

var GridCheckbox =
/*#__PURE__*/
function (_Component12) {
  _inherits(GridCheckbox, _Component12);

  function GridCheckbox() {
    _classCallCheck(this, GridCheckbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridCheckbox).apply(this, arguments));
  }

  _createClass(GridCheckbox, [{
    key: "change",
    value: function change(value) {
      value = _typeof(value) === 'object' ? value.target.checked : value;
      this.props.onchange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props16 = this.props,
          checked = _this$props16.checked,
          disabled = _this$props16.disabled;
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

exports.GridCheckbox = GridCheckbox;

var GridIcon =
/*#__PURE__*/
function (_Component13) {
  _inherits(GridIcon, _Component13);

  function GridIcon() {
    _classCallCheck(this, GridIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridIcon).apply(this, arguments));
  }

  _createClass(GridIcon, [{
    key: "render",
    value: function render() {
      var _this$props17 = this.props,
          className = _this$props17.className,
          color = _this$props17.color;
      return _react.default.createElement("div", {
        className: 'grid-icon ' + className,
        style: {
          color: color
        }
      });
    }
  }]);

  return GridIcon;
}(_react.Component);

exports.GridIcon = GridIcon;

_defineProperty(GridIcon, "contextType", GridContext);