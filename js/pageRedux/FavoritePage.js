import React, { Component } from 'react';
import {FlatList, Platform, StyleSheet, Text, View, Button } from 'react-native';
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

type Props = {};


class FavoritePage extends Component<Props> {
    constructor(props){
        super(props);

    }
    render(){
        const {theme} = this.props;
        let statusBar = {
            backgroundColor:'blue',
            barStyle:'light-content'
        }
        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            //style={theme.styles.navBar}
            />
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
            'Popular':{
                screen:{},
                navigationOptions:{
                    title:'最热'
                }
            },
            'Trending':{
                screen:{},
                navigationOptions:{
                    title:'趋势'
                }
            }
        }))
    }

}

const mapStateToProps = state =>({
    theme:state.theme.theme
});


export default connect(mapStateToProps)(FavoritePage);

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
})


