// co
import { combineReducers } from 'redux';
import * as actions from '../actions/setting'
let initstate = {
    "name": 
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        id: 'name',
        type: 'text',
        
    },
"tel":
    {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
        id:'tel',
        type: 'number',
        sorter: (a, b) => a.tel - b.tel,
    },

    "id": 
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        id: 'id',
        type: 'text',
        sorter: (a, b) => a.id - b.id,
    }
}

//function fields(state=initstate, action) {
function fields(state={}, action) {
    switch(action.type) {
        case actions.ADD_COLL:{
            const {id} = action.field;
            return {
                ...state,
                [id]:action.field
              }
        }
        case actions.DEL_COLL:{
            const {id} = action;
           
            return Object.keys(state)
                .filter(v => v !== id)
                .reduce((re, item) => {
                    re[item] = state[item];
                    return re;
                }, {})
        }
        case actions.GET_ALL_COLL:{
            const {columns} = action;
            return columns.reduce((acc,item)=>{
                acc[item.id] = item;
                return acc;
            },{});
        }
        default:
            return state
    }
}



export default combineReducers({
    fields    
});