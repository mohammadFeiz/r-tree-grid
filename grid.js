import React,{Component,createRef,createContext,Fragment} from 'react';
import './index.css';
import $ from 'jquery';
import RActions from 'r-actions';
var {convertFlatToComposite,getValueByField,searchComposite,setValueByField} = new RActions();
var GridContext = createContext();
export default class Grid extends Component{
  constructor(props){
    super(props);
    this.dom =createRef();
    this.groupsOpen = {};
    this.splitPosition = this.props.splitPosition;
    this.theme = this.getTheme(this.props.theme);
  }
  getTheme(theme){
    return $.extend({},{background:'#fff',borderColor:'#ddd',borderWidth:1,cellBackground:'#fff',headerBackground:'#eee',rowHeight:30,},theme);
  }
  changeGroupsOpen(index){
    this.groupsOpen['g' + index] = !this.groupsOpen['g' + index];
    this.props.onchange({model:this.props.model});
  }
  getModel(model,dataType){
    var {group = {},dataset = {}} = this.props;
    if(dataType === 'flat'){
      model = convertFlatToComposite(model,dataset._id,dataset._parent)
    }
    if(!group.field){return model;}
    var g = {};
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      var groupValue = getValueByField(row,group.field);
      if(groupValue === undefined){continue;}
      g[groupValue] = g[groupValue] || {_childs:[]};
      g[groupValue]._groupName = group.title?group.title + ':' + groupValue:''; 
      g[groupValue]._childs.push(row);
    }
    var groupedModel = [];
    var j = 0;
    for(var prop in g){
      this.groupsOpen['g' + j] = this.groupsOpen['g' + j] === undefined?true:this.groupsOpen['g' + j];
      g[prop]._opened = this.groupsOpen['g' + j];
      g[prop].groupIndex = j;
      groupedModel.push(g[prop]);
      j++;
    }
    return groupedModel;
  }
  mouseDown(e){
    this.startOffset = {x:e.clientX,size:this.splitPosition};
    $(window).bind('mousemove',$.proxy(this.mouseMove,this))
    $(window).bind('mouseup',$.proxy(this.mouseUp,this))
  }
  mouseMove(e){
    var {rtl} = this.props;
    var so = this.startOffset;
    var pos =(so.x - e.clientX) * (rtl?1:-1) + so.size;
    this.splitPosition = pos;
    var container = $(this.dom.current);
    var splitter = container.find('.grid-splitter');
    var grids = container.find('.grid-container');
    grids.eq(0).css({
      width: `calc(${pos + 'px'} - 5px)`,
    })
    grids.eq(1).css({
      width:`calc(100% - ${pos + 'px'})`,
      [rtl?'right':'left']:pos + 'px'
    })
    splitter.css({
      [rtl?'right':'left']:`calc(${pos + 'px'} - 5px)`
    });
  }
  componentDidMount(){
    if(this.props.split){
      $(this.dom.current).find('.grid-container').on('mouseenter',(e)=>{
        this.index = parseInt($(e.currentTarget).attr('data-splitter'));
        this.otherIndex = this.index === 0?1:0;
        var grids = $(this.dom.current).find('.grid-container');
        grids.off('scroll');
        grids.eq(this.index).on('scroll',()=>{
          var scrollTop = grids.eq(this.index).scrollTop();
          grids.eq(this.otherIndex).scrollTop(scrollTop);
        });
      });
    }
  }
  onchange(obj,props){
    var {columns,split} = this.props;
    if(props.dataSplitter === 0 && obj.columns){
      obj.columns = obj.columns.concat(columns.slice(split,columns.length)) 
    }
    else if(props.dataSplitter === 1 && obj.columns){
      obj.columns = columns.slice(0,split).concat(obj.columns)
    }
    this.props.onchange(obj,props)
  }
  mouseUp(){
    $(window).unbind('mousemove',this.mouseMove)
    $(window).unbind('mouseup',this.mouseUp)
  }
  render(){
    var {split,rtl,group,dataType,columns,splitPosition,className,model,style} = this.props;
    var props = {
      dataType,
      onchange:this.onchange.bind(this),
      convertedModel:this.getModel(model,dataType),
      changeGroupsOpen:this.changeGroupsOpen.bind(this),
      theme:this.theme,
      style:undefined
    }
    return(
      <div className={`grid${className?' ' + className:''}`} ref={this.dom} style={style}>
      {!split && <GridContainer {...this.props} {...props}/>}
      {
        split &&
        <Fragment>
        <GridContainer {...this.props} {...props}
          columns={columns.slice(0,split)} 
          dataSplitter={0}
          style={{
            width: `calc(${splitPosition + 'px'} - 5px)`,
            [rtl?'right':'left']:0
          }}
        />
        <div className = 'grid-splitter'
        style={{
          width:'5px',height:'100%',position:'absolute',
          [rtl?'right':'left']:`calc(${splitPosition + 'px'} - 5px)`,background:this.theme.borderColor,cursor:'col-resize'
        }}
        onMouseDown={this.mouseDown.bind(this)}
        ></div>
        <GridContainer {...this.props} {...props} 
          columns={columns.slice(split,columns.length)} 
          dataSplitter={1}
          style={{
            width:`calc(100% - ${splitPosition + 'px'})`,
            [rtl?'right':'left']:splitPosition + 'px'
          }}
          checkField={false}
          group={group?{field:group.field,title:group.title,collapsible:false}:false}
        />
        </Fragment>
      }
      </div>
    );
  }
}
Grid.defaultProps = {
  splitPosition:200
}
export class GridContainer extends Component{
  constructor(props){
    super(props);
    this.dom = createRef();
    this.treeTemplate = (value,{row,column},context)=>{
      return <TreeCell row={row} column={column} value={value}/>
    }
    for(var prop in this.props.keyboard){
      this[prop] = this.props.keyboard[prop];
    } 
    this.selected = this.props.selectable?[0,0]:undefined;
    this.actived = undefined;
  }
  getInlineInput(value = '',rowIndex,colIndex){
    return `<input type="text" value="${value}" class='inline-edit inline-edit-text' data-row-index="${rowIndex}" data-col-index="${colIndex}">`;
  }
  setActived(rowIndex,colIndex){
    var {columns} = this.props;
    var Grid = $(this.dom.current),Rows = Grid.find('.grid-row');
    var Row = Rows.filter(`[data-row-index=${rowIndex}]`); // ردیفی که باید اکتیو شود را پیدا کن
    if(Row.hasClass('actived')){this.deactiveAll(); return;}//اگر ردیف اکتیو بود دی اکتیو را اجرا کن و ادامه نده
    var row = searchComposite(this.props.convertedModel,{_order:rowIndex},'_childs'); // آبجکت مربوط به ردیف را پیدا کن
    
    //ردیف را اکتیو کن
    Row.addClass('actived');
    this.actived = [rowIndex,colIndex]; 
    
    for(var i = 0; i < columns.length; i++){ // به ازای تمام ستون ها 
      var column = columns[i];
      if(!column.inlineEdit){continue;} // ستون هایی که قابلیت اینلاین ادیت دارند را پیدا کن
      if(typeof column.inlineEdit === 'function' && !column.inlineEdit(row,column)){continue;}
      var Cell = Row.find(`.grid-cell[data-col-index=${i}]`); //سلول مربوط به ردیف و ستون را پیدا کن
      var value = getValueByField(row,column.field);// مقدار سلول را پیدا کن
      var input = $(this.getInlineInput(value,rowIndex,i));// اینپوت با مقدار سلول را بساز
      Cell.append(input); // اینپوت را در سلول قرار بده
      if(colIndex === i){ // اگر سلول اکتیو بود آن را هایلایت کن
        input.select();
      }
    }
  }
  async deactiveAll(save = true){
    if(!this.actived){return;}
    
    var {columns,convertedModel,saveInlineEdit,model,onchange} = this.props;
    var rowIndex = this.actived[0];
    var Grid = $(this.dom.current);
    var Rows = Grid.find('.grid-row');
    
    //المان مربوط به ردیف اکتیو را پیدا کن
    //آبجکت مربوط به ردیف اکتیو را پیدا کن
    //همه ی اینپوت های ردیف اکتیو را بگیر
    var Row = Rows.filter(`[data-row-index=${rowIndex}]`);
    var row = searchComposite(convertedModel,{_order:rowIndex},'_childs');
    var inlineInputs = Row.find('.inline-edit');
    
    //اکتیو را آپدیت کن
    //کلاس اکتیو را از ردیف اکتیو حذف کن
    // اینپوت های ردیف اکتیو را حذف کن
    this.actived = undefined;
    Row.removeClass('actived');
    inlineInputs.remove();
    
    //روی گرید فوکوس کن که کیبرد از کار نیفتد
    Grid.focus();
    
    // اگر در خواست سیو آمده مقادیر ثبت شده در اینپوت های ردیف اکتیو را بگیر و اعمال کن 
    if(save){
      var changes = [];
      for(var i = 0; i < inlineInputs.length; i++){
        var iI = inlineInputs.eq(i);
        if(iI.hasClass('inline-edit-text')){
          var colIndex = iI.attr('data-col-index');
          var value = iI.val();
          var column = columns[colIndex];
          changes.push(JSON.parse(JSON.stringify({row,column,value})));
          setValueByField(row,column.field,value);
        }
      }
      var errors;
      if(saveInlineEdit){errors = await saveInlineEdit(row,changes);}
      onchange({model,errors});
    }
    
  }
  isActived(rowIndex){
    if(this.actived === undefined){return false;}
    return this.actived === rowIndex;
  }
  getSelected(){
    return this.selected;
  }
  deselectAll(){
    $(this.dom.current).find('.grid-cell,.grid-group-row').removeClass('selected'); 
    this.selected = undefined;
  }
  setSelected(rowIndex,colIndex = this.selected[1] || 0){
    var Grid = $(this.dom.current);
    var Row = Grid.find(`[data-row-index=${rowIndex}]`); // ردیفی که قرار است سلکت شود را پیدا کن
    var type = Row.hasClass('grid-group-row')?'group':'cell';
    if(this.isSelected(rowIndex,type === 'group'?undefined:colIndex)){return;}
    this.deselectAll();
    if(type === 'cell'){ // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه نبود
      var Cell = Row.find(`.grid-cell[data-col-index=${colIndex}]`); // سلولی که قرار است سلکت شود را پیدا کن
      Cell.addClass('selected').focus(); //سلول را سلکت کن
      this.selected=[rowIndex,colIndex];
      var actived = this.actived && rowIndex === this.actived[0]; // ببین آیا سلول داخل ردیف اکتیو است؟
      if(actived){ // اگر سلول مربوط به ردیف اکتیو بود
        Cell.find('.inline-edit').select();//اینپوت داخل آن را هایلایت کن        
      }
      else{//اگر سلول مربوط به ردیف اکتیو نبود 
        this.deactiveAll();//اگر ردیفی اکتیو است آن را دی اکتیو کن
      }
    }
    else{// اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه بود
      Row.addClass('selected').focus();// ردیف گروه را سلکت کن
      this.selected=[rowIndex,colIndex];
      this.deactiveAll();//اگر ردیفی اکتیو است آن را دی اکتیو کن
    }
  }
  isSelected(rowIndex,colIndex){
    if(!this.selected){return false;}
    var [s0,s1] = this.selected;
    if(colIndex === undefined){return s0 === rowIndex;}//اگر ایندکس ستون ارسال نشد فقط چک کن ردیف سلکت شده یا نه
    return s0 === rowIndex && s1 === colIndex;
  }
  getCheckboxColumn(){
    var {checkField,dataset} = this.props;
    if(!checkField){return false;}
    return {
      width:40,resizable:false,movable:false,cellsClassName:'grid-cell-checkbox',field:dataset._checked,
      template:(value,{row,column},context)=>{
        var {onchange,dataset,model} = context;
        var a = (
          <GridCheckbox 
            checked={value || false} 
            disabled={checkField.disabled(row)} 
            onchange={(value)=>{
                setValueByField(row,dataset._checked,value)
                onchange({model});
            }}
          />
        );
        return a;
      }
    }
  }
  getSize(){
    var {columns,theme} = this.props;
    var {borderWidth} = theme;
    var total = 0;
    var checkboxColumn = this.getCheckboxColumn();
    checkboxColumn = checkboxColumn?[checkboxColumn]:[]
    var Columns = checkboxColumn.concat(columns);
    var size = Columns.map((column)=>{
      let width = typeof column.width === 'function'?column.width():column.width;
      total += width;
      return width?width + 'px':'auto';
    });
    return {size:size.join(' '),total:total + ((columns.length + 1) * (borderWidth))};
  }
  getStyle(){
    var {style,theme} = this.props;
    var {borderColor} = theme;
    return $.extend({},{
      background:borderColor,
      borderColor:borderColor
    },style);
  }
  onchange(obj){
    this.props.onchange(obj,this.props)
  }
  keyDown(e){
    var key = e.keyCode;
    if(this['key'+key]){this['key'+key](e);}
  }
  onGroupCheck(row,value){
    var {dataset} = this.props;
    for(var i = 0; i < row._childs.length; i++){
      setValueByField(row._childs[i],dataset._checked,value); 
    }
    this.onchange({model:this.props.model});
  }
  render(){
    var {model,theme,convertedModel,dataType,rtl,group,dataSplitter,columns,changeGroupsOpen} = this.props;
    if(!columns || !model || !columns.length || !model.length){return '';}     
    var {size,total} = this.getSize();
    var contextValue = {...this.props};
    contextValue = $.extend({},contextValue,{
      model,columns,
      convertedModel,
      onchange:this.onchange.bind(this),
      theme,
      size,
      total,
      group,
      dataType,
      selected:this.selected,
      getSelected:this.getSelected.bind(this),
      setSelected:this.setSelected.bind(this),
      isSelected:this.isSelected.bind(this),
      deselectAll:this.deselectAll.bind(this),
      isActived:this.isActived.bind(this),
      changeGroupsOpen,
      groupsOpen:this.groupsOpen,
      checkboxColumn:this.getCheckboxColumn(),
      treeTemplate:this.treeTemplate,
      onGroupCheck:this.onGroupCheck.bind(this),
    });  
    return(
      <GridContext.Provider value={contextValue}>
        <div className={`grid-container${rtl?' rtl':''}`} style={this.getStyle()} data-splitter={dataSplitter} onKeyDown={this.keyDown.bind(this)} tabIndex={0}
          ref={this.dom}>
          <GridHeader />
          <GridRows />
        </div>
      </GridContext.Provider>
    );
  }
}
GridContainer.defaultProps = {
  theme:{},selectable:false,dataset:{},keyboard:{}
}

