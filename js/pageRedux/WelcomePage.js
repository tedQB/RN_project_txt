import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'

type Props = {};


export default class WelcomePage extends Component<Props> {
    componentDidMount(){ 
        this.timer = setTimeout(() => {
            const {navigation} = this.props;
            navigation.navigate("Main")

            // NavigationUtil.resetToHomePage({
            //     navigation:this.props.navigation
            // })
        }, 1000 );
    }
    componentWillMount(){ 
        this.timer&&clearTimeout(this.timer)
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome</Text>
            </View>
        );
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
