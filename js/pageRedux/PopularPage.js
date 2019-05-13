import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList,RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar';
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import Ionicons from 'react-native-vector-icons/Ionicons';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR='red';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
type Props = {};
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";



class PopularPage extends Component<Props> {
    constructor(props){ 
        super(props);
        console.log(NavigationUtil.navigation);
        this.tabNames = ['Java','Android','IOS','React','React Native','PHP'];
        const {onLoadLanguage} = this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_key);
        console.log('PopularPageBegin',this.props)
    }


    _genTabs(){ 
        const tabs = {};
        const {keys,theme} = this.props;
        console.log('_genTabs',keys);
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                //screen:PopularTab,
                screen: props => <PopularTabPage {...props} tabLabel={item} />,
                navigationOptions:{
                    title:item
                }
            }
        });
        return createAppContainer(createMaterialTopTabNavigator(tabs, {
            //设置tab样式。
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled:true,
                style:{
                    backgroundColor:'#678',
                    height:45
                },
                labelStyle: styles.labelStyle,
                indicatorStyle: styles.indicatorStyle
            }
        }));
    }
    _topNavigator() {
        //简单tab 例子
        return createAppContainer(createMaterialTopTabNavigator({ 
            PopularTab1:{
                screen:PopularTabCao,
                navigationOptions:{
                    title:'Tab1'
                }
            },
            PopularTab2: {
                screen: PopularTabCao,
                navigationOptions: {
                    title: 'Tab2'
                }
            },            
        }))
    }
    renderRightButton(){
        return <TouchableOpacity>
            <View style={{padding:5,marginRight:8}}>
                <Ionicons
                    name={'ios-search'}
                    size={24}
                    style={{
                        marginRight:8,
                        alignSelf:'center',
                        color:'white'
                    }}
                    />
            </View>
        </TouchableOpacity>
    }
    render() {
        const HeadTab = this._genTabs();
        let themeColor = THEME_COLOR
        let statusBar = {
            backgroundColor:themeColor,
            barStyle:'light-content',
        }
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            rightButton={this.renderRightButton()}
            />;

        return (
            <View style={{flex:1, marginTop:30 }}>
                {navigationBar}
                <HeadTab />
            </View>
        )
    }
}

const mapPopularStateToProps = state => ({
    keys: state.language.keys,
    theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);

class PopularTabCao extends Component<Props>{


    render(){
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>

                <Text onPress={()=>{
                    NavigationUtil.goPage({
                        navigation:this.props.navigation,
                        tabLabel:tabLabel
                    },'DetailPage')
                }}>点击跳转到详情页面???</Text>
            </View>
        )
    }
}

const pageSize = 10;//设为常量，防止修改

class PopularTab extends Component<Props>{
    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount(){
        this.loadData();
    }

    renderItem(data){
        const item = data.item;
        const {theme} = this.props;
        return <PopularItem
            projectModel={item}
            onSelect={(callback)=>{
                NavigationUtil.goPage({
                    theme,
                    projectModel:item,
                    flag:FLAG_STORAGE.flag_popular,
                    callback,
                },'DetailPage')

            }}
            themeColor = {THEME_COLOR}
            onFavorite={(item,isFavorite)=>
                FavoriteUtil.onFavorite(
                    favoriteDao,
                    item,
                    isFavorite,
                    FLAG_STORAGE.flag_popular
                )
            }
        />
    }

    _store(){
        const {popular} = this.props;
        let store = popular[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading:false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true, //默认隐藏加载更多
            }
        }
        return store

    }

    genIndicator(){
        return this._store().hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    loadData(loadMore,refreshFavorite){
        const {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} = this.props;
        const store =this._store();
        const url = this.genFetchUrl(this.storeName);
        console.log('store.pageIndex',store.pageIndex)

        if(loadMore){
            onLoadMorePopular(
                this.storeName,
                ++store.pageIndex,
                pageSize,
                store.items,
                favoriteDao,
                callback=>{
                    this.refs.toast.show('没有更多了');
                })
        }else if(refreshFavorite){
            onFlushPopularFavorite(this.storeName,store.pageIndex,pageSize,store.items,favoriteDao)
        }else{
            onRefreshPopular(this.storeName,url,pageSize,favoriteDao)
        }

    }

    genFetchUrl(key){
        return URL+key+QUERY_STR;
    }

    render(){
        let store = this._store();

        return (<View style={{flex:1, marginTop:30 }}>

            <FlatList
                data = {store.projectModels}
                renderItem={data=>this.renderItem(data)}
                //keyExtractor={item=>''+item.item.id}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        titleColor={THEME_COLOR}
                        colors={[THEME_COLOR]}
                        refreshing={store.isLoading}
                        onRefresh={()=>this.loadData()}
                        tintColor={THEME_COLOR}
                    />
                }
                ListFooterComponent={()=>this.genIndicator()}
                onEndReached={()=>{
                    console.log('---onEndReached----');
                    setTimeout(()=>{
                        if(this.canLoadMore){
                            this.loadData(true);
                            this.canLoadMore = false;
                        }
                    },100);

                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={()=>{
                    this.canLoadMore =true;
                    console.log('---onMomentumScrollBegin----');
                }}

            />
            <Toast ref={'toast'}
                   position={'center'}
            />
        </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch =>({
    //onRefreshPopular: (storeName, url) => dispatch(actions.onRefreshPopular(storeName,url))
    onRefreshPopular:(storeName,url,pageSize,favoriteDao)=>dispatch(actions.onRefreshPopular(storeName,url,pageSize,favoriteDao)),
    onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callBack)=>dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao,callBack)),
    onFlushPopularFavorite:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(actions.onFlushPopularFavorite(storeName,pageIndex,pageSize,items,favoriteDao)),
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tabStyle:{ 
        minWidth:50
    },
    indicatorStyle:{ 
        height:2,
        backgroundColor:'#fff'
    },
    indicatorContainer:{
        alignItems:'center'
    },
    labelStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6
    },
    indicator:{
        color:'red',
        margin:10
    }
});
