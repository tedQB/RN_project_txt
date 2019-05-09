import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';


type Props = {};


export default class PopularPage extends Component<Props> {
    constructor(props){ 
        super(props);
        this.tabNames = ['Java','Android','IOS','React','React Native','PHP']
    }
    _genTabs(){ 
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = { 
                // screen:PopularTab,
                screen: props => <PopularTab {...props} tabLabel={item} />,
                navigationOptions:{ 
                    title:item
                }
            }
        });
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
                screen:PopularTab,
                navigationOptions:{
                    title:'Tab1'
                }
            },
            PopularTab2: {
                screen: PopularTab,
                navigationOptions: {
                    title: 'Tab2'
                }
            },            
        }))
    }
    
    render() {
        const HeadTab = this._genTabs();
        return <View style={{flex:1, marginTop:30 }}>
            <HeadTab />
        </View>

    }
}

class PopularTab extends Component<Props>{


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
    }
});
