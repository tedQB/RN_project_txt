import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    View,
    FlatList,
    RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index'
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const URL = 'https://github.com/trending/';
import TrendingDialog, {TimeSpans} from '../common/TrendingDialog'

import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ArrayUtil from "../util/ArrayUtil";
import FavoriteUtil from "../util/FavoriteUtil";
// import EventBus from "react-native-event-bus";
// import EventTypes from "../util/EventTypes";

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
type Props = {};

class TrendingPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            timeSpan:TimeSpans[0]
        };
        const {onLoadLanguage} = this.props;
        this.props.onLoadLanguage(FLAG_LANGUAGE.flag_language);
        this.preKeys = [];
        const {theme,keys} = this.props;
        console.log('keys1',keys);

    }

    _genTabs() {
        const tabs = {};
        const {keys, theme} = this.props;
        this.preKeys = keys;
        keys.forEach((item, index) => {
            tabs[`tab${index}`] = {
                //screen:PopularTab,
                screen: props => <TrendingTabPage
                    {...props}
                    timeSpan={this.state.timeSpan}
                    tabLabel={item.name}
                    theme={theme}/>,
                navigationOptions: {
                    title: item.name
                }
            }
        });
        return tabs;
    }


    renderTitleView() {
        return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => this.dialog.show()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400'
                    }}>趋势 {this.state.timeSpan.showText}</Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab
        });
        //DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
    }

    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog}
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />
    }

    _tabNav(){
        const {theme} = this.props;

        //优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
        this.theme = theme;
        this.tabNav = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,//是否使标签大写，默认为true
                    scrollEnabled: true,//是否支持 选项卡滚动，默认false
                    style: {
                        backgroundColor: theme.themeColor,//TabBar 的背景颜色
                        height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                    },
                    indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                    labelStyle: styles.labelStyle,//文字的样式
                },
                lazy: true
            }
        ));
        return this.tabNav;
    }

    render(){
        const {keys, theme} = this.props;
        console.log('keys2',keys);
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        };
        let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{height:50}}
        />;
        const TabNavigator = keys.length?createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
                //设置tab样式。
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#678',
                        height:40
                    },
                    labelStyle: styles.labelStyle,
                    indicatorStyle: styles.indicatorStyle
                },
                lazy: true
            }
        )):null;

        return <View style={styles.container}>
            {navigationBar}
            {TabNavigator && <TabNavigator/>}
            {this.renderTrendingDialog()}
        </View>
    }
}

//reduce数据结果,reduce数据结果返回是直接写到state里的，从combineReducers里去拿
const mapTrendingStateToProps = function(state){
    return {
        keys: state.language.languages,
        theme: state.theme.theme,
    };
}
const mapTrendingDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});

export default connect(mapTrendingStateToProps, mapTrendingDispatchToProps)(TrendingPage);


const pageSize = 10; //设为常量，防止修改
class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel, timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
        this.isFavoriteChanged = false;

    }

    componentDidMount(){
        this.loadData();

    }

    componentWillUnmount() {

    }

    loadData(loadMore, refreshFavorite) {
        const {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreTrending(
                this.storeName,
                ++store.pageIndex,
                pageSize,
                store.items,
                favoriteDao,
                callback => {
                    this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            onFlushTrendingFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
            this.isFavoriteChanged = false;
        } else {
            onRefreshTrending(this.storeName, url, pageSize, favoriteDao)
        }
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(key) {
        return URL + key + '?' + this.timeSpan.searchText;
    }

    renderItem(data){
        const item = data.item;
        const {theme} = this.props;
        const {navigation} = this.props;
        NavigationUtil.navigation = this.props.navigation;

        return <TrendingItem
            projectModel={item}
            theme={theme}
            onSelect={(callback)=>{
                NavigationUtil.goPage({
                    theme,
                    projectMode:item,
                    flag:FLAG_STORAGE.flag_trending,
                    callback,
                },'DetailPage')

            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
            />
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render(){
        let store = this._store();
        const {theme} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>''+item.item.fullName}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={theme}
                            colors={[theme]}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.loadData()}
                            tintColor={theme}
                        />
                    }
                    listFooterComponent={()=>this.genIndicator()}
                    onEndReached={()=>{
                        console.log('---onEndReached---')
                        setTimeout(()=>{
                            if(this.canLoadMore){
                                this.loadData(true);
                                this.canLoadMore=false;
                            }
                        },100)
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                        console.log('---onMomentumScrollBegin-----')
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
    trending: state.trending
});

const mapDispatchToProps = dispatch=>({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao)=>dispatch(actions.onRefreshTrending(storeName,url,pageSize,favoriteDao)),
    onLoadMoreTrending:(storeName, pageIndex, pageSize, items, favoriteDao, callBack)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,favoriteDao,callBack)),
    onFlushTrendingFavorite: (storeName, pageIndex, pageSize, items, favoriteDao)=>dispatch(actions.onFlushTrendingFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});