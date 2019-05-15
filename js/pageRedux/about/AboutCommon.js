import React from 'react';
import {DeviceInfo,View, Text, Image, Dimensions, StyleSheet, Platform} from "react-native";
import BackPressComponent from "../../common/BackPressComponent";
import NavigationUtil from "../../navigator/NavigationUtil";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../res/styles/GlobalStyles'
import ViewUtil from "../../util/ViewUtil";
import ShareUtil from '../../util/ShareUtil'
import share from '../../res/data/share.json'

export const FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'};

export default class AboutCommon {
    constructor(props, updateState){
        this.props = props;
        this.updateState = updateState;
        this.backPress = new BackPressComponent({backPress:()=>this.onBackPress()});
    }

    onBackPress(){
        NavigationUtil.goBack(this.props.navigation);
        return true;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network Error');
            })
            .then(config => {
                if (config) {
                    this.updateState({
                        data: config
                    })
                }
            })
            .catch(e => {
                console(e);
            })
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    

    render(contentView, params){
        const {theme} = this.props;
        const renderConfig = this.get
    }
}
