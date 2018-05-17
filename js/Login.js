import React from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import Util from "./utils/Util";
import StyleUtil from './utils/StyleUtil';
export default class Login extends React.Component{
    render(){
        return(
            <View style={styles.content}>
                <Image source={require('../mres/img/icon1.png')} />
                <TextInput style={styles.input} placeholder='请输入手机号码'
                           underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                />
                <TextInput style={styles.input} placeholder='请输入密码'
                           password={true}
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                />
                <TouchableOpacity style={StyleUtil.btnLogin}>
                    <Text style={StyleUtil.btnText}>登 录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles=StyleSheet.create(
    {
        content:{
            backgroundColor:'#FFF',
            width:Util.size.width,
            height:Util.size.height,
            justifyContent:'center',
            alignItems:'center'
        },
        logo:{
            width:Util.size.width/3,
            height:Util.size.width/3
        },
        view:{
            width:Util.size.width,
            height:Util.size.height/2,
            alignItems:'center',
            justifyContent:'center'
        },
        input:{
            marginTop:10,
            borderColor:'#AAAAAA',
            borderWidth:1,
            borderRadius:15,
            width:'80%',
            height:40
        }
    }
);