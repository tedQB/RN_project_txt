import Types from '../types'
import ThemeDao from "../../expand/dao/ThemeDao";


/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme){
    return {
        type:Types.THEME_CHANGE,
        theme:theme
    }
}


/**
 * 初始化主题
 * @param theme
 * @returns {{type: string, theme: *}}
 */

export function onThemeInt(){
    return dispatch=>{
        //ThemeDao().getTheme() 拿到默认的主题色 Default: '#2196F3',
        new ThemeDao().getTheme().then((data)=>{
            dispatch(onThemeChange(data))
        })
    }
}

/**
 * 显示自定义浮动层
 * @param show
 * @returns {{customThemeViewVisible: *, type: *}}
 */
export function onShowCustomThemeView(show){
    return {
        type:Types.SHOW_THEME_VIEW,
        customThemeViewVisible:show
    }
}