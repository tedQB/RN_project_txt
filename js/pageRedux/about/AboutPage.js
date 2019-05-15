import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import NavigationUtil from "../../navigator/NavigationUtil";
import {MORE_MENU} from "../../common/MORE_MENU";
import ViewUtil from "../../util/ViewUtil";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from '../../res/data/config'
import GlobalStyles from "../../res/styles/GlobalStyles";


type Props ={};

export default class AboutPage extends Component<Props>{
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            data:config,
        }
    }

    onClick(menu) {
        const {theme} = this.params;
        let RouteName, params = {theme};

        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title='course';
                params.url = 'https://www.baidu.com'
                break;
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage';
                break;
            case MORE_MENU.Feedback:
                const url = 'mailto://121914336@qq.com';
                Linking.canOpenURL(url)
                    .then(support => {
                        if (!support) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            Linking.openURL(url);
                        }
                    }).catch(e => {
                    console.error('An error occurred', e);
                });
                break;
        }
        if(RouteName){
            NavigationUtil.goPage(params,RouteName);
        }
    }


    getItem(menu){
        const {theme} = this.params;
        return ViewUtil.getMenuItem(()=>this.onClick(menu).menu,theme)
    }
    render() {
        const content = <View>
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Feedback)}
        </View>;
        return this.aboutCommon.render(content, this.state.data.app);
    }
}