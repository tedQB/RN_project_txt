import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from "react-redux";
import actions from "../action";
import {NavigationAction} from "react-navigation";
import DynamicTabNavigator from '../navigator/ReduxNavigator/DynamicTabNavigator'
import BackPressComponent from "../common/BackPressComponent";
//import CustomTheme from '../page/CustomTheme';
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";


type Props = {};


class HomePage extends Component<Props> {
    constructor(props){
        super(props);
        this.backPress = new BackPressComponent({backPress:this.onBackPress});
    }
    componentDidMount(): void {
        this.backPress.componentDidMount();
    }

    componentWillUnmount(): void {
        this.backPress.componentDidMount();
    }

    onBackPress = ()=>{
        const {dispatch,nav} = this.props;
        if(nav.routes[1].index===0){
            return false;
        }
        dispatch(NavigationAction.back());
        return true;
    }

    render(){

        const {theme} = this.props;
        NavigationUtil.navigation = this.props.navigation;

        return <SafeAreaViewPlus topColor={theme}>
             <DynamicTabNavigator />
        </SafeAreaViewPlus>

    }

}

const mapStateToProps = state=>({
    nav:state.nav,
    theme:state.theme.theme,
});

export default connect(mapStateToProps)(HomePage);

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
});
