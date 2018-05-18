/** 
 * 封装公共的标题头，没有返回按钮 
 */  
'use strict';  
import React, { Component } from 'react';  
import {  
    Text,  
    View,  
}  
from 'react-native';  
import StyleSheet from 'StyleSheet';  
  
  
export default class HeaderNoBack extends Component {  
    render() {  
        return (  
                <View style={styles.container}>  
                    <View style={styles.textView}>
                        <Text style={styles.textStyle}>{this.props.text || "标题头"}</Text>
                    </View>  
                </View>  
        );  
    }  
}  
  
  
const styles = StyleSheet.create({  
    container: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        height: 50,  
        alignSelf: 'stretch',  
        backgroundColor: '#c92a3a',  
    },  
    textView: {
        flex: 1,  
        alignSelf: 'center',  
    },  
    textStyle: {
        fontSize: 18,  
        color: '#fff',  
        textAlign: 'center',
        marginTop: 20,  
        marginBottom: 10
    },  
}); 