/*
* 底部动态导航
* */

import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import PopularPage from '../../pageRedux/PopularPage';
import TrendingPage from '../../pageRedux/TrendingPage';
import FavoritePage from '../../pageRedux/FavoritePage';
import MyPage from '../../pageRedux/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from '../NavigationUtil';
import { BottomTabBar } from 'react-navigation-tabs';

import {connect} from 'react-redux';
import EventBus from "react-native-event-bus";
import EventTypes from "../../util/EventTypes";




type Props = {};

//TABS可以从网络进行传递数据
const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
}

class DynamicTabNavigator extends Component<Props>{
    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator(){ 
        if (this.Tabs) {
            return this.Tabs;
        }
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage };
        PopularPage.navigationOptions.tabBarLabel = '最新'
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
                tabBarComponent: props =>{
                    return <TabBarComponent theme={this.props.theme} {...props} />
                }
            }
        ))
    }

    render(){
        const Tab = this._tabNavigator();
        return <Tab
            onNavigationStateChange={(prevState,newState,action)=>{
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select,{
                    from:prevState.index,
                    to:newState.index
                })
            }}
        />
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        // const {routes,index} = this.props.navigation.state;
        //
        // if(routes[index].params){
        //     const {theme} = routes[index].params;
        //     if(theme&&theme.updateTime>this.theme.updateTime){
        //         this.theme = theme;
        //     }
        // }


        return (<BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme.themeColor}
        />);
    }
}

const mapStateToProps = state =>({
    theme:state.theme.theme
});

export default connect(mapStateToProps)(DynamicTabNavigator)