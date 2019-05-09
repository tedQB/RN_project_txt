
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import DataStore from '../expand/dao/DataStore.js'

type Props = {};
export default class DataStoreDemoPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            showText:'' //this.state里存放需要和jsx进行DOM操作的交互数据项
        }
        this.dataStore = new DataStore()
    }

    loadData(){
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        this.dataStore.fetchData(url)
            .then(data=>{
                let showData = `初次数据加载时间:${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText:showData
                })
            })
            .catch(error=>{
                error && console.log(error.toString())
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>AsyncStorage使用</Text>
                <TextInput style={styles.input}
                           onChangeText={
                               text=>{
                                   this.searchKey = text;
                               }
                           }
                />
                <View style={styles.input_container}>
                    <Text onPress={()=>{
                        this.loadData()
                    }}>
                        获取
                    </Text>
                </View>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection:'column',
    },
    input_container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    input:{
        height:30,
        borderColor:'black',
        borderWidth:1,
        marginRight:10
    }
});
