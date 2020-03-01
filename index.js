"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridIcon = exports.GridCheckbox = exports.GridToggleIcon = exports.GridText = exports.TreeCell = exports.GridCellError = exports.GridCell = exports.GroupRow = exports.GridRow = exports.GridRows = exports.GridTitle = exports.GridHeader = exports.GridContainer = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var GridContext = (0, _react.createContext)();

var Grid = /*#__PURE__*/function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this, props));
    _this.dom = (0, _react.createRef)();
    _this.groupsOpen = {};
    _this.splitPosition = _this.props.splitPosition;
    _this.theme = _this.getTheme(_this.props.theme);
    _this.touch = _this.isMobile();
    return _this;
  }

  _createClass(Grid, [{
    key: "isMobile",
    value: function isMobile() {
      return 'ontouchstart' in document.documentElement;
    }
  }, {
    key: "getClient",
    value: function getClient(e) {
      return this.touch ? {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      } : {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, {
    key: "getTheme",
    value: function getTheme(theme) {
      return _jquery.default.extend({}, {
        background: '#fff',
        borderColor: '#ddd',
        borderWidth: 0,
        cellBackground: '#fff',
        headerBackground: '#eee',
        rowHeight: 36
      }, theme);
    }
  }, {
    key: "changeGroupsOpen",
    value: function changeGroupsOpen(index) {
      this.groupsOpen['g' + index] = !this.groupsOpen['g' + index];
      this.props.onchange({
        model: this.props.model
      }, this.props);
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(selector, event, action) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bind';
      var me = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      };
      event = this.touch ? me[event] : event;
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      element.unbind(event, action);

      if (type === 'bind') {
        element.bind(event, action);
      }
    }
  }, {
    key: "searchTree",
    value: function searchTree(nodes, keyword, field) {
      var newNodes = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var n = _step.value;
          var value = this.getValueByField(n, field);

          if (n._childs) {
            var nextNodes = this.searchTree(n._childs, keyword, field);

            if (nextNodes.length > 0) {
              n._childs = nextNodes;
            } else if (value.toLowerCase().includes(keyword.toLowerCase())) {
              n._childs = nextNodes.length > 0 ? nextNodes : [];
            }

            if (nextNodes.length > 0 || value.toLowerCase().includes(keyword.toLowerCase())) {
              newNodes.push(n);
            }
          } else {
            if (value.toLowerCase().includes(keyword.toLowerCase())) {
              newNodes.push(n);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return newNodes;
    }
  }, {
    key: "getValueByField",
    value: function getValueByField(obj, field) {
      if (!field || field === null) {
        return undefined;
      }

      var fieldString = typeof field === 'function' ? field(obj) : field;

      if (!fieldString || typeof fieldString !== 'string') {
        console.error('Grid.getValueByField() receive invalid field');
        return undefined;
      }

      var fields = fieldString.split('.');
      var value = obj[fields[0]];

      if (value === undefined) {
        return;
      }

      for (var i = 1; i < fields.length; i++) {
        value = value[fields[i]];

        if (value === undefined || value === null) {
          return;
        }
      }

      return value;
    }
  }, {
    key: "setValueByField",
    value: function setValueByField(obj, field, value) {
      var fields = field.split('.');
      var node = obj;

      for (var i = 0; i < fields.length - 1; i++) {
        if (node[fields[i]] === undefined) {
          return;
        }

        node = node[fields[i]];
      }

      node[fields[fields.length - 1]] = value;
      return obj;
    }
  }, {
    key: "convertFlatToComposite",
    value: function convertFlatToComposite(model) {
      var _this2 = this;

      var idProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
      var parentIdProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'parentId';

      var convertModelRecursive = function convertModelRecursive(model, parentId, parentObject) {
        for (var i = 0; i < model.length; i++) {
          var row = model[i];
          row._parent = _this2.getValueByField(row, parentIdProp);

          if (row._parent !== parentId) {
            continue;
          }

          row._id = _this2.getValueByField(row, idProp);
          row._childs = [];
          parentObject.push(row);
          convertModelRecursive(model, row._id, row._childs);
        }
      };

      var result = [];
      convertModelRecursive(model, undefined, result);
      return result;
    }
  }, {
    key: "getModel",
    value: function getModel(model, dataType) {
      var _this$props = this.props,
          _this$props$group = _this$props.group,
          group = _this$props$group === void 0 ? {} : _this$props$group,
          _this$props$dataset = _this$props.dataset,
          dataset = _this$props$dataset === void 0 ? {} : _this$props$dataset,
          search = _this$props.search;

      if (dataType === 'flat') {
        model = this.convertFlatToComposite(model, dataset._id, dataset._parent);
      }

      if (search) {
        model = this.searchTree(model, search.value, search.field);
      }

      if (!group.field) {
        return model;
      }

      var g = {};

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        var groupValue = this.getValueByField(row, group.field);

        if (groupValue === undefined) {
          continue;
        }

        g[groupValue] = g[groupValue] || {
          _childs: []
        };
        g[groupValue]._groupName = (group.title ? group.title + ' : ' : '') + groupValue;

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
        x: this.getClient(e).x,
        size: this.splitPosition
      };
      this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
      this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var rtl = this.props.rtl;
      var so = this.startOffset;
      var pos = (so.x - this.getClient(e).x) * (rtl ? 1 : -1) + so.size;
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
      var _this3 = this;

      if (this.props.split) {
        (0, _jquery.default)(this.dom.current).find('.grid-container').on('mouseenter', function (e) {
          _this3.index = parseInt((0, _jquery.default)(e.currentTarget).attr('data-splitter'));
          _this3.otherIndex = _this3.index === 0 ? 1 : 0;
          var grids = (0, _jquery.default)(_this3.dom.current).find('.grid-container');
          grids.off('scroll');
          grids.eq(_this3.index).on('scroll', function () {
            var scrollTop = grids.eq(_this3.index).scrollTop();
            grids.eq(_this3.otherIndex).scrollTop(scrollTop);
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
      this.eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.mouseUp, 'unbind');
    }
  }, {
    key: "render",
    value: function render() {
      var _style;

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

      if (model === undefined || model === null) {
        return _react.default.createElement("div", {
          className: "grid".concat(className ? ' ' + className : ''),
          ref: this.dom,
          style: style
        }, _react.default.createElement("i", {
          className: "fas fa-spinner fa-spin",
          style: {
            color: '#555',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            width: '40px',
            height: '40px',
            left: 'calc(50% - 20px)',
            top: 'calc(50% - 20px)'
          }
        }));
      }

      var props = {
        dataType: dataType,
        onchange: this.onchange.bind(this),
        convertedModel: this.getModel(model, dataType),
        changeGroupsOpen: this.changeGroupsOpen.bind(this),
        getValueByField: this.getValueByField.bind(this),
        setValueByField: this.setValueByField.bind(this),
        eventHandler: this.eventHandler.bind(this),
        getClient: this.getClient.bind(this),
        theme: this.theme,
        style: undefined,
        touch: this.touch
      };

      var gridSplitterProps = _defineProperty({
        className: 'grid-splitter',
        style: (_style = {
          width: '5px',
          height: '100%',
          position: 'absolute'
        }, _defineProperty(_style, rtl ? 'right' : 'left', "calc(".concat(splitPosition + 'px', " - 5px)")), _defineProperty(_style, "background", this.theme.borderColor), _defineProperty(_style, "cursor", 'col-resize'), _style)
      }, this.touch ? 'onTouchStart' : 'onMouseDown', this.mouseDown.bind(this));

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
      })), _react.default.createElement("div", gridSplitterProps), _react.default.createElement(GridContainer, _extends({}, this.props, props, {
        columns: columns.slice(split, columns.length),
        dataSplitter: 1,
        style: _defineProperty({
          width: "calc(100% - ".concat(splitPosition + 'px', ")")
        }, rtl ? 'right' : 'left', splitPosition + 'px'),
        checkField: false,
        addField: false,
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
  splitPosition: 300
};

var GridContainer = /*#__PURE__*/function (_Component2) {
  _inherits(GridContainer, _Component2);

  function GridContainer(props) {
    var _this4;

    _classCallCheck(this, GridContainer);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(GridContainer).call(this, props));
    _this4.dom = (0, _react.createRef)();

    _this4.treeTemplate = function (value, _ref3, context) {
      var row = _ref3.row,
          column = _ref3.column;
      return _react.default.createElement(TreeCell, {
        row: row,
        column: column,
        value: value
      });
    };

    return _this4;
  }

  _createClass(GridContainer, [{
    key: "searchComposite",
    value: function searchComposite(model, query) {
      var _this5 = this;

      var childsProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'childs';

      var searchRowRecursive = function searchRowRecursive(data, query) {
        if (_this5.searchResult !== undefined) {
          return;
        }

        for (var i = 0; i < data.length; i++) {
          if (_this5.searchResult !== undefined) {
            break;
          }

          var row = data[i];

          for (var prop in query) {
            var value = _this5.props.getValueByField(row, prop);

            if (value !== query[prop]) {
              continue;
            }

            _this5.searchResult = row;
            break;
          }

          if (row[childsProp] && row[childsProp].length) {
            searchRowRecursive(row[childsProp], query);
          }
        }
      };

      this.searchResult = undefined;
      searchRowRecursive(model, query);
      return this.searchResult;
    }
  }, {
    key: "windowMouseDown",
    value: function windowMouseDown(e) {
      var target = (0, _jquery.default)(e.target);
      var parent = target.parents('.grid');

      if (parent.length) {
        return;
      }

      this.deactiveAll();
    }
  }, {
    key: "setActived",
    value: function setActived(rowIndex, colIndex) {
      var _this$props4 = this.props,
          columns = _this$props4.columns,
          theme = _this$props4.theme,
          getValueByField = _this$props4.getValueByField,
          eventHandler = _this$props4.eventHandler;
      var column = columns[colIndex];
      var Grid = (0, _jquery.default)(this.dom.current),
          Rows = Grid.find('.grid-row');
      var Row = Rows.filter("[data-row-index=".concat(rowIndex, "]")); // ردیفی که باید اکتیو شود را پیدا کن

      if (Row.hasClass('actived')) {
        if (!Array.isArray(column.inlineEdit)) {
          // اگر درخواست اکتیو روی سلول دراپدانی نبود
          this.deactiveAll();
        }

        return;
      } //اگر ردیف اکتیو بود دی اکتیو را اجرا کن و ادامه نده


      var row = this.searchComposite(this.props.convertedModel, {
        _order: rowIndex
      }, '_childs'); // آبجکت مربوط به ردیف را پیدا کن
      //ردیف را اکتیو کن

      Row.addClass('actived');
      Row.find('.grid-cell').css({
        background: theme.active
      });
      this.actived = [rowIndex, colIndex];
      eventHandler('window', 'mousedown', this.windowMouseDown, 'unbind');
      eventHandler('window', 'mousedown', _jquery.default.proxy(this.windowMouseDown, this));

      for (var i = 0; i < columns.length; i++) {
        // به ازای تمام ستون ها 
        var column = columns[i];
        var inlineEdit = typeof column.inlineEdit === 'function' ? column.inlineEdit(row, column) : column.inlineEdit;

        if (!inlineEdit) {
          continue;
        } // ستون هایی که قابلیت اینلاین ادیت دارند را پیدا کن


        if (column.inlineEditApprove && !column.inlineEditApprove(rowIndex)) {
          continue;
        }

        var Cell = Row.find(".grid-cell[data-col-index=".concat(i, "]")); //سلول مربوط به ردیف و ستون را پیدا کن

        var value = getValueByField(row, column.field); // مقدار سلول را پیدا کن

        var input = (0, _jquery.default)(this.getInlineInput(value, rowIndex, i, inlineEdit)); // اینپوت با مقدار سلول را بساز

        Cell.append(input); // اینپوت را در سلول قرار بده

        if (colIndex === i) {
          // اگر سلول اکتیو بود آن را هایلایت کن
          input.focus();
          input.select();
        }
      }
    }
  }, {
    key: "getInlineInput",
    value: function getInlineInput() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var rowIndex = arguments.length > 1 ? arguments[1] : undefined;
      var colIndex = arguments.length > 2 ? arguments[2] : undefined;
      var inlineEdit = arguments.length > 3 ? arguments[3] : undefined;
      var theme = this.props.theme;

      if (inlineEdit === true || inlineEdit === 'text') {
        return "<input style=\"background:".concat(theme.cellBackground, ";color:").concat(theme.color, ";\" type=\"text\" value=\"").concat(value === null ? '' : value, "\" class='inline-edit inline-edit-text' data-row-index=\"").concat(rowIndex, "\" data-col-index=\"").concat(colIndex, "\">");
      }

      if (Array.isArray(inlineEdit)) {
        return "<select style=\"background:".concat(theme.cellBackground, ";color:").concat(theme.color, ";height:22px;\" class='inline-edit inline-edit-select' data-row-index=\"").concat(rowIndex, "\" data-col-index=\"").concat(colIndex, "\">").concat(inlineEdit.map(function (o) {
          return "<option value=\"".concat(o.value, "\"").concat(String(value) === String(o.value) ? ' selected' : '', ">").concat(o.text, "</option>");
        }), "</select>");
      }

      if (inlineEdit === 'checkbox') {}
    }
  }, {
    key: "deactiveAll",
    value: async function deactiveAll() {
      var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.actived) {
        return;
      }

      var _this$props5 = this.props,
          columns = _this$props5.columns,
          convertedModel = _this$props5.convertedModel,
          saveInlineEdit = _this$props5.saveInlineEdit,
          model = _this$props5.model,
          onchange = _this$props5.onchange,
          theme = _this$props5.theme,
          setValueByField = _this$props5.setValueByField;
      var rowIndex = this.actived[0];
      var Grid = (0, _jquery.default)(this.dom.current);
      var Rows = Grid.find('.grid-row'); //المان مربوط به ردیف اکتیو را پیدا کن
      //آبجکت مربوط به ردیف اکتیو را پیدا کن
      //همه ی اینپوت های ردیف اکتیو را بگیر

      var Row = Rows.filter("[data-row-index=".concat(rowIndex, "]"));
      var row = this.searchComposite(convertedModel, {
        _order: rowIndex
      }, '_childs');
      var inlineInputs = Row.find('.inline-edit'); //اکتیو را آپدیت کن
      //کلاس اکتیو را از ردیف اکتیو حذف کن
      // اینپوت های ردیف اکتیو را حذف کن

      this.actived = undefined;
      Row.removeClass('actived');
      Row.find('.grid-cell').css({
        background: theme.cellBackground
      });
      inlineInputs.remove(); //روی گرید فوکوس کن که کیبرد از کار نیفتد

      Grid.focus(); // اگر در خواست سیو آمده مقادیر ثبت شده در اینپوت های ردیف اکتیو را بگیر و اعمال کن 

      if (save) {
        for (var i = 0; i < inlineInputs.length; i++) {
          var iI = inlineInputs.eq(i);

          if (iI.hasClass('inline-edit-text')) {
            var colIndex = iI.attr('data-col-index');
            var value = iI.val();
            var column = columns[colIndex];
            setValueByField(row, column.field, value);
          } else if (iI.hasClass('inline-edit-select')) {
            var _colIndex = iI.attr('data-col-index');

            var _value = iI.find(':selected').val();

            var _column = columns[_colIndex];
            setValueByField(row, _column.field, _value);
          }
        }

        var errors;

        if (saveInlineEdit) {
          errors = await saveInlineEdit(row);
        }

        if (errors && !Array.isArray(errors)) {
          console.error('saveInlineEdit must retrurn array of errors');
        }

        onchange({
          model: model,
          errors: errors
        }, this.props);
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
    value: function setSelected(rowIndex, colIndex) {
      if (colIndex === undefined) {
        colIndex = this.selected ? this.selected[1] : 0;
      }

      var Grid = (0, _jquery.default)(this.dom.current);
      var Row = Grid.find("[data-row-index=".concat(rowIndex, "]")); // تگ ردیفی که قرار است سلکت شود را پیدا کن

      var type = Row.hasClass('grid-group-row') ? 'group' : 'cell'; //مشخص کن این ردیف ردیف معمولی است یا ردیف گروه

      if (this.isSelected(rowIndex, type === 'group' ? undefined : colIndex)) {
        return;
      } //اگر روی ردیفی که سلکت شده کلیک شد ادامه نده


      this.deselectAll(); //همه ردیف ها از حالت سلکت خارج کن

      this.selected = [rowIndex, colIndex]; //سلکتد را آپدیت کن

      if (this.props.inlineEditMode === 'B') {
        if (type === 'cell') {
          // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه نبود
          var Cell = Row.find(".grid-cell[data-col-index=".concat(colIndex, "]")); // سلولی که قرار است سلکت شود را پیدا کن

          Cell.addClass('selected').focus(); //سلول را سلکت کن

          var actived = this.actived && rowIndex === this.actived[0];

          if (actived) {
            //اگر این ردیف اکتیو است و داریم یک سلول از این ردیف اکتیو را سلکت می کنیم؟
            Cell.find('.inline-edit').select(); //اینپوت داخل آن را هایلایت کن        
          } else {
            //در غیر اینصورت 
            this.deactiveAll(); //اگر ردیفی اکتیو است آن را دی اکتیو کن و مقادیر اینلاین اون ردیف رو سیو کن
          }
        } else {
          // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه بود
          Row.addClass('selected').focus(); // ردیف گروه را سلکت کن

          this.deactiveAll(); //اگر ردیفی اکتیو است آن را دی اکتیو کن و مقادیر اینلاین اون ردیف رو سیو کن
        }
      } else if (this.props.inlineEditMode === 'A') {
        if (type === 'cell') {
          // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه نبود
          var Cell = Row.find(".grid-cell[data-col-index=".concat(colIndex, "]")); // سلولی که قرار است سلکت شود را پیدا کن

          Cell.addClass('selected').focus(); //سلول را سلکت کن

          Cell.find('.inline-edit').select(); //اینپوت داخل آن را هایلایت کن
        } else {
          // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه بود
          Row.addClass('selected').focus(); // ردیف گروه را سلکت کن
        }

        this.deactiveAll(); //اگر ردیفی اکتیو است آن را دی اکتیو کن و مقادیر اینلاین اون ردیف رو سیو کن

        this.setActived(rowIndex, colIndex);
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
      var _this$props6 = this.props,
          checkField = _this$props6.checkField,
          dataset = _this$props6.dataset,
          setValueByField = _this$props6.setValueByField;

      if (!checkField) {
        return false;
      }

      return {
        width: 40,
        resizable: false,
        movable: false,
        className: 'grid-cell-checkbox',
        field: dataset._checked,
        template: function template(value, _ref4, context) {
          var row = _ref4.row,
              column = _ref4.column;
          var _onchange = context.onchange,
              dataset = context.dataset,
              model = context.model;

          var a = _react.default.createElement(GridCheckbox, {
            checked: value || false,
            disabled: checkField.disabled ? checkField.disabled(row) : false,
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
    key: "getAddColumn",
    value: function getAddColumn() {
      var _this6 = this;

      var _this$props7 = this.props,
          addField = _this$props7.addField,
          dataset = _this$props7.dataset;

      if (!addField) {
        return false;
      }

      return {
        width: 30,
        resizable: false,
        movable: false,
        className: 'grid-cell-add',
        template: function template(value, _ref5, context) {
          var row = _ref5.row,
              column = _ref5.column;
          return _react.default.createElement("div", {
            className: "add-icon",
            onClick: function onClick() {
              _this6.add(row);
            }
          });
        }
      };
    }
  }, {
    key: "add",
    value: async function add(row) {
      var _this$props8 = this.props,
          onchange = _this$props8.onchange,
          dataType = _this$props8.dataType,
          model = _this$props8.model,
          dataset = _this$props8.dataset,
          addField = _this$props8.addField,
          getValueByField = _this$props8.getValueByField,
          setValueByField = _this$props8.setValueByField;
      var def = await addField.getDefault(row);

      if (dataType === 'flat') {
        var obj = model.concat([def]);
        onchange({
          model: obj
        }, this.props);
      } else {
        var childs = getValueByField(row, dataset._childs);

        if (!childs) {
          setValueByField(row, dataset._childs, []);
          childs = getValueByField(row, dataset._childs);
        }

        childs.push(def);
        onchange({
          model: model
        }, this.props);
      }
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var _this$props9 = this.props,
          columns = _this$props9.columns,
          theme = _this$props9.theme;
      var borderWidth = theme.borderWidth;
      var total = 0;
      var checkboxColumn = this.getCheckboxColumn();
      var addColumn = this.getAddColumn();
      checkboxColumn = checkboxColumn ? [checkboxColumn] : [];
      addColumn = addColumn ? [addColumn] : [];
      var Columns = checkboxColumn.concat(addColumn, columns);
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
      var _this$props10 = this.props,
          style = _this$props10.style,
          theme = _this$props10.theme;
      var borderColor = theme.borderColor,
          color = theme.color;
      return _jquery.default.extend({}, {
        background: borderColor,
        borderColor: borderColor,
        color: color
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
      var _this$props11 = this.props,
          dataset = _this$props11.dataset,
          setValueByField = _this$props11.setValueByField;

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
      var _this$props12 = this.props,
          model = _this$props12.model,
          theme = _this$props12.theme,
          convertedModel = _this$props12.convertedModel,
          dataType = _this$props12.dataType,
          rtl = _this$props12.rtl,
          group = _this$props12.group,
          dataSplitter = _this$props12.dataSplitter,
          columns = _this$props12.columns,
          changeGroupsOpen = _this$props12.changeGroupsOpen,
          _this$props12$errors = _this$props12.errors,
          errors = _this$props12$errors === void 0 ? [] : _this$props12$errors;

      if (!columns || !columns.length) {
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
        errors: errors,
        total: total,
        group: group,
        dataType: dataType,
        selected: this.selected,
        getSelected: this.getSelected.bind(this),
        setSelected: this.setSelected.bind(this),
        isSelected: this.isSelected.bind(this),
        deselectAll: this.deselectAll.bind(this),
        deactiveAll: this.deactiveAll.bind(this),
        isActived: this.isActived.bind(this),
        changeGroupsOpen: changeGroupsOpen,
        groupsOpen: this.groupsOpen,
        checkboxColumn: this.getCheckboxColumn(),
        addColumn: this.getAddColumn(),
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
  }, {
    key: "getColIndex",
    value: function getColIndex(index, sign) {
      var columns = this.props.columns;
      index += sign;

      if (index === -1) {
        index = columns.length - 1;
      } else if (index === columns.length) {
        index = 0;
      }

      var counter = 0;

      while (columns[index].selectable === false) {
        counter++;

        if (counter > columns.length) {
          console.error('Grid component: there is not any selectable column');
          return;
        }

        index += sign;

        if (index === -1) {
          index = columns.length - 1;
        } else if (index === columns.length) {
          index = 0;
        }
      }

      return index;
    }
  }, {
    key: "arrowH",
    value: function arrowH(e, code) {
      e.preventDefault();

      if (!this.selected) {
        return;
      }

      var rtl = this.props.rtl;
      var sign = code === 37 ? rtl ? 1 : -1 : rtl ? -1 : 1;
      this.setSelected(this.selected[0], this.getColIndex(this.selected[1], sign));
    }
  }, {
    key: "arrowV",
    value: function arrowV(e, code) {
      e.preventDefault();

      if (this.actived) {
        //اگر ردیفی اکتیو است
        this.deactiveAll(true); //ردیف اکتیو را دی اکتیو کن و مقادیر اینپوت ها را سیو کن
      }

      var s = this.selected;

      if (!s) {
        return;
      }

      var Grid = (0, _jquery.default)(this.dom.current);
      var colIndex = s[1],
          rowIndex = s[0] + (code === 40 ? 1 : -1);
      var Row = Grid.find("[data-row-index=".concat(rowIndex, "]"));

      if (!Row.length) {
        rowIndex = code === 40 ? 0 : Grid.find('.grid-row,.grid-group-row').length - 1;
      }

      this.setSelected(rowIndex, colIndex);
    }
  }, {
    key: "key37",
    value: function key37(e) {
      this.arrowH(e, 37);
    }
  }, {
    key: "key39",
    value: function key39(e) {
      this.arrowH(e, 39);
    }
  }, {
    key: "key40",
    value: function key40(e) {
      this.arrowV(e, 40);
    }
  }, {
    key: "key38",
    value: function key38(e) {
      this.arrowV(e, 38);
    }
  }, {
    key: "key13",
    value: function key13(e) {
      if (!this.selected) {
        return;
      }

      var _this$selected2 = _slicedToArray(this.selected, 1),
          rowType = _this$selected2[0];

      if (rowType === 'group') {} else {
        this.setActived(this.selected[0], this.selected[1]);
      }
    }
  }, {
    key: "key27",
    value: function key27(e) {
      if (this.actived) {
        //اگر ردیفی اکتیو است
        this.deactiveAll(false); //ردیف اکتیو را دی اکتیو کن ولی سیو نکن
      }
    }
  }]);

  return GridContainer;
}(_react.Component);

exports.GridContainer = GridContainer;
GridContainer.defaultProps = {
  theme: {},
  selectable: false,
  dataset: {},
  keyboard: {},
  inlineEditMode: 'A'
};

var GridHeader = /*#__PURE__*/function (_Component3) {
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
          checkboxColumn = _this$context2.checkboxColumn,
          addColumn = _this$context2.addColumn;
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

      if (addColumn) {
        index++;

        var addTitle = _react.default.createElement(GridTitle, {
          column: addColumn,
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
      }, checkboxColumn && checkboxTitle, addColumn && addTitle, titles);
    }
  }]);

  return GridHeader;
}(_react.Component);

exports.GridHeader = GridHeader;

_defineProperty(GridHeader, "contextType", GridContext);

var GridTitle = /*#__PURE__*/function (_Component4) {
  _inherits(GridTitle, _Component4);

  function GridTitle(props) {
    var _this7;

    _classCallCheck(this, GridTitle);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(GridTitle).call(this, props));

    _defineProperty(_assertThisInitialized(_this7), "moveMove", function (e) {
      var getClient = _this7.context.getClient;
      var _this7$startOffset = _this7.startOffset,
          width = _this7$startOffset.width,
          height = _this7$startOffset.height;
      e.preventDefault();

      var _getClient = getClient(e),
          x = _getClient.x,
          y = _getClient.y;

      (0, _jquery.default)(".grid-title-shadow").css({
        left: x - width / 2,
        top: y - (height + 2)
      });
    });

    _defineProperty(_assertThisInitialized(_this7), "moveUp", function (e) {
      var eventHandler = _this7.context.eventHandler;
      eventHandler('window', 'mousemove', _this7.moveMove, 'unbind');
      eventHandler('window', 'mouseup', _this7.moveUp, 'unbind');
      (0, _jquery.default)('.move-handle').off("mouseenter");
      (0, _jquery.default)(".grid-title-shadow").remove();
      var so = _this7.startOffset;

      if (so.to !== 0 && !so.to) {
        return;
      }

      if (so.from === so.to) {
        return;
      }

      ;
      var _this7$context = _this7.context,
          columns = _this7$context.columns,
          onchange = _this7$context.onchange;
      var temp = columns[so.from];
      columns[so.from] = columns[so.to];
      columns[so.to] = temp;
      onchange({
        columns: columns
      });
    });

    _defineProperty(_assertThisInitialized(_this7), "resizeUp", function (e) {
      var eventHandler = _this7.context.eventHandler;
      eventHandler('window', 'mousemove', _this7.resizeMove, 'unbind');
      eventHandler('window', 'mouseup', _this7.resizeUp, 'unbind');
      var _this7$context2 = _this7.context,
          onchange = _this7$context2.onchange,
          columns = _this7$context2.columns;
      var _this7$startOffset2 = _this7.startOffset,
          column = _this7$startOffset2.column,
          newWidth = _this7$startOffset2.newWidth;
      column.width = newWidth;
      onchange({
        columns: columns
      });
    });

    _defineProperty(_assertThisInitialized(_this7), "resizeMove", function (e) {
      e.preventDefault();
      var _this7$context3 = _this7.context,
          rtl = _this7$context3.rtl,
          getClient = _this7$context3.getClient;
      var so = _this7.startOffset;
      var offset = (so.x - getClient(e).x) * (rtl ? 1 : -1);
      var newWidth = so.width + offset;
      newWidth = newWidth < so.minWidth ? so.minWidth : newWidth;
      so.newWidth = newWidth;
      so.size[so.index] = newWidth + 'px';
      so.gridTemplateColumns = '';
      var theme = _this7.context.theme;
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

    _this7.dom = (0, _react.createRef)();
    return _this7;
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
      var _this8 = this;

      if (e.button === 2) return;
      var eventHandler = this.context.eventHandler;

      if (column.className === 'grid-cell-checkbox' || column.className === 'grid-cell-add') {
        return;
      } //شرط نادیده گرفتن ستون چک باکس


      var dom = (0, _jquery.default)(e.target);
      this.startOffset = {
        from: parseInt(dom.attr('data-column-index')),
        width: dom.width(),
        height: dom.height()
      };
      (0, _jquery.default)("body").append(this.getShadow(column, e));
      eventHandler('window', 'mousemove', _jquery.default.proxy(this.moveMove, this));
      eventHandler('window', 'mouseup', _jquery.default.proxy(this.moveUp, this));
      (0, _jquery.default)('.move-handle').on("mouseenter", function (e) {
        _this8.startOffset.to = parseInt((0, _jquery.default)(e.target).attr('data-column-index'));
      });
    }
  }, {
    key: "getShadow",
    value: function getShadow(column, e) {
      var _this$context3 = this.context,
          theme = _this$context3.theme,
          getClient = _this$context3.getClient;
      var headerBackground = theme.headerBackground,
          borderColor = theme.borderColor,
          color = theme.color;
      var _this$startOffset = this.startOffset,
          width = _this$startOffset.width,
          height = _this$startOffset.height;

      var _getClient2 = getClient(e),
          x = _getClient2.x,
          y = _getClient2.y;

      var style = "color:".concat(color, ";width:").concat(width, "px;left:").concat(x - width / 2, "px;top:").concat(y - (height + 2), "px;background:").concat(headerBackground, ";border:1px solid ").concat(borderColor, ";z-index:100;font-size:11px;");
      return " \n    <div class=\"grid-title grid-title-shadow\" style=\"".concat(style, "\">\n      ").concat(column.title, "\n    </div>");
    }
  }, {
    key: "resizeDown",
    value: function resizeDown(column, e) {
      var _this$context4 = this.context,
          eventHandler = _this$context4.eventHandler,
          getClient = _this$context4.getClient;
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
        x: getClient(e).x,
        // موقعیت در راستای افق
        size: this.context.size.split(' '),
        container: grid.find(".grid-header,.grid-row"),
        gridRowsWidth: parseInt(gridRows.css('width')),
        gridRows: gridRows,
        newWidth: column.width
      };
      eventHandler('window', 'mousemove', _jquery.default.proxy(this.resizeMove, this));
      eventHandler('window', 'mouseup', _jquery.default.proxy(this.resizeUp, this));
    }
  }, {
    key: "toggleSetting",
    value: function toggleSetting() {
      (0, _jquery.default)(this.dom.current).find('.column-popup').toggle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _this$props13 = this.props,
          column = _this$props13.column,
          renderColIndex = _this$props13.renderColIndex,
          colIndex = _this$props13.colIndex;
      var _column$options = column.options,
          options = _column$options === void 0 ? [] : _column$options;
      var _this$context5 = this.context,
          theme = _this$context5.theme,
          touch = _this$context5.touch;
      var borderColor = theme.borderColor,
          cellBackground = theme.cellBackground;
      var _column$width = column.width,
          width = _column$width === void 0 ? 'auto' : _column$width,
          _column$resizable = column.resizable,
          resizable = _column$resizable === void 0 ? true : _column$resizable;
      var Resize = resizable && width !== 'auto';
      var Options = options.map(function (option, i) {
        return _react.default.createElement("li", {
          key: i,
          className: "column-option".concat(option.checked ? ' checked' : ''),
          onClick: function onClick() {
            if (option.callback) {
              option.callback(column);
            }
          },
          "data-value": option.value
        }, option.text);
      });

      var moveHandleProps = _defineProperty({
        className: 'move-handle',
        'data-column-index': colIndex,
        'data-render-column-index': renderColIndex
      }, touch ? 'onTouchStart' : 'onMouseDown', function (e) {
        _this9.moveDown(column, e);
      });

      return _react.default.createElement("div", {
        className: "grid-title",
        style: this.getStyle(),
        ref: this.dom,
        title: column.title
      }, colIndex !== false && _react.default.createElement("div", moveHandleProps, column.title), colIndex !== false && _react.default.createElement("div", {
        className: "resize-handle",
        "data-column-index": colIndex,
        style: {
          cursor: Resize ? undefined : 'not-allowed'
        },
        "data-render-column-index": renderColIndex,
        onMouseDown: function onMouseDown(e) {
          _this9.resizeDown(column, e);
        }
      }), Options.length !== 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        className: "column-setting",
        "data-column-index": colIndex,
        "data-render-column-index": renderColIndex,
        onMouseDown: function onMouseDown(e) {
          _this9.toggleSetting(column, e);
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

var GridRows = /*#__PURE__*/function (_Component5) {
  _inherits(GridRows, _Component5);

  function GridRows() {
    _classCallCheck(this, GridRows);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridRows).apply(this, arguments));
  }

  _createClass(GridRows, [{
    key: "getRows",
    value: function getRows() {
      var _this$context6 = this.context,
          convertedModel = _this$context6.convertedModel,
          group = _this$context6.group;

      if (!convertedModel || convertedModel.length === 0) {
        var _ref6;

        return _react.default.createElement("div", {
          style: (_ref6 = {
            background: '#ddd',
            position: 'absolute',
            height: '',
            left: 0,
            top: 0,
            width: '100%'
          }, _defineProperty(_ref6, "height", '100%'), _defineProperty(_ref6, "display", 'flex'), _defineProperty(_ref6, "justifyContent", 'center'), _defineProperty(_ref6, "alignItems", 'center'), _defineProperty(_ref6, "flexDirection", 'column'), _ref6)
        }, _react.default.createElement("svg", {
          style: {
            left: 'calc(50% - 50px)',
            top: 'calc(50% - 50px)',
            width: '100px',
            height: '110px'
          }
        }, _react.default.createElement("path", {
          stroke: '#fff',
          "stroke-width": 10,
          fill: "none",
          d: "M20 10 L60 10 L80 30 L80 90 L20 90Z"
        })), _react.default.createElement("span", {
          style: {
            color: '#fff',
            fontSize: '18px'
          }
        }, "No Data"));
      }

      this.rows = [];
      this._order = 0;
      this.getRowsRecursive(convertedModel, group ? -1 : 0);
      return this.rows;
    }
  }, {
    key: "getError",
    value: function getError(id) {
      var errors = this.context.errors;

      for (var i = 0; i < errors.length; i++) {
        if (errors[i].id === id) {
          return errors[i];
        }
      }
    }
  }, {
    key: "getRowsRecursive",
    value: function getRowsRecursive(model, level, parent) {
      var _this$context7 = this.context,
          dataset = _this$context7.dataset,
          getValueByField = _this$context7.getValueByField;

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        row._order = this._order;
        row._inorder = i;
        row._level = level;
        row._opened = row._opened === undefined ? true : row._opened;
        row._childs = row._childs || getValueByField(row, dataset._childs);
        row._id = row._id || getValueByField(row, dataset._id);
        var props = {
          row: row,
          key: row._order,
          isFirst: row._order === 0,
          rowIndex: row._order,
          error: this.getError(row._id)
        };
        this.rows.push(row._groupName !== undefined ? _react.default.createElement(GroupRow, props) : _react.default.createElement(GridRow, props));
        this._order++;
        var childs = row._childs;

        if (childs && childs.length && row._opened !== false) {
          this.getRowsRecursive(childs, level + 1, row);
        }
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$context8 = this.context,
          theme = _this$context8.theme,
          total = _this$context8.total;
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
          marginTop: borderWidth || 1
        }
      }));
    }
  }]);

  return GridRows;
}(_react.Component);

exports.GridRows = GridRows;

_defineProperty(GridRows, "contextType", GridContext);

var GridRow = /*#__PURE__*/function (_Component6) {
  _inherits(GridRow, _Component6);

  function GridRow() {
    _classCallCheck(this, GridRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridRow).apply(this, arguments));
  }

  _createClass(GridRow, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context9 = this.context,
          size = _this$context9.size,
          theme = _this$context9.theme;
      var isFirst = this.props.isFirst;
      return {
        gridTemplateColumns: size,
        gridColumnGap: theme.borderWidth,
        marginTop: isFirst ? 0 : theme.borderWidth || 1
      };
    }
  }, {
    key: "getError",
    value: function getError(column) {
      var error = this.props.error;

      if (!error) {
        return;
      }

      for (var i = 0; i < error.columns.length; i++) {
        if (error.columns[i].id === column.id) {
          return error.columns[i].message;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      var _this$context10 = this.context,
          columns = _this$context10.columns,
          checkField = _this$context10.checkField,
          addField = _this$context10.addField,
          addColumn = _this$context10.addColumn,
          checkboxColumn = _this$context10.checkboxColumn,
          isActived = _this$context10.isActived;
      var _this$props14 = this.props,
          row = _this$props14.row,
          rowIndex = _this$props14.rowIndex,
          error = _this$props14.error;
      var active = isActived(rowIndex, null, 'row');
      var cells = columns.map(function (column, i) {
        return _react.default.createElement(GridCell, {
          column: column,
          row: row,
          key: i,
          rowIndex: row._order,
          colIndex: i,
          error: _this10.getError(column),
          active: active
        });
      });
      return _react.default.createElement("div", {
        className: "grid-row".concat(active ? ' actived' : ''),
        style: this.getStyle(),
        "data-row-index": rowIndex
      }, checkField && _react.default.createElement(GridCell, {
        column: checkboxColumn,
        row: row,
        key: -2
      }), addField && _react.default.createElement(GridCell, {
        column: addColumn,
        row: row,
        key: -1
      }), cells);
    }
  }]);

  return GridRow;
}(_react.Component);

exports.GridRow = GridRow;

_defineProperty(GridRow, "contextType", GridContext);

var GroupRow = /*#__PURE__*/function (_Component7) {
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
      var _this$context11 = this.context,
          setSelected = _this$context11.setSelected,
          selectable = _this$context11.selectable;

      if (!selectable) {
        return;
      }

      var rowIndex = this.props.rowIndex;
      setSelected(rowIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props15 = this.props,
          row = _this$props15.row,
          rowIndex = _this$props15.rowIndex;
      var _this$context12 = this.context,
          checkField = _this$context12.checkField,
          onGroupCheck = _this$context12.onGroupCheck,
          group = _this$context12.group,
          isSelected = _this$context12.isSelected;
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

var GridCell = /*#__PURE__*/function (_Component8) {
  _inherits(GridCell, _Component8);

  function GridCell() {
    _classCallCheck(this, GridCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridCell).apply(this, arguments));
  }

  _createClass(GridCell, [{
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var _this$props16 = this.props,
          column = _this$props16.column,
          active = _this$props16.active;
      return {
        background: active ? theme.active : theme.cellBackground,
        lineHeight: theme.rowHeight + 'px',
        height: theme.rowHeight + 'px',
        minWidth: column.minWidth ? column.minWidth + 'px' : undefined
      };
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _this$props17 = this.props,
          rowIndex = _this$props17.rowIndex,
          colIndex = _this$props17.colIndex,
          column = _this$props17.column,
          error = _this$props17.error;
      var isSelected = this.context.isSelected;
      var className;

      if (column.treeMode) {
        className = 'grid-cell';
      } else {
        className = "grid-cell".concat(column.className ? ' ' + column.className : ' grid-cell-text');
      }

      className += isSelected(rowIndex, colIndex) ? ' selected' : '';
      className += error ? ' hasError' : '';
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
    key: "dblClick",
    value: function dblClick(e) {
      var _this$context13 = this.context,
          setSelected = _this$context13.setSelected,
          selectable = _this$context13.selectable,
          columns = _this$context13.columns;

      if (!selectable) {
        return;
      }

      var _this$props18 = this.props,
          _this$props18$rowInde = _this$props18.rowIndex,
          rowIndex = _this$props18$rowInde === void 0 ? false : _this$props18$rowInde,
          _this$props18$colInde = _this$props18.colIndex,
          colIndex = _this$props18$colInde === void 0 ? false : _this$props18$colInde;

      if (rowIndex === false || colIndex === false) {
        return;
      }

      if (columns[colIndex].selectable === false) {
        return;
      }

      setSelected(rowIndex, colIndex);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$context14 = this.context,
          deactiveAll = _this$context14.deactiveAll,
          deselectAll = _this$context14.deselectAll;
      deactiveAll();
      deselectAll();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props19 = this.props,
          row = _this$props19.row,
          column = _this$props19.column,
          colIndex = _this$props19.colIndex,
          error = _this$props19.error;
      var getValueByField = this.context.getValueByField;
      var value = getValueByField(row, column.field);
      return _react.default.createElement("div", {
        title: column.template ? undefined : value,
        className: this.getClassName(),
        style: this.getStyle(),
        "data-col-index": colIndex,
        tabIndex: 0,
        onDoubleClick: this.dblClick.bind(this),
        onMouseDown: this.mouseDown.bind(this)
      }, this.getTemplate(row, column, value), error && _react.default.createElement(GridCellError, {
        message: error
      }));
    }
  }]);

  return GridCell;
}(_react.Component);

exports.GridCell = GridCell;

_defineProperty(GridCell, "contextType", GridContext);

var GridCellError = /*#__PURE__*/function (_Component9) {
  _inherits(GridCellError, _Component9);

  function GridCellError() {
    _classCallCheck(this, GridCellError);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridCellError).apply(this, arguments));
  }

  _createClass(GridCellError, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "grid-cell-error",
        title: this.props.message
      });
    }
  }]);

  return GridCellError;
}(_react.Component);

exports.GridCellError = GridCellError;

var TreeCell = /*#__PURE__*/function (_Component10) {
  _inherits(TreeCell, _Component10);

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
      var _this$props20 = this.props,
          row = _this$props20.row,
          value = _this$props20.value,
          column = _this$props20.column;
      var icon = (column.icon ? column.icon(row) : false) || {};
      return _react.default.createElement("div", {
        className: "grid-tree-cell",
        style: this.getStyle()
      }, _react.default.createElement(GridToggleIcon, {
        row: row
      }), column.icon && _react.default.createElement(GridIcon, {
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

var GridText = /*#__PURE__*/function (_Component11) {
  _inherits(GridText, _Component11);

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

var GridToggleIcon = /*#__PURE__*/function (_Component12) {
  _inherits(GridToggleIcon, _Component12);

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
      var _this$context15 = this.context,
          onchange = _this$context15.onchange,
          model = _this$context15.model,
          changeGroupsOpen = _this$context15.changeGroupsOpen;
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

var GridCheckbox = /*#__PURE__*/function (_Component13) {
  _inherits(GridCheckbox, _Component13);

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
      var _this$props21 = this.props,
          checked = _this$props21.checked,
          disabled = _this$props21.disabled;
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

var GridIcon = /*#__PURE__*/function (_Component14) {
  _inherits(GridIcon, _Component14);

  function GridIcon() {
    _classCallCheck(this, GridIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridIcon).apply(this, arguments));
  }

  _createClass(GridIcon, [{
    key: "render",
    value: function render() {
      var _this$props22 = this.props,
          className = _this$props22.className,
          color = _this$props22.color;
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