// var model = [
//   {
//     title:'target0',
//     code:'0',
//     status:4,
//     checked:true,
//     organ:{name:'organ-A'},
//     childs:[
//       {
//         code:'00',
//         title:'kpi0-0',
//         status:3,
//         checked:true,
//         childs:[
//           {title:'owner000',status:3,ownerRole:{type:'manager'}},
//           {title:'owner001',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner002',status:3},
//         ]
//       },
//       {
//         code:'01',
//         title:'kpi0-1',
//         status:2,
//         childs:[
//           {title:'owner010',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner011',status:3,ownerRole:{type:'manager'}},
//         ] 
//       }
//     ]
//   },
//   {
//     code:'1',
//     title:'target1',
//     status:3,
//     organ:{name:'organ-B'},
//     childs:[
//       {
//         code:'10',
//         title:'kpi1-0',
//         status:4,
//         childs:[
//           {title:'owner100',status:3,ownerRole:{type:'manager'}},
//         ]
//       },
//       {
//         code:'11',
//         title:'kpi1-1',
//         status:3,
//         childs:[
//           {title:'owner110',status:3,ownerRole:{type:'manager'}},
//           {title:'owner111',status:3},
//           {title:'owner112',status:3,ownerRole:{type:'manager'}},
//         ]
//       }
//     ]
//   },
//   {
//     title:'target2',
//     code:'2',
//     status:1,
//     organ:{name:'organ-A'},
//     childs:[
//       {
//         code:'20',
//         title:'kpi2-0',
//         status:3,
//         childs:[
//           {title:'owner200',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner201',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner202',status:3,ownerRole:{type:'manager'}},
//         ]
//       },
//       {
//         code:'21',
//         title:'kpi2-1',
//         status:2, 
//         childs:[
//           {title:'owner210',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner211',status:3,ownerRole:{type:'manager'}},
//           {title:'owner212',status:3,ownerRole:{type:'assistance'}},
//         ]
//       }
//     ]
//   },
//   {
//     code:'3',
//     title:'target3',
//     status:3,
//     organ:{name:'organ-C'},
//     childs:[
//       {
//         code:'30',
//         title:'kpi3-0',
//         status:4,
//         childs:[
//           {title:'owner300',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner301',status:3,ownerRole:{type:'assistance'}},
//           {title:'owner302',status:3,ownerRole:{type:'manager'}},
//           {title:'owner303',status:3,ownerRole:{type:'manager'}},
//           {title:'owner304',status:3,ownerRole:{type:'assistance'}},
          
