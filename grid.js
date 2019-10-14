import React,{Component,createRef,createContext,Fragment} from 'react';
import './index.css';
import $ from 'jquery';
var GridContext = createContext();
export default class Grid extends Component{
  constructor(props){
    super(props);
    this.state = {
      model:this.getModel(this.props.model),
      columns:this.getColumns(this.props.columns),
      prevModel:this.props.model,
      prevColumns:this.props.columns,
      getModel:this.getModel.bind(this),
      getColumns:this.getColumns.bind(this)
    }
  }
  getCheckboxColumn(){
    var {checkField,dataset} = this.props;
    if(!checkField){return [];}

    return [{
      width:30,resizable:false,movable:false,cellsClassName:'grid-cell-checkbox',field:dataset._checked,
      template:(value,{row,column},context)=>{
        var {onchange,dataset,model,setValueByDataset} = context;
        var a = (<GridCheckbox checked={value || false} disabled={checkField.disabled(row)} 
          onchange={(e)=>{
              setValueByDataset(row,e.target.checked,dataset._checked)
              onchange({model});
          }}
        />);
        return a;
      }
    }]
  }

  static getDerivedStateFromProps(props, state) {
    const prevModel = state.prevModel;
    const prevColumns = state.prevColumns;
    var isPropsChanged = false;
    var changeObject = {};
    if(JSON.stringify(prevModel) !== JSON.stringify(props.model)){
      isPropsChanged = true;
      changeObject.model = props.model;
      changeObject.prevModel = props.model;
    }
    if(JSON.stringify(prevColumns) !== JSON.stringify(props.columns)){
      isPropsChanged = true;
      changeObject.columns = props.columns;
      changeObject.prevColumns = props.columns;
    }
    if(isPropsChanged){
      return changeObject;
    }
    return null;
  }
  getRowsByParent(model,parentKey,parentValue,result){
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      if(row[parentKey] === parentValue){
        result.push(row);
        model.splice(i,1);
        i--;
      }
    }
    return {result,model};
  }
  convertModel(model,dataset){
    var convertModelRecursive = (model,parent,result)=>{
      var a = this.getRowsByParent(model,dataset._parent,parent,result);
      for(var i = 0; i < a.result.length; i++){
        var row = a.result[i];
        row[dataset._childs] = row[dataset._childs] || [];
        convertModelRecursive(a.model,row[dataset._id],row[dataset._childs]);
      }
    }
    var convertedModel = [];
    convertModelRecursive(model,undefined,convertedModel);
    return convertedModel;
  }
  getValue(row,field){
    if(!field){return undefined;}
    var fields = Array.isArray(field)?field[row._level]:field;
    fields = fields.split('.');
    var value = row[fields[0]];
    if(value === undefined){return undefined;}
    for(var i = 1; i < fields.length; i++){
      value = value[fields[i]];
      if(value === undefined){return undefined;}
    }
    return value;
  }
  getSize(){
    var {columns} = this.state;
    var {borderWidth} = this.getTheme();
    var total = 0;
    var size = columns.map((column)=>{
      total += column.width;
      return column.width?column.width + 'px':'auto'
    });
    return {size:size.join(' '),total:total + ((columns.length + 1) * (borderWidth))};
  }
  getStyle(){
    var {borderColor} = this.getTheme();
    var {style} = this.props;
    return $.extend({},{
      background:borderColor,
      borderColor:borderColor
    },style);
  }
  getColumns(columns){
    var {groupField,treeField} = this.props;
    var checkboxColumn = this.getCheckboxColumn();
    var cols = checkboxColumn.concat(columns).filter((column,i)=>{
      if(this.compaire(column.field,treeField)){
        column.template = (value,{row,column},context)=>{
          return <TreeCell row={row} column={column} value={value}/>
        }
        column.cellsClassName = 'grid-cell-tree';
      }
      if(!groupField){return true;}
      return !this.compaire(column.field,groupField)
    });
    return cols;
  }
  getColumn(obj,columns = this.props.columns){
    for(var i =0; i < columns.length; i++){
      var column = columns[i];
      for(var prop in obj){
        if(!this.compaire(column[prop],obj[prop])){continue;}
        return column;
      }
    }
    return false;
  }
  getValueByDataset(obj,prop){
    if(obj[prop] !== undefined){return obj[prop];}
    var {dataset} = this.props;
    var datasetprop = Array.isArray(dataset[prop])?dataset[prop][obj._level]:dataset[prop];
    return obj[datasetprop];
  }
  setValueByDataset(row,value,prop){
    var fields = prop.split('.');
    var node = row;
    for(var i = 0; i < fields.length - 1; i++){
      node = node[fields[i]]; 
    }
    node[fields[fields.length - 1]] = value;
  }
  getModel(model,columns = this.props.columns){
    var {groupField,dataType,dataset} = this.props;
    model = JSON.parse(JSON.stringify(model));
    if(dataType === 'flat'){model = this.convertModel(model,dataset)}
    if(!groupField){return model;}
    var groupColumn = this.getColumn({field:groupField},columns);
    if(!groupColumn){console.error(`A column with field equal to groupField not found!!!`); return model;}
    var g = {};
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      var groupValue = this.getValue(row,groupField);
      if(groupValue === undefined){continue;}
      g[groupValue] = g[groupValue] || {_childs:[]};
      g[groupValue]._groupName = groupColumn.title + ':' + groupValue; 
      g[groupValue]._opened = true;
      g[groupValue]._childs.push(row);
    }
    var groupedModel = [];
    var j = 0;
    for(var prop in g){
      groupedModel.push(g[prop]);
    }
    return groupedModel;
  }
  getTheme(){
    return $.extend({},{borderColor:'#ddd',borderWidth:1,cellBackground:'#fff',headerBackground:'#eee',rowHeight:30,},this.props.theme);
  }
  compaire(a,b){
    return JSON.stringify(a) === JSON.stringify(b);
  }
  onchange(obj){
    this.setState(obj);
    if(this.props.onchange){this.props.onchange(obj)}
  }
  render(){
    var {dataset,groupField,rtl} = this.props;
    var {model,columns} = this.state;
    if(!columns || !model || !columns.length || !model.length){return '';}     
    var {size,total} = this.getSize();
    var contextValue = {...this.props};
    contextValue = $.extend({},contextValue,{
      model,columns,
      onchange:this.onchange.bind(this),
      originalModel:this.props.model,
      originalColumns:this.props.columns,
      theme:this.getTheme(),
      size,
      total,
      getValueByDataset:this.getValueByDataset.bind(this),
      setValueByDataset:this.setValueByDataset.bind(this),
      getColumn:this.getColumn.bind(this),
      getValue:this.getValue.bind(this),
      compaire:this.compaire.bind(this),
      onGroupCheck:(row,value,context)=>{
        for(var i = 0; i < row._childs.length; i++){
          this.setValueByDataset(row._childs[i],value,dataset._checked);
        }
        this.onchange({model:this.state.model});
      },
    });  
    return(
      <GridContext.Provider value={contextValue}>
        <div className={`grid${rtl?' rtl':''}`} style={this.getStyle()}>
          <GridHeader />
          <GridRows />
        </div>
      </GridContext.Provider>
    );
  }
}
Grid.defaultProps = {
  theme:{},dataType:'composite'
}

