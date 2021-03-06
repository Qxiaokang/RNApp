import React, { Component } from 'react';
import {Text,StyleSheet,View,Image,ImageBackground} from 'react-native';
export default class Favorite extends Component{
    constructor(){
        super();
    };
    render(){
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../mres/img/bg3.jpg')} style={styles.backgroundImage}>
                    <Text style={styles.text}>收 藏</Text>
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
        textAlign:'center',
        color:'#9B76B1',
        alignItems:'center',
        justifyContent:'center',
        fontSize:50
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