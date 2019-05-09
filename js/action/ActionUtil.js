/**
 * 处理下拉刷新的数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 */

import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Utils";
import Types from "./types";

/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 * @param params 其他参数
 */

function handleData(actionTypes, dispatch, storeName, data, pageSize, favoriteDao, params ){
    let fixItems = [];
    if(data&&data.data){
        if(Array.isArray(data.data)){
            fixItems = data.data;
        }else if(Array.isArray(data.data.items)){
            fixItems = data.data.items;
        }
    }
    //第一次要加载的数据
    let showItems = pageSize>fixItem.length?fixItems:fixItems.slice(0,pageSize);

    _projectModels(showItems,favoriteDao,projectModels=>{
        dispatch({
            type:actionTypes,
            items:fixItems,
            projectModels:projectModels,
            storeName,
            pageIndex:1,
            ...params
        })
    })

}


/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */

export async function _projectModels(showItems, favoriteDao, callback){
    let keys=[];
    try{
        //获取收藏的key
        keys = await favoriteDao
    }
}