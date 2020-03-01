import React,{Component,createRef,createContext,Fragment} from 'react';
import './index.css';
import $ from 'jquery';
var GridContext = createContext();
export default class Grid extends Component{
  constructor(props){
    super(props);
    this.dom =createRef();
    this.groupsOpen = {};
    this.splitPosition = this.props.splitPosition;
    this.theme = this.getTheme(this.props.theme);
    this.touch = this.isMobile();
  }
  isMobile(){return 'ontouchstart' in document.documentElement;}
  getClient(e){
    return this.touch?
    {x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:
    {x:e.clientX,y:e.clientY}
  }
  getTheme(theme){
    return $.extend({},{background:'#fff',borderColor:'#ddd',borderWidth:0,cellBackground:'#fff',headerBackground:'#eee',rowHeight:36},theme);
  }
  changeGroupsOpen(index){
    this.groupsOpen['g' + index] = !this.groupsOpen['g' + index];
    this.props.onchange({model:this.props.model},this.props);
  }
  eventHandler(selector, event, action,type = 'bind'){
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = this.touch ? me[event] : event;
    var element = typeof selector === "string"? 
    (selector === "window"?$(window):$(selector)):
    selector; 
    element.unbind(event, action); 
    if(type === 'bind'){element.bind(event, action)}
  }
  searchTree(nodes, keyword,field){
    let newNodes = [];
    for (let n of nodes) {
      let value = this.getValueByField(n,field);
      if (n._childs) {
        const nextNodes = this.searchTree(n._childs, keyword,field);
        if (nextNodes.length > 0) {
          n._childs = nextNodes;
        } else if (value.toLowerCase().includes(keyword.toLowerCase())) {
          n._childs = nextNodes.length > 0 ? nextNodes : [];
        }
        if (
          nextNodes.length > 0 ||
          value.toLowerCase().includes(keyword.toLowerCase())
        ) {
          newNodes.push(n);
        }
      } else {
        if (value.toLowerCase().includes(keyword.toLowerCase())) {
          newNodes.push(n);
        }
      }
    }
    return newNodes;
  }
  getValueByField(obj,field){
    if(!field || field === null){return undefined;}
    var fieldString = typeof field === 'function'?field(obj):field;
    if(!fieldString ||typeof fieldString !== 'string'){console.error('Grid.getValueByField() receive invalid field'); return undefined}
    var fields = fieldString.split('.');
    var value = obj[fields[0]];
    if(value === undefined){return;}
    for(var i = 1; i < fields.length; i++){
      value = value[fields[i]];
      if(value === undefined || value === null){return;}
    }
    return value;
  }
  setValueByField(obj,field,value){
    var fields = field.split('.');
    var node = obj;
    for(var i = 0; i < fields.length - 1; i++){
      if(node[fields[i]] === undefined){return;}
      node = node[fields[i]]; 
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  convertFlatToComposite(model,idProp = 'id',parentIdProp = 'parentId'){
    var convertModelRecursive = (model,parentId,parentObject)=>{
      for(var i = 0; i < model.length; i++){
        var row = model[i];
        row._parent = this.getValueByField(row,parentIdProp);
        if(row._parent !== parentId){continue;}
        row._id = this.getValueByField(row,idProp);
        row._childs = [];
        parentObject.push(row);
        convertModelRecursive(model,row._id,row._childs)
      }
    }
    var result = [];
    convertModelRecursive(model,undefined,result);
    return result;
  }
  getModel(model,dataType){
    var {group = {},dataset = {},search} = this.props;
    if(dataType === 'flat'){
      model = this.convertFlatToComposite(model,dataset._id,dataset._parent)
    }
    if(search){
      model = this.searchTree(model,search.value,search.field); 
    }
    if(!group.field){return model;}
    var g = {};
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      var groupValue = this.getValueByField(row,group.field);
      if(groupValue === undefined){continue;}
      g[groupValue] = g[groupValue] || {_childs:[]};
      g[groupValue]._groupName = (group.title?group.title + ' : ':'') + groupValue; 
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
    this.startOffset = {x:this.getClient(e).x,size:this.splitPosition};
    this.eventHandler('window','mousemove',$.proxy(this.mouseMove,this))
    this.eventHandler('window','mouseup',$.proxy(this.mouseUp,this))
  }
  mouseMove(e){
    var {rtl} = this.props;
    var so = this.startOffset;
    var pos =(so.x - this.getClient(e).x) * (rtl?1:-1) + so.size;
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
    this.eventHandler('window','mousemove',this.mouseMove,'unbind')
    this.eventHandler('window','mouseup',this.mouseUp,'unbind')
  }
  render(){
    var {split,rtl,group,dataType,columns,splitPosition,className,model,style} = this.props;
    if(model === undefined || model === null){
      return ( 
      <div className={`grid${className?' ' + className:''}`} ref={this.dom} style={style}>
        <i className="fas fa-spinner fa-spin"
          style={{
            color:'#555',
          position:'absolute',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          fontSize:'30px',
          width:'40px',height:'40px',left:'calc(50% - 20px)',top:'calc(50% - 20px)'
        }}
        ></i>
      </div>
      )
    }
    var props = {
      dataType,
      onchange:this.onchange.bind(this),
      convertedModel:this.getModel(model,dataType),
      changeGroupsOpen:this.changeGroupsOpen.bind(this),
      getValueByField:this.getValueByField.bind(this),
      setValueByField:this.setValueByField.bind(this),
      eventHandler:this.eventHandler.bind(this),
      getClient:this.getClient.bind(this),
      theme:this.theme,
      style:undefined,
      touch:this.touch
    }
    var gridSplitterProps = {
      className:'grid-splitter',
      style:{
        width:'5px',height:'100%',position:'absolute',
        [rtl?'right':'left']:`calc(${splitPosition + 'px'} - 5px)`,
        background:this.theme.borderColor,cursor:'col-resize'
      },
      [this.touch?'onTouchStart':'onMouseDown']:this.mouseDown.bind(this)
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
          <div {...gridSplitterProps}></div>
          <GridContainer {...this.props} {...props}
            columns={columns.slice(split,columns.length)} 
            dataSplitter={1}
            style={{
              width:`calc(100% - ${splitPosition + 'px'})`,
              [rtl?'right':'left']:splitPosition + 'px'
            }}
            checkField={false}
            addField={false}
            group={group?{field:group.field,title:group.title,collapsible:false}:false}
          />
          </Fragment>
        }
        </div>
    );
  }
}
Grid.defaultProps = {
  splitPosition:300
}
export class GridContainer extends Component{
  constructor(props){
    super(props);
    this.dom = createRef();
    this.treeTemplate = (value,{row,column},context)=>{
      return <TreeCell row={row} column={column} value={value}/>
    }
  }
  searchComposite(model,query,childsProp = 'childs'){
    var searchRowRecursive = (data,query)=>{
        if(this.searchResult !== undefined){return;}
        for(var i = 0; i < data.length; i++){
            if(this.searchResult !== undefined){break;}
            var row = data[i];
            for(var prop in query){
                var value = this.props.getValueByField(row,prop);
                if(value !== query[prop]){continue;}
                this.searchResult = row;
                break;
            }
            if(row[childsProp] && row[childsProp].length){
                searchRowRecursive(row[childsProp],query);
            }
        }
    }
    this.searchResult = undefined;
    searchRowRecursive(model,query);
    return this.searchResult;
}
  windowMouseDown(e){
    var target = $(e.target);
    var parent = target.parents('.grid');
    if(parent.length){return;}
    this.deactiveAll();
  }
  setActived(rowIndex,colIndex){
    var {columns,theme,getValueByField,eventHandler} = this.props;
    var column = columns[colIndex];
    var Grid = $(this.dom.current),Rows = Grid.find('.grid-row');
    var Row = Rows.filter(`[data-row-index=${rowIndex}]`); // ردیفی که باید اکتیو شود را پیدا کن
    if(Row.hasClass('actived')){
      if(!Array.isArray(column.inlineEdit)){ // اگر درخواست اکتیو روی سلول دراپدانی نبود
        this.deactiveAll();
      } 
      return;
    }//اگر ردیف اکتیو بود دی اکتیو را اجرا کن و ادامه نده
    var row = this.searchComposite(this.props.convertedModel,{_order:rowIndex},'_childs'); // آبجکت مربوط به ردیف را پیدا کن
    //ردیف را اکتیو کن
    Row.addClass('actived');
    Row.find('.grid-cell').css({background:theme.active})
    this.actived = [rowIndex,colIndex]; 
    eventHandler('window','mousedown',this.windowMouseDown,'unbind');
    eventHandler('window','mousedown',$.proxy(this.windowMouseDown,this))
    for(var i = 0; i < columns.length; i++){ // به ازای تمام ستون ها 
      var column = columns[i];
      var inlineEdit = typeof column.inlineEdit === 'function'?column.inlineEdit(row,column):column.inlineEdit;
      if(!inlineEdit){continue;} // ستون هایی که قابلیت اینلاین ادیت دارند را پیدا کن
      if(column.inlineEditApprove && !column.inlineEditApprove(rowIndex)){continue;}
      var Cell = Row.find(`.grid-cell[data-col-index=${i}]`); //سلول مربوط به ردیف و ستون را پیدا کن
      var value = getValueByField(row,column.field);// مقدار سلول را پیدا کن
      var input = $(this.getInlineInput(value,rowIndex,i,inlineEdit));// اینپوت با مقدار سلول را بساز
      Cell.append(input); // اینپوت را در سلول قرار بده
      if(colIndex === i){ // اگر سلول اکتیو بود آن را هایلایت کن
        input.focus();
        input.select();
      }
    }
  }
  getInlineInput(value = '',rowIndex,colIndex,inlineEdit){
    var {theme} = this.props;
    if(inlineEdit === true || inlineEdit === 'text'){
      return `<input style="background:${theme.cellBackground};color:${theme.color};" type="text" value="${value === null?'':value}" class='inline-edit inline-edit-text' data-row-index="${rowIndex}" data-col-index="${colIndex}">`;
    }
    if(Array.isArray(inlineEdit)){
      return `<select style="background:${theme.cellBackground};color:${theme.color};height:22px;" class='inline-edit inline-edit-select' data-row-index="${rowIndex}" data-col-index="${colIndex}">${
      inlineEdit.map((o)=>`<option value="${o.value}"${String(value) === String(o.value)?' selected':''}>${o.text}</option>`)
      }</select>`;
    }
    if(inlineEdit === 'checkbox'){

    }
    
  }
  async deactiveAll(save = true){
    if(!this.actived){return;}
    var {columns,convertedModel,saveInlineEdit,model,onchange,theme,setValueByField} = this.props;
    var rowIndex = this.actived[0];
    var Grid = $(this.dom.current);
    var Rows = Grid.find('.grid-row');
    
    //المان مربوط به ردیف اکتیو را پیدا کن
    //آبجکت مربوط به ردیف اکتیو را پیدا کن
    //همه ی اینپوت های ردیف اکتیو را بگیر
    var Row = Rows.filter(`[data-row-index=${rowIndex}]`);
    var row = this.searchComposite(convertedModel,{_order:rowIndex},'_childs');
    var inlineInputs = Row.find('.inline-edit');
    //اکتیو را آپدیت کن
    //کلاس اکتیو را از ردیف اکتیو حذف کن
    // اینپوت های ردیف اکتیو را حذف کن
    this.actived = undefined;
    Row.removeClass('actived');
    Row.find('.grid-cell').css({background:theme.cellBackground})
    inlineInputs.remove();
    
    //روی گرید فوکوس کن که کیبرد از کار نیفتد
    Grid.focus();
    
    // اگر در خواست سیو آمده مقادیر ثبت شده در اینپوت های ردیف اکتیو را بگیر و اعمال کن 
    if(save){
      for(var i = 0; i < inlineInputs.length; i++){
        var iI = inlineInputs.eq(i);
        if(iI.hasClass('inline-edit-text')){
          let colIndex = iI.attr('data-col-index');
          let value = iI.val();
          let column = columns[colIndex];
          setValueByField(row,column.field,value);
        }
        else if(iI.hasClass('inline-edit-select')){
          let colIndex = iI.attr('data-col-index');
          let value = iI.find(':selected').val();
          let column = columns[colIndex];
          setValueByField(row,column.field,value);
        }
      }
      var errors;
      if(saveInlineEdit){errors = await saveInlineEdit(row);}
      if(errors && !Array.isArray(errors)){console.error('saveInlineEdit must retrurn array of errors')}
      onchange({model,errors},this.props);
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
  setSelected(rowIndex,colIndex){
    if(colIndex === undefined){colIndex = this.selected?this.selected[1]:0}
    var Grid = $(this.dom.current);
    var Row = Grid.find(`[data-row-index=${rowIndex}]`); // تگ ردیفی که قرار است سلکت شود را پیدا کن
    var type = Row.hasClass('grid-group-row')?'group':'cell';//مشخص کن این ردیف ردیف معمولی است یا ردیف گروه
    if(this.isSelected(rowIndex,type === 'group'?undefined:colIndex)){return;} //اگر روی ردیفی که سلکت شده کلیک شد ادامه نده
    this.deselectAll(); //همه ردیف ها از حالت سلکت خارج کن
    this.selected=[rowIndex,colIndex]; //سلکتد را آپدیت کن
    if(this.props.inlineEditMode === 'B'){

      if(type === 'cell'){ // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه نبود
        var Cell = Row.find(`.grid-cell[data-col-index=${colIndex}]`); // سلولی که قرار است سلکت شود را پیدا کن
        Cell.addClass('selected').focus(); //سلول را سلکت کن
        var actived = this.actived && rowIndex === this.actived[0];
        if(actived){ //اگر این ردیف اکتیو است و داریم یک سلول از این ردیف اکتیو را سلکت می کنیم؟
          Cell.find('.inline-edit').select();//اینپوت داخل آن را هایلایت کن        
        }
        else{//در غیر اینصورت 
          this.deactiveAll();//اگر ردیفی اکتیو است آن را دی اکتیو کن و مقادیر اینلاین اون ردیف رو سیو کن
        }
      }
      else{// اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه بود
        Row.addClass('selected').focus();// ردیف گروه را سلکت کن
        this.deactiveAll();//اگر ردیفی اکتیو است آن را دی اکتیو کن و مقادیر اینلاین اون ردیف رو سیو کن
      }

    }
    else if(this.props.inlineEditMode === 'A'){
      
      if(type === 'cell'){ // اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه نبود
        var Cell = Row.find(`.grid-cell[data-col-index=${colIndex}]`); // سلولی که قرار است سلکت شود را پیدا کن
        Cell.addClass('selected').focus(); //سلول را سلکت کن
        Cell.find('.inline-edit').select();//اینپوت داخل آن را هایلایت کن
      }
      else{// اگر ردیفی که می خواهیم سلکت کنیم ردیف گروه بود
        Row.addClass('selected').focus();// ردیف گروه را سلکت کن
      }
      this.deactiveAll();//اگر ردیفی اکتیو است آن را دی اکتیو کن و مقادیر اینلاین اون ردیف رو سیو کن
      this.setActived(rowIndex,colIndex);
    
    }
  }
  isSelected(rowIndex,colIndex){
    if(!this.selected){return false;}
    var [s0,s1] = this.selected;
    if(colIndex === undefined){return s0 === rowIndex;}//اگر ایندکس ستون ارسال نشد فقط چک کن ردیف سلکت شده یا نه
    return s0 === rowIndex && s1 === colIndex;
  }
  getCheckboxColumn(){
    var {checkField,dataset,setValueByField} = this.props;
    if(!checkField){return false;}
    return {
      width:40,resizable:false,movable:false,className:'grid-cell-checkbox',field:dataset._checked,
      template:(value,{row,column},context)=>{
        var {onchange,dataset,model} = context;
        var a = (
          <GridCheckbox 
            checked={value || false} 
            disabled={checkField.disabled?checkField.disabled(row):false} 
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
  getAddColumn(){
    var {addField,dataset} = this.props;
    if(!addField){return false;}
    return {
      width:30,resizable:false,movable:false,className:'grid-cell-add',
      template:(value,{row,column},context)=>{
        return <div className='add-icon' onClick={()=>{
          this.add(row)
        }}></div>
      } 
    }
  }
  async add(row){
    var {onchange,dataType,model,dataset,addField,getValueByField,setValueByField} = this.props;
    var def = await addField.getDefault(row);
    if(dataType === 'flat'){
      var obj = model.concat([def]);
      onchange({model:obj},this.props) 
    } 
    else{
      var childs = getValueByField(row,dataset._childs);
      if(!childs){
        setValueByField(row,dataset._childs,[])
        childs = getValueByField(row,dataset._childs);  
      }
      childs.push(def);
      onchange({model},this.props)
    }
    
  }
  getSize(){
    var {columns,theme} = this.props;
    var {borderWidth} = theme;
    var total = 0;
    var checkboxColumn = this.getCheckboxColumn();
    var addColumn = this.getAddColumn();
    checkboxColumn = checkboxColumn?[checkboxColumn]:[]
    addColumn = addColumn?[addColumn]:[]
    var Columns = checkboxColumn.concat(addColumn,columns);
    var size = Columns.map((column)=>{
      let width = typeof column.width === 'function'?column.width():column.width;
      total += width;
      return width?width + 'px':'auto';
    });
    return {size:size.join(' '),total:total + ((columns.length + 1) * (borderWidth))};
  }
  getStyle(){
    var {style,theme} = this.props;
    var {borderColor,color} = theme;
    return $.extend({},{
      background:borderColor,
      borderColor:borderColor,
      color
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
    var {dataset,setValueByField} = this.props;
    for(var i = 0; i < row._childs.length; i++){
      setValueByField(row._childs[i],dataset._checked,value); 
    }
    this.onchange({model:this.props.model});
  }
  render(){
    var {model,theme,convertedModel,dataType,rtl,group,dataSplitter,columns,changeGroupsOpen,errors = []} = this.props;
    if(!columns || !columns.length){return '';}     
    var {size,total} = this.getSize();
    var contextValue = {...this.props};
    contextValue = $.extend({},contextValue,{
      model,columns,
      convertedModel,
      onchange:this.onchange.bind(this),
      theme,
      size,
      errors,
      total,
      group,
      dataType,
      selected:this.selected,
      getSelected:this.getSelected.bind(this),
      setSelected:this.setSelected.bind(this),
      isSelected:this.isSelected.bind(this),
      deselectAll:this.deselectAll.bind(this),
      deactiveAll:this.deactiveAll.bind(this),
      isActived:this.isActived.bind(this),
      changeGroupsOpen,
      groupsOpen:this.groupsOpen,
      checkboxColumn:this.getCheckboxColumn(),
      addColumn:this.getAddColumn(),
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
  getColIndex(index,sign){
    var {columns} = this.props;
    index += sign;
    if(index === -1){index = columns.length - 1;}
    else if(index === columns.length){index = 0;}
    var counter = 0;
    while(columns[index].selectable === false){
      counter++;
      if(counter > columns.length){console.error('Grid component: there is not any selectable column'); return;}
      index += sign;
      if(index === -1){index = columns.length - 1;}
      else if(index === columns.length){index = 0;}
    }
    return index;
  }
  arrowH(e,code){
    e.preventDefault();
    if(!this.selected){return;}
    var {rtl} = this.props;
    var sign = code === 37 ? ( rtl ? 1 : -1 ) : ( rtl ? -1 : 1 );
    this.setSelected(this.selected[0],this.getColIndex(this.selected[1],sign));
  }
  arrowV(e,code){
    e.preventDefault();
    if(this.actived){//اگر ردیفی اکتیو است
      this.deactiveAll(true);//ردیف اکتیو را دی اکتیو کن و مقادیر اینپوت ها را سیو کن
    }
    var s = this.selected;
    if(!s){return;}
    var Grid = $(this.dom.current);
    var colIndex = s[1],rowIndex = s[0] + (code === 40?1:-1);
    var Row = Grid.find(`[data-row-index=${rowIndex}]`);
    if(!Row.length){
      rowIndex = code === 40?0:Grid.find('.grid-row,.grid-group-row').length - 1;
    }
    this.setSelected(rowIndex,colIndex);
  }
  key37(e){this.arrowH(e,37);}
  key39(e){this.arrowH(e,39);}
  key40(e){this.arrowV(e,40);}
  key38(e){this.arrowV(e,38);} 
  key13(e){
    if(!this.selected){return;}
    var [rowType] = this.selected;
    if(rowType === 'group'){ 
      
    }
    else{
      this.setActived(this.selected[0],this.selected[1]);
    }

  }
  key27(e){
    if(this.actived){//اگر ردیفی اکتیو است
      this.deactiveAll(false); //ردیف اکتیو را دی اکتیو کن ولی سیو نکن
    }
  }
}
GridContainer.defaultProps = {
  theme:{},selectable:false,dataset:{},keyboard:{},inlineEditMode:'A'
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
    var {columns,checkboxColumn,addColumn} = this.context;
    var index = -1;
    if(checkboxColumn){
      index++;
      var checkboxTitle = <GridTitle column={checkboxColumn} key={index} renderColIndex={index} colIndex={false}/>
    }
    if(addColumn){
      index++;
      var addTitle = <GridTitle column={addColumn} key={index} renderColIndex={index} colIndex={false}/>
    }
    var titles = columns.map((column,i)=>{
      index++;
      return <GridTitle column={column} key={index} renderColIndex={index} colIndex={i}/>
    });
    return(
      <div className="grid-header" style={this.getStyle()}>
        {checkboxColumn && checkboxTitle}
        {addColumn && addTitle}
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
    var {eventHandler} = this.context;
    if(column.className === 'grid-cell-checkbox' || column.className === 'grid-cell-add'){return;}//شرط نادیده گرفتن ستون چک باکس
    var dom = $(e.target);
    this.startOffset = {from:parseInt(dom.attr('data-column-index')),width:dom.width(),height:dom.height()};
    $("body").append(this.getShadow(column,e));
    eventHandler('window','mousemove',$.proxy(this.moveMove,this));
    eventHandler('window','mouseup',$.proxy(this.moveUp,this));
    $('.move-handle').on("mouseenter",(e)=>{
      this.startOffset.to = parseInt($(e.target).attr('data-column-index'));
    });
  }

  getShadow(column,e){
    var {theme,getClient} = this.context;
    var {headerBackground,borderColor,color} = theme;
    var {width,height} = this.startOffset;
    var {x,y} = getClient(e);
    var style = `color:${color};width:${width}px;left:${x - width / 2}px;top:${y - (height + 2)}px;background:${headerBackground};border:1px solid ${borderColor};z-index:100;font-size:11px;`;
    return ` 
    <div class="grid-title grid-title-shadow" style="${style}">
      ${column.title}
    </div>`;
  }

  moveMove = e  =>{
    var {getClient} = this.context;
    const {width,height} = this.startOffset;
    e.preventDefault();
    var {x,y} = getClient(e);
    $(".grid-title-shadow").css({left:x - width / 2,top:y - (height + 2)});
  }

  moveUp = e =>{
    var {eventHandler} = this.context;
    eventHandler('window','mousemove',this.moveMove,'unbind');
    eventHandler('window','mouseup',this.moveUp,'unbind');
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
    var {eventHandler,getClient} = this.context;
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
        x: getClient(e).x, // موقعیت در راستای افق
        size:this.context.size.split(' '),
        container:grid.find(".grid-header,.grid-row"),
        gridRowsWidth:parseInt(gridRows.css('width')),
        gridRows,
        newWidth:column.width
    }
    eventHandler('window','mousemove',$.proxy(this.resizeMove,this));
    eventHandler('window','mouseup',$.proxy(this.resizeUp,this)); 
  }

  resizeUp = (e)=>{
    var {eventHandler} = this.context;
    eventHandler('window','mousemove',this.resizeMove,'unbind');
    eventHandler('window','mouseup',this.resizeUp,'unbind');
    const {onchange,columns} = this.context;
    var {column,newWidth} = this.startOffset;
    column.width = newWidth;
    onchange({columns});
  }

  resizeMove = e =>{
    e.preventDefault();
    var {rtl,getClient} = this.context;
    var so = this.startOffset;
    var offset = (so.x - getClient(e).x) * (rtl ? 1 : -1);
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
    var {theme,touch} = this.context;
    var {borderColor,cellBackground} = theme;
    var {width = 'auto',resizable = true} = column;
    var Resize = resizable && width !== 'auto'; 
    var Options = options.map((option,i)=>{
      return (
        <li key={i} className={`column-option${option.checked?' checked':''}`} onClick={()=>{if(option.callback){option.callback(column)}}} data-value={option.value}>
          {option.text}
        </li>
      )
    });
    var moveHandleProps = {
      className:'move-handle', 
      'data-column-index':colIndex, 
      'data-render-column-index':renderColIndex, 
      [touch?'onTouchStart':'onMouseDown']:(e)=>{this.moveDown(column,e)}
    }
    return(
      <div className="grid-title" style={this.getStyle()} ref={this.dom} title={column.title}>
        {
          colIndex !== false && 
          <div {...moveHandleProps}>
            {column.title}
          </div>
        }
        {
          colIndex !== false && 
          <div 
            className='resize-handle' 
            data-column-index={colIndex} 
            style={{cursor:Resize?undefined:'not-allowed'}}
            data-render-column-index={renderColIndex}
            onMouseDown={(e)=>{this.resizeDown(column,e)}}>
          </div>
        }
        {Options.length !== 0 &&
          
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
    if(!convertedModel || convertedModel.length === 0){return (
      <div style={{background:'#ddd',position:'absolute',height:'',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <svg 
        style={{left:'calc(50% - 50px)',top:'calc(50% - 50px)',width:'100px',height:'110px'}}
        
        >
          <path stroke={'#fff'} stroke-width={10} fill='none' 
          d='M20 10 L60 10 L80 30 L80 90 L20 90Z'/>
        </svg>
        <span style={{color:'#fff',fontSize:'18px'}}>No Data</span>
      </div>
    )}
    this.rows = [];
    this._order = 0;
    this.getRowsRecursive(convertedModel,group?-1:0);
    return this.rows;
  }
  getError(id){
    var {errors} = this.context;
    for(var i = 0; i < errors.length; i++){
      if(errors[i].id === id){
        return errors[i];
      }
    }

  }
  getRowsRecursive(model,level,parent){
    var {dataset,getValueByField} = this.context;
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      row._order = this._order;
      row._inorder = i;
      row._level = level;
      row._opened = row._opened === undefined?true:row._opened;
      row._childs = row._childs || getValueByField(row,dataset._childs);
      row._id = row._id || getValueByField(row,dataset._id);
      var props = {row,key:row._order,isFirst:row._order === 0,rowIndex:row._order,error:this.getError(row._id)};
      this.rows.push(
        row._groupName !== undefined?
        <GroupRow {...props}/>:
        <GridRow {...props}/>
      )
      this._order++;
      var childs = row._childs;
      if(childs && childs.length && row._opened !== false){
        this.getRowsRecursive(childs,level + 1,row);
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
        <div className='grid-background' style={{flex:1,background,marginTop:borderWidth || 1}}></div>
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
  getError(column){
    var {error} = this.props;
    if(!error){return;}
    for(var i = 0; i < error.columns.length; i++){
      if(error.columns[i].id === column.id){
        return error.columns[i].message;
      }
    }
  }
  render(){
    var {columns,checkField,addField,addColumn,checkboxColumn,isActived} = this.context;
    var {row,rowIndex,error} = this.props;
    var active = isActived(rowIndex,null,'row');
    var cells = columns.map((column,i)=>{
      return <GridCell column={column} row={row} key={i} rowIndex={row._order} colIndex={i} error={this.getError(column)} active={active}/> 
    })
    return(
      <div className={`grid-row${active?' actived':''}`} style={this.getStyle()} data-row-index={rowIndex}>
        {checkField && <GridCell column={checkboxColumn} row={row} key={-2}/>}
        {addField && <GridCell column={addColumn} row={row} key={-1}/>}
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
    var {column,active} = this.props;
    return {
      background:active?theme.active:theme.cellBackground,
      lineHeight:theme.rowHeight + 'px',
      height:theme.rowHeight + 'px',
      minWidth:column.minWidth?column.minWidth + 'px':undefined
    }
  }
  getClassName(){
    var {rowIndex,colIndex,column,error} = this.props;
    var {isSelected} = this.context;
    var className;
    if(column.treeMode){className = 'grid-cell'}
    else{
      className = `grid-cell${column.className?' ' + column.className:' grid-cell-text'}`;
    }
    className += isSelected(rowIndex,colIndex)?' selected':'';
    className += error?' hasError':'';
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
  dblClick(e){
    var {setSelected,selectable,columns} = this.context;
    if(!selectable){return;}
    var {rowIndex = false,colIndex = false} = this.props;
    if(rowIndex === false || colIndex === false){return;}
    if(columns[colIndex].selectable === false){return;}
    setSelected(rowIndex,colIndex);
  }
  mouseDown(e){
    var {deactiveAll,deselectAll} = this.context;
    deactiveAll();
    deselectAll();
  }
  render(){
    var {row,column,colIndex,error} = this.props;
    var {getValueByField} = this.context;
    var value = getValueByField(row,column.field);
    return(
      <div title={column.template?undefined:value} 
        className={this.getClassName()} 
        style={this.getStyle()} 
        data-col-index={colIndex} 
        tabIndex={0} 
        onDoubleClick={this.dblClick.bind(this)}
        onMouseDown={this.mouseDown.bind(this)}
      >
        {this.getTemplate(row,column,value)}
        {error && <GridCellError message={error}/>}
      </div>
    );
  }
}
export class GridCellError extends Component{
  render(){
    return (
      <div className='grid-cell-error' title={this.props.message}></div>
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
    var icon = (column.icon?column.icon(row):false) || {};
    return(
      <div className='grid-tree-cell' style={this.getStyle()}>
        <GridToggleIcon row={row}/>
        {column.icon && <GridIcon className={icon.className} color={icon.color}/>}
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