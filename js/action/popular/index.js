import Types from '../types'
import DataStore, { FLAG_STORAGE } from "../../expand/dao/DataStore";
import {_projectModels, handleData} from '../ActionUtil'

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {function(*=)}
 */

export function onRefreshPopular(storeName, url, pageSize, favoriteDao){

    return dispatch =>{
        dispatch({
            type:Types.POPULAR_REFRESH,
            storeName:storeName
        });

        let dataStore = new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular) //异步action于数据流
            .then(data=>{
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName,data, pageSize, favoriteDao)
            })
            .catch(error=>{
                console.log(error);
                dispatch({
                    type:Types.LOAD_POPULAR_FAIL,
                    storeName,
                    error
                })
            })

    }
}



