import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import FetchDemo from '../page/FetchDemo'
import MyPage from '../page/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from './NavigationUtil';
import { BottomTabBar } from 'react-navigation-tabs'
import EventBus from 'react-native-event-bus'
import EventTypes from "../util/EventTypes";

type Props = {};

//TABS可以从网络进行传递数据
const TABS = {
    FetchDemo: {
        screen: FetchDemo,
        navigationOptions: {
            tabBarLabel: 'Fetch',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
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

export default class DynamicTabNavigator extends Component<Props>{
    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator(){ 
        if (this.Tabs) {
            return this.Tabs;
        }
        const { FetchDemo,PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
        const tabs = { FetchDemo, PopularPage, TrendingPage, FavoritePage, MyPage };
        PopularPage.navigationOptions.tabBarLabel = '最新'
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
                tabBarComponent: TabBarComponent
            }
        ))
    }

    render(){
        NavigationUtil.navigation = this.props.navigation;
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
        const {routes,index} = this.props.navigation.state;
        console.log(this.props.navigation);
        if(routes[index].params){ 
            const {theme} = routes[index].params;
            if(theme&&theme.updateTime>this.theme.updateTime){ 
                this.theme = theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor||this.props.activeTintColor}
        /> 
    }
}
