import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import {onThemeChange} from "../action/theme";
import {connect} from "react-redux";

type Props = {};


class FavoritePage extends Component<Props> {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>FavoritePage</Text>
                <Button
                    title = "改变主题颜色"
                    onPress = {()=>{
                        //let {dispatch} = this.props.navigation;
                        //dispatch(onThemeChange('#096'))
                        this.props.onThemeChange('#233');
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state =>({});

const mapDispatchToProps = dispatch => ({
    onThemeChange:(theme)=>dispatch(onThemeChange(theme))
});

export default connect(mapStateToProps,mapDispatchToProps)(FavoritePage);

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
})


