"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridIcon = exports.GridCheckbox = exports.GridGroupToggleIcon = exports.GridToggleIcon = exports.GridText = exports.TreeCell = exports.GridCellError = exports.GridCell = exports.GroupRow = exports.GridRow = exports.GridRows = exports.GridFilter = exports.GridResizeHandle = exports.GridMoveHandle = exports.GridTitle = exports.GridHeader = exports.GridContainer = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

var _functions = require("./functions");

var _rDropdownButton = _interopRequireDefault(require("r-dropdown-button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GridContext = /*#__PURE__*/(0, _react.createContext)();

var Grid = /*#__PURE__*/function (_Component) {
  _inherits(Grid, _Component);

  var _super = _createSuper(Grid);

  function Grid(props) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _super.call(this, props);
    _this.dom = /*#__PURE__*/(0, _react.createRef)();
    _this.theme = _jquery.default.extend({}, {
      borderWidth: 0
    }, _this.props.theme);
    ;
    var paging = _this.props.paging;
    _this.state = {
      groupsOpen: {}
    };

    if (paging && !paging.onChange) {
      _this.state.paging = paging;
    }

    return _this;
  }

  _createClass(Grid, [{
    key: "onGroupToggle",
    value: function onGroupToggle(name) {
      var groupsOpen = this.state.groupsOpen;
      groupsOpen[name] = !groupsOpen[name];
      this.setState({
        groupsOpen: groupsOpen
      });
    }
  }, {
    key: "getModel",
    value: function getModel(model, dataType) {
      if (model.length === 0) {
        return [];
      }

      var _this$props = this.props,
          _this$props$dataset = _this$props.dataset,
          dataset = _this$props$dataset === void 0 ? {} : _this$props$dataset,
          search = _this$props.search;

      if (dataType === 'flat') {
        model = (0, _functions.convertFlatToComposite)(model, dataset._id, dataset._parent);
      }

      if (search) {
        model = (0, _functions.searchTree)(model, search.value, search.field);
      }

      return model;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var split = this.props.split;
      var _split$length = split.length,
          splitLength = _split$length === void 0 ? 0 : _split$length;

      if (splitLength) {
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
    key: "onChange",
    value: function onChange(obj, props) {
      var _this$props2 = this.props,
          split = _this$props2.split,
          columns = _this$props2.columns;
      var _split$length2 = split.length,
          splitLength = _split$length2 === void 0 ? 0 : _split$length2;

      if (props.dataSplitter === 0 && obj.columns) {
        obj.columns = obj.columns.concat(columns.slice(splitLength, columns.length));
      } else if (props.dataSplitter === 1 && obj.columns) {
        obj.columns = columns.slice(0, splitLength).concat(obj.columns);
      }

      this.props.onChange(obj, props);
    }
  }, {
    key: "onChangeSplitter",
    value: function onChangeSplitter(pos) {
      var container = (0, _jquery.default)(this.dom.current);
      var grids = container.find('.grid-container');
      grids.eq(0).css({
        width: pos + 'px'
      });
    }
  }, {
    key: "translate",
    value: function translate(value) {
      var dictionary = (0, _functions.getDictionary)();
      var globalization = this.props.globalization;
      return dictionary[value][globalization];
    }
  }, {
    key: "onPageChange",
    value: function onPageChange(paging, changes) {
      if (this.state && this.state.paging) {
        this.setState({
          paging: paging
        });
      } else {
        this.props.paging.onChange(paging, changes);
      }
    }
  }, {
    key: "getRowsByFilter",
    value: function getRowsByFilter(model) {
      this._order = 0;
      this.rows = [];
      this.getRowsRecursive(model, 0);
      return this.rows.filter(function (row) {
        return row._show === true && row._parentOpened === true;
      });
    }
  }, {
    key: "getRows",
    value: function getRows(model) {
      var rootLength = model.length;

      if (rootLength === 0) {
        return [];
      }

      var _this$props3 = this.props,
          group = _this$props3.group,
          getOpened = _this$props3.getOpened,
          setOpened = _this$props3.setOpened;

      var _ref = this.state && this.state.paging ? this.state : this.props,
          paging = _ref.paging;

      var groupsOpen = this.state.groupsOpen;
      this.getOpened = {};
      this.setOpened = undefined;

      if (setOpened) {
        this.setOpened = setOpened();

        if (this.setOpened === null) {
          this.setOpened = undefined;
        }
      }

      var rows = this.getRowsByFilter(model);
      rows = (0, _functions.getRowsByPaging)(rows, paging, rootLength);
      rows = (0, _functions.getRowsByGroup)(rows, group, groupsOpen);

      if (getOpened) {
        getOpened(this.getOpened);
      }

      return rows;
    }
  }, {
    key: "getRowsRecursive",
    value: function getRowsRecursive(model, level) {
      var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var parentOpened = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var _this$props4 = this.props,
          _this$props4$dataset = _this$props4.dataset,
          dataset = _this$props4$dataset === void 0 ? {} : _this$props4$dataset,
          group = _this$props4.group,
          dataType = _this$props4.dataType;

      for (var i = 0; i < model.length; i++) {
        var row = model[i];
        row._show = false;
        row._level = level;
        row._order = this._order;
        row._inorder = i;
        row._id = dataset._id ? (0, _functions.getValueByField)(row, dataset._id) : undefined;

        var _this$getRowDetailsBy = this.getRowDetailsByColumns(row),
            columnsValue = _this$getRowDetailsBy.columnsValue,
            filterResult = _this$getRowDetailsBy.filterResult;

        if (filterResult) {
          row._show = true;

          for (var k = 0; k < parents.length; k++) {
            parents[k]._show = true;
          }
        }

        row._parentOpened = parentOpened; //is parent of row opened? 

        if (this.setOpened !== undefined) {
          row._opened = row._opened === undefined ? this.setOpened[row._id] : row._opened;
        } else {
          row._opened = row._opened === undefined ? true : row._opened;
        }

        this.getOpened[row._id] = row._opened;

        if (dataType === 'composite') {
          //در حالت فلت این فیلد قبلا پر شده است
          row._childs = dataset._childs ? (0, _functions.getValueByField)(row, dataset._childs) : undefined;
        }

        row._getParents = function () {
          return parents;
        };

        if (parentOpened) {
          //محض پرفرمنس در نادیده گرفتن ردیف هایی که پرنت بسته دارند
          row._columnsValue = columnsValue; //values of row per each column

          if (group && group.fields && group.fields.length) {
            row._groupValue = level === 0 ? group.fields.map(function (f) {
              return (0, _functions.getValueByField)(row, f);
            }) : parents[0]._groupValue;
          }
        }

        this.rows.push(row);
        this._order++;

        if (row._childs && row._childs.length) {
          this.getRowsRecursive(row._childs, level + 1, parents.concat(row), row._opened && parentOpened);
        }
      }
    }
  }, {
    key: "getRowDetailsByColumns",
    value: function getRowDetailsByColumns(row) {
      var _this$props5 = this.props,
          onFilterChange = _this$props5.onFilterChange,
          columns = _this$props5.columns;
      var columnsValue = [];
      var filterResult = true;

      for (var i = 0; i < columns.length; i++) {
        var _columns$i = columns[i],
            field = _columns$i.field,
            filter = _columns$i.filter,
            id = _columns$i.id;
        var Field = void 0;

        if (typeof field === 'function') {
          Field = field(row);
        } else {
          Field = field;
        }

        var value = (0, _functions.getValueByField)(row, Field);
        columnsValue.push({
          value: value,
          field: Field,
          id: id
        });

        if (!field) {
          continue;
        }

        if (!onFilterChange) {
          var result = (0, _functions.getFilterResult)(filter, value);

          if (result === false) {
            filterResult = false;
          }
        }
      }

      return {
        columnsValue: columnsValue,
        filterResult: filterResult
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          split = _this$props6.split,
          rtl = _this$props6.rtl,
          group = _this$props6.group,
          dataType = _this$props6.dataType,
          columns = _this$props6.columns,
          className = _this$props6.className,
          model = _this$props6.model,
          style = _this$props6.style,
          paging = _this$props6.paging,
          _this$props6$onChange = _this$props6.onChange,
          onChange = _this$props6$onChange === void 0 ? false : _this$props6$onChange,
          toggleColumns = _this$props6.toggleColumns;
      var _split$length3 = split.length,
          splitLength = _split$length3 === void 0 ? 0 : _split$length3,
          _split$size = split.size,
          splitSize = _split$size === void 0 ? 300 : _split$size,
          splitResizable = split.resizable;

      if (!Array.isArray(columns)) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "grid".concat(className ? ' ' + className : ''),
          ref: this.dom,
          style: { ...style
          }
        }, (0, _functions.getGridLoading)());
      }

      if (columns.length === 0) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "grid".concat(className ? ' ' + className : ''),
          ref: this.dom,
          style: { ...style
          }
        }, (0, _functions.getGridNoData)(this.translate('No.Columns')));
      }

      var closedColumns = columns.filter(function (column) {
        return toggleColumns && column.opened === false;
      });
      var Paging;

      if (this.state && this.state.paging) {
        Paging = { ...this.state.paging
        };
        Paging.count = undefined;
      } else if (paging) {
        Paging = paging;
      }

      var props = {
        dataType: dataType,
        groupsOpen: this.state.groupsOpen,
        onGroupToggle: this.onGroupToggle.bind(this),
        onChange: onChange ? this.onChange.bind(this) : false,
        translate: this.translate.bind(this),
        theme: this.theme,
        style: undefined,
        paging: Paging
      };

      if (model !== undefined && model !== null) {
        var convertedModel = this.getModel(model, dataType);
        props.convertedModel = convertedModel;
        props.rows = this.getRows(convertedModel);
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid".concat(className ? ' ' + className : '').concat(rtl ? ' rtl' : ''),
        ref: this.dom,
        style: { ...style
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          flex: 1,
          display: 'flex',
          overflow: 'auto'
        }
      }, splitLength === 0 && /*#__PURE__*/_react.default.createElement(GridContainer, _extends({}, this.props, props)), splitLength !== 0 && /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(GridContainer, _extends({}, this.props, props, {
        columns: columns.slice(0, splitLength),
        dataSplitter: 0,
        style: {
          width: splitSize
        }
      })), /*#__PURE__*/_react.default.createElement(GridSplitter, {
        rtl: rtl,
        resizable: splitResizable,
        position: splitSize,
        onChange: this.onChangeSplitter.bind(this),
        onChangeEnd: function onChangeEnd() {
          _this3.onChange({
            columns: columns
          }, _this3.props);
        }
      }), /*#__PURE__*/_react.default.createElement(GridContainer, _extends({}, this.props, props, {
        columns: columns.slice(splitLength, columns.length),
        dataSplitter: 1,
        checkField: false,
        addField: false,
        style: {
          flex: 1
        },
        group: group ? {
          fields: group.fields,
          title: group.title,
          collapsible: false
        } : false
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-closed-columns"
      }, closedColumns.map(function (column, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "grid-closed-column",
          onClick: function onClick() {
            column.opened = true;

            _this3.onChange({
              columns: columns
            }, _this3.props);
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "grid-closed-column-title"
        }, column.title));
      }))), Paging && convertedModel && /*#__PURE__*/_react.default.createElement(GridPaging, {
        translate: this.translate.bind(this),
        paging: Paging,
        rootLength: Paging.rootLength === undefined ? props.convertedModel.length : Paging.rootLength,
        onChange: this.onPageChange.bind(this)
      }));
    }
  }]);

  return Grid;
}(_react.Component);

