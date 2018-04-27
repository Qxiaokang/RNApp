import React, { Component } from 'react';
import {Text,StyleSheet} from 'react-native';
export default class Trending extends Component{
    constructor(){
        super();
    };
    render(){
        return (
            <Text style={styles.text}>趋势</Text>
        );
    }
}
var styles =StyleSheet.create({
    text:{
        color:'#f00',
        alignItems:'center',
        backgroundColor:'#ff0',
        fontsize:25
    }
});