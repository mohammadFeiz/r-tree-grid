import React,{Component,createRef,createContext} from 'react';
import './index.css';
import $ from 'jquery';
var GridContext = createContext();
export default class Grid extends Component{
  constructor(props){
    super(props);
    this.state = {}
    this.groupsOpen = [];
  }
  static getDerivedStateFromProps(props, state) {
    var s = {model: props.model}
    return s;
  }
  setGroupsOpen(model){if(this.props.groupField){this.groupsOpen = model.map((m)=>{return m._opened;})}}
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
    var {groupField,columns,checkField} = this.props;
    var size = columns.filter((column)=>{
      if(!groupField){return true;} 
      return !this.compaireFields(column.field,groupField)
    }).map((column)=>{
      return column.width?column.width + 'px':'auto'
    });
    if(checkField){size = ['30px'].concat(size)}
    return size.join(' ');
  }
  getTotal(){
    var {borderWidth} = this.getTheme(),{groupField,checkField} = this.props;
    var columns = this.props.columns.filter((column)=>{return !this.compaireFields(column.field,groupField)});
    var length = columns.length,columnsWidth = 0;
    for(var i = 0; i < length; i++){
      columnsWidth += columns[i].width;
    }
    var bordersWidth = (length + 1 + (checkField?1:0)) * (borderWidth);
    return bordersWidth + columnsWidth + (checkField?30:0);
  }
  getStyle(){
    var {borderColor} = this.getTheme();
    var {style} = this.props;
    return $.extend({},{
      background:borderColor,
      borderColor:borderColor
    },style);
  }
  getColumn(obj,columns = this.props.columns){
    for(var i =0; i < columns.length; i++){
      var column = columns[i];
      for(var prop in obj){
        if(!this.compaireFields(column[prop],obj[prop])){continue;}
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
    var {groupField} = this.props;
    if(!groupField){return model;}
    var column = this.getColumn({field:groupField},columns);
    if(!column){console.error(`A column with field equal to groupField not found!!!`); return model;}
    var g = {};
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      var field = this.getValue(row,groupField);
      if(field === ''){continue;}
      g[field] = g[field] || {_childs:[]};
      g[field]._groupName = column.title + ':' + field; 
      g[field]._childs.push(row);
    }
    var result = [];
    var j = 0;
    for(var prop in g){
      g[prop]._opened = this.groupsOpen[j]===undefined?true:this.groupsOpen[j];
      j++;
      result.push(g[prop]);
    }
    return result
  }
  getTheme(){
    return $.extend({},{borderColor:'#ddd',borderWidth:1,cellBackground:'#fff',headerBackground:'#eee',rowHeight:30,},this.props.theme);
  }
  compaireFields(a,b){
    if(Array.isArray(a)){
      if(!Array.isArray(b)){return false}
      if(b.length !== a.length){return false;}
      for(var i = 0; i < b.length; i++){
        if(b[i] !== a[i]){return false;}
      }
      return true;
    }
    else{
      return a === b;
    }
  }
  render(){
    var {dataset,groupField,rtl,onchange} = this.props;
    var {columns} = this.props;
    var {model} = this.state;
    if(!columns || !model || !columns.length || !model.length){return '';}     
    var contextValue = {...this.props};
    contextValue = $.extend({},contextValue,{
      theme:this.getTheme(),
      model:this.getModel(model),
      originalModel:model,
      originalColumns:columns,
      columns:columns.filter((column,i)=>{
        column.order = i; 
        if(!groupField){return true;}
        return !this.compaireFields(column.field,groupField)
      }),
      size:this.getSize(),
      total:this.getTotal(),
      getValueByDataset:this.getValueByDataset.bind(this),
      getModel:this.getModel.bind(this),
      getColumn:this.getColumn.bind(this),
      getValue:this.getValue.bind(this),
      compaireFields:this.compaireFields.bind(this),
      onToggle:(model)=>{
        this.setGroupsOpen(model);
        this.setState({model})
      },
      onCheck:(row,value,context)=>{
        this.setValueByDataset(row,value,dataset._checked)
        onchange({model:this.state.model},context);
      },
      onGroupCheck:(row,value,context)=>{
        for(var i = 0; i < row._childs.length; i++){
          this.setValueByDataset(row._childs[i],value,dataset._checked);
        }
        onchange({model:this.state.model},context);
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
    var {checkField} = this.context;
    var columns = (checkField?[{width:30,resizable:false}]:[]).concat(this.context.columns);
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
    if(column.order === undefined){return;}
    var dom = $(e.target);
    this.startOffset = {from:column.order,width:dom.width(),height:dom.height()};
    $("body").append(this.getShadow(column.title,e));
    $(window).on("mousemove",this.moveMove);
    $(window).on("mouseup",this.moveUp);
    $('.move-handle').on("mouseenter",(e)=>{
      this.startOffset.to = parseInt($(e.target).attr('data-index'));
    });
  }
  getShadow(title,e){
    var {headerBackground,borderColor} = this.context.theme;
    var {width,height} = this.startOffset;
    var style = `width:${width}px;left:${e.clientX - width / 2}px;top:${e.clientY - (height + 2)}px;background:${headerBackground};border:1px solid ${borderColor};z-index:100;font-size:11px;`;
    return ` 
    <div class="grid-title grid-title-shadow" style="${style}">
      ${title}
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
    var {originalColumns:columns,onchange} = this.context;
    if(so.from === so.to){return};
    const temp = columns[so.from];
    columns[so.from] = columns[so.to];
    columns[so.to] = temp;
    onchange({columns},this.context)
  }
  resizeDown(column,e){
    if(column.width === 'auto' || !column.width || column.resizable === false){return;}
    var dom = $(e.target);
    var grid = dom.parents('.grid');
    var gridRows = grid.find('.grid-rows');
    this.startOffset = {
        column,
        index:parseInt(dom.attr('data-index')),
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
    const {onchange,originalColumns} = this.context;
    var {column,newWidth} = this.startOffset;
    column.width = newWidth;
    onchange({columns:originalColumns},this.context);
    $(window).off("mousemove",this.resizeMouseMove);
    $(window).off("mouseup",this.resizeMouseUp);
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
  setGroup(){

  }

  render(){
    var {column,index} = this.props;
    var {options = []} = column;
    var Options = options.map((option)=>{
      return (
        <li className={`column-option${option.checked?' checked':''}`} onClick={option.callback} data-value={option.value}>
          {option.text}
        </li>
      )
    });
    return(
      <div className="grid-title" style={this.getStyle()} ref={this.dom}>
        <div className='move-handle' data-index={column.order} onMouseDown={(e)=>{this.moveDown(column,e)}}>{column.title}</div>
        <div className='resize-handle' data-index={index} onMouseDown={(e)=>{this.resizeDown(column,e)}}></div>
        <div className='column-setting' data-index={index} onMouseDown={(e)=>{this.toggleSetting(column,e)}}></div>
        {Options.length > 0 && <ul className='column-popup'>
          <li className='backdrop' onMouseDown={this.toggleSetting.bind(this)}></li>
          <li className='active' onMouseDown={this.setGroup.bind(this)}>
            {'Group'}
          </li>
        </ul>}
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
      row._level = level;
      row._opened = row._opened === undefined?true:row._opened;
      row._childs = getValueByDataset(row,'_childs');
      var props = {row,key:row._order,isFirst:row._order === 0};
      this.rows.push(row._groupName !== undefined?<GroupRow {...props}/>:<GridRow {...props}/>)
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
    var cells = checkField?[<GridCell column='checkbox' row={row} key='checkbox'/>]:[];
    cells = cells.concat(columns.map((column,i)=>{
      return <GridCell column={column} row={row} key={i}/> 
    }))
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
    var {treeField,compaireFields} = this.context;
    var {column} = this.props;
    if(column === 'checkbox'){return 'grid-cell grid-cell-checkbox';}
    if(compaireFields(column.field,treeField)){return 'grid-cell grid-cell-tree';}
    return `grid-cell${column.cellsClassName?' ' + column.cellsClassName:' grid-cell-text'}`;
  }
  getTemplate(row,column){
    var {treeField,checkField,onCheck,dataset,getValue,compaireFields} = this.context;    
    if(column === 'checkbox'){
      return <GridCheckbox disabled={checkField.disabled(row)} checked={row[dataset._checked] || false} onchange={(e)=>{onCheck(row,e.target.checked,this.context)}}/>
    }
    if(compaireFields(column.field,treeField)){
      return <TreeCell row={row} column={column} value={getValue(row,column.field)}/>
    }
    var value = getValue(row,column.field);
    if(!column.template){
      return value === undefined?'':value;
    }
    else {
      return column.template(value,{row,column},this.context)
    }
    
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
    var {onToggle,model} = this.context;
    var {row} = this.props;
    if(!row._childs || !row._childs.length){return;}
    row._opened = !row._opened;
    onToggle(model);
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