class GridHeader extends Component{
  static contextType = GridContext;
  getStyle(){
    var {size,theme,total} = this.context;
    return {
      gridTemplateColumns:size,
      gridColumnGap:(theme.borderWidth) + 'px',
      padding:(theme.borderWidth || 1) + 'px',
      width:total + 'px'
    }
  }

  render(){
    var {checkField,columns} = this.context;
    var titles = columns.map((column,i)=>{
      return <GridTitle column={column} key={i} index={i}/>
    });
    return(<div className="grid-header" style={this.getStyle()}>{titles}</div>);
  }
}

class GridTitle extends Component{
  static contextType = GridContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }

  getStyle(){
    var {theme} = this.context;
    var {column} = this.props;
    return {
      background:theme.headerBackground,
      height:theme.rowHeight + 'px',
      lineHeight:theme.rowHeight + 'px',
      boxShadow:`0 0 0 ${theme.borderWidth || 1}px ${theme.borderColor}`,
      minWidth:column.minWidth?column.minWidth + 'px':undefined,
    }
  }

  moveDown(column,e){
    if (e.button === 2  ) return;
    if(column.cellsClassName === 'grid-cell-checkbox'){return;}//شرط نادیده گرفتن ستون چک باکس
    var dom = $(e.target);
    this.startOffset = {from:parseInt(dom.attr('data-column-index')),width:dom.width(),height:dom.height()};
    $("body").append(this.getShadow(column,e));
    $(window).on("mousemove",this.moveMove);
    $(window).on("mouseup",this.moveUp);
    $('.move-handle').on("mouseenter",(e)=>{
      this.startOffset.to = parseInt($(e.target).attr('data-column-index'));
    });
  }

  getShadow(column,e){
    var {headerBackground,borderColor} = this.context.theme;
    var {width,height} = this.startOffset;
    var style = `width:${width}px;left:${e.clientX - width / 2}px;top:${e.clientY - (height + 2)}px;background:${headerBackground};border:1px solid ${borderColor};z-index:100;font-size:11px;`;
    return ` 
    <div class="grid-title grid-title-shadow" style="${style}">
      ${column.title}
    </div>`;
  }

  moveMove = e  =>{
    const {width,height} = this.startOffset;
    e.preventDefault();
    $(".grid-title-shadow").css({left:e.clientX - width / 2,top:e.clientY - (height + 2)});
  }

  moveUp = e =>{
    $(window).off("mousemove",this.moveMove);
    $(window).off("mouseup",this.moveUp);
    $('.move-handle').off("mouseenter");
    $(".grid-title-shadow").remove();
    var so = this.startOffset;
    if(so.to !== 0 && !so.to){return;}
    if(so.from === so.to){return};
    var {columns,onchange} = this.context;
    const temp = columns[so.from];
    columns[so.from] = columns[so.to];
    columns[so.to] = temp;
    onchange({columns});
  }

  resizeDown(column,e){
    if(column.width === 'auto' || !column.width || column.resizable === false){return;}
    var dom = $(e.target);
    var grid = dom.parents('.grid');
    var gridRows = grid.find('.grid-rows');
    this.startOffset = {
        column,
        index:parseInt(dom.attr('data-column-index')),
        minWidth:column.minWidth || 40,
        width: parseInt(column.width),//عرض ستون
        x: e.clientX, // موقعیت در راستای افق
        size:(this.context.size).split(' ').map((a)=>{return a === 'auto'?'auto':parseInt(a)}),
        container:grid.find(".grid-header,.grid-row"),
        gridRowsWidth:parseInt(gridRows.css('width')),
        gridRows
    }
    $(window).on("mousemove",this.resizeMove);
    $(window).on("mouseup",this.resizeUp);
  }

  resizeUp = (e)=>{
    $(window).off("mousemove",this.resizeMouseMove);
    $(window).off("mouseup",this.resizeMouseUp);const {onchange,columns} = this.context;
    var {column,newWidth} = this.startOffset;
    column.width = newWidth;
    onchange({columns});
  }

  resizeMove = e =>{
    e.preventDefault();
    var {rtl} = this.context;
    var so = this.startOffset;
    var offset = (so.x - e.clientX) * (rtl ? 1 : -1);
    var newWidth = so.width + offset;
    newWidth = newWidth < so.minWidth ?so.minWidth:newWidth;
    so.newWidth = newWidth;
    so.size[so.index] = newWidth;
    so.gridTemplateColumns = '';
    var {theme} = this.context;
    var total = theme.borderWidth;
    for(var i = 0; i < so.size.length; i++){
      var size = so.size[i];
      total += size + theme.borderWidth;
      so.gridTemplateColumns += size === 'auto'?'auto ':size + 'px ';
    }
    so.container.css({gridTemplateColumns:so.gridTemplateColumns});
    so.gridRows.css('width',total)
    
  }

  toggleSetting(column,e){
    $(this.dom.current).find('.column-popup').toggle();
  }

  render(){
    var {column,index} = this.props;
    var {options = []} = column;
    var {borderColor,cellBackground} = this.context.theme;
    var Options = options.map((option,i)=>{
      return (
        <li key={i} className={`column-option${option.checked?' checked':''}`} onClick={()=>{option.callback(column)}} data-value={option.value}>
          {option.text}
        </li>
      )
    });
    return(
      <div className="grid-title" style={this.getStyle()} ref={this.dom}>
        <div className='move-handle' data-column-index={index} onMouseDown={(e)=>{this.moveDown(column,e)}}>{column.title}</div>
        <div className='resize-handle' data-column-index={index} onMouseDown={(e)=>{this.resizeDown(column,e)}}></div>
        {
          Options.length > 0 && 
          <Fragment>
          <div className='column-setting' data-column-index={index} onMouseDown={(e)=>{this.toggleSetting(column,e)}}></div>
          <ul className='column-popup' style={{background:cellBackground,borderColor:borderColor}}>
            <li className='backdrop' onMouseDown={this.toggleSetting.bind(this)}></li>
            {Options}
          </ul>
          </Fragment>
        }
      </div>
    );
  }
}