export class GridHeader extends Component{
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
    var {columns,checkboxColumn} = this.context;
    var index = -1;
    if(checkboxColumn){
      index++;
      var checkboxTitle = <GridTitle column={checkboxColumn} key={index} renderColIndex={index} colIndex={false}/>
    }
    var titles = columns.map((column,i)=>{
      index++;
      return <GridTitle column={column} key={index} renderColIndex={index} colIndex={i}/>
    });
    return(
      <div className="grid-header" style={this.getStyle()}>
        {checkboxColumn && checkboxTitle}
        {titles}
      </div>
    );
  }
}

export class GridTitle extends Component{
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
    let width = typeof column.width === 'function'?column.width():column.width
    if(width === 'auto' || !width || column.resizable === false){return;}
    var dom = $(e.target);
    var grid = dom.parents('.grid-container');
    var gridRows = grid.find('.grid-rows');
    this.startOffset = {
        column,
        index:parseInt(dom.attr('data-render-column-index')),
        minWidth:column.minWidth || 40,
        width: parseInt(width),//عرض ستون
        x: e.clientX, // موقعیت در راستای افق
        size:this.context.size.split(' '),
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
    so.size[so.index] = newWidth + 'px';
    so.gridTemplateColumns = '';
    var {theme} = this.context;
    var total = theme.borderWidth;
    for(var i = 0; i < so.size.length; i++){
      var size = so.size[i];
      total += parseInt(size) + theme.borderWidth;
      so.gridTemplateColumns += size === 'auto'?'auto ':size + ' ';
    }
    so.container.css({gridTemplateColumns:so.gridTemplateColumns});
    so.gridRows.css('width',total)
  }

