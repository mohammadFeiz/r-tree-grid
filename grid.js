import React,{Component,createRef,createContext,Fragment} from 'react';
import './index.css';
import $ from 'jquery';
import {
  getClient,eventHandler,getValueByField,searchTree,convertFlatToComposite,setValueByField,
  searchComposite,getFilterResult,getRowsByPaging,getRowsByGroup,getGridNoData,getDictionary,
  getAllFilters,getGridLoading} from './functions';
import RButton from 'r-dropdown-button';
var GridContext = createContext();
export default class Grid extends Component{
  constructor(props){
    super(props);
    this.dom =createRef();
    this.theme = $.extend({},{borderWidth:0},this.props.theme);;
    var {paging} = this.props;
    this.state = {groupsOpen:{}}
    if(paging && !paging.onChange){this.state.paging = paging;}
  }
  onGroupToggle(name){
    var {groupsOpen} = this.state;
    groupsOpen[name] = !groupsOpen[name];
    this.setState({groupsOpen});
  }
  getModel(model,dataType){
    if(model.length === 0){return [];}
    var {dataset = {},search} = this.props;
    if(dataType === 'flat'){
      model = convertFlatToComposite(model,dataset._id,dataset._parent)
    }
    if(search){
      model = searchTree(model,search.value,search.field);
    }
    return model;
  }
  componentDidMount(){
    var {split} = this.props;
    var {length:splitLength = 0} = split;
    if(splitLength){
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
  onChange(obj,props){
    var {split,columns} = this.props;
    var {length:splitLength = 0} = split;
    if(props.dataSplitter === 0 && obj.columns){
      obj.columns = obj.columns.concat(columns.slice(splitLength,columns.length))
    }
    else if(props.dataSplitter === 1 && obj.columns){
      obj.columns = columns.slice(0,splitLength).concat(obj.columns)
    }
    this.props.onChange(obj,props)
  }
  onChangeSplitter(pos){
    var container = $(this.dom.current);
    var grids = container.find('.grid-container');
    grids.eq(0).css({
      width: pos + 'px',
    })
  }
  translate(value){
    var dictionary = getDictionary();
    var {globalization} = this.props;
    return dictionary[value][globalization];
  }
  onPageChange(paging,changes){
    if(this.state && this.state.paging){this.setState({paging})}
    else{this.props.paging.onChange(paging,changes)}
  }
  getRowsByFilter(model){
    this._order = 0;
    this.rows = [];
    this.getRowsRecursive(model,0);
    return this.rows.filter((row)=>row._show === true && row._parentOpened === true)
  }
  getRows(model){
    var rootLength = model.length;
    if(rootLength === 0){return [];}
    var {group,getOpened,setOpened} = this.props;
    var {paging} = this.state && this.state.paging?this.state:this.props;
    var {groupsOpen} = this.state;
    this.getOpened = {};
    this.setOpened = undefined;
    if(setOpened){
      this.setOpened = setOpened();
      if(this.setOpened === null){this.setOpened = undefined;}
    }
    
    var rows = this.getRowsByFilter(model);
    rows = getRowsByPaging(rows,paging,rootLength);
    rows = getRowsByGroup(rows,group,groupsOpen);
    if(getOpened){getOpened(this.getOpened)}
    return rows;
  }
  getRowsRecursive(model,level,parents = [],parentOpened = true){
    var {dataset = {},group,dataType} = this.props;
    for(var i = 0; i < model.length; i++){
      var row = model[i];
      row._show = false;
      row._level = level;
      row._order = this._order;  
      row._inorder = i;
      row._id = dataset._id?getValueByField(row,dataset._id):undefined;
      var {columnsValue,filterResult} = this.getRowDetailsByColumns(row); 
      if(filterResult){
        row._show = true;
        for(let k = 0; k < parents.length; k++){
          parents[k]._show = true;
        }
      }  
      row._parentOpened = parentOpened;//is parent of row opened? 
      if(this.setOpened !== undefined){
        row._opened = row._opened === undefined?this.setOpened[row._id]:row._opened;
      }
      else{
        row._opened = row._opened === undefined?true:row._opened;
      }
      this.getOpened[row._id] = row._opened;
      if(dataType === 'composite'){//در حالت فلت این فیلد قبلا پر شده است
        row._childs = dataset._childs?getValueByField(row,dataset._childs):undefined;
      }
      row._getParents = ()=>parents;
      if(parentOpened){//محض پرفرمنس در نادیده گرفتن ردیف هایی که پرنت بسته دارند
        row._columnsValue = columnsValue;//values of row per each column
        if(group && group.fields && group.fields.length){
          row._groupValue = level === 0?group.fields.map((f)=>getValueByField(row,f)):parents[0]._groupValue;  
        }
      }
        
      this.rows.push(row);
      this._order++;
     if(row._childs && row._childs.length){
        this.getRowsRecursive(row._childs,level + 1,parents.concat(row),row._opened && parentOpened);
      }
    }
  }
  getRowDetailsByColumns(row){ 
    var {onFilterChange,columns} = this.props;
    var columnsValue = [];
    var filterResult = true;
    for(var i = 0; i < columns.length; i++){
      let {field,filter,id} = columns[i];
      let Field;
      if(typeof field === 'function'){
        Field = field(row)
      }
      else{
        Field = field;
      }
      let value = getValueByField(row,Field);
      columnsValue.push({value,field:Field,id});
      if(!field){continue;}
      if(!onFilterChange){
        let result = getFilterResult(filter,value); 
        if(result === false){filterResult = false;}
      }
      
    }
    return {columnsValue,filterResult}; 
  }
  render(){
    var {split,rtl,group,dataType,columns,className,model,style,paging,onChange = false,toggleColumns} = this.props;
    var {length:splitLength = 0,size:splitSize = 300,resizable:splitResizable} = split;
    if(!Array.isArray(columns)){
      return (
        <div className={`grid${className?' ' + className:''}`} ref={this.dom} style={{...style}}>
          {getGridLoading()}
        </div>
      ) 
    }
    if(columns.length === 0){
      return (
        <div className={`grid${className?' ' + className:''}`} ref={this.dom} style={{...style}}>
          {getGridNoData(this.translate('No.Columns'))}
        </div>
      )
    }
    var closedColumns = columns.filter((column)=>toggleColumns && column.opened === false);
    var Paging;
    if(this.state && this.state.paging){
      Paging = {...this.state.paging};
      Paging.count = undefined;
    }
    else if(paging){Paging = paging;}
    var props = {
      dataType,
      groupsOpen:this.state.groupsOpen,
      onGroupToggle:this.onGroupToggle.bind(this),
      onChange:onChange?this.onChange.bind(this):false,
      translate:this.translate.bind(this),
      theme:this.theme,
      style:undefined,
      paging:Paging,
    }
    if(model !== undefined && model !== null){
      var convertedModel = this.getModel(model,dataType);
      props.convertedModel = convertedModel;
      props.rows = this.getRows(convertedModel);
    }  
    return(
      <div className={`grid${className?' ' + className:''}${rtl?' rtl':''}`} ref={this.dom} style={{...style}}>
        <div style={{flex:1,display:'flex',overflow:'auto'}}>
          {splitLength === 0 && <GridContainer {...this.props} {...props}/>}
          {
            splitLength !== 0 &&
              <Fragment>
              <GridContainer {...this.props} {...props}
                columns={columns.slice(0,splitLength)}
                dataSplitter={0}
                style={{width: splitSize}}
              />
              <GridSplitter rtl={rtl} resizable={splitResizable} position={splitSize} onChange={this.onChangeSplitter.bind(this)} onChangeEnd={()=>{
                this.onChange({columns},this.props)
              }}/>
              <GridContainer {...this.props} {...props}
                columns={columns.slice(splitLength,columns.length)}
                dataSplitter={1}
                checkField={false}
                addField={false}
                style={{flex:1}}
                group={group?{fields:group.fields,title:group.title,collapsible:false}:false}
              />
              </Fragment>
          }
          <div className='grid-closed-columns'>  
            {
              closedColumns.map((column,i)=>{
                return (
                    <div key={i} className='grid-closed-column' onClick={()=>{
                      column.opened = true; this.onChange({columns},this.props) 
                    }}>
                      <div className='grid-closed-column-title'>
                        {column.title}
                      </div>
                    </div>    
                  )
                })
              }
          </div>
        </div>
        {
          Paging && convertedModel &&
          <GridPaging 
            translate={this.translate.bind(this)} 
            paging={Paging}
            rootLength={Paging.rootLength === undefined?props.convertedModel.length:Paging.rootLength} 
            onChange={this.onPageChange.bind(this)}
          />
        }
      </div>
    );
  }
}
Grid.defaultProps = {
  split:{length:0},globalization:'en',dataType:'composite'
}
class GridPaging extends Component{
  static contextType = GridContext;
  onChange(obj){
    if(obj.number < 1){return;}
    var {paging,onChange,rootLength} = this.props;
    var {size} = paging;
    var count = Math.ceil(rootLength / size);
    if(obj.number !== undefined && obj.number> count){return;}
    var {sizes = ['5','10','20','30','40'],size = sizes[0],count,number} = paging;
    var Paging = {sizes,count,number,size}
    for(var prop in obj){
      Paging[prop] = obj[prop];
    }
    onChange(Paging,obj);
  }
  render(){
    var {translate,paging,rootLength} = this.props;
    var {sizes = ['5','10','20','30','40'],size = sizes[0],number} = paging;
    var count = Math.ceil(rootLength / size);
    if(number > count){number = count;}
    return (
      <div className='grid-paging'>
        <button className='grid-paging-button grid-paging-first' onClick={()=>this.onChange({number:1})} title={translate('First.Page')}></button>
        <button className='grid-paging-button grid-paging-prev' onClick={()=>this.onChange({number:number - 1})} title={translate('Previous.Page')}></button>
        <div className='grid-paging-number'>{`${number}${count !== undefined?'/' + count:''}`}</div>
        <button className='grid-paging-button grid-paging-next' onClick={()=>this.onChange({number:number + 1})} title={translate('Next.Page')}></button>
        <button className='grid-paging-button grid-paging-last' onClick={()=>this.onChange({number:count})} title={translate('Last.Page')}></button>
        <select className='grid-paging-select' onChange={(e)=>this.onChange({size:parseInt(e.target.value)})} value={size} title={translate('Page.Size')}>
          {sizes.map((s,i)=><option key={i} value={s}>{s}</option>)}
        </select>
      </div>
    )
  }
}
class GridSplitter extends Component{
  constructor(props){
    super(props);
    this.position = this.props.position;
  }
  mouseDown(e){
    var {resizable} = this.props;
    if(resizable === false){return;}
    this.so = {x:getClient(e).x,size:this.position};
    eventHandler('window','mousemove',$.proxy(this.mouseMove,this))
    eventHandler('window','mouseup',$.proxy(this.mouseUp,this))
  }
  mouseMove(e){
    var {rtl,onChange} = this.props;
    var pos =(this.so.x - getClient(e).x) * (rtl?1:-1) + this.so.size;
    this.position = pos;
    onChange(pos);
  }
  mouseUp(){
    var {onChangeEnd} = this.props;
    eventHandler('window','mousemove',this.mouseMove,'unbind')
    eventHandler('window','mouseup',this.mouseUp,'unbind')
    //onChangeEnd();
  }
  render(){
    var props = {
      className:'grid-splitter',
      ['ontouchstart' in document.documentElement?'onTouchStart':'onMouseDown']:this.mouseDown.bind(this)
    }
    return (
      <div {...props}></div>
    )
  }
}
export class GridContainer extends Component{
  constructor(props){
    super(props);
    this.dom = createRef();
    this.treeTemplate = (value,{row,column},context)=>{
      return <TreeCell row={row} column={column} value={value}/>
    }
    this.state={selected:[false,false],error:false};
    this.inlineChanges = false;
  }
  
  windowMouseDown(e){
    var {selected = []} = this.state;
    if(selected[0] === false && selected[1] === false){return;}
    var target = $(e.target);
    var parent = target.parents('.grid');
    if(parent.length && !target.hasClass('grid-background')){return;}
    
    this.deselect();
  }
  getInlineChanges(colIndex,value){
    if(this.inlineChanges === false){this.inlineChanges = {};}
    this.inlineChanges[colIndex + 'col'] = value;
  }
  select(rowIndex = this.state.selected[0],colIndex = this.state.selected[1]){
    var {selected} = this.state;
    if(selected[0] === rowIndex && selected[1] === colIndex){return;} //اگر روی سلولی که سلکت شده است در خواست سلکت اومد ادامه نده
    if(selected[0]!== false && selected[0] !== rowIndex){this.deselect();}
    this.setState({selected:[rowIndex,colIndex]});
    eventHandler('window','mousedown',$.proxy(this.windowMouseDown,this))
  } 
  saveInlineEdit(){
    var {columns,convertedModel,model,onChange} = this.props;
    var {selected} = this.state;
    var rowIndex = selected[0];
    var row = searchComposite(convertedModel,{_order:rowIndex},'_childs');
    var errors = [];
    for(var prop in this.inlineChanges){
      var colIndex = parseInt(prop);
      var column = columns[colIndex];
      var value = this.inlineChanges[prop];
      var {inlineEdit} = column;
      var {validate = ()=>false} = inlineEdit; 
      var result = validate({row,rowIndex,value});
      if(result){errors.push({column,colIndex,message:result})}
      else{setValueByField(row,column.field,value);}
    }
    onChange({model},this.props);
    this.setState({error:{id:row._id,columns:errors}})
  }
  deselect(save = true){
    eventHandler('window','mousedown',this.windowMouseDown,'unbind')
    if(this.inlineChanges){
      if(save){this.saveInlineEdit();}
      this.inlineChanges = false;
    }
    else{
      var {error} = this.state;
      if(error){this.setState({error:false})}
    }
    this.setState({selected:[false,false]})
  }
  getCheckboxColumn(){
    var {checkField,dataset} = this.props;
    if(!checkField){return false;}
    return {
      width:40,resizable:false,movable:false,className:'grid-cell-checkbox',field:dataset._checked,isDefault:true,
      template:(value,{row,column},context)=>{
        var {onChange,dataset,model} = context;
        var a = (
          <GridCheckbox
            checked={value || false}
            disabled={checkField.disabled?checkField.disabled(row):false}
            onChange={(value)=>{
               setValueByField(row,dataset._checked,value)
               onChange({model});
            }}
          />
        );
        return a;
      }
    }
  }
  getAddColumn(){
    var {addField} = this.props;
    if(!addField){return false;}
    return {
      width:30,resizable:false,movable:false,className:'grid-cell-add',isDefault:true,
      template:(value,{row,column},context)=>{
        if(addField.enable === false){return '';}
        if(typeof addFiled.enable === 'function'){
          if(addField.enable(row) === false){return '';}
        }
        return <div className='add-icon' onClick={()=>{
          this.add(row)
        }}></div>
      }
    }
  }
  async add(row){
    var {onChange,dataType,model,dataset,addField} = this.props;
    var def = await addField.getDefault(row);
    if(dataType === 'flat'){
      var obj = model.concat([def]);
      onChange({model:obj},this.props)
    }
    else{
      var childs = getValueByField(row,dataset._childs);
      if(!childs){
        setValueByField(row,dataset._childs,[])
        childs = getValueByField(row,dataset._childs);
      }
      childs.push(def);
      onChange({model},this.props)
    }

  }
  
  getSize(){
    var {columns,theme,toggleColumns,onChange} = this.props;
    var {borderWidth} = theme;
    var total = 0;
    var checkboxColumn = this.getCheckboxColumn();
    var addColumn = this.getAddColumn();
    checkboxColumn = checkboxColumn?[checkboxColumn]:[]
    addColumn = addColumn?[addColumn]:[]
    var Columns = checkboxColumn.concat(addColumn,columns);
    if(toggleColumns){Columns = Columns.filter((column)=>column.opened !== false);}
    var size = Columns.map((column,i)=>{
      let width = typeof column.width === 'function'?column.width():column.width;
      total += width;
      return width?width + 'px':'auto';
    });
    return {size:size.join(' '),total:total + ((columns.length + 1) * (borderWidth))};
  }
  onChange(obj){
    this.props.onChange(obj,this.props)
  }
  render(){
    var {rtl,dataSplitter,columns,onChange = false,style} = this.props;
    if(!columns || !columns.length){return '';}
    var {error,selected} = this.state;
    var {size,total} = this.getSize();
     
    var contextValue = {
      ...this.props,
      onChange:onChange?this.onChange.bind(this):false,
      size, 
      error,
      getInlineChanges:this.getInlineChanges.bind(this), 
      total,
      selected,
      select:this.select.bind(this),
      checkboxColumn:this.getCheckboxColumn(),
      addColumn:this.getAddColumn(),
      treeTemplate:this.treeTemplate,
    }
    return(
      <GridContext.Provider value={contextValue}>
        <div className={`grid-container${rtl?' rtl':''}`} style={style} data-splitter={dataSplitter} onKeyDown={this.keyDown.bind(this)} tabIndex={0}
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
    var end = false;
    if(index === -1){index = columns.length - 1;}
    else if(index === columns.length){index = 0; end = true;}
    var counter = 0;
    while(columns[index].selectable === false){
      counter++;
      if(counter > columns.length){console.error('Grid component: there is not any selectable column'); return;}
      index += sign;
      if(index === -1){index = columns.length - 1;}
      else if(index === columns.length){index = 0;}
    }
    return {index,end};
  }
  arrowH(e,code){
    e.preventDefault();
    var {selected} = this.state;
    if(selected[1] === false){return;}
    var {rtl} = this.props;
    var sign = code === 37 ? ( rtl ? 1 : -1 ) : ( rtl ? -1 : 1 );
    this.select(selected[0],this.getColIndex(selected[1],sign).index);
  }
  arrowV(e,code){
    e.preventDefault();
    var {selected} = this.state;
    var colIndex = selected[1];
    if(colIndex === false){return;}
    var rowIndex = code === 40?this.getNextRowIndex():this.getPreviousRowIndex();
    this.select(rowIndex,colIndex);
  }
  getNextRowIndex(){
    var {selected} = this.state;
    var Grid = $(this.dom.current);
    var rowIndex = selected[0] + 1;
    var Row = Grid.find(`[data-row-index=${rowIndex}]`);
    if(!Row.length){rowIndex = 0;}
    return rowIndex;
  }
  getPreviousRowIndex(){
    var {selected} = this.state;
    var Grid = $(this.dom.current);
    var rowIndex = selected[0] - 1;
    var Row = Grid.find(`[data-row-index=${rowIndex}]`);
    if(!Row.length){rowIndex = Grid.find('.grid-row').length - 1;}
    return rowIndex;
  }
  keyDown(e){
    var key = e.keyCode;
    if(this['key'+key]){this['key'+key](e);}
  }
  key37(e){this.arrowH(e,37);}
  key39(e){this.arrowH(e,39);}
  key40(e){this.arrowV(e,40);}
  key38(e){this.arrowV(e,38);}
  key13(e){//enter
    var dom = $(this.dom.current);
    var selectedCell = dom.find('.grid-cell.selected');
    if(!selectedCell.length){return;}
    var inlineEdit = selectedCell.find('.inline-edit');
    if(inlineEdit.hasClass('inline-edit-text')){this.deselect();}
  }
  key27(e){
    this.deselect(false);
  }//scape
  key45(e){this.select(this.getNextRowIndex(),undefined);}//insert
  key9(){//tab
    var {selected} = this.state;
    var [rowIndex,colIndex] = selected;
    if(colIndex === false){return;}
    var {index,end} = this.getColIndex(selected[1],1);
    colIndex = index;
    if(end){rowIndex = this.getNextRowIndex();}
    this.select(rowIndex,colIndex);
  }
}
GridContainer.defaultProps = {
  theme:{},selectable:false,dataset:{},keyboard:{}
}
export class GridHeader extends Component{
  static contextType = GridContext;
  getStyle(){
    var {size} = this.context;
    return {
      gridTemplateColumns:size,
      //width:total + 'px',
    }
  }
  getColIndex(column){
    if(column.opened === false){return;}
    this.colIndex++;
    return this.colIndex;
  }
  render(){
    this.colIndex = -1;
    var {columns,checkboxColumn,addColumn} = this.context;
    return(
      <div className="grid-header" style={this.getStyle()}>
        {checkboxColumn && <GridTitle column={checkboxColumn} key={'checkbox-column'} colIndex={false} renderIndex={this.getColIndex(checkboxColumn)}/>}
        {addColumn && <GridTitle column={addColumn} key={'add-column'} colIndex={false} renderIndex={this.getColIndex(addColumn)}/>}
        {
          columns.map((column,i)=>{
            return (<GridTitle column={column} key={i} colIndex={i} renderIndex={this.getColIndex(column)}/>)
          })
        }
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
    var {column} = this.props;
    return {
      height:'36px',
      lineHeight:'36px',
      minWidth:column.minWidth?column.minWidth + 'px':undefined,
    }
  }
  dblClick(){
    var {columns,onChange,toggleColumns} = this.context;
    if(!toggleColumns){return;}
    var {column,colIndex} = this.props;
    if(column.opened === false || !column.width || column.width === 'auto'){return;}
    column.opened = false;
    onChange({columns})
  }
  openColumn(){
    var {columns,onChange} = this.context;
    var {column,colIndex} = this.props;
    column.opened = true;
    columns.splice(colIndex,1);
    var lastOpenedIndex = 0;
    for(var i = 0; i < columns.length; i++){
      if(columns[i].opened === false){
        break;
      }
      lastOpenedIndex++;
    }
    columns.splice(lastOpenedIndex,0,column);
    onChange({columns})
  }
  render(){
    var {column,colIndex = false,renderIndex} = this.props;
    var {width = 'auto',resizable = true} = column; 
    if(column.opened === false){return '';}
    return(
      <div className="grid-title" style={this.getStyle()} ref={this.dom} title={column.title} onDoubleClick={this.dblClick.bind(this)}>
        <GridFilter column={column} index={colIndex}/>
        {colIndex !== false && <GridMoveHandle column={column} index={renderIndex} colIndex={colIndex}/>} 
        {colIndex !== false && <GridResizeHandle column={column} index={renderIndex} disabled={!resizable || column.width === 'auto' || !column.width}/>}  
      </div>
    );
  }
}
export class GridMoveHandle extends Component{
  static contextType = GridContext;
  getShadow(e){
    var {column} = this.props;
    var {width,height} = this.so;
    var {x,y} = getClient(e);
    var style = `width:${width}px;left:${x - width / 2}px;top:${y - (height + 2)}px;`;
    return `<div class="grid-title grid-title-shadow" style="${style}">${column.title || ''}</div>`;
  }
  mouseDown(e){
    var {column,colIndex} = this.props;
    var {onChange} = this.context;
    if(!onChange || column.opened === false){return;}
    if(column.className === 'grid-cell-checkbox' || column.className === 'grid-cell-add'){return;}//شرط نادیده گرفتن ستون چک باکس
    var dom = $(e.target);
    this.so = {from:colIndex,width:dom.width(),height:dom.height()};
    $("body").append(this.getShadow(e));
    eventHandler('window','mousemove',$.proxy(this.mouseMove,this));
    eventHandler('window','mouseup',$.proxy(this.mouseUp,this));
    $('.grid-move-handle').on("mouseenter",(e)=>{
      this.so.to = parseInt($(e.target).attr('data-column-index'));
    });
  }
  mouseMove(e){
    var {width,height} = this.so,{x,y} = getClient(e);
    e.preventDefault();
    $(".grid-title-shadow").css({left:x - width / 2,top:y - (height + 2)});
  }

  mouseUp(e){
    var {columns,onChange} = this.context;
    eventHandler('window','mousemove',this.mouseMove,'unbind');
    eventHandler('window','mouseup',this.mouseUp,'unbind');
    $('.grid-move-handle').off("mouseenter");
    $(".grid-title-shadow").remove();
    var {from,to} = this.so;
    if(to === undefined || from === to || columns[to].opened === false){return;}
    const temp = columns[from];
    columns[from] = columns[to];
    columns[to] = temp;
    onChange({columns});
  }
  render(){
    var {colIndex,column} = this.props;
    var props = {
      className:'grid-move-handle',
      'data-column-index':colIndex,
      ['ontouchstart' in document.documentElement?'onTouchStart':'onMouseDown']:(e)=>{
        if (e.button === 2  ) return;
        this.mouseDown(e)
      }
    }
    return (
      <div {...props}>{column.title}</div>
    )
  }
}
export class GridResizeHandle extends Component{
  static contextType = GridContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  mouseDown(e){
    var {column,disabled} = this.props;
    if(disabled){return;}
    var {onChange,columns} = this.context;
    if(!onChange){return;}
    let width = typeof column.width === 'function'?column.width():column.width
    var dom = $(e.target);
    var grid = dom.parents('.grid-container');
    var gridRows = grid.find('.grid-rows');
    this.startOffset = {
        minWidth:column.minWidth || 40,
        width: parseInt(width),//عرض ستون
        x: getClient(e).x, // موقعیت در راستای افق
        size:this.context.size.split(' '),
        container:grid.find(".grid-header,.grid-row"),
        gridRowsWidth:parseInt(gridRows.css('width')),
        gridRows,
        newWidth:column.width
    }
    eventHandler('window','mousemove',$.proxy(this.mouseMove,this));
    eventHandler('window','mouseup',$.proxy(this.mouseUp,this));
  }
  mouseMove(e){
    e.preventDefault();
    var {rtl,theme} = this.context;
    var {index} = this.props;
    var so = this.startOffset;
    var offset = (so.x - getClient(e).x) * (rtl ? 1 : -1);
    var newWidth = so.width + offset;
    newWidth = newWidth < so.minWidth ?so.minWidth:newWidth;
    so.newWidth = newWidth;
    so.size[index] = newWidth + 'px';
    so.gridTemplateColumns = '';
    var total = theme.borderWidth;
    for(var i = 0; i < so.size.length; i++){
      var size = so.size[i];
      total += parseInt(size) + theme.borderWidth;
      so.gridTemplateColumns += size === 'auto'?'auto ':size + ' ';
    }
    so.container.css({gridTemplateColumns:so.gridTemplateColumns});
    so.gridRows.css('width',total)
  }
  mouseUp(e){
    eventHandler('window','mousemove',this.mouseMove,'unbind');
    eventHandler('window','mouseup',this.mouseUp,'unbind');
    const {onChange,columns} = this.context;
    var {newWidth} = this.startOffset;
    var {column} = this.props;
    column.width = newWidth;
    onChange({columns});
  }
  render(){
    var {disabled} = this.props;
    var props = {
      ref:this.dom,
      className:'resize-handle',
      style:{cursor:disabled?'not-allowed':undefined},
      ['ontouchstart' in document.documentElement?'onTouchStart':'onMouseDown']:(e)=>{
        if (e.button === 2  ) return;
        this.mouseDown(e)
      }
    }
    return (
      <div {...props}></div>
    )
  }
}
export class GridFilter extends Component{
  static contextType = GridContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  getOperators({type,operators}){
    var {translate} = this.context;
    var Operators = [ 
      {value:'Equal',translate:'Equal'},
      {value:'Not Equal',translate:'Not.Equal'},
      {value:'Contain',translate:'Contain',type:'string'},
      {value:'Not Contain',translate:'Not.Contain',type:'string'},
      {value:'Greater Than',translate:'Greater.Than',type:'number'},
      {value:'Less Than',translate:'Less.Than',type:'number'},
      {value:'Greater Equal Than',translate:'Greater.Equal.Than',type:'number'},
      {value:'Less Equal Than',translate:'Less.Equal.Than',type:'number'} 
    ];
    Operators = Operators.filter((df)=>{
      if(operators){return operators.indexOf(df.value) !== -1;}
      if(!df.type){return true}
      return df.type === type;
    });
    this.defaultOperator = Operators[0]?Operators[0].value:undefined;
    Operators = Operators.map((o,i)=><option key={i} value={o.value}>{translate(o.translate)}</option>);
    return Operators;
  }
  onChange(filter){
    var {columns,onChange,onFilterChange} = this.context;
    var {index} = this.props;
    columns[index].filter = filter;
    onChange({columns});
    if(onFilterChange){onFilterChange(getAllFilters(columns),this.context);}
  }
  getBoolean(booleanType){
    var {translate} = this.context;
    var {column} = this.props;
    var filter = {...column.filter};
    var {items = []} = filter;
    if(!items[0] || items[0].value === '' || items[0].value === undefined){return '';}
    return (
      <select 
        className='grid-boolean-type' 
        value={booleanType}
        onChange={(e)=>{
          var value = e.target.value;
          filter.booleanType = value;
          if(['and','or'].indexOf(value) === -1 && items.length === 2){
            filter.items.pop();
          }
          this.onChange(filter)
        }}
      >
        <option value=''></option>
        <option value='and'>{translate('And')}</option>
        <option value='or'>{translate('Or')}</option>
      </select>
    )
  }
  getItem({operator,value},index){
    var {column} = this.props;
    var filter = {...column.filter};
    var {template,type} = filter;
    return (
      <div className='grid-filter-item'>
        {
          this.operators.length > 0 &&
          <select className='grid-filter-operator' defaultValue={operator} onChange={(e)=>{
            filter.items = filter.items || [];
            if(!filter.items[index]){
              filter.items.push({operator:this.defaultOperator})
            }
            filter.items[index].operator = e.target.value;
            this.onChange(filter)
          }}>{this.operators}</select>
        }
        {
          !template && 
          <input 
            className='grid-filter-value' 
            type={type === 'number'?'number':'string'} 
            defaultValue={value}
            onChange={(e)=>{
              let val = e.target.value;
              clearTimeout(this.timeOut);
              this.timeOut = setTimeout(()=>{
                filter.items = filter.items || [];
                if(!filter.items[index]){
                  filter.items.push({operator:this.defaultOperator})
                }
                filter.items[index].value = val; 
                this.onChange(filter)    
              },1000) 
               
            }}
          />
        }
        {
          template && 
          template(value,(val)=>{
            filter.items = filter.items || [];
            if(!filter.items[index]){
              filter.items.push({operator:this.defaultOperator})
            }
            filter.items[index].value = val;
            this.onChange(filter)
          })
        }
        
      </div>
    )
  }
  getPopup({booleanType,type,items = []}){
    var {translate} = this.context;
    var firstItem = items[0] || {operator:this.defaultOperator};
    var secondItem = this.boolean?(items[1] || {operator:this.defaultOperator}):undefined;
    return (
      <div className='grid-filter-popup' ref={this.dom}>
        <div className='grid-filter-body'>
          {this.getItem(firstItem,0)}
          {this.getBoolean(booleanType)}
          {this.boolean && secondItem && this.getItem(secondItem,1)}
        </div>
        <div className='grid-filter-footer'>
          <div className='grid-filter-footer-button' onClick={this.removeItems.bind(this)}>{translate('Clear')}</div>
        </div>
      </div>
    )
  }
  removeItems(){
    var {column} = this.props,filter = {...column.filter};
    $(this.dom.current).find('.grid-filter-item').eq(0).find('input,select').val('');
    filter.items = [];
    filter.booleanType = 'none';
    this.onChange(filter);
  }
  render(){
    var {column} = this.props; 
    var {filter = {}} = column;
    var {rtl} = this.context;
    var {type,enable,booleanType,open,items} = filter;
    if(!enable){return null;}
    this.operators = [];
    if(type === 'number' || type === 'string'){
      this.operators = this.getOperators(filter)
      this.boolean = booleanType === 'and' || booleanType === 'or';
    }
    else{return null;}
    return (
      <RButton 
        className='grid-filter-button'
        iconClass={items && items.length?'fas fa-filter':'fas fa-filter'}
        openRelatedTo='.grid-container'
        open={open}
        rtl={rtl}
        items={()=>{
          return this.getPopup(filter)
        }}
      />
    )
  }
}
export class GridRows extends Component{
  static contextType = GridContext;
  // onGroupCheck(row,value){
  //   var {dataset} = this.props;
  //   for(var i = 0; i < row._childs.length; i++){
  //     setValueByField(row._childs[i],dataset._checked,value);
  //   }
  //   this.onChange({model:this.props.model});
  // }
  render(){
    var {onGroupToggle,rows,translate} = this.context;
    if(!Array.isArray(rows)){return getGridLoading();}
    if(rows.length === 0){return getGridNoData(translate('No.Data'));}
    return(
      <div className="grid-rows">
        {
          rows.map((row)=>row._groupField === undefined?<GridRow row={row} key={row._order}/>:<GroupRow {...row} key={row._parentField + row._groupField} toggle={onGroupToggle}/>)
        }
        <div className='grid-background'></div>
      </div>
    );
  }
}
export class GridRow extends Component{
  static contextType = GridContext;
  getStyle(){
    var {size} = this.context;
    return {
      gridTemplateColumns:size,
    };
  }
  isEnableInlineEdit(row,column){
    var {inlineEdit} = column;
    if(!inlineEdit){return false;}
    var enable = typeof inlineEdit.enable === 'function'?inlineEdit.enable(row,column):inlineEdit.enable;
    return enable !== false;
  }
  render(){
    var {columns,checkField,addField,addColumn,checkboxColumn,selected} = this.context;
    var {row} = this.props;
    var {error} = this.context; 
    var rowSelected = row._order === selected[0];
    var errorIndexes = error !== false && error.id === row._id?error.columns.map((c)=>parseInt(c.colIndex)):[];
    var cells = columns.map((column,i)=>{
      if(column.opened === false){return '';}
      var cellSelected = false,enableInlineEdit = false;
      var errorIndex = errorIndexes.indexOf(i);
      var message = errorIndex !== -1?error.columns[errorIndex].message:undefined;
      if(rowSelected){
        cellSelected = i === selected[1];
        enableInlineEdit = this.isEnableInlineEdit(row,column);
      }
      return <GridCell
        column={column}
        row={row}
        key={i}
        rowIndex={row._order}
        colIndex={i}
        message={message}
        rowSelected={rowSelected}
        cellSelected={cellSelected}
        inlineEdit={enableInlineEdit?column.inlineEdit:undefined}
      />
    }) 
    return(
      <div className={`grid-row`} style={this.getStyle()} data-row-index={row._order}>
        {checkField && <GridCell column={checkboxColumn} row={row} key={-2}/>}
        {addField && <GridCell column={addColumn} row={row} key={-1}/>}
        {cells}
      </div>
    );
  }
}
export class GroupRow extends Component{
  static contextType = GridContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  // componentDidUpdate(){
  //   if(this.rowSelected){
  //     //حتما باید گرید فوکوس شود تا کیبرد از کار نیفتد
  //     if(this.dom){$(this.dom.current).focus();}
  //   }
  // }
  changeOpened(){
    var {_groupField,_parentField,toggle} = this.props;
    toggle(_parentField + _groupField);
  }
  getStyle(){
    var {rtl} = this.context;
    var {groupLevel} = this.props;
    return {
      ['padding' + (rtl?'Right':'Left')]:groupLevel * 16
    }
  }
  render(){
    var {index,_checked,_groupField,opened} = this.props;
    var {checkField,group} = this.context;
    return(
      <div className={`grid-group-row`} ref={this.dom} data-group-index={index} style={this.getStyle()}>
        <div className='grid-group-row-container'>
          {
            checkField && group.checkable!== false && false && 
            <div className='grid-checkbox'>
              <GridCheckbox
                checked={_checked}
              />
            </div>
          }
          {
            group.collapsible !== false &&
            <GridGroupToggleIcon opened={opened} onChange={this.changeOpened.bind(this)}/>
          }
          <GridText text={_groupField}/>
        </div>
      </div>
    );
  }
}
export class GridCell extends Component{
  static contextType = GridContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  getStyle(){
    var {column,row} = this.props;
    var {rtl} = this.context;
    var style = {
      minWidth:column.minWidth?column.minWidth + 'px':undefined
    }
    if(column.treeMode){
      style['padding' + (rtl?'Right':'Left')] = row._level * 12
    }
    return style;

  }
  getClassName(){
    var {column,message,cellSelected,inlineEdit} = this.props;
    var className = 'grid-cell';
    className += column.treeMode?' grid-tree-cell':'';
    className += column.className?' ' + column.className:'';
    className += cellSelected?' selected':'';
    className += message?' hasError':'';
    className += inlineEdit?' grid-cell-inline-edit':'';
    return className;
  }
  getInlineInput(value = '',{type = 'text',options = []},colIndex){
    var {rtl,getInlineChanges} = this.context;
    if(type === 'text'){
      return (
        <input
          data-col-index={colIndex}
          type='text'
          style={{textAlign:rtl?'right':'left',padding:'0 6px',boxSizing:'border-box'}}
          defaultValue={value}
          className='inline-edit inline-edit-text'
          onChange={(e)=>getInlineChanges(colIndex,e.target.value)}
        />
      )
    }
    if(type === 'number'){
      return (
        <input
          data-col-index={colIndex}
          type='number'
          style={{textAlign:'center',padding:'0 6px',boxSizing:'border-box'}}
          defaultValue={value}
          className='inline-edit inline-edit-text'
          onChange={(e)=>getInlineChanges(colIndex,parseFloat(e.target.value))}
        />
      )
    }
    if(type === 'select'){
      return (
        <select
          data-col-index={colIndex}
          defaultValue={value}
          className='inline-edit inline-edit-select'
          onChange={(e)=>getInlineChanges(colIndex,e.target.value)}
        >
          {options.map((o,i)=><option key={i} value={o.value}>{o.text}</option>)}
        </select>
      )
    }
    if(type === 'checkbox'){

    }
  }

  getTemplate(row,column,value){
    var {treeTemplate} = this.context;
    var {rowSelected,inlineEdit,colIndex} = this.props;
    if(rowSelected && inlineEdit){
      return this.getInlineInput(value,inlineEdit,colIndex)
    }
    if(column.treeMode){
      return treeTemplate(value,{row,column},this.context);
    }
    if(!column.template){return value === undefined?'':value;}
    return column.template(value,{row,column},this.context)
  }
  click(e){
    if($(e.target).hasClass('grid-toggle-icon')){return;}
    var {select,selectable,columns} = this.context;

    if(!selectable || colIndex === false){return;}
    var {rowIndex = false,colIndex = false} = this.props;
    if(rowIndex === false || colIndex === false){return;}
    if(columns[colIndex].selectable === false){return;}
    select(rowIndex,colIndex);
  }
  componentDidUpdate(){
    var dom = $(this.dom.current);
    if(this.props.cellSelected){
      var inlineEdit = dom.find('.inline-edit');
      //حتما باید یا اینپوت اینلاین یا خود گرید فوکوس شود تا کیبرد از کار نیفتد
      if(inlineEdit.length){
        inlineEdit.focus().select();
      }
      else{
        dom.parents('.grid-container').focus();
      } 
    }
  }
  getValue(row,{isDefault,field}){
    if(field === undefined){return;}
    var {split,dataSplitter = 0} = this.context;
    var {length:splitLength = 0} = split;
    if(isDefault){return getValueByField(row,field)}
    return row._columnsValue[this.props.colIndex + (dataSplitter * splitLength)].value;
  }
  render(){
    var {row,column,colIndex,message} = this.props;
    var value = this.getValue(row,column);
    return(
      <div title={column.template?undefined:value} ref={this.dom}
        className={this.getClassName()}
        style={this.getStyle()} 
        data-col-index={colIndex}
        tabIndex={0}
        onClick={this.click.bind(this)}
      >
        {this.getTemplate(row,column,value)}
        {message && <GridCellError message={message}/>}
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

  render(){
    var {row,value,column} = this.props;
    var {onChange} = this.context;
    var icon = (column.icon?column.icon(row):false) || {};
    return(
        <Fragment>
          {onChange && <GridToggleIcon row={row}/>}
          {column.icon && <GridIcon className={icon.className} color={icon.color}/>}
          <GridText text={value}/>
        </Fragment>
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
    if(!row){return 'grid-toggle-icon opened'}
    var hasChild = row._childs && row._childs.length;
    var className = 'grid-toggle-icon';
    if(!hasChild){return className;}
    className += row._opened?' opened':' closed';
    return className;
  }
  click(){
    var {onChange,model} = this.context;
    var {row} = this.props;
    if(!row){this.props.onChange(); return;}
    if(!row._childs || !row._childs.length){return;}
    row._opened = !row._opened;
    onChange({model});
  }
  render(){
    var {row} = this.props;
    return (
      <div className={this.getClassName(row)} onClick={this.click.bind(this)}></div>
    );
  }
}
export class GridGroupToggleIcon extends Component{
  static contextType = GridContext;
  getClassName(opened){
    var className = 'grid-toggle-icon';
    className += opened?' opened':' closed';
    return className;
  }
  click(){
    var {index,onChange} = this.props;
    onChange(index);
  }
  render(){
    var {opened} = this.props;
    return (
      <div className={this.getClassName(opened)} onClick={this.click.bind(this)}></div>
    );
  }
}
export class GridCheckbox extends Component{
  change(value){
    value = typeof value === 'object'?value.target.checked:value
    this.props.onChange(value);
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