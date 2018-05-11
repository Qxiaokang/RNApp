import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground, TouchableOpacity, ToastAndroid,AppRegistry,Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Mine extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        const {navigate}=this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../mres/img/bg3.jpg')} style={styles.backgroundImage}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('MLocation')}
                    ><Text style={styles.btnText}>我的</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#148525',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#9B76B1',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor: 'rgba(0,0,0,0)',
    }
});