  toggleSetting(){
    $(this.dom.current).find('.column-popup').toggle();
  }

  render(){
    var {column,renderColIndex,colIndex} = this.props;
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
        {
          colIndex !== false && 
          <div 
            className='move-handle' 
            data-column-index={colIndex} 
            data-render-column-index={renderColIndex} 
            onMouseDown={(e)=>{this.moveDown(column,e)}}
          >
            {column.title}
          </div>
        }
        {
          colIndex !== false && 
          <div 
            className='resize-handle' 
            data-column-index={colIndex} 
            data-render-column-index={renderColIndex}
            onMouseDown={(e)=>{this.resizeDown(column,e)}}>
          </div>
        }
        {
          Options.length > 0 && 
          <Fragment>
          <div 
            className='column-setting' 
            data-column-index={colIndex} 
            data-render-column-index={renderColIndex}
            onMouseDown={(e)=>{this.toggleSetting(column,e)}}
          ></div>
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

export class GridRows extends Component{
  static contextType = GridContext;
  
  getRows(){
    var {convertedModel,group} = this.context;
    this.rows = [];
    this._order = 0;
    this.getRowsRecursive(convertedModel,group?-1:0);
    return this.rows;
  }
  getRowsRecursive(model,level){
    var {dataset} = this.context;
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      row._order = this._order;
      row._inorder = i;
      row._level = level;
      row._opened = row._opened === undefined?true:row._opened;
      row._childs = row._childs || getValueByField(row,dataset._childs);
      var props = {row,key:row._order,isFirst:row._order === 0,rowIndex:row._order};
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
    var {theme} = this.context;
    var {borderWidth,background} = theme;
    return(
      <div className="grid-rows" style={this.getStyle()}>
        {rows}
        <div className='grid-background' style={{flex:1,background,marginTop:borderWidth}}></div>
      </div>
    );
  }
}

export class GridRow extends Component{
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
    var {columns,checkField,checkboxColumn,isActived} = this.context;
    var {row,rowIndex} = this.props;
    var cells = columns.map((column,i)=>{
      return <GridCell column={column} row={row} key={i} rowIndex={row._order} colIndex={i}/> 
    })
    return(
      <div className={`grid-row${isActived(rowIndex,null,'row')?' actived':''}`} style={this.getStyle()} data-row-index={rowIndex}>
        {checkField && <GridCell column={checkboxColumn} row={row} key={-1}/>}
        {cells}
      </div>
    );
  }
}

export class GroupRow extends Component{
  static contextType = GridContext;
  getStyle(){
    var {theme} = this.context;
    var {isFirst} = this.props;
    return {
      background:theme.cellBackground,
      marginTop:isFirst?0:theme.borderWidth || 1,
      height:theme.rowHeight + 'px',
      lineHeight:'24px',
    }
  }
  click(){
    var {setSelected,selectable} = this.context;
    if(!selectable){return;}
    var {rowIndex} = this.props;
    setSelected(rowIndex);
  }
  render(){
    var {row,rowIndex} = this.props;
    var {checkField,onGroupCheck,group,isSelected} = this.context;
    return(
      <div 
        className={`grid-group-row${isSelected(rowIndex)?' selected':''}`} 
        style={this.getStyle()} 
        data-group-index={row.groupIndex} 
        data-row-index={rowIndex} tabIndex={0}
        onClick={this.click.bind(this)}
      >
        <div className='grid-group-row-container'>
          {
            checkField && group.checkable!== false && 
            <div className='grid-checkbox'>
              <GridCheckbox 
                checked={row._checked} 
                onchange={
                  (value)=>{onGroupCheck(row,value)}
                }
              />
            </div>
          }
          {
            group.collapsible !== false && row._childs && row._childs.length &&
            <GridToggleIcon row={row}/>
          }
          <GridText text={row._groupName}/>
        </div>
      </div>
    );
  }
}

export class GridCell extends Component{
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
    var {rowIndex,colIndex,column} = this.props;
    var {isSelected} = this.context;
    var className;
    if(column.treeMode){className = 'grid-cell'}
    else{
      className = `grid-cell${column.cellsClassName?' ' + column.cellsClassName:' grid-cell-text'}`;
    }
    className += isSelected(rowIndex,colIndex)?' selected':'';
    return className;
  }
  getTemplate(row,column,value){
    var {treeTemplate} = this.context; 
    if(column.treeMode){
      return treeTemplate(value,{row,column},this.context);
    }
    else if(!column.template){return value === undefined?'':value;}
    else {return column.template(value,{row,column},this.context)}
  }
  click(){
    var {setSelected,selectable} = this.context;
    if(!selectable){return;}
    var {rowIndex = false,colIndex = false} = this.props;
    if(rowIndex === false || colIndex === false){return;}
    setSelected(rowIndex,colIndex);
  }
  render(){
    var {row,column,colIndex} = this.props;
    var value = getValueByField(row,column.field);
    return(
      <div title={column.template?undefined:value} className={this.getClassName()} style={this.getStyle()} data-col-index={colIndex} tabIndex={0} onClick={this.click.bind(this)}>
        {this.getTemplate(row,column,value)}
      </div>
    );
  }
}

export class TreeCell extends Component{
  static contextType = GridContext;
  getStyle(){
    var {rtl} = this.context;
    var {row} = this.props;
    return {
      ['padding' + (rtl?'Right':'Left')]:row._level * 12
    }
  }
  render(){
    var {row,value,column} = this.props;
    var icon = column.icon?column.icon(row):false;
    return(
      <div className='grid-tree-cell' style={this.getStyle()}>
        <GridToggleIcon row={row}/>
        {icon && <GridIcon className={icon.className} color={icon.color}/>}
        <GridText text={value}/>
      </div>
    );
  }
}

export class GridText extends Component{
  render(){
    var {text} = this.props;
    return (
      <div className='grid-text'>{text}</div>
    );
  }
}

export class GridToggleIcon extends Component{
  static contextType = GridContext;
  getClassName(row){
    var hasChild = row._childs && row._childs.length;
    var className = 'grid-toggle-icon';
    if(!hasChild){return className;}
    className += row._opened?' opened':' closed';
    return className;
  }
  click(){
    var {onchange,model,changeGroupsOpen} = this.context;
    var {row} = this.props;
    if(row._groupName !== undefined){
      changeGroupsOpen(row.groupIndex);
    }
    else{
      if(!row._childs || !row._childs.length){return;}
      row._opened = !row._opened;
      onchange({model});
    }
    
  }
  render(){
    var {row} = this.props;
    return (
      <div className={this.getClassName(row)} onClick={this.click.bind(this)}></div>
    );
  }
}

export class GridCheckbox extends Component{ 
  change(value){
    value = typeof value === 'object'?value.target.checked:value
    this.props.onchange(value);
  }
  render(){
    var {checked,disabled} = this.props;
    return (
        <input type='checkbox' onChange={this.change.bind(this)} checked={checked} disabled={disabled}/>
    );
  }
}


export class GridIcon extends Component{
  static contextType = GridContext;
  render(){
    var {className,color} = this.props;
    return (
      <div className={'grid-icon ' + className} style={{color}}></div>
    );
  }
}