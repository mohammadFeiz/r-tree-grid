import $ from 'jquery';
import React from 'react';
export function eventHandler(selector, event, action,type = 'bind'){
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = 'ontouchstart' in document.documentElement ? me[event] : event;
    var element = typeof selector === "string"?
    (selector === "window"?$(window):$(selector)):
    selector;
    element.unbind(event, action);
    if(type === 'bind'){element.bind(event, action)}
  }
  export function getClient(e){
    return 'ontouchstart' in document.documentElement?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}
  }
  export function searchTree(nodes, keyword,field){
    let newNodes = [];
    for (let n of nodes) {
      let value = getValueByField(n,field);
      if (n._childs) {
        const nextNodes = searchTree(n._childs, keyword,field);
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
  export function getValueByField(obj,field){
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
  
  export function convertFlatToComposite(model,idProp,parentIdProp){
    var convertModelRecursive = (model,parentId,parentObject)=>{
      for(var i = 0; i < model.length; i++){
        var row = model[i];
        row._parent = getValueByField(row,parentIdProp);
        if(row._parent !== parentId){continue;}
        row._id = getValueByField(row,idProp);
        row._childs = [];
        parentObject.push(row);
        convertModelRecursive(model,row._id,row._childs)
      }
    }
    var result = [];
    convertModelRecursive(model,undefined,result);
    return result;
  }

  export function setValueByField(obj,field,value){
    var fields = field.split('.');
    var node = obj;
    for(var i = 0; i < fields.length - 1; i++){
      if(node[fields[i]] === undefined){return;}
      node = node[fields[i]];
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }

  export function searchComposite(model,query,childsProp = 'childs'){
    var result;
    var searchRowRecursive = (data,query)=>{
        if(result !== undefined){return;}
        for(var i = 0; i < data.length; i++){
            if(result !== undefined){break;}
            var row = data[i];
            for(var prop in query){
                var value = getValueByField(row,prop);
                if(value !== query[prop]){continue;}
                result = row;
                break;
            }
            if(row[childsProp] && row[childsProp].length){
                searchRowRecursive(row[childsProp],query);
            }
        }
    }
    searchRowRecursive(model,query);
    return result;
  }
  
  export function getFilterResult(filter,columnValue){
    if(!filter || !filter.enable || !filter.items || !filter.items.length){return true;}
    function getFilterItemResult(item){
      if(item.value === '' || item.value === undefined){return true;}
      var {action} = filter;
      if(action){return action(item,columnValue);}
      var {operator,value} = item;
      if(operator === 'Equal'){return value === columnValue}
      if(operator === 'Not Equal'){return value !== columnValue}
      if(operator === 'Contain'){return columnValue.indexOf(value) !== -1;}
      if(operator === 'Not Contain'){return columnValue.indexOf(value) === -1;}
      if(operator === 'Greater Than'){return columnValue > value;}
      if(operator === 'Greater Equal Than'){return columnValue >= value;}
      if(operator === 'Less Than'){return columnValue < value;}
      if(operator === 'Less Equal Than'){return columnValue <= value;}
    }
    var result1 = getFilterItemResult(filter.items[0]);
    if(filter.items[1]){
      var result2;
      if(filter.booleanType === 'and'){
        result2 = getFilterItemResult(filter.items[1]);
        return result1 && result2;
      }
      else if(filter.booleanType === 'or'){
        result2 = getFilterItemResult(filter.items[1]);
        return result1 || result2;
      }
      else{
        return result1;
      }
    }
    else{
      return result1;
    }
  }

  export function getRowsByPaging(rows,paging,rootLength){
    if(rows.length === 0){return []}
    if(!paging || paging.onChange){return rows;}
    var {size,number} = paging;
    var count = Math.ceil(rootLength / size);
    if(number > count){number = count;}
    var result = [];
    var rowIndex = 0;
    var rootIndex = -1 ;//ایندکس هر روت که همه فرزندانش هم این ایندکس را می گیرند
    var startIndex = (number - 1) * size;
    var endIndex = startIndex + size - 1;
    for(var i = 0; i < rows.length; i++){
      var row = rows[i];
      if(row._level === 0){rootIndex++;} 
      if(rootIndex < startIndex){continue;}
      if(rootIndex > endIndex){break;}
      row._order = rowIndex;
      rowIndex++;
      result.push(row);
    }
    return result;
  }
  export function getRowsByGroup(rows,group,groupsOpen){
    if(rows.length === 0){return []}
    if(!group || !group.fields || !group.fields.length){return rows;}
    function msf(obj,groupLevel,_parentField = ''){
      if(Array.isArray(obj)){
        groupedRows = groupedRows.concat(obj.map((o)=>{o._order = rowIndex; rowIndex++; return o}));
      }
      else{
        let index = 0
        for(var prop in obj){
          groupsOpen[_parentField + prop] = groupsOpen[_parentField + prop] === undefined?true:groupsOpen[_parentField + prop];
          groupedRows.push({_groupField:prop,groupLevel,opened:groupsOpen[_parentField + prop],_parentField});
          index++;
          if(groupsOpen[_parentField + prop]){
            msf(obj[prop],groupLevel + 1,_parentField + prop);
          }
        } 
      }
    }
    let obj = {};
    for(let i = 0; i < rows.length; i++){
      let row = rows[i];
      let v = row._groupValue;
      if(!v){continue;}
      let a = obj;
      for(let j = 0; j < v.length; j++){
        let field = v[j]; 
        if(j === v.length - 1){
          a[field] = a[field] || [];
          a[field].push(row)
        } 
        else{
          a[field] = a[field] || {};
          a = a[field];
        }
      }
    }
    var groupedRows = [];
    var rowIndex = 0;
    var groupLevel = 0;
    msf(obj,groupLevel)
    return groupedRows;
  }
  
  export function getGridNoData(text){
    return (
      <div className='grid-no-data' style={{background:'#ddd',position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <svg style={{left:'calc(50% - 50px)',top:'calc(50% - 50px)',width:'40px',height:'50px'}}>
          <path stroke={'#fff'} strokeWidth={5} fill='none' 
          d='M5 5 L25 5 L35 15 L35 45 L5 45Z'/>
        </svg>
        <span style={{color:'#fff',fontSize:'14px',height:'24px',lineHeight:'24px'}}>{text}</span> 
      </div>
    )
  }

  export function getDictionary(){
    return {
      'Add.Filter':{en:'Add Filter',fa:'افزودن فیلتر'},
      'Equal':{en:'Equal',fa:'مساوی'},
      'Not.Equal':{en:'Not Equal',fa:'نا مساوی'},
      'Contain':{en:'Contain',fa:'شامل'},
      'Not.Contain':{en:'Not Contain',fa:'شامل نیست'},
      'Greater.Equal.Than':{en:'Greater Equal Than',fa:'بزرگتر مساوی با'},
      'Greater.Than':{en:'Greater Than',fa:'بزرگتر از'},
      'Less.Equal.Than':{en:'Less Equal Than',fa:'کوچکتر مساوی با'},
      'Less.Than':{en:'Less Than',fa:'کوچکتر از'},
      'Filter':{en:'Filter',fa:'فیلتر'},
      'Clear':{en:'Clear',fa:'حذف'},
      'And':{en:'And',fa:'و'},
      'Or':{en:'Or',fa:'یا'},
      'Next.Page':{en:'Next Page',fa:'صفحه بعدی'},
      'Previous.Page':{en:'Previous Page',fa:'صفحه قبلی'},
      'First.Page':{en:'First Page',fa:'صفحه اول'},
      'Last.Page':{en:'Last Page',fa:'صفحه آخر'},
      'Page.Size':{en:'Page Size',fa:'اندازه صفحه'},
      'No.Data':{en:'No Data',fa:'دیتایی برای نمایش موجود نیست'},
      'No.Columns':{en:'No Columns',fa:'ستونی برای نمایش موجود نیست'},
    };
  }

  export function getAllFilters(columns){
    var {columns} = this.props; //برای اینکه در حالت اسپلیت فیلتر ها را از هر دو گرید جمع کنیم این تابع بالا نوشته شده
    var Columns = columns.filter((c)=>c.filter && c.filter.enable && c.filter.items && c.filter.items.length)
    var Filters = [];
    for(var i = 0; i < Columns.length; i++){
      let {field,filter,id} = Columns[i];
      let {booleanType,items} = filter;
      Filters.push({id,field,booleanType,items})
    }
    return Filters;
  }

  export function getGridLoading(){
    return <i className="mdi mdi-loading mdi-spin grid-loading"></i>
  }