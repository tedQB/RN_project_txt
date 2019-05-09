import {
    AsyncStorage,
} from 'react-native';

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {
    constructor(flat){
        this.favoriteKey = FAVORITE_KEY_PREFIX + flat;
    }


    /**
     * 收藏项目,保存收藏的项目
     * @param key 项目id
     * @param value 收藏的项目
     * @param callback
     */

    saveFavoriteItem(key,value,callback){
        AsyncStorage.setItem(key,value,(error,result)=>{
            if(!error){
                this.updateFavoriteKeys(key,true);
            }
        })
    }
    /**
     * 更新Favorite key集合
     * @param key
     * @param isAdd true 添加,false 删除
     * **/

    updateFavoriteKeys(key,isAdd){
        AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
            if(!error){
                let favoriteKey = [];
                if(result) {
                    favoriteKey = JSON.parse(result);
                }
                let index = favoriteKey.indexOf(key);
                if(isAdd){
                    if (index === -1) favoriteKeys.push(key);
                }else{
                    if (index !== -1) favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));//将更新后的key集合保存到本地
            }
        })
    }
    /**
     * 获取收藏的Repository对应的key
     * @return {Promise}
     */
    getFavoriteKeys(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * 取消收藏,移除已经收藏的项目
     * @param key 项目 id
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, false);
            }
        });
    }

    /**
     * 获取所有收藏的项目
     * @return {Promise}
     */


}