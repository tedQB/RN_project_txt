import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList,RefreshControl, ActivityIndicator } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../action/index'
import PopularItem from '../common/PopularItem'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR='red';
type Props = {};


export default class PopularPage extends Component<Props> {
    constructor(props){ 
        super(props);
        this.tabNames = ['Java','Android','IOS','React','React Native','PHP'];
    }


    _genTabs(){ 
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            console.log(item);
            tabs[`tab${index}`] = { 
                //screen:PopularTab,
                screen: props => <PopularTabPage {...props} tabLabel={item} />,
                navigationOptions:{ 
                    title:item
                }
            }
        });
        console.log(tabs);
        return createAppContainer(createMaterialTopTabNavigator(tabs, {
            //设置tab样式。
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled:true,
                style:{
                    backgroundColor:'#678'
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
    
    render() {
        const HeadTab = this._genTabs();
        return (
            <View style={{flex:1, marginTop:30 }}>
                <HeadTab />
            </View>
        )
    }
}

class PopularTabCao extends Component<Props>{


    render(){
        NavigationUtil.navigation = this.props.navigation;
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
        return <PopularItem
            item={item }
            onSelect={()=>{}}
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

    loadData(loadMore){
        //const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        this.props.onRefreshPopular(this.storeName,url)

    }

    genFetchUrl(key){
        return URL+key+QUERY_STR;
    }

    render(){
        //NavigationUtil.navigation = this.props.navigation;
        let {popular} = this.props;
        let store = popular[this.storeName];
        if(!store){
            store={
                items:[],
                isLoading:false,
                projectModels:[],
                hideLoadingMore:true
            }
        }
        console.log('this.props',this.props);

        return (<View style={{flex:1, marginTop:30 }}>
            <FlatList
                data = {store.items}
                renderItem={data=>this.renderItem(data)}
                keyExtractor={item=>''+item.id}
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
                    this.loadData(true);
                }}
                onEndReachedThreshold={0.5}
            />
        </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch =>({
    onRefreshPopular: (storeName, url) => dispatch(actions.onRefreshPopular(storeName,url))

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
