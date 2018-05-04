import React, {Component} from 'react';
import {
    Image, ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity, ImageBackground,
    BackHandler, ToastAndroid, Platform
} from 'react-native';
import HomePage from "./HomePage";
import {StackNavigator} from "react-navigation";

let image1 = require('../mres/img/splash1.jpg');
let image2 = require('../mres/img/timg.jpg');
let image3 = require('../mres/img/splash3.jpg');

const {width, height} = Dimensions.get('window');
export default class GuideView extends Component{

    constructor(props) {
        super(props);
    };
    render() {
        return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            bounces={false}
            pagingEnabled={true}

            horizontal={true}>
            <Image source={image1} style={styles.backgroundImage}/>
            <Image source={image2} style={styles.backgroundImage}/>
            <ImageBackground source={image3} style={[styles.backgroundImage,styles.btnOut]}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.props.navigation.navigate('HomePage');
                    }}
                ><Text style={styles.btnText}>启动应用</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    };
};
var styles = StyleSheet.create({
    contentContainer: {
        width: width * 3,
        height: height,
    },
    backgroundImage: {
        width: width,
        height: height,
    },
    btnOut: {
        alignItems: 'center',
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#148525',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:height-150,
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
    },
});
