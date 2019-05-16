import React, { Component } from 'react';
import {FlatList, Platform, StyleSheet, Text, View, Button, RefreshControl } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import PopularItem from '../common/PopularItem'
import TrendingItem from "../common/TrendingItem";
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar';
import FavoriteUtil from "../util/FavoriteUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {connect} from "react-redux";
import actions from '../action/index'

type Props = {};


class FavoritePage extends Component<Props> {
    constructor(props){
        super(props);

    }
    render(){
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme,
            barStyle:'light-content'
        }
        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            style={theme.styles.navBar}
            />
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
            'Popular':{
                screen:props=><FavoriteTabPage
                    {...props}
                    flag={FLAG_STORAGE.flag_popular}
                    theme={theme}
                />,
                navigationOptions:{
                    title:'最热'
                }
            },
            'Trending':{
                screen:props=><FavoriteTabPage
                    {...props}
                    flag={FLAG_STORAGE.flag_trending}
                    theme={theme}
                />,
                navigationOptions:{
                    title:'趋势'
                }
            }
        },{

            tabBarOptions:{
                tabStyle:styles.tabStyle,
                upperCaseLabel:false,
                style:{
                    backgroundColor:theme.themeColor,
                    height:45,
                },
                indicatorStyle:styles.indicatorStyle,
                labelStyle:styles.labelStyle
            }
        }));
        return <View style={styles.container}>
            {navigationBar}
            <TabNavigator/>
        </View>
    }

}

const mapFavoriteStateToProps = state => ({
    theme: state.theme.theme,
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapFavoriteStateToProps)(FavoritePage);

class FavoriteTab extends Component<Props>{
    constructor(props){
        super(props);
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount(): void {
        this.loadData(true);
        EventBus.getInstance().addListener(
            EventTypes.bottom_tab_select, this.listener=data=>{
                if(data.to===2){
                    this.loadData(false)
                }
            })
    }
    componentWillUnmount(): void {
        EventBus.getInstance().removeListener(this.listener);
    }

    loadData(isShowLoading){
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName,isShowLoading)
    }

    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
            }
        }
        return store;
    }

    onFavorite(item,isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.props.flag);
        if(this.storeName === FLAG_STORAGE.flag_popular){
            EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
        }else{
            EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending);
        }
    }

    renderItem(data){
        const {theme} = this.props;
        const item = data.item;
        const Item = this.storeName === FLAG_STORAGE.flag_popular?PopularItem:TrendingItem;
        return <Item
            theme = {theme}
            projectModel = {item}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                    theme,
                    projectModel: item,
                    flag: this.storeName,
                    callback,
                }, 'DetailPage')
            }}
            onFavorite = {(item,isFavorite)=>this.onFavorite(item,isFavorite)}
        />
    }

    render(){
        let store = this._store();
        const {theme} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data = {store.projectModels}
                    renderItem={data=>this.renderItem(data)}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={theme}
                            colors={[theme]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData(true)}
                            tintColor={theme}
                        />
                    }
                />
                <Toast ref={'toast'}
                        position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    favorite: state.favorite,
});

const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),
});

const FavoriteTabPage = connect(mapStateToProps,mapDispatchToProps)(FavoriteTab)

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tabStyle:{
        padding:0

    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle: {
        fontSize:13,
        marginTop:12,
        marginBottom:6
    },
    indicatorContainer:{
        alignItems:'center'
    },
    indicator:{
        color:'red',
        margin:10
    }

})


