import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Button  } from 'react-native';

type Props = {};


export default class App extends Component<Props> {
    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }
    render() {
        const { navigation } =this.props;

        return (
                <View style={styles.container}>
                    <Button
                        title={'ModalDemo'}
                        onPress={()=>{
                            navigation.navigate('ModalDemo')
                        }}
                    />
                    <Button
                        title={'FlatListDemo'}
                        onPress={()=>{
                            navigation.navigate('FlatListDemo')
                        }}
                    />
                    <Button
                        title={'SectionListDemo'}
                        onPress={()=>{
                            navigation.navigate('SectionListDemo')
                        }}
                    />
                    <Button
                        title={'SwipeableFlatListDemo'}
                        onPress={()=>{
                            navigation.navigate('SwipeableFlatListDemo')
                        }}
                    />
                    <Button
                        title={'AsyncStorageDemoPage'}
                        onPress={()=>{
                            navigation.navigate('AsyncStorageDemoPage')
                        }}
                    />
                    <Button
                        title={'离线缓存框架'}
                        onPress={()=>{
                            navigation.navigate('DataStoreDemoPage')
                        }}
                    />

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
});
