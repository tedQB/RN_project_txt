import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from "react-redux";
import actions from "../action";

import DynamicTabNavigator from '../navigator/ReduxNavigator/DynamicTabNavigator'

type Props = {};


class HomePage extends Component<Props> {

    render(){

        const {theme} = this.props;
        NavigationUtil.navigation = this.props.navigation;

        return <DynamicTabNavigator />
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