//         ]
//       },
//       {
//         code:'31',
//         title:'kpi3-1',
//         status:3,
//         childs:[
//           {title:'owner310',status:3,ownerRole:{type:'manager'}},
//           {title:'owner311',status:3,ownerRole:{type:'manager'}},
//           {title:'owner312',status:3,ownerRole:{type:'manager'}},
//           {title:'owner313',status:3,ownerRole:{type:'manager'}},
//         ]
//       }
//     ]
//   },
//   {
//     code:'4',
//     title:'target4',
//     status:1,
//     organ:{name:'organ-B'},
//     childs:[
//       {
//         code:'40',
//         title:'kpi4-0',
//         status:4,
//         childs:[
//           {title:'owner400',status:3,ownerRole:{type:'manager'}},
//           {title:'owner401',status:3,ownerRole:{type:'manager'}},
//           {title:'owner402',status:3,ownerRole:{type:'manager'}},
//           {title:'owner403',status:3,ownerRole:{type:'manager'}},
//           {title:'owner404',status:3,ownerRole:{type:'manager'}},
//         ]
//       },
//       {
//         code:'41',
//         title:'kpi4-1',
//         status:3,
//         childs:[
//           {title:'owner410',status:3,ownerRole:{type:'manager'}},
//           {title:'owner411',status:3,ownerRole:{type:'manager'}},
//           {title:'owner412',status:3,ownerRole:{type:'manager'}},
//           {title:'owner413',status:3,ownerRole:{type:'manager'}},
//         ]
//       }
//     ]
//   }
// ];
var model = [
  {title:'kpi0-0',code:'00',status:3,checked:true,parent:'target0'},
  {title:'owner000',status:3,ownerRole:{type:'manager'},parent:'kpi0-0'},
  {title:'owner001',status:3,ownerRole:{type:'assistance'},parent:'kpi0-0'},
  {title:'owner002',status:3,parent:'kpi0-0'},
  {title:'kpi0-1',code:'01',status:2,parent:'target0'},
  {title:'owner010',status:3,ownerRole:{type:'assistance'},parent:'kpi0-1'},
  {title:'owner011',status:3,ownerRole:{type:'manager'},parent:'kpi0-1'},
  {title:'target1',code:'1',status:3,organ:{name:'organ-B'}},
  {title:'kpi1-0',code:'10',status:4,parent:'target1'},
  {title:'owner100',status:3,ownerRole:{type:'manager'},parent:'kpi1-0'},
  {title:'kpi1-1',code:'11',status:3,parent:'target1'},
  {title:'owner110',status:3,ownerRole:{type:'manager'},parent:'kpi1-1',},
  {title:'owner111',status:3,parent:'kpi1-1',},
  {title:'owner112',status:3,ownerRole:{type:'manager'},parent:'kpi1-1',},
  {title:'target2',code:'2',status:1,organ:{name:'organ-A'}},
  {title:'kpi2-0',code:'20',status:3,parent:'target2'},
  {title:'owner200',status:3,ownerRole:{type:'assistance'},parent:'kpi2-0'},
  {title:'owner201',status:3,ownerRole:{type:'assistance'},parent:'kpi2-0'},
  {title:'owner202',status:3,ownerRole:{type:'manager'},parent:'kpi2-0'},
  {title:'kpi2-1',code:'21',status:2,parent:'target2'}, 
  {title:'owner210',status:3,ownerRole:{type:'assistance'},parent:'kpi2-1'},
  {title:'owner211',status:3,ownerRole:{type:'manager'},parent:'kpi2-1'},
  {title:'owner212',status:3,ownerRole:{type:'assistance'},parent:'kpi2-1'},
  {title:'owner302',status:3,ownerRole:{type:'manager'},parent:'kpi3-0'},
  {title:'owner312',status:3,ownerRole:{type:'manager'},parent:'kpi3-1'},
  {title:'owner303',status:3,ownerRole:{type:'manager'},parent:'kpi3-0'},
  {title:'owner304',status:3,ownerRole:{type:'assistance'},parent:'kpi3-0'},
  {title:'kpi3-1',code:'31',status:3,parent:'target3'},
  {title:'kpi4-0',code:'40',status:4,parent:'target4'},
  {title:'owner400',status:3,ownerRole:{type:'manager'},parent:'kpi4-0'},
  {title:'owner401',status:3,ownerRole:{type:'manager'},parent:'kpi4-0'},
  {title:'owner301',status:3,ownerRole:{type:'assistance'},parent:'kpi3-0'},
  {title:'owner311',status:3,ownerRole:{type:'manager'},parent:'kpi3-1'},
  {title:'owner403',status:3,ownerRole:{type:'manager'},parent:'kpi4-0'},
  {title:'owner313',status:3,ownerRole:{type:'manager'},parent:'kpi3-1'},
  {title:'target4',code:'4',status:1,organ:{name:'organ-B'}},
  {title:'owner404',status:3,ownerRole:{type:'manager'},parent:'kpi4-0'},
  {title:'kpi4-1',code:'41',status:3,parent:'target4'},
  {title:'target0',code:'0',status:4,checked:true,organ:{name:'organ-A'}},
  {title:'owner410',status:3,ownerRole:{type:'manager'},parent:'kpi4-1'},
  {title:'owner411',status:3,ownerRole:{type:'manager'},parent:'kpi4-1'},
  {title:'owner402',status:3,ownerRole:{type:'manager'},parent:'kpi4-0'},
  {title:'owner310',status:3,ownerRole:{type:'manager'},parent:'kpi3-1'},
  {title:'owner412',status:3,ownerRole:{type:'manager'},parent:'kpi4-1'},
  {title:'target3',code:'3',status:3,organ:{name:'organ-C'}},
  {title:'kpi3-0',code:'30',status:4,parent:'target3'},
  {title:'owner300',status:3,ownerRole:{type:'assistance'},parent:'kpi3-0'},
  {title:'owner413',status:3,ownerRole:{type:'manager'},parent:'kpi4-1'},
];
export default model;