class GridRows extends Component{
  static contextType = GridContext;
  getRows(){
    var {model,groupField} = this.context;
    this.rows = [];
    this._order = 0;
    this.getRowsRecursive(model,groupField?-1:0);
    return this.rows;
  }
  getRowsRecursive(model,level){
    var {getValueByDataset} = this.context;
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      row._order = this._order;
      row._inorder = i;
      row._level = level;
      row._opened = row._opened === undefined?true:row._opened;
      row._childs = getValueByDataset(row,'_childs');
      var props = {row,key:row._order,isFirst:row._order === 0};
      this.rows.push(
        row._groupName !== undefined?
        <GroupRow {...props}/>:
        <GridRow {...props}/>
      )
      this._order++;
      var childs = row._childs;
      if(childs && childs.length && row._opened !== false){
        this.getRowsRecursive(childs,level + 1);
      }
    }
  }
  getStyle(){
    var {theme,total} = this.context;
    return {
      background:theme.borderColor,
      padding:(theme.borderWidth || 1) + 'px',
      paddingTop:0,
      width:(total + (theme.borderWidth === 0?2:0)) + 'px',
      boxSizing:'border-box'
    }
  }
  render(){
    var rows = this.getRows();
    return(
      <ul className="grid-rows" style={this.getStyle()}>
        {rows}
      </ul>
    );
  }
}

