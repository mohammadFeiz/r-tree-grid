import React, { Component } from 'react';
import { render } from 'react-dom';
import Grid from './grid';
import columns from './columns';
import model from './model';
import './grid.css';

class App extends Component {
  constructor(props) {
    super(props);
    var m = this.convertModel(model,{_childs:'childs',_parent:'parent',_id:'title'});
    console.log(m)
    this.state = {
      model:m,
      columns,rtl:false
    };
  }
  convertModel(model,dataset){
    function convertModelRecursive(model,parent,result){
      for(var i = 0; i < model.length; i++){
        var row = model[i];
        if(row[dataset._parent] === parent){
          row[dataset._childs] = row[dataset._childs] || [];
          result.push(row);
          //model.splice(i,1);
          //i--;
          convertModelRecursive(model,row[dataset._id],row.childs);
        }
      }
    }
    var convertedModel = [];
    convertModelRecursive(model,undefined,convertedModel);
    return convertedModel;
  }
  
  render() {
    return (
      <Grid 
        {...this.state}
        dataType='flat'
        treeField='title'
        groupField='organ.name'
        theme={{borderWidth:1}}
        rtl={false}
        onchange={(obj)=>{this.setState(obj)}}
        dataset={{_childs:'childs',_checked:'checked',_id:'title',_parent:'parent'}}
        checkField={{
          disabled:function(row){
            return false
          },
        }}
      />
    );
  }
}

render(<App />, document.getElementById('root'));
