
import React, {Component} from 'react';
import {Button, TextInput,Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class FetchDemo extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            showText:''
        }
    }
    loadData(){
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        console.log(url);
        fetch(url)
            .then(response=>{
                return response.text()
            }).then(responseText=>{
                console.log(responseText);
                this.setState({
                    showText:responseText
                })
            }).catch(e=>{
                this.setState({
                    showText:e.toString()
                })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <Text style={styles.welcome}>Fetch 使用</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={
                            (text) => {
                               this.searchKey = text
                           }
                        }
                    />
                    <Button
                        onPress = { ()=>{this.loadData()} }
                        title = '获取'
                    />
                </View>

                <View style={styles.text_container}>
                    <Text>
                        {this.state.showText}
                    </Text>
                </View>




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
    input_container:{
        flexDirection:'row',
        marginTop:40,
    },
    input:{
        height:30,
        flex:1,
        borderColor:'black',
        borderWidth:1,
        marginRight:10
    }
});