class GridRow extends Component{
  static contextType = GridContext;
  getStyle(){
    var {size,theme} = this.context;
    var {isFirst} = this.props;
    return {
      gridTemplateColumns:size,
      gridColumnGap:theme.borderWidth,
      marginTop:isFirst?0:theme.borderWidth || 1
    };
  }
  render(){
    var {columns,checkField} = this.context;
    var {row} = this.props;
    var cells = columns.map((column,i)=>{
      return <GridCell column={column} row={row} key={i}/> 
    })
    return(
      <li className="grid-row" style={this.getStyle()}>
        {cells}
      </li>
    );
  }
}

class GroupRow extends Component{
  static contextType = GridContext;
  getStyle(){
    var {theme} = this.context;
    var {isFirst} = this.props;
    return {
      background:theme.cellBackground,
      marginTop:isFirst?0:theme.borderWidth || 1,
      height:'24px',
      lineHeight:'24px',
    }
  }
  render(){
    var {row} = this.props;
    var {checkField,onGroupCheck} = this.context;
    return(
      <li className="grid-group-row" style={this.getStyle()}>
          {row._childs && row._childs.length &&<GridToggleIcon row={row}/>}
          {
            checkField &&
            <div className='grid-checkbox'>
              <GridCheckbox checked={row._checked} onchange={(e)=>{onGroupCheck(row,e.target.checked,this.context)}}/>
            </div>
          }
          <GridText text={row._groupName}/>
        
      </li>
    );
  }
}

class GridCell extends Component{
  static contextType = GridContext;
  
  getStyle(){
    var {theme} = this.context;
    var {column} = this.props;
    return {
      background:theme.cellBackground,
      lineHeight:theme.rowHeight + 'px',
      height:theme.rowHeight + 'px',
      minWidth:column.minWidth?column.minWidth + 'px':undefined
    }
  }
  getClassName(){
    var {column} = this.props;
    return `grid-cell${column.cellsClassName?' ' + column.cellsClassName:' grid-cell-text'}`;
  }
  getTemplate(row,column){
    var {getValue} = this.context; 
    var value = getValue(row,column.field);
    if(!column.template){return value === undefined?'':value;}
    else {return column.template(value,{row,column},this.context)}
  }
  render(){
    var {row,column} = this.props;
    return(
      <div className={this.getClassName()} style={this.getStyle()}>
        {this.getTemplate(row,column)}
      </div>
    );
  }
}

class TreeCell extends Component{
  static contextType = GridContext;
  getStyle(){
    var {rtl} = this.context;
    var {row} = this.props;
    return {
      ['padding' + (rtl?'Right':'Left')]:row._level * 12
    }
  }
  render(){
    var {row,value} = this.props;
    return(
      <div className='grid-tree-cell' style={this.getStyle()}>
        <GridToggleIcon row={row}/>
        <GridText text={value}/>
      </div>
    );
  }
}

class GridText extends Component{
  render(){
    var {text} = this.props;
    return (
      <div className='grid-text'>{text}</div>
    );
  }
}

class GridToggleIcon extends Component{
  static contextType = GridContext;
  getClassName(row){
    var hasChild = row._childs && row._childs.length;
    var className = 'grid-toggle-icon';
    if(!hasChild){return className;}
    className += row._opened?' opened':' closed';
    return className;
  }
  click(){
    var {onchange,model} = this.context;
    var {row} = this.props;
    if(!row._childs || !row._childs.length){return;}
    row._opened = !row._opened;
    onchange({model});
  }
  render(){
    var {row} = this.props;
    return (
      <div className={this.getClassName(row)} onClick={this.click.bind(this)}></div>
    );
  }
}

class GridCheckbox extends Component{
  change(e){
    this.props.onchange(e);
  }
  render(){
    var {checked,disabled} = this.props;
    return (
        <input type='checkbox' onChange={this.change.bind(this)} checked={checked} disabled={disabled}/>
    );
  }
}