exports.default = Grid;
Grid.defaultProps = {
  split: {
    length: 0
  },
  globalization: 'en',
  dataType: 'composite'
};

var GridPaging = /*#__PURE__*/function (_Component2) {
  _inherits(GridPaging, _Component2);

  var _super2 = _createSuper(GridPaging);

  function GridPaging() {
    _classCallCheck(this, GridPaging);

    return _super2.apply(this, arguments);
  }

  _createClass(GridPaging, [{
    key: "onChange",
    value: function onChange(obj) {
      if (obj.number < 1) {
        return;
      }

      var _this$props7 = this.props,
          paging = _this$props7.paging,
          onChange = _this$props7.onChange,
          rootLength = _this$props7.rootLength;
      var size = paging.size;
      var count = Math.ceil(rootLength / size);

      if (obj.number !== undefined && obj.number > count) {
        return;
      }

      var _paging$sizes = paging.sizes,
          sizes = _paging$sizes === void 0 ? ['5', '10', '20', '30', '40'] : _paging$sizes,
          _paging$size = paging.size,
          size = _paging$size === void 0 ? sizes[0] : _paging$size,
          count = paging.count,
          number = paging.number;
      var Paging = {
        sizes: sizes,
        count: count,
        number: number,
        size: size
      };

      for (var prop in obj) {
        Paging[prop] = obj[prop];
      }

      onChange(Paging, obj);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props8 = this.props,
          translate = _this$props8.translate,
          paging = _this$props8.paging,
          rootLength = _this$props8.rootLength;
      var _paging$sizes2 = paging.sizes,
          sizes = _paging$sizes2 === void 0 ? ['5', '10', '20', '30', '40'] : _paging$sizes2,
          _paging$size2 = paging.size,
          size = _paging$size2 === void 0 ? sizes[0] : _paging$size2,
          number = paging.number;
      var count = Math.ceil(rootLength / size);

      if (number > count) {
        number = count;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-paging"
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: "grid-paging-button grid-paging-first",
        onClick: function onClick() {
          return _this4.onChange({
            number: 1
          });
        },
        title: translate('First.Page')
      }), /*#__PURE__*/_react.default.createElement("button", {
        className: "grid-paging-button grid-paging-prev",
        onClick: function onClick() {
          return _this4.onChange({
            number: number - 1
          });
        },
        title: translate('Previous.Page')
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-paging-number"
      }, "".concat(number).concat(count !== undefined ? '/' + count : '')), /*#__PURE__*/_react.default.createElement("button", {
        className: "grid-paging-button grid-paging-next",
        onClick: function onClick() {
          return _this4.onChange({
            number: number + 1
          });
        },
        title: translate('Next.Page')
      }), /*#__PURE__*/_react.default.createElement("button", {
        className: "grid-paging-button grid-paging-last",
        onClick: function onClick() {
          return _this4.onChange({
            number: count
          });
        },
        title: translate('Last.Page')
      }), /*#__PURE__*/_react.default.createElement("select", {
        className: "grid-paging-select",
        onChange: function onChange(e) {
          return _this4.onChange({
            size: parseInt(e.target.value)
          });
        },
        value: size,
        title: translate('Page.Size')
      }, sizes.map(function (s, i) {
        return /*#__PURE__*/_react.default.createElement("option", {
          key: i,
          value: s
        }, s);
      })));
    }
  }]);

  return GridPaging;
}(_react.Component);

_defineProperty(GridPaging, "contextType", GridContext);

