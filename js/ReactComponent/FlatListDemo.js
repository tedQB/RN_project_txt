import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, FlatList, Platform, StyleSheet, Text, View, Button } from 'react-native';

type Props = {};

const CITY_NAMES = ['北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '南京', '尼玛1', '尼玛2', '尼玛3', '尼玛4', '尼玛5', '尼玛6']

export default class FlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state ={ 
            isLoading:false,
            dataArray:CITY_NAMES
        }
    }
    _renderItem(data){
        return <View style={styles.item}>
                <Text style={styles.text}>{data.item}</Text>
            </View>
    }
    genIndicator(){
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                styles = { styles.indicator }
                size={"large"}
                animating={true}
                color={'red'}
            />
            <Text>正在加载更多</Text>
        </View>
    }
    loadData(refresh){
        this.setState({ 
            isLoading:true
        });
        setTimeout(() => {
            let dataArray = [];
            if(refresh){
                for(let i = this.state.dataArray.length-1;i>=0;i--){
                    dataArray.push(this.state.dataArray[i])
                }
            }else{
                dataArray = this.state.dataArray.concat(CITY_NAMES)
            }
            this.setState({
                dataArray:dataArray,
                isLoading:false
            })
        }, 1000);
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <FlatList 
                    data = {this.state.dataArray}
                    renderItem = { (data)=>this._renderItem(data) }
                    // refreshing = { this.state.isLoading }
                    // onRefresh={()=>{ 
                    //    this.loadData()
                    // }}
                    refreshControl = { 
                        <RefreshControl 
                            title = {'Loading'}
                            colors={['red']}
                            tintColor={['red']}
                            titleColor={['red']}
                            refreshing = { this.state.isLoading }
                            onRefresh={()=>{
                                this.loadData(true)
                            }}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator() }
                    onEndReached={()=>{
                        this.loadData()
                    }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    item:{ 
        backgroundColor:'#169',
        height:200,
        marginRight:15,
        marginLeft:15,
        marginBottom:15,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'white',
        fontSize:20
    },
    indicatorContainer:{
        alignItems:'center'
    },
    indicator:{
        margin:10
    }
});
