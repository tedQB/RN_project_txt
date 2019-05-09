import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, SectionList, Platform, StyleSheet, Text, View, Button } from 'react-native';

type Props = {};

const CITY_NAMES = [
    {
        data: ['北京', '上海', '广州', '深圳'],
        title:'一线'
    },
    {
        data: ['杭州', '苏州', '成都', '武汉', '南京'],
        title:'二线'

    },
    {
        data:[ '尼玛1', '尼玛2', '尼玛3', '尼玛4'],
        title:'三四线'
    },
    {
        data:[ '尼玛1', '尼玛2', '尼玛3', '尼玛4'],
        title:'三四线'

    }
    ]


export default class SectionListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state ={
            isLoading:false,
            dataArray:CITY_NAMES
        }
    }
    static _renderItem(data){
        return <View style={styles.item}>
            <Text style={styles.text}>{data.item}</Text>
        </View>
    }
    static genIndicator(){
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
    static _renderSectionHeader({section}){
        return <View style={styles.sectionHeader}>
            <Text style={styles.text}>{section.title}</Text>
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
                <SectionList
                    sections={this.state.dataArray}
                    renderItem = { (data)=> SectionListDemo._renderItem(data) }
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
                    ListFooterComponent={() => SectionListDemo.genIndicator() }
                    onEndReached={()=>{
                        this.loadData()
                    }}
                    renderSectionHeader={(data)=> SectionListDemo._renderSectionHeader(data)}
                    ItemSeparatorComponent={()=><View style={styles.speparator} />}

                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fafafa'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    item:{
        backgroundColor:'#fff',
        height:80,
        marginBottom:15,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'#000',
        fontSize:20
    },
    indicatorContainer:{
        alignItems:'center'
    },
    indicator:{
        margin:10
    },
    sectionHeader:{
        height:50,
        backgroundColor: '#93ebbe',
        alignItems:'center',
        justifyContent: 'center'
    },
    speparator:{
        height:1,
        backgroundColor:'gray',
        flex:1
    }
});