var GridSplitter = /*#__PURE__*/function (_Component3) {
  _inherits(GridSplitter, _Component3);

  var _super3 = _createSuper(GridSplitter);

  function GridSplitter(props) {
    var _this5;

    _classCallCheck(this, GridSplitter);

    _this5 = _super3.call(this, props);
    _this5.position = _this5.props.position;
    return _this5;
  }

  _createClass(GridSplitter, [{
    key: "mouseDown",
    value: function mouseDown(e) {
      var resizable = this.props.resizable;

      if (resizable === false) {
        return;
      }

      this.so = {
        x: (0, _functions.getClient)(e).x,
        size: this.position
      };
      (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$props9 = this.props,
          rtl = _this$props9.rtl,
          onChange = _this$props9.onChange;
      var pos = (this.so.x - (0, _functions.getClient)(e).x) * (rtl ? 1 : -1) + this.so.size;
      this.position = pos;
      onChange(pos);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      var onChangeEnd = this.props.onChangeEnd;
      (0, _functions.eventHandler)('window', 'mousemove', this.mouseMove, 'unbind');
      (0, _functions.eventHandler)('window', 'mouseup', this.mouseUp, 'unbind'); //onChangeEnd();
    }
  }, {
    key: "render",
    value: function render() {
      var props = _defineProperty({
        className: 'grid-splitter'
      }, 'ontouchstart' in document.documentElement ? 'onTouchStart' : 'onMouseDown', this.mouseDown.bind(this));

      return /*#__PURE__*/_react.default.createElement("div", props);
    }
  }]);

  return GridSplitter;
}(_react.Component);

var GridContainer = /*#__PURE__*/function (_Component4) {
  _inherits(GridContainer, _Component4);

  var _super4 = _createSuper(GridContainer);

  function GridContainer(props) {
    var _this6;

    _classCallCheck(this, GridContainer);

    _this6 = _super4.call(this, props);
    _this6.dom = /*#__PURE__*/(0, _react.createRef)();

    _this6.treeTemplate = function (value, _ref2, context) {
      var row = _ref2.row,
          column = _ref2.column;
      return /*#__PURE__*/_react.default.createElement(TreeCell, {
        row: row,
        column: column,
        value: value
      });
    };

    _this6.state = {
      selected: [false, false],
      error: false
    };
    _this6.inlineChanges = false;
    return _this6;
  }

  _createClass(GridContainer, [{
    key: "windowMouseDown",
    value: function windowMouseDown(e) {
      var _this$state$selected = this.state.selected,
          selected = _this$state$selected === void 0 ? [] : _this$state$selected;

      if (selected[0] === false && selected[1] === false) {
        return;
      }

      var target = (0, _jquery.default)(e.target);
      var parent = target.parents('.grid');

      if (parent.length && !target.hasClass('grid-background')) {
        return;
      }

      this.deselect();
    }
  }, {
    key: "getInlineChanges",
    value: function getInlineChanges(colIndex, value) {
      if (this.inlineChanges === false) {
        this.inlineChanges = {};
      }

      this.inlineChanges[colIndex + 'col'] = value;
    }
  }, {
    key: "select",
    value: function select() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.selected[0];
      var colIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.selected[1];
      var selected = this.state.selected;

      if (selected[0] === rowIndex && selected[1] === colIndex) {
        return;
      } //اگر روی سلولی که سلکت شده است در خواست سلکت اومد ادامه نده


      if (selected[0] !== false && selected[0] !== rowIndex) {
        this.deselect();
      }

      this.setState({
        selected: [rowIndex, colIndex]
      });
      (0, _functions.eventHandler)('window', 'mousedown', _jquery.default.proxy(this.windowMouseDown, this));
    }
  }, {
    key: "saveInlineEdit",
    value: function saveInlineEdit() {
      var _this$props10 = this.props,
          columns = _this$props10.columns,
          convertedModel = _this$props10.convertedModel,
          model = _this$props10.model,
          onChange = _this$props10.onChange;
      var selected = this.state.selected;
      var rowIndex = selected[0];
      var row = (0, _functions.searchComposite)(convertedModel, {
        _order: rowIndex
      }, '_childs');
      var errors = [];

      for (var prop in this.inlineChanges) {
        var colIndex = parseInt(prop);
        var column = columns[colIndex];
        var value = this.inlineChanges[prop];
        var inlineEdit = column.inlineEdit;
        var _inlineEdit$validate = inlineEdit.validate,
            validate = _inlineEdit$validate === void 0 ? function () {
          return false;
        } : _inlineEdit$validate;
        var result = validate({
          row: row,
          rowIndex: rowIndex,
          value: value
        });

        if (result) {
          errors.push({
            column: column,
            colIndex: colIndex,
            message: result
          });
        } else {
          (0, _functions.setValueByField)(row, column.field, value);
        }
      }

      onChange({
        model: model
      }, this.props);
      this.setState({
        error: {
          id: row._id,
          columns: errors
        }
      });
    }
  }, {
    key: "deselect",
    value: function deselect() {
      var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      (0, _functions.eventHandler)('window', 'mousedown', this.windowMouseDown, 'unbind');

      if (this.inlineChanges) {
        if (save) {
          this.saveInlineEdit();
        }

        this.inlineChanges = false;
      } else {
        var error = this.state.error;

        if (error) {
          this.setState({
            error: false
          });
        }
      }

      this.setState({
        selected: [false, false]
      });
    }
  }, {
    key: "getCheckboxColumn",
    value: function getCheckboxColumn() {
      var _this$props11 = this.props,
          checkField = _this$props11.checkField,
          dataset = _this$props11.dataset;

      if (!checkField) {
        return false;
      }

      return {
        width: 40,
        resizable: false,
        movable: false,
        className: 'grid-cell-checkbox',
        field: dataset._checked,
        isDefault: true,
        template: function template(value, _ref3, context) {
          var row = _ref3.row,
              column = _ref3.column;
          var _onChange = context.onChange,
              dataset = context.dataset,
              model = context.model;

          var a = /*#__PURE__*/_react.default.createElement(GridCheckbox, {
            checked: value || false,
            disabled: checkField.disabled ? checkField.disabled(row) : false,
            onChange: function onChange(value) {
              (0, _functions.setValueByField)(row, dataset._checked, value);

              _onChange({
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
      var _this7 = this;

      var addField = this.props.addField;

      if (!addField) {
        return false;
      }

      return {
        width: 30,
        resizable: false,
        movable: false,
        className: 'grid-cell-add',
        isDefault: true,
        template: function template(value, _ref4, context) {
          var row = _ref4.row,
              column = _ref4.column;

          if (addField.enable === false) {
            return '';
          }

          if (typeof addField.enable === 'function') {
            if (addField.enable(row) === false) {
              return '';
            }
          }

          return /*#__PURE__*/_react.default.createElement("div", {
            className: "add-icon",
            onClick: function onClick() {
              _this7.add(row);
            }
          });
        }
      };
    }
  }, {
    key: "add",
    value: async function add(row) {
      var _this$props12 = this.props,
          onChange = _this$props12.onChange,
          dataType = _this$props12.dataType,
          model = _this$props12.model,
          dataset = _this$props12.dataset,
          addField = _this$props12.addField;
      var def = await addField.getDefault(row);

      if (dataType === 'flat') {
        var obj = model.concat([def]);
        onChange({
          model: obj
        }, this.props);
      } else {
        var childs = (0, _functions.getValueByField)(row, dataset._childs);

        if (!childs) {
          (0, _functions.setValueByField)(row, dataset._childs, []);
          childs = (0, _functions.getValueByField)(row, dataset._childs);
        }

        childs.push(def);
        onChange({
          model: model
        }, this.props);
      }
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var _this$props13 = this.props,
          columns = _this$props13.columns,
          theme = _this$props13.theme,
          toggleColumns = _this$props13.toggleColumns,
          onChange = _this$props13.onChange;
      var borderWidth = theme.borderWidth;
      var total = 0;
      var checkboxColumn = this.getCheckboxColumn();
      var addColumn = this.getAddColumn();
      checkboxColumn = checkboxColumn ? [checkboxColumn] : [];
      addColumn = addColumn ? [addColumn] : [];
      var Columns = checkboxColumn.concat(addColumn, columns);

      if (toggleColumns) {
        Columns = Columns.filter(function (column) {
          return column.opened !== false;
        });
      }

      var size = Columns.map(function (column, i) {
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
    key: "onChange",
    value: function onChange(obj) {
      this.props.onChange(obj, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props14 = this.props,
          rtl = _this$props14.rtl,
          dataSplitter = _this$props14.dataSplitter,
          columns = _this$props14.columns,
          _this$props14$onChang = _this$props14.onChange,
          onChange = _this$props14$onChang === void 0 ? false : _this$props14$onChang,
          style = _this$props14.style;

      if (!columns || !columns.length) {
        return '';
      }

      var _this$state = this.state,
          error = _this$state.error,
          selected = _this$state.selected;

      var _this$getSize = this.getSize(),
          size = _this$getSize.size,
          total = _this$getSize.total;

      var contextValue = { ...this.props,
        onChange: onChange ? this.onChange.bind(this) : false,
        size: size,
        error: error,
        getInlineChanges: this.getInlineChanges.bind(this),
        total: total,
        selected: selected,
        select: this.select.bind(this),
        checkboxColumn: this.getCheckboxColumn(),
        addColumn: this.getAddColumn(),
        treeTemplate: this.treeTemplate
      };
      return /*#__PURE__*/_react.default.createElement(GridContext.Provider, {
        value: contextValue
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-container".concat(rtl ? ' rtl' : ''),
        style: style,
        "data-splitter": dataSplitter,
        onKeyDown: this.keyDown.bind(this),
        tabIndex: 0,
        ref: this.dom
      }, /*#__PURE__*/_react.default.createElement(GridHeader, null), /*#__PURE__*/_react.default.createElement(GridRows, null)));
    }
  }, {
    key: "getColIndex",
    value: function getColIndex(index, sign) {
      var columns = this.props.columns;
      index += sign;
      var end = false;

      if (index === -1) {
        index = columns.length - 1;
      } else if (index === columns.length) {
        index = 0;
        end = true;
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

      return {
        index: index,
        end: end
      };
    }
  }, {
    key: "arrowH",
    value: function arrowH(e, code) {
      e.preventDefault();
      var selected = this.state.selected;

      if (selected[1] === false) {
        return;
      }

      var rtl = this.props.rtl;
      var sign = code === 37 ? rtl ? 1 : -1 : rtl ? -1 : 1;
      this.select(selected[0], this.getColIndex(selected[1], sign).index);
    }
  }, {
    key: "arrowV",
    value: function arrowV(e, code) {
      e.preventDefault();
      var selected = this.state.selected;
      var colIndex = selected[1];

      if (colIndex === false) {
        return;
      }

      var rowIndex = code === 40 ? this.getNextRowIndex() : this.getPreviousRowIndex();
      this.select(rowIndex, colIndex);
    }
  }, {
    key: "getNextRowIndex",
    value: function getNextRowIndex() {
      var selected = this.state.selected;
      var Grid = (0, _jquery.default)(this.dom.current);
      var rowIndex = selected[0] + 1;
      var Row = Grid.find("[data-row-index=".concat(rowIndex, "]"));

      if (!Row.length) {
        rowIndex = 0;
      }

      return rowIndex;
    }
  }, {
    key: "getPreviousRowIndex",
    value: function getPreviousRowIndex() {
      var selected = this.state.selected;
      var Grid = (0, _jquery.default)(this.dom.current);
      var rowIndex = selected[0] - 1;
      var Row = Grid.find("[data-row-index=".concat(rowIndex, "]"));

      if (!Row.length) {
        rowIndex = Grid.find('.grid-row').length - 1;
      }

      return rowIndex;
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
      //enter
      var dom = (0, _jquery.default)(this.dom.current);
      var selectedCell = dom.find('.grid-cell.selected');

      if (!selectedCell.length) {
        return;
      }

      var inlineEdit = selectedCell.find('.inline-edit');

      if (inlineEdit.hasClass('inline-edit-text')) {
        this.deselect();
      }
    }
  }, {
    key: "key27",
    value: function key27(e) {
      this.deselect(false);
    } //scape

  }, {
    key: "key45",
    value: function key45(e) {
      this.select(this.getNextRowIndex(), undefined);
    } //insert

  }, {
    key: "key9",
    value: function key9() {
      //tab
      var selected = this.state.selected;

      var _selected = _slicedToArray(selected, 2),
          rowIndex = _selected[0],
          colIndex = _selected[1];

      if (colIndex === false) {
        return;
      }

      var _this$getColIndex = this.getColIndex(selected[1], 1),
          index = _this$getColIndex.index,
          end = _this$getColIndex.end;

      colIndex = index;

      if (end) {
        rowIndex = this.getNextRowIndex();
      }

      this.select(rowIndex, colIndex);
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

var GridHeader = /*#__PURE__*/function (_Component5) {
  _inherits(GridHeader, _Component5);

  var _super5 = _createSuper(GridHeader);

  function GridHeader() {
    _classCallCheck(this, GridHeader);

    return _super5.apply(this, arguments);
  }

  _createClass(GridHeader, [{
    key: "getStyle",
    value: function getStyle() {
      var size = this.context.size;
      return {
        gridTemplateColumns: size //width:total + 'px',

      };
    }
  }, {
    key: "getColIndex",
    value: function getColIndex(column) {
      if (column.opened === false) {
        return;
      }

      this.colIndex++;
      return this.colIndex;
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      this.colIndex = -1;
      var _this$context = this.context,
          columns = _this$context.columns,
          checkboxColumn = _this$context.checkboxColumn,
          addColumn = _this$context.addColumn;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-header",
        style: this.getStyle()
      }, checkboxColumn && /*#__PURE__*/_react.default.createElement(GridTitle, {
        column: checkboxColumn,
        key: 'checkbox-column',
        colIndex: false,
        renderIndex: this.getColIndex(checkboxColumn)
      }), addColumn && /*#__PURE__*/_react.default.createElement(GridTitle, {
        column: addColumn,
        key: 'add-column',
        colIndex: false,
        renderIndex: this.getColIndex(addColumn)
      }), columns.map(function (column, i) {
        return /*#__PURE__*/_react.default.createElement(GridTitle, {
          column: column,
          key: i,
          colIndex: i,
          renderIndex: _this8.getColIndex(column)
        });
      }));
    }
  }]);

  return GridHeader;
}(_react.Component);

exports.GridHeader = GridHeader;

_defineProperty(GridHeader, "contextType", GridContext);

var GridTitle = /*#__PURE__*/function (_Component6) {
  _inherits(GridTitle, _Component6);

  var _super6 = _createSuper(GridTitle);

  function GridTitle(props) {
    var _this9;

    _classCallCheck(this, GridTitle);

    _this9 = _super6.call(this, props);
    _this9.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this9;
  }

  _createClass(GridTitle, [{
    key: "getStyle",
    value: function getStyle() {
      var column = this.props.column;
      return {
        height: '36px',
        lineHeight: '36px',
        minWidth: column.minWidth ? column.minWidth + 'px' : undefined
      };
    }
  }, {
    key: "dblClick",
    value: function dblClick() {
      var _this$context2 = this.context,
          columns = _this$context2.columns,
          onChange = _this$context2.onChange,
          toggleColumns = _this$context2.toggleColumns;

      if (!toggleColumns) {
        return;
      }

      var _this$props15 = this.props,
          column = _this$props15.column,
          colIndex = _this$props15.colIndex;

      if (column.opened === false || !column.width || column.width === 'auto') {
        return;
      }

      column.opened = false;
      onChange({
        columns: columns
      });
    }
  }, {
    key: "openColumn",
    value: function openColumn() {
      var _this$context3 = this.context,
          columns = _this$context3.columns,
          onChange = _this$context3.onChange;
      var _this$props16 = this.props,
          column = _this$props16.column,
          colIndex = _this$props16.colIndex;
      column.opened = true;
      columns.splice(colIndex, 1);
      var lastOpenedIndex = 0;

      for (var i = 0; i < columns.length; i++) {
        if (columns[i].opened === false) {
          break;
        }

        lastOpenedIndex++;
      }

      columns.splice(lastOpenedIndex, 0, column);
      onChange({
        columns: columns
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props17 = this.props,
          column = _this$props17.column,
          _this$props17$colInde = _this$props17.colIndex,
          colIndex = _this$props17$colInde === void 0 ? false : _this$props17$colInde,
          renderIndex = _this$props17.renderIndex;
      var _column$width = column.width,
          width = _column$width === void 0 ? 'auto' : _column$width,
          _column$resizable = column.resizable,
          resizable = _column$resizable === void 0 ? true : _column$resizable;

      if (column.opened === false) {
        return '';
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-title",
        style: this.getStyle(),
        ref: this.dom,
        title: column.title,
        onDoubleClick: this.dblClick.bind(this)
      }, /*#__PURE__*/_react.default.createElement(GridFilter, {
        column: column,
        index: colIndex
      }), colIndex !== false && /*#__PURE__*/_react.default.createElement(GridMoveHandle, {
        column: column,
        index: renderIndex,
        colIndex: colIndex
      }), colIndex !== false && /*#__PURE__*/_react.default.createElement(GridResizeHandle, {
        column: column,
        index: renderIndex,
        disabled: !resizable || column.width === 'auto' || !column.width
      }));
    }
  }]);

  return GridTitle;
}(_react.Component);

exports.GridTitle = GridTitle;

_defineProperty(GridTitle, "contextType", GridContext);

var GridMoveHandle = /*#__PURE__*/function (_Component7) {
  _inherits(GridMoveHandle, _Component7);

  var _super7 = _createSuper(GridMoveHandle);

  function GridMoveHandle() {
    _classCallCheck(this, GridMoveHandle);

    return _super7.apply(this, arguments);
  }

  _createClass(GridMoveHandle, [{
    key: "getShadow",
    value: function getShadow(e) {
      var column = this.props.column;
      var _this$so = this.so,
          width = _this$so.width,
          height = _this$so.height;

      var _getClient = (0, _functions.getClient)(e),
          x = _getClient.x,
          y = _getClient.y;

      var style = "width:".concat(width, "px;left:").concat(x - width / 2, "px;top:").concat(y - (height + 2), "px;");
      return "<div class=\"grid-title grid-title-shadow\" style=\"".concat(style, "\">").concat(column.title || '', "</div>");
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this10 = this;

      var _this$props18 = this.props,
          column = _this$props18.column,
          colIndex = _this$props18.colIndex;
      var onChange = this.context.onChange;

      if (!onChange || column.opened === false) {
        return;
      }

      if (column.className === 'grid-cell-checkbox' || column.className === 'grid-cell-add') {
        return;
      } //شرط نادیده گرفتن ستون چک باکس


      var dom = (0, _jquery.default)(e.target);
      this.so = {
        from: colIndex,
        width: dom.width(),
        height: dom.height()
      };
      (0, _jquery.default)("body").append(this.getShadow(e));
      (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
      (0, _jquery.default)('.grid-move-handle').on("mouseenter", function (e) {
        _this10.so.to = parseInt((0, _jquery.default)(e.target).attr('data-column-index'));
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$so2 = this.so,
          width = _this$so2.width,
          height = _this$so2.height,
          _getClient2 = (0, _functions.getClient)(e),
          x = _getClient2.x,
          y = _getClient2.y;

      e.preventDefault();
      (0, _jquery.default)(".grid-title-shadow").css({
        left: x - width / 2,
        top: y - (height + 2)
      });
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      var _this$context4 = this.context,
          columns = _this$context4.columns,
          onChange = _this$context4.onChange;
      (0, _functions.eventHandler)('window', 'mousemove', this.mouseMove, 'unbind');
      (0, _functions.eventHandler)('window', 'mouseup', this.mouseUp, 'unbind');
      (0, _jquery.default)('.grid-move-handle').off("mouseenter");
      (0, _jquery.default)(".grid-title-shadow").remove();
      var _this$so3 = this.so,
          from = _this$so3.from,
          to = _this$so3.to;

      if (to === undefined || from === to || columns[to].opened === false) {
        return;
      }

      var temp = columns[from];
      columns[from] = columns[to];
      columns[to] = temp;
      onChange({
        columns: columns
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      var _this$props19 = this.props,
          colIndex = _this$props19.colIndex,
          column = _this$props19.column;

      var props = _defineProperty({
        className: 'grid-move-handle',
        'data-column-index': colIndex
      }, 'ontouchstart' in document.documentElement ? 'onTouchStart' : 'onMouseDown', function (e) {
        if (e.button === 2) return;

        _this11.mouseDown(e);
      });

      return /*#__PURE__*/_react.default.createElement("div", props, column.title);
    }
  }]);

  return GridMoveHandle;
}(_react.Component);

exports.GridMoveHandle = GridMoveHandle;

_defineProperty(GridMoveHandle, "contextType", GridContext);

var GridResizeHandle = /*#__PURE__*/function (_Component8) {
  _inherits(GridResizeHandle, _Component8);

  var _super8 = _createSuper(GridResizeHandle);

  function GridResizeHandle(props) {
    var _this12;

    _classCallCheck(this, GridResizeHandle);

    _this12 = _super8.call(this, props);
    _this12.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this12;
  }

  _createClass(GridResizeHandle, [{
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$props20 = this.props,
          column = _this$props20.column,
          disabled = _this$props20.disabled;

      if (disabled) {
        return;
      }

      var _this$context5 = this.context,
          onChange = _this$context5.onChange,
          columns = _this$context5.columns;

      if (!onChange) {
        return;
      }

      var width = typeof column.width === 'function' ? column.width() : column.width;
      var dom = (0, _jquery.default)(e.target);
      var grid = dom.parents('.grid-container');
      var gridRows = grid.find('.grid-rows');
      this.startOffset = {
        minWidth: column.minWidth || 40,
        width: parseInt(width),
        //عرض ستون
        x: (0, _functions.getClient)(e).x,
        // موقعیت در راستای افق
        size: this.context.size.split(' '),
        container: grid.find(".grid-header,.grid-row"),
        gridRowsWidth: parseInt(gridRows.css('width')),
        gridRows: gridRows,
        newWidth: column.width
      };
      (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      e.preventDefault();
      var _this$context6 = this.context,
          rtl = _this$context6.rtl,
          theme = _this$context6.theme;
      var index = this.props.index;
      var so = this.startOffset;
      var offset = (so.x - (0, _functions.getClient)(e).x) * (rtl ? 1 : -1);
      var newWidth = so.width + offset;
      newWidth = newWidth < so.minWidth ? so.minWidth : newWidth;
      so.newWidth = newWidth;
      so.size[index] = newWidth + 'px';
      so.gridTemplateColumns = '';
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
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      (0, _functions.eventHandler)('window', 'mousemove', this.mouseMove, 'unbind');
      (0, _functions.eventHandler)('window', 'mouseup', this.mouseUp, 'unbind');
      var _this$context7 = this.context,
          onChange = _this$context7.onChange,
          columns = _this$context7.columns;
      var newWidth = this.startOffset.newWidth;
      var column = this.props.column;
      column.width = newWidth;
      onChange({
        columns: columns
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var disabled = this.props.disabled;

      var props = _defineProperty({
        ref: this.dom,
        className: 'resize-handle',
        style: {
          cursor: disabled ? 'not-allowed' : undefined
        }
      }, 'ontouchstart' in document.documentElement ? 'onTouchStart' : 'onMouseDown', function (e) {
        if (e.button === 2) return;

        _this13.mouseDown(e);
      });

      return /*#__PURE__*/_react.default.createElement("div", props);
    }
  }]);

  return GridResizeHandle;
}(_react.Component);

exports.GridResizeHandle = GridResizeHandle;

_defineProperty(GridResizeHandle, "contextType", GridContext);

var GridFilter = /*#__PURE__*/function (_Component9) {
  _inherits(GridFilter, _Component9);

  var _super9 = _createSuper(GridFilter);

  function GridFilter(props) {
    var _this14;

    _classCallCheck(this, GridFilter);

    _this14 = _super9.call(this, props);
    _this14.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this14;
  }

  _createClass(GridFilter, [{
    key: "getOperators",
    value: function getOperators(_ref5) {
      var type = _ref5.type,
          operators = _ref5.operators;
      var translate = this.context.translate;
      var Operators = [{
        value: 'Equal',
        translate: 'Equal'
      }, {
        value: 'Not Equal',
        translate: 'Not.Equal'
      }, {
        value: 'Contain',
        translate: 'Contain',
        type: 'string'
      }, {
        value: 'Not Contain',
        translate: 'Not.Contain',
        type: 'string'
      }, {
        value: 'Greater Than',
        translate: 'Greater.Than',
        type: 'number'
      }, {
        value: 'Less Than',
        translate: 'Less.Than',
        type: 'number'
      }, {
        value: 'Greater Equal Than',
        translate: 'Greater.Equal.Than',
        type: 'number'
      }, {
        value: 'Less Equal Than',
        translate: 'Less.Equal.Than',
        type: 'number'
      }];
      Operators = Operators.filter(function (df) {
        if (operators) {
          return operators.indexOf(df.value) !== -1;
        }

        if (!df.type) {
          return true;
        }

        return df.type === type;
      });
      this.defaultOperator = Operators[0] ? Operators[0].value : undefined;
      Operators = Operators.map(function (o, i) {
        return /*#__PURE__*/_react.default.createElement("option", {
          key: i,
          value: o.value
        }, translate(o.translate));
      });
      return Operators;
    }
  }, {
    key: "onChange",
    value: function onChange(filter) {
      var _this$context8 = this.context,
          columns = _this$context8.columns,
          onChange = _this$context8.onChange,
          onFilterChange = _this$context8.onFilterChange;
      var index = this.props.index;
      columns[index].filter = filter;
      onChange({
        columns: columns
      });

      if (onFilterChange) {
        onFilterChange((0, _functions.getAllFilters)(columns), this.context);
      }
    }
  }, {
    key: "getBoolean",
    value: function getBoolean(booleanType) {
      var _this15 = this;

      var translate = this.context.translate;
      var column = this.props.column;
      var filter = { ...column.filter
      };
      var _filter$items = filter.items,
          items = _filter$items === void 0 ? [] : _filter$items;

      if (!items[0] || items[0].value === '' || items[0].value === undefined) {
        return '';
      }

      return /*#__PURE__*/_react.default.createElement("select", {
        className: "grid-boolean-type",
        value: booleanType,
        onChange: function onChange(e) {
          var value = e.target.value;
          filter.booleanType = value;

          if (['and', 'or'].indexOf(value) === -1 && items.length === 2) {
            filter.items.pop();
          }

          _this15.onChange(filter);
        }
      }, /*#__PURE__*/_react.default.createElement("option", {
        value: ""
      }), /*#__PURE__*/_react.default.createElement("option", {
        value: "and"
      }, translate('And')), /*#__PURE__*/_react.default.createElement("option", {
        value: "or"
      }, translate('Or')));
    }
  }, {
    key: "getItem",
    value: function getItem(_ref6, index) {
      var _this16 = this;

      var operator = _ref6.operator,
          value = _ref6.value;
      var column = this.props.column;
      var filter = { ...column.filter
      };
      var template = filter.template,
          type = filter.type;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-filter-item"
      }, this.operators.length > 0 && /*#__PURE__*/_react.default.createElement("select", {
        className: "grid-filter-operator",
        defaultValue: operator,
        onChange: function onChange(e) {
          filter.items = filter.items || [];

          if (!filter.items[index]) {
            filter.items.push({
              operator: _this16.defaultOperator
            });
          }

          filter.items[index].operator = e.target.value;

          _this16.onChange(filter);
        }
      }, this.operators), !template && /*#__PURE__*/_react.default.createElement("input", {
        className: "grid-filter-value",
        type: type === 'number' ? 'number' : 'string',
        defaultValue: value,
        onChange: function onChange(e) {
          var val = e.target.value;
          clearTimeout(_this16.timeOut);
          _this16.timeOut = setTimeout(function () {
            filter.items = filter.items || [];

            if (!filter.items[index]) {
              filter.items.push({
                operator: _this16.defaultOperator
              });
            }

            filter.items[index].value = val;

            _this16.onChange(filter);
          }, 1000);
        }
      }), template && template(value, function (val) {
        filter.items = filter.items || [];

        if (!filter.items[index]) {
          filter.items.push({
            operator: _this16.defaultOperator
          });
        }

        filter.items[index].value = val;

        _this16.onChange(filter);
      }));
    }
  }, {
    key: "getPopup",
    value: function getPopup(_ref7) {
      var booleanType = _ref7.booleanType,
          type = _ref7.type,
          _ref7$items = _ref7.items,
          items = _ref7$items === void 0 ? [] : _ref7$items;
      var translate = this.context.translate;
      var firstItem = items[0] || {
        operator: this.defaultOperator
      };
      var secondItem = this.boolean ? items[1] || {
        operator: this.defaultOperator
      } : undefined;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-filter-popup",
        ref: this.dom
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-filter-body"
      }, this.getItem(firstItem, 0), this.getBoolean(booleanType), this.boolean && secondItem && this.getItem(secondItem, 1)), /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-filter-footer"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-filter-footer-button",
        onClick: this.removeItems.bind(this)
      }, translate('Clear'))));
    }
  }, {
    key: "removeItems",
    value: function removeItems() {
      var column = this.props.column,
          filter = { ...column.filter
      };
      (0, _jquery.default)(this.dom.current).find('.grid-filter-item').eq(0).find('input,select').val('');
      filter.items = [];
      filter.booleanType = 'none';
      this.onChange(filter);
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var column = this.props.column;
      var _column$filter = column.filter,
          filter = _column$filter === void 0 ? {} : _column$filter;
      var rtl = this.context.rtl;
      var type = filter.type,
          enable = filter.enable,
          booleanType = filter.booleanType,
          open = filter.open,
          items = filter.items;

      if (!enable) {
        return null;
      }

      this.operators = [];

      if (type === 'number' || type === 'string') {
        this.operators = this.getOperators(filter);
        this.boolean = booleanType === 'and' || booleanType === 'or';
      } else {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_rDropdownButton.default, {
        className: "grid-filter-button",
        iconClass: items && items.length ? 'fas fa-filter' : 'fas fa-filter',
        openRelatedTo: ".grid-container",
        open: open,
        rtl: rtl,
        items: function items() {
          return _this17.getPopup(filter);
        }
      });
    }
  }]);

  return GridFilter;
}(_react.Component);

exports.GridFilter = GridFilter;

_defineProperty(GridFilter, "contextType", GridContext);

var GridRows = /*#__PURE__*/function (_Component10) {
  _inherits(GridRows, _Component10);

  var _super10 = _createSuper(GridRows);

  function GridRows() {
    _classCallCheck(this, GridRows);

    return _super10.apply(this, arguments);
  }

  _createClass(GridRows, [{
    key: "render",
    // onGroupCheck(row,value){
    //   var {dataset} = this.props;
    //   for(var i = 0; i < row._childs.length; i++){
    //     setValueByField(row._childs[i],dataset._checked,value);
    //   }
    //   this.onChange({model:this.props.model});
    // }
    value: function render() {
      var _this$context9 = this.context,
          onGroupToggle = _this$context9.onGroupToggle,
          rows = _this$context9.rows,
          translate = _this$context9.translate;

      if (!Array.isArray(rows)) {
        return (0, _functions.getGridLoading)();
      }

      if (rows.length === 0) {
        return (0, _functions.getGridNoData)(translate('No.Data'));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-rows"
      }, rows.map(function (row) {
        return row._groupField === undefined ? /*#__PURE__*/_react.default.createElement(GridRow, {
          row: row,
          key: row._order
        }) : /*#__PURE__*/_react.default.createElement(GroupRow, _extends({}, row, {
          key: row._parentField + row._groupField,
          toggle: onGroupToggle
        }));
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-background"
      }));
    }
  }]);

  return GridRows;
}(_react.Component);

exports.GridRows = GridRows;

_defineProperty(GridRows, "contextType", GridContext);

var GridRow = /*#__PURE__*/function (_Component11) {
  _inherits(GridRow, _Component11);

  var _super11 = _createSuper(GridRow);

  function GridRow() {
    _classCallCheck(this, GridRow);

    return _super11.apply(this, arguments);
  }

  _createClass(GridRow, [{
    key: "getStyle",
    value: function getStyle() {
      var size = this.context.size;
      return {
        gridTemplateColumns: size
      };
    }
  }, {
    key: "isEnableInlineEdit",
    value: function isEnableInlineEdit(row, column) {
      var inlineEdit = column.inlineEdit;

      if (!inlineEdit) {
        return false;
      }

      var enable = typeof inlineEdit.enable === 'function' ? inlineEdit.enable(row, column) : inlineEdit.enable;
      return enable !== false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this18 = this;

      var _this$context10 = this.context,
          columns = _this$context10.columns,
          checkField = _this$context10.checkField,
          addField = _this$context10.addField,
          addColumn = _this$context10.addColumn,
          checkboxColumn = _this$context10.checkboxColumn,
          selected = _this$context10.selected;
      var row = this.props.row;
      var error = this.context.error;
      var rowSelected = row._order === selected[0];
      var errorIndexes = error !== false && error.id === row._id ? error.columns.map(function (c) {
        return parseInt(c.colIndex);
      }) : [];
      var cells = columns.map(function (column, i) {
        if (column.opened === false) {
          return '';
        }

        var cellSelected = false,
            enableInlineEdit = false;
        var errorIndex = errorIndexes.indexOf(i);
        var message = errorIndex !== -1 ? error.columns[errorIndex].message : undefined;

        if (rowSelected) {
          cellSelected = i === selected[1];
          enableInlineEdit = _this18.isEnableInlineEdit(row, column);
        }

        return /*#__PURE__*/_react.default.createElement(GridCell, {
          column: column,
          row: row,
          key: i,
          rowIndex: row._order,
          colIndex: i,
          message: message,
          rowSelected: rowSelected,
          cellSelected: cellSelected,
          inlineEdit: enableInlineEdit ? column.inlineEdit : undefined
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-row",
        style: this.getStyle(),
        "data-row-index": row._order
      }, checkField && /*#__PURE__*/_react.default.createElement(GridCell, {
        column: checkboxColumn,
        row: row,
        key: -2
      }), addField && /*#__PURE__*/_react.default.createElement(GridCell, {
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

var GroupRow = /*#__PURE__*/function (_Component12) {
  _inherits(GroupRow, _Component12);

  var _super12 = _createSuper(GroupRow);

  function GroupRow(props) {
    var _this19;

    _classCallCheck(this, GroupRow);

    _this19 = _super12.call(this, props);
    _this19.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this19;
  } // componentDidUpdate(){
  //   if(this.rowSelected){
  //     //حتما باید گرید فوکوس شود تا کیبرد از کار نیفتد
  //     if(this.dom){$(this.dom.current).focus();}
  //   }
  // }


  _createClass(GroupRow, [{
    key: "changeOpened",
    value: function changeOpened() {
      var _this$props21 = this.props,
          _groupField = _this$props21._groupField,
          _parentField = _this$props21._parentField,
          toggle = _this$props21.toggle;
      toggle(_parentField + _groupField);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var rtl = this.context.rtl;
      var groupLevel = this.props.groupLevel;
      return _defineProperty({}, 'padding' + (rtl ? 'Right' : 'Left'), groupLevel * 16);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props22 = this.props,
          index = _this$props22.index,
          _checked = _this$props22._checked,
          _groupField = _this$props22._groupField,
          opened = _this$props22.opened;
      var _this$context11 = this.context,
          checkField = _this$context11.checkField,
          group = _this$context11.group;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-group-row",
        ref: this.dom,
        "data-group-index": index,
        style: this.getStyle()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-group-row-container"
      }, checkField && group.checkable !== false && false && /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-checkbox"
      }, /*#__PURE__*/_react.default.createElement(GridCheckbox, {
        checked: _checked
      })), group.collapsible !== false && /*#__PURE__*/_react.default.createElement(GridGroupToggleIcon, {
        opened: opened,
        onChange: this.changeOpened.bind(this)
      }), /*#__PURE__*/_react.default.createElement(GridText, {
        text: _groupField
      })));
    }
  }]);

  return GroupRow;
}(_react.Component);

exports.GroupRow = GroupRow;

_defineProperty(GroupRow, "contextType", GridContext);

var GridCell = /*#__PURE__*/function (_Component13) {
  _inherits(GridCell, _Component13);

  var _super13 = _createSuper(GridCell);

  function GridCell(props) {
    var _this20;

    _classCallCheck(this, GridCell);

    _this20 = _super13.call(this, props);
    _this20.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this20;
  }

  _createClass(GridCell, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$props23 = this.props,
          column = _this$props23.column,
          row = _this$props23.row;
      var rtl = this.context.rtl;
      var style = {
        minWidth: column.minWidth ? column.minWidth + 'px' : undefined
      };

      if (column.treeMode) {
        style['padding' + (rtl ? 'Right' : 'Left')] = row._level * 12;
      }

      return style;
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _this$props24 = this.props,
          column = _this$props24.column,
          message = _this$props24.message,
          cellSelected = _this$props24.cellSelected,
          inlineEdit = _this$props24.inlineEdit;
      var className = 'grid-cell';
      className += column.treeMode ? ' grid-tree-cell' : '';
      className += column.className ? ' ' + column.className : '';
      className += cellSelected ? ' selected' : '';
      className += message ? ' hasError' : '';
      className += inlineEdit ? ' grid-cell-inline-edit' : '';
      return className;
    }
  }, {
    key: "getInlineInput",
    value: function getInlineInput() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
          _ref9$type = _ref9.type,
          type = _ref9$type === void 0 ? 'text' : _ref9$type,
          _ref9$options = _ref9.options,
          options = _ref9$options === void 0 ? [] : _ref9$options;

      var colIndex = arguments.length > 2 ? arguments[2] : undefined;
      var _this$context12 = this.context,
          rtl = _this$context12.rtl,
          getInlineChanges = _this$context12.getInlineChanges;

      if (type === 'text') {
        return /*#__PURE__*/_react.default.createElement("input", {
          "data-col-index": colIndex,
          type: "text",
          style: {
            textAlign: rtl ? 'right' : 'left',
            padding: '0 6px',
            boxSizing: 'border-box'
          },
          defaultValue: value,
          className: "inline-edit inline-edit-text",
          onChange: function onChange(e) {
            return getInlineChanges(colIndex, e.target.value);
          }
        });
      }

      if (type === 'number') {
        return /*#__PURE__*/_react.default.createElement("input", {
          "data-col-index": colIndex,
          type: "number",
          style: {
            textAlign: 'center',
            padding: '0 6px',
            boxSizing: 'border-box'
          },
          defaultValue: value,
          className: "inline-edit inline-edit-text",
          onChange: function onChange(e) {
            return getInlineChanges(colIndex, parseFloat(e.target.value));
          }
        });
      }

      if (type === 'select') {
        return /*#__PURE__*/_react.default.createElement("select", {
          "data-col-index": colIndex,
          defaultValue: value,
          className: "inline-edit inline-edit-select",
          onChange: function onChange(e) {
            return getInlineChanges(colIndex, e.target.value);
          }
        }, options.map(function (o, i) {
          return /*#__PURE__*/_react.default.createElement("option", {
            key: i,
            value: o.value
          }, o.text);
        }));
      }

      if (type === 'checkbox') {}
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(row, column, value) {
      var treeTemplate = this.context.treeTemplate;
      var _this$props25 = this.props,
          rowSelected = _this$props25.rowSelected,
          inlineEdit = _this$props25.inlineEdit,
          colIndex = _this$props25.colIndex;

      if (rowSelected && inlineEdit) {
        return this.getInlineInput(value, inlineEdit, colIndex);
      }

      if (column.treeMode) {
        return treeTemplate(value, {
          row: row,
          column: column
        }, this.context);
      }

      if (!column.template) {
        return value === undefined ? '' : value;
      }

      return column.template(value, {
        row: row,
        column: column
      }, this.context);
    }
  }, {
    key: "click",
    value: function click(e) {
      if ((0, _jquery.default)(e.target).hasClass('grid-toggle-icon')) {
        return;
      }

      var _this$context13 = this.context,
          select = _this$context13.select,
          selectable = _this$context13.selectable,
          columns = _this$context13.columns;

      if (!selectable || colIndex === false) {
        return;
      }

      var _this$props26 = this.props,
          _this$props26$rowInde = _this$props26.rowIndex,
          rowIndex = _this$props26$rowInde === void 0 ? false : _this$props26$rowInde,
          _this$props26$colInde = _this$props26.colIndex,
          colIndex = _this$props26$colInde === void 0 ? false : _this$props26$colInde;

      if (rowIndex === false || colIndex === false) {
        return;
      }

      if (columns[colIndex].selectable === false) {
        return;
      }

      select(rowIndex, colIndex);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var dom = (0, _jquery.default)(this.dom.current);

      if (this.props.cellSelected) {
        var inlineEdit = dom.find('.inline-edit'); //حتما باید یا اینپوت اینلاین یا خود گرید فوکوس شود تا کیبرد از کار نیفتد

        if (inlineEdit.length) {
          inlineEdit.focus().select();
        } else {
          dom.parents('.grid-container').focus();
        }
      }
    }
  }, {
    key: "getValue",
    value: function getValue(row, _ref10) {
      var isDefault = _ref10.isDefault,
          field = _ref10.field;

      if (field === undefined) {
        return;
      }

      var _this$context14 = this.context,
          split = _this$context14.split,
          _this$context14$dataS = _this$context14.dataSplitter,
          dataSplitter = _this$context14$dataS === void 0 ? 0 : _this$context14$dataS;
      var _split$length4 = split.length,
          splitLength = _split$length4 === void 0 ? 0 : _split$length4;

      if (isDefault) {
        return (0, _functions.getValueByField)(row, field);
      }

      return row._columnsValue[this.props.colIndex + dataSplitter * splitLength].value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props27 = this.props,
          row = _this$props27.row,
          column = _this$props27.column,
          colIndex = _this$props27.colIndex,
          message = _this$props27.message;
      var value = this.getValue(row, column);
      return /*#__PURE__*/_react.default.createElement("div", {
        title: column.template ? undefined : value,
        ref: this.dom,
        className: this.getClassName(),
        style: this.getStyle(),
        "data-col-index": colIndex,
        tabIndex: 0,
        onClick: this.click.bind(this)
      }, this.getTemplate(row, column, value), message && /*#__PURE__*/_react.default.createElement(GridCellError, {
        message: message
      }));
    }
  }]);

  return GridCell;
}(_react.Component);

exports.GridCell = GridCell;

_defineProperty(GridCell, "contextType", GridContext);

var GridCellError = /*#__PURE__*/function (_Component14) {
  _inherits(GridCellError, _Component14);

  var _super14 = _createSuper(GridCellError);

  function GridCellError() {
    _classCallCheck(this, GridCellError);

    return _super14.apply(this, arguments);
  }

  _createClass(GridCellError, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-cell-error",
        title: this.props.message
      });
    }
  }]);

  return GridCellError;
}(_react.Component);

exports.GridCellError = GridCellError;

var TreeCell = /*#__PURE__*/function (_Component15) {
  _inherits(TreeCell, _Component15);

  var _super15 = _createSuper(TreeCell);

  function TreeCell() {
    _classCallCheck(this, TreeCell);

    return _super15.apply(this, arguments);
  }

  _createClass(TreeCell, [{
    key: "render",
    value: function render() {
      var _this$props28 = this.props,
          row = _this$props28.row,
          value = _this$props28.value,
          column = _this$props28.column;
      var onChange = this.context.onChange;
      var icon = (column.icon ? column.icon(row) : false) || {};
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, onChange && /*#__PURE__*/_react.default.createElement(GridToggleIcon, {
        row: row
      }), column.icon && /*#__PURE__*/_react.default.createElement(GridIcon, {
        className: icon.className,
        color: icon.color
      }), /*#__PURE__*/_react.default.createElement(GridText, {
        text: value
      }));
    }
  }]);

  return TreeCell;
}(_react.Component);

exports.TreeCell = TreeCell;

_defineProperty(TreeCell, "contextType", GridContext);

var GridText = /*#__PURE__*/function (_Component16) {
  _inherits(GridText, _Component16);

  var _super16 = _createSuper(GridText);

  function GridText() {
    _classCallCheck(this, GridText);

    return _super16.apply(this, arguments);
  }

  _createClass(GridText, [{
    key: "render",
    value: function render() {
      var text = this.props.text;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-text"
      }, text);
    }
  }]);

  return GridText;
}(_react.Component);

exports.GridText = GridText;

var GridToggleIcon = /*#__PURE__*/function (_Component17) {
  _inherits(GridToggleIcon, _Component17);

  var _super17 = _createSuper(GridToggleIcon);

  function GridToggleIcon() {
    _classCallCheck(this, GridToggleIcon);

    return _super17.apply(this, arguments);
  }

  _createClass(GridToggleIcon, [{
    key: "getClassName",
    value: function getClassName(row) {
      if (!row) {
        return 'grid-toggle-icon opened';
      }

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
          onChange = _this$context15.onChange,
          model = _this$context15.model;
      var row = this.props.row;

      if (!row) {
        this.props.onChange();
        return;
      }

      if (!row._childs || !row._childs.length) {
        return;
      }

      row._opened = !row._opened;
      onChange({
        model: model
      });
    }
  }, {
    key: "render",
    value: function render() {
      var row = this.props.row;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.getClassName(row),
        onClick: this.click.bind(this)
      });
    }
  }]);

  return GridToggleIcon;
}(_react.Component);

exports.GridToggleIcon = GridToggleIcon;

_defineProperty(GridToggleIcon, "contextType", GridContext);

var GridGroupToggleIcon = /*#__PURE__*/function (_Component18) {
  _inherits(GridGroupToggleIcon, _Component18);

  var _super18 = _createSuper(GridGroupToggleIcon);

  function GridGroupToggleIcon() {
    _classCallCheck(this, GridGroupToggleIcon);

    return _super18.apply(this, arguments);
  }

  _createClass(GridGroupToggleIcon, [{
    key: "getClassName",
    value: function getClassName(opened) {
      var className = 'grid-toggle-icon';
      className += opened ? ' opened' : ' closed';
      return className;
    }
  }, {
    key: "click",
    value: function click() {
      var _this$props29 = this.props,
          index = _this$props29.index,
          onChange = _this$props29.onChange;
      onChange(index);
    }
  }, {
    key: "render",
    value: function render() {
      var opened = this.props.opened;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.getClassName(opened),
        onClick: this.click.bind(this)
      });
    }
  }]);

  return GridGroupToggleIcon;
}(_react.Component);

exports.GridGroupToggleIcon = GridGroupToggleIcon;

_defineProperty(GridGroupToggleIcon, "contextType", GridContext);

var GridCheckbox = /*#__PURE__*/function (_Component19) {
  _inherits(GridCheckbox, _Component19);

  var _super19 = _createSuper(GridCheckbox);

  function GridCheckbox() {
    _classCallCheck(this, GridCheckbox);

    return _super19.apply(this, arguments);
  }

  _createClass(GridCheckbox, [{
    key: "change",
    value: function change(value) {
      value = _typeof(value) === 'object' ? value.target.checked : value;
      this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props30 = this.props,
          checked = _this$props30.checked,
          disabled = _this$props30.disabled;
      return /*#__PURE__*/_react.default.createElement("input", {
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

var GridIcon = /*#__PURE__*/function (_Component20) {
  _inherits(GridIcon, _Component20);

  var _super20 = _createSuper(GridIcon);

  function GridIcon() {
    _classCallCheck(this, GridIcon);

    return _super20.apply(this, arguments);
  }

  _createClass(GridIcon, [{
    key: "render",
    value: function render() {
      var _this$props31 = this.props,
          className = _this$props31.className,
          color = _this$props31.color;
      return /*#__PURE__*/_react.default.createElement("div", {
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