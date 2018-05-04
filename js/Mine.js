import React, { Component } from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
export default class Mine extends Component{
    constructor(){
        super();
    };
    render(){
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../mres/img/bg3.jpg')} style={styles.backgroundImage}>
                    <Text style={styles.text}>我 的</Text>
                </ImageBackground>
            </View>
        );
    }
}
var styles =StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        width:100,
        height:50,
        textAlign:'center',
        color:'#9B76B1',
        alignItems:'center',
        justifyContent:'center',
        fontsize:50
    },
    backgroundImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        height:null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor:'rgba(0,0,0,0)',
    }
});