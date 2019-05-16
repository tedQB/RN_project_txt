import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from "react-redux";
import actions from "../action";
import {NavigationAction, NavigationActions} from "react-navigation";
import DynamicTabNavigator from '../navigator/ReduxNavigator/DynamicTabNavigator'
import BackPressComponent from "../common/BackPressComponent";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";
import CustomTheme from './CustomTheme';


type Props = {};


class HomePage extends Component<Props> {
    constructor(props){
        super(props);

        this.backPress = new BackPressComponent({backPress:this.onBackPress});
    }
    componentDidMount(): void {
        this.props.onThemeInt();
        this.backPress.componentDidMount();
    }

    componentWillUnmount(): void {
        this.backPress.componentDidMount();
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };


    renderCustomThemeView() {
        const {customThemeViewVisible, onShowCustomThemeView} = this.props;
        return (<CustomTheme
            visible={customThemeViewVisible}
            {...this.props}
            onClose={() => onShowCustomThemeView(false)}
        />)
    }

    render(){

        const {theme} = this.props;
        NavigationUtil.navigation = this.props.navigation;

        return <SafeAreaViewPlus topColor={theme}>
             <DynamicTabNavigator />
            {this.renderCustomThemeView()}
        </SafeAreaViewPlus>

    }

}

const mapStateToProps = state=>({
    nav:state.nav,
    theme:state.theme.theme,
    customThemeViewVisible:state.theme.customThemeViewVisible
});

const mapDispatchToProps = dispatch =>({
    onShowCustomThemeView:(show)=>dispatch(actions.onShowCustomThemeView(show)),
    onThemeInt: () => dispatch(actions.onThemeInt()),
})

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);

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
