import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PropTypes} from 'prop-types'

export default class BaseItem extends Component {
    static propTypes = {
        projectModel:PropTypes.object,
        onSelect:PropTypes.func,
        onFavorite:PropTypes.func,
    };

    constructor(props){
        super(props);
        this.state = {
            isFavorite:this.props.projectModel.isFavorite
        }
    }

    static getDerviedStateFromProps(nextProps, prevState){
        const onFavorite = nextProps.projectModel.isFavorite;
        if(prevState.isFavorite!==isFavorite){
            return {
                isFavorite:isFavorite
            }
        }
        return null;
    }

    setFavoriteState(isFavorite){
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite:isFavorite
        })
    }

    onItemClick(){
        this.props.onSelect(isFavorite=>{
            this.setFavoriteState((isFavorite))
        })
    }

    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }

    _favoriteIcon(){
        const {theme} = this.props;
        const {themeColor} = this.props;
        return <TouchableOpacity
            style={{padding:6}}
            underlayColor='transparent'
            onPress={()=>this.onPressFavorite()}
        >
            <FontAwesome
                name={this.state.isFavorite?'star':'star-o'}
                size={26}
                style={{color:themeColor}}
            />
            </TouchableOpacity>
    }
}